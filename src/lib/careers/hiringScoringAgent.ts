import {
  CareerRole,
  RecommendedNextStep,
  getCareerRole,
  recommendedNextSteps,
} from "@/lib/careers";

export type HiringTriageScore = {
  role_fit_score: number;
  communication_score: number;
  execution_clarity_score: number;
  systems_thinking_score: number;
  ai_tooling_score: number;
  domain_fit_score: number;
  risk_score: number;
  recommended_next_step:
    | "reject"
    | "hold"
    | "test_task"
    | "interview"
    | "strong_candidate";
  score_summary: string;
  strengths: string[];
  risks: string[];
  evidence_gaps: string[];
  suggested_test_task: string;
};

export type ScoreApplicationForRoleInput = {
  roleSlug: string;
  roleTitle: string;
  candidateName: string;
  applicationAnswers: Record<string, string>;
  resumeText?: string;
};

type RoleScoringRubric = {
  focus: string[];
  strongEvidence: string[];
  riskEvidence: string[];
};

type HiringAiProvider = "openai" | "deepseek";
type ScoreAlias = keyof HiringTriageScore;

export const hiringTriageScoreJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "role_fit_score",
    "communication_score",
    "execution_clarity_score",
    "systems_thinking_score",
    "ai_tooling_score",
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
    ai_tooling_score: { type: "integer", minimum: 0, maximum: 10 },
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

export const roleScoringRubrics: Record<string, RoleScoringRubric> = {
  "sdr-appointment-setter": {
    focus: [
      "med spa owner call openers",
      "follow-up discipline",
      "CRM reliability",
      "clear qualification thinking",
    ],
    strongEvidence: [
      "specific outbound sales process",
      "concise owner-facing writing",
      "proof of repeated follow-up without vague claims",
    ],
    riskEvidence: [
      "generic sales language without med spa or consult-leak context",
      "no CRM habit",
      "answers that skip qualification or next-step ownership",
    ],
  },
  "client-success-ops-coordinator": {
    focus: [
      "turning messy client context into checklists",
      "client update clarity",
      "multi-client follow-through",
    ],
    strongEvidence: [
      "structured onboarding capture",
      "clear dependency tracking",
      "calm client communication",
    ],
    riskEvidence: [
      "vague coordination claims",
      "no method for tracking waiting states",
      "overly long or unclear client updates",
    ],
  },
  "fulfillment-specialist": {
    focus: [
      "med spa website inspection",
      "consult-leak detection",
      "QA-ready delivery notes",
    ],
    strongEvidence: [
      "specific conversion and visibility checks",
      "clear before-and-after deliverable thinking",
      "practical information requests before review",
    ],
    riskEvidence: [
      "only aesthetic website feedback",
      "no prioritization",
      "unclear handoff writing",
    ],
  },
  "technical-automation-engineer": {
    focus: [
      "safe internal automations",
      "ClickUp or CRM integration thinking",
      "failure-mode naming",
      "human-in-the-loop judgment",
    ],
    strongEvidence: [
      "duplicate-write prevention",
      "idempotency or audit trail thinking",
      "clear boundaries for agent autonomy",
    ],
    riskEvidence: [
      "automation without review states",
      "no rollback or retry thinking",
      "unclear data ownership",
    ],
  },
};

const DEFAULT_OPENAI_HIRING_MODEL = "gpt-4.1-mini";
const DEFAULT_DEEPSEEK_BASE_URL = "https://api.deepseek.com";
const DEFAULT_DEEPSEEK_HIRING_MODEL = "deepseek-v4-pro";
const AI_SCORING_TIMEOUT_MS = 10_000;
const SCORING_FAILURE_PREFIX = "AI scoring did not complete.";

