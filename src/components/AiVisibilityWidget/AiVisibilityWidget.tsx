'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

const API_BASE_URL = 'https://api.rhemicai.com';
const CAL_EMBED_SRC = 'https://app.cal.com/embed/embed.js';
const CAL_BOOKING_LINK = 'rhemic-ai/discovery-call';
const CAL_BOOKING_URL = 'https://cal.com/rhemic-ai/discovery-call';
const POLL_INTERVAL_MS = 5000;
const POLL_TIMEOUT_MS = 3 * 60 * 1000;

const INDUSTRIES = [
  'Marketing Agency',
  'SaaS / Software',
  'AI / Tech Company',
  'E-commerce',
  'Professional Services',
  'Healthcare',
  'Legal',
  'Finance',
  'Real Estate',
  'Education',
  'Other',
] as const;

const ENGINE_BADGES = ['ChatGPT', 'Claude', 'Perplexity', 'Gemini'] as const;

const WHAT_YOU_GET_ITEMS = [
  { title: 'AI visibility score across major answer engines', icon: 'orbit' },
  { title: 'Topic coverage and mention consistency signals', icon: 'bars' },
  { title: 'Competitive share benchmark snapshot', icon: 'share' },
] as const;

type Industry = (typeof INDUSTRIES)[number];
type Phase = 'input' | 'scanning' | 'results' | 'error';
type FeatureIconKind = (typeof WHAT_YOU_GET_ITEMS)[number]['icon'];

type ScanStatus =
  | 'pending'
  | 'generating_queries'
  | 'checking_citations'
  | 'scoring'
  | 'completed'
  | 'failed'
  | string;

interface ScanMetrics {
  score: number;
  topicCoverage: number;
  mentionConsistency: number;
  competitiveShare: number;
}

interface StartScanResponse {
  scan_id?: string;
  id?: string;
}

interface StatusResponse {
  status?: ScanStatus;
  error?: string;
  score?: number;
  visibility_score?: number;
  topic_coverage?: number;
  mention_consistency?: number;
  competitive_share?: number;
  result?: Partial<Record<string, unknown>>;
  results?: Partial<Record<string, unknown>>;
}

const STATUS_MESSAGES: Record<string, string> = {
  pending: 'Generating AI queries for your industry...',
  generating_queries: 'Generating AI queries for your industry...',
  checking_citations: 'Checking ChatGPT, Claude, Perplexity & Gemini...',
  scoring: 'Calculating your visibility score...',
};

function normalizeDomain(value: string) {
  return value
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .split('/')[0]
    .toLowerCase();
}

function clampPercent(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function toPercentFromFraction(value: unknown) {
  const num = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(num)) return 0;
  return clampPercent(num * 100);
}

function toScore(value: unknown) {
  const num = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(num)) return 0;
  return clampPercent(num);
}

function extractMetrics(payload: StatusResponse): ScanMetrics | null {
  const nested = (payload.results ?? payload.result ?? {}) as Record<string, unknown>;

  const score =
    payload.score ??
    payload.visibility_score ??
    (nested.score as number | undefined) ??
    (nested.visibility_score as number | undefined);

  const topicCoverage = payload.topic_coverage ?? (nested.topic_coverage as number | undefined);
  const mentionConsistency =
    payload.mention_consistency ?? (nested.mention_consistency as number | undefined);
  const competitiveShare =
    payload.competitive_share ?? (nested.competitive_share as number | undefined);

  if (
    score === undefined &&
    topicCoverage === undefined &&
    mentionConsistency === undefined &&
    competitiveShare === undefined
  ) {
    return null;
  }

  return {
    score: toScore(score),
    topicCoverage: toPercentFromFraction(topicCoverage),
    mentionConsistency: toPercentFromFraction(mentionConsistency),
    competitiveShare: toPercentFromFraction(competitiveShare),
  };
}

function scoreColor(score: number) {
  if (score <= 40) return '#FF4444';
  if (score <= 70) return '#FFB800';
  return '#00D4AA';
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-white/90"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
    </svg>
  );
}

function GlobeLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-white/50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4c2.4 2.3 3.7 5.1 3.7 8s-1.3 5.7-3.7 8c-2.4-2.3-3.7-5.1-3.7-8S9.6 6.3 12 4Z" />
    </svg>
  );
}

function TinyCheck() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 10 3 3 7-7" />
    </svg>
  );
}

function FeatureIcon({ kind }: { kind: FeatureIconKind }) {
  if (kind === 'orbit') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-[#00D4AA]" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="2.4" />
        <path d="M4.5 12c2.2-4.7 12.8-4.7 15 0-2.2 4.7-12.8 4.7-15 0Z" />
        <path d="M12 4.5c4.7 2.2 4.7 12.8 0 15-4.7-2.2-4.7-12.8 0-15Z" />
      </svg>
    );
  }

  if (kind === 'bars') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 text-[#00D4AA]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M5 18V10" />
        <path d="M12 18V6" />
        <path d="M19 18v-4" />
        <path d="M3.5 18.5h17" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-[#00D4AA]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 8h8v8" />
      <path d="M16 8 8 16" />
      <path d="M5 5h5" />
      <path d="M5 5v5" />
      <path d="M19 19h-5" />
      <path d="M19 19v-5" />
    </svg>
  );
}

function sparklineHeights(value: number, index: number) {
  const seeds = [22, 34, 28, 44, 39, 58, 52, 68];
  return seeds.map((bar, barIndex) => {
    const adjusted = bar + value / 3 - 20 + index * 2 + (barIndex % 2 === 0 ? -2 : 3);
    return Math.max(14, Math.min(100, adjusted));
  });
}

