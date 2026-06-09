import type { Metadata } from 'next';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import Reveal from '@/components/redesign/Reveal';
import AuditButton from '@/components/redesign/AuditButton';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How it works',
  description:
    'How Rhemic works: we find where your business is invisible and where demand leaks, fix the highest-impact gaps in priority order, and keep it running every day. Any industry.',
  path: '/how-it-works',
  keywords: ['how Rhemic AI works', 'AI visibility process', 'answer engine optimization process'],
});

const steps = [
  {
    no: '01',
    title: 'Diagnose',
    lede: 'We find where you are invisible and where demand leaks out.',
    body: 'We crawl your site the way an AI engine does, then map where you show up and where you do not, across search, AI answers, your pages, calls, and handoffs. You see the gaps, ranked by what they cost you.',
    points: ['AI answer-engine and search visibility scan', 'Google Business and local presence check', 'Page, schema, and content readiness', 'Where inquiries leak: calls, after-hours, forms'],
  },
  {
    no: '02',
    title: 'Fix and position',
    lede: 'We close the highest-impact gaps first.',
    body: 'Profiles, pages, structured data, and answer-engine positioning, done in priority order so the changes that move the needle happen first. We deploy through your site, not a dashboard you have to babysit.',
    points: ['Structured data and entity setup so engines can read you', 'Pages built for the queries your customers actually use', 'Local and profile fixes that win the map', 'Positioning so AI names you, not a competitor'],
  },
  {
    no: '03',
    title: 'Run it daily',
    lede: 'Not a one-time audit. A system that keeps working.',
    body: 'Visibility moves, competitors react, and new inquiries come in every day. Rhemic keeps watching for new leaks, captures the demand the visibility creates, and tells you in plain English what changed and what is working.',
    points: ['Ongoing visibility monitoring', 'Capture for calls, missed calls, after-hours, and forms', 'Source clarity on where customers come from', 'A plain-English report, not a wall of charts'],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PaperNav />
      <main className="relative">
        {/* Header */}
        <section className="px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">How it works</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">Any industry · U.S.</span>
            </div>
            <Reveal className="max-w-3xl">
              <h1 className="font-display text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.0] text-balance">
                Find the leaks.{' '}
                <span className="italic text-spot-deep">Fix them.</span>{' '}
                Keep them closed.
              </h1>
              <p className="mt-6 max-w-xl font-body text-[1.15rem] leading-relaxed text-ink-2 text-pretty">
                No dashboards to babysit and no jargon. We run the work, deploy it through your own site,
                and report what changed. Here is exactly what that looks like.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Steps */}
        <section className="px-5 pb-8 sm:px-8">
          <div className="mx-auto max-w-6xl space-y-px overflow-hidden rounded-[3px] border border-[var(--line)] bg-[var(--line)]">
            {steps.map((s) => (
              <Reveal key={s.no} className="bg-[var(--paper)] p-8 sm:p-10">
                <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <span className="font-display text-[3.4rem] font-bold leading-none text-spot">{s.no}</span>
                    <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-tight">{s.title}</h2>
                    <p className="mt-2 font-body text-[1.05rem] leading-snug text-ink">{s.lede}</p>
                  </div>
                  <div>
                    <p className="font-body text-[1.05rem] leading-relaxed text-ink-2">{s.body}</p>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-2.5">
                          <span className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-spot" />
                          <span className="font-body text-[0.96rem] leading-snug text-ink-2">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* The shift, condensed */}
        <section className="ink-block mt-8 px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="kicker mb-6" style={{ color: 'var(--spot)' }}>Why it matters</p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-normal leading-[1.06] text-balance">
                Search did not get smaller. It got{' '}
                <span className="italic" style={{ color: 'var(--spot)' }}>answered.</span>{' '}
                If you are not in the answer, you are not in the running.
              </h2>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-24 sm:px-8 sm:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="kicker mb-5">Start with a free scan</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.02] text-balance">
              See where your business doesn’t show up yet.
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-body text-[1.08rem] leading-relaxed text-ink-2">
              Run the free visibility scan, then get a free 20-minute audit with the exact fixes and the
              competitors taking the customers you are missing.
            </p>
            <div className="mt-8 flex justify-center">
              <AuditButton className="btn-primary">Run my free audit</AuditButton>
            </div>
          </Reveal>
        </section>
      </main>
      <PaperFooter />
    </>
  );
}
