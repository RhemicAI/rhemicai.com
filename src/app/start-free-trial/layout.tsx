import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get the Audit - Rhemic AI',
  description:
    'Get a visibility and call leak audit for your med spa. Rhemic AI reviews Google visibility, AI search visibility, missed-call recovery, and booking request routing.',
  alternates: { canonical: 'https://rhemicai.com/start-free-trial' },
  openGraph: {
    title: 'Get the Audit - Rhemic AI',
    description:
      'Get a visibility and call leak audit for your med spa. Rhemic AI reviews Google visibility, AI search visibility, missed-call recovery, and booking request routing.',
    url: 'https://rhemicai.com/start-free-trial',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get the Audit - Rhemic AI',
    description:
      'Get a visibility and call leak audit for your med spa. Rhemic AI reviews Google visibility, AI search visibility, missed-call recovery, and booking request routing.',
  },
};

export default function StartFreeTrialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
