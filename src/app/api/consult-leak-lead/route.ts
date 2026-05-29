import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const CLICKUP_API = "https://api.clickup.com/api/v2";
const OUTBOUND_TIMEOUT_MS = 10_000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_PER_IP = 20;
const RATE_LIMIT_MAX_PER_EMAIL = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

const DEFAULT_LIST_ID = "901714155246";

// Custom field IDs
const CF_LEAD_SOURCE_ORIGIN = "6a65bb4c-0073-4831-bde9-29c8c3a33a4b";
const CF_ACQUISITION_CHANNEL = "86e936f8-9884-4b60-b0ec-07ef1d9ad0cf";
const CF_CORE_PAIN_POINT = "58a857e9-691e-4b9c-9972-55e4ebcb9e5d";
const CF_LEAD_PIPELINE_PHASE = "5dc5f360-3626-4e04-ac26-4b5ba98f8b24";
const CF_LEAD_QUALIFICATION_TIER = "03605866-e5d0-4b6a-84da-4903560a71f8";

// Custom field option UUIDs
const OPT_SOURCE_WEBSITE = "dd45914b-1674-4944-856f-79374d05902a";
const OPT_PHASE_INITIAL_CONTACT = "abdf6dc6-8a18-4a43-88ef-cf032942d260";
const OPT_TIER_1 = "7a888d05-ab9b-411b-b770-611916168882";
const OPT_TIER_2 = "a8711205-0e41-4d4c-af7c-09220076c1c8";
const OPT_TIER_3 = "2880fb48-ae4d-411b-97da-2de0fd7a1744";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || "unknown";
}

