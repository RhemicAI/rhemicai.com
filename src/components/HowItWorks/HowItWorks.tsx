const system = [
  {
    number: '01',
    title: 'Scan',
    body: 'Map Google visibility, AI search presence, treatment pages, reviews, competitor visibility, and missed-call patterns.',
  },
  {
    number: '02',
    title: 'Fix',
    body: 'Prioritize Google Business Profile, local SEO, treatment-page, citation, schema, and review-request fixes by consult impact.',
  },
  {
    number: '03',
    title: 'Capture',
    body: 'Add AI receptionist coverage for common non-clinical questions, lead capture, missed-call recovery, and booking request routing.',
  },
  {
    number: '04',
    title: 'Report',
    body: 'Show what changed, which channels are creating demand, and where the next visibility or response leak needs work.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="section-label mb-4">
            First 30 days
          </p>
          <h2 className="font-display text-3xl font-semibold leading-[1.1] text-[var(--text-primary)] md:text-4xl">
            Scan. Fix. Capture. Report.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {system.map((step) => (
            <div key={step.number} className="glass-panel p-6">
              <p className="mb-6 font-mono text-4xl font-semibold tabular-nums text-[var(--pulse-soft)]">
                {step.number}
              </p>
              <h3 className="mb-3 font-display text-xl font-bold text-[var(--text-primary)]">
                {step.title}
              </h3>
              <p className="font-body text-sm leading-[1.7] text-[var(--text-secondary)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
