import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'AI Visibility for Local Businesses: Get Recommended in AI Answers',
  description:
    'Help local businesses show up when customers ask AI for nearby providers, with visibility audits, competitor tracking, and implementation guidance built for service-area brands.',
  path: '/for-local-businesses',
  keywords: ['local business AI visibility', 'local AEO', 'ChatGPT local recommendations'],
});

export default function ForLocalBusinessesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
