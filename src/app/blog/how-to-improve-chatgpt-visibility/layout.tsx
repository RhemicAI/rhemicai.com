import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How to Improve Your ChatGPT Visibility: A Practical Guide',
  description:
    'The structural and content changes that move the needle on ChatGPT recommendations — entity clarity, schema, FAQ pages, and AI crawler access.',
  path: '/blog/how-to-improve-chatgpt-visibility',
  type: 'article',
  keywords: ['improve ChatGPT visibility', 'ChatGPT recommendations', 'get recommended by ChatGPT'],
});

export default function HowToImproveChatgptVisibilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
