import Script from 'next/script';

const serviceListSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Rhemic AI Products',
  description:
    'AI Engine Optimization tools for the AI search economy.',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Website Auditing',
        description:
          'Comprehensive audits of schema markup, content structure, and technical SEO signals for AI discovery.',
        url: 'https://rhemicai.com/products/website-auditing',
        provider: {
          '@type': 'Organization',
          name: 'Rhemic AI',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Competitor Analysis',
        description:
          'Track rival strategies across ChatGPT, Claude, Perplexity, and Gemini to outrank them in AI responses.',
        url: 'https://rhemicai.com/products/competitor-analysis',
        provider: {
          '@type': 'Organization',
          name: 'Rhemic AI',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Code Generation',
        description:
          'AI-generated schema markup, JSON-LD, and optimized metadata ready to deploy with one click.',
        url: 'https://rhemicai.com/products/code-generation',
        provider: {
          '@type': 'Organization',
          name: 'Rhemic AI',
        },
      },
    },
  ],
});

export default function ServiceListSchema() {
  return (
    <Script
      id="service-list-schema"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {serviceListSchema}
    </Script>
  );
}
