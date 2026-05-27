import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/careers/applications/route";
import {
  hiringTriageScoreJsonSchema,
  safeScoreFallback,
} from "@/lib/careers/hiringScoringAgent";
import { careersRoles } from "@/lib/careers";
import {
  CandidateApplication,
  buildApplicationMarkdown,
  createVerificationToken,
  verifyVerificationToken,
} from "@/lib/hiring";

const role = careersRoles[0];

const candidate: CandidateApplication = {
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "555-0000",
  location: "Dallas, TX",
  portfolioUrl: "https://example.com",
  linkedinUrl: "https://linkedin.com/in/jane",
  availability: "Immediate",
  roleSlug: role.slug,
  roleTitle: role.title,
  answers: ["Answer one", "Answer two", "Answer three"],
};

describe("hiring helpers", () => {
  it("requires the full score rubric in structured output schema", () => {
    expect(hiringTriageScoreJsonSchema.required).toEqual([
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
    ]);
  });

  it("creates and verifies signed verification tokens", () => {
    const secret = "test-secret";
    const token = createVerificationToken(
      {
        taskId: "86abc",
        email: "jane@example.com",
        exp: Date.now() + 60_000,
      },
      secret,
    );

    expect(verifyVerificationToken(token, secret)).toMatchObject({
      taskId: "86abc",
      email: "jane@example.com",
    });
    expect(verifyVerificationToken(`${token}tampered`, secret)).toBeNull();
  });

  it("renders ClickUp task markdown with human review mandatory", () => {
    const markdown = buildApplicationMarkdown({
      candidate,
      role,
      resumeAttached: true,
      emailVerificationState: "Email Unverified",
      score: safeScoreFallback(role, "test"),
    });

    expect(markdown).toContain("Candidate name: Jane Smith");
    expect(markdown).toContain(`Role applied for: ${role.title}`);
    expect(markdown).toContain("Resume attachment state: Attached");
    expect(markdown).toContain("Email verification state: Email Unverified");
    expect(markdown).toContain("AI score is triage only");
    expect(markdown).toContain("Human review is mandatory before any candidate communication or decision");
    expect(markdown).toContain("Suggested Test Task");
  });

  it("rejects coming-soon role slugs before any ClickUp write", async () => {
    const formData = new FormData();
    formData.set("roleSlug", "client-success-ops-coordinator");

    const request = new Request("http://localhost/api/careers/applications", {
      method: "POST",
      body: formData,
    });

    const response = await POST(request as Parameters<typeof POST>[0]);
    const body = (await response.json()) as { success: boolean; error: string };

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toBe("This role is not open for applications yet");
  });
});
