import Reveal from '@/components/shared/Reveal';

const outcomes = [
  {
    label: '+ consult opportunities',
    title: 'More consult opportunities',
    body: 'Surface the search, AI answer, and call-response gaps that can keep patient demand from turning into a booking request.',
  },
  {
    label: 'missed calls recovered',
    title: 'More calls recovered',
    body: 'Identify where calls and after-hours leads slip into voicemail, then route missed-call opportunities back to your team.',
  },
  {
    label: 'SEO + AEO visibility',
    title: 'More visibility from SEO + AEO',
    body: 'Track SEO scan issues, treatment-page gaps, and AI answer opportunities across high-intent med spa searches.',
  },
  {
    label: 'source-aware reporting',
    title: 'More source-aware reporting',
    body: 'Connect visibility, calls, lead capture, and consult opportunities so your team can see which demand sources need attention.',
  },
];

export default function OutcomeStrip() {
  return (
    <section className="relative z-10 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <p className="section-label mb-4">Example growth model</p>
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold leading-[1.08] text-[var(--text-primary)] md:text-4xl">
            What Rhemic helps improve
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.7] text-[var(--text-secondary)] md:text-base">
            Common leak points Rhemic helps surface. Modeled opportunity, not a guarantee.
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-4">
          {outcomes.map((outcome, index) => (
            <Reveal key={outcome.title} delay={(index % 4) as 0 | 1 | 2 | 3}>
              <article className="glass-panel h-full p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)]">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--pulse-deep)]">
                  {outcome.label}
                </p>
                <h3 className="mt-5 font-display text-xl font-semibold leading-tight text-[var(--text-primary)]">
                  {outcome.title}
                </h3>
                <p className="mt-4 text-sm leading-[1.65] text-[var(--text-secondary)]">
                  {outcome.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
