import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How Marketing Agencies Can Sell AI Visibility Services',
  description:
    'How marketing and SEO agencies can productize AI visibility as a repeatable service: audit workflow, client framing, pricing structure, and delivery model.',
  path: '/answers/how-marketing-agencies-can-sell-ai-visibility',
  keywords: ['agencies sell AI visibility', 'AI visibility service for agencies', 'productize AEO'],
});

export default function HowAgenciesCanSellAiVisibilityPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / How agencies can sell AI visibility"
      title="How marketing agencies can sell AI visibility services"
      path="/answers/how-marketing-agencies-can-sell-ai-visibility"
      directAnswer="Agencies can sell AI visibility as a productized recurring service by framing it as a new measurement category (where does my brand appear in AI answers), delivering a structured audit, and packaging ongoing monitoring and implementation as a retainer. The workflow is: baseline audit, competitive gap report, prioritized fix plan, recurring re-scans."
      details={
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Why agencies should sell this now</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            AI visibility is a new budget category for clients who are already asking about ChatGPT
            and whether their business appears there. Agencies that can answer that question concretely —
            with a measurement, a benchmark, and a fix plan — convert that conversation into a scoped
            service. Agencies that cannot are leaving the budget to someone who can.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">The delivery model that works</h2>
          <div className="space-y-3">
            {[
              { label: 'Baseline audit', detail: 'Run a structured prompt audit across ChatGPT, Claude, Perplexity, and Gemini to establish the client\'s current citation rate. Frame it as a new baseline, not a criticism of past SEO work.' },
              { label: 'Competitive gap report', detail: 'Show the client which competitors are appearing in their place and why. This converts an abstract AI discussion into a concrete business problem with named competitors.' },
              { label: 'Prioritized fix plan', detail: 'Deliver a ranked list of technical and content changes: schema fixes, FAQ additions, entity clarifications, robots.txt updates. This is the agency\'s delivery output.' },
              { label: 'Recurring monitoring', detail: 'Re-run the prompt audit quarterly or monthly. Visibility movement is the ongoing proof-of-work. Agencies that track it have retention leverage. Agencies that deliver one-time reports do not.' },
            ].map(({ label, detail }) => (
              <div key={label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
                <h3 className="font-bold text-[var(--text-primary)] mb-1 text-sm">{label}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      }
      relatedQuestions={[
        { question: 'Who is Rhemic AI for?', href: '/answers/who-is-rhemic-ai-for' },
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
      ]}
      relatedPages={[
        { title: 'For Agencies', href: '/for-agencies' },
        { title: 'AI Visibility Tools for Agencies', href: '/ai-visibility-tools-for-agencies' },
        { title: 'Pricing', href: '/pricing' },
      ]}
      ctaLabel="View partner pricing"
      ctaHref="/for-agencies"
      faqs={[
        {
          question: 'Can agencies white-label Rhemic AI reports?',
          answer: 'Contact Rhemic via the partner demo booking for details on agency delivery models and output customization.',
        },
        {
          question: 'What is a realistic monthly retainer for AI visibility work?',
          answer: 'This depends on client size, scope, and market. Agency partner pricing is discussed during the partner demo — contact Rhemic to explore the model.',
        },
      ]}
    />
  );
}
