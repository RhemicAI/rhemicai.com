import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Who Is Rhemic AI For?',
  description:
    'Rhemic AI is built for local service businesses, marketing agencies, and SMBs that need to show up in AI-generated answers from ChatGPT, Claude, and Perplexity.',
  path: '/answers/who-is-rhemic-ai-for',
  keywords: ['who is Rhemic AI for', 'Rhemic AI customers', 'AI visibility for businesses'],
});

export default function WhoIsRhemicAiForPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / Who is Rhemic AI for"
      title="Who is Rhemic AI for?"
      path="/answers/who-is-rhemic-ai-for"
      directAnswer="Rhemic AI is for local service businesses, marketing and SEO agencies, and SMBs in competitive categories where AI-driven discovery is accelerating. If your customers are using ChatGPT, Claude, or Perplexity to find businesses like yours, Rhemic helps you show up in those answers."
      details={
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Local service businesses</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Restaurants, salons, contractors, medical practices, legal firms, home services, and
            any business that depends on local discovery. AI answer engines are increasingly the
            starting point for "best [service] near me" queries. Local businesses with strong
            entity clarity, schema, and review signals appear in those answers. Businesses without
            them do not.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Marketing and SEO agencies</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Agencies that want to offer AI visibility as a productized service to their clients.
            Rhemic gives agencies a repeatable audit and delivery workflow so they can benchmark
            clients, produce client-ready reports, and convert AEO interest into a recurring
            service line without building the tooling from scratch.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">SMBs in competitive categories</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Any business in a category where buyers compare options before purchasing. If a
            competitor is appearing in AI recommendations and you are not, you are losing a
            meaningful share of buyer attention. Rhemic identifies exactly why and what to fix.
          </p>
        </div>
      }
      relatedQuestions={[
        { question: 'What is Rhemic AI?', href: '/answers/what-is-rhemic-ai' },
        { question: 'How does Rhemic AI work?', href: '/answers/how-does-rhemic-ai-work' },
        { question: 'How can local businesses show up in AI answers?', href: '/answers/how-local-businesses-can-show-up-in-ai-answers' },
        { question: 'How can agencies sell AI visibility?', href: '/answers/how-marketing-agencies-can-sell-ai-visibility' },
      ]}
      relatedPages={[
        { title: 'For Local Businesses', href: '/for-local-businesses' },
        { title: 'For Agencies', href: '/for-agencies' },
        { title: 'Pricing', href: '/pricing' },
      ]}
      faqs={[
        {
          question: 'Does Rhemic work for B2B businesses?',
          answer: 'Yes. B2B buyers increasingly use AI tools for vendor research and comparison. If your category involves buyer-intent queries in AI engines, Rhemic applies.',
        },
        {
          question: 'Is Rhemic right for a solo business owner?',
          answer: 'The Local Starter plan at $199/month is designed for single-location businesses. You get a full AI visibility audit with prioritized fixes you can implement on your own or hand to a developer.',
        },
      ]}
    />
  );
}
