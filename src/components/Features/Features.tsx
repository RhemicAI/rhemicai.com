const groups = [
  {
    title: 'Local trust',
    items: ['Google Business Profile', 'Google Maps visibility', 'Reviews and response templates', 'Schema and citations'],
  },
  {
    title: 'Treatment demand',
    items: ['Local SEO', 'Treatment and service pages', 'AEO/GEO visibility', 'AI answer-engine recommendations'],
  },
  {
    title: 'Competitive signal',
    items: ['Competitor visibility', 'Ads intelligence', 'Offer clarity', 'Market positioning gaps'],
  },
  {
    title: 'Booking response',
    items: ['Missed-call recovery', 'After-hours lead response', 'Non-clinical AI receptionist workflows', 'Handoff into your booking flow'],
  },
];

export default function Features() {
  return (
    <section id="what-we-optimize" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto mb-14 max-w-5xl text-center">
        <p className="mb-5 font-body text-sm font-medium uppercase tracking-[0.15em] text-[var(--text-secondary)]">
          What Rhemic optimizes
        </p>
        <h2 className="mx-auto mb-5 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-[var(--text-primary)] sm:text-5xl">
          A complete patient acquisition stack, not a random list of services.
        </h2>
        <p className="mx-auto max-w-2xl font-body text-base leading-[1.7] text-[var(--text-primary)] opacity-80 md:text-lg">
          Rhemic connects the visibility, trust, and response layers that influence whether a med-spa lead turns into a booked consult.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div
            key={group.title}
            className="flex flex-col rounded-2xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-6 transition-[background-color,border-color] duration-500 hover:border-[var(--border-strong)] hover:bg-[var(--bg-glass-hover)]"
          >
            <h3 className="mb-5 font-display text-xl font-semibold text-[var(--text-primary)]">
              {group.title}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2 font-body text-sm leading-[1.5] text-[var(--text-tertiary)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
