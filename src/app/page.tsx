import FixedNav from '@/components/FixedNav/FixedNav';
import Hero from '@/components/Hero/Hero';
import OutcomeStrip from '@/components/OutcomeStrip/OutcomeStrip';
import ProductShowcase from '@/components/ProductShowcase/ProductShowcase';
import ConsultCaptureLayer from '@/components/ConsultCaptureLayer/ConsultCaptureLayer';
import Testimonials from '@/components/Testimonials/Testimonials';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Features from '@/components/Features/Features';
import Pricing from '@/components/Pricing/Pricing';
import FAQ from '@/components/FAQ/FAQ';
import CTA from '@/components/CTA/CTA';
import Footer from '@/components/Footer/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo';
import { customPlan, plans } from '@/data/pricing';

const homepageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rhemic AI Med Spa Growth and Call Capture System',
    description:
      'Rhemic helps U.S. med spas recover missed calls, route booking intent, and see which channels create patient demand with AI receptionist coverage.',
    provider: {
      '@type': 'Organization',
      name: 'Rhemic AI',
      url: absoluteUrl('/'),
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'U.S. med spa owners and operators',
    },
    serviceType: [
      'Google Business Profile optimization',
      'Local SEO for med spas',
      'AI receptionist coverage',
      'Missed-call recovery',
      'Consult Capture Layer',
      'Source-aware reporting',
      'Meta Ads intelligence',
    ],
    offers: {
      '@type': 'OfferCatalog',
      name: 'Rhemic AI med spa plans',
      itemListElement: [
        ...plans.map((plan) => ({
          '@type': 'Offer',
          name: plan.name,
          price: plan.monthlyPrice,
          priceCurrency: 'USD',
          description: plan.primaryUseCase,
          url: absoluteUrl('/pricing'),
        })),
        {
          '@type': 'Offer',
          name: customPlan.name,
          description: customPlan.primaryUseCase,
          url: absoluteUrl('/pricing'),
        },
      ],
    },
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <JsonLd id="homepage-med-spa-schema" data={homepageSchema} />
      <FixedNav />
      <Hero />
      <OutcomeStrip />
      <ProductShowcase />
      <ConsultCaptureLayer />
      <Testimonials />
      <HowItWorks />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
