import Reveal from '@/components/shared/Reveal';

const captureCards = [
  {
    label: 'calls + missed calls',
    title: 'Route call intent before it gets buried.',
    body: 'Surface calls, missed calls, and receptionist context so the right person can follow up faster.',
  },
  {
    label: 'after-hours inquiries',
    title: 'Keep late intent from going cold.',
    body: 'Help after-hours requests reach an approved handoff workflow instead of waiting untouched.',
  },
  {
    label: 'website + campaign handoffs',
    title: 'Preserve the request and the source.',
    body: 'Capture booking intent from website inquiries where available and campaign handoffs with source context attached.',
  },
  {
    label: 'source context',
    title: 'Understand where consult opportunities are forming.',
    body: 'Help show which sources are creating consult opportunities across search, calls, campaigns, and AI demand.',
  },
];

export default function ConsultCaptureLayer() {
  return (
    <section className="relative z-10 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="glass-panel overflow-hidden p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="section-label mb-4">Consult Capture Layer</p>
              <h2 className="font-display text-3xl font-semibold leading-[1.08] text-[var(--text-primary)] md:text-5xl">
                Capture the consult before the lead goes cold.
              </h2>
              <p className="mt-6 text-base leading-[1.75] text-[var(--text-secondary)] md:text-lg">
                Growth and Premium plans include a Consult Capture Layer that helps route booking intent from calls, missed calls, after-hours inquiries, website inquiries where available, and campaign handoffs into approved handoff workflows.
              </p>
              <p className="mt-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg-2)] p-4 text-sm leading-[1.65] text-[var(--text-tertiary)]">
                Rhemic captures booking intent and routes requests to your team. Direct booking is planned for supported systems and enabled only when the workflow can be safely integrated.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {captureCards.map((card, index) => (
                <Reveal key={card.label} delay={(index % 3) as 0 | 1 | 2}>
                  <article className="h-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg-2)] p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)]">
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--pulse-deep)]">
                      {card.label}
                    </p>
                    <h3 className="mt-4 font-display text-lg font-semibold leading-tight text-[var(--text-primary)]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.65] text-[var(--text-secondary)]">
                      {card.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
