import type { Metadata } from 'next';
import CalBookingLink from '@/components/CalEmbed/CalBookingLink';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PricingSwitch from '@/components/PricingSwitch/PricingSwitch';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { customPlan, plans } from '@/data/pricing';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';
import SubpageFAQ from '@/components/shared/SubpageFAQ';

export const metadata: Metadata = buildMetadata({
  title: 'Med Spa Operating System Pricing',
  description:
    'Basic, Growth, Premium, and Custom pricing for U.S. med spas that need Google Business Profile optimization, AI search visibility, missed-call recovery, AI receptionist coverage, competitor intelligence, and booked consult tracking.',
  path: '/pricing',
  keywords: ['med spa growth pricing', 'med spa patient acquisition', 'Rhemic AI pricing', 'med spa AI receptionist'],
});

const basicPlan = plans.find((p) => p.tier === 'starter')!;
const growthPlan = plans.find((p) => p.tier === 'growth')!;
const premiumPlan = plans.find((p) => p.tier === 'scale')!;

const pricingFaqs = [
  {
    question: 'How much does Rhemic AI cost for med spas?',
    answer: `Med spa plans: ${basicPlan.name} at $${basicPlan.monthlyPrice}/mo, ${growthPlan.name} at $${growthPlan.monthlyPrice}/mo, ${premiumPlan.name} at $${premiumPlan.monthlyPrice}/mo, and ${customPlan.name} for larger groups. The audit helps match scope to the clinic's locations, visibility gaps, and booking workflow.`,
  },
  {
    question: 'Which plan is the main recommendation?',
    answer: `${growthPlan.name} is the main recommendation for owner-led med spas that want more consults, better visibility, better call coverage, and a clearer view of competitor demand.`,
  },
  {
    question: 'What does AI search visibility mean?',
    answer: 'AI search visibility helps your med spa show up when patients ask ChatGPT, Claude, Perplexity, or Google AI about treatments near them.',
  },
  {
    question: 'How does the AI receptionist work?',
    answer: 'The AI receptionist answers common non-clinical questions, captures lead details, and routes booking requests to your team. Medical advice, diagnosis, and treatment decisions stay with licensed staff.',
  },
  {
    question: 'Do you promise rankings or revenue?',
    answer: 'No. Rhemic helps identify and improve visibility, trust, and response gaps. It does not promise search placement, revenue, clinical outcomes, or patient volume.',
  },
];

const snapshotCards = [
  { value: '$1K', label: 'Basic / month' },
  { value: '$2K', label: 'Growth / month' },
  { value: '$3.5K', label: 'Premium / month' },
  { value: '$0', label: 'Setup fee' },
];

const buyerMathItems = ['Botox', 'filler', 'laser', 'body-contouring'];

