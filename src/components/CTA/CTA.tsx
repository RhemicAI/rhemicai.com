import TypewriterText from '@/components/TypewriterText/TypewriterText';

export default function CTA() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      {/* Warm radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[1200px] h-[800px] pointer-events-none animate-pulse-glow"
        style={{
          background:
            'radial-gradient(ellipse at top center, rgba(251,146,60,0.15) 0%, rgba(251,146,60,0.05) 30%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <div className="scroll-reveal">
          <TypewriterText
            lines={['Stop being invisible to AI.', 'Start being recommended.']}
            speed={25}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-[var(--text-primary)]"
            tag="h2"
          />
        </div>

        <p className="scroll-reveal mt-6 text-base md:text-lg text-[var(--text-tertiary)] font-light max-w-xl mx-auto leading-relaxed">
          Join the brands already dominating AI-generated search results
          with Rhemic AI&apos;s adaptive engagement platform.
        </p>

        <div className="scroll-reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full overflow-hidden transition-all duration-300 hover:scale-105">
            <span className="relative z-10">Book a Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button className="px-8 py-4 text-base font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] rounded-full hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-300">
            Start Free Trial
          </button>
        </div>

        <p className="scroll-reveal mt-6 text-sm text-[var(--text-faint)] tracking-wide">
          No credit card required &middot; 5-minute setup &middot; Cancel anytime
        </p>
      </div>
    </section>
  );
}
