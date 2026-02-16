const stats = [
  { value: '5x', label: 'Higher conversion from AI search vs Google', source: 'Semrush', url: 'https://www.semrush.com/blog/ai-overviews/' },
  { value: '$750B', label: 'AI search revenue by 2028', source: 'McKinsey', url: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier' },
  { value: '80%', label: 'Of consumers rely on AI summaries', source: 'Bain & Company', url: 'https://www.bain.com/insights/the-age-of-ai-search/' },
  { value: '#2', label: 'Most influential shopping source', source: 'IAB', url: 'https://www.iab.com/insights/' },
  { value: '25%', label: 'Traditional search volume drop by 2026', source: 'Gartner', url: 'https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026' },
  { value: 'Only 16%', label: 'Of brands track AI search performance', source: 'McKinsey', url: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-state-of-ai' },
];

export default function ProofSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="text-over-globe max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#8B5CF6] mb-4 font-body">
          The Shift
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] text-[var(--text-primary)] leading-tight font-display">
          The AI Search Shift Is Already Here
        </h2>
        <p className="mt-4 text-base md:text-lg text-[var(--text-primary)] font-normal max-w-xl mx-auto opacity-80 font-body">
          Consumers are making buying decisions through AI — and brands that show up win.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.value}
            className="relative p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-glass)] backdrop-blur-sm hover:border-[var(--border-strong)] transition-colors duration-300"
          >
            <span className="block text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-2 font-display">
              {stat.value}
            </span>
            <span className="block text-sm text-[var(--text-tertiary)] leading-relaxed mb-4">
              {stat.label}
            </span>
            <a
              href={stat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.15em] uppercase text-[var(--text-faint)] border border-[var(--border-subtle)] rounded-full px-3 py-1 hover:border-[var(--border-strong)] hover:text-[var(--text-tertiary)] transition-colors duration-200"
            >
              {stat.source}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-lg md:text-xl font-medium text-[var(--text-secondary)] mb-6">
          Don&apos;t get left behind.
        </p>
        <a
          href="https://cal.com/rhemic-ai/discovery-call"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-block px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10">Book a Discovery Call</span>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      </div>
    </section>
  );
}
