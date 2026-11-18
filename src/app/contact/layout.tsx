import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Rhemic AI: Book a Discovery Call',
  description:
    'Contact Rhemic AI or book a 30-minute discovery call. We check what ChatGPT and Google say about your business and quote the work it needs.',
  path: '/contact',
  keywords: ['Rhemic AI contact', 'book a discovery call', 'ChatGPT business profile agency', 'AI visibility agency'],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
