import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import {
  clickupRequest,
  requiredEnv,
  labelLocations,
  labelCallsPerWeek,
  labelAfterHours,
  labelOnlineBooking,
  labelStaff,
  labelSearchAware,
  resolveQualificationTier,
  CF_LEAD_SOURCE_ORIGIN,
  CF_ACQUISITION_CHANNEL,
  CF_LEAD_PIPELINE_PHASE,
  CF_LEAD_QUALIFICATION_TIER,
  CF_LEAD_TEMPERATURE,
  CF_INITIAL_CONSULTATION_DATE,
  OPT_SOURCE_WEBSITE,
  OPT_PHASE_QUALIFICATION,
  OPT_TEMP_HOT,
  type QuizAnswers,
} from "@/lib/clickupLead";

export const runtime = "nodejs";

const CAL_EVENT_TYPE_ID = 5849618;
const DEFAULT_SALES_PIPELINE_LIST_ID = "901714155435";

// ---------------------------------------------------------------------------
// Cal.com response value extractor.
// Cal v2 field answers may be a plain string OR {label, value, isHidden}.
// ---------------------------------------------------------------------------
export function respVal(
  responses: Record<string, unknown>,
  slug: string,
): string {
  const v = responses[slug];
  if (v == null) return "";
  if (typeof v === "object") {
    const obj = v as Record<string, unknown>;
    return typeof obj.value === "string" ? obj.value : "";
  }
  return String(v);
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. Verify webhook secret is configured
  let secret: string;
  try {
    secret = requiredEnv("CAL_WEBHOOK_SECRET");
  } catch {
    console.error("cal-webhook: CAL_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  // 2. Read raw body for signature verification
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Failed to read request body" }, { status: 400 });
  }

  // 3. Verify HMAC-SHA256 signature
  const sigHeader = request.headers.get("x-cal-signature-256") ?? "";
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  let sigMatch = false;
  try {
    sigMatch = crypto.timingSafeEqual(
      Buffer.from(sigHeader, "utf8"),
      Buffer.from(expectedSig, "utf8"),
    );
  } catch {
    sigMatch = false;
  }

  if (!sigMatch) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 4. Parse and route event
  try {
    const event = JSON.parse(rawBody) as {
      triggerEvent?: string;
      payload?: Record<string, unknown>;
    };

    if (event.triggerEvent !== "BOOKING_CREATED") {
      return NextResponse.json({ ignored: true }, { status: 200 });
    }

    const payload = (event.payload ?? {}) as Record<string, unknown>;

    // Identify the consult-leak-audit booking
    const eventTypeId = payload.eventTypeId as number | undefined;
    const eventSlug = (payload.type ?? "") as string;
    const responses = (payload.responses ?? {}) as Record<string, unknown>;
    const leadSource = respVal(responses, "lead-source");

    const isConsultLeakBooking =
      eventTypeId === CAL_EVENT_TYPE_ID ||
      leadSource === "consult-leak-calculator" ||
      eventSlug.includes("medspa-consult-leak-audit");

    if (!isConsultLeakBooking) {
      return NextResponse.json({ ignored: true }, { status: 200 });
    }

    // 5. Extract booking fields defensively
    const attendees = (payload.attendees ?? []) as Array<Record<string, unknown>>;
    const firstAttendee = attendees[0] ?? {};

    const name =
      respVal(responses, "name") || (typeof firstAttendee.name === "string" ? firstAttendee.name : "Unknown");
    const email =
      respVal(responses, "email") || (typeof firstAttendee.email === "string" ? firstAttendee.email : "");
    const phone = respVal(responses, "attendeePhoneNumber");
    const website = respVal(responses, "clinic-website");
    const monthlyLeakStr = respVal(responses, "estimated-monthly-leak");
    const annualLeakStr = respVal(responses, "estimated-annual-leak");
    const planFit = respVal(responses, "estimated-plan-fit");
    const calculatorAnswersRaw = respVal(responses, "calculator-answers");

    let calculatorAnswers: QuizAnswers = {};
    try {
      if (calculatorAnswersRaw) {
        calculatorAnswers = JSON.parse(calculatorAnswersRaw) as QuizAnswers;
      }
    } catch {
      calculatorAnswers = {};
    }

    // Parse monthly leak to a number for tier resolution
    const parsedMonthlyLeak = Number(monthlyLeakStr.replace(/[^0-9.]/g, "")) || 0;

    // Format start time
    const startTimeRaw = typeof payload.startTime === "string" ? payload.startTime : "";
    let startTimeFormatted = startTimeRaw;
    let startTimeMs: number | undefined;
    if (startTimeRaw) {
      const d = new Date(startTimeRaw);
      if (!isNaN(d.getTime())) {
        startTimeFormatted = d.toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        });
        startTimeMs = d.getTime();
      }
    }

    // 6. Build markdown
    const markdown = [
      "## Contact",
      "",
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : null,
      `Email: ${email}`,
      website ? `Website: ${website}` : null,
      "",
      "## Booked call",
      "",
      startTimeFormatted ? `Scheduled: ${startTimeFormatted}` : "Scheduled: unknown",
      "",
      "## Estimated consult leak",
      "",
      `Monthly: ${monthlyLeakStr || "not provided"}`,
      `Annual: ${annualLeakStr || "not provided"}`,
      "",
      "## Suggested plan fit",
      "",
      planFit || "not provided",
      "",
      "## Qualifying answers",
      "",
      `- Locations: ${labelLocations(calculatorAnswers.locations)}`,
      `- Calls per week: ${labelCallsPerWeek(calculatorAnswers.callsPerWeek)}`,
      `- After-hours coverage: ${labelAfterHours(calculatorAnswers.afterHours)}`,
      `- Online booking: ${labelOnlineBooking(calculatorAnswers.onlineBooking)}`,
      `- Front-desk staff: ${labelStaff(calculatorAnswers.staff)}`,
      `- Search awareness: ${labelSearchAware(calculatorAnswers.searchAware)}`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    // 7. Build custom_fields array
    const tierValue = resolveQualificationTier(parsedMonthlyLeak, planFit);

    type CustomField = { id: string; value: string | number };
    const customFields: CustomField[] = [
      { id: CF_LEAD_SOURCE_ORIGIN, value: OPT_SOURCE_WEBSITE },
      { id: CF_ACQUISITION_CHANNEL, value: "Consult Leak Calculator" },
      { id: CF_LEAD_PIPELINE_PHASE, value: OPT_PHASE_QUALIFICATION },
      { id: CF_LEAD_QUALIFICATION_TIER, value: tierValue },
      { id: CF_LEAD_TEMPERATURE, value: OPT_TEMP_HOT },
    ];

    if (startTimeMs !== undefined && !isNaN(startTimeMs)) {
      customFields.push({ id: CF_INITIAL_CONSULTATION_DATE, value: startTimeMs });
    }

    // 8. Create ClickUp task in Sales Call Pipeline
    const clickupToken = requiredEnv("CLICKUP_API_TOKEN");
    const listId =
      process.env["CLICKUP_SALES_PIPELINE_LIST_ID"] ?? DEFAULT_SALES_PIPELINE_LIST_ID;

    type ClickUpTask = { id: string; url?: string };
    const task = await clickupRequest<ClickUpTask>({
      path: `/list/${listId}/task`,
      token: clickupToken,
      method: "POST",
      body: {
        name: `${name} — Booked Consult Leak Audit`,
        markdown_content: markdown,
        tags: ["Consult Leak Calculator", "Booked Call", "Hot Lead"],
        custom_fields: customFields,
      },
    });

    return NextResponse.json({ success: true, taskId: task.id }, { status: 200 });
  } catch (error) {
    console.error("cal-webhook: ClickUp task creation failed:", error);
    return NextResponse.json({ error: "Upstream task creation failed" }, { status: 502 });
  }
}
