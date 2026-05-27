import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildApplicationThankYouText,
  sendApplicationThankYouEmail,
} from "@/lib/careers/sendApplicationEmail";

const resendSendMock = vi.hoisted(() => vi.fn());

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function ResendMock() {
    return {
      emails: {
        send: resendSendMock,
      },
    };
  }),
}));

const originalEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  HIRING_EMAIL_FROM: process.env.HIRING_EMAIL_FROM,
  HIRING_EMAIL_REPLY_TO: process.env.HIRING_EMAIL_REPLY_TO,
};

const emailInput = {
  candidateName: "Jane Smith",
  candidateEmail: "jane@example.com",
  roleTitle: "SDR / Appointment Setter",
  verificationUrl: "https://rhemicai.com/api/careers/verify?token=abc123",
};

afterEach(() => {
  process.env.RESEND_API_KEY = originalEnv.RESEND_API_KEY;
  process.env.HIRING_EMAIL_FROM = originalEnv.HIRING_EMAIL_FROM;
  process.env.HIRING_EMAIL_REPLY_TO = originalEnv.HIRING_EMAIL_REPLY_TO;
  resendSendMock.mockReset();
});

describe("sendApplicationThankYouEmail", () => {
  it("sends the expected applicant thank-you payload through Resend", async () => {
    process.env.RESEND_API_KEY = "resend-key";
    process.env.HIRING_EMAIL_FROM = "Rhemic AI <contact@rhemicai.com>";
    process.env.HIRING_EMAIL_REPLY_TO = "contact@rhemicai.com";
    resendSendMock.mockResolvedValue({ data: { id: "email-123" }, error: null });

    const result = await sendApplicationThankYouEmail(emailInput);

    expect(result).toEqual({ sent: true });
    expect(resendSendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "Rhemic AI <contact@rhemicai.com>",
        to: "jane@example.com",
        replyTo: "contact@rhemicai.com",
        subject: "Thanks for applying to Rhemic",
      }),
    );
    const payload = resendSendMock.mock.calls[0]?.[0] as { text: string; html: string };
    expect(payload.text).toContain("Hi Jane Smith,");
    expect(payload.text).toContain("SDR / Appointment Setter");
    expect(payload.text).toContain(emailInput.verificationUrl);
    expect(payload.text).toContain("AI-assisted triage");
    expect(payload.html).toContain(emailInput.verificationUrl);
    expect(JSON.stringify(payload)).not.toContain("app.clickup.com");
  });

  it("returns safe failure when Resend env is missing", async () => {
    delete process.env.RESEND_API_KEY;

    const result = await sendApplicationThankYouEmail(emailInput);

    expect(result).toEqual({
      sent: false,
      error: "RESEND_API_KEY is not configured",
    });
    expect(resendSendMock).not.toHaveBeenCalled();
  });

  it("uses the required simple plain-text email copy", () => {
    expect(buildApplicationThankYouText(emailInput)).toBe(`Hi Jane Smith,

Thank you for applying for the SDR / Appointment Setter role at Rhemic.

We received your application and resume. Our team will review it and get back to you if there's a strong fit for the next step.

Please verify your email so we know we can reach you:
https://rhemicai.com/api/careers/verify?token=abc123

A quick note: Rhemic may use AI-assisted triage to help organize applications, but every hiring decision is reviewed by a human.

Thanks again,
Rhemic AI`);
  });
});
