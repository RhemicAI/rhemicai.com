import { NextRequest, NextResponse } from "next/server";
import { getCareerRole } from "@/lib/careers";
import {
  CandidateApplication,
  HiringScore,
  buildApplicationMarkdown,
  buildScoringInstructions,
  createVerificationToken,
  hiringScoreJsonSchema,
  safeScoreFallback,
} from "@/lib/hiring";

export const runtime = "nodejs";

const CLICKUP_API = "https://api.clickup.com/api/v2";
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

function readString(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function parseAnswers(raw: FormDataEntryValue | null) {
  if (typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((answer) => (typeof answer === "string" ? answer.trim().slice(0, 3000) : ""));
  } catch {
    return [];
  }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function clickupRequest<T>({
  path,
  token,
  method = "GET",
  body,
}: {
  path: string;
  token: string;
  method?: "GET" | "POST" | "PUT";
  body?: unknown;
}) {
  const response = await fetch(`${CLICKUP_API}${path}`, {
    method,
    headers: {
      Authorization: token,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(`ClickUp ${method} ${path} failed: ${response.status} ${text}`);
  }
  return data as T;
}

async function createClickUpTask({
  token,
  listId,
  candidate,
  markdown,
}: {
  token: string;
  listId: string;
  candidate: CandidateApplication;
  markdown: string;
}) {
  type ClickUpTask = { id: string; url?: string };
  const body = {
    name: `${candidate.name} - ${candidate.roleTitle} Applicant`,
    markdown_content: markdown,
    tags: ["New Application", "Email Unverified", "Human Review Needed"],
  };

  try {
    return await clickupRequest<ClickUpTask>({
      path: `/list/${listId}/task`,
      token,
      method: "POST",
      body,
    });
  } catch {
    return clickupRequest<ClickUpTask>({
      path: `/list/${listId}/task`,
      token,
      method: "POST",
      body: {
        name: body.name,
        markdown_content: markdown,
      },
    });
  }
}

async function attachResumeToTask({
  taskId,
  token,
  resume,
}: {
  taskId: string;
  token: string;
  resume: File;
}) {
  const body = new FormData();
  body.append("attachment", resume, resume.name);

  const response = await fetch(`${CLICKUP_API}/task/${taskId}/attachment`, {
    method: "POST",
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
    body,
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`ClickUp resume attachment failed: ${response.status} ${text}`);
  }
}

async function updateClickUpTaskMarkdown({
  taskId,
  token,
  markdown,
}: {
  taskId: string;
  token: string;
  markdown: string;
}) {
  await clickupRequest({
    path: `/task/${taskId}`,
    token,
    method: "PUT",
    body: { markdown_content: markdown },
  });
}

async function addClickUpTag({
  taskId,
  token,
  tag,
}: {
  taskId: string;
  token: string;
  tag: string;
}) {
  const response = await fetch(`${CLICKUP_API}/task/${taskId}/tag/${encodeURIComponent(tag)}`, {
    method: "POST",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    console.warn(`ClickUp tag add failed for ${tag}:`, response.status, await response.text());
  }
}

function extractOutputText(response: unknown) {
  if (response && typeof response === "object" && "output_text" in response) {
    const outputText = (response as { output_text?: unknown }).output_text;
    if (typeof outputText === "string") return outputText;
  }

  const output = (response as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> })?.output;
  if (!Array.isArray(output)) return "";
  return output
    .flatMap((item) => item.content ?? [])
    .filter((content) => content.type === "output_text" && typeof content.text === "string")
    .map((content) => content.text)
    .join("");
}

function normalizeScore(score: Partial<HiringScore>, fallbackTask: string): HiringScore {
  const bounded = (value: unknown, fallback: number) => {
    const numberValue = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(numberValue)) return fallback;
    return Math.max(0, Math.min(10, Math.round(numberValue)));
  };

  const nextStep = score.recommended_next_step;

  return {
    role_fit_score: bounded(score.role_fit_score, 0),
    communication_score: bounded(score.communication_score, 0),
    execution_clarity_score: bounded(score.execution_clarity_score, 0),
    systems_thinking_score: bounded(score.systems_thinking_score, 0),
    AI_tooling_score: bounded(score.AI_tooling_score, 0),
    domain_fit_score: bounded(score.domain_fit_score, 0),
    risk_score: bounded(score.risk_score, 10),
    recommended_next_step:
      nextStep === "reject" ||
      nextStep === "hold" ||
      nextStep === "test_task" ||
      nextStep === "interview" ||
      nextStep === "strong_candidate"
        ? nextStep
        : "hold",
    score_summary: score.score_summary || "not enough evidence",
    strengths: Array.isArray(score.strengths) && score.strengths.length ? score.strengths : ["not enough evidence"],
    risks: Array.isArray(score.risks) && score.risks.length ? score.risks : ["not enough evidence"],
    evidence_gaps:
      Array.isArray(score.evidence_gaps) && score.evidence_gaps.length ? score.evidence_gaps : ["not enough evidence"],
    suggested_test_task: score.suggested_test_task || fallbackTask,
  };
}

async function scoreApplication({
  candidate,
  role,
  resumeBuffer,
  resumeName,
}: {
  candidate: CandidateApplication;
  role: NonNullable<ReturnType<typeof getCareerRole>>;
  resumeBuffer: Buffer;
  resumeName: string;
}) {
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) {
    return safeScoreFallback(role, "OPENAI_API_KEY is not configured");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_HIRING_MODEL || "gpt-5",
      store: false,
      instructions: buildScoringInstructions(role),
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_file",
              filename: resumeName,
              file_data: `data:application/pdf;base64,${resumeBuffer.toString("base64")}`,
            },
            {
              type: "input_text",
              text: JSON.stringify({
                candidate: {
                  name: candidate.name,
                  email: candidate.email,
                  role: candidate.roleTitle,
                  availability: candidate.availability,
                  links: {
                    linkedinUrl: candidate.linkedinUrl,
                    portfolioUrl: candidate.portfolioUrl,
                  },
                },
                role: {
                  title: role.title,
                  bottleneck: role.bottleneck,
                  founderWorkRemoved: role.founderWorkRemoved,
                  systemPluggedInto: role.systemPluggedInto,
                  firstThirtyDaysSuccess: role.firstThirtyDaysSuccess,
                  suggestedTestTask: role.suggestedTestTask,
                  questions: role.formQuestions,
                },
                answers: role.formQuestions.map((question, index) => ({
                  question,
                  answer: candidate.answers[index] || "not enough evidence",
                })),
              }),
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "hiring_application_score",
          strict: true,
          schema: hiringScoreJsonSchema,
        },
      },
    }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`OpenAI scoring failed: ${response.status} ${text}`);
  }

  const outputText = extractOutputText(JSON.parse(text));
  if (!outputText) {
    throw new Error("OpenAI scoring returned no output text");
  }

  return normalizeScore(JSON.parse(outputText) as Partial<HiringScore>, role.suggestedTestTask);
}