const recommendationRows = [
  {
    situation: 'You need more patients finding you on Google.',
    bestFit: 'Basic or Growth',
    guidance: 'Choose Basic for foundation cleanup. Choose Growth when consult volume is an active priority.',
  },
  {
    situation: 'Calls are missed during the day or after hours.',
    bestFit: 'Growth',
    guidance: 'Growth adds stronger AI receptionist coverage, call handling, and follow-up notes.',
  },
  {
    situation: 'Competitors are highly visible and running ads.',
    bestFit: 'Premium',
    guidance: 'Premium gives deeper competitor ads intelligence, competitor review, and market-response guidance.',
  },
  {
    situation: 'You have two to five locations.',
    bestFit: 'Growth or Premium',
    guidance: 'Growth can fit two locations. Premium is better for competitive markets or broader multi-location needs.',
  },
  {
    situation: 'You have six or more locations or complex reporting needs.',
    bestFit: 'Custom',
    guidance: 'Rhemic scopes the market, routing, reporting, and rollout needs before recommending a package.',
  },
];

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Rhemic AI Med Spa Growth Plans',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web-based',
  url: 'https://rhemicai.com/pricing',
  provider: {
    '@type': 'Organization',
    name: 'Rhemic AI',
  },
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: String(Math.min(...plans.map((plan) => plan.monthlyPrice))),
    highPrice: String(Math.max(...plans.map((plan) => plan.monthlyPrice))),
    priceCurrency: 'USD',
    offerCount: String(plans.length),
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="pricing-page-schemas"
        service={{
          name: 'Rhemic AI Pricing and Service Plans',
          description:
            'Pricing for patient acquisition infrastructure for U.S. med spas, including Google Business Profile, local SEO, reviews, calls, treatment pages, AI search visibility, AI receptionist coverage, and competitor ads intelligence.',
          path: '/pricing',
          audience: 'U.S. med spa owners and operators evaluating patient acquisition infrastructure',
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingSchema),
        }}
      />
      <FixedNav />

      <section className="relative z-10 px-6 pb-14 pt-32 sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200/70">
            Pricing for U.S. med spas
          </p>
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-extrabold leading-[1.05] text-[var(--text-primary)] sm:text-5xl md:text-6xl">
            Three plans. One med spa growth system.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl font-body text-base leading-[1.75] text-[var(--text-secondary)] md:text-lg">
            Basic fixes the foundation. Growth is the main recommendation for owner-led med spas trying to grow consult volume. Premium is for competitive markets, bigger teams, and multi-location operators.
          </p>
          <p className="mx-auto mt-5 max-w-3xl font-body text-sm leading-[1.7] text-[var(--text-muted)] md:text-base">
            Rhemic helps med spas get found, trusted, and booked. We improve Google Business Profile, local SEO, reviews, treatment pages, AI search visibility, competitor ads intelligence, and AI receptionist coverage for missed and after-hours calls.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4">
            <CalBookingLink
              calLink="rhemic-ai/discovery-call"
            className="w-full max-w-[340px] rounded-full bg-[var(--ink)] px-6 py-4 text-center text-sm font-semibold text-[var(--bg)] shadow-lg shadow-[var(--pulse-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--pulse)] sm:max-w-none sm:px-8 sm:text-base"
          >
              Get a visibility + call leak audit
            </CalBookingLink>
            <p className="font-body text-sm text-[var(--text-muted)]">
              $0 setup fee. Starts with a visibility and call leak audit for U.S. med spas.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 pb-12 sm:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <section className="mb-14 grid grid-cols-2 gap-3 md:grid-cols-4">
            {snapshotCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-white/10 bg-[var(--bg-elevated)] p-5 text-center">
                <p className="font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">{card.value}</p>
                <p className="mt-2 font-body text-sm text-[var(--text-secondary)]">{card.label}</p>
              </div>
            ))}
          </section>

          <PricingSwitch />

          <section className="glass-panel mb-12 p-6 sm:p-8">
            <p className="section-label">Simple buyer math</p>
            <div className="mt-4 grid gap-6 md:grid-cols-[1fr_1.3fr] md:items-center">
              <div className="flex flex-wrap gap-2">
                {buyerMathItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg-2)] px-3 py-2 text-sm text-[var(--text-secondary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-base leading-[1.75] text-[var(--text-secondary)]">
                One missed Botox, filler, laser, or body-contouring consult can be worth hundreds to thousands in lifetime value. Rhemic is built to find and close the leaks before you spend more on ads.
              </p>
            </div>
          </section>

          <section className="glass-panel mb-12 p-6 sm:p-8">
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)]">
              Which plan fits your med spa?
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-[760px] w-full text-left font-body text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    <th className="py-3 pr-5 font-semibold">Your situation</th>
                    <th className="py-3 pr-5 font-semibold">Best fit</th>
                    <th className="py-3 font-semibold">Guidance</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendationRows.map((row) => (
                    <tr key={row.situation} className="border-b border-white/[0.06] last:border-0">
                      <td className="py-4 pr-5 text-[var(--text-secondary)]">{row.situation}</td>
                      <td className="py-4 pr-5 font-semibold text-[var(--text-primary)]">{row.bestFit}</td>
                      <td className="py-4 text-[var(--text-secondary)]">{row.guidance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="glass-panel mb-12 p-6 sm:p-8">
            <p className="section-label">AI receptionist</p>
            <p className="mt-4 max-w-4xl text-base leading-[1.75] text-[var(--text-secondary)]">
              The AI receptionist answers common non-clinical questions, captures lead details, and routes booking requests to your team. Medical advice, diagnosis, and treatment decisions stay with licensed staff.
            </p>
          </section>

          <section className="glass-panel mb-12 px-4 py-10 text-center sm:px-6 sm:py-16">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
              Start with the audit.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--text-secondary)]">
              We help med spas win more booked consults by fixing how patients find you, how they decide to trust you, and what happens when they call.
            </p>
            <CalBookingLink
              calLink="rhemic-ai/discovery-call"
              className="inline-flex w-full max-w-[340px] items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-4 text-sm font-semibold text-[var(--btn-primary-text)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--pulse)] sm:max-w-none sm:px-8 sm:text-base"
            >
              Get a visibility + call leak audit
            </CalBookingLink>
            <p className="mt-6 text-xs text-[var(--text-muted)]">
              No ranking promises, revenue guarantees, or clinical claims.
            </p>
          </section>

          <SubpageFAQ
            heading="Pricing FAQ"
            faqs={pricingFaqs}
          />
        </div>
      </div>

      <RelatedLinks
        heading="Explore more"
        links={[
          {
            title: 'What We Optimize',
            description: 'See the visibility, trust, and response surfaces Rhemic optimizes.',
            href: '/#what-we-optimize',
          },
          {
            title: 'Get the Audit',
            description: 'Start with a visibility and call leak audit.',
            href: '/contact',
          },
          {
            title: 'FAQ',
            description: 'Answers about AI search visibility, AI receptionist coverage, and plan fit.',
            href: '/faq',
          },
        ]}
      />

      <Footer />
    </main>
  );
}
