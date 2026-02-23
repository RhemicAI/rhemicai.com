import Script from 'next/script';

const organizationSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Rhemic AI',
  url: 'https://rhemicai.com',
  logo: 'https://rhemicai.com/rhemic-logo.svg',
  description:
    'Rhemic AI optimizes your business visibility in AI answer engines like ChatGPT, Claude, Perplexity, and Gemini.',
  foundingDate: '2025',
  founders: [
    { '@type': 'Person', name: 'Ittehadul Karim', jobTitle: 'CEO' },
    { '@type': 'Person', name: 'Shifat Santo', jobTitle: 'CTO' },
    { '@type': 'Person', name: 'Raahil Shaik', jobTitle: 'COO/CFO' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  email: 'contact@rhemicai.com',
  sameAs: [],
  knowsAbout: [
    'AI Engine Optimization',
    'SEO',
    'Schema Markup',
    'AI Answer Engines',
  ],
  areaServed: 'Worldwide',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'contact@rhemicai.com',
    url: 'https://cal.com/rhemic-ai/discovery-call',
  },
});

const websiteSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Rhemic AI',
  url: 'https://rhemicai.com',
  description:
    'AI Engine Optimization platform — get recommended by ChatGPT, Claude, Perplexity, and Gemini.',
  publisher: {
    '@type': 'Organization',
    name: 'Rhemic AI',
  },
});

export default function SchemaOrg() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {organizationSchema}
      </Script>
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {websiteSchema}
      </Script>
    </>
  );
}
