const stats = [
  {
    value: '$504',
    label: 'Average visit ticket, AmSpa',
  },
  {
    value: '73%',
    label: 'Repeat patient share, AmSpa',
  },
  {
    value: '245',
    label: 'Average monthly visits, AmSpa',
  },
  {
    value: '10,488+',
    label: 'U.S. med spa locations, AmSpa',
  },
];

export default function StatsStrip() {
  return (
    <div className="relative z-10 border-y border-[var(--border-subtle)] py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 divide-y divide-[var(--border-subtle)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="py-8 text-center first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0">
              <p className="font-mono text-4xl font-semibold tabular-nums text-[var(--pulse)]">
                {stat.value}
              </p>
              <p className="mt-2 font-body text-sm leading-snug text-[var(--text-secondary)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
