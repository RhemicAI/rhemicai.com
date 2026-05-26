import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Rhemic AI for U.S. Med Spas',
  description:
    'Rhemic AI is focused on U.S. med spas that need to find lost consult opportunities across search visibility, AI answers, calls, handoffs, and source context.',
  path: '/for-local-businesses',
  keywords: ['med spa consult opportunity system', 'med spa AI receptionist', 'med spa patient acquisition'],
  noindex: true,
});

export default function ForLocalBusinessesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
