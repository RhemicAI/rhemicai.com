const points = [
  {
    statement: 'Built by practitioners, not MBAs.',
    explanation: 'Three UTD engineers who saw the shift early and built what agencies actually need.',
  },
  {
    statement: 'Transparent pricing on the website.',
    explanation: 'No "schedule a call to learn more." Founding member plans from $599/mo.',
  },
  {
    statement: 'Results in the first scan.',
    explanation: 'Not a 6-month implementation. Run a scan, see your Brand Share %, get your playbook.',
  },
  {
    statement: 'Month-to-month. Cancel anytime.',
    explanation: 'No annual contracts, no setup fees, no enterprise sales theater. If we don\u2019t earn the renewal, we don\u2019t deserve it.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#8B5CF6] mb-4 font-body">
          Why Rhemic
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] text-[var(--text-primary)] leading-tight font-display">
          We&apos;re Not Enterprise. That&apos;s the Point.
        </h2>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {points.map((point) => (
          <div
            key={point.statement}
            className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-glass)]"
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] font-display mb-2">
              {point.statement}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-body">
              {point.explanation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
