import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/careers/verify/route";
import { createVerificationToken } from "@/lib/hiring";

const originalFetch = globalThis.fetch;
const originalEnv = {
  CLICKUP_API_TOKEN: process.env.CLICKUP_API_TOKEN,
  HIRING_VERIFY_SECRET: process.env.HIRING_VERIFY_SECRET,
};

function verificationRequest(token: string) {
  const url = new URL(`http://localhost/api/careers/verify?token=${encodeURIComponent(token)}`);
  return { nextUrl: url } as NextRequest;
}

beforeEach(() => {
  process.env.CLICKUP_API_TOKEN = "clickup-token";
  process.env.HIRING_VERIFY_SECRET = "test-secret";
});

afterEach(() => {
  process.env.CLICKUP_API_TOKEN = originalEnv.CLICKUP_API_TOKEN;
  process.env.HIRING_VERIFY_SECRET = originalEnv.HIRING_VERIFY_SECRET;
  globalThis.fetch = originalFetch;
  vi.clearAllMocks();
});

describe("careers verification route", () => {
  it("updates visible ClickUp markdown_content to verified and keeps tag/comment", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/task/task-123") && (!init || init.method === "GET")) {
        return new Response(
          JSON.stringify({
            markdown_content: "# Applicant\n- Email verification state: Email Unverified\n- Source: markdown",
            description: "- Email verification state: Email Unverified\n- Source: description",
            text_content: "- Email verification state: Email Unverified\n- Source: text",
          }),
          { status: 200 },
        );
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    globalThis.fetch = fetchMock;
    const token = createVerificationToken(
      {
        taskId: "task-123",
        email: "jane@example.com",
        exp: Date.now() + 60_000,
      },
      "test-secret",
    );

    const response = await GET(verificationRequest(token));
    const updateCall = fetchMock.mock.calls.find(
      ([input, init]) => String(input).endsWith("/task/task-123") && init?.method === "PUT",
    );
    const updateBody = JSON.parse(String(updateCall?.[1]?.body)) as { markdown_content: string };

    expect(response.status).toBe(200);
    expect(updateBody.markdown_content).toContain("Email verification state: Verified");
    expect(updateBody.markdown_content).toContain("Source: markdown");
    expect(updateBody.markdown_content).not.toContain("Source: description");
    expect(fetchMock.mock.calls.some(([input]) => String(input).includes("/task/task-123/comment"))).toBe(true);
    expect(fetchMock.mock.calls.some(([input]) => String(input).includes("Verified"))).toBe(true);
  });
});
