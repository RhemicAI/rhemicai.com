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
        {/* Tag */}
        <p
          className="text-[11px] sm:text-sm md:text-base font-medium tracking-[0.08em] sm:tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-8 font-body"
          style={{ textShadow: '0 0 40px rgba(10, 10, 10, 0.9)' }}
        >
          {eyebrowText}
        </p>

        {/* Title */}
        <div className="mb-8">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)] font-display"
            style={{ textShadow: '0 0 40px rgba(10, 10, 10, 0.9)' }}
          >
            <span className="block">Be the Answer</span>
            <span className="block">When AI Gets Asked</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="text-base md:text-lg lg:text-xl text-[var(--text-primary)] max-w-2xl mx-auto font-normal leading-[1.6] mb-12 opacity-80 font-body"
          style={{
            textShadow: '0 0 40px rgba(10, 10, 10, 0.9)',
          }}
        >
          When customers ask ChatGPT, Claude, or Perplexity for suggestions,
          <br className="hidden sm:block" />
          Rhemic AI makes sure your business is the answer.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://cal.com/rhemic-ai/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-lg font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-full shadow-lg shadow-violet-500/50 transition-all duration-200 hover:scale-105 font-body tracking-[0.01em]"
          >
            Book a Demo
          </a>
          <a
            href="#product"
            className="px-8 py-4 text-base font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] rounded-full hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 font-body tracking-[0.01em]"
          >
            See How It Works
          </a>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-full px-6 sm:px-0 sm:w-auto flex flex-col items-center gap-1.5 sm:gap-2">
        <p className="text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase text-[var(--text-secondary)] text-center">
          Where your customers are already searching
        </p>
        <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1.5 sm:gap-x-6 text-[var(--text-tertiary)]">
          {/* OpenAI / ChatGPT */}
          <span className="flex flex-col items-center gap-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-70">
              <path d="M22.2 8.7a5.9 5.9 0 0 0-.5-4.9A6 6 0 0 0 15.2 1a5.9 5.9 0 0 0-5.6 3.1A5.9 5.9 0 0 0 5.7 6a6 6 0 0 0-4 5.7 5.9 5.9 0 0 0 .7 4.9 6 6 0 0 0 6.5 2.8A5.9 5.9 0 0 0 13 22a6 6 0 0 0 5.7-4 5.9 5.9 0 0 0 3.9-5.7 6 6 0 0 0-.4-3.6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="text-[8px] sm:text-[9px] tracking-wider uppercase">ChatGPT</span>
          </span>
          {/* Anthropic / Claude */}
          <span className="flex flex-col items-center gap-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-70">
              <path d="M12 2L9 12l-7 2 7 2 3 6 3-6 7-2-7-2L12 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
            <span className="text-[8px] sm:text-[9px] tracking-wider uppercase">Claude</span>
          </span>
          {/* Perplexity */}
          <span className="flex flex-col items-center gap-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-70">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M12 4v5M12 15v5M4 12h5M15 12h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="text-[8px] sm:text-[9px] tracking-wider uppercase">Perplexity</span>
          </span>
          {/* Google Gemini */}
          <span className="flex flex-col items-center gap-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-70">
              <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
            <span className="text-[8px] sm:text-[9px] tracking-wider uppercase">Gemini</span>
          </span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] text-center">
          Millions ask these AI tools for business recommendations every day.
        </p>
      </div>
    </section>
  );
}
