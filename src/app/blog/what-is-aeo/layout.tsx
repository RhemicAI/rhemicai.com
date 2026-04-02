import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'The Complete Guide to AI Engine Optimization (AEO) in 2026',
  description:
    'Learn what AEO is, how AI answer engines work, and the 5-step process to optimize your website for ChatGPT, Claude, Perplexity, and Google AI Overviews.',
  path: '/blog/what-is-aeo',
  type: 'article',
  keywords: ['what is AEO', 'AI Engine Optimization guide', 'answer engine optimization'],
});

export default function WhatIsAEOLayout({ children }: { children: React.ReactNode }) {
  return children;
}
