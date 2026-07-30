import type { Metadata } from 'next';
import ServicePageLayout from '@/components/redesign/ServicePageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Generative Engine Optimization (GEO) for Local Service Businesses',
  description:
    'Generative engine optimization (GEO) fixes what AI engines read about you before they answer: reviews, directories, roundups, comparison content and community threads. From $200/mo.',
  path: '/services/geo',
  keywords: [
    'generative engine optimization',
    'GEO service',
    'AI visibility sources',
    'get cited in AI answers',
  ],
});

export default function GeoServicePage() {
  return (
    <ServicePageLayout
      eyebrow="Services / GEO"
      title="Fix what the engines read about you before they answer about you."
      titleHighlight="before they answer"
      path="/services/geo"
      acronymLine="We run generative engine optimization (GEO), the source side of AI visibility: the review platforms, directories, roundups and threads an engine reads before it decides what to say about your business."
      whatItIs="An answer engine rarely grounds on your website alone. It reads the wider web and synthesizes. That means a thin directory listing, a stale review profile or a roundup that omits you can outweigh a good homepage. GEO is the work of making the sources agree with you."
      schemaServiceName="Generative Engine Optimization"
      workItems={[
        'Source audit: find every place an engine currently reads about your business, and every place it should',
        'Directory and platform coverage built out, with the same name, address, phone and description everywhere',
        'Review platform presence and velocity, since review text is heavily quoted by generative answers',
        'Industry roundups and best-of lists, which frequently outrank vendor pages for category queries',
        'Comparison content, so the engine has something to cite when a buyer asks how you differ from an alternative',
        'Community threads and question sites where your category gets discussed',
        'Inconsistent or wrong third-party facts corrected at the source, then re-checked',
      ]}
      whatChanges={[
        'The sources an engine reads start describing your business the same way you do.',
        'You appear in the roundups and comparisons that answer category questions.',
        'Wrong hours, old addresses and dead descriptions stop feeding the answers.',
      ]}
      faqs={[
        {
          question: 'How is GEO different from AEO?',
          answer:
            'AEO is the work on your own property and your own entity: schema, answer pages, prompt coverage. GEO is the work on everything else an engine reads before it answers. They are two halves of the same problem, which is why we run them together rather than selling one.',
        },
        {
          question: 'Is this just link building with a new name?',
          answer:
            'No. Link building chases ranking signals. GEO chases what gets quoted. A directory profile with no link value can still be the thing an engine reads to decide your hours are wrong, and a roundup that never links to you can still be the source that names you.',
        },
        {
          question: 'Do reviews really affect AI answers?',
          answer:
            'For a local service business, heavily. Review text is exactly the kind of specific, attributable language generative engines quote when a buyer asks who is good. Review volume, recency and the wording of owner responses all feed it.',
        },
        {
          question: 'What does GEO cost?',
          answer:
            'GEO is included from the Visibility plan at $200 a month, alongside AEO, SEO and Google Business Profile optimization. Every price is published on the pricing page.',
        },
      ]}
      related={[
        { title: 'AEO', href: '/services/aeo' },
        { title: 'SEO', href: '/services/seo' },
        { title: 'Google Business Profile', href: '/services/google-business-profile' },
        { title: 'What is AI visibility', href: '/answers/what-is-ai-visibility' },
        { title: 'Pricing', href: '/pricing' },
      ]}
    />
  );
}
