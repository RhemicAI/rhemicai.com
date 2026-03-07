export default function CTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Warm radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[1200px] h-[800px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top center, rgba(251,146,60,0.15) 0%, rgba(251,146,60,0.05) 30%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] font-display">
            <span className="block">Start Winning AI Recommendations</span>
            <span className="block">for Your Clients</span>
          </h2>
        </div>

        <p className="mt-6 text-base md:text-lg text-[var(--text-primary)] font-normal max-w-xl mx-auto leading-relaxed opacity-80">
          Run a free scan on any website in under 5 minutes. No credit card required.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#ai-visibility-scan"
            className="px-8 py-4 text-lg font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-full shadow-lg shadow-violet-500/50 transition-all duration-200 hover:scale-105"
          >
            Run Free AI Scan
          </a>

          <a
            href="#" data-cal-link="rhemic-ai/discovery-call"
            className="px-8 py-4 text-base font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] rounded-full hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300"
          >
            Book a Demo
          </a>
        </div>

        <p className="mt-6 text-sm text-[var(--text-secondary)] tracking-wide">
          No credit card required &middot; 5-minute setup &middot; Cancel anytime
        </p>
      </div>
    </section>
  );
}
