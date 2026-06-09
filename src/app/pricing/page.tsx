import type { Metadata } from 'next';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import Reveal from '@/components/redesign/Reveal';
import AuditButton from '@/components/redesign/AuditButton';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing: Get Found by AI from $200/mo',
  description:
    'Rhemic plans from $200/mo. SEO, GEO, and AEO to get found and recommended, plus demand capture and a done-for-you growth system. No website? We build one. Any local business.',
  path: '/pricing',
  keywords: ['AI visibility pricing', 'SEO GEO AEO pricing', 'AI visibility audit cost', 'local business SEO pricing'],
});

type Tier = {
  badge: string;
  name: string;
  price: string;
  was?: string;
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
    price: '$200',
    was: '$300',
    unit: '/mo',
    best: 'Get found and recommended.',
    blurb:
      'The entry point. We rank you on Google and get you recommended inside AI answers. Classic SEO, plus GEO and AEO.',
    features: [
      'Rank on Google and win the local map (SEO)',
      'Get cited and recommended inside AI answers (GEO + AEO)',
      'Win the high-intent searches your customers actually use',
      'See exactly where you moved each month, in plain English',
    ],
  },
  {
    badge: 'Tier 2',
    name: 'Capture',
    price: '$700',
    was: '$1,000',
    unit: '/mo',
    featured: true,
    best: 'Catch and route every inquiry.',
    blurb:
      'Everything in Visibility, plus the always-on capture layer that turns that demand into booked customers. Calls, missed calls, after-hours, and forms.',
    features: [
      'Everything in Visibility',
      'Stop losing customers to missed calls and after-hours inquiries',
      'Every lead reaches your team fast, with where it came from',
      'Turn the people comparing you to competitors into booked customers',
    ],
  },
  {
    badge: 'Tier 3',
    name: 'Full done-for-you system',
    price: '$2,000',
    was: '$2,500',
    unit: '/mo',
    best: 'We run the whole thing for you.',
    blurb:
      'Everything in Capture, plus multi-location routing, deeper reporting, and ad spend tied to booked-work outcomes by source and campaign.',
    features: [
      'Everything in Capture',
      'Every location handled, not just one',
      'Know which markets, channels, and dollars actually book work',
      'We run visibility, capture, and reporting so you run the business',
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
                Start by getting found and recommended. Add full demand capture and reporting
                whenever you want it. No vertical lock-in. It works for any business that needs to
                be found.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Tiers */}
        <section className="px-5 pb-24 sm:px-8 sm:pb-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
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
                  className={`mt-4 font-display text-[2rem] font-semibold leading-[1.05] lg:flex lg:min-h-[4.4rem] lg:items-start ${
                    t.featured ? '!text-[var(--paper)]' : ''
                  }`}
                >
                  {t.name}
                </h2>

                <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  {t.was && (
                    <span
                      className={`font-display text-[1.3rem] font-semibold leading-none line-through decoration-[1.5px] sm:text-[1.6rem] ${
                        t.featured ? 'text-[rgba(244,238,222,0.45)] decoration-[var(--spot)]' : 'text-ink-faint decoration-[var(--spot)]'
                      }`}
                    >
                      {t.was}
                    </span>
                  )}
                  <span
                    className={`font-display text-[2.7rem] font-bold leading-none sm:text-[3.4rem] ${
                      t.featured ? 'text-[var(--paper)]' : 'text-ink'
                    }`}
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
                  className={`mt-4 font-body text-[1rem] leading-relaxed lg:min-h-[7.5rem] ${
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

                <AuditButton
                  className={`mt-8 ${
                    t.featured
                      ? 'btn-primary !border-[var(--paper)] !bg-[var(--paper)] !text-[var(--ink)] hover:!border-[var(--spot)] hover:!bg-[var(--spot)] hover:!text-[var(--paper)]'
                      : 'btn-ghost'
                  } w-full`}
                >
                  {t.placeholder ? 'Talk to us' : 'Run my audit'}
                </AuditButton>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Footnote */}
        <section className="border-t border-[var(--line)] bg-[var(--paper-2)] px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[1.4rem] font-semibold leading-snug text-ink">
              No website yet? We build you one.
            </p>
            <p className="mt-3 font-body text-[1.02rem] leading-relaxed text-ink-2">
              If you do not have a site, a new one is built into getting you visible, no separate web-design
              bill. Have more than one location or a complex setup? We scope it custom. Book a call and
              we’ll walk you through exactly what fits.
            </p>
            <AuditButton className="btn-primary mt-7">Run my revenue leak audit</AuditButton>
          </div>
        </section>
      </main>
      <PaperFooter />
    </>
  );
}
