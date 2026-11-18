import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Who Is Rhemic AI For?',
  description:
    'Rhemic AI works with owner-led local service businesses in the U.S. that want ChatGPT and Google to name them when customers ask who to call.',
  path: '/answers/who-is-rhemic-ai-for',
  keywords: ['who is Rhemic AI for', 'AI visibility for local businesses', 'ChatGPT business profile for home services', 'local business AI search'],
});

export default function WhoIsRhemicAiForPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / Who is Rhemic AI for"
      title="Who is Rhemic AI for?"
      path="/answers/who-is-rhemic-ai-for"
      directAnswer="Rhemic AI is for owner-led local service businesses in the United States that want ChatGPT and Google to name them when a customer asks who to call. Home services lead: HVAC, plumbing, electrical, roofing and remodeling. We also work with restaurants, groomers, logistics firms, clinics and similar local businesses, from one location up to several."
      details={
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Home service businesses</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            HVAC, plumbing, electrical, roofing and remodeling companies win work when a homeowner asks
            who to call. We make sure ChatGPT and Google have the right facts, the right service pages
            and enough reviews to name them.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Restaurants and local shops</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            People ask ChatGPT where to eat and who to book. Wava Halal Grill ranks first in ChatGPT
            for halal chicken over rice in Richardson, and Kay&apos;s Groom Room comes up as the top
            pet groomer in Seagoville.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Service firms with a site Google cannot see</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Rockwall Services, a logistics brokerage, had a setting that kept Google from indexing its
            site. We fixed it, got every page indexed, and the company now ranks first for its own name.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Multi-location businesses</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Each location gets its own profile, its own local answers and its own competitors. We quote
            the work by location count and market size.
          </p>
        </div>
      }
      relatedQuestions={[
        { question: 'What is Rhemic AI?', href: '/answers/what-is-rhemic-ai' },
        { question: 'How does Rhemic AI work?', href: '/answers/how-does-rhemic-ai-work' },
        { question: 'How can local businesses show up in AI answers?', href: '/answers/how-local-businesses-can-show-up-in-ai-answers' },
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
          question: 'Do you work with businesses outside Texas?',
          answer: 'Yes. Rhemic is based in Dallas and works with local businesses across the United States.',
        },
        {
          question: 'Do I need a website to work with Rhemic?',
          answer: 'A website helps ChatGPT and Google understand your business. If you need one, we build it as part of the engagement.',
        },
        {
          question: 'How is the price set?',
          answer: 'We quote every business on its own needs: the number of locations, the market and the work involved. The quote comes after a 30-minute discovery call.',
        },
      ]}
    />
  );
}
