import type { Metadata } from 'next';
import ServicePageLayout from '@/components/redesign/ServicePageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Technical and Local SEO for Service Businesses',
  description:
    'Technical and local SEO: indexation, crawl access, site architecture, service and location pages, schema, internal linking and page speed. The half that decides whether AI visibility work has anything to stand on. From $200/mo.',
  path: '/services/seo',
  keywords: [
    'local SEO for service businesses',
    'technical SEO',
    'service area pages',
    'indexation',
    'schema markup',
  ],
});

export default function SeoServicePage() {
  return (
    <ServicePageLayout
      eyebrow="Services / SEO"
      title="The unglamorous half, and the half everything else stands on."
      titleHighlight="unglamorous half"
      path="/services/seo"
      acronymLine="We run classic and technical search engine optimization (SEO): indexation, crawl access, architecture, service and location pages, schema and internal linking."
      whatItIs="AI answers ground partly on ordinary search results. A page an engine cannot crawl, or that Google has quietly excluded from its index, cannot be cited by anything. Most of the AI visibility problems we find turn out to start here, which is why we will not sell the AEO layer without it."
      schemaServiceName="Search Engine Optimization"
      workItems={[
        'Indexation audit: what Google has actually indexed, and what it has excluded and why',
        'Crawl access and robots hygiene, including the noindex tags nobody remembers adding',
        'Canonical hygiene across hosts and duplicates, so one page is not competing with itself',
        'Site architecture and internal linking, so authority reaches the pages that sell',
        'Service pages and service-plus-location pages, written to be crawlable server-side',
        'Schema markup: Organization, LocalBusiness, Service, FAQ, Article, BreadcrumbList',
        'Sitemaps, IndexNow, 404 and redirect cleanup, and Search Console and Bing Webmaster Tools wired up and monitored',
        'Page speed and Core Web Vitals where they affect whether a page gets crawled and kept',
      ]}
      whatChanges={[
        'The pages you care about are in the index, and you can see which ones are not.',
        'Non-brand impressions start appearing for the searches your customers actually run.',
        'The technical foundation stops being the reason the AI work has nowhere to stand.',
      ]}
      faqs={[
        {
          question: 'Is SEO still worth it if customers are moving to AI answers?',
          answer:
            'More so, because the two are connected. Generative answers ground partly on ordinary search results and on the same structured data. A business that is invisible in search gives an answer engine very little to work with. The mistake is treating them as separate budgets.',
        },
        {
          question: 'Do I need service-plus-location pages?',
          answer:
            'If you serve more than one city or run more than one location, yes. A single page covering everywhere gives search engines and answer engines nothing specific to match against a local query. They need to be real pages with real detail, rendered server-side, rather than a list built in the browser.',
        },
        {
          question: 'How do I know whether my pages are actually indexed?',
          answer:
            'Google Search Console tells you page by page, with the reason for every exclusion. It is the first place we look on any engagement, and it is where the most common problems show up: noindex tags left on, dead URLs, and pages competing with their own duplicates.',
        },
        {
          question: 'What does SEO cost?',
          answer:
            'SEO is included from the Visibility plan at $200 a month, alongside AEO, GEO and Google Business Profile optimization. Every price is published on the pricing page.',
        },
      ]}
      related={[
        { title: 'AEO', href: '/services/aeo' },
        { title: 'GEO', href: '/services/geo' },
        { title: 'Google Business Profile', href: '/services/google-business-profile' },
        { title: 'Blog', href: '/blog' },
        { title: 'Pricing', href: '/pricing' },
      ]}
    />
  );
}
