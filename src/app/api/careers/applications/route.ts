import { NextRequest, NextResponse } from "next/server";
import { getCareerRole, getOpenCareerRole } from "@/lib/careers";
import {
  HiringTriageScore,
  isHiringScoringFailure,
  safeScoreFallback,
  scoreApplicationForRole,
} from "@/lib/careers/hiringScoringAgent";
import { parseResumePdfText } from "@/lib/careers/parseResumePdf";
import { sendApplicationThankYouEmail } from "@/lib/careers/sendApplicationEmail";
import {
  CandidateApplication,
  buildApplicationMarkdown,
  createVerificationToken,
} from "@/lib/hiring";

export const runtime = "nodejs";

const CLICKUP_API = "https://api.clickup.com/api/v2";
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const OUTBOUND_TIMEOUT_MS = 10_000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_PER_IP = 10;
const RATE_LIMIT_MAX_PER_EMAIL = 3;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

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

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OUTBOUND_TIMEOUT_MS);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
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

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || "unknown";
}

function consumeRateLimit(key: string, maxRequests: number, now = Date.now()) {
  const existing = rateLimitBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

function enforceRateLimit(request: NextRequest, email: string) {
  const now = Date.now();
  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
  }

  const ipLimit = consumeRateLimit(`ip:${getClientIp(request)}`, RATE_LIMIT_MAX_PER_IP, now);
  if (!ipLimit.allowed) return ipLimit;
  return consumeRateLimit(`email:${email}`, RATE_LIMIT_MAX_PER_EMAIL, now);
}

