import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Rhemic AI - Get a Med Spa Visibility and Call Leak Audit',
  description:
    'Get a visibility and call leak audit with Rhemic AI, the Dallas-based growth operating system for U.S. med spas.',
  alternates: { canonical: 'https://rhemicai.com/contact' },
  openGraph: {
    title: 'Contact Rhemic AI - Get a Med Spa Visibility and Call Leak Audit',
    description:
      'Get a visibility and call leak audit with Rhemic AI, the Dallas-based growth operating system for U.S. med spas.',
    url: 'https://rhemicai.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Rhemic AI - Get a Med Spa Visibility and Call Leak Audit',
    description:
      'Get a visibility and call leak audit with Rhemic AI, the Dallas-based growth operating system for U.S. med spas.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
