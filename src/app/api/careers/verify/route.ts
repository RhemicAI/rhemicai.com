import { NextRequest, NextResponse } from "next/server";
import { verifyVerificationToken } from "@/lib/hiring";

export const runtime = "nodejs";

const CLICKUP_API = "https://api.clickup.com/api/v2";
const OUTBOUND_TIMEOUT_MS = 10_000;

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
  if (!response.ok) {
    throw new Error(`ClickUp ${method} ${path} failed: ${response.status} ${text}`);
  }
  return (text ? JSON.parse(text) : {}) as T;
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

function htmlPage(title: string, body: string, status = 200) {
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><style>body{margin:0;background:#07090c;color:#eef2f7;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;display:grid;min-height:100vh;place-items:center;padding:24px}main{max-width:560px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:rgba(255,255,255,.04);padding:32px;box-shadow:0 24px 60px rgba(0,0,0,.35)}h1{font-size:28px;line-height:1.1;margin:0 0 12px}p{color:#c8d0db;line-height:1.6;margin:0}</style></head><body><main><h1>${title}</h1><p>${body}</p></main></body></html>`,
    {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    const secret = process.env.HIRING_VERIFY_SECRET;
    const clickupToken = process.env.CLICKUP_API_TOKEN;
    if (!token || !secret || !clickupToken) {
      return htmlPage("Verification failed", "This verification link is incomplete or expired.", 400);
    }

    const payload = verifyVerificationToken(token, secret);
    if (!payload) {
      return htmlPage("Verification failed", "This verification link is invalid or expired.", 400);
    }

    type ClickUpTask = { markdown_content?: string; description?: string; text_content?: string };
    const task = await clickupRequest<ClickUpTask>({
      path: `/task/${payload.taskId}`,
      token: clickupToken,
    });
    const description = task.markdown_content || task.description || task.text_content || "";
    const updatedDescription = description.replace(
      /Email verification state: Email Unverified/g,
      "Email verification state: Verified",
    );

    if (updatedDescription && updatedDescription !== description) {
      await clickupRequest({
        path: `/task/${payload.taskId}`,
        token: clickupToken,
        method: "PUT",
        body: { markdown_content: updatedDescription },
      });
    }

    await clickupRequest({
      path: `/task/${payload.taskId}/comment`,
      token: clickupToken,
      method: "POST",
      body: {
        comment: [
          {
            text: `Email verified for ${payload.email}. AI scoring remains triage only. Human review is required before any candidate communication or decision.`,
          },
        ],
        notify_all: false,
      },
    });
    await addClickUpTag({ taskId: payload.taskId, token: clickupToken, tag: "Verified" });

    return htmlPage(
      "Email verified",
      "Your email is verified. Rhemic will review the application manually before any next step.",
    );
  } catch (error) {
    console.error("Career verification error:", error);
    return htmlPage("Verification failed", "This verification link could not be processed.", 500);
  }
}
