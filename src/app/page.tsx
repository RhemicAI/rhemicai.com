import FixedNav from '@/components/FixedNav/FixedNav';
import Hero from '@/components/Hero/Hero';
import OutcomeStrip from '@/components/OutcomeStrip/OutcomeStrip';
import ProductShowcase from '@/components/ProductShowcase/ProductShowcase';
import Testimonials from '@/components/Testimonials/Testimonials';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Features from '@/components/Features/Features';
import Pricing from '@/components/Pricing/Pricing';
import FAQ from '@/components/FAQ/FAQ';
import CTA from '@/components/CTA/CTA';
import Footer from '@/components/Footer/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteUrl, organizationSchema, websiteSchema } from '@/lib/seo';
import { customPlan, plans } from '@/data/pricing';

const homepageFaqs = [
  {
    question: 'Does every Rhemic plan include the AI receptionist?',
    answer:
      'Yes. Every Rhemic plan includes AI receptionist coverage for common non-clinical questions, lead capture, and booking request routing. Growth and Premium add stronger missed-call recovery, more advanced scripts, and deeper reporting. Medical advice, diagnosis, and treatment decisions stay with licensed staff.',
  },
  {
    question: 'Does the AI receptionist give medical advice?',
    answer:
      'No. The AI receptionist answers common non-clinical questions, captures lead details, and routes booking requests to your team. Medical advice, diagnosis, and treatment decisions stay with licensed staff.',
  },
  {
    question: 'What is Meta Ads intelligence?',
    answer:
      'Meta Ads intelligence is a Premium dashboard for connected Meta Ads accounts. It helps your med spa see ad performance, KPIs, costs, and optimization opportunities inside the Rhemic platform.',
  },
  {
    question: 'Which plan is the main recommendation?',
    answer:
      'Growth is the main recommendation for owner-led med spas trying to grow consult volume. Basic is for foundation cleanup, Premium is for competitive markets and two to five location operators, and Custom is for larger or more complex groups.',
  },
  {
    question: 'Does Rhemic integrate with med spa software?',
    answer:
      'Direct integrations with systems like AestheticsPro, Boulevard, Mangomint, Zenoti, Meevo, and similar platforms are on the roadmap. Today, Rhemic can capture lead details, support missed-call recovery, and route booking requests through approved handoff workflows.',
  },
];

const homepageSchema = [
  organizationSchema(),
  websiteSchema(),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rhemic AI Med Spa Growth System',
    description:
      'Growth operating system for U.S. med spas that improves Google visibility, AI search visibility, reviews, treatment pages, AI receptionist coverage, missed-call recovery, lead routing, Meta Ads intelligence, and booked consult tracking.',
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
      'Meta Ads intelligence',
      'Booked consult tracking',
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
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
