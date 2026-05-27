import { afterEach, describe, expect, it, vi } from "vitest";
import {
  HiringTriageScore,
  hiringTriageScoreJsonSchema,
  scoreApplicationForRole,
  validateHiringTriageScore,
} from "@/lib/careers/hiringScoringAgent";

const originalOpenAiKey = process.env.OPENAI_API_KEY;
const originalOpenAiHiringModel = process.env.OPENAI_HIRING_MODEL;
const originalHiringAiProvider = process.env.HIRING_AI_PROVIDER;
const originalDeepSeekKey = process.env.DEEPSEEK_API_KEY;
const originalDeepSeekBaseUrl = process.env.DEEPSEEK_BASE_URL;
const originalDeepSeekHiringModel = process.env.DEEPSEEK_HIRING_MODEL;
const originalFetch = globalThis.fetch;

const fixedScore: HiringTriageScore = {
  role_fit_score: 7,
  communication_score: 8,
  execution_clarity_score: 7,
  systems_thinking_score: 6,
  ai_tooling_score: 5,
  domain_fit_score: 8,
  risk_score: 3,
  recommended_next_step: "test_task",
  score_summary: "Grounded in the submitted answers.",
  strengths: ["Clear follow-up answer."],
  risks: ["CRM evidence is thin."],
  evidence_gaps: ["No quota history provided."],
  suggested_test_task: "Write a call opener and follow-up email for a med spa lead packet.",
};

afterEach(() => {
  process.env.OPENAI_API_KEY = originalOpenAiKey;
  process.env.OPENAI_HIRING_MODEL = originalOpenAiHiringModel;
  process.env.HIRING_AI_PROVIDER = originalHiringAiProvider;
  process.env.DEEPSEEK_API_KEY = originalDeepSeekKey;
  process.env.DEEPSEEK_BASE_URL = originalDeepSeekBaseUrl;
  process.env.DEEPSEEK_HIRING_MODEL = originalDeepSeekHiringModel;
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("hiring scoring agent", () => {
  it("returns the fixed triage schema", async () => {
    delete process.env.HIRING_AI_PROVIDER;
    delete process.env.OPENAI_API_KEY;

    const score = await scoreApplicationForRole({
      roleSlug: "sdr-appointment-setter",
      roleTitle: "SDR / Appointment Setter",
      candidateName: "Jane Smith",
      applicationAnswers: {
        "Write a 4-sentence call opener for a med spa owner who is missing consults from calls and follow-up gaps.":
          "I would open with the missed consult problem and ask one qualifying question.",
      },
    });

    expect(Object.keys(score)).toEqual(hiringTriageScoreJsonSchema.required);
    expect(score.recommended_next_step).toBe("hold");
    expect(score.score_summary).toContain("HIRING_AI_PROVIDER must be configured");
  });

  it("adds evidence gaps instead of inventing missing resume evidence", async () => {
    delete process.env.HIRING_AI_PROVIDER;
    delete process.env.OPENAI_API_KEY;

    const score = await scoreApplicationForRole({
      roleSlug: "sdr-appointment-setter",
      roleTitle: "SDR / Appointment Setter",
      candidateName: "Jane Smith",
      applicationAnswers: {
        "Describe how you would follow up with a lead who replied once, then went quiet.": "",
      },
    });

    expect(score.evidence_gaps).toContain(
      "Parsed resume text was not provided; do not infer work history, credentials, school, location, or prior experience.",
    );
    expect(score.evidence_gaps).toContain(
      "No submitted answer for: Describe how you would follow up with a lead who replied once, then went quiet.",
    );
    expect(score.strengths).toEqual(["not enough evidence"]);
  });

  it("uses DeepSeek chat completions when the provider is deepseek", async () => {
    process.env.HIRING_AI_PROVIDER = "deepseek";
    process.env.DEEPSEEK_API_KEY = "deepseek-key";
    delete process.env.DEEPSEEK_BASE_URL;
    delete process.env.DEEPSEEK_HIRING_MODEL;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      void input;
      void init;
      return new Response(
        JSON.stringify({
          choices: [{ message: { content: JSON.stringify(fixedScore) } }],
        }),
        { status: 200 },
      );
    });
    globalThis.fetch = fetchMock;

    await scoreApplicationForRole({
      roleSlug: "sdr-appointment-setter",
      roleTitle: "SDR / Appointment Setter",
      candidateName: "Jane Smith",
      applicationAnswers: {
        "Write a 4-sentence call opener for a med spa owner who is missing consults from calls and follow-up gaps.":
          "I would name the missed consult issue, ask how they handle callbacks, and book the audit.",
      },
      resumeText: "Jane ran follow-up for a med spa sales team.",
    });

    const [url, init] = fetchMock.mock.calls[0] as [string | URL | Request, RequestInit];
    const body = JSON.parse(String(init.body)) as {
      model: string;
      messages: Array<{ role: string; content: string }>;
    };
    expect(String(url)).toBe("https://api.deepseek.com/chat/completions");
    expect(body.model).toBe("deepseek-v4-pro");
    expect(body.messages[0].role).toBe("system");
    expect(body.messages[1].role).toBe("user");
  });

  it("uses OpenAI Responses API only when the provider is openai", async () => {
    process.env.HIRING_AI_PROVIDER = "openai";
    process.env.OPENAI_API_KEY = "openai-key";
    delete process.env.OPENAI_HIRING_MODEL;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      void input;
      void init;
      return new Response(JSON.stringify({ output_text: JSON.stringify(fixedScore) }), { status: 200 });
    });
    globalThis.fetch = fetchMock;

    await scoreApplicationForRole({
      roleSlug: "sdr-appointment-setter",
      roleTitle: "SDR / Appointment Setter",
      candidateName: "Jane Smith",
      applicationAnswers: {
        "Write a 4-sentence call opener for a med spa owner who is missing consults from calls and follow-up gaps.":
          "I would name the missed consult issue, ask how they handle callbacks, and book the audit.",
      },
      resumeText: "Jane ran follow-up for a med spa sales team.",
    });

    const [url, init] = fetchMock.mock.calls[0] as [string | URL | Request, RequestInit];
    const body = JSON.parse(String(init.body)) as {
      model: string;
      text: { format: { type: string; schema: unknown } };
    };
    expect(String(url)).toBe("https://api.openai.com/v1/responses");
    expect(body.model).toBe("gpt-4.1-mini");
    expect(body.model).not.toContain("deepseek");
    expect(body.text.format.type).toBe("json_schema");
  });

  it("normalizes invalid model output into the schema", () => {
    const score = validateHiringTriageScore(
      {
        role_fit_score: 99,
        recommended_next_step: "auto_hire",
      },
      "Fallback test task",
    );

    expect(score.role_fit_score).toBe(10);
    expect(score.recommended_next_step).toBe("hold");
    expect(score.ai_tooling_score).toBe(0);
    expect(score.suggested_test_task).toBe("Fallback test task");
  });
});
