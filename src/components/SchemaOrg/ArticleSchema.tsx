import Script from 'next/script';

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  wordCount?: number;
}

export default function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  wordCount,
}: ArticleSchemaProps) {
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    wordCount,
    author: {
      '@type': 'Organization',
      name: 'Rhemic AI',
      url: 'https://rhemicai.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rhemic AI',
      url: 'https://rhemicai.com',
    },
  });

  return (
    <Script
      id={`article-schema-${title.toLowerCase().replace(/\s+/g, '-').slice(0, 40)}`}
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {schema}
    </Script>
  );
}
