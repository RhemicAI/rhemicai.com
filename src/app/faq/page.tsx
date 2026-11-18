import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import AuditButton from '@/components/redesign/AuditButton';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ: ChatGPT Business Profiles, AI Visibility and Rhemic AI',
  description:
    'Answers for local business owners: what Rhemic does, how we claim and run your ChatGPT business profile and Google Business Profile, how pricing works, and what to expect each month.',
  path: '/faq',
  keywords: ['Rhemic AI FAQ', 'ChatGPT business profile', 'claim business on ChatGPT', 'AI visibility agency', 'Google Business Profile management'],
});

const faqs = [
  {
    question: 'What does Rhemic do?',
    answer:
      'Rhemic is a visibility agency for local businesses. We set up and run your ChatGPT business profile, Google Business Profile, website and reviews, so ChatGPT, Google and the other AI engines name you when a customer asks who to call.',
  },
  {
    question: 'Who do you work with?',
    answer:
      'Owner-led local service businesses in the United States. Home services lead: HVAC, plumbing, electrical, roofing and remodeling. We also work with restaurants, groomers, logistics firms, clinics and similar local categories.',
  },
  {
    question: 'What is a ChatGPT business profile?',
    answer:
      'OpenAI launched Businesses in ChatGPT on November 10, 2026. A business can claim its profile in Business Hub, verify it, and control the facts ChatGPT shows about it: name, services, location and contact details. Business Hub also shows 28 days of website clicks, mentions and the topics people ask about.',
  },
  {
    question: 'Can you claim my ChatGPT business profile for me?',
    answer:
      'We claim it with you. The person who manages the listing has to pass an identity check, so we do the claim together on a short call. After that we keep the profile complete and current every month.',
  },
  {
    question: 'Does a claimed profile make ChatGPT recommend my business?',
    answer:
      'OpenAI says a claimed profile carries no guarantee of better placement. ChatGPT decides who to recommend from everything it reads about you: your website, your Google Business Profile, your reviews and what other sites say. We work on all four.',
  },
  {
    question: 'What do you do every month?',
    answer:
      'We keep your ChatGPT and Google profiles current, grow your reviews and citations, fix and add the website pages AI engines read, and publish answer pages for the questions your customers ask. You get a monthly report with your ChatGPT and Google numbers side by side.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'We quote every business on its own needs: the number of locations, the market and the work involved. You get the price on a 30-minute discovery call.',
  },
  {
    question: 'What happens on the discovery call?',
    answer:
      'Before the call we check what ChatGPT and Google say about your business and who they name instead of you. On the call we learn your services, locations and goals, show you what we found, and quote the work.',
  },
  {
    question: 'Do you build websites?',
    answer:
      'Yes, when the business needs one. We built the sites for Kay’s Groom Room and Wava Halal Grill. For an existing site, we fix the pages and structured data that Google and AI engines read.',
  },
  {
    question: 'What is the difference between SEO, AEO and GEO?',
    answer:
      'SEO gets your pages ranked on Google and the local map. AEO (answer engine optimization) gets your business named inside AI answers. GEO (generative engine optimization) fixes what AI engines read about you on other sites before they answer. We run all three as one engagement.',
  },
  {
    question: 'Which AI engines do you cover?',
    answer:
      'ChatGPT, Google AI Overviews and Gemini, Claude, Perplexity and Microsoft Copilot. ChatGPT and Google come first because that is where most local customers ask.',
  },
  {
    question: 'How long until I see results?',
    answer:
      'The profile claim and fixes go live in the first weeks. AI engines and Google re-read your business on their own schedules, so movement in answers usually shows across weeks and months. Your monthly report shows where you stand each time.',
  },
  {
    question: 'Do you guarantee rankings or AI recommendations?',
    answer:
      'We do not guarantee rankings or AI recommendations, because no one controls those systems. You see every piece of work we do and where you show up in your monthly report.',
  },
  {
    question: 'Where are you based?',
    answer:
      'Rhemic is based in Dallas, Texas. We work with businesses across the United States.',
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <FixedNav />

      <PageHero
        subtitle="FAQ"
        title="Questions business owners ask before working with Rhemic."
        description="Straight answers about ChatGPT business profiles, Google, AI visibility, pricing and what we do every month."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="glass-panel mb-12 p-8 sm:p-12">
            <p className="section-label mb-4">
              What Rhemic does
            </p>
            <p className="text-xl text-[var(--text-primary)] leading-relaxed">
              Rhemic sets up and runs your ChatGPT business profile, Google Business Profile, website and reviews, so ChatGPT and Google name you when a customer asks who to call.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <AuditButton className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105">
                Book a discovery call
              </AuditButton>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                See how it works
              </Link>
            </div>
          </section>
        </div>

        <SubpageFAQ heading="Rhemic AI FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        heading="Keep reading"
        links={[
          {
            title: 'How It Works',
            description: 'Discovery call, claim and build, then we run it every month.',
            href: '/how-it-works',
          },
          {
            title: 'Pricing',
            description: 'Quoted per business after a discovery call.',
            href: '/pricing',
          },
          {
            title: 'Contact',
            description: 'Send us a message or book a call.',
            href: '/contact',
          },
        ]}
      />

      <Footer />
    </main>
  );
}