function roleFromInput(input: ScoreApplicationForRoleInput): CareerRole {
  return (
    getCareerRole(input.roleSlug) ?? {
      slug: input.roleSlug,
      title: input.roleTitle,
      status: "open",
      type: "Hiring intake",
      bottleneck: "not enough evidence",
      founderWorkRemoved: "not enough evidence",
      systemPluggedInto: "not enough evidence",
      firstThirtyDaysSuccess: "not enough evidence",
      description: "not enough evidence",
      tags: [],
      formQuestions: Object.keys(input.applicationAnswers),
      suggestedTestTask: "Manual reviewer should assign a role-specific test task.",
    }
  );
}

function evidenceGapsFromInput(input: ScoreApplicationForRoleInput) {
  const gaps: string[] = [];
  if (!input.resumeText?.trim()) {
    gaps.push("Parsed resume text was not provided; do not infer work history, credentials, school, location, or prior experience.");
  }

  for (const [question, answer] of Object.entries(input.applicationAnswers)) {
    if (!answer.trim()) {
      gaps.push(`No submitted answer for: ${question}`);
    }
  }

  return gaps;
}

export function buildScoringInstructions(role: CareerRole) {
  const rubric = roleScoringRubrics[role.slug];

  return [
    "You are the Rhemic AI hiring scoring agent.",
    "This score is triage only. You must not make or imply a final hiring decision.",
    "Human review is mandatory before any candidate communication or decision.",
    "The model may only evaluate the submitted application answers and parsed resume text. It must not infer, invent, or assume missing work history, credentials, results, school, location, or prior experience. If evidence is missing, it must add that gap to evidence_gaps.",
    "Do not use the candidate's name, email, links, or any external knowledge as evidence of skill or experience.",
    "Keep strengths, risks, and summaries grounded in direct evidence from the submitted text.",
    "Return JSON that exactly matches the schema.",
    "",
    `Role: ${role.title}`,
    `Operating bottleneck: ${role.bottleneck}`,
    `Founder work removed: ${role.founderWorkRemoved}`,
    `System plugged into: ${role.systemPluggedInto}`,
    `First 30 days success: ${role.firstThirtyDaysSuccess}`,
    `Default suggested test task: ${role.suggestedTestTask}`,
    "",
    "Role-specific rubric:",
    `Focus: ${rubric?.focus.join("; ") || "not enough evidence"}`,
    `Strong evidence: ${rubric?.strongEvidence.join("; ") || "not enough evidence"}`,
    `Risk evidence: ${rubric?.riskEvidence.join("; ") || "not enough evidence"}`,
  ].join("\n");
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

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_SCORING_TIMEOUT_MS);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function extractChatCompletionContent(response: unknown) {
  const choices = (response as { choices?: Array<{ message?: { content?: unknown } }> })?.choices;
  const content = choices?.[0]?.message?.content;
  return typeof content === "string" ? content : "";
}

function parseJsonObject(text: string, source: string) {
  try {
    const parsed = JSON.parse(text) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("parsed JSON was not an object");
    }
    return parsed;
  } catch (error) {
    const message = error instanceof Error ? error.message : "invalid JSON";
    throw new Error(`${source} returned invalid JSON: ${message}`);
  }
}

function assertHiringTriageScoreSchema(rawScore: unknown) {
  if (!rawScore || typeof rawScore !== "object" || Array.isArray(rawScore)) {
    throw new Error("Hiring score must be an object");
  }

  const score = rawScore as Record<string, unknown>;
  const required = hiringTriageScoreJsonSchema.required;
  for (const key of required) {
    if (!(key in score)) {
      throw new Error(`Hiring score missing required field: ${key}`);
    }
  }

  const numericFields = [
    "role_fit_score",
    "communication_score",
    "execution_clarity_score",
    "systems_thinking_score",
    "ai_tooling_score",
    "domain_fit_score",
    "risk_score",
  ];
  for (const key of numericFields) {
    const value = score[key];
    if (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > 10) {
      throw new Error(`Hiring score field ${key} must be an integer from 0 to 10`);
    }
  }

  if (!recommendedNextSteps.includes(score.recommended_next_step as RecommendedNextStep)) {
    throw new Error("Hiring score recommended_next_step is invalid");
  }

  for (const key of ["score_summary", "suggested_test_task"]) {
    if (typeof score[key] !== "string") {
      throw new Error(`Hiring score field ${key} must be a string`);
    }
  }

  for (const key of ["strengths", "risks", "evidence_gaps"]) {
    const value = score[key];
    if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
      throw new Error(`Hiring score field ${key} must be a string array`);
    }
  }
}

