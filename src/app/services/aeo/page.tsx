import type { Metadata } from 'next';
import ServicePageLayout from '@/components/redesign/ServicePageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Answer Engine Optimization (AEO) for Local Service Businesses',
  description:
    'Answer engine optimization (AEO) gets your business named when a customer asks ChatGPT, Claude, Perplexity, Gemini or Copilot who to call. Prompt-level auditing, citation share, entity and schema work. From $200/mo.',
  path: '/services/aeo',
  keywords: [
    'answer engine optimization',
    'AEO for local business',
    'get recommended by ChatGPT',
    'AI visibility service',
    'citation share',
  ],
});

export default function AeoServicePage() {
  return (
    <ServicePageLayout
      eyebrow="Services / AEO"
      title="Get named when a customer asks an AI which business to call."
      titleHighlight="asks an AI"
      path="/services/aeo"
      acronymLine="We run answer engine optimization (AEO), so ChatGPT, Claude, Perplexity, Gemini and Copilot name your business when someone asks who to go with."
      whatItIs="A customer used to search, scroll and pick. Now they ask once and act on one answer. AEO is the work that decides whether your business is inside that answer. It is measured in citation share, which is how often an engine names you when it answers a question in your category, against how often it names someone else."
      schemaServiceName="Answer Engine Optimization"
      workItems={[
        'Prompt-level auditing across ChatGPT, Claude, Perplexity, Gemini and Copilot, using the questions your customers actually ask',
        'Citation share measured against the competitors you name, then tracked over time',
        'Entity work so the engines model your business correctly and consistently across the web',
        'Schema markup that gives an engine an extractable fact to quote: Organization, LocalBusiness, Service, FAQ',
        'Answer-page architecture built around real buyer questions, one question per page',
        'Crawler access checked and kept open for the AI user agents, in robots.txt and at the edge',
        'Bing Webmaster Tools AI citation reporting, which is the closest thing to a scoreboard for this work',
      ]}
      whatChanges={[
        'Your business starts appearing by name in AI answers for the questions customers ask before they call.',
        'You get a monthly citation share figure, so the work is measured rather than asserted.',
        'The pages an engine grounds on say what you actually sell, at a price it can quote.',
      ]}
      faqs={[
        {
          question: 'How is AEO different from SEO?',
          answer:
            'SEO decides whether you rank in a list of links. AEO decides whether you are named inside a synthesized answer where there is no list. They share technical foundations like crawlability and schema, and they diverge on content structure, entity clarity and how results are measured. AEO is measured in citation share rather than ranking position.',
        },
        {
          question: 'Which engines do you cover?',
          answer:
            'ChatGPT, Claude, Perplexity, Google Gemini and Google AI Overviews, and Microsoft Copilot. Copilot is the one that publishes a citation report we can read directly, so it is where the measurement is most concrete.',
        },
        {
          question: 'How long before an AI engine names my business?',
          answer:
            'Entity and schema corrections are read on the next crawl, so the groundwork moves in days. Citation share moves more slowly because engines ground on sources across the web, not only on your site. Plan on a quarter to see a trend rather than a week.',
        },
        {
          question: 'Can you guarantee I will show up in ChatGPT?',
          answer:
            'No, and treat anyone who does with suspicion. These are third-party systems that change without notice. What we control is whether your business is legible, consistent and quotable to them, and whether you can see the result. We report citation share either way.',
        },
        {
          question: 'What does AEO cost?',
          answer:
            'AEO is included from the Visibility plan at $200 a month, alongside GEO, SEO and Google Business Profile optimization. Every price is published on the pricing page.',
        },
      ]}
      related={[
        { title: 'GEO', href: '/services/geo' },
        { title: 'SEO', href: '/services/seo' },
        { title: 'Google Business Profile', href: '/services/google-business-profile' },
        { title: 'Why your competitor shows up in AI answers', href: '/answers/why-your-competitor-shows-up-in-ai-answers' },
        { title: 'What is AEO', href: '/answers/what-is-aeo' },
        { title: 'Pricing', href: '/pricing' },
      ]}
    />
  );
}
