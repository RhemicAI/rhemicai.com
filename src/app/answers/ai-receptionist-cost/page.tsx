import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';
import { plans } from '@/data/pricing';

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;
const capture = plans.find((p) => p.tier === 'growth') ?? plans[1];

export const metadata: Metadata = buildMetadata({
  title: 'How Much Does an AI Receptionist Cost? (2026 Pricing Breakdown)',
  description: `AI receptionists run roughly $50 to $600 a month depending on call volume and setup. Here is how the pricing models differ, the fees vendors hide, and how to compare on cost per booked job.`,
  path: '/answers/ai-receptionist-cost',
  keywords: [
    'ai receptionist cost',
    'ai receptionist pricing',
    'how much does an ai receptionist cost',
    'ai receptionist cost vs in house staff cost',
    'ai receptionist vs hiring receptionist cost',
    'receptionist salary vs ai cost',
  ],
});

export default function AiReceptionistCostPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / AI receptionist cost"
      title="How much does an AI receptionist cost?"
      path="/answers/ai-receptionist-cost"
      directAnswer="Most AI receptionists price between roughly $50 and $600 a month, set by call volume rather than headcount. Entry tiers around $50 to $150 a month cover a few hundred minutes and simple call answering. Mid tiers around $200 to $400 add booking, CRM handoff, and after-hours coverage. Higher tiers past $500 add multi-location routing and integrations. Compare on cost per booked job rather than sticker price, because a cheap plan that answers calls without routing them still loses the work."
      details={
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            The four pricing models
          </h2>
          <ul className="space-y-2 text-[var(--text-secondary)] text-sm leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-[var(--text-primary)]">Per minute.</strong> You buy a bundle of
              talk minutes. Predictable when call volume is steady, and it spikes in your busiest
              month, which is exactly when you can least afford a surprise.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Per call.</strong> Simple to reason
              about. Watch how the vendor counts a call, because wrong numbers, hang-ups, and
              robocalls often bill the same as a real customer.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Flat monthly.</strong> Easiest to
              budget. Check the overage rate, since the flat number usually caps at a volume.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Per booked appointment.</strong> Best
              aligned to outcome, and usually the highest headline number.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">The fees that get hidden</h2>
          <ul className="space-y-2 text-[var(--text-secondary)] text-sm leading-relaxed list-disc list-inside">
            <li>Setup or onboarding fees, often a few hundred dollars</li>
            <li>Overage rates once you pass the included minutes or calls</li>
            <li>Per-integration charges for your CRM, calendar, or scheduler</li>
            <li>Extra cost per additional location, number, or team member</li>
            <li>Charges for calls the system could not handle and escalated anyway</li>
            <li>Annual commitments that remove the option to leave when it underperforms</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Against the cost of a person
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            A full-time receptionist in the United States generally costs somewhere in the mid
            $30,000s to mid $40,000s a year in base pay, and the loaded cost runs higher once payroll
            taxes, benefits, and paid time off are counted. Roughly speaking that lands near $3,000
            to $4,000 a month for one person covering one shift.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            The comparison is rarely one against the other. A person handles judgment, awkward
            situations, and regulars who expect a familiar voice. Software handles the 7pm call, the
            second caller while the first is still talking, and the Saturday that nobody staffed.
            Most operators who solve this well end up with both, and use the software to cover the
            hours and overflow a single salary cannot.
          </p>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            The number that actually matters
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Take the monthly cost and divide it by the jobs it books. A $500 plan that books six jobs
            at a $900 average ticket returns $5,400 on $500. A $99 plan that answers politely and
            forwards a voicemail nobody returns books zero. Sticker price ranks the options in the
            wrong order almost every time.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Two questions decide most of it. Does the system route the call to a human fast when it
            cannot finish the job itself? Does it tell you where that call came from, so you can see
            which marketing actually produced work?
          </p>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Where Rhemic fits
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Rhemic sells the outcome rather than the device. The{' '}
            <strong className="text-[var(--text-primary)]">{capture.name}</strong> plan, at{' '}
            {usd(capture.monthlyPrice)} a month for {capture.includedLocations}, catches missed calls
            and after-hours inquiries, follows up on them, routes every lead to your team with the
            source attached, and reports which visibility work produced booked jobs.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            It includes the visibility layer underneath, which is the part a standalone receptionist
            product leaves untouched. A receptionist answers the calls you already get. Getting named
            when a customer asks Google or ChatGPT who to call is what changes how many calls arrive
            in the first place. That is why the capture layer and the visibility work sit in one
            plan.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            If your phone already rings enough and the only gap is coverage, a standalone AI
            receptionist may be the cheaper answer, and choosing one on the criteria above is a good
            outcome. Rhemic is the better fit when the calls that reach you are too few, or when you
            cannot tell which ones came from where.
          </p>
        </div>
      }
      relatedQuestions={[
        { question: 'How much revenue are missed calls costing your business?', href: '/blog/how-much-revenue-are-missed-calls-costing-your-business' },
        { question: 'AI receptionist vs answering service vs CSR', href: '/blog/ai-receptionist-vs-answering-service-vs-csr' },
        { question: 'Questions to ask before you buy an AI receptionist', href: '/blog/ai-receptionist-questions-to-ask-before-you-buy' },
        { question: 'How much does an AI visibility audit cost?', href: '/answers/ai-visibility-audit-cost' },
      ]}
      relatedPages={[
        { title: 'Pricing', href: '/pricing' },
        { title: 'AI receptionist pricing explained', href: '/blog/ai-receptionist-pricing-explained' },
        { title: 'Call tracking for home services', href: '/blog/call-tracking-for-home-services' },
        { title: 'How it works', href: '/how-it-works' },
      ]}
      faqs={[
        {
          question: 'How much does an AI receptionist cost per month?',
          answer: 'Most land between roughly $50 and $600 a month. Entry tiers near $50 to $150 cover a few hundred minutes and basic answering. Mid tiers near $200 to $400 add booking, CRM handoff, and after-hours coverage. Past $500 you are usually paying for multi-location routing and deeper integrations.',
        },
        {
          question: 'Is an AI receptionist cheaper than hiring someone?',
          answer: 'On monthly cost, yes. A full-time receptionist generally runs near $3,000 to $4,000 a month loaded, against a few hundred for software. The useful comparison is coverage: one salary covers one shift, and software covers evenings, weekends, and the second caller who arrives while the first is still on the line.',
        },
        {
          question: 'What hidden fees do AI receptionist vendors charge?',
          answer: 'Setup and onboarding fees, overage rates past the included minutes or calls, per-integration charges for a CRM or calendar, extra cost per location or phone number, and charges for calls the system escalated without resolving. Ask for the total at your actual call volume rather than the advertised tier.',
        },
        {
          question: 'How do I compare AI receptionist pricing fairly?',
          answer: 'Divide the monthly cost by the jobs it books. A $500 plan booking six jobs at a $900 ticket returns $5,400. A $99 plan that forwards voicemails nobody returns books nothing. Then check two things: whether it hands off to a human quickly when it cannot finish the job, and whether it reports where each call came from.',
        },
        {
          question: 'Does Rhemic sell an AI receptionist?',
          answer: `Rhemic sells the outcome rather than a standalone receptionist product. The ${capture.name} plan at ${usd(capture.monthlyPrice)} a month catches missed calls and after-hours inquiries, follows up, routes each lead to your team with its source attached, and includes the visibility work that changes how many calls arrive in the first place.`,
        },
      ]}
      ctaLabel="See pricing"
      ctaHref="/pricing"
    />
  );
}
