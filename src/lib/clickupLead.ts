/**
 * Shared ClickUp lead helpers used by both the consult-leak-lead route and
 * the cal-webhook route. Keep implementation identical to what was in
 * consult-leak-lead/route.ts — this file is the single source.
 */

export const CLICKUP_API = "https://api.clickup.com/api/v2";
export const OUTBOUND_TIMEOUT_MS = 10_000;

// ---------------------------------------------------------------------------
// Custom field IDs (Inbound Funnel Leads list + Sales Call Pipeline share
// the same field definitions for these)
// ---------------------------------------------------------------------------
export const CF_LEAD_SOURCE_ORIGIN = "6a65bb4c-0073-4831-bde9-29c8c3a33a4b";
export const CF_ACQUISITION_CHANNEL = "86e936f8-9884-4b60-b0ec-07ef1d9ad0cf";
export const CF_CORE_PAIN_POINT = "58a857e9-691e-4b9c-9972-55e4ebcb9e5d";
export const CF_LEAD_PIPELINE_PHASE = "5dc5f360-3626-4e04-ac26-4b5ba98f8b24";
export const CF_LEAD_QUALIFICATION_TIER = "03605866-e5d0-4b6a-84da-4903560a71f8";
export const CF_LEAD_TEMPERATURE = "ff9ed495-1ec0-41cb-bcca-b51083ad8e17";
export const CF_INITIAL_CONSULTATION_DATE = "3c8080d3-41a7-4dff-b75c-899a48cab0d9";

// Custom field option UUIDs
export const OPT_SOURCE_WEBSITE = "dd45914b-1674-4944-856f-79374d05902a";
export const OPT_PHASE_INITIAL_CONTACT = "abdf6dc6-8a18-4a43-88ef-cf032942d260";
export const OPT_PHASE_QUALIFICATION = "ee81189b-9adf-459e-85e5-c0f6488de7a4";
export const OPT_TIER_1 = "7a888d05-ab9b-411b-b770-611916168882";
export const OPT_TIER_2 = "a8711205-0e41-4d4c-af7c-09220076c1c8";
export const OPT_TIER_3 = "2880fb48-ae4d-411b-97da-2de0fd7a1744";
export const OPT_TEMP_HOT = "11573e83-e421-464f-8f96-e1c4fb05b0f7";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type AfterHoursValue = "yes" | "sometimes" | "no";
export type OnlineBookingValue = "yes" | "partial" | "no";
export type SearchAwareValue = "yes" | "no" | "noidea";

export interface QuizAnswers {
  locations?: number;
  callsPerWeek?: number;
  afterHours?: AfterHoursValue;
  onlineBooking?: OnlineBookingValue;
  staff?: number;
  searchAware?: SearchAwareValue;
}

// ---------------------------------------------------------------------------
// Core helpers
// ---------------------------------------------------------------------------
export function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function fmt(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OUTBOUND_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function clickupRequest<T>({
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

// ---------------------------------------------------------------------------
// Label helpers
// ---------------------------------------------------------------------------
export function labelLocations(v: number | undefined): string {
  if (v === 1) return "1 location";
  if (v === 2) return "2-3 locations";
  if (v === 4) return "4-5 locations";
  if (v === 6) return "6+ locations";
  return String(v ?? "unknown");
}

export function labelCallsPerWeek(v: number | undefined): string {
  if (v === 40) return "Under 50";
  if (v === 100) return "50-150";
  if (v === 220) return "150-300";
  if (v === 350) return "300+";
  return String(v ?? "unknown");
}

export function labelAfterHours(v: AfterHoursValue | undefined): string {
  if (v === "yes") return "Yes, always covered";
  if (v === "sometimes") return "Sometimes / voicemail";
  if (v === "no") return "No, we miss those";
  return String(v ?? "unknown");
}

export function labelOnlineBooking(v: OnlineBookingValue | undefined): string {
  if (v === "yes") return "Yes, full online booking";
  if (v === "partial") return "Partial / request form only";
  if (v === "no") return "No, phone only";
  return String(v ?? "unknown");
}

export function labelStaff(v: number | undefined): string {
  if (v === 1) return "1";
  if (v === 2) return "2";
  if (v === 3) return "3-4";
  if (v === 5) return "5+";
  return String(v ?? "unknown");
}

export function labelSearchAware(v: SearchAwareValue | undefined): string {
  if (v === "yes") return "Yes, we track it";
  if (v === "no") return "Not really";
  if (v === "noidea") return "No idea";
  return String(v ?? "unknown");
}

// ---------------------------------------------------------------------------
// Qualification tier resolver
// ---------------------------------------------------------------------------
export function resolveQualificationTier(monthlyLeak: number, planFit: string): string {
  if (monthlyLeak >= 20000 || planFit === "Premium" || planFit === "Custom") return OPT_TIER_1;
  if (monthlyLeak >= 10000 || planFit === "Growth") return OPT_TIER_2;
  return OPT_TIER_3;
}

// ---------------------------------------------------------------------------
// Markdown builder (used by consult-leak-lead route)
// ---------------------------------------------------------------------------
export function buildLeadMarkdown({
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
