import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Get a Rhemic AI Audit',
  description:
    'Start with a visibility and call leak audit for a U.S. med spa.',
  path: '/start-free-trial',
  keywords: ['med spa audit', 'Rhemic AI audit'],
  noindex: true,
});

export default function StartFreeTrialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
