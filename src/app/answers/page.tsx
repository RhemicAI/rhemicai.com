import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Rhemic AI Answers for Med Spa Operators',
  description:
    'Direct answers about Rhemic AI, med spa growth infrastructure, AI receptionist coverage, AI search visibility, Consult Capture Layer support, and source-aware reporting.',
  path: '/answers',
  keywords: ['Rhemic AI answers', 'med spa growth FAQ', 'med spa AI receptionist'],
});

const answerPages = [
  {
    href: '/answers/what-is-rhemic-ai',
    title: 'What is Rhemic AI?',
    description: 'A growth operating system for U.S. med spas that helps clinics get found, capture booking intent, route requests, and understand source context.',
  },
  {
    href: '/answers/who-is-rhemic-ai-for',
    title: 'Who is Rhemic AI for?',
    description: 'Rhemic AI is for U.S. med spas, from single-location clinics to boutique groups and larger operators through Custom.',
  },
];

export default function AnswersIndexPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <FixedNav />

      <PageHero
        subtitle="Answers"
        title="Answers for med spa operators."
        description="Direct answers about Rhemic AI, med spa visibility, AI receptionist coverage, missed-call recovery, Consult Capture Layer support, and source-aware reporting."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-3">
            {answerPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="flex flex-col gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-6 py-5 hover:border-[var(--border-default)] transition-all duration-200"
              >
                <span className="text-sm font-semibold text-[var(--text-primary)]">{page.title}</span>
                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{page.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
