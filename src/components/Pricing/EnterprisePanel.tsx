const enterpriseFeatures = [
  {
    title: 'Group Reporting',
    desc: 'Roll up visibility, calls, lead response, and consult opportunities across a larger med spa footprint.',
  },
  {
    title: 'Multi-Location Management',
    desc: 'Track location-level visibility, capture, and reporting needs from one operating layer.',
  },
  {
    title: 'Dedicated Account Team',
    desc: 'A scoped support cadence for larger operators with more complex rollout needs.',
  },
  {
    title: 'Custom Audit Frequency',
    desc: 'Scan cadence tailored to your market, locations, and reporting needs.',
  },
  {
    title: 'Custom Integrations',
    desc: 'Software handoff planning, exports, and workflow paths scoped around your current tools.',
  },
  {
    title: 'Volume-Based Pricing',
    desc: 'Pricing structured around locations, routing complexity, and reporting scope.',
  },
];

export default function EnterprisePanel() {
  return (
    <div className="rounded-2xl border border-violet-500/40 bg-violet-500/5 shadow-[0_0_40px_rgba(139,92,246,0.1)] p-5 sm:p-6">
      <div className="text-center mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
          Custom AI Visibility Solutions for Larger Operators
        </h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          For six or more locations, chains, dermatology groups, PE-backed operators, and teams
          with complex routing or reporting needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {enterpriseFeatures.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-white/10 bg-[var(--glass-bg)] p-4 hover:border-violet-500/30 transition-colors duration-300"
          >
            <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1">{item.title}</h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href="#"
          data-cal-link="rhemic-ai/medspa-discovery-call"
          className="inline-block px-8 py-3 text-sm font-semibold text-[var(--bg)] bg-[var(--ink)] hover:bg-[var(--pulse)] rounded-full shadow-lg shadow-[var(--pulse-soft)] transition-all duration-200 hover:scale-105"
        >
          Get the audit
        </a>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          Every Custom engagement starts with a visibility and call leak audit to scope your needs.
        </p>
      </div>
    </div>
  );
}
