import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How Local Businesses Get Recommended in AI Answers',
  description:
    'A practical guide for local service businesses on the specific signals that drive AI recommendations — entity clarity, local schema, FAQ content, and review signals.',
  path: '/blog/local-business-ai-recommendations',
  type: 'article',
  keywords: ['local business AI recommendations', 'AI local search visibility', 'get recommended ChatGPT local'],
  noindex: true,
});

export default function LocalBusinessBlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
