import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/lib/clickupLead";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_PER_IP = 20;
const RATE_LIMIT_MAX_PER_EMAIL = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

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

    const { name, phone, email, website } = body as Record<string, unknown>;

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

    // TODO(CRM): route non-booking form leads to the CRM pipeline + marketing enrichment (pending Karim's spec)
    return NextResponse.json({ success: true, queued: false });
  } catch (error) {
    console.error("Consult leak lead capture error:", error);
    return NextResponse.json({ success: false }, { status: 502 });
  }
}
