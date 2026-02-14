import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - AI Search Optimization Insights',
  description:
    'Articles, research, and updates on AI search optimization, AEO strategies, and visibility in AI-generated answers from ChatGPT, Claude, and Perplexity.',
  alternates: { canonical: 'https://rhemicai.com/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
