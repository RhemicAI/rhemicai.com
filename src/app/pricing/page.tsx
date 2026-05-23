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
    'Basic, Growth, Premium, and Custom pricing for U.S. med spas that need Google Business Profile optimization, AI search visibility, missed-call recovery, AI receptionist coverage, software handoffs, competitor intelligence, and booked consult tracking.',
  path: '/pricing',
  keywords: ['med spa growth pricing', 'med spa patient acquisition', 'Rhemic AI pricing', 'med spa AI receptionist', 'med spa software integrations'],
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
    question: 'Do we need to switch from our current med spa software?',
    answer: 'No. Rhemic is being built to work around the tools med spas already use. You should not need to switch from Boulevard, Mangomint, Zenoti, AestheticsPro, Meevo, or another core system just to start using Rhemic.',
  },
  {
    question: 'Do you promise rankings or revenue?',
    answer: 'No. Rhemic helps identify and improve visibility, trust, and response gaps. It does not promise search placement, revenue, clinical outcomes, or patient volume.',
  },
];

const aiReceptionAndAdsFaqs = [
  {
    question: 'Does every Rhemic plan include the AI receptionist?',
    answer:
      'Yes. Every Rhemic plan includes AI receptionist coverage for common non-clinical questions, lead capture, and booking request routing. Growth and Premium add stronger missed-call recovery, more advanced scripts, and deeper reporting. Medical advice, diagnosis, and treatment decisions stay with licensed staff.',
  },
  {
    question: 'What does the AI receptionist actually do?',
    answer:
      'The AI receptionist answers common non-clinical questions, captures lead details, and routes booking requests to your team. It helps recover calls that would otherwise go to voicemail or get missed after hours.',
  },
  {
    question: 'Does the AI receptionist replace our front desk?',
    answer:
      'No. Rhemic does not replace your front desk. It gives your team backup coverage when calls are missed, after-hours leads come in, or staff are busy with patients.',
  },
  {
    question: 'Can the AI receptionist book appointments directly?',
    answer:
      'Direct booking is planned for supported systems, but it is not something we enable blindly. For now, the AI receptionist captures the caller\'s details, requested treatment, urgency, and booking intent, then routes the request to your team. Direct scheduling will be available later for approved integrations with proper guardrails.',
  },
  {
    question: 'Does the AI receptionist give medical advice?',
    answer:
      'No. The AI receptionist does not provide medical advice, diagnosis, treatment recommendations, or clinical intake. It only handles common non-clinical questions, lead capture, and booking request routing.',
  },
  {
    question: 'What happens when a caller asks a clinical question?',
    answer:
      'The AI receptionist should route the caller to your licensed team. Clinical decisions, treatment eligibility, diagnosis, and medical guidance stay with licensed staff.',
  },
  {
    question: 'What kind of questions can the AI receptionist answer?',
    answer:
      'It can answer approved non-clinical questions like location, hours, services offered, pricing ranges if approved, consultation process, booking steps, cancellation policy, and how to contact the clinic.',
  },
  {
    question: 'What happens after the AI receptionist captures a lead?',
    answer:
      'The lead is routed to your team with the caller\'s details, requested treatment, urgency, source when available, and next-step context. The goal is to make follow-up faster and cleaner.',
  },
  {
    question: 'Can we approve what the AI receptionist says?',
    answer:
      'Yes. Rhemic should use approved scripts and clinic-specific guardrails. Your team controls the approved language for services, pricing, policies, escalation rules, and booking handoff.',
  },
  {
    question: 'Is the AI receptionist available after hours?',
    answer:
      'Yes. One of the core use cases is after-hours coverage, so missed calls and late-night buyer intent do not sit untouched until the next business day.',
  },
  {
    question: 'What is Meta ads intelligence?',
    answer:
      'Meta ads intelligence is a Premium dashboard for connected Meta Ads accounts. It helps your med spa see ad performance, KPIs, costs, and optimization opportunities inside the Rhemic platform.',
  },
  {
    question: 'Does Rhemic run our Meta ads?',
    answer:
      "Not by default. Premium includes Meta Ads intelligence for connected-account reporting and optimization visibility. Paid ad management is separate unless explicitly scoped.",
  },
  {
    question: 'What is the Meta MCP used for?',
    answer:
      "Meta MCP lets a clinic connect its Meta account to Rhemic's platform so the Premium dashboard can show ad KPIs, spend, costs, performance trends, and optimization opportunities.",
  },
  {
    question: 'Will Rhemic change our ad campaigns automatically?',
    answer:
      'No. Rhemic should not automatically change your ad campaigns without approval. Any ad-related recommendation should be reviewed before action is taken.',
  },
  {
    question: 'What does Meta ads intelligence show us?',
    answer:
      'It can show connected-account campaign performance, spend, cost metrics, lead and conversion signals when available, KPI trends, and areas to optimize in running ads.',
  },
  {
    question: 'Which plans include Meta ads intelligence?',
    answer:
      'Premium includes Meta ads intelligence through the connected-account dashboard and Meta MCP connection. Growth can include lighter competitor visibility review. Basic focuses on foundation work: visibility, GBP, reviews, AI search presence, and AI receptionist coverage.',
  },
  {
    question: 'Is Meta ads intelligence the same as ad management?',
    answer:
      'No. Ads intelligence means Rhemic shows connected-account performance, KPIs, costs, and optimization opportunities. Ad management means someone creates, launches, optimizes, and manages campaigns. Those are different services.',
  },
  {
    question: 'Why does ads intelligence matter if Rhemic is not an agency?',
    answer:
      'Because visibility alone is not enough. If your ads are spending money but calls, leads, costs, and booked consults are not clear, you cannot tell what to fix. Rhemic helps connect demand to capture and reporting.',
  },
  {
    question: 'Can Rhemic tell which ads drove booked consults?',
    answer:
      'That is the direction of the closed-loop reporting layer. Rhemic should help trace consults back to the source when tracking and handoff systems are properly connected.',
  },
  {
    question: 'Will Rhemic post ads or content for us?',
    answer:
      'No automatic posting by default. For content plans like Reddit or ads-related strategy, Rhemic can recommend and plan. The clinic or approved operator executes unless a separate execution scope is agreed.',
  },
];

