import { describe, expect, it } from "vitest";
import { careersRoles, hiringPipelineLabels, recommendedNextSteps } from "@/lib/careers";
import { buildScoringInstructions } from "@/lib/hiring";

describe("careers role model", () => {
  it("defines the four approved hiring bottleneck roles", () => {
    expect(careersRoles.map((role) => role.slug)).toEqual([
      "sdr-appointment-setter",
      "client-success-ops-coordinator",
      "fulfillment-specialist",
      "technical-automation-engineer",
    ]);
  });

  it("maps each role to bottleneck, founder work, system, and 30-day success", () => {
    for (const role of careersRoles) {
      expect(role.bottleneck).toBeTruthy();
      expect(role.founderWorkRemoved).toBeTruthy();
      expect(role.systemPluggedInto).toBeTruthy();
      expect(role.firstThirtyDaysSuccess).toBeTruthy();
      expect(role.suggestedTestTask).toBeTruthy();
      expect(role.formQuestions).toHaveLength(3);
    }
  });

  it("locks the allowed hiring pipeline labels and next steps", () => {
    expect(hiringPipelineLabels).toContain("Human Review Needed");
    expect(hiringPipelineLabels).toContain("Email Unverified");
    expect(hiringPipelineLabels).toContain("AI Scored");
    expect(recommendedNextSteps).toEqual([
      "reject",
      "hold",
      "test_task",
      "interview",
      "strong_candidate",
    ]);
  });

  it("puts anti-hallucination and human-review rules in scoring instructions", () => {
    const instructions = buildScoringInstructions(careersRoles[0]);

    expect(instructions).toContain("Human review is mandatory");
    expect(instructions).toContain("Score only from the submitted application answers and resume content");
    expect(instructions).toContain("Do not invent experience");
    expect(instructions).toContain("not enough evidence");
  });
});
