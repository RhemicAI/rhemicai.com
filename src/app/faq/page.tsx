import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ: Med Spa Growth, AI Reception, and Rhemic AI',
  description:
    'Answers for U.S. med spas evaluating Rhemic AI for Google visibility, AI search visibility, reviews, treatment pages, missed-call recovery, AI receptionist coverage, and competitor ads intelligence.',
  path: '/faq',
  keywords: ['med spa growth FAQ', 'med spa AI receptionist', 'med spa missed-call recovery', 'Rhemic AI FAQ'],
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
      'Rhemic helps improve Google Business Profile, Google Maps visibility, local SEO, reviews, treatment pages, citations, schema, AI search visibility, missed-call recovery, AI receptionist coverage, competitor ads intelligence, and closed-loop reporting.',
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
      'No. The AI receptionist does not provide medical advice, diagnosis, treatment recommendations, or clinical intake. It only handles common non-clinical questions, lead capture, and booking request routing.',
  },
  {
    question: 'What happens when a caller asks a clinical question?',
    answer:
      'The AI receptionist should route the caller to your licensed team. Clinical decisions, treatment eligibility, diagnosis, and medical guidance stay with licensed staff.',
  },
  {
    question: 'Do we need to switch booking systems or CRMs?',
    answer:
      "No. Rhemic should integrate with or route into the clinic's existing booking flow when possible. The audit identifies the cleanest handoff before implementation begins.",
  },
  {
    question: 'What is AI search visibility?',
    answer:
      'AI search visibility helps your med spa show up when patients ask ChatGPT, Claude, Perplexity, or Google AI about treatments near them. It is one layer of the larger growth system, not the whole offer.',
  },
  {
    question: 'Is this just SEO?',
    answer:
      'No. SEO is one layer. Rhemic works across Google Maps, Google Business Profile, treatment pages, AI search visibility, reviews, missed calls, competitor ads intelligence, and lead response so consult opportunities are easier to find, trust, and route.',
  },
  {
    question: 'What is Meta ads intelligence?',
    answer:
      'Meta ads intelligence helps Rhemic understand what competitors are promoting across Facebook and Instagram, including offers, treatments, creative angles, and market positioning. It helps your med spa see what the market is pushing before deciding what to fix or test.',
  },
  {
    question: 'Does Rhemic run our ads?',
    answer:
      "Not by default. Rhemic's core offer is visibility, capture, and closed-loop reporting. Premium includes deeper competitor ads intelligence. Paid ad management is separate unless explicitly scoped.",
  },
  {
    question: 'Which plan includes deeper ads intelligence?',
    answer:
      'Premium includes deeper Meta ads intelligence and competitor tracking. Growth can include lighter competitor visibility review. Basic focuses on foundation work: visibility, GBP, reviews, AI search presence, and AI receptionist coverage.',
  },
  {
    question: 'Do you guarantee rankings, revenue, or booked consults?',
    answer:
      'No. Rhemic helps identify and improve visibility, trust, and response gaps. It does not promise search placement, revenue, clinical outcomes, patient volume, or booked consult volume.',
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
        description="Clear answers about Google visibility, AI search, AI receptionist coverage, missed calls, competitor ads intelligence, pricing, and clinical boundaries."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="glass-panel mb-12 p-8 sm:p-12">
            <p className="section-label mb-4">
              What Rhemic does
            </p>
            <p className="text-xl text-[var(--text-primary)] leading-relaxed">
              Rhemic helps U.S. med spas get found on Google and AI search, answer more leads when staff are busy or after hours, recover missed-call opportunities, and route booking requests to the team.
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
