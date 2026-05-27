import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CareersApplicationClient from "@/components/Careers/CareersApplicationClient";
import {
  careersRoles,
  getOpenCareerRole,
  hiringPipelineLabels,
  recommendedNextSteps,
} from "@/lib/careers";
import { buildScoringInstructions } from "@/lib/careers/hiringScoringAgent";

describe("careers role model", () => {
  it("defines the four approved hiring bottleneck roles", () => {
    expect(careersRoles.map((role) => role.slug)).toEqual([
      "sdr-appointment-setter",
      "client-success-ops-coordinator",
      "fulfillment-specialist",
      "technical-automation-engineer",
    ]);
  });

  it("only opens SDR / Appointment Setter in V1", () => {
    expect(getOpenCareerRole("sdr-appointment-setter")?.title).toBe("SDR / Appointment Setter");
    expect(getOpenCareerRole("client-success-ops-coordinator")).toBeUndefined();
    expect(getOpenCareerRole("fulfillment-specialist")).toBeUndefined();
    expect(getOpenCareerRole("technical-automation-engineer")).toBeUndefined();
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
    expect(instructions).toContain("submitted application answers and parsed resume text");
    expect(instructions).toContain("must not infer, invent, or assume missing work history");
    expect(instructions).toContain("evidence_gaps");
  });
});

describe("CareersApplicationClient", () => {
  it("opens the application modal for the active SDR role", () => {
    render(<CareersApplicationClient />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Apply now" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Apply for SDR / Appointment Setter" })).toBeInTheDocument();
    expect(screen.getByDisplayValue("SDR / Appointment Setter")).toBeInTheDocument();
  });

  it("keeps coming-soon roles visible but unable to open the modal", () => {
    render(<CareersApplicationClient />);

    const comingSoonButtons = screen.getAllByRole("button", { name: "Coming soon" });
    expect(comingSoonButtons).toHaveLength(3);
    for (const button of comingSoonButtons) {
      expect(button).toBeDisabled();
      fireEvent.click(button);
    }
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the careers modal with Escape", () => {
    render(<CareersApplicationClient />);

    fireEvent.click(screen.getByRole("button", { name: "Apply now" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
