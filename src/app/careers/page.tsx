import type { Metadata } from 'next';
import CareersApplicationClient from '@/components/Careers/CareersApplicationClient';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';

export const metadata: Metadata = {
  title: 'Careers - Join the Rhemic AI Team',
  description:
    "Join Rhemic AI and help local businesses get named by ChatGPT and Google when customers ask who to call.",
  alternates: { canonical: 'https://rhemicai.com/careers' },
  openGraph: {
    title: 'Careers - Join the Rhemic AI Team',
    description:
      "Join Rhemic AI and help local businesses get named by ChatGPT and Google.",
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
        description="We are currently hiring for SDR / Appointment Setter. Additional operations, fulfillment, and engineering roles are coming soon."
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
            title: 'Results',
            description: 'The businesses we got ChatGPT and Google to name.',
            href: '/testimonials',
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
