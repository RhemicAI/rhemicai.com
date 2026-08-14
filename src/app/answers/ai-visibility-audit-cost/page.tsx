import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';
import { plans, priceLadderSentence } from '@/data/pricing';

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;
const entry = plans[0];

export const metadata: Metadata = buildMetadata({
  title: 'How Much Does an AI Visibility Audit Cost?',
  description: `An AI visibility audit is priced as an ongoing engagement rather than a one-off report. Rhemic starts at ${usd(entry.monthlyPrice)} a month. Here is what changes the number.`,
  path: '/answers/ai-visibility-audit-cost',
  keywords: [
    'ai visibility audit cost',
    'how much does an ai visibility audit cost',
    'ai visibility audits pricing for smbs',
    'ai engine audit',
    'ai engine auditing tool',
  ],
});

export default function AiVisibilityAuditCostPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / AI visibility audit cost"
      title="How much does an AI visibility audit cost?"
      path="/answers/ai-visibility-audit-cost"
      directAnswer={`An AI visibility audit is priced as an ongoing engagement rather than a one-off report, because AI answers change week to week. Rhemic runs three published plans: ${priceLadderSentence}. The entry plan covers one location and includes the audit plus the work to fix what the audit finds.`}
      details={
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Most quoted prices for an AI visibility audit fall into two shapes. A one-time report
            gives you a snapshot of how ChatGPT, Claude, Perplexity, and Gemini currently describe
            your business. An ongoing engagement measures the same prompts on a schedule and does the
            work that moves them. The second shape costs more per month and produces the change; the
            first produces a document.
          </p>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">What Rhemic charges</h2>
          <ul className="space-y-2 text-[var(--text-secondary)] text-sm leading-relaxed list-disc list-inside">
            {plans.map((p) => (
              <li key={p.tier}>
                <strong className="text-[var(--text-primary)]">{p.name}</strong> at{' '}
                {usd(p.monthlyPrice)} a month, or {usd(p.annualPrice)} a year. {p.bestFor}{' '}
                {p.includedLocations}.
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            What moves the price
          </h2>
          <ul className="space-y-2 text-[var(--text-secondary)] text-sm leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-[var(--text-primary)]">Locations.</strong> Each location adds
              its own Google Business Profile, its own local prompt set, and its own competitor field.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Prompt breadth.</strong> Auditing ten
              buyer-intent prompts costs less than auditing a hundred across five engines.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Engines covered.</strong> ChatGPT,
              Claude, Perplexity, Gemini, and Microsoft Copilot each answer differently and each
              needs separate measurement.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Competitor set.</strong> Citation share
              only means something when it is measured against named competitors.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Remediation scope.</strong> An audit
              that ends at findings is cheaper than one that includes the schema, entity, and
              answer-page work to fix them.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            What a real audit should give you
          </h2>
          <ul className="space-y-2 text-[var(--text-secondary)] text-sm leading-relaxed list-disc list-inside">
            <li>Citation rate per engine across a defined buyer-intent prompt set</li>
            <li>Citation share measured against named competitors, rather than an abstract score</li>
            <li>The specific sources each engine reads before it answers about your category</li>
            <li>Entity and schema gaps that stop an engine from quoting you</li>
            <li>Crawler access status for GPTBot, ClaudeBot, PerplexityBot, and Googlebot</li>
            <li>A dated baseline you can measure the next run against</li>
          </ul>

          <p className="text-[var(--text-secondary)] leading-relaxed">
            Treat any quoted figure that promises a ranking, a citation rate, or a revenue number as
            a warning sign. Results depend on third-party platforms that no vendor controls. Rhemic
            publishes its prices and declines to guarantee a placement.
          </p>
        </div>
      }
      relatedQuestions={[
        { question: 'Which sources do AI engines cite about my industry?', href: '/answers/which-sources-ai-engines-cite' },
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
        { question: 'Why does my competitor show up in AI answers?', href: '/answers/why-your-competitor-shows-up-in-ai-answers' },
        { question: 'How does Rhemic AI work?', href: '/answers/how-does-rhemic-ai-work' },
      ]}
      relatedPages={[
        { title: 'Pricing', href: '/pricing' },
        { title: 'Answer Engine Optimization', href: '/services/aeo' },
        { title: 'Generative Engine Optimization', href: '/services/geo' },
        { title: 'How it works', href: '/how-it-works' },
      ]}
      faqs={[
        {
          question: 'How much does an AI visibility audit cost?',
          answer: `Rhemic publishes three plans: ${priceLadderSentence}. Each includes the audit and the work to act on it. A standalone one-time audit report from other vendors typically costs less and delivers findings rather than change.`,
        },
        {
          question: 'Is there a free AI visibility audit?',
          answer: 'You can test manually at no cost by running your own buyer-intent prompts across ChatGPT, Claude, Perplexity, and Gemini and recording whether your business is named. That gives you a rough signal. Systematic measurement across prompt variations, several engines, and a named competitor set requires a structured workflow.',
        },
        {
          question: 'What is the difference between an AI visibility audit and an SEO audit?',
          answer: 'An SEO audit measures whether your pages can rank in a list of blue links. An AI visibility audit measures whether an answer engine names your business inside a synthesized answer. The two share technical foundations such as schema and crawlability, and they diverge on what counts as success.',
        },
        {
          question: 'How long before an AI visibility audit shows results?',
          answer: 'Engines re-crawl and re-ground on their own schedules, so movement typically appears across weeks rather than days. This is why Rhemic prices the work as an ongoing engagement and re-measures the same prompt set rather than delivering a single report.',
        },
      ]}
      ctaLabel="See pricing"
      ctaHref="/pricing"
    />
  );
}
