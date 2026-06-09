import type { Metadata } from 'next';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import Reveal from '@/components/redesign/Reveal';
import AuditButton from '@/components/redesign/AuditButton';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Our Work',
  description:
    'Proof, not promises: businesses Rhemic got cited inside AI answers, with results you can paste into ChatGPT and verify. Choose One Auto, Kay’s Groom Room, and Wava Grill.',
  path: '/testimonials',
  keywords: ['Rhemic AI case studies', 'Rhemic AI work', 'booking site case study'],
});

type CaseStudy = {
  no: string;
  name: string;
  kind: string;
  location: string;
  url?: string;
  urlLabel: string;
  hero: string;
  logo: string;
  brief: string;
  built: string[];
  result: string;
};

const studies: CaseStudy[] = [
  {
    no: '01',
    name: 'Kay’s Groom Room',
    kind: 'In-home dog grooming',
    location: 'Seagoville, TX',
    url: 'https://kaysgroomroom.com',
    urlLabel: 'kaysgroomroom.com',
    hero: '/images/cases/groomroom-hero.jpg',
    logo: '/images/cases/groomroom-logo.png',
    brief:
      'A boutique, one-on-one grooming business with real demand and no easy way for people to book it. The site had to turn every visitor into an appointment, on mobile first.',
    built: [
      'Booking-first single-page site where every section funnels to one action',
      'Embedded booking widget so people book without leaving the page',
      'Floating mobile call-and-book bar so no inquiry slips on a phone',
      'Real services, pricing, and a before-and-after gallery that sells the work',
      'Local schema and SEO so it shows up for the searches that matter',
    ],
    result:
      'A live, on-brand site built to convert attention into booked grooming appointments, not just look good.',
  },
  {
    no: '02',
    name: 'Choose One Auto Consulting',
    kind: 'Auto consulting · Michael King',
    location: 'Irving, TX',
    url: 'https://chooseoneautoconsulting.com',
    urlLabel: 'chooseoneautoconsulting.com',
    hero: '/images/cases/chooseone-owner.jpg',
    logo: '/images/cases/chooseone-logo.jpg',
    brief:
      'A founder-led consulting business losing real money to missed calls. The work was not just a site, it was making sure no inbound call went unanswered.',
    built: [
      'A conversion-focused site built around the consulting offer',
      'An AI receptionist that answers and captures every call',
      'After-hours and overflow calls caught instead of going to voicemail',
      'Every call logged and routed so the team can follow up fast',
    ],
    result:
      'A site and a capture system working together, so demand turns into conversations instead of missed voicemails.',
  },
];

