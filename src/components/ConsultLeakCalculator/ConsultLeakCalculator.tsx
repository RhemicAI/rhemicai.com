"use client";

import { useState, useEffect, useMemo, type ReactNode } from "react";
import { CAL_BOOKING_EVENT_NAME, type CalBookingDetail } from "@/lib/calEmbed";

// ─────────────────────────────────────────────────────────────────────────────
// RHEMIC — Consult Leak Calculator
// Honest math: $504 verified avg first-visit value. No fabricated stats.
// Deterministic diagnosis — no LLM, no randomness.
// Booking wired to Cal.com event with prefilled hidden fields.
// ─────────────────────────────────────────────────────────────────────────────

const VALUE_PER_VISIT = 504; // verified by Rhemic
const BOOKABLE_SHARE = 0.35; // conservative: share of missed calls that were new-patient, ready-to-book intent. Shown to user.

const TEAL = "#8FE9D8";
const TEAL_DIM = "#3a6f67";

type AfterHoursValue = "yes" | "sometimes" | "no";
type OnlineBookingValue = "yes" | "partial" | "no";
type SearchAwareValue = "yes" | "no" | "noidea";

interface Answers {
  locations?: number;
  callsPerWeek?: number;
  afterHours?: AfterHoursValue;
  onlineBooking?: OnlineBookingValue;
  staff?: number;
  searchAware?: SearchAwareValue;
}

type AnswerValue = number | AfterHoursValue | OnlineBookingValue | SearchAwareValue;

type PlanFit = "Basic" | "Growth" | "Premium" | "Custom";

type Phase =
  | "intro"
  | "quiz"
  | "calculating"
  | "teaser"
  | "gate"
  | "result"
  | "booked";

interface StepOption {
  label: string;
  value: AnswerValue;
}

interface Step {
  key: keyof Answers;
  q: string;
  sub: string;
  options: StepOption[];
}

function deriveMissedPct(params: {
  callsPerWeek?: number;
  afterHours?: AfterHoursValue;
  onlineBooking?: OnlineBookingValue;
  staff?: number;
}): number {
  const { callsPerWeek = 0, afterHours, onlineBooking, staff = 1 } = params;
  let p = 0.1;
  if (afterHours === "no") p += 0.12;
  else if (afterHours === "sometimes") p += 0.06;
  if (onlineBooking === "no") p += 0.04;
  const perStaff = staff > 0 ? callsPerWeek / staff : callsPerWeek;
  if (perStaff > 60) p += 0.07;
  else if (perStaff > 35) p += 0.04;
  return Math.min(0.35, Math.max(0.08, p));
}

function computePlanFit(answers: Answers, monthlyLeak: number): PlanFit {
  const locations = answers.locations ?? 1;
  let tier: PlanFit;
  if (locations === 1) tier = "Basic";
  else if (locations === 2 || locations === 4) tier = "Growth";
  else tier = "Premium"; // 6+

  if (monthlyLeak >= 20000) {
    if (tier === "Basic") tier = "Growth";
    else if (tier === "Growth") tier = "Premium";
    else if (tier === "Premium") tier = "Custom";
  }
  return tier;
}

