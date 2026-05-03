import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Why Your Competitor Shows Up in AI Answers (And You Do Not)',
  description:
    'The most common reasons a competitor appears in ChatGPT, Perplexity, or Gemini answers when you do not — and what to do about each.',
  path: '/answers/why-your-competitor-shows-up-in-ai-answers',
  keywords: ['competitor in AI answers', 'why competitor shows up in ChatGPT', 'AI recommendation gap'],
});

export default function WhyCompetitorShowsUpPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / Why your competitor shows up in AI answers"
      title="Why your competitor shows up in AI answers (and you do not)"
      path="/answers/why-your-competitor-shows-up-in-ai-answers"
      directAnswer="Competitors appear in AI answers instead of you because their entity signals are clearer, their content directly answers buyer questions, their schema markup is more complete, they appear in more comparison and category content, or AI crawlers have better access to their pages. These are structural gaps, not luck."
      details={
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            When ChatGPT or Perplexity recommends your competitor and not you, it is because the AI
            engine has more confidence in the competitor&apos;s relevance to the prompt. That confidence
            is built from structural signals — not from paid placement or any ranking manipulation.
          </p>
          <div className="space-y-3">
            {[
              { label: 'Their entity is clearer', detail: 'Your competitor\'s name, category, services, and location are explicitly and consistently defined on their site. If an AI engine cannot clearly model who you are and what you offer, it defaults to whoever it can model.' },
              { label: 'Their content directly answers buyer questions', detail: 'AI engines prefer pages that lead with direct answers. If your competitor has a service page that says "We are the leading HVAC provider in Dallas, specializing in same-day emergency repair" and yours says "Quality service you can count on," they win that prompt.' },
              { label: 'They have more schema markup', detail: 'Schema markup makes businesses machine-readable. A competitor with Organization, Service, LocalBusiness, and FAQPage schema is giving AI engines far more structured signals than a competitor with none.' },
              { label: 'They appear in comparison and category content', detail: 'AI engines frequently cite "best X in Y" and "X vs Y" comparison content. If your competitor is on those lists and you are not, you will not appear in shortlist answers.' },
              { label: 'Their AI crawlers have better access', detail: 'Check your robots.txt. If GPTBot, PerplexityBot, or ClaudeBot is blocked on your site while your competitor\'s crawlers have full access, that is a direct cause of the gap.' },
            ].map(({ label, detail }) => (
              <div key={label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
                <h3 className="font-bold text-[var(--text-primary)] mb-1 text-sm">{label}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Rhemic&apos;s competitive analysis identifies exactly which gaps are causing your absence
            in specific prompts and ranks them by impact. You get a fix list, not just a score.
          </p>
        </div>
      }
      relatedQuestions={[
        { question: 'How to improve ChatGPT visibility?', href: '/answers/how-to-improve-chatgpt-visibility' },
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
        { question: 'How does Rhemic AI work?', href: '/answers/how-does-rhemic-ai-work' },
      ]}
      relatedPages={[
        { title: 'AI Search Visibility', href: '/ai-search-visibility' },
        { title: 'Compare Rhemic AI', href: '/compare' },
        { title: 'Free AI Visibility Check', href: '/free-ai-visibility-check' },
        { title: 'Pricing', href: '/pricing' },
      ]}
      ctaLabel="Run a free scan"
      ctaHref="/free-ai-visibility-check"
      faqs={[
        {
          question: 'Can I close the gap with just content changes?',
          answer: 'Content changes alone rarely close the gap. The highest-impact fixes are usually a combination of schema markup, entity clarity improvements, and strategic content additions. Technical changes are often faster to implement and produce cleaner signals.',
        },
        {
          question: 'How do I know which competitors are appearing in my target prompts?',
          answer: 'The only reliable way is systematic prompt testing across the relevant AI engines. Rhemic automates this and produces a competitive mention report showing exactly who is cited and in what context.',
        },
      ]}
    />
  );
}