function consumeRateLimit(key: string, maxRequests: number, now = Date.now()) {
  const existing = rateLimitBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

function enforceRateLimit(request: NextRequest, email: string) {
  const now = Date.now();
  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
  }
  const ipLimit = consumeRateLimit(`ip:${getClientIp(request)}`, RATE_LIMIT_MAX_PER_IP, now);
  if (!ipLimit.allowed) return ipLimit;
  return consumeRateLimit(`email:${email.toLowerCase()}`, RATE_LIMIT_MAX_PER_EMAIL, now);
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OUTBOUND_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function clickupRequest<T>({
  path,
  token,
  method = "GET",
  body,
}: {
  path: string;
  token: string;
  method?: "GET" | "POST" | "PUT";
  body?: unknown;
}): Promise<T> {
  const response = await fetchWithTimeout(`${CLICKUP_API}${path}`, {
    method,
    headers: {
      Authorization: token,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : ({} as T);
  if (!response.ok) {
    throw new Error(`ClickUp ${method} ${path} failed: ${response.status} ${text}`);
  }
  return data;
}

type AfterHoursValue = "yes" | "sometimes" | "no";
type OnlineBookingValue = "yes" | "partial" | "no";
type SearchAwareValue = "yes" | "no" | "noidea";

interface QuizAnswers {
  locations?: number;
  callsPerWeek?: number;
  afterHours?: AfterHoursValue;
  onlineBooking?: OnlineBookingValue;
  staff?: number;
  searchAware?: SearchAwareValue;
}

function labelLocations(v: number | undefined): string {
  if (v === 1) return "1 location";
  if (v === 2) return "2–3 locations";
  if (v === 4) return "4–5 locations";
  if (v === 6) return "6+ locations";
  return String(v ?? "unknown");
}

function labelCallsPerWeek(v: number | undefined): string {
  if (v === 40) return "Under 50";
  if (v === 100) return "50–150";
  if (v === 220) return "150–300";
  if (v === 350) return "300+";
  return String(v ?? "unknown");
}

function labelAfterHours(v: AfterHoursValue | undefined): string {
  if (v === "yes") return "Yes, always covered";
  if (v === "sometimes") return "Sometimes / voicemail";
  if (v === "no") return "No, we miss those";
  return String(v ?? "unknown");
}

function labelOnlineBooking(v: OnlineBookingValue | undefined): string {
  if (v === "yes") return "Yes, full online booking";
  if (v === "partial") return "Partial / request form only";
  if (v === "no") return "No, phone only";
  return String(v ?? "unknown");
}

function labelStaff(v: number | undefined): string {
  if (v === 1) return "1";
  if (v === 2) return "2";
  if (v === 3) return "3–4";
  if (v === 5) return "5+";
  return String(v ?? "unknown");
}

function labelSearchAware(v: SearchAwareValue | undefined): string {
  if (v === "yes") return "Yes, we track it";
  if (v === "no") return "Not really";
  if (v === "noidea") return "No idea";
  return String(v ?? "unknown");
}

function fmt(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function buildLeadMarkdown({
  name,
  phone,
  email,
  website,
  answers,
  monthlyLeak,
  annualLeak,
  planFit,
  primaryDiagnosis,
}: {
  name: string;
  phone: string;
  email: string;
  website: string;
  answers: QuizAnswers;
  monthlyLeak: number;
  annualLeak: number;
  planFit: string;
  primaryDiagnosis: string;
}): string {
  return [
    "## Contact",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Website: ${website}`,
    "",
    "## Estimated consult leak",
    "",
    `${fmt(monthlyLeak)}/mo ~ ${fmt(annualLeak)}/yr`,
    "",
    "## Suggested plan fit",
    "",
    planFit,
    "",
    "## Primary diagnosis",
    "",
    primaryDiagnosis.trim().slice(0, 500),
    "",
    "## Qualifying answers",
    "",
    `- Locations: ${labelLocations(answers.locations)}`,
    `- Calls per week: ${labelCallsPerWeek(answers.callsPerWeek)}`,
    `- After-hours coverage: ${labelAfterHours(answers.afterHours)}`,
    `- Online booking: ${labelOnlineBooking(answers.onlineBooking)}`,
    `- Front-desk staff: ${labelStaff(answers.staff)}`,
    `- Search awareness: ${labelSearchAware(answers.searchAware)}`,
  ].join("\n");
}

function resolveQualificationTier(monthlyLeak: number, planFit: string): string {
  if (monthlyLeak >= 20000 || planFit === "Premium" || planFit === "Custom") return OPT_TIER_1;
  if (monthlyLeak >= 10000 || planFit === "Growth") return OPT_TIER_2;
  return OPT_TIER_3;
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
    }

    const {
      name,
      phone,
      email,
      website,
      answers,
      monthlyLeak,
      annualLeak,
      planFit,
      primaryDiagnosis,
    } = body as Record<string, unknown>;

    // Validate required fields
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ success: false, error: "name is required" }, { status: 400 });
    }
    if (typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json({ success: false, error: "phone is required" }, { status: 400 });
    }
    if (typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: "A valid email is required" }, { status: 400 });
    }
    if (typeof website !== "string" || !website.trim()) {
      return NextResponse.json({ success: false, error: "website is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    const rateLimit = enforceRateLimit(request, normalizedEmail);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please wait before trying again." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        },
      );
    }

    const clickupToken = requiredEnv("CLICKUP_API_TOKEN");
    const listId = process.env["CLICKUP_INBOUND_LEADS_LIST_ID"] ?? DEFAULT_LIST_ID;

    const safeAnswers: QuizAnswers = answers && typeof answers === "object" ? (answers as QuizAnswers) : {};
    const safeMonthlyLeak = typeof monthlyLeak === "number" ? monthlyLeak : 0;
    const safeAnnualLeak = typeof annualLeak === "number" ? annualLeak : 0;
    const safePlanFit = typeof planFit === "string" ? planFit : "Basic";
    const safeDiagnosis = typeof primaryDiagnosis === "string" ? primaryDiagnosis : "";

    const markdown = buildLeadMarkdown({
      name: name.trim().slice(0, 100),
      phone: phone.trim().slice(0, 60),
      email: normalizedEmail,
      website: website.trim().slice(0, 250),
      answers: safeAnswers,
      monthlyLeak: safeMonthlyLeak,
      annualLeak: safeAnnualLeak,
      planFit: safePlanFit,
      primaryDiagnosis: safeDiagnosis,
    });

    const tierValue = resolveQualificationTier(safeMonthlyLeak, safePlanFit);

    type ClickUpTask = { id: string; url?: string };
    const task = await clickupRequest<ClickUpTask>({
      path: `/list/${listId}/task`,
      token: clickupToken,
      method: "POST",
      body: {
        name: `${name.trim().slice(0, 100)} — Consult Leak Calculator`,
        markdown_content: markdown,
        tags: ["Consult Leak Calculator", "New Lead", "Human Review Needed"],
        custom_fields: [
          { id: CF_LEAD_SOURCE_ORIGIN, value: OPT_SOURCE_WEBSITE },
          { id: CF_ACQUISITION_CHANNEL, value: "Consult Leak Calculator" },
          { id: CF_CORE_PAIN_POINT, value: safeDiagnosis.trim().slice(0, 250) },
          { id: CF_LEAD_PIPELINE_PHASE, value: OPT_PHASE_INITIAL_CONTACT },
          { id: CF_LEAD_QUALIFICATION_TIER, value: tierValue },
        ],
      },
    });

    return NextResponse.json({ success: true, taskId: task.id });
  } catch (error) {
    console.error("Consult leak lead capture error:", error);
    return NextResponse.json({ success: false }, { status: 502 });
  }
}
