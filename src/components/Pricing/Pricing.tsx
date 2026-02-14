import TypewriterText from '@/components/TypewriterText/TypewriterText';

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 md:py-44 px-6">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="scroll-reveal">
          <p className="text-sm font-medium tracking-[0.25em] uppercase text-[var(--text-tertiary)] mb-6">
            Pricing
          </p>
          <TypewriterText
            lines={['Every business is different.', "Let\u2019s build your plan."]}
            speed={25}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] text-[var(--text-primary)]"
            tag="h2"
          />
        </div>

        <p className="scroll-reveal mt-8 text-base md:text-lg text-[var(--text-tertiary)] font-light max-w-xl mx-auto leading-relaxed">
          We tailor our AEO platform to your industry, scale, and goals.
          Book a quick call and we&apos;ll walk you through what Rhemic AI
          can do for your brand.
        </p>

        {/* Value highlights */}
        <div className="scroll-reveal mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[var(--text-muted)]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            No long-term contracts
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500/60" />
            Custom to your needs
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            ROI-focused
          </span>
        </div>

        {/* CTA */}
        <div className="scroll-reveal mt-12">
          <button className="group relative px-10 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full overflow-hidden transition-all duration-300 hover:scale-105">
            <span className="relative z-10">Book a Discovery Call</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        <p className="scroll-reveal mt-6 text-sm text-[var(--text-faint)] tracking-wide">
          Free consultation &middot; No commitment &middot; 15 minutes
        </p>
      </div>
    </section>
  );
}
