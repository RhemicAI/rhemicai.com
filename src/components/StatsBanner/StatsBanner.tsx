'use client';

const stats = [
  { value: 'Get Recommended', label: 'By AI Answer Engines' },
  { value: 'Be the Answer', label: 'When AI Gets Asked' },
  { value: 'AEO-Native', label: 'Beyond Traditional SEO' },
  { value: 'Ranked Actions', label: 'Know What to Fix First' },
  { value: '5 min', label: 'Full-Site Audit' },
  { value: 'Fraction of the Cost', label: 'Enterprise-Grade Insights' },
];

export default function StatsBanner() {
  const track = stats.map((s, i) => (
    <span key={i} className="inline-flex items-center gap-16 shrink-0">
      <span className="flex flex-col items-center">
        <span className="text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[var(--text-primary)] font-display">
          {s.value}
        </span>
        <span className="text-xs md:text-sm uppercase tracking-[0.12em] text-[var(--text-tertiary)] mt-1 font-body">
          {s.label}
        </span>
      </span>

      <span className="text-[var(--text-faint)] text-lg select-none" aria-hidden="true">
        &times;
      </span>
    </span>
  ));

  return (
    <>
      <style>{`
        @keyframes stats-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div className="border-y border-[var(--border-subtle)] py-6 md:py-8 overflow-hidden bg-[var(--bg-base)]">
        <div
          className="flex whitespace-nowrap gap-16"
          style={{
            animation: 'stats-scroll 30s linear infinite',
            width: 'max-content',
          }}
        >
          {/* First pass */}
          {track}
          {/* Second pass for seamless loop */}
          {track}
        </div>
      </div>
    </>
  );
}
