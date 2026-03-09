const signals = [
  {
    metricTitle: 'Brand Share % Baseline',
    body: 'Most agencies discover their clients appear in less than 15% of relevant AI answers. That\'s the gap. Knowing it exists is step one.',
  },
  {
    metricTitle: 'Competitor Gap Map',
    body: 'On average, 3–5 competitors are capturing the AI recommendations your clients are missing. We show you exactly who and exactly which topics.',
  },
  {
    metricTitle: '30-Day Delta Tracking',
    body: 'After implementing Rhemic recommendations, agencies track improvement with a second scan. The before-and-after delta is the slide that renews retainers.',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400/80 mb-5 font-body">
            EARLY SIGNALS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] font-display">
            What Agencies See in Their First 30 Days
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {signals.map((s, i) => (
            <div
              key={i}
              className="flex flex-col bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-2xl p-8 hover:border-[var(--border-strong)] transition-colors duration-200"
            >
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-display mb-4">
                {s.metricTitle}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] font-body">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
