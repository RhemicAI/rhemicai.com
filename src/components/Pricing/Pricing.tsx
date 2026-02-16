export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 md:py-28 px-6">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Header */}
        <div>
          <p className="text-sm font-medium tracking-[0.25em] uppercase text-[var(--text-secondary)] mb-6">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] text-[var(--text-primary)]">
            <span className="block">Every business is different.</span>
            <span className="block">Let&apos;s build your plan.</span>
          </h2>
        </div>

        <p className="mt-8 text-base md:text-lg text-[var(--text-primary)] font-normal max-w-xl mx-auto leading-relaxed opacity-80">
          We tailor our AEO platform to your industry, scale, and goals.
          Book a quick call and we&apos;ll walk you through what Rhemic AI
          can do for your brand.
        </p>

        {/* Value highlights */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium text-[var(--text-primary)] opacity-70">
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
        <div className="mt-12">
          <a
            href="https://cal.com/rhemic-ai/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block px-10 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <span className="relative z-10">Book a Discovery Call</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>

        <p className="mt-6 text-sm text-[var(--text-secondary)] tracking-wide">
          Free consultation &middot; No commitment &middot; 15 minutes
        </p>
      </div>
    </section>
  );
}