async function sendVerificationEmail({
  request,
  candidate,
  taskId,
  taskUrl,
}: {
  request: NextRequest;
  candidate: CandidateApplication;
  taskId: string;
  taskUrl?: string;
}) {
  const webhookUrl = requiredEnv("N8N_HIRING_VERIFY_WEBHOOK_URL");
  const secret = requiredEnv("HIRING_VERIFY_SECRET");
  const token = createVerificationToken(
    {
      taskId,
      email: candidate.email,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    },
    secret,
  );
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const verificationUrl = `${origin}/api/careers/verify?token=${encodeURIComponent(token)}`;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "hiring_email_verification",
      candidateName: candidate.name,
      candidateEmail: candidate.email,
      roleTitle: candidate.roleTitle,
      taskId,
      taskUrl,
      verificationUrl,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`N8N verification webhook failed: ${response.status} ${text}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const clickupToken = requiredEnv("CLICKUP_API_TOKEN");
    const listId = requiredEnv("CLICKUP_APPLICATION_LIST_ID");
    requiredEnv("N8N_HIRING_VERIFY_WEBHOOK_URL");
    requiredEnv("HIRING_VERIFY_SECRET");

    const formData = await request.formData();
    const roleSlug = readString(formData, "roleSlug", 80);
    const role = getCareerRole(roleSlug);
    if (!role) {
      return NextResponse.json({ success: false, error: "Invalid role selected" }, { status: 400 });
    }

    const candidate: CandidateApplication = {
      name: readString(formData, "name", 100),
      email: readString(formData, "email", 120).toLowerCase(),
      phone: readString(formData, "phone", 60),
      location: readString(formData, "location", 120),
      portfolioUrl: readString(formData, "portfolioUrl", 250),
      linkedinUrl: readString(formData, "linkedinUrl", 250),
      availability: readString(formData, "availability", 160),
      roleSlug: role.slug,
      roleTitle: role.title,
      answers: parseAnswers(formData.get("answers")),
    };

    if (!candidate.name || !candidate.email || !isValidEmail(candidate.email)) {
      return NextResponse.json({ success: false, error: "A valid name and email are required" }, { status: 400 });
    }
    if (candidate.answers.length !== role.formQuestions.length || candidate.answers.some((answer) => !answer)) {
      return NextResponse.json({ success: false, error: "All role questions are required" }, { status: 400 });
    }

    const resume = formData.get("resume");
    if (!(resume instanceof File)) {
      return NextResponse.json({ success: false, error: "Resume PDF is required" }, { status: 400 });
    }
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ success: false, error: "Resume must be 5 MB or smaller" }, { status: 400 });
    }
    if (resume.type !== "application/pdf" && !resume.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ success: false, error: "Resume must be a PDF" }, { status: 400 });
    }

    const initialMarkdown = buildApplicationMarkdown({
      candidate,
      role,
      resumeAttached: false,
      emailVerificationState: "Email Unverified",
      score: null,
    });
    const task = await createClickUpTask({
      token: clickupToken,
      listId,
      candidate,
      markdown: initialMarkdown,
    });

    let resumeAttached = false;
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    await attachResumeToTask({ taskId: task.id, token: clickupToken, resume });
    resumeAttached = true;

    let score: HiringScore;
    try {
      score = await scoreApplication({
        candidate,
        role,
        resumeBuffer,
        resumeName: resume.name || `${candidate.name}-resume.pdf`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown scoring error";
      score = safeScoreFallback(role, message.slice(0, 500));
    }

    const finalMarkdown = buildApplicationMarkdown({
      candidate,
      role,
      resumeAttached,
      emailVerificationState: "Email Unverified",
      score,
      humanReviewer: "Unassigned",
      reviewStatus: "Human Review Needed",
    });
    await updateClickUpTaskMarkdown({
      taskId: task.id,
      token: clickupToken,
      markdown: finalMarkdown,
    });
    await addClickUpTag({ taskId: task.id, token: clickupToken, tag: "AI Scored" });
    await addClickUpTag({ taskId: task.id, token: clickupToken, tag: "Human Review Needed" });

    await sendVerificationEmail({
      request,
      candidate,
      taskId: task.id,
      taskUrl: task.url,
    });

    return NextResponse.json({
      success: true,
      message:
        "Application received. Check your email to verify your address. Human review is required before any next step.",
      taskUrl: task.url,
    });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Application could not be submitted. Email contact@rhemicai.com if this keeps happening.",
      },
      { status: 500 },
    );
  }
}
