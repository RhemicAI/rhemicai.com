import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Complete Guide to AI Engine Optimization (AEO) in 2026',
  description:
    'Learn what AEO is, how AI answer engines work, and the 5-step process to optimize your website for ChatGPT, Claude, Perplexity, and Google AI Overviews.',
  alternates: { canonical: 'https://rhemicai.com/blog/what-is-aeo' },
  openGraph: {
    title: 'The Complete Guide to AI Engine Optimization (AEO) in 2026',
    description:
      'Learn what AEO is, how AI answer engines work, and the 5-step process to optimize your website for ChatGPT, Claude, Perplexity, and Google AI Overviews.',
    url: 'https://rhemicai.com/blog/what-is-aeo',
    type: 'article',
  },
};

export default function WhatIsAEOLayout({ children }: { children: React.ReactNode }) {
  return children;
}
