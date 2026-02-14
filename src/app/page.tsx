import FixedNav from '@/components/FixedNav/FixedNav';
import Hero from '@/components/Hero/Hero';
import StatsBanner from '@/components/StatsBanner/StatsBanner';
import AEOEngine from '@/components/AEOEngine/AEOEngine';
import ProofSection from '@/components/ProofSection/ProofSection';
import Features from '@/components/Features/Features';
import DashboardPreview from '@/components/DashboardPreview/DashboardPreview';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Pricing from '@/components/Pricing/Pricing';
import CTA from '@/components/CTA/CTA';
import Footer from '@/components/Footer/Footer';
import ScrollRevealInit from '@/components/ScrollRevealInit';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-violet-500/20 selection:text-white">
      <FixedNav />
      <Hero />
      <StatsBanner />
      <AEOEngine />
      <ProofSection />
      <Features />
      <DashboardPreview />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
      <ScrollRevealInit />
    </main>
  );
}
