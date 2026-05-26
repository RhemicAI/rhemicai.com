import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Book a Visibility and Call Leak Audit',
  description:
    'Contact Rhemic AI to review where your U.S. med spa may be losing consult opportunities across search visibility, AI answers, calls, handoffs, and source context.',
  path: '/contact',
  keywords: ['med spa visibility audit', 'med spa call leak audit', 'Rhemic AI contact', 'med spa consult opportunity audit'],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
