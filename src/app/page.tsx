'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import FixedNav from '@/components/FixedNav/FixedNav';
import Hero from '@/components/Hero/Hero';
import BehaviorShiftSection from '@/components/BehaviorShiftSection/BehaviorShiftSection';
import ProofSection from '@/components/ProofSection/ProofSection';
import StakesSection from '@/components/StakesSection/StakesSection';
import TransformationSection from '@/components/TransformationSection/TransformationSection';
import VisionSection from '@/components/VisionSection/VisionSection';
import WhyUsSection from '@/components/WhyUsSection/WhyUsSection';
import AiVisibilityWidget from '@/components/AiVisibilityWidget/AiVisibilityWidget';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import DashboardPreview from '@/components/DashboardPreview/DashboardPreview';
import AEOEngine from '@/components/AEOEngine/AEOEngine';
import Testimonials from '@/components/Testimonials/Testimonials';
import Pricing from '@/components/Pricing/Pricing';
import FAQ from '@/components/FAQ/FAQ';
import CTA from '@/components/CTA/CTA';
import Footer from '@/components/Footer/Footer';

function slowScrollTo(id: string, duration = 2200) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = window.scrollY;
  const end = el.getBoundingClientRect().top + window.scrollY - 80;
  const startTime = performance.now();
  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + (end - start) * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href="#ai-visibility-scan"]');
      if (!anchor) return;
      e.preventDefault();
      slowScrollTo('ai-visibility-scan');
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <main className="min-h-screen selection:bg-violet-500/20 selection:text-white">
      <FixedNav />
      <Hero key={pathname} />
      <AiVisibilityWidget />
      <BehaviorShiftSection />
      <ProofSection />
      <StakesSection />
      <TransformationSection />
      <VisionSection />
      <WhyUsSection />
      <HowItWorks />
      <DashboardPreview />
      <AEOEngine />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
