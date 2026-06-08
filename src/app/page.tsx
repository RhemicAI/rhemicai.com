import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import Reveal from '@/components/redesign/Reveal';
import AuditButton from '@/components/redesign/AuditButton';

const engines = [
  { src: '/images/engines/chatgpt.svg', label: 'ChatGPT' },
  { src: '/images/engines/claude.svg', label: 'Claude' },
  { src: '/images/engines/perplexity.svg', label: 'Perplexity' },
  { src: '/images/engines/gemini.svg', label: 'Gemini' },
  { src: '/images/engines/google.svg', label: 'Google AI' },
];

const ribbon = [
  'Home services', 'HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Auto',
  'Dental', 'Clinics', 'Med spas', 'Cleaning', 'Landscaping', 'Salons',
];

const outcomes = [
  {
    no: '01',
    title: 'Get found',
    body:
      'When someone searches for what you do, on Google or inside an AI answer, your business shows up where the decision actually gets made.',
  },
  {
    no: '02',
    title: 'Get recommended',
    body:
      'AI engines answer with a name. We do the structured, technical, and content work that makes that name yours instead of your competitor’s.',
  },
  {
    no: '03',
    title: 'Capture the demand',
    body:
      'Every call, form, and after-hours inquiry gets caught and routed to your team with clear source context. Nothing the visibility creates falls through.',
  },
];

const steps = [
  {
    no: '01',
    title: 'Diagnose',
    body:
      'We map exactly where you’re invisible and where booking intent leaks. Across search, AI answers, your pages, calls, and handoffs.',
  },
  {
    no: '02',
    title: 'Fix & position',
    body:
      'Profiles, pages, schema, and answer-engine positioning, done in priority order so the highest-impact gaps close first.',
  },
  {
    no: '03',
    title: 'Run it daily',
    body:
      'Not a one-time audit. The system keeps watching for new leaks and capturing demand every day, then tells you what’s working.',
  },
];

const cases = [
  {
    slug: 'kays-groom-room',
    name: 'Kay’s Groom Room',
    kind: 'In-home dog grooming · Seagoville, TX',
    url: 'kaysgroomroom.com',
    img: '/images/cases/groomroom-hero.jpg',
    line: 'A booking-first site where every section funnels to one action, with a mobile call-and-book bar so no inquiry slips.',
  },
  {
    slug: 'choose-one-auto',
    name: 'Choose One Auto Consulting',
    kind: 'Auto consulting · Michael King',
    url: 'Site + AI receptionist',
    img: '/images/cases/chooseone-owner.jpg',
    line: 'A conversion site wired to an AI receptionist that answers and captures every call, including the ones that used to go to voicemail.',
  },
];

