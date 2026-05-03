import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How Perplexity Visibility Works and How to Improve It',
  description:
    'Perplexity cites sources in its answers. Understanding how it retrieves, ranks, and cites content is the key to improving your Perplexity visibility.',
  path: '/blog/how-perplexity-visibility-works',
  type: 'article',
  keywords: ['Perplexity visibility', 'Perplexity SEO', 'get cited by Perplexity', 'PerplexityBot'],
});

export default function PerplexityBlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
