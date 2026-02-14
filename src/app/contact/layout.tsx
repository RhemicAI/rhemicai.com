import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Rhemic AI - Book a Demo or Get in Touch',
  description:
    'Book a 15-minute demo, send us a message, or email contact@rhemicai.com. See how Rhemic AI transforms your AI search visibility.',
  alternates: { canonical: 'https://rhemicai.com/contact' },
  openGraph: {
    title: 'Contact Rhemic AI - Book a Demo or Get in Touch',
    description:
      'Book a demo, ask questions, or email contact@rhemicai.com about AI Engine Optimization.',
    url: 'https://rhemicai.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