const scoreFieldAliases: Record<ScoreAlias, string[]> = {
  role_fit_score: ["role_fit_score", "roleFitScore", "role_fit", "roleFit", "role"],
  communication_score: ["communication_score", "communicationScore", "communication"],
  execution_clarity_score: ["execution_clarity_score", "executionClarityScore", "execution_clarity", "executionClarity", "execution"],
  systems_thinking_score: ["systems_thinking_score", "systemsThinkingScore", "systems_thinking", "systemsThinking", "systems"],
  ai_tooling_score: ["ai_tooling_score", "aiToolingScore", "ai_tools_score", "aiToolsScore", "ai_tooling", "aiTooling"],
  domain_fit_score: ["domain_fit_score", "domainFitScore", "domain_fit", "domainFit", "domain"],
  risk_score: ["risk_score", "riskScore", "risk"],
  recommended_next_step: ["recommended_next_step", "recommendedNextStep"],
  score_summary: ["score_summary", "scoreSummary", "summary", "overall_summary", "overallSummary", "rationale"],
  strengths: ["strengths"],
  risks: ["risks"],
  evidence_gaps: ["evidence_gaps", "evidenceGaps"],
  suggested_test_task: ["suggested_test_task", "suggestedTestTask"],
};

const scoreContainerKeys = [
  "score",
  "scores",
  "triage_score",
  "triageScore",
  "hiring_triage_score",
  "hiringTriageScore",
  "result",
];

function pickObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function collectObjects(value: unknown, depth = 0): Array<Record<string, unknown>> {
  const object = pickObject(value);
  if (!object || depth > 4) return [];

  return [
    object,
    ...Object.values(object).flatMap((item) => collectObjects(item, depth + 1)),
  ];
}

function scoreValue(value: unknown) {
  if (pickObject(value)) {
    const object = value as Record<string, unknown>;
    return object.score ?? object.rating ?? object.value;
  }

  return value;
}

function normalizeScoreShape(rawScore: unknown): Record<string, unknown> {
  const candidates = collectObjects(rawScore);

  for (const candidate of candidates) {
    if (!candidate) continue;
    const normalized: Record<string, unknown> = {};
    for (const [targetKey, aliases] of Object.entries(scoreFieldAliases)) {
      const foundAlias = aliases.find((alias) => alias in candidate);
      if (foundAlias) normalized[targetKey] = scoreValue(candidate[foundAlias]);
    }
    if (Object.keys(normalized).length >= 3) {
      return normalized;
    }
  }

  const root = pickObject(rawScore);
  if (root) {
    for (const key of scoreContainerKeys) {
      const nested: Record<string, unknown> = normalizeScoreShape(root[key]);
      if (nested !== root[key]) return nested;
    }
  }

  return pickObject(rawScore) ?? {};
}

function missingScoreFields(rawScore: unknown) {
  const score = pickObject(rawScore) ?? {};
  return hiringTriageScoreJsonSchema.required.filter((key) => !(key in score));
}

function normalizeProviderScore(
  rawScore: unknown,
  fallbackTask: string,
  requiredEvidenceGaps: string[],
) {
  const normalizedScore = normalizeScoreShape(rawScore);
  const missing = missingScoreFields(normalizedScore);
  const normalizedEvidenceGaps = missing.length
    ? [
        ...requiredEvidenceGaps,
        `Provider returned incomplete score JSON; normalized missing fields to safe defaults: ${missing.join(", ")}`,
      ]
    : requiredEvidenceGaps;
  const score = validateHiringTriageScore(normalizedScore, fallbackTask, normalizedEvidenceGaps);
  assertHiringTriageScoreSchema(score);
  return score;
}

