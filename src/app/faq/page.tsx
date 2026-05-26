import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ: Med Spa Consult Leaks, AI Reception, and Rhemic AI',
  description:
    'Answers for U.S. med spas evaluating Rhemic AI for search visibility leaks, call leaks, handoffs, source context, AI receptionist coverage, and Meta Ads intelligence.',
  path: '/faq',
  keywords: ['med spa growth FAQ', 'med spa AI receptionist', 'med spa missed-call recovery', 'Rhemic AI FAQ', 'med spa software integrations'],
});

const faqs = [
  {
    question: 'Who is Rhemic AI for?',
    answer:
      'Rhemic AI is built for U.S. med spas that want to improve how patients find them, trust them, reach them, and turn consult intent into a cleaner booking handoff.',
  },
  {
    question: 'What does Rhemic help a med spa improve?',
    answer:
      'Rhemic helps med spas find lost consult opportunities and route more booking intent to the right team across search visibility, AI answers, calls, handoffs, and source context.',
  },
  {
    question: 'How can Rhemic help us find revenue leaks?',
    answer:
      'Rhemic helps med spas look for places patient demand can leak before it becomes a consult opportunity: weak search and AI visibility, missed calls, after-hours intent, slow handoffs, unclear source context, and wasted ad spend signals where applicable. Rhemic does not guarantee revenue, rankings, patients, or booked consults. It helps surface and prioritize the leaks that can keep patient demand from becoming consult opportunities.',
  },
  {
    question: 'Does every Rhemic plan include the AI receptionist?',
    answer:
      'Yes. Every Rhemic plan includes AI receptionist coverage for common non-clinical questions, lead capture, and booking request routing. Growth and Premium add stronger missed-call recovery, more advanced scripts, and deeper reporting. Medical advice, diagnosis, and treatment decisions stay with licensed staff.',
  },
  {
    question: 'What does the AI receptionist actually do?',
    answer:
      'The AI receptionist answers common non-clinical questions, captures lead details, and routes booking requests to your team. It helps recover calls that would otherwise go to voicemail or get missed after hours.',
  },
  {
    question: 'Does the AI receptionist replace our front desk?',
    answer:
      'No. Rhemic does not replace your front desk. It gives your team backup coverage when calls are missed, after-hours leads come in, or staff are busy with patients.',
  },
  {
    question: 'Does the AI receptionist give medical advice?',
    answer:
      'No. The AI receptionist does not provide medical advice, diagnosis, or treatment recommendations. It only handles common non-clinical questions, lead capture, and booking request routing.',
  },
  {
    question: 'What happens when a caller asks a clinical question?',
    answer:
      'The AI receptionist should route the caller to your licensed team. Clinical decisions, treatment eligibility, diagnosis, and medical guidance stay with licensed staff.',
  },
  {
    question: 'Do we need to switch booking software?',
    answer:
      'No. Rhemic routes booking intent into approved handoff workflows around the tools your clinic already uses. Direct integrations with systems like Boulevard, Mangomint, Zenoti, AestheticsPro, Meevo, and similar platforms are on the roadmap.',
  },
  {
    question: 'Does Rhemic integrate with AestheticsPro, Boulevard, Mangomint, Zenoti, or Meevo?',
    answer:
      'Not yet as a live self-serve integration. Integrations with major med spa systems like AestheticsPro, Boulevard, Mangomint, Zenoti, Meevo, and similar platforms are on the roadmap. Today, Rhemic can still help with visibility, AI receptionist coverage, missed-call recovery, and lead routing while we scope the right integration path for your clinic.',
  },
  {
    question: 'Which med spa software systems are you planning to support?',
    answer:
      'We are prioritizing systems commonly used by U.S. med spas, including AestheticsPro, Boulevard, Mangomint, Zenoti, Meevo, and other scheduling, CRM, EMR, and practice management tools used in aesthetics. Final rollout depends on API access, compliance review, and customer demand.',
  },
  {
    question: 'Can Rhemic send leads into our current system?',
    answer:
      'In the current phase, Rhemic can capture lead details and route booking requests to your team through approved handoff workflows. Deeper CRM, scheduling, and practice-management integrations are in progress and will be added where the software supports safe API-based handoff.',
  },
  {
    question: 'Does Rhemic book appointments directly?',
    answer:
      'Not by default. Rhemic helps surface booking intent and route it into approved handoff workflows. Direct booking is planned for supported systems, where safe and integrated.',
  },
  {
    question: 'Will Rhemic integrate with our EMR?',
    answer:
      'EMR integrations are on the roadmap, but Rhemic does not need EMR access to start improving visibility, call capture, and lead routing. Any EMR integration will require a separate review for API access, permissions, data scope, and compliance requirements.',
  },
  {
    question: 'What happens before the integration is live?',
    answer:
      'Before a direct integration is live, Rhemic can use approved workflows to capture lead information, notify your team, support missed-call recovery, and give you reporting around visibility and lead response. The goal is to improve the leak points first, then deepen the connection into your existing stack.',
  },
  {
    question: 'Can we request a specific integration?',
    answer:
      'Yes. If your clinic uses a specific booking, CRM, EMR, or practice-management system, mention it during the visibility and call leak audit. We use customer demand to prioritize integration work.',
  },
  {
    question: 'What is AI search visibility?',
    answer:
      'AI search visibility helps your med spa show up when patients ask ChatGPT, Claude, Perplexity, or Google AI about treatments near them. It is one layer of the larger growth system, not the whole offer.',
  },
  {
    question: 'Is this just SEO?',
    answer:
      'No. SEO is one layer. Rhemic works across Google Maps, Google Business Profile, treatment pages, AI search visibility, reviews, missed calls, Meta Ads intelligence, and handoffs so consult opportunities are easier to surface and route.',
  },
  {
    question: 'What is Meta ads intelligence?',
    answer:
      'Meta ads intelligence is a Premium dashboard for connected Meta Ads accounts. It helps your med spa see ad performance, KPIs, costs, and optimization opportunities inside the Rhemic platform.',
  },
  {
    question: 'Does Rhemic run our ads?',
    answer:
      'Not by default. Premium includes Meta Ads intelligence for connected-account reporting and optimization visibility. Paid ad management is separate unless explicitly scoped.',
  },
  {
    question: 'Which plan includes deeper ads intelligence?',
    answer:
      'Premium includes Meta Ads source view for connected-account reporting and campaign context. Growth can include lighter competitor visibility review. Basic focuses on foundation work: visibility, GBP, reviews, AI search presence, and AI receptionist coverage.',
  },
  {
    question: 'Do you guarantee rankings, revenue, or booked consults?',
    answer:
      'No. Rhemic does not guarantee revenue, rankings, patients, or booked consults. It helps surface and prioritize the leaks that can keep patient demand from becoming consult opportunities.',
  },
  {
    question: 'How does the audit work?',
    answer:
      'Rhemic starts by reviewing visibility, local trust, treatment pages, missed-call opportunities, booking handoff, AI search presence, and competitor signals. From there, the team scopes the highest-priority fixes.',
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <FixedNav />

      <PageHero
        subtitle="FAQ"
        title="Questions med spa operators ask before working with Rhemic."
        description="Clear answers about search visibility leaks, call leaks, handoffs, source context, AI receptionist coverage, Meta Ads intelligence, pricing, and clinical boundaries."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="glass-panel mb-12 p-8 sm:p-12">
            <p className="section-label mb-4">
              What Rhemic does
            </p>
            <p className="text-xl text-[var(--text-primary)] leading-relaxed">
              Rhemic helps med spas find lost consult opportunities and route more booking intent to the right team across search visibility, AI answers, calls, handoffs, and source context.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                Review plans
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                See how it works
              </Link>
            </div>
          </section>
        </div>

        <SubpageFAQ heading="Med spa growth FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        heading="Continue the evaluation"
        links={[
          {
            title: 'How It Works',
            description: 'See how Rhemic reviews visibility, capture, and reporting gaps.',
            href: '/how-it-works',
          },
          {
            title: 'Pricing',
            description: 'Compare Basic, Growth, Premium, and Custom plans for U.S. med spas.',
            href: '/pricing',
          },
          {
            title: 'Contact',
            description: 'Start with a visibility and call leak audit.',
            href: '/contact',
          },
        ]}
      />

      <Footer />
    </main>
  );
}
