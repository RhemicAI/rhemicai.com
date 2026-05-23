const system = [
  {
    number: '01',
    title: 'Get Found',
    body: 'Improve the signals that help med spas appear across Google Maps, Google Business Profile, treatment pages, citations, schema, local SEO, and AI answer engines.',
  },
  {
    number: '02',
    title: 'Get Chosen',
    body: 'Strengthen reviews, offer clarity, before-and-after trust, competitor positioning, and ads intelligence so patients have a clear reason to choose your clinic.',
  },
  {
    number: '03',
    title: 'Get Booked',
    body: 'Recover missed-call opportunities, answer approved non-clinical questions, capture lead details, and route consult requests into your existing booking flow.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
            The system
          </p>
          <h2 className="font-display text-3xl font-extrabold leading-[1.1] text-[var(--text-primary)] md:text-4xl">
            Found, chosen, booked.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {system.map((step) => (
            <div key={step.number} className="border-t border-white/[0.08] pt-8 md:pr-10 md:last:pr-0">
              <p className="mb-6 font-display text-5xl font-extrabold text-white/10">
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
