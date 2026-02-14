import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Rhemic AI - Book a Demo or Get in Touch',
  description:
    'Book a 15-minute demo, send us a message, or email contact@rhemicai.com. See how Rhemic AI can transform your visibility in AI-generated search results.',
  alternates: { canonical: 'https://rhemicai.com/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
