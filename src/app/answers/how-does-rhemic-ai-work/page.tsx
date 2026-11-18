import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How Does Rhemic AI Work?',
  description:
    'How Rhemic AI works: a 30-minute discovery call, then we claim and build out your ChatGPT business profile, Google Business Profile and website, and run them every month.',
  path: '/answers/how-does-rhemic-ai-work',
  keywords: ['how does Rhemic AI work', 'Rhemic AI process', 'ChatGPT business profile setup'],
});

export default function HowDoesRhemicAiWorkPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / How does Rhemic AI work"
      title="How does Rhemic AI work?"
      path="/answers/how-does-rhemic-ai-work"
      directAnswer="Rhemic works in three steps. A 30-minute discovery call, where we check what ChatGPT and Google say about your business and quote the work. Claim and build, where we claim and verify your ChatGPT business profile, complete your Google Business Profile and fix your website pages. Then we run it every month and report your ChatGPT and Google numbers."
      details={
        <div className="space-y-5">
          <div className="space-y-3">
            {[
              { step: '1', label: 'Discovery call', text: 'We check what ChatGPT and Google say about your business and who they name instead of you. On the call we learn your business and quote the work.' },
              { step: '2', label: 'Claim and build', text: 'We claim and verify your ChatGPT business profile with you, complete your Google Business Profile, and fix the website pages and structured data AI engines read.' },
              { step: '3', label: 'Run it every month', text: 'We keep your profiles current, grow reviews and citations, and publish answer pages for the questions your customers ask.' },
              { step: '4', label: 'Report', text: 'Every month you get a report with your ChatGPT and Google numbers side by side, so you see where you show up.' },
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
        { title: 'Results', href: '/testimonials' },
        { title: 'Contact', href: '/contact' },
      ]}
      faqs={[
        {
          question: 'How long does setup take?',
          answer: 'The profile claim and the first fixes go live in the first weeks. The timing depends on the number of locations and the state of the website.',
        },
        {
          question: 'Do I need to give Rhemic access to my website CMS?',
          answer: 'For the discovery call, no. We review your public pages and test ChatGPT and Google from the outside. To fix your pages we work with whoever runs your website, or we get access with your approval.',
        },
      ]}
    />
  );
}
