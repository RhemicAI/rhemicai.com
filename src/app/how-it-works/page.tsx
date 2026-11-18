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
    'How Rhemic works: a 30-minute discovery call, then we claim and build out your ChatGPT business profile, Google Business Profile and website, and run them every month.',
  path: '/how-it-works',
  keywords: ['how Rhemic AI works', 'AI visibility process', 'answer engine optimization process'],
});

const steps = [
  {
    no: '01',
    tier: 'Step 1 · Discovery call',
    title: 'We learn your business',
    lede: 'One 30-minute call with the owner.',
    body: 'Before the call we look at what ChatGPT and Google say about your business today, and who they name instead of you. On the call we learn your services, your locations and the customers you want. Then we quote the work your business needs.',
    points: ['Your ChatGPT answers checked before the call', 'Your Google Business Profile and website reviewed', 'The competitors AI names in your place', 'One quote, built around your business'],
  },
  {
    no: '02',
    tier: 'Step 2 · Claim and build',
    title: 'We claim, verify and build out your profiles',
    lede: 'Everything ChatGPT and Google read about you, set up right.',
    body: 'We claim and verify your ChatGPT business profile with you on a short call, because the owner passes the identity check. Then we complete your Google Business Profile, fix the website and service pages AI engines read, and add the structured data that lets them quote you.',
    points: ['ChatGPT business profile claimed and verified', 'Google Business Profile completed and corrected', 'Website and service pages built for AI answers', 'Structured data and crawler access fixed'],
  },
  {
    no: '03',
    tier: 'Step 3 · Run it every month',
    title: 'We keep you the name AI gives',
    lede: 'AI answers change every week. We stay on them.',
    body: 'Every month we keep your profiles current, grow your reviews and citations, and publish answer pages for the questions your customers ask. You get a monthly report with your ChatGPT and Google numbers side by side.',
    points: ['Profiles kept current and complete', 'Reviews and citations grown every month', 'New answer pages for real customer questions', 'A monthly report with ChatGPT and Google numbers'],
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
                One call.{' '}
                <span className="italic text-spot-deep">Then we do the work.</span>
              </h1>
              <p className="mt-6 max-w-xl font-body text-[1.15rem] leading-relaxed text-ink-2 text-pretty">
                Rhemic works in three steps. We learn your business on a discovery call, claim and build
                out everything ChatGPT and Google read about you, then run it every month.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Steps */}
        <section className="px-5 pb-8 sm:px-8">
          <div className="mx-auto max-w-6xl space-y-px overflow-hidden rounded-[3px] border border-[var(--line)] bg-[var(--line)]">
            {steps.map((s) => (
              <Reveal key={s.no} className="bg-[var(--paper)] p-8 sm:p-10">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[0.9fr_1.1fr]">
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
            <p className="kicker mb-5">Start with a call</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.02] text-balance">
              See where your business doesn’t show up yet.
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-body text-[1.08rem] leading-relaxed text-ink-2">
              Book a 30-minute discovery call. We show you what ChatGPT and Google say about your business,
              then quote the work it needs.
            </p>
            <div className="mt-8 flex justify-center">
              <AuditButton className="btn-primary">Book a discovery call</AuditButton>
            </div>
            <p className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">
              <Link href="/services" className="link-rule">See all services</Link>
              <Link href="/testimonials" className="link-rule">See results</Link>
            </p>
          </Reveal>
        </section>
      </main>
      <PaperFooter />
    </>
  );
}
