import TypewriterText from '@/components/TypewriterText/TypewriterText';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Tag */}
        <p className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-[var(--text-tertiary)] mb-8">
          Visibility reimagined for the AI age
        </p>

        {/* Title — typewriter animation */}
        <div className="mb-8">
          <TypewriterText
            lines={['The New Search', 'Runs on AI.', 'Be the Answer.']}
            speed={28}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tighter text-[var(--text-primary)] font-[family-name:var(--font-satoshi)]"
            tag="h1"
          />
        </div>

        {/* Subtitle */}
        <p className="text-base md:text-lg lg:text-xl text-[var(--text-tertiary)] max-w-2xl mx-auto font-light leading-relaxed mb-12">
          When customers ask ChatGPT, Claude, or Perplexity for suggestions,
          <br className="hidden sm:block" />
          Rhemic AI makes sure your business is the answer.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full overflow-hidden transition-all duration-300 hover:scale-105">
            <span className="relative z-10">Book a Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button className="px-8 py-4 text-base font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] rounded-full hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-300">
            See How It Works
          </button>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-tertiary)]">
          Where your customers are already searching
        </p>
        <div className="flex items-center gap-6 text-[var(--text-faint)] text-xs tracking-wider uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            ChatGPT
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500/60" />
            Claude
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
            Perplexity
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            Gemini
          </span>
        </div>
        <p className="text-xs text-[var(--text-faint)]">
          Millions ask these AI tools for business recommendations every day.
        </p>
      </div>
    </section>
  );
}