function isPdfMagicBytes(buffer: Buffer) {
  return buffer.subarray(0, 5).toString("ascii") === "%PDF-";
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
  const response = await fetchWithTimeout(`${CLICKUP_API}${path}`, {
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

async function hasExistingApplicationForEmail({
  token,
  listId,
  email,
}: {
  token: string;
  listId: string;
  email: string;
}) {
  const normalizedEmail = email.toLowerCase();

  for (let page = 0; page < 10; page += 1) {
    type ClickUpTaskListResponse = {
      tasks?: Array<{
        name?: string;
        description?: string;
        text_content?: string;
        markdown_content?: string;
      }>;
    };

    const data = await clickupRequest<ClickUpTaskListResponse>({
      path: `/list/${listId}/task?include_closed=true&page=${page}`,
      token,
    });
    const tasks = data.tasks ?? [];
    const hasMatch = tasks.some((task) =>
      [task.name, task.description, task.text_content, task.markdown_content]
        .filter((value): value is string => typeof value === "string")
        .some((value) => value.toLowerCase().includes(normalizedEmail)),
    );

    if (hasMatch) return true;
    if (tasks.length < 100) return false;
  }

  return false;
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

  return clickupRequest<ClickUpTask>({
    path: `/list/${listId}/task`,
    token,
    method: "POST",
    body,
  });
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

  const response = await fetchWithTimeout(`${CLICKUP_API}/task/${taskId}/attachment`, {
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
  const response = await fetchWithTimeout(`${CLICKUP_API}/task/${taskId}/tag/${encodeURIComponent(tag)}`, {
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

async function addClickUpComment({
  taskId,
  token,
  comment,
}: {
  taskId: string;
  token: string;
  comment: string;
}) {
  await clickupRequest({
    path: `/task/${taskId}/comment`,
    token,
    method: "POST",
    body: {
      comment: [{ text: comment }],
      notify_all: false,
    },
  });
}

async function recordPostTaskFailure({
  taskId,
  token,
  tag,
  comment,
}: {
  taskId: string;
  token: string;
  tag: string;
  comment: string;
}) {
  const results = await Promise.allSettled([
    addClickUpTag({ taskId, token, tag }),
    addClickUpComment({ taskId, token, comment }),
  ]);
  for (const result of results) {
    if (result.status === "rejected") {
      console.warn(`ClickUp failure marker failed for ${tag}:`, result.reason);
    }
  }
}

function buildVerificationUrl({
  request,
  candidate,
  taskId,
}: {
  request: NextRequest;
  candidate: CandidateApplication;
  taskId: string;
}) {
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
  return `${origin}/api/careers/verify?token=${encodeURIComponent(token)}`;
}

function truncateForMarkdown(value: string, maxLength = 500) {
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
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
    if (!candidate.linkedinUrl) {
      return NextResponse.json({ success: false, error: "LinkedIn URL is required" }, { status: 400 });
    }

    const rateLimit = enforceRateLimit(request, candidate.email);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many application attempts. Please wait before trying again." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        },
      );
    }

    if (await hasExistingApplicationForEmail({ token: clickupToken, listId, email: candidate.email })) {
      return NextResponse.json(
        { success: false, error: "Only one application can be submitted per person." },
        { status: 409 },
      );
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
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    if (!isPdfMagicBytes(resumeBuffer)) {
      return NextResponse.json({ success: false, error: "Resume must be a valid PDF" }, { status: 400 });
    }
    let resumeText: string | undefined;
    try {
      resumeText = await parseResumePdfText(resumeBuffer);
    } catch (error) {
      console.warn("Resume PDF parsing failed:", error);
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
    let resumeAttachmentFailureReason: string | undefined;
    try {
      await attachResumeToTask({ taskId: task.id, token: clickupToken, resume });
      resumeAttached = true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown resume attachment error";
      resumeAttachmentFailureReason = truncateForMarkdown(message);
      console.error("Resume attachment failed after ClickUp task creation:", error);
      await recordPostTaskFailure({
        taskId: task.id,
        token: clickupToken,
        tag: "Resume Attachment Failed",
        comment: `Resume Attachment Failed for ${candidate.email}. Application task was captured, but the PDF attachment did not complete. Reason: ${resumeAttachmentFailureReason}`,
      });
    }

    const applicationAnswers = Object.fromEntries(
      role.formQuestions.map((question, index) => [question, candidate.answers[index] || ""]),
    );
    let score: HiringTriageScore;
    try {
      score = await scoreApplicationForRole({
        roleSlug: role.slug,
        roleTitle: role.title,
        candidateName: candidate.name,
        applicationAnswers,
        resumeText,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown scoring error";
      score = safeScoreFallback(role, truncateForMarkdown(message));
    }
    const scoringFailed = isHiringScoringFailure(score);
    const verificationUrl = buildVerificationUrl({
      request,
      candidate,
      taskId: task.id,
    });
    const emailResult = await sendApplicationThankYouEmail({
      candidateName: candidate.name,
      candidateEmail: candidate.email,
      roleTitle: role.title,
      verificationUrl,
    }).catch((error: unknown) => ({
      sent: false,
      error: error instanceof Error ? error.message : "unknown confirmation email error",
    }));
    const emailStatus = emailResult.sent ? "sent" : "failed";
    const emailConfirmationState = emailResult.sent ? "Confirmation Email Sent" : "Confirmation Email Failed";
    const emailFailureReason = emailResult.sent || !emailResult.error
      ? undefined
      : truncateForMarkdown(emailResult.error);

    const finalMarkdown = buildApplicationMarkdown({
      candidate,
      role,
      resumeAttached,
      emailVerificationState: "Email Unverified",
      score,
      humanReviewer: "Unassigned",
      reviewStatus: "Human Review Needed",
      emailConfirmationState,
      emailFailureReason,
      resumeAttachmentFailureReason,
    });
    let taskUpdateStatus: "updated" | "failed" = "updated";
    try {
      await updateClickUpTaskMarkdown({
        taskId: task.id,
        token: clickupToken,
        markdown: finalMarkdown,
      });
    } catch (error) {
      taskUpdateStatus = "failed";
      const message = error instanceof Error ? error.message : "unknown task update error";
      console.error("ClickUp task markdown update failed after task creation:", error);
      await recordPostTaskFailure({
        taskId: task.id,
        token: clickupToken,
        tag: "Application Update Failed",
        comment: `Application Update Failed for ${candidate.email}. The application task was captured, but the post-processing markdown update did not complete. Reason: ${truncateForMarkdown(message)}`,
      });
    }
    await Promise.allSettled([
      addClickUpTag({
        taskId: task.id,
        token: clickupToken,
        tag: scoringFailed ? "AI Scoring Failed" : "AI Scored",
      }),
      addClickUpTag({ taskId: task.id, token: clickupToken, tag: "Human Review Needed" }),
      addClickUpTag({
        taskId: task.id,
        token: clickupToken,
        tag: emailConfirmationState,
      }),
    ]);
    if (scoringFailed) {
      await recordPostTaskFailure({
        taskId: task.id,
        token: clickupToken,
        tag: "AI Scoring Failed",
        comment: `AI Scoring Failed for ${candidate.email}. Human review is required before any candidate communication or decision.`,
      });
    }
    if (!emailResult.sent) {
      await recordPostTaskFailure({
        taskId: task.id,
        token: clickupToken,
        tag: "Confirmation Email Failed",
        comment: `Confirmation Email Failed for ${candidate.email}. Application task was captured, but the applicant thank-you/verification email did not complete. Reason: ${emailFailureReason || "unknown email error"}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: emailResult.sent
        ? "Application received. Check your email to verify your address. Human review is required before any next step."
        : "Application received. Human review is required before any next step.",
      scoringStatus: scoringFailed ? "failed" : "scored",
      emailStatus,
      resumeStatus: resumeAttached ? "attached" : "failed",
      taskStatus: taskUpdateStatus,
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
