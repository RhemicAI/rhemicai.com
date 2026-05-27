import crypto from "crypto";
import { CareerRole, RecommendedNextStep, recommendedNextSteps } from "@/lib/careers";

export type CandidateApplication = {
  name: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl: string;
  linkedinUrl: string;
  availability: string;
  roleSlug: string;
  roleTitle: string;
  answers: string[];
};

export type HiringScore = {
  role_fit_score: number;
  communication_score: number;
  execution_clarity_score: number;
  systems_thinking_score: number;
  AI_tooling_score: number;
  domain_fit_score: number;
  risk_score: number;
  recommended_next_step: RecommendedNextStep;
  score_summary: string;
  strengths: string[];
  risks: string[];
  evidence_gaps: string[];
  suggested_test_task: string;
};

export type VerificationPayload = {
  taskId: string;
  email: string;
  exp: number;
};

export const hiringScoreJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "role_fit_score",
    "communication_score",
    "execution_clarity_score",
    "systems_thinking_score",
    "AI_tooling_score",
    "domain_fit_score",
    "risk_score",
    "recommended_next_step",
    "score_summary",
    "strengths",
    "risks",
    "evidence_gaps",
    "suggested_test_task",
  ],
  properties: {
    role_fit_score: { type: "integer", minimum: 0, maximum: 10 },
    communication_score: { type: "integer", minimum: 0, maximum: 10 },
    execution_clarity_score: { type: "integer", minimum: 0, maximum: 10 },
    systems_thinking_score: { type: "integer", minimum: 0, maximum: 10 },
    AI_tooling_score: { type: "integer", minimum: 0, maximum: 10 },
    domain_fit_score: { type: "integer", minimum: 0, maximum: 10 },
    risk_score: { type: "integer", minimum: 0, maximum: 10 },
    recommended_next_step: { type: "string", enum: recommendedNextSteps },
    score_summary: { type: "string" },
    strengths: { type: "array", items: { type: "string" } },
    risks: { type: "array", items: { type: "string" } },
    evidence_gaps: { type: "array", items: { type: "string" } },
    suggested_test_task: { type: "string" },
  },
} as const;

function hmac(input: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(input).digest("base64url");
}

export function createVerificationToken(payload: VerificationPayload, secret: string) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encodedPayload}.${hmac(encodedPayload, secret)}`;
}

export function verifyVerificationToken(token: string, secret: string): VerificationPayload | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expected = hmac(encodedPayload, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as VerificationPayload;
    if (!payload.taskId || !payload.email || !payload.exp || payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function buildApplicationMarkdown({
  candidate,
  role,
  resumeAttached,
  emailVerificationState,
  score,
  humanReviewer = "Unassigned",
  reviewStatus = "Human Review Needed",
}: {
  candidate: CandidateApplication;
  role: CareerRole;
  resumeAttached: boolean;
  emailVerificationState: "Email Unverified" | "Verified";
  score?: HiringScore | null;
  humanReviewer?: string;
  reviewStatus?: string;
}) {
  const answerLines = role.formQuestions
    .map((question, index) => {
      const answer = candidate.answers[index]?.trim() || "Not answered";
      return `**${question}**\n${answer}`;
    })
    .join("\n\n");

  const scoreBlock = score
    ? [
        `## AI Score Summary`,
        `AI score is triage only. Human review is mandatory before any candidate communication or decision.`,
        ``,
        `Recommended next step: ${score.recommended_next_step}`,
        `Summary: ${score.score_summary}`,
        ``,
        `## Rubric Breakdown`,
        `- role_fit_score: ${score.role_fit_score}/10`,
        `- communication_score: ${score.communication_score}/10`,
        `- execution_clarity_score: ${score.execution_clarity_score}/10`,
        `- systems_thinking_score: ${score.systems_thinking_score}/10`,
        `- AI_tooling_score: ${score.AI_tooling_score}/10`,
        `- domain_fit_score: ${score.domain_fit_score}/10`,
        `- risk_score: ${score.risk_score}/10`,
        ``,
        `## Strengths`,
        ...score.strengths.map((item) => `- ${item}`),
        ``,
        `## Risks`,
        ...score.risks.map((item) => `- ${item}`),
        ``,
        `## Evidence Gaps`,
        ...score.evidence_gaps.map((item) => `- ${item}`),
        ``,
        `## Suggested Test Task`,
        score.suggested_test_task,
      ].join("\n")
    : [
        `## AI Score Summary`,
        `Pending. AI score is triage only. Human review is mandatory before any candidate communication or decision.`,
        ``,
        `## Suggested Test Task`,
        role.suggestedTestTask,
      ].join("\n");

  return [
    `# ${candidate.name} — ${role.title} Applicant`,
    ``,
    `## Application State`,
    `- Candidate name: ${candidate.name}`,
    `- Role applied for: ${role.title}`,
    `- Email: ${candidate.email}`,
    `- Phone: ${candidate.phone || "Not provided"}`,
    `- Location: ${candidate.location || "Not provided"}`,
    `- LinkedIn: ${candidate.linkedinUrl || "Not provided"}`,
    `- Portfolio: ${candidate.portfolioUrl || "Not provided"}`,
    `- Availability: ${candidate.availability || "Not provided"}`,
    `- Email verification state: ${emailVerificationState}`,
    `- Resume attachment state: ${resumeAttached ? "Attached" : "Missing"}`,
    `- Human reviewer: ${humanReviewer}`,
    `- Review status: ${reviewStatus}`,
    ``,
    `## Operating-System Fit`,
    `- Bottleneck: ${role.bottleneck}`,
    `- Founder work removed: ${role.founderWorkRemoved}`,
    `- System plugged into: ${role.systemPluggedInto}`,
    `- First 30 days success: ${role.firstThirtyDaysSuccess}`,
    ``,
    `## Application Answers`,
    answerLines,
    ``,
    scoreBlock,
  ].join("\n");
}

export function buildScoringInstructions(role: CareerRole) {
  return [
    "You are scoring a hiring application for Rhemic AI.",
    "This is triage only. You must not make or imply a final hiring decision.",
    "Human review is mandatory before any candidate communication or decision.",
    "Score only from the submitted application answers and resume content.",
    "Do not invent experience, employment history, metrics, credentials, education, or tools.",
    "If evidence is missing, say \"not enough evidence\" in evidence_gaps or the relevant text field.",
    "Return JSON that exactly matches the schema.",
    "",
    `Role: ${role.title}`,
    `Operating bottleneck: ${role.bottleneck}`,
    `Founder work removed: ${role.founderWorkRemoved}`,
    `System plugged into: ${role.systemPluggedInto}`,
    `First 30 days success: ${role.firstThirtyDaysSuccess}`,
    `Default suggested test task: ${role.suggestedTestTask}`,
  ].join("\n");
}

export function safeScoreFallback(role: CareerRole, reason: string): HiringScore {
  return {
    role_fit_score: 0,
    communication_score: 0,
    execution_clarity_score: 0,
    systems_thinking_score: 0,
    AI_tooling_score: 0,
    domain_fit_score: 0,
    risk_score: 10,
    recommended_next_step: "hold",
    score_summary: `AI scoring did not complete. Human review required. Reason: ${reason}`,
    strengths: ["not enough evidence"],
    risks: ["AI scoring unavailable. Do not make a candidate decision from this fallback."],
    evidence_gaps: ["not enough evidence"],
    suggested_test_task: role.suggestedTestTask,
  };
}
