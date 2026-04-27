const rows = [
  { label: 'Output', seo: 'Link in results', aeo: 'Cited recommendation', highlight: false },
  { label: 'Key factors', seo: 'Backlinks, keywords, technical health', aeo: 'Citations, schema, authority, content clarity', highlight: false },
  { label: 'Measurement', seo: 'Rankings, traffic', aeo: 'Brand Share %, citation rate', highlight: false },
  { label: 'Rhemic covers this', seo: 'Yes', aeo: 'Yes', highlight: true },
];

export default function AeoExplainer() {
  return (
    <section className="relative z-10 py-20 md:py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5 font-body">
            The Discipline
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-8 font-display max-w-3xl">
            AI search is the new frontier. Your SEO foundation still matters. Rhemic covers both.
          </h2>
          <div className="max-w-2xl space-y-4">
            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-[1.7] font-body">
              Answer Engine Optimization (AEO) — also called Generative Engine Optimization (GEO) — is the practice of ensuring your business is cited when AI assistants answer buyer questions. It is additive to traditional SEO, not a replacement for it. Many of the signals that help Google understand your site — schema markup, structured data, content authority — are the same ones that help AI assistants cite you accurately.
            </p>
            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-[1.7] font-body">
              Where AI search differs is in what you optimize specifically for conversational answers: citation authority, topical consistency, and how clearly your content answers buyer questions. Rhemic audits both dimensions — your Google SEO health and your AI citation signals — and gives you a single prioritized fix list that improves both.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/10">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] font-body w-1/3"></th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] font-body w-1/3">Traditional Search (SEO)</th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] font-body w-1/3">AI Answer Engines (GEO)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={`border-b border-white/[0.05] last:border-0 ${i % 2 === 1 && !row.highlight ? 'bg-white/[0.015]' : ''} ${row.highlight ? 'bg-white/[0.04]' : ''}`}>
                  <td className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] font-body">{row.label}</td>
                  <td className={`px-5 py-4 font-body ${row.highlight ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-tertiary)]'}`}>{row.seo}</td>
                  <td className={`px-5 py-4 font-body ${row.highlight ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-primary)]'}`}>{row.aeo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
