import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'What Is Rhemic AI?',
  description:
    'Rhemic AI is a Dallas-based visibility agency for local businesses. We set up and run the ChatGPT business profile, Google Business Profile, website and reviews, so AI engines and Google name the business.',
  path: '/answers/what-is-rhemic-ai',
  keywords: ['what is Rhemic AI', 'Rhemic AI agency', 'ChatGPT business profile agency', 'AI visibility agency', 'answer engine optimization agency'],
});

export default function WhatIsRhemicAiPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / What is Rhemic AI"
      title="What is Rhemic AI?"
      path="/answers/what-is-rhemic-ai"
      directAnswer="Rhemic AI is a Dallas-based visibility agency for local businesses. We set up and run a business's ChatGPT business profile, Google Business Profile, website and reviews, so ChatGPT, Google and the other AI engines name that business when a customer asks who to call. Every engagement is quoted per business after a 30-minute discovery call."
      details={
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Customers now ask ChatGPT and Google who to hire, and those engines answer with a name.
            Rhemic works on everything the engines read before they answer: the ChatGPT business
            profile, the Google Business Profile, the website and its service pages, structured data,
            reviews, and what other sites say about the business.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            The work runs in three steps. A discovery call, where we check what ChatGPT and Google say
            about the business today and quote the work. Claim and build, where we claim and verify the
            ChatGPT business profile with the owner, complete the Google Business Profile and fix the
            website pages. Then we run it every month: profiles kept current, reviews and citations
            grown, new answer pages published, and a monthly report with the ChatGPT and Google numbers.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Rhemic AI was founded in 2025 by Ittehadul Karim and Raahil Shaik. Clients include
            Kay&apos;s Groom Room, Wava Halal Grill and Rockwall Services.
          </p>
        </div>
      }
      example={
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          A Dallas plumbing company asks why ChatGPT recommends a competitor. Rhemic checks the
          answers, claims and verifies the company&apos;s ChatGPT business profile, completes its Google
          Business Profile, fixes its service pages, and then grows its reviews and answer pages every
          month while reporting where the company shows up.
        </p>
      }
      relatedQuestions={[
        { question: 'Who is Rhemic AI for?', href: '/answers/who-is-rhemic-ai-for' },
        { question: 'How does Rhemic AI work?', href: '/answers/how-does-rhemic-ai-work' },
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
        { question: 'How do I claim my business on ChatGPT?', href: '/blog/how-to-claim-your-business-on-chatgpt' },
      ]}
      relatedPages={[
        { title: 'How It Works', href: '/how-it-works' },
        { title: 'Results', href: '/testimonials' },
        { title: 'FAQ', href: '/faq' },
      ]}
      ctaLabel="Book a discovery call"
      faqs={[
        {
          question: 'Is Rhemic AI an agency or a software product?',
          answer: 'An agency. We do the work for the business: claim and build the profiles, fix the pages, grow reviews and citations, and report the results every month.',
        },
        {
          question: 'Does Rhemic manage ChatGPT business profiles?',
          answer: 'Yes. We claim and verify the profile with the owner on a short call, because the owner passes the identity check. Then we keep the profile complete and current every month.',
        },
        {
          question: 'Does Rhemic help with Google as well as AI search?',
          answer: 'Yes. We run the Google Business Profile, local SEO, service pages, structured data and reviews together with ChatGPT and the other AI engines.',
        },
        {
          question: 'How much does Rhemic cost?',
          answer: 'Rhemic quotes every business on its own needs: locations, market and the work involved. The quote comes after a 30-minute discovery call.',
        },
      ]}
    />
  );
}
