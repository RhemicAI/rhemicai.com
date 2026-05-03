import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How Does Rhemic AI Work?',
  description:
    'Rhemic AI runs visibility audits across ChatGPT, Claude, Perplexity, and Gemini to measure your citation rate, identify competitor gaps, and deliver prioritized AEO recommendations.',
  path: '/answers/how-does-rhemic-ai-work',
  keywords: ['how does Rhemic AI work', 'Rhemic AI audit process', 'AI visibility audit'],
});

export default function HowDoesRhemicAiWorkPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / How does Rhemic AI work"
      title="How does Rhemic AI work?"
      path="/answers/how-does-rhemic-ai-work"
      directAnswer="Rhemic runs structured prompt audits across ChatGPT, Claude, Perplexity, and Gemini to measure how often your business is cited. It identifies which competitors are being recommended in your place, what content and structural gaps are causing your absence, and delivers a prioritized implementation plan with specific fixes."
      details={
        <div className="space-y-5">
          <div className="space-y-3">
            {[
              { step: '1', label: 'Audit', text: 'Rhemic maps the buyer-intent prompts relevant to your business and category. It then runs those prompts across ChatGPT, Claude, Perplexity, and Gemini to record whether your business appears, which competitors appear, and what context they appear in.' },
              { step: '2', label: 'Analysis', text: 'The audit results are analyzed against your site structure, schema coverage, entity signals, and content depth. Rhemic identifies the specific gaps causing your absence and ranks them by impact.' },
              { step: '3', label: 'Recommendations', text: 'You receive a prioritized implementation plan. This includes technical fixes (schema markup, crawlability, metadata), content improvements (FAQ pages, service page depth, entity clarity), and competitive coverage gaps to close.' },
              { step: '4', label: 'Implementation', text: 'Depending on your plan, Rhemic provides implementation guidance, code-level outputs for schema, and review of completed changes. Higher-tier plans include recurring re-scans to track visibility movement over time.' },
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
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
        { question: 'How do I improve my ChatGPT visibility?', href: '/answers/how-to-improve-chatgpt-visibility' },
      ]}
      relatedPages={[
        { title: 'How It Works', href: '/how-it-works' },
        { title: 'Sample Report', href: '/sample-ai-visibility-report' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Free AI Visibility Check', href: '/free-ai-visibility-check' },
      ]}
      faqs={[
        {
          question: 'How long does the initial audit take?',
          answer: 'Initial audits are typically delivered within a few business days of onboarding. Turnaround depends on the scope of prompts and the number of competitors tracked.',
        },
        {
          question: 'Do I need to give Rhemic access to my website CMS?',
          answer: 'No. Rhemic audits your publicly accessible content and runs prompt tests externally. You do not need to grant CMS access for the audit.',
        },
      ]}
    />
  );
}
