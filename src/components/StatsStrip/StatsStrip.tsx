const stats = [
  {
    value: '$750B',
    label: 'AI search market by 2028',
    source: '— McKinsey',
  },
  {
    value: '25%',
    label: 'Projected drop in traditional search by 2026',
    source: '— Gartner',
  },
  {
    value: '16%',
    label: 'Of brands currently track AI visibility',
    source: '— McKinsey',
  },
];

export default function StatsStrip() {
  return (
    <div className="relative z-10 border-y border-white/[0.06] py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <div key={i} className="py-8 text-center first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0">
              <p className="text-4xl font-extrabold tracking-[-0.04em] text-[var(--text-primary)] font-display">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)] font-body leading-snug">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)] font-body">
                {stat.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