const citations = [
  {
    name: 'Choose One Auto Consulting',
    vertical: 'Auto · Irving, TX',
    rank: 'Recommended',
    site: 'chooseoneautoconsulting.com',
    url: 'https://chooseoneautoconsulting.com',
    img: '/images/proof/chooseone-chatgpt.png',
    cited: 'ChatGPT names it the local DFW car-buying concierge to use, cited by name in the answer.',
    queries: ['Best car buying concierge service in DFW', 'Recommend a car buying consultant in Irving, Texas'],
  },
  {
    name: 'Kay’s Groom Room',
    vertical: 'Pet services · Seagoville, TX',
    rank: '#1 pick',
    site: 'kaysgroomroom.com',
    url: 'https://kaysgroomroom.com',
    img: '/images/proof/kays-chatgpt.png',
    cited: 'ChatGPT returns it as the best pet groomer in Seagoville, with its one-on-one positioning in the answer.',
    queries: ['Best pet groomer in Seagoville, Texas', 'Best dog groomer in Seagoville TX'],
  },
  {
    name: 'Wava Grill',
    vertical: 'Restaurant · Dallas, TX',
    rank: '#1 pick',
    site: 'wavagrill.com',
    url: 'https://wavagrill.com',
    img: '/images/proof/wava-chatgpt.png',
    cited: 'ChatGPT ranks it first for halal chicken over rice in Richardson, calling the dish out by name.',
    queries: ['Best halal chicken over rice place in Richardson', 'Best halal restaurant in Dallas'],
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <PaperNav />
      <main className="relative">
        {/* Header */}
        <section className="px-5 pb-12 pt-32 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">The work</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">Built by Rhemic</span>
            </div>
            <Reveal className="max-w-3xl">
              <h1 className="font-display text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.0] text-balance">
                Don’t take our word for it.{' '}
                <span className="italic text-spot-deep">Take the AI’s.</span>
              </h1>
              <p className="mt-6 max-w-xl font-body text-[1.15rem] leading-relaxed text-ink-2 text-pretty">
                No stock-photo testimonials. This is the real work: businesses we got cited inside AI
                answers, the sites we built, and results you can paste into ChatGPT and check yourself.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Proof of work: real AI citations */}
        <section className="px-5 pb-20 sm:px-8 sm:pb-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-10 flex flex-col gap-3 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="kicker mb-2">Proof of work</p>
                <p className="font-display text-[1.5rem] font-semibold leading-tight text-ink">
                  Cited by name in the AI answers buyers ask.
                </p>
              </div>
              <p className="max-w-sm font-body text-[0.95rem] leading-relaxed text-ink-2">
                Live engagements. Open ChatGPT, Claude, Gemini, or Perplexity and paste the queries
                yourself. No dashboard, no spin.
              </p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {citations.map((c, i) => (
                <Reveal key={c.name} delay={(i + 1) as 1 | 2 | 3} as="article" className="paper-card flex flex-col overflow-hidden p-0">
                  {/* Real ChatGPT screenshot from the visibility report */}
                  <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--paper-3)] px-4 py-2">
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-3">ChatGPT · live answer</span>
                    <span className="bg-[var(--spot-soft)] px-2 py-0.5 font-mono text-[0.54rem] uppercase tracking-[0.14em] text-spot-deep">{c.rank}</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={`ChatGPT recommending ${c.name}`}
                    className="h-[210px] w-full border-b border-[var(--line)] bg-[#1b1813] object-contain"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-3">{c.vertical}</span>
                    <h3 className="mt-2 font-display text-[1.35rem] font-semibold leading-tight">{c.name}</h3>
                    <p className="mt-2 font-body text-[0.96rem] leading-snug text-ink-2">{c.cited}</p>
                    <p className="mt-4 kicker kicker-ink">Test it yourself</p>
                    <ul className="mt-2 flex-1 space-y-2">
                      {c.queries.map((q) => (
                        <li key={q} className="border-l-2 border-[var(--line-strong)] pl-3 font-mono text-[0.76rem] leading-snug text-ink-2">
                          “{q}”
                        </li>
                      ))}
                    </ul>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-rule mt-4 inline-block w-fit border-t border-[var(--line)] pt-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-spot-deep"
                    >
                      {c.site} →
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-6 font-body text-[0.85rem] italic leading-relaxed text-ink-3">
              Screenshots from a real Rhemic visibility report. Answer-engine results move and depend on
              third-party platforms outside our control. Paste the queries to see current answers.
            </p>

            {/* Proof of work — what we did, factual, no client quote */}
            <Reveal delay={2} className="paper-card mt-12 p-8 sm:p-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="kicker mb-3">In progress</p>
                  <h3 className="font-display text-[1.8rem] font-semibold leading-tight">Rockwall Services</h3>
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink-3">Logistics brokerage · Texas</p>
                </div>
                <a
                  href="https://rockwallservices.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-rule w-fit font-mono text-[0.72rem] uppercase tracking-[0.14em] text-spot-deep"
                >
                  rockwallservices.net →
                </a>
              </div>

              <div className="mt-7 grid gap-7 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
                <div>
                  <p className="kicker kicker-ink mb-3">What we did</p>
                  <ul className="space-y-2.5">
                    {[
                      'Found and fixed a setting that had Google ignoring the entire site, then got it fully indexed',
                      'Built a new, SEO-structured Customers page, now live on the site',
                      'Verified the Google Business Profile to open up local map optimization',
                    ].map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-spot" />
                        <span className="font-body text-[0.98rem] leading-snug text-ink-2">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="kicker kicker-ink mb-3">The result</p>
                  <ul className="space-y-2.5">
                    {[
                      'Site went from invisible to fully indexed by Google',
                      'Now ranks first for its own brand search',
                      'Local map and AEO optimization underway as the next phase',
                    ].map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-spot" />
                        <span className="font-body text-[0.98rem] leading-snug text-ink-2">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Case studies */}
        {studies.map((s, idx) => (
          <section
            key={s.no}
            className={`px-5 py-16 sm:px-8 sm:py-20 ${idx % 2 === 1 ? 'border-y border-[var(--line)] bg-[var(--paper-2)]' : ''}`}
          >
            <div className="mx-auto max-w-6xl">
              <div className={`grid items-center gap-10 lg:grid-cols-2 ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                {/* Image */}
                <Reveal className="relative">
                  <div className="paper-card overflow-hidden p-0">
                    <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--paper-3)] px-4 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
                      <span className="ml-3 font-mono text-[0.66rem] tracking-tight text-ink-3">{s.urlLabel}</span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.hero} alt={`${s.name}, built by Rhemic AI`} className="h-[380px] w-full object-cover" />
                  </div>
                </Reveal>

                {/* Copy */}
                <Reveal delay={2}>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[2.6rem] font-bold leading-none text-spot">{s.no}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.logo} alt={`${s.name} logo`} className="h-11 w-11 rounded-[6px] border border-[var(--line)] object-cover" />
                  </div>
                  <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-tight">{s.name}</h2>
                  <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-3">
                    {s.kind} · {s.location}
                  </p>

                  <p className="mt-5 font-body text-[1.08rem] leading-relaxed text-ink-2">{s.brief}</p>

                  <p className="mt-6 kicker">What we built</p>
                  <ul className="mt-3 space-y-2.5">
                    {s.built.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-spot" />
                        <span className="font-body text-[1rem] leading-snug text-ink-2">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rule-strong pt-4">
                    <p className="font-body text-[1.02rem] italic leading-relaxed text-ink">{s.result}</p>
                  </div>

                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-rule mt-5 inline-block font-mono text-[0.76rem] uppercase tracking-[0.14em] text-spot-deep"
                    >
                      Visit {s.urlLabel} →
                    </a>
                  )}
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="ink-block px-5 py-24 sm:px-8 sm:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="kicker mb-6" style={{ color: 'var(--spot)' }}>Your business next</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.02] text-balance">
              Want one of these working for you?
            </h2>
            <p className="mx-auto mt-6 max-w-lg font-body text-[1.08rem] leading-relaxed text-[rgba(244,238,222,0.72)]">
              Book a call and we will show you what visibility and capture look like for your business.
            </p>
            <div className="mt-8 flex justify-center">
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
