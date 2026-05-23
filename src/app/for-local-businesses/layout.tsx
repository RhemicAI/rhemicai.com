import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Rhemic AI for U.S. Med Spas',
  description:
    'Rhemic AI is now focused on U.S. med spas that need Google visibility, AI search visibility, AI receptionist coverage, missed-call recovery, and booked consult tracking.',
  path: '/for-local-businesses',
  keywords: ['med spa growth operating system', 'med spa AI receptionist', 'med spa patient acquisition'],
  noindex: true,
});

export default function ForLocalBusinessesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
