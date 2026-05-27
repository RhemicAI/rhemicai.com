import crypto from "crypto";
import { CareerRole } from "@/lib/careers";
import { HiringTriageScore } from "@/lib/careers/hiringScoringAgent";

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

export type HiringScore = HiringTriageScore;

export type VerificationPayload = {
  taskId: string;
  email: string;
  exp: number;
};

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
  emailConfirmationState = "Pending",
  emailFailureReason,
}: {
  candidate: CandidateApplication;
  role: CareerRole;
  resumeAttached: boolean;
  emailVerificationState: "Email Unverified" | "Verified";
  score?: HiringScore | null;
  humanReviewer?: string;
  reviewStatus?: string;
  emailConfirmationState?: "Pending" | "Confirmation Email Sent" | "Confirmation Email Failed";
  emailFailureReason?: string;
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
        `- ai_tooling_score: ${score.ai_tooling_score}/10`,
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
    `- Confirmation email state: ${emailConfirmationState}`,
    ...(emailFailureReason ? [`- Confirmation email failure reason: ${emailFailureReason}`] : []),
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
