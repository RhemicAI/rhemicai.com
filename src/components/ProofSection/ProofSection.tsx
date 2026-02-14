const stats = [
  { value: '5x', label: 'Higher conversion from AI search vs Google', source: 'Semrush' },
  { value: '$750B', label: 'AI search revenue by 2028', source: 'McKinsey' },
  { value: '80%', label: 'Of consumers rely on AI summaries', source: 'Bain & Company' },
  { value: '#2', label: 'Most influential shopping source', source: 'IAB' },
  { value: '25%', label: 'Traditional search volume drop by 2026', source: 'Gartner' },
  { value: 'Only 16%', label: 'Of brands track AI search performance', source: 'McKinsey' },
];

export default function ProofSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="scroll-reveal text-over-globe max-w-3xl mx-auto text-center mb-16" data-animation="title-fade">
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
            className="scroll-reveal relative p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-glass)] backdrop-blur-sm hover:border-[var(--border-strong)] transition-colors duration-300"
            data-animation="card-rise"
            data-delay={`${(i + 1) * 0.12}`}
          >
            <span className="block text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-2 font-display">
              {stat.value}
            </span>
            <span className="block text-sm text-[var(--text-tertiary)] leading-relaxed mb-4">
              {stat.label}
            </span>
            <span className="inline-block text-[10px] font-medium tracking-[0.15em] uppercase text-[var(--text-faint)] border border-[var(--border-subtle)] rounded-full px-3 py-1">
              {stat.source}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-lg md:text-xl font-medium text-[var(--text-secondary)] mb-6">
          Don&apos;t get left behind.
        </p>
        <button className="group relative px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full overflow-hidden transition-all duration-300 hover:scale-105">
          <span className="relative z-10">Book a Discovery Call</span>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </section>
  );
}
