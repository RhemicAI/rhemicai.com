import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'What Is Rhemic AI?',
  description:
    'Rhemic AI is an AI visibility platform that helps businesses track and improve how they appear in AI-generated answers from ChatGPT, Claude, Gemini, and Perplexity.',
  path: '/answers/what-is-rhemic-ai',
  keywords: ['what is Rhemic AI', 'Rhemic AI platform', 'AI visibility platform'],
});

export default function WhatIsRhemicAiPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / What is Rhemic AI"
      title="What is Rhemic AI?"
      path="/answers/what-is-rhemic-ai"
      directAnswer="Rhemic AI is an AI visibility platform that helps businesses measure and improve how they appear in AI-generated answers from ChatGPT, Claude, Gemini, and Perplexity. It runs visibility audits, compares competitor mentions, identifies missing buyer-intent prompts, and provides AEO recommendations to make businesses more recommendable by AI systems."
      details={
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Rhemic AI operates in the category known as Answer Engine Optimization (AEO) or AI Engine Optimization.
            The core problem it solves: businesses are increasingly discovered through AI answer engines,
            not just Google. When a buyer asks ChatGPT or Perplexity for recommendations, the businesses
            that appear in those answers win the attention. Businesses that do not appear are invisible
            to that buyer, regardless of how well they rank in traditional search.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Rhemic gives businesses a structured way to measure their current AI visibility, understand
            why competitors are being cited instead, and implement the specific changes that improve
            recommendation probability. This includes technical recommendations (schema markup,
            crawlability, structured data), content recommendations (FAQ coverage, entity clarity,
            direct answer pages), and competitive analysis (which prompts are being lost to competitors
            and why).
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Rhemic is headquartered in Dallas, Texas. It was founded in 2025. The platform serves
            local service businesses, marketing agencies, and SMBs in competitive categories where
            AI-driven discovery is accelerating.
          </p>
        </div>
      }
      example={
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          A local HVAC company asks: &ldquo;Why does a competitor show up when someone asks ChatGPT for HVAC companies
          in Dallas?&rdquo; Rhemic runs a prompt audit, identifies the competitor&apos;s schema coverage and entity
          signals, and produces a prioritized fix list. Within 60 days of implementation, the HVAC
          company begins appearing in AI recommendations for its target service area.
        </p>
      }
      relatedQuestions={[
        { question: 'Who is Rhemic AI for?', href: '/answers/who-is-rhemic-ai-for' },
        { question: 'How does Rhemic AI work?', href: '/answers/how-does-rhemic-ai-work' },
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
        { question: 'What is AEO?', href: '/answers/what-is-aeo' },
      ]}
      relatedPages={[
        { title: 'AI Search Visibility', href: '/ai-search-visibility' },
        { title: 'For Local Businesses', href: '/for-local-businesses' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Sample Report', href: '/sample-ai-visibility-report' },
      ]}
      faqs={[
        {
          question: 'Is Rhemic AI a SaaS product or a service?',
          answer: 'Rhemic AI is a platform-backed service. You receive software-driven audits and reports delivered by the Rhemic team. Depending on your plan, you also receive implementation guidance, recurring re-scans, and dedicated support.',
        },
        {
          question: 'What AI engines does Rhemic cover?',
          answer: 'Rhemic measures visibility across ChatGPT, Claude, Perplexity, and Gemini. These are the primary answer engines where buyer-intent queries are shifting.',
        },
        {
          question: 'Does Rhemic help with Google as well?',
          answer: 'Yes. Many of the improvements that drive AI visibility — schema markup, content structure, entity clarity — also improve Google search performance. Rhemic covers both.',
        },
      ]}
    />
  );
}
