import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How Does Rhemic AI Work?',
  description:
    'Rhemic helps U.S. med spas recover missed calls, route booking intent, and see which channels create patient demand with AI receptionist coverage.',
  path: '/answers/how-does-rhemic-ai-work',
  keywords: ['how does Rhemic AI work', 'Rhemic AI audit process', 'AI visibility audit'],
});

export default function HowDoesRhemicAiWorkPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / How does Rhemic AI work"
      title="How does Rhemic AI work?"
      path="/answers/how-does-rhemic-ai-work"
      directAnswer="Rhemic helps U.S. med spas find lost consult opportunities and route more booking intent to the right team. It reviews search visibility, AI answers, calls, handoffs, and source context so teams can prioritize the leaks that may be blocking consult opportunities."
      details={
        <div className="space-y-5">
          <div className="space-y-3">
            {[
              { step: '1', label: 'Find', text: 'Rhemic reviews where patients may fail to find the clinic across Google, AI answers, treatment pages, reviews, and local trust signals.' },
              { step: '2', label: 'Prioritize', text: 'Rhemic helps prioritize the visibility, call, handoff, and source-context leaks most likely to keep patient demand from becoming a consult opportunity.' },
              { step: '3', label: 'Route', text: 'Capture and Scale help route calls, missed calls, after-hours inquiries, website inquiries where available, and campaign handoffs into approved handoff workflows.' },
              { step: '4', label: 'Review', text: 'Rhemic helps show which sources are creating consult opportunities so the clinic can decide what to fix, pause, or expand next.' },
            ].map(({ step, label, text }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
                <span className="text-xl font-extrabold text-[var(--text-muted)] font-display shrink-0 w-6">{step}</span>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">{label}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      relatedQuestions={[
        { question: 'What is Rhemic AI?', href: '/answers/what-is-rhemic-ai' },
        { question: 'Who is Rhemic AI for?', href: '/answers/who-is-rhemic-ai-for' },
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
      ]}
      relatedPages={[
        { title: 'How It Works', href: '/how-it-works' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Contact', href: '/contact' },
      ]}
      faqs={[
        {
          question: 'How long does the initial audit take?',
          answer: 'Initial audit timing depends on the clinic, locations, and scope. Rhemic starts by reviewing visibility, calls, handoffs, and source context before recommending next steps.',
        },
        {
          question: 'Do I need to give Rhemic access to my website CMS?',
          answer: 'No. Rhemic audits your publicly accessible content and runs prompt tests externally. You do not need to grant CMS access for the audit.',
        },
      ]}
    />
  );
}
