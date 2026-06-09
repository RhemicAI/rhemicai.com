import type { Metadata } from 'next';
import Link from 'next/link';
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
    tier: 'Tier 1 · Visibility',
    title: 'We get you found everywhere customers look',
    lede: 'The full stack: SEO, GEO, and AEO. Not just AI.',
    body: 'Visibility is not only about AI. We do the classic SEO that ranks you on Google and wins the local map, plus GEO and AEO so you also show up and get recommended inside AI answers like ChatGPT, Perplexity, and Google AI Overviews. Wherever your customers look, you are there.',
    points: ['SEO: rank on Google and win the local map', 'AEO: get cited and recommended in AI answers', 'GEO: show up in Google AI Overviews and generative results', 'Structured data and pages built for real customer searches'],
  },
  {
    no: '02',
    tier: 'Tier 2 · Capture',
    title: 'Then we catch every bit of demand it creates',
    lede: 'A response process built to your business, with its own lead tracker.',
    body: 'Visibility creates inbound. Capture is the layer that makes sure none of it slips. We build a response process customized to how your business actually runs, and give you your own tracking artifact where every call, missed call, after-hours inquiry, and form lands, so you can see and follow up on every lead in one place.',
    points: ['A customized inbound response process for your business', 'Every call, missed call, after-hours, and form captured', 'Your own lead-tracking board, with the source of each lead', 'Nothing slips between search and your team'],
  },
  {
    no: '03',
    tier: 'Tier 3 · Full done-for-you system',
    title: 'Or we run the whole growth engine for you',
    lede: 'A complete growth system, customized to your whole business.',
    body: 'The full done-for-you system. Visibility, capture, and reporting tuned to your entire business and every location, with the data to see which markets, channels, and dollars actually bring customers. We build it, run it, and report on it. You run the business.',
    points: ['Everything in Visibility and Capture', 'Built and run across all your locations', 'Source-aware reporting on what brings customers', 'A growth system customized end to end to your business'],
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
                Get found.{' '}
                <span className="italic text-spot-deep">Capture it.</span>{' '}
                Grow the whole business.
              </h1>
              <p className="mt-6 max-w-xl font-body text-[1.15rem] leading-relaxed text-ink-2 text-pretty">
                Rhemic works in three layers. Start by getting found and recommended, add a capture system
                built to your business, or have us run the entire growth engine for you. Each layer builds
                on the one before it.
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
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-spot-deep">{s.tier}</span>
                    <span className="mt-2 block font-display text-[3.2rem] font-bold leading-none text-spot">{s.no}</span>
                    <h2 className="mt-3 font-display text-[1.55rem] font-semibold leading-tight">{s.title}</h2>
                    <p className="mt-2 font-body text-[1.02rem] leading-snug text-ink">{s.lede}</p>
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
            <p className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">
              <Link href="/services" className="link-rule">See all services</Link>
              <Link href="/pricing" className="link-rule">See pricing</Link>
              <Link href="/testimonials" className="link-rule">See results</Link>
            </p>
          </Reveal>
        </section>
      </main>
      <PaperFooter />
    </>
  );
}
