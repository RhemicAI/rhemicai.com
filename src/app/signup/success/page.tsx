import { Suspense } from 'react';
import type { Metadata } from 'next';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import SuccessClient from './SuccessClient';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Welcome to Rhemic AI',
  description: 'Your signup is being processed.',
  path: '/signup/success',
});

export default function SignupSuccessPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <FixedNav />
      <Suspense fallback={null}>
        <SuccessClient />
      </Suspense>
      <Footer />
    </main>
  );
}
