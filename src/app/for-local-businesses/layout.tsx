import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Visibility for Local Businesses — Roofers, Plumbers, HVAC & More',
  description:
    'Find out if AI is sending customers to your competitors instead of you. Free 60-second scan across ChatGPT, Claude, Gemini & Perplexity. Plans from $199/mo.',
  alternates: { canonical: 'https://rhemicai.com/for-local-businesses' },
  openGraph: {
    title: 'AI Visibility for Local Businesses — Roofers, Plumbers, HVAC & More',
    description:
      'When someone asks AI "best roofer near me" — do you show up? Free scan, 60 seconds. No signup required.',
    url: 'https://rhemicai.com/for-local-businesses',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Visibility for Local Businesses | Rhemic AI',
    description:
      'Find out if AI is sending customers to your competitors. Free 60-second scan.',
  },
};

export default function ForLocalBusinessesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
