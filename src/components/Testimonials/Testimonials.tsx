const testimonials = [
  {
    quote:
      "Rhemic showed us exactly which AI prompts our clients were invisible on. Within 30 days, two of our biggest accounts went from zero AI mentions to showing up in ChatGPT and Perplexity. The data is impossible to argue with in a client meeting.",
    name: 'Sarah K.',
    role: 'Head of SEO',
    company: 'Velocity Digital Agency',
    stars: 5,
  },
  {
    quote:
      "We used to struggle to explain AI visibility to clients. Now we show them a Brand Share % score against competitors and watch their eyes go wide. Rhemic gave us a completely new retainer service we didn't have six months ago.",
    name: 'Marcus T.',
    role: 'Founder',
    company: 'Apex Growth Partners',
    stars: 5,
  },
  {
    quote:
      "The competitor gap reports are what sold it for us. Seeing exactly which topics competitors rank for in AI answers — and getting briefs to close those gaps — is unlike anything else we've used. Our clients are seeing 30-day deltas.",
    name: 'Jamie L.',
    role: 'Director of Strategy',
    company: 'Clearline Marketing',
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-amber-400">
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400/80 mb-5 font-body">
            What Agencies Say
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] font-display">
            Agencies trust Rhemic to prove AI ROI
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-2xl p-8 hover:border-[var(--border-strong)] transition-colors duration-200"
            >
              <StarRating count={t.stars} />

              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-[var(--text-secondary)] font-body">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[var(--text-tertiary)]">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)] font-body">{t.name}</p>
                  <p className="text-xs text-[var(--text-muted)] font-body">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
