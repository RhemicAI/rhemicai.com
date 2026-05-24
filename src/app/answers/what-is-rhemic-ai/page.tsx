import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'What Is Rhemic AI?',
  description:
    'Rhemic AI is a growth operating system for U.S. med spas that helps clinics get found, capture booking intent, route requests, and understand which sources are creating consult opportunities.',
  path: '/answers/what-is-rhemic-ai',
  keywords: ['what is Rhemic AI', 'med spa growth operating system', 'med spa AI receptionist', 'med spa missed-call recovery'],
});

export default function WhatIsRhemicAiPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / What is Rhemic AI"
      title="What is Rhemic AI?"
      path="/answers/what-is-rhemic-ai"
      directAnswer="Rhemic AI is a growth operating system for U.S. med spas. Rhemic helps med spas get found, capture booking intent, route requests to the right team, and understand which sources are creating consult opportunities."
      details={
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Rhemic AI is built for med spa owners and operators who need more booked consults from the
            channels patients already use. That includes Google Maps, Google Business Profile, reviews,
            treatment pages, local SEO, AI answers, missed calls, lead routing, and reporting that connects
            demand back to source context.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            The system starts with visibility and trust. Rhemic reviews how a clinic appears across
            Google, AI search systems such as ChatGPT, Claude, Perplexity, and Google AI, review signals,
            citations, schema, and treatment-page content. The goal is to identify where patient intent
            is being lost before it turns into a consult request.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Rhemic also helps with capture. Every plan includes AI receptionist coverage for common
            non-clinical questions, lead capture, and booking request routing. Medical advice, diagnosis,
            and treatment decisions stay with licensed staff.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Growth and Premium include the Consult Capture Layer, defined as capture, routing, and source
            context. It helps route booking intent from calls, missed calls, after-hours inquiries, website
            inquiries where available, and campaign handoffs into approved handoff workflows.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Rhemic AI is based in Dallas, Texas and serves U.S. med spas. Public plans are Basic,
            Growth, Premium, and Custom. Growth is the main recommendation for owner-led med spas
            trying to grow consult volume, while Premium adds deeper market visibility, Meta Ads source
            view for connected-account reporting and campaign context, and stronger reporting for competitive clinics and boutique multi-location groups.
          </p>
        </div>
      }
      example={
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          A Dallas med spa is getting searches for Botox, fillers, laser, facials, and body contouring,
          but consult requests are leaking through a weak Google Business Profile, thin treatment pages,
          inconsistent reviews, missed calls, and slow after-hours follow-up. Rhemic audits those leak
          points, prioritizes fixes, and helps route more buyer intent into approved handoff workflows.
        </p>
      }
      relatedQuestions={[
        { question: 'Who is Rhemic AI for?', href: '/answers/who-is-rhemic-ai-for' },
        { question: 'How does Rhemic AI work?', href: '/answers/how-does-rhemic-ai-work' },
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
        { question: 'How can med spas use AI search visibility?', href: '/ai-search-visibility' },
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
          question: 'Is Rhemic AI only for med spas?',
          answer: 'The current public offer is built for U.S. med spas, including single-location clinics, owner-led med spas, competitive metro practices, boutique groups, and larger operators through Custom.',
        },
        {
          question: 'What does the AI receptionist do?',
          answer: 'The AI receptionist answers common non-clinical questions, captures lead details, and routes booking requests to your team. Medical advice, diagnosis, and treatment decisions stay with licensed staff.',
        },
        {
          question: 'Does Rhemic help with Google as well as AI search?',
          answer: 'Yes. Rhemic works across Google Business Profile, Google Maps, local SEO, reviews, treatment pages, schema, AI search visibility, missed-call recovery, approved handoff workflows, and source-aware reporting.',
        },
        {
          question: 'Does Rhemic book appointments directly?',
          answer: 'Not by default. Rhemic captures booking intent and routes requests to your team. Direct booking is planned for supported systems and enabled only when the workflow can be safely integrated.',
        },
      ]}
    />
  );
}
