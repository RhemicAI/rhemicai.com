import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';

const outcomes = [
  {
    label: 'search / AI visibility leak',
    title: 'Patients fail to find you.',
    body: 'Rhemic helps surface visibility gaps across Google, treatment searches, and AI answers before patient demand becomes a missed opportunity.',
  },
  {
    label: 'call leak',
    title: 'Calls slip into voicemail.',
    body: 'Rhemic helps identify missed-call opportunities and after-hours demand so staff can see which requests need attention.',
  },
  {
    label: 'handoff leak',
    title: 'Intent gets buried.',
    body: 'Rhemic helps route booking intent from calls, inquiries, and campaign handoffs into approved handoff workflows.',
  },
  {
    label: 'source clarity leak',
    title: 'Sources stay unclear.',
    body: 'Rhemic helps show which sources are creating consult opportunities so teams can prioritize the fixes that matter.',
  },
];

export default function OutcomeStrip() {
  return (
    <section id="consult-leaks" className="relative z-10 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <p className="section-label mb-4">Lost opportunity map</p>
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold leading-[1.08] text-[var(--text-primary)] md:text-4xl">
            Where med spas lose consult opportunities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.7] text-[var(--text-secondary)] md:text-base">
            Rhemic helps surface the leaks that can keep patient demand from reaching the right team.
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

        <Reveal className="mt-12 text-center">
          <p className="mx-auto mb-5 max-w-xl font-display text-lg leading-snug text-[var(--text-primary)] md:text-xl">
            You can&apos;t plug a leak you can&apos;t see.
          </p>
          <Link
            href="/free-consult-leak-calculator"
            className="inline-block rounded-full bg-[var(--ink)] px-8 py-4 text-base font-semibold text-[var(--bg)] shadow-lg shadow-[var(--pulse-soft)] transition-all duration-200 hover:scale-105 hover:bg-[var(--pulse)] md:text-lg font-body"
          >
            Get a free snapshot of where you&apos;re leaking money
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
