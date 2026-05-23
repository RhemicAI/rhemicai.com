export default function DashboardPreview() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-8 shadow-2xl md:p-12">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200/70">
          Founder-led onboarding
        </p>
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <h2 className="mb-5 font-display text-3xl font-bold leading-[1.1] text-[var(--text-primary)] md:text-4xl">
              Early Rhemic customers work directly with Karim and Raahil.
            </h2>
            <p className="font-body text-base leading-[1.8] text-[var(--text-secondary)]">
              Discovery, onboarding, and growth strategy stay close to the founders. The goal is not to hand med spas another dashboard. It is to identify where consults are leaking and build the infrastructure to capture more of the opportunities already moving through search, reviews, ads, calls, and AI answer systems.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="mb-4 font-body text-sm font-semibold text-[var(--text-primary)]">
              What the audit looks for
            </p>
            <ul className="space-y-3 font-body text-sm leading-[1.55] text-[var(--text-secondary)]">
              <li>Where patients find you and nearby competitors.</li>
              <li>Where trust signals are weak or inconsistent.</li>
              <li>Where calls, after-hours leads, and booking handoffs break down.</li>
              <li>Which fixes belong in the first phase of implementation.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
