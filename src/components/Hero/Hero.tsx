'use client';

import CalBookingLink from '@/components/CalEmbed/CalBookingLink';

const channels = [
  'Google Maps',
  'Google Business Profile',
  'Reviews',
  'Treatment pages',
  'Ads intelligence',
  'Missed calls',
  'AI answers',
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-12 pt-28">
      <div className="relative z-10 mx-auto min-w-0 w-full max-w-4xl text-center">
        <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200/75">
          Patient acquisition infrastructure for U.S. med spas
        </p>

        <h1
          className="mx-auto mb-6 max-w-[calc(100vw-3rem)] font-body text-[2.35rem] font-extrabold leading-[1.05] tracking-normal text-[var(--text-primary)] sm:max-w-4xl sm:text-[clamp(3.25rem,5.1vw,4.9rem)]"
          style={{ textShadow: '0 0 24px rgba(3, 7, 18, 0.55)' }}
        >
          Med spa growth infrastructure for more booked consults.
        </h1>

        <p
          className="mx-auto mb-8 max-w-[calc(100vw-3rem)] font-body text-base font-normal leading-[1.7] text-[var(--text-primary)] opacity-78 sm:max-w-2xl md:text-lg"
          style={{ textShadow: '0 0 20px rgba(3, 7, 18, 0.4)' }}
        >
          Built by med-spa growth experts, Rhemic helps your clinic get found, trusted, and booked across the channels patients actually use: Google Maps, Google Business Profile, reviews, treatment pages, ads, missed calls, and AI answer engines.
        </p>

        <div className="mb-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CalBookingLink
            calLink="rhemic-ai/discovery-call"
            className="w-full max-w-[320px] rounded-[5px] bg-white px-5 py-3.5 font-body text-sm font-semibold text-black shadow-lg shadow-white/10 transition-all duration-200 hover:scale-105 hover:bg-gray-100 sm:w-auto sm:max-w-none sm:px-7 sm:text-base"
          >
            Book a 20-minute med-spa growth audit
          </CalBookingLink>
          <a
            href="#what-we-optimize"
            className="w-full max-w-[320px] rounded-[5px] border border-[var(--border-strong)] px-5 py-3.5 font-body text-sm font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] sm:w-auto sm:max-w-none sm:px-7 sm:text-base"
          >
            See what we optimize
          </a>
        </div>

        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2">
          {channels.map((channel) => (
            <span
              key={channel}
              className="rounded-[5px] border border-white/10 bg-white/[0.04] px-3 py-2 font-body text-xs text-[var(--text-secondary)]"
            >
              {channel}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
