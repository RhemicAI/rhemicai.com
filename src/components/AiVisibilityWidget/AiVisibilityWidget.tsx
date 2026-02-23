'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

const API_BASE_URL = 'https://api.rhemicai.com';
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

type Industry = (typeof INDUSTRIES)[number];
type Phase = 'input' | 'scanning' | 'results' | 'error';

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

  const topicCoverage =
    payload.topic_coverage ?? (nested.topic_coverage as number | undefined);
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

export default function AiVisibilityWidget() {
  const [phase, setPhase] = useState<Phase>('input');
  const [domainInput, setDomainInput] = useState('');
  const [industry, setIndustry] = useState<Industry>('Marketing Agency');
  const [activeDomain, setActiveDomain] = useState('');
  const [scanId, setScanId] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<ScanStatus>('pending');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<ScanMetrics | null>(null);

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartedAtRef = useRef<number | null>(null);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://app.cal.com/embed/embed.js"]'
    );
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
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

  const resetToInput = () => {
    setPhase('input');
    setScanId(null);
    setScanStatus('pending');
    setErrorMessage(null);
    setMetrics(null);
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
    <section className="relative px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0D1012] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_24px_80px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(0,212,170,0.13),transparent_42%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.05),transparent_38%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_28%)]" />
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <div className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00D4AA]">
                AI VISIBILITY INDEX
              </div>
              <h2 className="max-w-2xl text-2xl leading-tight text-white sm:text-3xl lg:text-4xl">
                See if AI recommends your brand
              </h2>
            </div>

            {phase === 'input' && (
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="ai-visibility-domain"
                        className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/65"
                      >
                        Website Domain
                      </label>
                      <input
                        id="ai-visibility-domain"
                        type="text"
                        value={domainInput}
                        onChange={(e) => setDomainInput(e.target.value)}
                        placeholder="yourdomain.com"
                        autoComplete="off"
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white placeholder:text-white/35 outline-none transition focus:border-[#00D4AA]/60 focus:ring-2 focus:ring-[#00D4AA]/20"
                      />
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
                      className="inline-flex w-full items-center justify-center rounded-xl bg-[#00D4AA] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#22e7c0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4AA]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1012]"
                    >
                      Scan My Website
                    </button>
                  </div>
                </form>

                <div className="rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-6">
                  <div className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white/55">
                    What you get
                  </div>
                  <div className="space-y-3">
                    {[
                      'AI visibility score across major answer engines',
                      'Topic coverage and mention consistency signals',
                      'Competitive share benchmark snapshot',
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#00D4AA]" />
                        <p className="text-sm leading-relaxed text-white/80">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {phase === 'scanning' && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                  Scanning Domain
                </div>
                <div className="mb-6 rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-white">
                  {activeDomain}
                </div>

                <div className="rounded-2xl border border-[#00D4AA]/20 bg-[#00D4AA]/5 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D4AA]/70" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00D4AA]" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#00D4AA]">
                      Scan in Progress
                    </span>
                  </div>
                  <p className="animate-pulse text-sm text-white/85 sm:text-base">{statusMessage}</p>
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
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                  <div className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                    YOUR AI VISIBILITY SCORE
                  </div>
                  <div
                    className="text-5xl font-semibold tracking-tight sm:text-6xl"
                    style={{ color: scoreColor(metrics.score) }}
                  >
                    {metrics.score}
                    <span className="ml-1 text-3xl sm:text-4xl">%</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ['Topic Coverage', metrics.topicCoverage],
                    ['Mention Consistency', metrics.mentionConsistency],
                    ['Competitive Share', metrics.competitiveShare],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                    >
                      <div className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                        {label}
                      </div>
                      <div className="text-2xl font-semibold text-white">{value}%</div>
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
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

                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0D1012]/50 via-[#0D1012]/75 to-[#0D1012]/85 px-4 text-center">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-sm">
                        <LockIcon />
                      </div>
                      <p className="max-w-sm text-sm text-white/85 sm:text-base">
                        See which AI engines mention you — and which don&apos;t
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#00D4AA]/20 bg-gradient-to-br from-[#00D4AA]/8 via-white/[0.02] to-transparent p-5 sm:p-6">
                  <h3 className="text-xl text-white sm:text-2xl">
                    Unlock your full visibility report
                  </h3>
                  <p className="mt-2 text-sm text-white/70 sm:text-base">
                    Free trial available for qualified teams
                  </p>
                  <div className="mt-5">
                    <button
                      type="button"
                      data-cal-link="rhemic-ai/discovery-call"
                      data-cal-config='{"layout":"month_view"}'
                      className="inline-flex items-center justify-center rounded-xl bg-[#00D4AA] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#22e7c0]"
                    >
                      Book a Demo
                    </button>
                  </div>
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
