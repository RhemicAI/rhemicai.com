import CalBookingLink from '@/components/CalEmbed/CalBookingLink';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(77,214,224,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.05] text-[var(--text-primary)] font-display">
            Find where consults are leaking before you spend more on demand.
          </h2>
        </div>

        <p className="mt-6 text-base md:text-lg text-[var(--text-primary)] font-normal max-w-2xl mx-auto leading-relaxed opacity-75 font-body">
          Get a visibility and call leak audit. We&apos;ll review local visibility, trust signals, treatment pages, missed-call opportunities, and AI answers.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CalBookingLink
            calLink="rhemic-ai/medspa-discovery-call"
            className="px-8 py-4 text-base font-semibold text-[var(--bg)] bg-[var(--ink)] hover:bg-[var(--pulse)] rounded-full shadow-lg shadow-[var(--pulse-soft)] transition-all duration-200 hover:-translate-y-0.5"
          >
            Get a visibility + call leak audit
          </CalBookingLink>

          <Link
            href="#what-we-optimize"
            className="px-8 py-4 text-base font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] rounded-full bg-[var(--glass-bg)] hover:border-[var(--pulse)] hover:text-[var(--text-primary)] transition-colors duration-300"
          >
            See what we optimize
          </Link>
        </div>

        <p className="mt-6 text-sm text-[var(--text-secondary)] tracking-wide">
          No ranking promises. No clinical advice. Just a grounded read on where patient acquisition can improve.
        </p>
      </div>
    </section>
  );
}
