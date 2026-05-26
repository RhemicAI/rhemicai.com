import CalBookingLink from '@/components/CalEmbed/CalBookingLink';

const stakes = [
  {
    stat: '3-5',
    label: 'names per AI answer. That\'s the entire shortlist. If you\'re not on it, the customer never sees you.',
  },
  {
    stat: '70%',
    label: 'of buyers now ask AI before choosing a business. That number is climbing every month.',
  },
  {
    stat: '30 days',
    label: 'to measurable results. Implement Rhemic\'s recommendations and watch your AI visibility improve within a month.',
  },
];

export default function StakesSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-white/50 mb-4 font-body">
          The Stakes
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] text-[var(--text-primary)] leading-tight font-display">
          AI Picks a Short List. Are You On It?
        </h2>
        <p className="mt-4 text-base md:text-lg text-[var(--text-primary)] font-normal max-w-2xl mx-auto opacity-80 font-body">
          When someone asks AI for a business, it doesn&apos;t give them a page of results. It gives them 3 to 5 names. If yours isn&apos;t one of them, you never existed.
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
        <CalBookingLink
          calLink="rhemic-ai/medspa-discovery-call"
          className="inline-block px-8 py-4 text-lg font-semibold text-[var(--bg)] bg-[var(--ink)] hover:bg-[var(--pulse)] rounded-full shadow-lg shadow-[var(--pulse-soft)] transition-all duration-200 hover:scale-105 font-body"
        >
          Book Your Strategy Call
        </CalBookingLink>
      </div>
    </section>
  );
}
