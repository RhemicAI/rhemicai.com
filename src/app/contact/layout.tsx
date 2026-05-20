import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Rhemic AI - Get in Touch',
  description:
    'Book a 30-minute demo, send us a message, or email contact@rhemicai.com. See how Rhemic AI transforms your AI search visibility.',
  alternates: { canonical: 'https://rhemicai.com/contact' },
  openGraph: {
    title: 'Contact Rhemic AI - Get in Touch',
    description:
      'Book a 30-minute demo, send us a message, or email contact@rhemicai.com. See how Rhemic AI transforms your AI search visibility.',
    url: 'https://rhemicai.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Rhemic AI - Get in Touch',
    description:
      'Book a 30-minute demo, send us a message, or email contact@rhemicai.com. See how Rhemic AI transforms your AI search visibility.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
