'use client';

import CalBookingLink from '@/components/CalEmbed/CalBookingLink';

const stripItems = [
  ['Visibility', 'Google + AI search'],
  ['Capture', 'Missed calls'],
  ['Routing', 'Booking requests'],
  ['Reporting', 'Source tied'],
];

export default function Hero() {
  return (
    <section className="rhemic-grid-bg relative min-h-screen overflow-hidden px-[clamp(20px,4vw,64px)] pb-16 pt-28 md:pt-36">
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-11rem)] max-w-[1280px] flex-col items-center justify-center text-center">
        <div className="hero-enter-eyebrow mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(77,214,224,0.2)] bg-[var(--pulse-soft)] px-4 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--pulse-deep)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--pulse)] shadow-[0_0_8px_var(--pulse-glow)]" />
          For U.S. med spas
        </div>

        <h1 className="hero-enter-title mx-auto max-w-[1120px] font-display text-[clamp(3rem,7.6vw,6.5rem)] font-medium leading-[1.02] tracking-normal text-[var(--ink)] sm:text-[clamp(3.6rem,7.1vw,7.2rem)]">
          <span className="block">Med spa growth engine</span>
          <span className="hero-proof-word block text-[var(--pulse-deep)]">for more booked consults.</span>
        </h1>

        <p className="hero-enter-copy mx-auto mt-8 max-w-[760px] font-body text-base leading-[1.55] text-[var(--mute)] sm:text-lg md:text-xl">
          Rhemic helps clinics get found on Google and AI search, answer leads faster, recover missed calls, and trace consults back to the source.
        </p>

        <div className="hero-enter-copy mt-9 hidden flex-col items-center justify-center gap-3 sm:flex sm:flex-row">
          <CalBookingLink
            calLink="rhemic-ai/medspa-discovery-call"
            className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 font-body text-sm font-semibold text-[var(--bg)] shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_4px_16px_-4px_rgba(238,242,247,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--pulse)] hover:shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_6px_24px_-4px_var(--pulse-glow)]"
          >
            Get a visibility + call leak audit
          </CalBookingLink>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.04)] px-5 py-3 font-body text-sm font-medium text-[var(--ink)] backdrop-blur-lg transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[rgba(255,255,255,0.08)]"
          >
            See how it works
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-6 flex max-w-[1280px] flex-wrap items-center gap-3 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-3 shadow-[var(--glass-shadow)] backdrop-blur-2xl">
        <span className="rounded-full bg-[var(--pulse-soft)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--pulse-deep)]">
          live
        </span>
        {stripItems.map(([label, value], index) => (
          <span key={label} className="flex items-center gap-3 text-sm text-[var(--mute)]">
            {index > 0 ? <span className="text-[var(--mute-2)]">·</span> : null}
            <span>
              {label} <b className="font-medium text-[var(--ink)]">{value}</b>
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
