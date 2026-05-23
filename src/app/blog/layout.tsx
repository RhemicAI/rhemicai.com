import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Blog: AI Engine Optimization Guides, Research, and Playbooks',
  description:
    'Operator-grade guides on AI Engine Optimization, answer engine visibility audits, schema strategy, local AI discovery, and competitive monitoring.',
  path: '/blog',
  keywords: ['AI Engine Optimization blog', 'AEO guides', 'AI visibility research'],
  noindex: true,
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