function logScoringFailure(provider: HiringAiProvider, error: unknown) {
  const message = error instanceof Error ? error.message : "unknown scoring error";
  console.warn("Hiring AI scoring failed", {
    provider,
    model:
      provider === "openai"
        ? process.env.OPENAI_HIRING_MODEL || DEFAULT_OPENAI_HIRING_MODEL
        : process.env.DEEPSEEK_HIRING_MODEL || DEFAULT_DEEPSEEK_HIRING_MODEL,
    reason: message.slice(0, 300),
  });
}

function boundedScore(value: unknown, fallback: number) {
  const numberValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numberValue)) return fallback;
  return Math.max(0, Math.min(10, Math.round(numberValue)));
}

function stringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));
  return cleaned.length ? cleaned : fallback;
}

export function validateHiringTriageScore(
  rawScore: unknown,
  fallbackTask: string,
  requiredEvidenceGaps: string[] = [],
): HiringTriageScore {
  const score = rawScore && typeof rawScore === "object" ? (rawScore as Partial<HiringTriageScore>) : {};
  const nextStep = score.recommended_next_step;
  const recommendedNextStep: RecommendedNextStep = recommendedNextSteps.includes(nextStep as RecommendedNextStep)
    ? (nextStep as RecommendedNextStep)
    : "hold";
  const evidenceGaps = [
    ...stringArray(score.evidence_gaps, ["not enough evidence"]),
    ...requiredEvidenceGaps,
  ];

  return {
    role_fit_score: boundedScore(score.role_fit_score, 0),
    communication_score: boundedScore(score.communication_score, 0),
    execution_clarity_score: boundedScore(score.execution_clarity_score, 0),
    systems_thinking_score: boundedScore(score.systems_thinking_score, 0),
    ai_tooling_score: boundedScore(score.ai_tooling_score, 0),
    domain_fit_score: boundedScore(score.domain_fit_score, 0),
    risk_score: boundedScore(score.risk_score, 10),
    recommended_next_step: recommendedNextStep,
    score_summary: typeof score.score_summary === "string" && score.score_summary.trim()
      ? score.score_summary
      : "not enough evidence",
    strengths: stringArray(score.strengths, ["not enough evidence"]),
    risks: stringArray(score.risks, ["not enough evidence"]),
    evidence_gaps: Array.from(new Set(evidenceGaps)),
    suggested_test_task:
      typeof score.suggested_test_task === "string" && score.suggested_test_task.trim()
        ? score.suggested_test_task
        : fallbackTask,
  };
}

export function safeScoreFallback(role: CareerRole, reason: string): HiringTriageScore {
  return {
    role_fit_score: 0,
    communication_score: 0,
    execution_clarity_score: 0,
    systems_thinking_score: 0,
    ai_tooling_score: 0,
    domain_fit_score: 0,
    risk_score: 10,
    recommended_next_step: "hold",
    score_summary: `${SCORING_FAILURE_PREFIX} Human review required. Reason: ${reason}`,
    strengths: ["not enough evidence"],
    risks: ["AI scoring unavailable. Do not make a candidate decision from this fallback."],
    evidence_gaps: ["not enough evidence"],
    suggested_test_task: role.suggestedTestTask,
  };
}

export function isHiringScoringFailure(score: HiringTriageScore) {
  return score.score_summary.startsWith(SCORING_FAILURE_PREFIX);
}

function getHiringAiProvider(): HiringAiProvider | null {
  const provider = process.env.HIRING_AI_PROVIDER;
  if (provider === "openai" || provider === "deepseek") {
    return provider;
  }
  return null;
}

