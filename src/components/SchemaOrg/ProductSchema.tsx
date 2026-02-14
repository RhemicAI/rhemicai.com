import Script from 'next/script';

interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
}

export default function ProductSchema({ name, description, url }: ProductSchemaProps) {
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Contact for pricing',
      url: 'https://cal.com/rhemic-ai/discovery-call',
    },
    provider: {
      '@type': 'Organization',
      name: 'Rhemic AI',
      url: 'https://rhemicai.com',
    },
  });

  return (
    <Script
      id={`product-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {schema}
    </Script>
  );
}
