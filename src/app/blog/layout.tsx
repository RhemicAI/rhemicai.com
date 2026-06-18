import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Blog: AI Visibility and Local Business Growth',
  description:
    'Operator-grade field notes on getting local service businesses found, recommended, and booked across search and AI answer engines.',
  path: '/blog',
  keywords: [
    'AI visibility for local businesses',
    'home services AI recommendations',
    'get recommended by AI',
    'local business SEO AEO',
  ],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
