import { Resend } from "resend";

const SUBJECT = "Thanks for applying to Rhemic";
const DEFAULT_EMAIL_FROM = "Rhemic AI <contact@rhemicai.com>";
const DEFAULT_EMAIL_REPLY_TO = "contact@rhemicai.com";

export type SendApplicationThankYouEmailInput = {
  candidateName: string;
  candidateEmail: string;
  roleTitle: string;
  verificationUrl: string;
};

function errorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "unknown email error";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildApplicationThankYouText({
  candidateName,
  roleTitle,
  verificationUrl,
}: SendApplicationThankYouEmailInput) {
  return [
    `Hi ${candidateName},`,
    "",
    `Thank you for applying for the ${roleTitle} role at Rhemic.`,
    "",
    "We received your application and resume. Our team will review it and get back to you if there's a strong fit for the next step.",
    "",
    "Please verify your email so we know we can reach you:",
    verificationUrl,
    "",
    "A quick note: Rhemic may use AI-assisted triage to help organize applications, but every hiring decision is reviewed by a human.",
    "",
    "Thanks again,",
    "Rhemic AI",
  ].join("\n");
}

export function buildApplicationThankYouHtml(input: SendApplicationThankYouEmailInput) {
  const candidateName = escapeHtml(input.candidateName);
  const roleTitle = escapeHtml(input.roleTitle);
  const verificationUrl = escapeHtml(input.verificationUrl);

  return [
    '<div style="margin:0;background:#f7f9fc;padding:24px 0;font-family:Inter,Arial,sans-serif;color:#101827;">',
    '<div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e7edf5;border-radius:8px;padding:28px;">',
    `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Hi ${candidateName},</p>`,
    `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Thank you for applying for the ${roleTitle} role at Rhemic.</p>`,
    '<p style="margin:0 0 16px;font-size:16px;line-height:1.6;">We received your application and resume. Our team will review it and get back to you if there&apos;s a strong fit for the next step.</p>',
    '<p style="margin:0 0 8px;font-size:16px;line-height:1.6;">Please verify your email so we know we can reach you:</p>',
    `<p style="margin:0 0 20px;font-size:16px;line-height:1.6;"><a href="${verificationUrl}" style="color:#0f5fff;">${verificationUrl}</a></p>`,
    '<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#435063;">A quick note: Rhemic may use AI-assisted triage to help organize applications, but every hiring decision is reviewed by a human.</p>',
    '<p style="margin:0;font-size:16px;line-height:1.6;">Thanks again,<br />Rhemic AI</p>',
    "</div>",
    "</div>",
  ].join("");
}

export async function sendApplicationThankYouEmail(
  input: SendApplicationThankYouEmailInput,
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.HIRING_EMAIL_FROM || DEFAULT_EMAIL_FROM;
  const replyTo = process.env.HIRING_EMAIL_REPLY_TO || DEFAULT_EMAIL_REPLY_TO;

  if (!apiKey) {
    return { sent: false, error: "RESEND_API_KEY is not configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: input.candidateEmail,
      replyTo,
      subject: SUBJECT,
      text: buildApplicationThankYouText(input),
      html: buildApplicationThankYouHtml(input),
    });

    if (error) {
      return { sent: false, error: errorMessage(error) };
    }

    return { sent: true };
  } catch (error) {
    return { sent: false, error: errorMessage(error) };
  }
}
