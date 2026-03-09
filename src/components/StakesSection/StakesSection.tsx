const stakes = [
  {
    stat: '1',
    label: 'recommendation per AI answer. Not 10. Not 5. One.',
  },
  {
    stat: '$0',
    label: 'what it costs the AI to switch from a competitor to your client. It just needs a reason.',
  },
  {
    stat: '30 days',
    label: 'average time to measurable AI visibility improvement after implementing Rhemic fixes.',
  },
];

export default function StakesSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#8B5CF6] mb-4 font-body">
          The Stakes
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] text-[var(--text-primary)] leading-tight font-display">
          Every Day You Wait, a Competitor Takes Your Spot
        </h2>
        <p className="mt-4 text-base md:text-lg text-[var(--text-primary)] font-normal max-w-xl mx-auto opacity-80 font-body">
          AI answers don&apos;t have 10 blue links. They have one recommendation. If that&apos;s not your client, it&apos;s someone else. And once they&apos;re in, they&apos;re hard to displace.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {stakes.map((s) => (
          <div
            key={s.stat}
            className="relative p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-glass)] hover:border-[var(--border-strong)] transition-colors duration-300 text-center"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-3 font-display">
              {s.stat}
            </div>
            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-body">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center space-y-6">
        <a
          href="#ai-visibility-scan"
          className="inline-block px-8 py-4 text-lg font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-full shadow-lg shadow-violet-500/50 transition-all duration-200 hover:scale-105 font-body"
        >
          See Where Your Clients Stand
        </a>
      </div>
    </section>
  );
}
