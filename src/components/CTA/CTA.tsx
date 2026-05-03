import CalBookingLink from '@/components/CalEmbed/CalBookingLink';

export default function CTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] font-display">
            Your competitors are already being recommended by AI.
          </h2>
        </div>

        <p className="mt-6 text-base md:text-lg text-[var(--text-primary)] font-normal max-w-2xl mx-auto leading-relaxed opacity-75 font-body">
          Find out where you stand. Free scan, results in 60 seconds, no account required.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#ai-visibility-scan"
            className="px-8 py-4 text-lg font-semibold text-black bg-white hover:bg-gray-100 rounded-[5px] shadow-lg shadow-white/10 transition-all duration-200 hover:scale-105"
          >
            Run Free AI Scan
          </a>

          <CalBookingLink
            calLink="rhemic-ai/discovery-call"
            className="px-8 py-4 text-base font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] rounded-[5px] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300"
          >
            Book a Demo
          </CalBookingLink>
        </div>

        <p className="mt-6 text-sm text-[var(--text-secondary)] tracking-wide">
          No credit card required. Results in 5 minutes.
        </p>
      </div>
    </section>
  );
}
