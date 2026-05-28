import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CareersApplicationClient from "@/components/Careers/CareersApplicationClient";
import {
  careersRoles,
  getOpenCareerRole,
  hiringPipelineLabels,
  recommendedNextSteps,
} from "@/lib/careers";
import { buildScoringInstructions } from "@/lib/careers/hiringScoringAgent";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

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

  it("requires LinkedIn in the application modal", () => {
    render(<CareersApplicationClient />);

    fireEvent.click(screen.getByRole("button", { name: "Apply now" }));

    const linkedInInput = screen.getByLabelText("LinkedIn *");
    expect(linkedInInput).toBeRequired();
  });

  it("requires phone number with a country-code selector", () => {
    render(<CareersApplicationClient />);

    fireEvent.click(screen.getByRole("button", { name: "Apply now" }));

    const countryCodeSelect = screen.getByLabelText("Country code");
    const phoneInput = screen.getByLabelText("Phone number *");
    expect(countryCodeSelect).toBeRequired();
    expect(countryCodeSelect).toHaveDisplayValue("US/CA +1");
    expect(phoneInput).toBeRequired();
  });

  it("replaces the form with a thank-you state after successful submission", async () => {
    globalThis.fetch = vi.fn(async () =>
      new Response(
        JSON.stringify({
          success: true,
          message: "Application received. Check your email to verify your address.",
        }),
        { status: 200 },
      ),
    );
    render(<CareersApplicationClient />);

    fireEvent.click(screen.getByRole("button", { name: "Apply now" }));
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jane Smith" } });
    fireEvent.change(screen.getByLabelText("Email *"), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone number *"), { target: { value: "5550000000" } });
    fireEvent.change(screen.getByLabelText("LinkedIn *"), {
      target: { value: "https://linkedin.com/in/jane" },
    });
    for (const textbox of screen.getAllByPlaceholderText("Be specific. We score from evidence, not vague claims.")) {
      fireEvent.change(textbox, { target: { value: "Specific role evidence." } });
    }
    fireEvent.change(screen.getByLabelText("Resume PDF *"), {
      target: {
        files: [new File(["%PDF-1.4 test"], "resume.pdf", { type: "application/pdf" })],
      },
    });
    const form = screen.getByRole("button", { name: "Submit application" }).closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalled();
      expect(screen.getByRole("heading", { name: "Thank you for submitting." })).toBeInTheDocument();
    });
    expect(screen.getByText("Application received. Check your email to verify your address.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Submit application" })).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Full name *")).not.toBeInTheDocument();
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
