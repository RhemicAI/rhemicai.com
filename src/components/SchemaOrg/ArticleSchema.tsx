import JsonLd from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/seo';

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  wordCount?: number;
  image?: string;
}

export default function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  wordCount,
  image = 'https://rhemicai.com/rhemic-logo.svg',
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    wordCount,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <JsonLd
      id={`article-schema-${title.toLowerCase().replace(/\s+/g, '-').slice(0, 40)}`}
      data={schema}
    />
  );
}
