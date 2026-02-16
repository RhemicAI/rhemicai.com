/* ── data ── */

const sites = [
  { domain: 'example.com', score: 87, delta: +5, status: 'green' as const, lastAudit: '2 min ago' },
  { domain: 'myshop.io', score: 72, delta: -3, status: 'yellow' as const, lastAudit: '1 hr ago' },
  { domain: 'techcorp.dev', score: 94, delta: +8, status: 'green' as const, lastAudit: '5 min ago' },
];

const navItems = [
  { icon: '\u25A6', label: 'Sites' },
  { icon: '\u25B2', label: 'Audits' },
  { icon: '\u2606', label: 'Competitors' },
  { icon: '\u27A4', label: 'Changes' },
  { icon: '\u2699', label: 'Reports' },
];

const sparkData = [32, 45, 38, 52, 48, 65, 58, 72, 68, 78, 74, 87];

/* ── score ring ── */

function ScoreRing({ score, size = 44 }: { score: number; size?: number }) {
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444';
  const pct = `${score}%`;

  return (
    <div
      className="relative rounded-full flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} 0% ${score}%, var(--border-subtle) ${score}% 100%)`,
      }}
    >
      <div
        className="absolute rounded-full bg-[var(--bg-elevated)] flex items-center justify-center"
        style={{ width: size - 8, height: size - 8 }}
      >
        <span className="text-[10px] font-bold text-[var(--text-primary)]">{pct}</span>
      </div>
    </div>
  );
}

/* ── sparkline ── */

function Sparkline() {
  const max = Math.max(...sparkData);
  const barH = 48;

  return (
    <div className="flex items-end gap-[3px] h-12">
      {sparkData.map((v, i) => (
        <div
          key={i}
          className="w-[6px] rounded-t-sm"
          style={{
            height: `${(v / max) * barH}px`,
            background:
              i === sparkData.length - 1
                ? '#8B5CF6'
                : 'rgba(139, 92, 246, 0.3)',
          }}
        />
      ))}
    </div>
  );
}

/* ── status dot ── */

function StatusDot({ status }: { status: 'green' | 'yellow' | 'red' }) {
  const colors = { green: 'bg-green-500', yellow: 'bg-yellow-500', red: 'bg-red-500' };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status]}`} />;
}

/* ── main component ── */

export default function DashboardPreview() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* heading */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#8B5CF6] mb-4 font-body">
          Product
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] text-[var(--text-primary)] leading-tight font-display">
          Our engine under the hood
        </h2>
        <p className="mt-4 text-base md:text-lg text-[var(--text-primary)] font-normal max-w-xl mx-auto opacity-80 font-body">
          We run enterprise-grade audits, track your competitors, and deliver
          actionable optimizations — you just book a call and we handle the&nbsp;rest.
        </p>
      </div>

      {/* mockup container */}
      <div
        className="relative mx-auto max-w-4xl"
      >
        {/* purple glow */}
        <div
          className="absolute -inset-16 rounded-3xl pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15), transparent 70%)' }}
        />

        {/* window */}
        <div
          className="relative bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-[var(--text-muted)] font-medium tracking-wide">
              Rhemic AI — Internal Audit Engine
            </span>
          </div>

          {/* body */}
          <div className="flex min-h-[360px] md:min-h-[420px]">
            {/* sidebar */}
            <aside className="hidden sm:flex w-16 md:w-[72px] shrink-0 border-r border-[var(--border-subtle)] py-4 flex-col gap-1">
              {navItems.map((n, i) => (
                <button
                  key={n.label}
                  className={`flex flex-col items-center gap-0.5 py-2 text-[10px] transition-colors ${
                    i === 0
                      ? 'text-[#8B5CF6]'
                      : 'text-[var(--text-faint)] hover:text-[var(--text-tertiary)]'
                  }`}
                >
                  <span className="text-base leading-none">{n.icon}</span>
                  <span className="hidden md:inline">{n.label}</span>
                </button>
              ))}
            </aside>

            {/* main panel */}
            <div className="flex-1 p-4 md:p-6 space-y-6 overflow-hidden">
              {/* header row */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">My Websites</h3>
                <span className="text-[10px] font-medium px-3 py-1 rounded-md bg-[#8B5CF6]/20 text-[#8B5CF6]">
                  Internal Tool
                </span>
              </div>

              {/* sites table */}
              <div className="rounded-lg border border-[var(--border-subtle)] overflow-hidden">
                {/* table header */}
                <div className="grid grid-cols-[1fr_50px_44px] sm:grid-cols-[1fr_60px_56px_80px] md:grid-cols-[1fr_60px_56px_100px] gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 text-[10px] text-[var(--text-faint)] uppercase tracking-wider border-b border-[var(--border-subtle)] bg-[var(--bg-glass)]">
                  <span>Domain</span>
                  <span className="text-center">Score</span>
                  <span className="text-center">Trend</span>
                  <span className="text-right hidden sm:block">Last Audit</span>
                </div>

                {/* rows */}
                {sites.map((s) => (
                  <div
                    key={s.domain}
                    className="grid grid-cols-[1fr_50px_44px] sm:grid-cols-[1fr_60px_56px_80px] md:grid-cols-[1fr_60px_56px_100px] gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-3 items-center border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-glass)] transition-colors"
                  >
                    {/* domain + status */}
                    <span className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-medium truncate">
                      <StatusDot status={s.status} />
                      {s.domain}
                    </span>

                    {/* score ring */}
                    <div className="flex justify-center">
                      <ScoreRing score={s.score} size={36} />
                    </div>

                    {/* delta */}
                    <span
                      className={`text-center text-xs font-semibold ${
                        s.delta > 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {s.delta > 0 ? '\u2191' : '\u2193'} {Math.abs(s.delta)}
                    </span>

                    {/* last audit */}
                    <span className="text-right text-[10px] text-[var(--text-faint)] hidden sm:block">
                      {s.lastAudit}
                    </span>
                  </div>
                ))}
              </div>

              {/* chart area */}
              <div className="rounded-lg border border-[var(--border-subtle)] p-4 bg-[var(--bg-glass)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">
                    AEO Score Trend
                  </span>
                  <span className="text-[10px] text-[var(--text-faint)]">Last 12 weeks</span>
                </div>
                <Sparkline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
