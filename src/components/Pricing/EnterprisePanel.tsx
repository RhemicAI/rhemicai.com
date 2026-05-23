const enterpriseFeatures = [
  {
    title: 'White-Label Reporting',
    desc: 'Present AI visibility reports and audits under your own brand. Your name, your logo, your deliverables.',
  },
  {
    title: 'Multi-Brand Management',
    desc: 'Manage AI visibility across multiple brands, divisions, or accounts from a single environment.',
  },
  {
    title: 'Dedicated Account Team',
    desc: 'A named account manager and strategist who understand your business and meet with you weekly.',
  },
  {
    title: 'Custom Audit Frequency',
    desc: 'Daily, weekly, or custom scan schedules tailored to your operational rhythm.',
  },
  {
    title: 'Custom Integrations',
    desc: 'API access, custom data exports, and workflow integrations built around how your team operates.',
  },
  {
    title: 'Volume-Based Pricing',
    desc: 'Pricing structured around your scale. No per-seat surprises, no hidden overages.',
  },
];

export default function EnterprisePanel() {
  return (
    <div className="rounded-2xl border border-violet-500/40 bg-violet-500/5 shadow-[0_0_40px_rgba(139,92,246,0.1)] p-5 sm:p-6">
      <div className="text-center mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
          Custom AI Visibility Solutions at Scale
        </h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          For large agencies, multi-brand organizations, and enterprise teams that need
          tailored AEO infrastructure, white-label capabilities, and dedicated strategic support.
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
          data-cal-link="rhemic-ai/rhemic-ai-enterprise-consultation"
          className="inline-block px-8 py-3 text-sm font-semibold text-[var(--bg)] bg-[var(--ink)] hover:bg-[var(--pulse)] rounded-full shadow-lg shadow-[var(--pulse-soft)] transition-all duration-200 hover:scale-105"
        >
          Book a Consultation
        </a>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          Every Enterprise engagement starts with a 30-minute consultation to scope your needs. No obligations.
        </p>
      </div>
    </div>
  );
}
