import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Schema Markup for AI Visibility: Which Types Matter Most',
  description:
    'A practical guide to the schema markup types that most improve AI answer engine visibility — FAQPage, Organization, Service, LocalBusiness, and BreadcrumbList.',
  path: '/blog/schema-markup-for-ai-visibility',
  type: 'article',
  keywords: ['schema markup AI visibility', 'FAQPage schema', 'schema for AEO', 'structured data AI answers'],
});

export default function SchemaBlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
