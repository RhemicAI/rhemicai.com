import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Book a Visibility and Call Leak Audit',
  description:
    'Contact Rhemic AI to review where your business is losing customers across Google, AI answers, the local map, and the calls and forms that go unanswered.',
  path: '/contact',
  keywords: ['AI visibility audit', 'local business visibility audit', 'Rhemic AI contact', 'answer engine optimization audit'],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
