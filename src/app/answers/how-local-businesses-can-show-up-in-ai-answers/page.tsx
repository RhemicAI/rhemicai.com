import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How Local Businesses Can Show Up in AI Answers',
  description:
    'Local businesses can improve their AI answer visibility by strengthening entity clarity, service page depth, local schema, FAQ coverage, and review signals.',
  path: '/answers/how-local-businesses-can-show-up-in-ai-answers',
  keywords: ['local business AI answers', 'show up in ChatGPT local', 'AI local business visibility'],
});

export default function HowLocalBusinessesCanShowUpPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / How local businesses show up in AI answers"
      title="How local businesses can show up in AI answers"
      path="/answers/how-local-businesses-can-show-up-in-ai-answers"
      directAnswer="Local businesses show up in AI answers by having clear entity signals (name, location, category, services), strong service page content that directly answers buyer questions, LocalBusiness or Service schema markup, positive review signals across authoritative platforms, and no robots.txt blocks on AI crawlers."
      details={
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            When a buyer asks ChatGPT or Perplexity &ldquo;best [service] in [city]&rdquo;, the AI engine
            synthesizes an answer from its training data and live web sources. Local businesses
            that appear in those answers have a structural advantage: clear entity signals that
            tell AI systems exactly who they are, where they operate, and what they do.
          </p>
          <div className="space-y-3">
            {[
              { label: 'Define your entity clearly', detail: 'Your business name, location, service category, and what makes you distinctive need to appear consistently on your website, Google Business Profile, Yelp, and other directory listings. Inconsistency reduces citation confidence.' },
              { label: 'Write service pages that answer questions', detail: 'Instead of "We offer HVAC services," write a page that answers: What HVAC services do you offer? What areas do you serve? How quickly can you respond? What does the process look like? These are the questions buyers ask AI tools.' },
              { label: 'Add LocalBusiness and Service schema', detail: 'Schema markup translates your business into structured data that AI systems can parse. At minimum: LocalBusiness with name, address, phone, openingHours, and serviceArea.' },
              { label: 'Build review volume on authoritative platforms', detail: 'Google, Yelp, and industry-specific review platforms are frequently cited by AI engines for local recommendations. Volume and recency both matter.' },
              { label: 'Add FAQ content for local buyer questions', detail: 'What are your hours? Do you serve [specific area]? What does a typical job cost? What do you do that competitors do not? These FAQ pages with FAQPage schema are high-leverage for local AI visibility.' },
            ].map(({ label, detail }) => (
              <div key={label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
                <h3 className="font-bold text-[var(--text-primary)] mb-1 text-sm">{label}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      }
      example={
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          A plumbing company in Phoenix adds LocalBusiness schema, rewrites its service pages to
          directly answer common buyer questions, and adds a FAQ page covering service area, response
          time, and pricing range. Within 60 days, it appears in ChatGPT answers for
          &quot;emergency plumbers in Phoenix.&quot;
        </p>
      }
      relatedQuestions={[
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
        { question: 'Why does your competitor show up in AI answers?', href: '/answers/why-your-competitor-shows-up-in-ai-answers' },
      ]}
      relatedPages={[
        { title: 'For Local Businesses', href: '/for-local-businesses' },
        { title: 'AI Search Visibility for Small Businesses', href: '/ai-search-visibility-for-small-businesses' },
        { title: 'Pricing', href: '/pricing' },
      ]}
      faqs={[
        {
          question: 'Does my local business need a website to appear in AI answers?',
          answer: 'A website is the primary signal source for AI engines. Without one, you are relying entirely on third-party mentions (Google Business, Yelp, directories). A website with proper structure gives you direct control over your entity signals.',
        },
        {
          question: 'Does Google Business Profile help with AI visibility?',
          answer: 'Google Business Profile feeds data into Google AI Overviews and likely influences other AI engines. It is a meaningful signal source for local businesses, especially for location and category data.',
        },
      ]}
    />
  );
}
