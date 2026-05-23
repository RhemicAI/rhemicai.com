const stats = [
  {
    value: '$504',
    label: 'Average med spa visit value',
  },
  {
    value: '73%',
    label: 'Repeat patient share',
  },
  {
    value: '245',
    label: 'Average monthly visits',
  },
  {
    value: '10,488+',
    label: 'U.S. med spa locations',
  },
];

export default function StatsStrip() {
  return (
    <div className="relative z-10 border-y border-white/[0.06] py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="py-8 text-center first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0">
              <p className="text-4xl font-extrabold text-[var(--text-primary)] font-display">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)] font-body leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