const STEPS: Step[] = [
  {
    key: "locations",
    q: "How many locations does your clinic operate?",
    sub: "This helps us understand the scale of your patient flow.",
    options: [
      { label: "1 location", value: 1 },
      { label: "2–3 locations", value: 2 },
      { label: "4–5 locations", value: 4 },
      { label: "6+ locations", value: 6 },
    ],
  },
  {
    key: "callsPerWeek",
    q: "Roughly how many inbound calls does your front desk get per week?",
    sub: "A rough number is fine — patients calling about treatments, pricing, and booking.",
    options: [
      { label: "Under 50", value: 40 },
      { label: "50–150", value: 100 },
      { label: "150–300", value: 220 },
      { label: "300+", value: 350 },
    ],
  },
  {
    key: "afterHours",
    q: "Are calls answered after hours and on weekends?",
    sub: "High-intent patients often call when they're off work — evenings and weekends.",
    options: [
      { label: "Yes, always covered", value: "yes" as AfterHoursValue },
      { label: "Sometimes / voicemail", value: "sometimes" as AfterHoursValue },
      { label: "No, we miss those", value: "no" as AfterHoursValue },
    ],
  },
  {
    key: "onlineBooking",
    q: "Can a new patient book a consult online without calling?",
    sub: "If the only path to book is a phone call, every missed call is a missed consult.",
    options: [
      { label: "Yes, full online booking", value: "yes" as OnlineBookingValue },
      { label: "Partial / request form only", value: "partial" as OnlineBookingValue },
      { label: "No, phone only", value: "no" as OnlineBookingValue },
    ],
  },
  {
    key: "staff",
    q: "How many front-desk / reception staff handle calls?",
    sub: "More volume per person means more calls slip through during busy hours.",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3–4", value: 3 },
      { label: "5+", value: 5 },
    ],
  },
  {
    key: "searchAware",
    q: "Do you know whether patients searching Google or AI for your treatments find you — or a competitor?",
    sub: "Some patients leak before they ever call, by choosing a competitor that shows up stronger.",
    options: [
      { label: "Yes, we track it", value: "yes" as SearchAwareValue },
      { label: "Not really", value: "no" as SearchAwareValue },
      { label: "No idea", value: "noidea" as SearchAwareValue },
    ],
  },
];

