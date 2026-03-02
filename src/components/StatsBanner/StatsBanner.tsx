'use client';

const stats = [
  { value: 'Brand Share %', label: 'Tracked Across 4 AI Platforms' },
  { value: 'Visibility Gap', label: 'Quantified for Every Client' },
  { value: 'Agency-Native', label: 'Built for Client Retainers' },
  { value: 'Ranked Gaps', label: 'Know Where Clients Are Losing' },
  { value: '5 min', label: 'Full AI Visibility Scan' },
  { value: '30-Day Delta', label: 'Track Client Progress Over Time' },
];

export default function StatsBanner() {
  return (
    <div className="border-y border-[var(--border-subtle)] py-4 md:py-5 bg-[var(--bg-base)]">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 px-4">
        {stats.map((s, i) => (
          <span key={i} className="flex flex-col items-center shrink-0">
            <span className="text-lg md:text-2xl font-bold tracking-[-0.02em] text-[var(--text-primary)] font-display">
              {s.value}
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.12em] text-[var(--text-tertiary)] mt-0.5 font-body">
              {s.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
