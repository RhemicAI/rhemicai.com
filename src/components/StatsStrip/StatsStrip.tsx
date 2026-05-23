const stats = [
  {
    value: '$504',
    label: 'Average visit ticket',
    source: 'AmSpa',
    sourceUrl: 'https://www.americanmedspa.org/news/2024-medical-spa-state-of-the-industry-executive-report-recap/',
  },
  {
    value: '73%',
    label: 'Repeat patient share',
    source: 'AmSpa',
    sourceUrl: 'https://www.americanmedspa.org/news/medical-spas-are-safe-repeat-patients-and-industry-size/',
  },
  {
    value: '245',
    label: 'Average monthly visits',
    source: 'AmSpa',
    sourceUrl: 'https://www.americanmedspa.org/news/2024-medical-spa-state-of-the-industry-executive-report-recap/',
  },
];

export default function StatsStrip() {
  return (
    <div className="relative z-10 border-y border-[var(--border-subtle)] py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 divide-y divide-[var(--border-subtle)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <div key={i} className="py-8 text-center first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0">
              <p className="font-mono text-4xl font-semibold tabular-nums text-[var(--pulse)]">
                {stat.value}
              </p>
              <p className="mt-2 font-body text-sm leading-snug text-[var(--text-secondary)]">
                {stat.label},{' '}
                <a
                  href={stat.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--text-primary)] underline-offset-4 transition-colors hover:text-[var(--pulse)] hover:underline"
                  aria-label={`${stat.label} source from ${stat.source}`}
                >
                  {stat.source}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
