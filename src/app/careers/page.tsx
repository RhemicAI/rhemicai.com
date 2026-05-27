import type { Metadata } from 'next';
import CareersApplicationClient from '@/components/Careers/CareersApplicationClient';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';

export const metadata: Metadata = {
  title: 'Careers - Join the Rhemic AI Team',
  description:
    "Join Rhemic AI and help U.S. med spas find lost consult opportunities across visibility, calls, handoffs, and source context.",
  alternates: { canonical: 'https://rhemicai.com/careers' },
  openGraph: {
    title: 'Careers - Join the Rhemic AI Team',
    description:
      "Join Rhemic AI and help U.S. med spas find lost consult opportunities.",
    url: 'https://rhemicai.com/careers',
  },
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <FixedNav />

      <PageHero
        subtitle="Careers"
        title="Build the systems that remove founder bottlenecks."
        description="Rhemic is hiring operators and builders who can plug into real work: sales follow-up, client onboarding, fulfillment delivery, and internal automation."
        showBackLink={false}
      />

      <CareersApplicationClient />

      <RelatedLinks
        heading="Learn more about Rhemic AI"
        links={[
          {
            title: 'About Us',
            description: 'Meet the team and learn about our mission and values.',
            href: '/about',
          },
          {
            title: 'Pricing',
            description: 'Transparent Basic, Growth, Premium, and Custom plans for U.S. med spas.',
            href: '/pricing',
          },
          {
            title: 'Contact Us',
            description: 'Reach out with questions about opportunities at Rhemic AI.',
            href: '/contact',
          },
        ]}
      />

      <Footer />
    </main>
  );
}
