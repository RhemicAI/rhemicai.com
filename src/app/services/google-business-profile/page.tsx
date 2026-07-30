import type { Metadata } from 'next';
import ServicePageLayout from '@/components/redesign/ServicePageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Google Business Profile Optimization for Local Service Businesses',
  description:
    'Google Business Profile optimization: categories, services, attributes, hours, photos, posts, Q&A, review velocity and response, NAP consistency, map pack ranking and suspension recovery. From $200/mo.',
  path: '/services/google-business-profile',
  keywords: [
    'Google Business Profile optimization',
    'map pack ranking',
    'local pack',
    'GBP suspension recovery',
    'NAP consistency',
  ],
});

export default function GbpServicePage() {
  return (
    <ServicePageLayout
      eyebrow="Services / Google Business Profile"
      title="Often the highest-revenue surface a local business owns on the internet."
      titleHighlight="highest-revenue surface"
      path="/services/google-business-profile"
      acronymLine="We run Google Business Profile optimization: the categories, services, attributes, photos, posts, Q&A and reviews that decide whether you appear in the map results customers actually tap."
      whatItIs="For most local service businesses the map result drives more calls than the website does, and it is where competitors are weakest because the work is fiddly and unglamorous. It also feeds AI answers, since generative engines lean on profile and review data when a buyer asks who to call nearby."
      schemaServiceName="Google Business Profile Optimization"
      workItems={[
        'Primary and secondary categories chosen against the searches you want, rather than the ones that sound right',
        'Services, attributes, hours, holiday hours and service areas filled out completely and kept current',
        'Photos and posts on a real cadence, since both feed freshness and both get shown',
        'Q&A seeded and monitored, because an unanswered question is a competitor opportunity',
        'Review velocity and owner responses, which are quoted directly by AI answers',
        'Name, address and phone consistency across the citation ecosystem, checked and corrected',
        'Map pack position tracked by location and by search term',
        'Suspension recovery and reinstatement appeals when a profile goes down',
        'Multi-location groups managed together, with store codes and consistent naming',
      ]}
      whatChanges={[
        'Calls from the map result go up, usually before anything on the website moves.',
        'Each location appears for the searches it should, rather than competing with itself.',
        'Reviews get answered, which is both a ranking signal and the thing buyers read.',
      ]}
      faqs={[
        {
          question: 'Does the Google Business Profile really matter more than my website?',
          answer:
            'For most local service businesses, yes, at least for phone calls. The map result appears above the organic links and it carries the call button. A thin profile with a good website usually underperforms a strong profile with an average website.',
        },
        {
          question: 'My profile was suspended. Can you get it back?',
          answer:
            'Usually. Suspensions typically trace to a category, address, name or verification detail that conflicts with Google guidelines. We identify the likely cause, correct it and file the reinstatement appeal. We cannot promise a specific outcome because the decision is Google’s.',
        },
        {
          question: 'I do not meet customers at my address. Can I still rank locally?',
          answer:
            'Yes. Service-area businesses can hide the street address and still appear for local searches. The trade-off is that a hidden address can limit map visibility, so we weigh it against how much of your demand is genuinely local. It is a decision worth making deliberately rather than by default.',
        },
        {
          question: 'How does the profile affect AI answers?',
          answer:
            'Directly. When someone asks an AI assistant who to call nearby, the profile and review data are among the strongest local signals available to it. Categories and review text in particular tend to survive into the wording of generated answers.',
        },
        {
          question: 'What does this cost?',
          answer:
            'Google Business Profile optimization is included from the Visibility plan at $200 a month, alongside AEO, GEO and SEO. Every price is published on the pricing page.',
        },
      ]}
      related={[
        { title: 'AEO', href: '/services/aeo' },
        { title: 'GEO', href: '/services/geo' },
        { title: 'SEO', href: '/services/seo' },
        { title: 'How local businesses show up in AI answers', href: '/answers/how-local-businesses-can-show-up-in-ai-answers' },
        { title: 'Pricing', href: '/pricing' },
      ]}
    />
  );
}
