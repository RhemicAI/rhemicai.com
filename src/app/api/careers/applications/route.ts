import { NextRequest, NextResponse } from "next/server";
import { getCareerRole, getOpenCareerRole } from "@/lib/careers";
import {
  HiringTriageScore,
  isHiringScoringFailure,
  scoreApplicationForRole,
} from "@/lib/careers/hiringScoringAgent";
import {
  CandidateApplication,
  buildApplicationMarkdown,
  createVerificationToken,
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
    const formData = await request.formData();
    const roleSlug = readString(formData, "roleSlug", 80);
    if (!getCareerRole(roleSlug)) {
      return NextResponse.json({ success: false, error: "Invalid role selected" }, { status: 400 });
    }
    const role = getOpenCareerRole(roleSlug);
    if (!role) {
      return NextResponse.json(
        { success: false, error: "This role is not open for applications yet" },
        { status: 400 },
      );
    }

    const clickupToken = requiredEnv("CLICKUP_API_TOKEN");
    const listId = requiredEnv("CLICKUP_APPLICATION_LIST_ID");
    requiredEnv("N8N_HIRING_VERIFY_WEBHOOK_URL");
    requiredEnv("HIRING_VERIFY_SECRET");

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
    await attachResumeToTask({ taskId: task.id, token: clickupToken, resume });
    resumeAttached = true;

    const applicationAnswers = Object.fromEntries(
      role.formQuestions.map((question, index) => [question, candidate.answers[index] || ""]),
    );
    const resumeText = readString(formData, "resumeText", 20000);
    const score: HiringTriageScore = await scoreApplicationForRole({
      roleSlug: role.slug,
      roleTitle: role.title,
      candidateName: candidate.name,
      applicationAnswers,
      resumeText: resumeText || undefined,
    });
    const scoringFailed = isHiringScoringFailure(score);

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
    await addClickUpTag({
      taskId: task.id,
      token: clickupToken,
      tag: scoringFailed ? "AI Scoring Failed" : "AI Scored",
    });
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
      scoringStatus: scoringFailed ? "failed" : "scored",
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
