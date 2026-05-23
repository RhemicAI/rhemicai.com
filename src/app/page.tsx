import FixedNav from '@/components/FixedNav/FixedNav';
import Hero from '@/components/Hero/Hero';
import StatsStrip from '@/components/StatsStrip/StatsStrip';
import AeoExplainer from '@/components/AeoExplainer/AeoExplainer';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Features from '@/components/Features/Features';
import DashboardPreview from '@/components/DashboardPreview/DashboardPreview';
import Pricing from '@/components/Pricing/Pricing';
import FAQ from '@/components/FAQ/FAQ';
import CTA from '@/components/CTA/CTA';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <FixedNav />
      <Hero />
      <AeoExplainer />
      <StatsStrip />
      <Features />
      <HowItWorks />
      <Pricing />
      <DashboardPreview />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
