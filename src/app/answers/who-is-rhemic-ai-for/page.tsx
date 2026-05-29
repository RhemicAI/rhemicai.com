import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Who Is Rhemic AI For?',
  description:
    'Rhemic AI is built for U.S. med spas that want to find lost consult opportunities, route booking intent, and understand source context.',
  path: '/answers/who-is-rhemic-ai-for',
  keywords: ['who is Rhemic AI for', 'med spa consult leaks', 'med spa patient acquisition', 'med spa AI receptionist'],
});

export default function WhoIsRhemicAiForPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / Who is Rhemic AI for"
      title="Who is Rhemic AI for?"
      path="/answers/who-is-rhemic-ai-for"
      directAnswer="Rhemic AI is for U.S. med spas that want to find lost consult opportunities and route more booking intent to the right team across search visibility, AI answers, calls, handoffs, and source context. It is built for single-location clinics, owner-led med spas, competitive metro practices, boutique groups with two to five locations, and larger operators through Custom."
      details={
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Single-location med spas</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Diagnose is designed for one-location med spas that need to clean up the foundation:
            Google Business Profile, local SEO, reviews, treatment pages, AI search presence,
            and Lead Capture Foundation support for source preservation, missed-call opportunity mapping,
            and manual handoff visibility.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Owner-led med spas routing more intent</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Capture is the main recommendation for med spas that already have demand and want a
            stronger system for visibility, reviews, treatment-page priorities, missed-call opportunities,
            and the Consult Capture Layer for capture, routing, and source context.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Competitive metro med spas and boutique groups</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Scale fits competitive markets, premium practices, multi-treatment clinics, and
            two to five location operators. It adds the Advanced Consult Capture Layer, Meta Ads source
            view for connected-account reporting and campaign context, stronger reporting, and advanced AI receptionist scripts.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Larger med spa operators</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Custom is for six or more locations, chains, dermatology groups, PE-backed operators,
            and teams with a Custom Routing and Integration Layer for complex routing, permissions,
            audit logs, supported integrations, and custom reporting.
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
          answer: 'Capture is the main recommendation for owner-led med spas that want better visibility, better call coverage, and the Consult Capture Layer for capture, routing, and source context.',
        },
        {
          question: 'Does every plan include the AI receptionist?',
          answer: 'Yes. Every Rhemic plan includes AI receptionist coverage for common non-clinical questions, lead capture, and booking request routing. Capture and Scale add stronger missed-call recovery, more advanced scripts, and deeper reporting.',
        },
        {
          question: 'Do we need to switch booking software?',
          answer: 'No. Rhemic routes booking intent into approved handoff workflows around the tools your clinic already uses. Direct integrations with systems like Boulevard, Mangomint, Zenoti, AestheticsPro, Meevo, and similar platforms are on the roadmap.',
        },
      ]}
    />
  );
}
