import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST, resetCareerApplicationGuardsForTests } from "@/app/api/careers/applications/route";
import { careersRoles } from "@/lib/careers";
import { HiringTriageScore } from "@/lib/careers/hiringScoringAgent";

const scoreApplicationForRoleMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/careers/hiringScoringAgent", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/careers/hiringScoringAgent")>();
  return {
    ...actual,
    scoreApplicationForRole: scoreApplicationForRoleMock,
  };
});

const originalFetch = globalThis.fetch;
const originalEnv = {
  CLICKUP_API_TOKEN: process.env.CLICKUP_API_TOKEN,
  CLICKUP_APPLICATION_LIST_ID: process.env.CLICKUP_APPLICATION_LIST_ID,
  N8N_HIRING_VERIFY_WEBHOOK_URL: process.env.N8N_HIRING_VERIFY_WEBHOOK_URL,
  HIRING_VERIFY_SECRET: process.env.HIRING_VERIFY_SECRET,
};

const sdrRole = careersRoles[0];

const scoredApplication: HiringTriageScore = {
  role_fit_score: 8,
  communication_score: 8,
  execution_clarity_score: 7,
  systems_thinking_score: 6,
  ai_tooling_score: 5,
  domain_fit_score: 8,
  risk_score: 2,
  recommended_next_step: "test_task",
  score_summary: "Application answers show enough SDR signal for a test task.",
  strengths: ["Specific med spa opener."],
  risks: ["Limited CRM detail."],
  evidence_gaps: ["No resume text was parsed."],
  suggested_test_task: sdrRole.suggestedTestTask,
};

function applicationFormData({
  roleSlug = sdrRole.slug,
  email = "jane@example.com",
  resumeContent = "%PDF-1.4 test",
}: {
  roleSlug?: string;
  email?: string;
  resumeContent?: string;
} = {}) {
  const formData = new FormData();
  formData.set("roleSlug", roleSlug);
  formData.set("name", "Jane Smith");
  formData.set("email", email);
  formData.set("phone", "555-0000");
  formData.set("location", "Dallas, TX");
  formData.set("portfolioUrl", "https://example.com");
  formData.set("linkedinUrl", "https://linkedin.com/in/jane");
  formData.set("availability", "Immediate");
  formData.set("answers", JSON.stringify(["Answer one", "Answer two", "Answer three"]));
  formData.set("resume", new File([resumeContent], "resume.pdf", { type: "application/pdf" }));
  return formData;
}

function mockSuccessfulExternalWrites() {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url.includes("/list/") && init?.method !== "POST") {
      return new Response(JSON.stringify({ tasks: [] }), { status: 200 });
    }
    if (url.includes("/list/") && init?.method === "POST") {
      return new Response(JSON.stringify({ id: "task-123", url: "https://app.clickup.com/t/task-123" }), {
        status: 200,
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  });
  globalThis.fetch = fetchMock;
  return fetchMock;
}

beforeEach(() => {
  resetCareerApplicationGuardsForTests();
  process.env.CLICKUP_API_TOKEN = "clickup-token";
  process.env.CLICKUP_APPLICATION_LIST_ID = "list-123";
  process.env.N8N_HIRING_VERIFY_WEBHOOK_URL = "https://n8n.example.com/hiring";
  process.env.HIRING_VERIFY_SECRET = "test-secret";
  scoreApplicationForRoleMock.mockResolvedValue(scoredApplication);
});

afterEach(() => {
  process.env.CLICKUP_API_TOKEN = originalEnv.CLICKUP_API_TOKEN;
  process.env.CLICKUP_APPLICATION_LIST_ID = originalEnv.CLICKUP_APPLICATION_LIST_ID;
  process.env.N8N_HIRING_VERIFY_WEBHOOK_URL = originalEnv.N8N_HIRING_VERIFY_WEBHOOK_URL;
  process.env.HIRING_VERIFY_SECRET = originalEnv.HIRING_VERIFY_SECRET;
  globalThis.fetch = originalFetch;
  vi.clearAllMocks();
});

