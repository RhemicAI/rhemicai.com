import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - AI Search Optimization Insights',
  description:
    'Articles, research, and strategies on AI Engine Optimization. Learn how to improve your visibility in ChatGPT, Claude, Perplexity, and Gemini.',
  alternates: { canonical: 'https://rhemicai.com/blog' },
  openGraph: {
    title: 'Blog - AI Search Optimization Insights | Rhemic AI',
    description:
      'Articles and strategies on AI Engine Optimization and visibility in AI answer engines.',
    url: 'https://rhemicai.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
