import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ConsultLeakCalculator from '@/components/ConsultLeakCalculator/ConsultLeakCalculator';
import MinimalHeader from '@/components/ConsultLeakCalculator/MinimalHeader';

export const metadata: Metadata = buildMetadata({
  title: 'Free Consult Leak Calculator',
  description:
    'Free 60-second calculator that estimates what missed calls and lost booking intent cost your med spa in new-patient revenue every month, using your own numbers.',
  path: '/free-consult-leak-calculator',
  keywords: [
    'med spa consult leak calculator',
    'med spa missed calls calculator',
    'med spa revenue leak',
    'med spa patient acquisition',
    'med spa booking intent',
    'consult leak calculator',
    'med spa call recovery',
    'missed call revenue estimator',
    'med spa AI receptionist',
  ],
});

export default function FreeConsultLeakCalculatorPage() {
  return (
    <>
      <MinimalHeader />
      <ConsultLeakCalculator />
    </>
  );
}
