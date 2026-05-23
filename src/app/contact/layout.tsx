import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Rhemic AI - Book a Med Spa Growth Audit',
  description:
    'Book a 20-minute med-spa growth audit with Rhemic AI, the Dallas-based patient acquisition infrastructure company for U.S. med spas.',
  alternates: { canonical: 'https://rhemicai.com/contact' },
  openGraph: {
    title: 'Contact Rhemic AI - Book a Med Spa Growth Audit',
    description:
      'Book a 20-minute med-spa growth audit with Rhemic AI, the Dallas-based patient acquisition infrastructure company for U.S. med spas.',
    url: 'https://rhemicai.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Rhemic AI - Book a Med Spa Growth Audit',
    description:
      'Book a 20-minute med-spa growth audit with Rhemic AI, the Dallas-based patient acquisition infrastructure company for U.S. med spas.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