export default function AiVisibilityWidget({ placeholder = 'yourdomain.com' }: { placeholder?: string }) {
  const [phase, setPhase] = useState<Phase>('input');
  const [domainInput, setDomainInput] = useState('');
  const [industry, setIndustry] = useState<Industry>('Marketing Agency');
  const [activeDomain, setActiveDomain] = useState('');
  const [scanId, setScanId] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<ScanStatus>('pending');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<ScanMetrics | null>(null);
  const [domainFocused, setDomainFocused] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [visualProgress, setVisualProgress] = useState(0);
  const [resultsVisible, setResultsVisible] = useState(false);

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartedAtRef = useRef<number | null>(null);
  const calInitializedRef = useRef(false);

  const initCal = () => {
    if (typeof window === 'undefined') return false;
    const maybeCal = (window as unknown as { Cal?: (...args: unknown[]) => void }).Cal;
    if (!maybeCal) return false;
    if (!calInitializedRef.current) {
      maybeCal('init', { origin: 'https://cal.com' });
      maybeCal('preload', { calLink: CAL_BOOKING_LINK });
      calInitializedRef.current = true;
    }
    return true;
  };

  const openCalModal = () => {
    if (typeof window === 'undefined') return;

    try {
      if (!initCal()) {
        window.open(CAL_BOOKING_URL, '_blank', 'noopener,noreferrer');
        return;
      }

      const cal = (window as unknown as { Cal: (...args: unknown[]) => void }).Cal;
      cal('modal', {
        calLink: CAL_BOOKING_LINK,
        config: { layout: 'month_view' },
      });
    } catch {
      window.open(CAL_BOOKING_URL, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CAL_EMBED_SRC}"]`
    );
    if (existing) {
      if (!existing.getAttribute('data-rhemic-cal-init-listener')) {
        existing.addEventListener('load', initCal, { once: true });
        existing.setAttribute('data-rhemic-cal-init-listener', 'true');
      }
      initCal();
      return;
    }

    const script = document.createElement('script');
    script.src = CAL_EMBED_SRC;
    script.async = true;
    script.onload = () => {
      initCal();
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (phase !== 'scanning' || !scanId) {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      return;
    }

    let cancelled = false;

    const failScan = (message: string) => {
      if (cancelled) return;
      setErrorMessage(message);
      setPhase('error');
    };

    const pollStatus = async () => {
      if (cancelled) return;

      const startedAt = pollStartedAtRef.current;
      if (startedAt && Date.now() - startedAt > POLL_TIMEOUT_MS) {
        failScan('Scan timed out. Please try again.');
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/public/scan/${encodeURIComponent(scanId)}/status`,
          {
            method: 'GET',
            cache: 'no-store',
          }
        );

        if (response.status === 429) {
          failScan('Scan limit reached. Try again in an hour.');
          return;
        }

        if (!response.ok) {
          failScan('Something went wrong. Please try again.');
          return;
        }

        const payload = (await response.json()) as StatusResponse;
        const nextStatus = payload.status ?? 'pending';
        setScanStatus(nextStatus);

        if (nextStatus === 'failed') {
          failScan('Something went wrong. Please try again.');
          return;
        }

        if (nextStatus === 'completed') {
          const nextMetrics = extractMetrics(payload);
          if (!nextMetrics) {
            failScan('Something went wrong. Please try again.');
            return;
          }

          setMetrics(nextMetrics);
          setPhase('results');
        }
      } catch {
        failScan('Something went wrong. Please try again.');
      }
    };

    void pollStatus();
    pollIntervalRef.current = setInterval(() => {
      void pollStatus();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [phase, scanId]);

  const statusMessage = useMemo(
    () => STATUS_MESSAGES[scanStatus] ?? 'Analyzing your site...',
    [scanStatus]
  );

  const statusProgressTarget = useMemo(() => {
    if (phase === 'results') return 100;
    if (phase !== 'scanning') return 0;
    if (scanStatus === 'scoring') return 85;
    if (scanStatus === 'checking_citations') return 62;
    if (scanStatus === 'generating_queries' || scanStatus === 'pending') return 28;
    return 40;
  }, [phase, scanStatus]);

  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const from = visualProgress;
    const to = statusProgressTarget;
    const duration = Math.abs(to - from) < 18 ? 400 : 700;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVisualProgress(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [statusProgressTarget]);

  useEffect(() => {
    if (phase !== 'results' || !metrics) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayScore(0);
      setResultsVisible(false);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / 900);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(metrics.score * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    setResultsVisible(false);
    const revealRaf = requestAnimationFrame(() => setResultsVisible(true));
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(revealRaf);
      cancelAnimationFrame(raf);
    };
  }, [phase, metrics]);

  const engineBadgeState = useMemo(() => {
    if (scanStatus === 'scoring') return 'checked' as const;
    if (scanStatus === 'checking_citations') return 'active' as const;
    return 'dim' as const;
  }, [scanStatus]);

  const scoreStroke = metrics ? scoreColor(metrics.score) : '#00D4AA';
  const ringRadius = 62;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringProgress = (displayScore / 100) * ringCircumference;

  const resetToInput = () => {
    setPhase('input');
    setScanId(null);
    setScanStatus('pending');
    setErrorMessage(null);
    setMetrics(null);
    setVisualProgress(0);
    setDisplayScore(0);
    setResultsVisible(false);
    pollStartedAtRef.current = null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedDomain = normalizeDomain(domainInput);
    if (!normalizedDomain) {
      setErrorMessage('Please enter a valid domain.');
      return;
    }

    setErrorMessage(null);
    setMetrics(null);
    setScanStatus('pending');
    setActiveDomain(normalizedDomain);
    setPhase('scanning');
    setVisualProgress(8);
    pollStartedAtRef.current = Date.now();

    try {
      const response = await fetch(`${API_BASE_URL}/public/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `https://${normalizedDomain}`,
          industry,
        }),
      });

      if (response.status === 429) {
        setPhase('input');
        setErrorMessage('Scan limit reached. Try again in an hour.');
        return;
      }

      if (!response.ok) {
        setPhase('input');
        setErrorMessage('Something went wrong. Please try again.');
        return;
      }

      const payload = (await response.json()) as StartScanResponse;
      const nextScanId = payload.scan_id ?? payload.id;

      if (!nextScanId) {
        setPhase('input');
        setErrorMessage('Something went wrong. Please try again.');
        return;
      }

      setScanId(nextScanId);
    } catch {
      setPhase('input');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="ai-visibility-scan" className="relative px-4 pt-8 pb-16 sm:px-8 sm:pt-10 sm:pb-24 lg:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-4 inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00D4AA] shadow-[0_0_20px_rgba(0,212,170,0.08)] sm:px-6 sm:text-sm sm:tracking-[0.22em]">
            PUBLIC AI VISIBILITY INDEX
          </div>
          <p className="mx-auto max-w-2xl text-base font-semibold text-white/80 sm:text-xl">
            See if AI recommends your brand
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-white/55 sm:text-sm">
            Free preview of what our clients see. Full reports unlock competitor maps, content briefs, and Brand Share tracking.
          </p>
          <p className="mx-auto mt-1 max-w-2xl text-[10px] text-white/40 sm:text-xs">
            Public scan can take up to two minutes.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0D1012] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_24px_80px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(0,212,170,0.13),transparent_42%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.05),transparent_38%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-[-20%] w-[55%] bg-[radial-gradient(circle_at_center,rgba(0,212,170,0.08),transparent_68%)] blur-3xl" />
          <div className="relative p-5 sm:p-8 lg:p-10">
            {phase === 'input' && (
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:p-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="ai-visibility-domain"
                        className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/65"
                      >
                        Website Domain
                      </label>
                      <div
                        className={`group relative rounded-xl p-[1px] transition duration-300 ${
                          domainFocused
                            ? 'bg-[linear-gradient(120deg,rgba(0,212,170,0.85),rgba(255,255,255,0.22),rgba(0,212,170,0.75))] shadow-[0_0_0_1px_rgba(0,212,170,0.2),0_0_26px_rgba(0,212,170,0.14)] [background-size:220%_220%] animate-[pulse_2.4s_ease-in-out_infinite]'
                            : 'bg-white/10'
                        }`}
                      >
                        <div className="relative rounded-[11px] bg-black/35">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                              <GlobeLinkIcon />
                            </span>
                          </div>
                          <input
                            id="ai-visibility-domain"
                            type="text"
                            value={domainInput}
                            onChange={(e) => setDomainInput(e.target.value)}
                            onFocus={() => setDomainFocused(true)}
                            onBlur={() => setDomainFocused(false)}
                            placeholder={placeholder}
                            autoComplete="off"
                            className="w-full rounded-xl border border-transparent bg-transparent py-3 pl-14 pr-4 text-base text-white placeholder:text-white/35 outline-none"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.06),transparent)] opacity-0 transition duration-500 group-focus-within:opacity-100" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="ai-visibility-industry"
                        className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/65"
                      >
                        Industry
                      </label>
                      <select
                        id="ai-visibility-industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value as Industry)}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white outline-none transition focus:border-[#00D4AA]/60 focus:ring-2 focus:ring-[#00D4AA]/20"
                      >
                        {INDUSTRIES.map((option) => (
                          <option key={option} value={option} className="bg-[#0D1012] text-white">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {errorMessage && (
                      <p className="rounded-lg border border-[#FF4444]/30 bg-[#FF4444]/8 px-3 py-2 text-sm text-[#FF9A9A]">
                        {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#00D4AA] px-4 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-[#22e7c0] hover:shadow-[0_10px_35px_rgba(0,212,170,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4AA]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1012]"
                    >
                      <span className="pointer-events-none absolute inset-y-0 left-[-45%] w-[40%] -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 transition-all duration-500 group-hover:left-[115%] group-hover:opacity-100" />
                      <span className="relative">Scan My Website</span>
                    </button>
                  </div>
                </form>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-6">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#00D4AA]/6 to-transparent" />
                  <div className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white/55">
                    What you get
                  </div>
                  <div className="space-y-3">
                    {WHAT_YOU_GET_ITEMS.map((item, index) => (
                      <div
                        key={item.title}
                        className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3 transition duration-300 hover:border-white/10 hover:bg-white/[0.045]"
                      >
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#00D4AA]/80 to-transparent opacity-70" />
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#00D4AA]/15 bg-[#00D4AA]/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                          <FeatureIcon kind={item.icon} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm leading-relaxed text-white/82">{item.title}</p>
                          <div className="mt-2 h-1.5 w-full max-w-[210px] overflow-hidden rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#00D4AA]/55 via-[#00D4AA] to-white/55 transition-all duration-700"
                              style={{ width: `${68 + index * 12}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {phase === 'scanning' && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-8">
                <div className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                  Scanning Domain
                </div>
                <div className="mb-6 rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-white">
                  {activeDomain}
                </div>

                <div className="rounded-2xl border border-[#00D4AA]/20 bg-[#00D4AA]/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="relative mt-0.5 h-10 w-10 shrink-0">
                      <div className="absolute inset-0 rounded-full border border-[#00D4AA]/25" />
                      <div className="absolute inset-[4px] rounded-full border border-[#00D4AA]/35 animate-[spin_3s_linear_infinite]" />
                      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(0,212,170,0)_0deg,rgba(0,212,170,0.8)_60deg,rgba(0,212,170,0)_125deg)] animate-[spin_1.8s_linear_infinite]" />
                      <div className="absolute inset-[10px] rounded-full bg-[#00D4AA]/70 shadow-[0_0_18px_rgba(0,212,170,0.55)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#00D4AA]">
                        Scan in Progress
                      </span>
                      <p className="mt-2 text-sm text-white/85 sm:text-base">{statusMessage}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-white/45">
                      <span>Scan Progress</span>
                      <span>{Math.round(Math.min(100, visualProgress))}%</span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full border border-white/10 bg-black/30">
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)] animate-[pulse_2.8s_ease-in-out_infinite]" />
                      <div
                        className="relative h-full rounded-full bg-gradient-to-r from-[#00D4AA]/70 via-[#00D4AA] to-[#7fffe6] transition-[width] duration-700 ease-out"
                        style={{ width: `${Math.max(6, Math.min(100, visualProgress))}%` }}
                      >
                        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-white/30 blur-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {ENGINE_BADGES.map((engine) => {
                      const lit = engineBadgeState === 'active' || engineBadgeState === 'checked';
                      const checked = engineBadgeState === 'checked';
                      return (
                        <div
                          key={engine}
                          className={`flex items-center justify-between rounded-lg border px-2.5 py-2 text-[11px] font-medium tracking-[0.08em] transition-all duration-500 ${
                            lit
                              ? 'border-[#00D4AA]/35 bg-[#00D4AA]/10 text-[#b8fff1] shadow-[0_0_16px_rgba(0,212,170,0.12)]'
                              : 'border-white/10 bg-white/[0.03] text-white/45'
                          }`}
                        >
                          <span>{engine}</span>
                          <span className={`transition-all duration-300 ${checked ? 'opacity-100 text-[#00D4AA]' : 'opacity-0'}`}>
                            <TinyCheck />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="flex items-center justify-between text-xs text-white/55">
                    <span>Pipeline</span>
                    <span className="font-mono text-white/70">{String(scanStatus)}</span>
                  </div>
                </div>
              </div>
            )}

            {phase === 'error' && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                  Scan Status
                </div>
                <p className="mb-5 text-sm text-white/85 sm:text-base">
                  {errorMessage ?? 'Something went wrong. Please try again.'}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage(null);
                      setDomainInput(activeDomain || domainInput);
                      resetToInput();
                    }}
                    className="inline-flex items-center justify-center rounded-xl bg-[#00D4AA] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#22e7c0]"
                  >
                    Retry Scan
                  </button>
                  <button
                    type="button"
                    onClick={resetToInput}
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}

            {phase === 'results' && metrics && (
              <div className="space-y-6">
                <div
                  className={`rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-700 sm:p-8 ${
                    resultsVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                  }`}
                >
                  <div className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                    YOUR AI VISIBILITY SCORE
                  </div>
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex h-36 w-36 items-center justify-center self-center sm:h-40 sm:w-40 sm:self-auto">
                      <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                        <circle cx="80" cy="80" r={ringRadius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                        <circle
                          cx="80"
                          cy="80"
                          r={ringRadius}
                          fill="none"
                          stroke={scoreStroke}
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${ringProgress} ${ringCircumference}`}
                          className="transition-all duration-700 ease-out"
                          style={{ filter: `drop-shadow(0 0 10px ${scoreStroke}55)` }}
                        />
                      </svg>
                      <div className="absolute inset-[20px] rounded-full border border-white/10 bg-black/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" />
                      <div className="relative text-center text-5xl font-semibold tracking-tight sm:text-6xl" style={{ color: scoreStroke }}>
                        {displayScore}
                        <span className="ml-1 text-3xl sm:text-4xl">%</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                        A stronger score means AI answer engines mention your brand more often,
                        more consistently, and across a broader set of relevant topics.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ['Topic Coverage', metrics.topicCoverage],
                    ['Mention Consistency', metrics.mentionConsistency],
                    ['Competitive Share', metrics.competitiveShare],
                  ].map(([label, value], index) => (
                    <div
                      key={label}
                      className={`rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-700 ${
                        resultsVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                      }`}
                      style={{ transitionDelay: `${120 + index * 90}ms` }}
                    >
                      <div className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                        {label}
                      </div>
                      <div className="text-2xl font-semibold text-white">{value}%</div>
                      <div className="mt-3 h-8 rounded-lg border border-white/5 bg-black/20 px-2 py-1">
                        <div className="flex h-full items-end gap-1">
                          {sparklineHeights(Number(value), index).map((barHeight, barIndex) => (
                            <div key={`${label}-${barIndex}`} className="relative flex-1 overflow-hidden rounded-sm bg-white/5">
                              <div
                                className="absolute inset-x-0 bottom-0 rounded-sm bg-gradient-to-t from-[#00D4AA] to-[#8fffe9] transition-all duration-700"
                                style={{
                                  height: `${barHeight}%`,
                                  transitionDelay: `${180 + index * 80 + barIndex * 30}ms`,
                                  opacity: resultsVisible ? 0.95 : 0.25,
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-700 sm:p-6 ${
                    resultsVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                  }`}
                  style={{ transitionDelay: '360ms' }}
                >
                  <div className="mb-4">
                    <h3 className="text-lg text-white sm:text-xl">Full Visibility Breakdown</h3>
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-white/8 bg-black/25 p-4">
                    <div className="space-y-3 blur-[5px] opacity-80">
                      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                        <span className="text-sm text-white/80">ChatGPT</span>
                        <span className="text-sm text-[#00D4AA]">Mentioned</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                        <span className="text-sm text-white/80">Claude</span>
                        <span className="text-sm text-[#FFB800]">Inconsistent</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                        <span className="text-sm text-white/80">Perplexity</span>
                        <span className="text-sm text-[#00D4AA]">Mentioned</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                        <span className="text-sm text-white/80">Gemini</span>
                        <span className="text-sm text-[#FF4444]">Not Mentioned</span>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0D1012]/45 via-[#0D1012]/78 to-[#0D1012]/92 px-4 text-center">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-sm">
                        <LockIcon />
                      </div>
                      <h4 className="max-w-xl text-lg text-white sm:text-xl">
                        Unlock your Full Visibility report
                      </h4>
                      <p className="mt-2 max-w-xl text-sm text-white/70 sm:text-base">
                        Free trial available for qualified teams
                      </p>
                      <button
                        type="button"
                        onClick={openCalModal}
                        className="group relative mt-4 inline-flex w-full max-w-xl items-center justify-center overflow-hidden rounded-xl bg-[#00D4AA] px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-[#22e7c0] hover:shadow-[0_8px_30px_rgba(0,212,170,0.25)]"
                      >
                        <span className="pointer-events-none absolute inset-y-0 left-[-45%] w-[40%] -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-all duration-500 group-hover:left-[115%] group-hover:opacity-100" />
                        <span className="relative">Unlock Full Insights</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMessage(null);
                          resetToInput();
                        }}
                        className="mt-4 text-sm text-white/70 underline decoration-white/20 underline-offset-4 transition hover:text-white"
                      >
                        Scan another domain
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
