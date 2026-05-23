import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Who Is Rhemic AI For?',
  description:
    'Rhemic AI is built for U.S. med spas that want more booked consults from Google visibility, AI search visibility, reviews, missed-call recovery, AI receptionist coverage, and better lead routing.',
  path: '/answers/who-is-rhemic-ai-for',
  keywords: ['who is Rhemic AI for', 'med spa growth operating system', 'med spa patient acquisition', 'med spa AI receptionist'],
});

export default function WhoIsRhemicAiForPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / Who is Rhemic AI for"
      title="Who is Rhemic AI for?"
      path="/answers/who-is-rhemic-ai-for"
      directAnswer="Rhemic AI is for U.S. med spas that want to turn more searches and missed calls into booked consults. It is built for single-location clinics, owner-led med spas, competitive metro practices, boutique groups with two to five locations, and larger operators through Custom."
      details={
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Single-location med spas</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Basic is designed for one-location med spas that need to clean up the foundation:
            Google Business Profile, local SEO, reviews, treatment pages, AI search presence,
            and basic call capture.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Owner-led med spas growing consult volume</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Growth is the main recommendation for med spas that already have demand and want a
            stronger system for visibility, reviews, treatment-page priorities, missed-call recovery,
            lead capture, and consult follow-up.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Competitive metro med spas and boutique groups</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Premium fits competitive markets, premium practices, multi-treatment clinics, and
            two to five location operators. It adds deeper competitor tracking, Meta Ads intelligence
            through a connected-account dashboard, stronger reporting, and advanced AI receptionist scripts.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Larger med spa operators</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Custom is for six or more locations, chains, dermatology groups, PE-backed operators,
            and teams with complex routing, reporting, or rollout needs.
          </p>
        </div>
      }
      relatedQuestions={[
        { question: 'What is Rhemic AI?', href: '/answers/what-is-rhemic-ai' },
        { question: 'How does Rhemic AI work?', href: '/answers/how-does-rhemic-ai-work' },
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
        { question: 'How can med spas improve AI search visibility?', href: '/ai-search-visibility' },
      ]}
      relatedPages={[
        { title: 'How It Works', href: '/how-it-works' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'FAQ', href: '/faq' },
      ]}
      ctaLabel="Get the audit"
      ctaHref="/contact"
      faqs={[
        {
          question: 'Which plan is the main recommendation?',
          answer: 'Growth is the main recommendation for owner-led med spas that want more consults, better visibility, better call coverage, and clearer demand signals.',
        },
        {
          question: 'Does every plan include the AI receptionist?',
          answer: 'Yes. Every Rhemic plan includes AI receptionist coverage for common non-clinical questions, lead capture, and booking request routing. Growth and Premium add stronger missed-call recovery, more advanced scripts, and deeper reporting.',
        },
        {
          question: 'Do clinics need to switch software to start?',
          answer: 'No. Rhemic is being built to work around the systems med spas already use. Direct integrations with major med spa systems are on the roadmap, and current handoff workflows can route booking requests to your team.',
        },
      ]}
    />
  );
}
