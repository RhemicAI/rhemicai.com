'use client';

const eyebrowText = "VISIBILITY REIMAGINED FOR THE AI AGE";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      {/* Radial gradient overlay — sits between globe (z-0) and content (z-10) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(10, 10, 10, 0.85) 0%, rgba(10, 10, 10, 0.5) 50%, transparent 80%)' }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Tag — staggered letter blur resolve */}
        <p
          className="hero-animate text-[11px] sm:text-sm md:text-base font-medium tracking-[0.08em] sm:tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-8 font-body"
          style={{ textShadow: '0 0 30px rgba(10, 10, 10, 0.9), 0 0 60px rgba(10, 10, 10, 0.6), 0 0 100px rgba(10, 10, 10, 0.3)' }}
          aria-label={eyebrowText}
        >
          {eyebrowText.split('').map((char, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="hero-animate"
              style={{
                display: 'inline-block',
                opacity: 0,
                animation: `letterBlurResolve 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.03}s both`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>

        {/* Title — clip slide up per line */}
        <div className="mb-8">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)] font-display"
            style={{ textShadow: '0 0 30px rgba(10, 10, 10, 0.9), 0 0 60px rgba(10, 10, 10, 0.6), 0 0 100px rgba(10, 10, 10, 0.3)' }}
          >
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span
                className="block hero-animate"
                style={{ animation: 'lineSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both' }}
              >
                The New Search
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span
                className="block hero-animate"
                style={{ animation: 'lineSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s both' }}
              >
                Runs on AI.
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span
                className="block hero-animate"
                style={{ animation: 'lineSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s both' }}
              >
                Be the Answer.
              </span>
            </span>
          </h1>
        </div>

        {/* Subtitle — fade + float up */}
        <p
          className="hero-animate text-base md:text-lg lg:text-xl text-[var(--text-primary)] max-w-2xl mx-auto font-normal leading-[1.6] mb-12 opacity-80 font-body"
          style={{
            textShadow: '0 0 30px rgba(10, 10, 10, 0.9), 0 0 60px rgba(10, 10, 10, 0.6), 0 0 100px rgba(10, 10, 10, 0.3)',
            animation: 'fadeFloatUp 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 1.2s both',
          }}
        >
          When customers ask ChatGPT, Claude, or Perplexity for suggestions,
          <br className="hidden sm:block" />
          Rhemic AI makes sure your business is the answer.
        </p>

        {/* CTA — spring scale pop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="hero-animate group relative px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 font-body tracking-[0.01em]"
            style={{ animation: 'springScalePop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.5s both' }}
          >
            <span className="relative z-10">Book a Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            className="hero-animate px-8 py-4 text-base font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] rounded-full hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-300 font-body tracking-[0.01em]"
            style={{ animation: 'springScalePop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.65s both' }}
          >
            See How It Works
          </button>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-full px-6 sm:px-0 sm:w-auto flex flex-col items-center gap-2 sm:gap-3">
        <p className="text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase text-[var(--text-secondary)] text-center">
          Where your customers are already searching
        </p>
        <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 sm:gap-6 text-[var(--text-tertiary)] text-[10px] sm:text-xs tracking-wider uppercase">
          <span className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            ChatGPT
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500/60" />
            Claude
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
            Perplexity
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            Gemini
          </span>
        </div>
        <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] text-center">
          Millions ask these AI tools for business recommendations every day.
        </p>
      </div>
    </section>
  );
}