const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Rhemic AI Visibility System',
  description:
    'Rhemic makes any business the answer customers find in search and AI engines, then captures that demand into booked work.',
  provider: { '@type': 'Organization', name: 'Rhemic AI', url: absoluteUrl('/') },
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: [
    'AI search visibility',
    'Answer engine optimization',
    'Local search visibility',
    'Lead capture',
    'Source-aware reporting',
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd id="homepage-schema" data={homepageSchema} />
      <PaperNav />

      <main className="relative">
        {/* ───────────────────────── HERO ───────────────────────── */}
        <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-6xl">
            {/* Broadsheet nameplate row */}
            <div className="rise rise-1 mb-10 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">
                Visibility + capture
              </span>
              <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-3 sm:block">
                Local service businesses
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">
                Est. Dallas
              </span>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="rise rise-1 kicker mb-6">Visibility + capture for local service businesses</p>
                <h1 className="rise rise-2 font-display text-[clamp(2.1rem,5vw,3.9rem)] font-medium leading-[1.0] text-balance">
                  Be the business{' '}
                  <span className="italic text-spot-deep">AI recommends</span>,
                  and the one that answers first.
                </h1>
                <p className="rise rise-3 mt-6 max-w-lg font-body text-[1.02rem] leading-relaxed text-ink-2 text-pretty">
                  Customers now ask Google, ChatGPT, and Perplexity who to hire. Then they call
                  whoever looks fastest and most trusted. Rhemic helps local businesses show up in
                  those answers, recover missed leads, and turn more demand into booked jobs.
                </p>
                <div className="rise rise-4 mt-9 flex flex-wrap items-center gap-4">
                  <AuditButton className="btn-primary">Run my revenue leak audit</AuditButton>
                  <Link href="/#how" className="btn-ghost">See how it works</Link>
                </div>
                <p className="rise rise-4 mt-5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-3">
                  AI visibility scan <span className="text-spot">·</span> Google Business audit <span className="text-spot">·</span> Missed-call capture review
                </p>
              </div>

              {/* Diagnostic "Lead Leak Report" — shows the leak, then the fix */}
              <div className="rise rise-3 relative">
                <div className="paper-card relative rotate-[-1.4deg] p-6 sm:p-7">
                  <div className="flex items-center justify-between border-b border-[var(--ink)] pb-3">
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-ink">Lead leak report</span>
                    <span className="bg-[var(--spot-soft)] px-2 py-0.5 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-spot-deep">3 leaks found</span>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    {[
                      ['AI answers', 'Not recommended in 3 of 4 searches'],
                      ['Google visibility', 'Competitor outranks you for “near me”'],
                      ['Call capture', 'After-hours calls go unanswered'],
                    ].map(([label, status]) => (
                      <div key={label} className="flex items-start gap-3 border-b border-[var(--line-soft)] pb-3">
                        <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center bg-[var(--spot)] font-mono text-[0.62rem] font-bold text-[var(--paper)]">!</span>
                        <div>
                          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-3">{label}</p>
                          <p className="font-body text-[0.94rem] leading-snug text-ink">{status}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 bg-[var(--ink)] px-4 py-3">
                    <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-[var(--spot)]">Rhemic fix</p>
                    <p className="mt-1 font-display text-[1.1rem] font-semibold text-[var(--paper)]">
                      Visibility + Capture + Booking loop
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-[3px] border border-[var(--line)] bg-[var(--paper-3)]" />
              </div>
            </div>

            {/* engines */}
            <div className="rise rise-4 mt-16 flex flex-col gap-3 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <span className="kicker kicker-ink">Optimized for the engines people ask</span>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {engines.map((e) => (
                  <span key={e.label} className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="inline-block h-[19px] w-[19px] shrink-0"
                      style={{
                        backgroundColor: 'var(--ink-2)',
                        WebkitMaskImage: `url(${e.src})`,
                        maskImage: `url(${e.src})`,
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                      }}
                    />
                    <span className="font-mono text-[0.8rem] tracking-tight text-ink-2">{e.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────── RIBBON ───────────────────── */}
        <section aria-hidden className="overflow-hidden border-y border-[var(--ink)] bg-[var(--paper-2)] py-3">
          <div className="marquee-track gap-0">
            {[...ribbon, ...ribbon].map((r, i) => (
              <span key={i} className="flex items-center font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-2">
                <span className="px-6">{r}</span>
                <span className="text-spot">✦</span>
              </span>
            ))}
          </div>
        </section>

        {/* ───────────────────── THE SHIFT (inverted) ───────────────────── */}
        <section className="ink-block px-5 py-24 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="kicker mb-7" style={{ color: 'var(--spot)' }}>The shift</p>
              <h2 className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-normal leading-[1.05] text-balance">
                Search didn’t get smaller. It got{' '}
                <span className="italic" style={{ color: 'var(--spot)' }}>answered.</span>{' '}
                If you’re not in the answer, you’re not in the running.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-10 border-t border-[rgba(244,238,222,0.16)] pt-10 sm:grid-cols-3">
              {[
                ['One answer', 'AI engines return a single, confident recommendation. Position ten is invisible. Position one is the only one read.'],
                ['~25%', 'Gartner projects traditional search volume drops roughly a quarter by 2026 as people shift to AI answers. The demand isn’t gone. It moved.'],
                ['Still local', 'Customers still want someone near them, available now. The engine just decides who they hear about first.'],
              ].map(([k, v], i) => (
                <Reveal key={k} delay={(i + 1) as 1 | 2 | 3}>
                  <p className="font-display text-3xl font-medium" style={{ color: 'var(--paper)' }}>{k}</p>
                  <p className="mt-3 font-body text-[1rem] leading-relaxed text-[rgba(244,238,222,0.7)]">{v}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────── WHAT YOU GET ───────────────────── */}
        <section id="what" className="px-5 py-24 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-14 max-w-2xl">
              <p className="kicker mb-5">What you get</p>
              <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-medium leading-[1.05] text-balance">
                Three things, done every day.
              </h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {outcomes.map((o, i) => (
                <Reveal key={o.no} delay={(i + 1) as 1 | 2 | 3} as="article" className="paper-card flex flex-col p-7">
                  <span className="font-mono text-[0.7rem] tracking-[0.2em] text-spot-deep">{o.no}</span>
                  <h3 className="mt-4 font-display text-[1.7rem] font-semibold">{o.title}</h3>
                  <p className="mt-3 font-body text-[1.02rem] leading-relaxed text-ink-2">{o.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────── HOW IT WORKS ───────────────────── */}
        <section id="how" className="border-y border-[var(--line)] bg-[var(--paper-2)] px-5 py-24 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="kicker mb-5">How it works</p>
                <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-medium leading-[1.05] text-balance">
                  Find the leaks. Fix them. Keep them closed.
                </h2>
              </div>
              <p className="max-w-xs font-body text-[1rem] leading-relaxed text-ink-2">
                No dashboards to babysit. We run the work and report what changed.
              </p>
            </Reveal>
            <div className="grid gap-px overflow-hidden rounded-[3px] border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.no} delay={(i + 1) as 1 | 2 | 3} className="bg-[var(--paper)] p-8">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-[3.2rem] font-bold leading-none text-spot">{s.no}</span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-faint">
                      Step
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[1.5rem] font-semibold">{s.title}</h3>
                  <p className="mt-3 font-body text-[1rem] leading-relaxed text-ink-2">{s.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────── THE WORK (real) ───────────────────── */}
        <section className="px-5 py-24 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="kicker mb-5">Results</p>
                <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-medium leading-[1.05] text-balance">
                  Real sites. Booking and capture wired in.
                </h2>
              </div>
              <Link href="/testimonials" className="link-rule font-mono text-[0.78rem] uppercase tracking-[0.14em] text-ink">
                See the case studies →
              </Link>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {cases.map((c, i) => (
                <Reveal key={c.slug} delay={(i + 1) as 1 | 2} as="article" className="paper-card group flex flex-col overflow-hidden p-0">
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.img}
                      alt={`${c.name}, built by Rhemic AI`}
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-4 top-4 bg-[var(--ink)] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[var(--paper)]">
                      {c.url}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-ink-3">{c.kind}</span>
                    <h3 className="mt-2 font-display text-[1.7rem] font-semibold">{c.name}</h3>
                    <p className="mt-3 font-body text-[1.02rem] leading-relaxed text-ink-2">{c.line}</p>
                    <Link href="/testimonials" className="link-rule mt-5 inline-block w-fit font-mono text-[0.74rem] uppercase tracking-[0.14em] text-spot-deep">
                      Read the build →
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────── PRICING TEASER ───────────────────── */}
        <section className="border-t border-[var(--line)] bg-[var(--paper-2)] px-5 py-24 sm:px-8 sm:py-28">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <Reveal className="max-w-xl">
              <p className="kicker mb-5">Pricing</p>
              <h2 className="font-display text-[clamp(1.9rem,4.4vw,3rem)] font-medium leading-[1.05] text-balance">
                Start at visibility. Scale into capture.
              </h2>
              <p className="mt-5 font-body text-[1.05rem] leading-relaxed text-ink-2">
                Entry plan gets you found and recommended. Higher tiers add full demand capture and
                source-aware reporting.
              </p>
            </Reveal>
            <Reveal delay={2} className="paper-card w-full max-w-sm p-7">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-spot-deep">Tier 1 · Visibility</span>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-[3.2rem] font-bold leading-none">$300</span>
                <span className="font-mono text-[0.74rem] text-ink-3">/mo</span>
              </div>
              <p className="mt-3 font-body text-[0.98rem] leading-relaxed text-ink-2">
                Get found and recommended across search and AI answers.
              </p>
              <Link href="/pricing" className="btn-primary mt-6 w-full">See all tiers</Link>
              <p className="mt-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-faint">
                Tier 2 &amp; 3 pricing finalizing
              </p>
            </Reveal>
          </div>
        </section>

        {/* ───────────────────── FINAL CTA ───────────────────── */}
        <section className="ink-block px-5 py-28 sm:px-8 sm:py-32">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="kicker mb-6" style={{ color: 'var(--spot)' }}>Be the answer</p>
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.4rem)] font-medium leading-[1.0] text-balance">
              Find out where your business{' '}
              <span className="italic" style={{ color: 'var(--spot)' }}>doesn’t</span> show up yet.
            </h2>
            <p className="mx-auto mt-7 max-w-xl font-body text-[1.1rem] leading-relaxed text-[rgba(244,238,222,0.72)]">
              One call. We’ll show you what AI engines say about your category today, and what it
              takes to be the name they give.
            </p>
            <div className="mt-9 flex justify-center">
              <AuditButton className="btn-primary !border-[var(--paper)] !bg-[var(--paper)] !text-[var(--ink)] hover:!border-[var(--spot)] hover:!bg-[var(--spot)] hover:!text-[var(--paper)]">
                Run my revenue leak audit
              </AuditButton>
            </div>
          </Reveal>
        </section>
      </main>

      <PaperFooter />
    </>
  );
}
