import type { Metadata } from 'next';
import Link from 'next/link';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import Reveal from '@/components/redesign/Reveal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Our Work',
  description:
    'Real sites Rhemic AI built for real businesses, with booking and capture wired in. Case studies from Kay’s Groom Room and Choose One Auto Consulting.',
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
    location: 'United States',
    urlLabel: 'Site + AI receptionist',
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
                Real businesses.{' '}
                <span className="italic text-spot-deep">Real sites.</span>{' '}
                Booking and capture wired in.
              </h1>
              <p className="mt-6 max-w-xl font-body text-[1.15rem] leading-relaxed text-ink-2 text-pretty">
                We do not show stock-photo testimonials. We show the work. Here are sites we built and
                the systems behind them that turn attention into booked, captured demand.
              </p>
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
              <Link
                href="/contact"
                className="btn-primary !border-[var(--paper)] !bg-[var(--paper)] !text-[var(--ink)] hover:!border-[var(--spot)] hover:!bg-[var(--spot)] hover:!text-[var(--paper)]"
              >
                Book a call
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <PaperFooter />
    </>
  );
}