describe("careers application route scoring", () => {
  it("calls the scoring module for valid SDR applications", async () => {
    const fetchMock = mockSuccessfulExternalWrites();
    const request = new Request("http://localhost/api/careers/applications", {
      method: "POST",
      body: applicationFormData(),
    });

    const response = await POST(request as Parameters<typeof POST>[0]);
    const body = (await response.json()) as { success: boolean; scoringStatus: string };

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.scoringStatus).toBe("scored");
    expect(scoreApplicationForRoleMock).toHaveBeenCalledWith({
      roleSlug: sdrRole.slug,
      roleTitle: sdrRole.title,
      candidateName: "Jane Smith",
      applicationAnswers: {
        [sdrRole.formQuestions[0]]: "Answer one",
        [sdrRole.formQuestions[1]]: "Answer two",
        [sdrRole.formQuestions[2]]: "Answer three",
      },
      resumeText: undefined,
    });
    expect(fetchMock).toHaveBeenCalled();
  });

  it("does not call the scoring agent for coming-soon role applications", async () => {
    const fetchMock = mockSuccessfulExternalWrites();
    const request = new Request("http://localhost/api/careers/applications", {
      method: "POST",
      body: applicationFormData({ roleSlug: "client-success-ops-coordinator" }),
    });

    const response = await POST(request as Parameters<typeof POST>[0]);
    const body = (await response.json()) as { success: boolean; error: string };

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toBe("This role is not open for applications yet");
    expect(scoreApplicationForRoleMock).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("keeps the ClickUp task and writes a clear failure state when AI scoring fails", async () => {
    const fetchMock = mockSuccessfulExternalWrites();
    scoreApplicationForRoleMock.mockResolvedValue({
      ...scoredApplication,
      role_fit_score: 0,
      communication_score: 0,
      execution_clarity_score: 0,
      systems_thinking_score: 0,
      ai_tooling_score: 0,
      domain_fit_score: 0,
      risk_score: 10,
      recommended_next_step: "hold",
      score_summary: "AI scoring did not complete. Human review required. Reason: OpenAI scoring failed",
      strengths: ["not enough evidence"],
      risks: ["AI scoring unavailable. Do not make a candidate decision from this fallback."],
      evidence_gaps: ["not enough evidence"],
    });
    const request = new Request("http://localhost/api/careers/applications", {
      method: "POST",
      body: applicationFormData(),
    });

    const response = await POST(request as Parameters<typeof POST>[0]);
    const body = (await response.json()) as { success: boolean; scoringStatus: string };
    const methods = fetchMock.mock.calls.map(([, init]) => init?.method);
    const updateCall = fetchMock.mock.calls.find(
      ([input, init]) => String(input).includes("/task/task-123") && init?.method === "PUT",
    );
    const updateBody = JSON.parse(String(updateCall?.[1]?.body)) as { markdown_content: string };

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.scoringStatus).toBe("failed");
    expect(methods).not.toContain("DELETE");
    expect(updateBody.markdown_content).toContain("AI scoring did not complete");
    expect(updateBody.markdown_content).toContain("Human Review Needed");
    expect(fetchMock.mock.calls.some(([input]) => String(input).includes("AI%20Scoring%20Failed"))).toBe(true);
  });

  it("rejects duplicate applicants before creating another ClickUp task", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/list/") && init?.method !== "POST") {
        return new Response(
          JSON.stringify({ tasks: [{ text_content: "Email: jane@example.com\nRole applied for: SDR" }] }),
          { status: 200 },
        );
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    globalThis.fetch = fetchMock;
    const request = new Request("http://localhost/api/careers/applications", {
      method: "POST",
      body: applicationFormData(),
    });

    const response = await POST(request as Parameters<typeof POST>[0]);
    const body = (await response.json()) as { success: boolean; error: string };

    expect(response.status).toBe(409);
    expect(body.error).toBe("Only one application can be submitted per person.");
    expect(scoreApplicationForRoleMock).not.toHaveBeenCalled();
    expect(fetchMock.mock.calls.some(([input, init]) => String(input).includes("/list/") && init?.method === "POST")).toBe(false);
  });

  it("rejects PDFs with invalid magic bytes before ClickUp task creation", async () => {
    const fetchMock = mockSuccessfulExternalWrites();
    const request = new Request("http://localhost/api/careers/applications", {
      method: "POST",
      body: applicationFormData({ email: "bad-pdf@example.com", resumeContent: "not a real pdf" }),
    });

    const response = await POST(request as Parameters<typeof POST>[0]);
    const body = (await response.json()) as { success: boolean; error: string };

    expect(response.status).toBe(400);
    expect(body.error).toBe("Resume must be a valid PDF");
    expect(scoreApplicationForRoleMock).not.toHaveBeenCalled();
    expect(fetchMock.mock.calls.some(([input, init]) => String(input).includes("/list/") && init?.method === "POST")).toBe(false);
  });

  it("rate limits repeated application attempts before the expensive path", async () => {
    mockSuccessfulExternalWrites();

    for (let index = 0; index < 3; index += 1) {
      const response = await POST(
        new Request("http://localhost/api/careers/applications", {
          method: "POST",
          headers: { "x-forwarded-for": "203.0.113.10" },
          body: applicationFormData({ email: "limit@example.com" }),
        }) as Parameters<typeof POST>[0],
      );
      expect(response.status).toBe(200);
    }

    const limitedResponse = await POST(
      new Request("http://localhost/api/careers/applications", {
        method: "POST",
        headers: { "x-forwarded-for": "203.0.113.10" },
        body: applicationFormData({ email: "limit@example.com" }),
      }) as Parameters<typeof POST>[0],
    );
    const body = (await limitedResponse.json()) as { success: boolean; error: string };

    expect(limitedResponse.status).toBe(429);
    expect(limitedResponse.headers.get("Retry-After")).toBeTruthy();
    expect(body.error).toBe("Too many application attempts. Please wait before trying again.");
  });

  it("signs the N8N verification webhook payload", async () => {
    const fetchMock = mockSuccessfulExternalWrites();
    const request = new Request("http://localhost/api/careers/applications", {
      method: "POST",
      body: applicationFormData({ email: "signed@example.com" }),
    });

    await POST(request as Parameters<typeof POST>[0]);

    const n8nCall = fetchMock.mock.calls.find(([input]) => String(input) === "https://n8n.example.com/hiring");
    const headers = n8nCall?.[1]?.headers as Record<string, string>;
    expect(headers["X-Rhemic-Signature"]).toMatch(/^sha256=[a-f0-9]{64}$/);
  });
});
