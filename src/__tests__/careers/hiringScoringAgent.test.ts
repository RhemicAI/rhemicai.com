import { afterEach, describe, expect, it, vi } from "vitest";
import {
  HiringTriageScore,
  hiringTriageScoreJsonSchema,
  scoreApplicationForRole,
  validateHiringTriageScore,
} from "@/lib/careers/hiringScoringAgent";

const originalOpenAiKey = process.env.OPENAI_API_KEY;
const originalHiringModel = process.env.OPENAI_HIRING_MODEL;
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
  process.env.OPENAI_HIRING_MODEL = originalHiringModel;
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("hiring scoring agent", () => {
  it("returns the fixed triage schema", async () => {
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
  });

  it("adds evidence gaps instead of inventing missing resume evidence", async () => {
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

  it("uses DeepSeek v4 Pro for the Responses API call by default", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    delete process.env.OPENAI_HIRING_MODEL;
    const fetchMock = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) =>
      new Response(JSON.stringify({ output_text: JSON.stringify(fixedScore) }), { status: 200 }),
    );
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

    const [, init] = fetchMock.mock.calls[0] as [string | URL | Request, RequestInit];
    const body = JSON.parse(String(init.body)) as { model: string };
    expect(body.model).toBe("deepseek-v4-pro");
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
