import { Suspense } from 'react';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import SignupClient from './SignupClient';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <FixedNav />
      <Suspense fallback={null}>
        <SignupClient />
      </Suspense>
      <Footer />
    </main>
  );
}
