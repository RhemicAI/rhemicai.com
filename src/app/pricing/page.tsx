import type { Metadata } from 'next';
import Link from 'next/link';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import Reveal from '@/components/redesign/Reveal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Rhemic pricing. Start at Visibility to get found and recommended across search and AI answers, then scale into full demand capture and source-aware reporting. Any industry.',
  path: '/pricing',
  keywords: ['Rhemic AI pricing', 'AI visibility pricing', 'answer engine optimization pricing'],
});

type Tier = {
  badge: string;
  name: string;
  price: string;
  unit?: string;
  placeholder?: boolean;
  best: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    badge: 'Tier 1',
    name: 'Visibility',
    price: '$300',
    unit: '/mo',
    best: 'Get found and recommended.',
    blurb:
      'The entry point. We make your business show up — and get recommended by name — across search and AI answer engines.',
    features: [
      'AI answer-engine visibility for your category',
      'Google Business Profile and local search foundation',
      'Schema, citations, and treatment/service-page priority fixes',
      'Monthly visibility report — where you rank and what moved',
    ],
  },
  {
    badge: 'Tier 2',
    name: 'Capture',
    price: 'TBD',
    placeholder: true,
    featured: true,
    best: 'Catch and route every inquiry.',
    blurb:
      'Everything in Visibility, plus the always-on capture layer that turns the demand into booked work — calls, missed calls, after-hours, and forms.',
    features: [
      'Everything in Visibility',
      'Always-on capture — calls, missed calls, after-hours, forms',
      'Booking intent routed to your team with source context',
      'Competitor positioning and demand review',
    ],
  },
  {
    badge: 'Tier 3',
    name: 'Scale',
    price: 'TBD',
    placeholder: true,
    best: 'Expand what’s working.',
    blurb:
      'Everything in Capture, plus multi-location routing, deeper reporting, and ad spend tied to booked-work outcomes by source and campaign.',
    features: [
      'Everything in Capture',
      'Multi-location routing and dashboard',
      'Source-aware reporting across markets',
      'Connected-account ad reporting for campaign context',
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <PaperNav />
      <main className="relative">
        {/* Header */}
        <section className="px-5 pb-12 pt-32 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">Pricing</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">Any industry · U.S.</span>
            </div>
            <Reveal className="max-w-3xl">
              <h1 className="font-display text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.0] text-balance">
                Start at visibility.{' '}
                <span className="italic text-spot-deep">Scale into capture.</span>
              </h1>
              <p className="mt-6 max-w-xl font-body text-[1.15rem] leading-relaxed text-ink-2 text-pretty">
                One plan to get found and recommended. Higher tiers add full demand capture and
                reporting as you grow. No vertical lock-in — it works for any business that needs to
                be found.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Tiers */}
        <section className="px-5 pb-24 sm:px-8 sm:pb-28">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal
                key={t.name}
                delay={(i + 1) as 1 | 2 | 3}
                as="article"
                className={`relative flex flex-col p-8 ${
                  t.featured ? 'ink-block' : 'paper-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[0.66rem] uppercase tracking-[0.2em] ${
                      t.featured ? 'text-[var(--spot)]' : 'text-spot-deep'
                    }`}
                  >
                    {t.badge}
                  </span>
                  {t.featured && (
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[rgba(244,238,222,0.55)]">
                      Most chosen
                    </span>
                  )}
                </div>

                <h2
                  className={`mt-4 font-display text-[2rem] font-semibold ${
                    t.featured ? '!text-[var(--paper)]' : ''
                  }`}
                >
                  {t.name}
                </h2>

                <div className="mt-3 flex items-baseline gap-2">
                  <span
                    className={`font-display text-[3.4rem] font-bold leading-none ${
                      t.featured ? 'text-[var(--paper)]' : 'text-ink'
                    } ${t.placeholder ? 'opacity-70' : ''}`}
                  >
                    {t.price}
                  </span>
                  {t.unit && (
                    <span className={`font-mono text-[0.78rem] ${t.featured ? 'text-[rgba(244,238,222,0.6)]' : 'text-ink-3'}`}>
                      {t.unit}
                    </span>
                  )}
                </div>

                {t.placeholder && (
                  <span
                    className={`mt-2 inline-block w-fit border px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.16em] ${
                      t.featured
                        ? 'border-[rgba(244,238,222,0.3)] text-[rgba(244,238,222,0.6)]'
                        : 'border-[var(--line-strong)] text-ink-3'
                    }`}
                  >
                    Pricing finalizing
                  </span>
                )}

                <p
                  className={`mt-4 font-body text-[1rem] leading-relaxed ${
                    t.featured ? 'text-[rgba(244,238,222,0.74)]' : 'text-ink-2'
                  }`}
                >
                  {t.blurb}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 ${t.featured ? 'bg-[var(--spot)]' : 'bg-spot'}`} />
                      <span
                        className={`font-body text-[0.96rem] leading-snug ${
                          t.featured ? 'text-[rgba(244,238,222,0.86)]' : 'text-ink-2'
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-8 ${
                    t.featured
                      ? 'btn-primary !border-[var(--paper)] !bg-[var(--paper)] !text-[var(--ink)] hover:!border-[var(--spot)] hover:!bg-[var(--spot)] hover:!text-[var(--paper)]'
                      : 'btn-ghost'
                  } w-full`}
                >
                  {t.placeholder ? 'Talk to us' : 'Book a call'}
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Footnote */}
        <section className="border-t border-[var(--line)] bg-[var(--paper-2)] px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-[1.02rem] leading-relaxed text-ink-2">
              Have more than one location or a complex setup? We scope custom. Tier 2 and Tier 3
              pricing is being finalized — book a call and we’ll walk you through exactly what fits.
            </p>
            <Link href="/contact" className="btn-primary mt-7">Book a call</Link>
          </div>
        </section>
      </main>
      <PaperFooter />
    </>
  );
}
