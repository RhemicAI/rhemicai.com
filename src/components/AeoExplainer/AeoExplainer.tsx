const leaks = [
  'Your clinic does not show up where patients compare options in Google Maps.',
  'Your Google Business Profile is incomplete, stale, or weaker than nearby competitors.',
  'Reviews, responses, and trust signals are inconsistent across the patient journey.',
  'Treatment pages do not rank, explain the offer clearly, or convert search intent into consults.',
  'AI answer engines recommend competitors for local treatment questions.',
  'Calls are missed during clinic hours and after-hours leads wait too long.',
  'Consult requests are not tracked back to the channel that created them.',
];

export default function AeoExplainer() {
  return (
    <section className="relative z-10 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-3xl">
          <p className="section-label mb-4">
            The problem
          </p>
          <h2 className="mb-5 font-display text-3xl font-semibold leading-[1.1] text-[var(--text-primary)] md:text-4xl">
            Med spas leak consults across visibility, trust, conversion, and unanswered calls.
          </h2>
          <p className="font-body text-base leading-[1.7] text-[var(--text-secondary)] md:text-lg">
            A patient may start on Google, compare reviews, skim a treatment page, ask an AI tool for options, click an ad, or call after hours. Rhemic looks at the full path and identifies where consult opportunities are slipping away.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {leaks.map((leak) => (
            <div
              key={leak}
              className="glass-panel p-5"
            >
              <p className="font-body text-sm leading-[1.6] text-[var(--text-secondary)]">
                {leak}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
