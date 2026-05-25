'use client';

import { useEffect, useRef } from 'react';
import CalBookingLink from '@/components/CalEmbed/CalBookingLink';

const scopeStats = [
  { label: 'visibility', value: 'Search + AI' },
  { label: 'calls', value: 'Missed calls' },
  { label: 'handoffs', value: 'Routing' },
  { label: 'source', value: 'Clarity' },
];

const stripItems = [
  ['Search / AI visibility leak'],
  ['Call leak'],
  ['Handoff leak'],
  ['Source clarity leak'],
];

function easePowerInOut(t: number, power: number) {
  return t < 0.5
    ? Math.pow(t * 2, power) / 2
    : 1 - Math.pow((1 - t) * 2, power) / 2;
}

export default function Hero() {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    const halo = haloRef.current;
    if (!path || !dot) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const len = path.getTotalLength();

    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);

    const setDot = (progress: number) => {
      const point = path.getPointAtLength(progress * len);
      dot.setAttribute('cx', String(point.x));
      dot.setAttribute('cy', String(point.y));
      if (halo) {
        halo.setAttribute('cx', String(point.x));
        halo.setAttribute('cy', String(point.y));
      }
    };

    if (prefersReducedMotion) {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
      setDot(0.7);
      return;
    }

    let frame = 0;
    let drawStart: number | null = null;
    let moveStart: number | null = null;

    const tick = (now: number) => {
      if (drawStart === null) drawStart = now;
      const drawProgress = Math.min((now - drawStart) / 2200, 1);
      const easedDraw = easePowerInOut(drawProgress, 2);
      path.style.strokeDashoffset = String(len * (1 - easedDraw));
      if (drawProgress === 1) {
        path.style.strokeDasharray = 'none';
      }

      if (moveStart === null) moveStart = now;
      const cycle = 5700;
      const elapsed = (now - moveStart) % cycle;
      const moveProgress = elapsed > 4500 ? 1 : easePowerInOut(elapsed / 4500, 1);
      setDot(moveProgress);

      frame = requestAnimationFrame(tick);
    };

    setDot(0);
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="rhemic-grid-bg relative min-h-screen overflow-hidden px-[clamp(20px,4vw,64px)] pb-16 pt-28 md:pt-36">
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] max-w-[1280px] items-center gap-10 lg:grid-cols-[1.06fr_0.86fr] lg:gap-12 xl:gap-16">
        <div className="min-w-0">
          <div className="hero-enter-eyebrow mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(77,214,224,0.2)] bg-[var(--pulse-soft)] px-4 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--pulse-deep)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--pulse)] shadow-[0_0_8px_var(--pulse-glow)]" />
            For U.S. med spas
          </div>

          <h1 className="hero-enter-title max-w-[980px] font-display text-[clamp(2.6rem,5vw,4rem)] font-medium leading-[0.98] tracking-normal text-[var(--ink)] lg:max-w-[700px] xl:max-w-[780px]">
            Find the consult opportunities your med spa is already losing.
          </h1>

          <p className="hero-enter-copy mt-7 max-w-[620px] font-body text-base leading-[1.6] text-[var(--mute)] md:text-lg">
            Rhemic helps med spas spot leaks across search visibility, AI answers, calls, handoffs, and source context so more booking intent reaches the right team.
          </p>

          <div className="hero-enter-copy mt-8 hidden flex-col gap-3 sm:flex sm:flex-row">
            <CalBookingLink
              calLink="rhemic-ai/medspa-discovery-call"
              className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 font-body text-sm font-semibold text-[var(--bg)] shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_4px_16px_-4px_rgba(238,242,247,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--pulse)] hover:shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_6px_24px_-4px_var(--pulse-glow)]"
            >
              Get a visibility + call leak audit
            </CalBookingLink>
            <a
              href="#consult-leaks"
              className="inline-flex items-center justify-center rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.04)] px-5 py-3 font-body text-sm font-medium text-[var(--ink)] backdrop-blur-lg transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[rgba(255,255,255,0.08)]"
            >
              See where consult opportunities leak
            </a>
          </div>
        </div>

        <div className="hero-enter-panel glass-panel overflow-hidden p-0" aria-hidden="true">
          <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-5 py-4 font-mono text-xs tracking-[0.04em] text-[var(--mute)]">
            <span className="font-medium text-[var(--ink)]">live · rhemic.scope</span>
            <span className="inline-flex gap-1.5">
              <i className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.12)]" />
              <i className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.12)]" />
              <i className="h-2 w-2 rounded-full bg-[var(--pulse)] shadow-[0_0_6px_var(--pulse-glow)]" />
            </span>
          </div>

          <svg className="block h-[220px] w-full py-2" viewBox="0 0 480 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroSigGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#4DD6E0" stopOpacity="0" />
                <stop offset="14%" stopColor="#4DD6E0" stopOpacity="1" />
                <stop offset="86%" stopColor="#4DD6E0" stopOpacity="1" />
                <stop offset="100%" stopColor="#4DD6E0" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="heroFillGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4DD6E0" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#4DD6E0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g stroke="rgba(238,242,247,0.08)" strokeWidth="1">
              <line x1="0" y1="50" x2="480" y2="50" />
              <line x1="0" y1="100" x2="480" y2="100" />
              <line x1="0" y1="150" x2="480" y2="150" />
            </g>
            <path
              d="M0,100 L60,100 L72,100 L84,60 L96,140 L108,40 L120,160 L132,90 L150,100 L240,100 L252,80 L264,120 L276,100 L360,100 L372,55 L384,145 L396,100 L480,100 L480,200 L0,200 Z"
              fill="url(#heroFillGrad)"
            />
            <path
              ref={pathRef}
              d="M0,100 L60,100 L72,100 L84,60 L96,140 L108,40 L120,160 L132,90 L150,100 L240,100 L252,80 L264,120 L276,100 L360,100 L372,55 L384,145 L396,100 L480,100"
              fill="none"
              stroke="url(#heroSigGrad)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle ref={dotRef} cx="0" cy="100" r="5" fill="#4DD6E0" />
            <circle ref={haloRef} cx="0" cy="100" r="10" fill="none" stroke="#4DD6E0" strokeOpacity="0.4" />
          </svg>

          <div className="grid grid-cols-4 border-t border-[var(--glass-border)]">
            {scopeStats.map((stat) => (
              <div key={stat.label} className="border-r border-[var(--glass-border)] px-4 py-4 last:border-r-0 sm:px-5">
                <span className="block font-mono text-[10px] tracking-[0.08em] text-[var(--mute)] sm:text-[11px]">
                  {stat.label}
                </span>
                <span className="mt-1 block font-body text-[clamp(1rem,2.1vw,1.5rem)] font-medium leading-tight text-[var(--ink)]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-6 flex max-w-[1280px] flex-wrap items-center gap-3 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-3 shadow-[var(--glass-shadow)] backdrop-blur-2xl">
        <span className="rounded-full bg-[var(--pulse-soft)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--pulse-deep)]">
          live
        </span>
        {stripItems.map(([label], index) => (
          <span key={label} className="flex items-center gap-3 text-sm text-[var(--mute)]">
            {index > 0 ? <span className="text-[var(--mute-2)]">·</span> : null}
            <span className="font-medium text-[var(--ink)]">{label}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
