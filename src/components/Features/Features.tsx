const groups = [
  {
    title: 'Visibility',
    items: ['Google Business Profile', 'Google Maps visibility', 'AI search visibility', 'Local SEO', 'Schema and citations'],
  },
  {
    title: 'Capture',
    items: ['AI receptionist coverage', 'Missed-call recovery', 'After-hours lead response', 'Booking request routing'],
  },
  {
    title: 'Closed loop',
    items: ['Treatment-page priorities', 'Review-request automation', 'Competitor visibility review', 'Source-tied reporting'],
  },
];

export default function Features() {
  return (
    <section id="what-we-optimize" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto mb-14 max-w-5xl text-center">
        <p className="section-label mb-5">
          What Rhemic does
        </p>
        <h2 className="mx-auto mb-5 max-w-4xl font-display text-4xl font-semibold leading-[1.1] text-[var(--text-primary)] sm:text-5xl">
          Visibility, capture, and closed-loop reporting in one med spa operating system.
        </h2>
        <p className="mx-auto max-w-3xl font-body text-base leading-[1.7] text-[var(--text-secondary)] md:text-lg">
          Rhemic connects the surfaces that decide whether a lead gets found, answered, captured, and traced back to the source that created it.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.title}
            className="glass-panel flex flex-col p-6 transition-[border-color] duration-500 hover:border-[var(--border-strong)]"
          >
            <h3 className="mb-5 font-display text-xl font-semibold text-[var(--text-primary)]">
              {group.title}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2 font-body text-sm leading-[1.5] text-[var(--text-tertiary)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--pulse)]" />
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