function buildModelInput(input: ScoreApplicationForRoleInput, role: CareerRole) {
  return {
    candidate: {
      name: input.candidateName,
      role: input.roleTitle,
    },
    role: {
      slug: role.slug,
      title: role.title,
      rubric: roleScoringRubrics[role.slug] ?? null,
    },
    applicationAnswers: input.applicationAnswers,
    resumeText: input.resumeText?.trim() || "not enough evidence",
  };
}

async function scoreWithOpenAi({
  input,
  role,
  requiredEvidenceGaps,
}: {
  input: ScoreApplicationForRoleInput;
  role: CareerRole;
  requiredEvidenceGaps: string[];
}) {
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) {
    throw new Error("OPENAI_API_KEY is not configured for HIRING_AI_PROVIDER=openai");
  }

  const response = await fetchWithTimeout("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_HIRING_MODEL || DEFAULT_OPENAI_HIRING_MODEL,
      store: false,
      instructions: buildScoringInstructions(role),
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify(buildModelInput(input, role)),
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "hiring_application_score",
          strict: true,
          schema: hiringTriageScoreJsonSchema,
        },
      },
    }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`OpenAI scoring failed: ${response.status} ${text}`);
  }

  const outputText = extractOutputText(parseJsonObject(text, "OpenAI scoring"));
  if (!outputText) {
    throw new Error("OpenAI scoring returned no output text");
  }

  const rawScore = parseJsonObject(outputText, "OpenAI scoring output");
  assertHiringTriageScoreSchema(rawScore);
  return validateHiringTriageScore(rawScore, role.suggestedTestTask, requiredEvidenceGaps);
}

async function scoreWithDeepSeek({
  input,
  role,
  requiredEvidenceGaps,
}: {
  input: ScoreApplicationForRoleInput;
  role: CareerRole;
  requiredEvidenceGaps: string[];
}) {
  const deepSeekKey = process.env.DEEPSEEK_API_KEY;
  if (!deepSeekKey) {
    throw new Error("DEEPSEEK_API_KEY is not configured for HIRING_AI_PROVIDER=deepseek");
  }

  const baseUrl = (process.env.DEEPSEEK_BASE_URL || DEFAULT_DEEPSEEK_BASE_URL).replace(/\/$/, "");
  const response = await fetchWithTimeout(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${deepSeekKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_HIRING_MODEL || DEFAULT_DEEPSEEK_HIRING_MODEL,
      messages: [
        {
          role: "system",
          content: buildScoringInstructions(role),
        },
        {
          role: "user",
          content: JSON.stringify(buildModelInput(input, role)),
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0,
    }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`DeepSeek scoring failed: ${response.status} ${text}`);
  }

  const outputText = extractChatCompletionContent(parseJsonObject(text, "DeepSeek scoring"));
  if (!outputText) {
    throw new Error("DeepSeek scoring returned no message content");
  }

  const rawScore = parseJsonObject(outputText, "DeepSeek scoring output");
  return normalizeProviderScore(rawScore, role.suggestedTestTask, requiredEvidenceGaps);
}

export async function scoreApplicationForRole(
  input: ScoreApplicationForRoleInput,
): Promise<HiringTriageScore> {
  const role = roleFromInput(input);
  const requiredEvidenceGaps = evidenceGapsFromInput(input);
  const provider = getHiringAiProvider();

  if (!provider) {
    return validateHiringTriageScore(
      safeScoreFallback(role, "HIRING_AI_PROVIDER must be configured as openai or deepseek"),
      role.suggestedTestTask,
      requiredEvidenceGaps,
    );
  }

  try {
    if (provider === "openai") {
      return await scoreWithOpenAi({ input, role, requiredEvidenceGaps });
    }
    return await scoreWithDeepSeek({ input, role, requiredEvidenceGaps });
  } catch (error) {
    logScoringFailure(provider, error);
    const message = error instanceof Error ? error.message : "unknown scoring error";
    return validateHiringTriageScore(
      safeScoreFallback(role, message.slice(0, 500)),
      role.suggestedTestTask,
      requiredEvidenceGaps,
    );
  }
}
