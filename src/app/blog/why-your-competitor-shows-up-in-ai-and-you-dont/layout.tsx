import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Why Your Competitor Shows Up in AI Answers and You Do Not',
  description:
    'The structural reasons competitors appear in ChatGPT, Perplexity, and Gemini answers when you do not — and the specific fixes for each gap.',
  path: '/blog/why-your-competitor-shows-up-in-ai-and-you-dont',
  type: 'article',
  keywords: ['competitor in AI answers', 'why competitor shows up ChatGPT', 'AI recommendation gap analysis'],
});

export default function CompetitorBlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
