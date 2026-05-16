const steps = [
  {
    number: '01',
    title: 'Audit',
    body: 'We submit buyer-intent questions across the engines covered by your plan: ChatGPT for Starter, ChatGPT + Perplexity for Growth, and ChatGPT, Claude, Gemini, and Perplexity for Scale. You receive a Brand Share % score and an SEO baseline in one report.',
  },
  {
    number: '02',
    title: 'Analyze',
    body: 'A ranked competitor map shows who is capturing both your search rankings and your AI demand, and what they have that you don\'t: citation sources, schema structure, content depth, and Google Business Profile completeness.',
  },
  {
    number: '03',
    title: 'Optimize',
    body: 'Specific recommendations ordered by impact: schema markup, on-page SEO fixes, content briefs, local SEO assets, and citation opportunities. Growth and Scale clients get agentic deployment for eligible schema and on-page work. Managed outreach and hands-on GBP work move to Enterprise.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 py-14 md:py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-4 font-body">
            The Process
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)] font-display">
            From invisible to recommended in three steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <div key={i} className="border-t border-white/[0.08] pt-8 md:pr-10 md:last:pr-0">
              <p className="text-5xl font-extrabold tracking-[-0.04em] text-white/10 font-display mb-6">
                {step.number}
              </p>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-display mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-[1.7] font-body">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