const softwareIntegrationFaqs = [
  {
    question: 'Does Rhemic integrate with AestheticsPro, Boulevard, Mangomint, Zenoti, or Meevo?',
    answer:
      'Not yet as a live self-serve integration. Integrations with major med spa systems like AestheticsPro, Boulevard, Mangomint, Zenoti, Meevo, and similar platforms are on the roadmap. Today, Rhemic can still help with visibility, AI receptionist coverage, missed-call recovery, and lead routing while we scope the right integration path for your clinic.',
  },
  {
    question: 'Which med spa software systems are you planning to support?',
    answer:
      'We are prioritizing systems commonly used by U.S. med spas, including AestheticsPro, Boulevard, Mangomint, Zenoti, Meevo, and other scheduling, CRM, EMR, and practice management tools used in aesthetics. Final rollout depends on API access, compliance review, and customer demand.',
  },
  {
    question: 'Can Rhemic send leads into our booking or CRM system?',
    answer:
      'In the current phase, Rhemic can capture lead details and route booking requests to your team through approved handoff workflows. Deeper CRM, scheduling, and practice-management integrations are in progress and will be added where the software supports safe API-based handoff.',
  },
  {
    question: 'Can the AI receptionist book directly into our scheduling system?',
    answer:
      'Direct booking is planned for supported systems, but it is not something we enable blindly. For now, the AI receptionist captures the caller\'s details, requested treatment, urgency, and booking intent, then routes the request to your team. Direct scheduling will be available later for approved integrations with proper guardrails.',
  },
  {
    question: 'Will Rhemic integrate with our EMR?',
    answer:
      'EMR integrations are on the roadmap, but Rhemic does not need EMR access to start improving visibility, call capture, and lead routing. Any EMR integration will require a separate review for API access, permissions, data scope, and compliance requirements.',
  },
  {
    question: 'Do we need to switch from our current med spa software?',
    answer:
      'No. Rhemic is being built to work around the tools med spas already use. You should not need to switch from Boulevard, Mangomint, Zenoti, AestheticsPro, Meevo, or another core system just to start using Rhemic.',
  },
  {
    question: 'What happens before the integration is live?',
    answer:
      'Before a direct integration is live, Rhemic can use approved workflows to capture lead information, notify your team, support missed-call recovery, and give you reporting around visibility and lead response. The goal is to improve the leak points first, then deepen the connection into your existing stack.',
  },
  {
    question: 'Can we request a specific integration?',
    answer:
      'Yes. If your clinic uses a specific booking, CRM, EMR, or practice-management system, mention it during the visibility and call leak audit. We use customer demand to prioritize integration work.',
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
    guidance: 'Premium gives connected-account Meta Ads intelligence, competitor review, and clearer optimization priorities.',
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
            'Pricing for patient acquisition infrastructure for U.S. med spas, including Google Business Profile, local SEO, reviews, calls, treatment pages, AI search visibility, AI receptionist coverage, and Meta Ads intelligence.',
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
            Rhemic helps med spas get found, trusted, and booked. We improve Google Business Profile, local SEO, reviews, treatment pages, AI search visibility, Meta Ads intelligence, and AI receptionist coverage for missed and after-hours calls.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4">
            <CalBookingLink
              calLink="rhemic-ai/medspa-discovery-call"
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
              calLink="rhemic-ai/medspa-discovery-call"
              className="inline-flex w-full max-w-[340px] items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-4 text-sm font-semibold text-[var(--btn-primary-text)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--pulse)] sm:max-w-none sm:px-8 sm:text-base"
            >
              Get a visibility + call leak audit
            </CalBookingLink>
            <p className="mt-6 text-xs text-[var(--text-muted)]">
              No ranking promises, revenue guarantees, or clinical claims.
            </p>
          </section>

          <SubpageFAQ
            heading="Questions about AI reception and Meta Ads intelligence"
            faqs={aiReceptionAndAdsFaqs}
          />

          <SubpageFAQ
            heading="Software integrations FAQ"
            faqs={softwareIntegrationFaqs}
          />

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