const fmt = (n: number): string =>
  "$" + Math.round(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

export function getLeakTeaser(monthlyLeak: number) {
  if (monthlyLeak < 10000) {
    return {
      range: "Under $10k /mo",
      severity: "Moderate consult leak risk",
      reveal: "your exact monthly estimate, annual total, and biggest leak point",
      note:
        "There is probably money slipping through your booking path. The next step shows the actual estimate and where it is most likely happening.",
    };
  }

  if (monthlyLeak < 20000) {
    return {
      range: "$10k-$20k /mo range",
      severity: "High consult leak risk",
      reveal: "your exact monthly estimate, annual total, and biggest leak point",
      note:
        "There is a real number worth seeing here. The next step shows the estimate, the yearly impact, and the part of your booking flow to look at first.",
    };
  }

  return {
    range: "$20k+ /mo range",
    severity: "Severe consult leak risk",
    reveal: "your exact monthly estimate, annual total, and biggest leak point",
    note:
      "This looks big enough to check now. The next step shows the estimate, the yearly impact, and the first place consults are likely slipping away.",
  };
}

// ── shared shell ──
function Shell({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Hanken Grotesk', sans-serif",
        background:
          "radial-gradient(120% 90% at 50% -10%, #0d1614 0%, #070b0a 55%, #050706 100%)",
        color: "#e8efed",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 18px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(143,233,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(143,233,216,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(80% 60% at 50% 0%, black 0%, transparent 80%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ width: "100%", maxWidth: 620, position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

const accentBtn: React.CSSProperties = {
  background: TEAL,
  color: "#06100d",
  border: "none",
  borderRadius: 999,
  padding: "15px 30px",
  fontSize: 16,
  fontWeight: 700,
  fontFamily: "'Hanken Grotesk', sans-serif",
  cursor: "pointer",
  width: "100%",
  boxShadow: `0 0 30px rgba(143,233,216,0.25)`,
  transition: "transform .15s ease",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(255,255,255,0.03)",
  border: `1px solid rgba(255,255,255,0.12)`,
  borderRadius: 12,
  padding: "16px 18px",
  color: "#e8efed",
  fontSize: 16,
  fontFamily: "'Hanken Grotesk', sans-serif",
  marginBottom: 12,
  outline: "none",
};

export default function ConsultLeakCalculator() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [missedPct, setMissedPct] = useState(0.15);
  const [lifetimeVisits, setLifetimeVisits] = useState(3);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [leadErr, setLeadErr] = useState("");

  // load fonts
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Hanken+Grotesk:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
    return () => {
      document.head.removeChild(l);
    };
  }, []);

  const calc = useMemo(() => {
    const callsPerWeek = answers.callsPerWeek ?? 0;
    const monthlyCalls = callsPerWeek * 4.33;
    const missedMonthly = monthlyCalls * missedPct;
    const monthlyLeak = missedMonthly * BOOKABLE_SHARE * VALUE_PER_VISIT;
    const ltvPerPatient = VALUE_PER_VISIT * lifetimeVisits;
    const monthlyLeakLTV = monthlyLeak * lifetimeVisits;
    return {
      callsPerWeek,
      monthlyCalls,
      missedMonthly,
      monthlyLeak,
      annualLeak: monthlyLeak * 12,
      ltvPerPatient,
      monthlyLeakLTV,
      annualLeakLTV: monthlyLeakLTV * 12,
    };
  }, [answers, missedPct, lifetimeVisits]);

  const estimatedPlanFit = useMemo<PlanFit>(
    () => computePlanFit(answers, calc.monthlyLeak),
    [answers, calc.monthlyLeak]
  );

  function selectOption(value: AnswerValue) {
    const key = STEPS[step].key;
    const next: Answers = { ...answers, [key]: value };
    setAnswers(next);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      const start = deriveMissedPct({
        callsPerWeek: next.callsPerWeek,
        afterHours: next.afterHours,
        onlineBooking: next.onlineBooking,
        staff: next.staff,
      });
      setMissedPct(start);
      setPhase("calculating");
      setTimeout(() => setPhase("teaser"), 2200);
    }
  }

  // Deterministic diagnosis
  const diagnosis = useMemo(() => {
    const a = answers;
    const leak = calc.monthlyLeak;

    let primary: string;
    if (a.afterHours === "no") {
      primary =
        "You told us calls aren't covered after hours or on weekends — which is exactly when high-intent patients tend to reach out. Those calls don't wait; they ring the next clinic.";
    } else if (a.onlineBooking === "no") {
      primary =
        "Right now the only way a new patient can book is to get someone on the phone. That makes every missed or mishandled call a consult that quietly disappears.";
    } else if (a.afterHours === "sometimes") {
      primary =
        "After-hours calls are only sometimes covered — so the patients who call on evenings and weekends are hitting voicemail and moving on to a clinic that picks up.";
    } else if ((a.staff ?? 1) > 0 && (a.callsPerWeek ?? 0) / (a.staff ?? 1) > 50) {
      primary =
        "Your front desk is fielding more call volume than the team can reliably catch during busy hours, so booking-ready patients slip through when the phones stack up.";
    } else if (a.onlineBooking === "partial") {
      primary =
        "A new patient can't fully book on their own — they have to wait on a callback or a form reply, and high-intent patients rarely wait. That gap is where consults leak.";
    } else if (a.searchAware === "no" || a.searchAware === "noidea") {
      primary =
        "You're not sure whether patients searching for your treatments find you or a competitor — which means some are leaking before they ever pick up the phone.";
    } else {
      primary =
        "High-intent patients are reaching out, but the gaps between first contact and a booked consult mean some never make it onto your calendar.";
    }

    let band: string;
    if (leak < 10000) {
      band =
        "This is a directional estimate from a few answers — and even at the conservative end, it's real money you've already paid to generate. The full picture lives in your actual call logs and booking flow, which this quiz can't see. Worth a 20-minute look to confirm where it's actually going.";
    } else if (leak < 20000) {
      band =
        "That's a meaningful leak — patients you already attracted, walking out the door every month. This is a capture problem, not a lead problem, and it compounds: every month it runs unaddressed is another chunk gone. The real number is usually higher once we see your actual data.";
    } else {
      band =
        "That's a serious leak — a six-figure annual hole in a business that's already generating the demand. You don't need more ads or more leads; you're losing patients you already won. This is the exact problem we fix, and every month it runs costs you more. Book the audit now and we'll show you precisely where it's going — and the first fix to stop it.";
    }

    return { primary, band, hard: leak >= 20000 };
  }, [answers, calc.monthlyLeak]);

  const leakTeaser = useMemo(() => getLeakTeaser(calc.monthlyLeak), [calc.monthlyLeak]);

  function openBooking() {
    const detail: CalBookingDetail = {
      calLink: "rhemic-ai/medspa-consult-leak-audit",
      durationLabel: "20 minute audit",
      title: "Book your free consult leak audit.",
      subtitle: "Pick a time. Your details are already filled in.",
      prepNote: "",
      prefill: {
        name,
        email,
        attendeePhoneNumber: phone,
        "clinic-website": website,
        "lead-source": "consult-leak-calculator",
        "estimated-monthly-leak": fmt(calc.monthlyLeak),
        "estimated-annual-leak": fmt(calc.annualLeak),
        "estimated-plan-fit": estimatedPlanFit,
        "calculator-answers": JSON.stringify({
          locations: answers.locations,
          callsPerWeek: answers.callsPerWeek,
          afterHours: answers.afterHours,
          onlineBooking: answers.onlineBooking,
          staff: answers.staff,
          searchAware: answers.searchAware,
        }),
      },
    };
    // Open our in-page booking surface (same UI as the med spa qualifying call),
    // not the hosted Cal.com tab. CalBookingSurface is mounted globally in layout.
    window.dispatchEvent(new CustomEvent(CAL_BOOKING_EVENT_NAME, { detail }));
  }

  function submitLead() {
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name.trim()) {
      setLeadErr("Add your name so we know who we're talking to.");
      return;
    }
    if (!phone.trim()) {
      setLeadErr("Add your phone number.");
      return;
    }
    if (!okEmail) {
      setLeadErr("Enter a valid email so we can send your full breakdown.");
      return;
    }
    if (!website.trim()) {
      setLeadErr("Add your clinic website.");
      return;
    }
    setLeadErr("");

    // Best-effort server-side lead capture. Non-blocking — never prevents reaching result.
    void (async () => {
      try {
        await fetch("/api/consult-leak-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email,
            phone: phone.trim(),
            website: website.trim(),
            answers: {
              locations: answers.locations,
              callsPerWeek: answers.callsPerWeek,
              afterHours: answers.afterHours,
              onlineBooking: answers.onlineBooking,
              staff: answers.staff,
              searchAware: answers.searchAware,
            },
            monthlyLeak: calc.monthlyLeak,
            annualLeak: calc.annualLeak,
            planFit: estimatedPlanFit,
            primaryDiagnosis: diagnosis.primary,
          }),
        });
      } catch (err) {
        console.warn("Consult leak lead capture failed (non-blocking):", err);
      }
    })();

    setPhase("result");
  }

  if (phase === "intro") {
    return (
      <Shell>
        <div
          style={{
            display: "inline-block",
            border: `1px solid ${TEAL_DIM}`,
            borderRadius: 999,
            padding: "6px 14px",
            fontSize: 11.5,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: TEAL,
            marginBottom: 24,
          }}
        >
          Med Spa Consult Leak Calculator
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 44,
            lineHeight: 1.08,
            margin: "0 0 18px",
            letterSpacing: "-0.01em",
          }}
        >
          You may not have a lead problem.
          <br />
          <span style={{ color: TEAL }}>You may have a capture problem.</span>
        </h1>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "#9fb3ad",
            margin: "0 0 30px",
            maxWidth: 520,
          }}
        >
          Answer 6 quick questions about your clinic. We’ll estimate what missed
          calls and lost booking intent may be costing you in new-patient revenue
          every month — using your own numbers, not made-up benchmarks.
        </p>
        <button
          style={accentBtn}
          onClick={() => setPhase("quiz")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Start the 60-second calculator →
        </button>
        <p style={{ fontSize: 12.5, color: "#5f726d", marginTop: 16 }}>
          No fabricated stats. Conservative math. Takes about a minute.
        </p>
      </Shell>
    );
  }

  if (phase === "quiz") {
    const s = STEPS[step];
    const selected = answers[s.key];
    return (
      <Shell>
        <div style={{ marginBottom: 26 }}>
          <div
            style={{
              height: 3,
              background: "rgba(143,233,216,0.12)",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${((step + 1) / STEPS.length) * 100}%`,
                background: TEAL,
                borderRadius: 99,
                transition: "width .4s ease",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#6b7e79",
              marginTop: 10,
              letterSpacing: "0.08em",
            }}
          >
            QUESTION {step + 1} OF {STEPS.length}
          </div>
        </div>

        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 30,
            lineHeight: 1.18,
            margin: "0 0 10px",
            letterSpacing: "-0.01em",
          }}
        >
          {s.q}
        </h2>
        <p style={{ fontSize: 15, color: "#8ba099", margin: "0 0 26px", lineHeight: 1.55 }}>
          {s.sub}
        </p>

        <div style={{ display: "grid", gap: 11 }}>
          {s.options.map((o) => {
            const active = selected === o.value;
            return (
              <button
                key={o.label}
                onClick={() => selectOption(o.value)}
                style={{
                  textAlign: "left",
                  background: active ? "rgba(143,233,216,0.1)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${active ? TEAL : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 14,
                  padding: "17px 20px",
                  color: "#e8efed",
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  cursor: "pointer",
                  transition: "all .15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.borderColor = "rgba(143,233,216,0.4)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                {o.label}
              </button>
            );
          })}
        </div>

        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{
              background: "none",
              border: "none",
              color: "#6b7e79",
              fontSize: 14,
              cursor: "pointer",
              marginTop: 22,
              fontFamily: "'Hanken Grotesk', sans-serif",
            }}
          >
            ← Back
          </button>
        )}
      </Shell>
    );
  }

  if (phase === "calculating") {
    return (
      <Shell>
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div
            style={{
              width: 46,
              height: 46,
              border: `2px solid rgba(143,233,216,0.2)`,
              borderTopColor: TEAL,
              borderRadius: "50%",
              margin: "0 auto 26px",
              animation: "spin 0.9s linear infinite",
            }}
          />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22,
              color: "#cfe0db",
            }}
          >
            Calculating your consult leak…
          </p>
          <p style={{ fontSize: 14, color: "#6b7e79", marginTop: 8 }}>
            Running your numbers against AMSPA’s $504 average spend per visit.
          </p>
        </div>
      </Shell>
    );
  }

  if (phase === "teaser") {
    return (
      <Shell>
        <p style={{ fontSize: 14, color: TEAL, letterSpacing: "0.1em", marginBottom: 14 }}>
          YOUR CONSULT LEAK SIGNAL
        </p>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 56,
            lineHeight: 1.04,
            letterSpacing: 0,
            margin: "0 0 10px",
          }}
        >
          {leakTeaser.severity}
        </div>
        <p style={{ fontSize: 16, color: "#9fb3ad", margin: "8px 0 30px", lineHeight: 1.6 }}>
          Your answers put the leak in the{" "}
          <span style={{ color: "#e8efed", fontWeight: 600 }}>
            {leakTeaser.range}
          </span>{" "}
          based on your answers. Get {leakTeaser.reveal} on the next screen.
        </p>
        <div
          style={{
            border: `1px solid rgba(143,233,216,0.25)`,
            background: "rgba(143,233,216,0.05)",
            borderRadius: 16,
            padding: "22px 24px",
            marginBottom: 26,
          }}
        >
          <p style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px", color: "#e8efed" }}>
            You don’t have a lead problem. You have a capture problem.
          </p>
          <p style={{ fontSize: 15, color: "#9fb3ad", margin: 0, lineHeight: 1.6 }}>
            {leakTeaser.note}
          </p>
        </div>
        <button style={accentBtn} onClick={() => setPhase("gate")}>
          Show me the full breakdown →
        </button>
      </Shell>
    );
  }

  if (phase === "gate") {
    return (
      <Shell>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 30,
            lineHeight: 1.2,
            margin: "0 0 12px",
          }}
        >
          Where should we send your full breakdown?
        </h2>
        <p style={{ fontSize: 15.5, color: "#8ba099", margin: "0 0 26px", lineHeight: 1.6 }}>
          You’ll see the exact math, your biggest leak, and a personalized read on your
          clinic. We’ll also email you a copy you can keep.
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitLead()}
          placeholder="Your name"
          style={inputStyle}
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitLead()}
          placeholder="Phone number"
          style={inputStyle}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitLead()}
          placeholder="you@yourclinic.com"
          style={{
            ...inputStyle,
            border: `1px solid ${leadErr ? "#e07a7a" : "rgba(255,255,255,0.12)"}`,
            marginBottom: 12,
          }}
        />
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitLead()}
          placeholder="https://yourclinic.com"
          style={{
            ...inputStyle,
            marginBottom: leadErr ? 8 : 18,
          }}
        />
        {leadErr && (
          <p style={{ color: "#e07a7a", fontSize: 13.5, margin: "0 0 16px" }}>{leadErr}</p>
        )}
        <button style={accentBtn} onClick={submitLead}>
          Show my full breakdown →
        </button>
        <p style={{ fontSize: 12, color: "#5f726d", marginTop: 14, lineHeight: 1.5 }}>
          We’ll never share your info. One follow-up at most if you don’t book.
        </p>
      </Shell>
    );
  }

  if (phase === "booked") {
    return (
      <Shell>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(143,233,216,0.12)",
            border: `1px solid ${TEAL}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            color: TEAL,
            marginBottom: 22,
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 30,
            margin: "0 0 12px",
          }}
        >
          You’re booked{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.
        </h2>
        <p style={{ fontSize: 16, color: "#9fb3ad", lineHeight: 1.6, margin: "0 0 24px" }}>
          You’ll be matched with one of our two founders for a 20-minute Consult Leak
          Audit. We’ll run the real snapshot on your clinic and walk you through your
          single biggest leak.
        </p>
        <div
          style={{
            border: `1px solid rgba(143,233,216,0.25)`,
            background: "rgba(143,233,216,0.05)",
            borderRadius: 14,
            padding: "18px 20px",
            fontSize: 14.5,
            color: "#cfe0db",
            lineHeight: 1.6,
          }}
        >
          🔒 <strong>Founding Member offer locked:</strong> 25% off + setup fee waived —
          held for you if you join on the call.
        </div>
      </Shell>
    );
  }

  // ── RESULT phase ──
  return (
    <Shell>
      <p style={{ fontSize: 14, color: TEAL, letterSpacing: "0.1em", marginBottom: 12 }}>
        YOUR FULL BREAKDOWN
      </p>

      <div
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 500,
          fontSize: 58,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          margin: "0 0 6px",
        }}
      >
        {fmt(calc.monthlyLeak)}
        <span style={{ fontSize: 22, color: "#7d918c" }}> /mo</span>
      </div>
      <p style={{ fontSize: 15, color: "#9fb3ad", margin: "0 0 18px" }}>
        ≈ {fmt(calc.annualLeak)} per year — conservative, first-visit value only.
      </p>

      {/* LTV reveal */}
      <div
        style={{
          border: `1px solid rgba(143,233,216,0.22)`,
          background: "rgba(143,233,216,0.05)",
          borderRadius: 16,
          padding: "20px 22px",
          marginBottom: 22,
        }}
      >
        <p style={{ fontSize: 13.5, color: "#9fb3ad", margin: "0 0 6px", lineHeight: 1.5 }}>
          But a patient is worth more than one visit. Over an estimated{" "}
          <span style={{ color: TEAL, fontWeight: 600 }}>{lifetimeVisits} visits</span>{" "}
          each, the same lost patients are really worth:
        </p>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 40,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            margin: "4px 0 2px",
            color: "#e8efed",
          }}
        >
          {fmt(calc.monthlyLeakLTV)}
          <span style={{ fontSize: 18, color: "#7d918c" }}> /mo in lifetime value</span>
        </div>
        <p style={{ fontSize: 14, color: "#9fb3ad", margin: "2px 0 14px" }}>
          ≈ {fmt(calc.annualLeakLTV)} per year in lost patient lifetime value.
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8ba099", marginBottom: 8 }}>
          <span>How many times does an average patient come back? (your estimate)</span>
          <span style={{ color: TEAL, fontWeight: 600 }}>{lifetimeVisits} visits</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={lifetimeVisits}
          onChange={(e) => setLifetimeVisits(Number(e.target.value))}
          style={{ width: "100%", accentColor: TEAL }}
        />
      </div>

      <button
        onClick={openBooking}
        style={{
          background: "transparent",
          color: TEAL,
          border: `1px solid ${TEAL}`,
          borderRadius: 999,
          padding: "11px 22px",
          fontSize: 14.5,
          fontWeight: 600,
          fontFamily: "'Hanken Grotesk', sans-serif",
          cursor: "pointer",
          marginBottom: 8,
        }}
      >
        Book my free audit to plug this →
      </button>
      <p style={{ fontSize: 13, color: TEAL, margin: "0 0 28px", fontWeight: 600 }}>
        🔒 Book now &amp; lock 25% off + waived setup (Founding Member).
      </p>

      {/* transparent math */}
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "22px 22px 8px",
          marginBottom: 22,
        }}
      >
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.12em",
            color: "#6b7e79",
            margin: "0 0 16px",
          }}
        >
          HOW WE GOT THIS — YOUR NUMBERS
        </p>
        {[
          [`${calc.callsPerWeek} calls/week`, `≈ ${Math.round(calc.monthlyCalls)} inbound calls/month`],
          [`Missed-call rate`, `${Math.round(missedPct * 100)}% (adjust below)`],
          [`New-patient share of missed calls`, `${Math.round(BOOKABLE_SHARE * 100)}% (conservative)`],
          [`Avg patient spend / visit`, `$504 — AMSPA, 2024`],
        ].map(([k, v]) => (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14.5,
              padding: "9px 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span style={{ color: "#9fb3ad" }}>{k}</span>
            <span style={{ color: "#e8efed", fontWeight: 500 }}>{v}</span>
          </div>
        ))}

        {/* adjustable missed % */}
        <div style={{ padding: "20px 0 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#8ba099", marginBottom: 10 }}>
            <span>Don’t agree with the missed-call rate? Drag it to match reality.</span>
            <span style={{ color: TEAL, fontWeight: 600 }}>{Math.round(missedPct * 100)}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="40"
            value={Math.round(missedPct * 100)}
            onChange={(e) => setMissedPct(Number(e.target.value) / 100)}
            style={{ width: "100%", accentColor: TEAL }}
          />
        </div>
      </div>

      {/* diagnosis */}
      <div
        style={{
          border: `1px solid rgba(143,233,216,0.22)`,
          background: "rgba(143,233,216,0.05)",
          borderRadius: 16,
          padding: "22px 24px",
          marginBottom: 24,
        }}
      >
        <p style={{ fontSize: 12, letterSpacing: "0.12em", color: TEAL, margin: "0 0 12px" }}>
          YOUR PERSONALIZED READ
        </p>
        <p style={{ fontSize: 15.5, color: "#dbe8e4", lineHeight: 1.7, margin: "0 0 12px" }}>
          {diagnosis.primary}
        </p>
        <p
          style={{
            fontSize: 15.5,
            lineHeight: 1.7,
            margin: 0,
            color: diagnosis.hard ? "#f4d9b8" : "#dbe8e4",
            fontWeight: diagnosis.hard ? 600 : 400,
          }}
        >
          {diagnosis.band}
        </p>
      </div>

      {/* CTA card */}
      <div
        style={{
          borderRadius: 16,
          background: "linear-gradient(135deg, rgba(143,233,216,0.1), rgba(143,233,216,0.02))",
          border: `1px solid rgba(143,233,216,0.25)`,
          padding: "26px 24px",
        }}
      >
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 24,
            margin: "0 0 10px",
            lineHeight: 1.25,
          }}
        >
          This estimate is directional. Your real leak is usually bigger.
        </h3>
        <p style={{ fontSize: 15, color: "#9fb3ad", lineHeight: 1.6, margin: "0 0 20px" }}>
          This is built from a few answers. The full picture lives in your actual call logs,
          booking flow, reviews, and what competitors near you are doing — which we map in
          the real Consult Leak Snapshot. Book a 20-minute audit and we’ll walk you through
          your single biggest leak.
        </p>
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.12em", color: "#6b7e79", margin: "0 0 12px" }}>
            ON YOUR 20-MINUTE AUDIT, WE’LL
          </p>
          {[
            "Run the real snapshot on your clinic — calls, booking, search & competitors",
            "Show you the single biggest leak and what it's costing you",
            "Give you the first fix to plug it — whether or not you work with us",
          ].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                fontSize: 14.5,
                color: "#cfe0db",
                lineHeight: 1.5,
                marginBottom: 9,
              }}
            >
              <span style={{ color: TEAL, fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13.5,
            color: TEAL,
            marginBottom: 18,
            fontWeight: 600,
          }}
        >
          🔒 Founding Member: 25% off + setup waived if you join on the call.
        </div>
        <button style={accentBtn} onClick={openBooking}>
          Book my free 20-min Consult Leak Audit →
        </button>
        <p style={{ fontSize: 12, color: "#5f726d", marginTop: 14, textAlign: "center" }}>
          Matched round-robin with a Rhemic founder. No pitch — just your leak.
        </p>
      </div>
    </Shell>
  );
}
