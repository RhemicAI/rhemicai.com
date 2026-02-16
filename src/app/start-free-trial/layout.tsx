import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Free Trial - Try AI Engine Optimization',
  description:
    'Get a custom AEO trial for your business. Website audit, competitor benchmarking, and AEO score baseline included. Book a 15-minute discovery call.',
  alternates: { canonical: 'https://rhemicai.com/start-free-trial' },
  openGraph: {
    title: 'Start Free Trial - Try AI Engine Optimization',
    description:
      'Get a custom AEO trial. Website audit, competitor benchmarking, and AEO score baseline included.',
    url: 'https://rhemicai.com/start-free-trial',
  },
};

export default function StartFreeTrialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
