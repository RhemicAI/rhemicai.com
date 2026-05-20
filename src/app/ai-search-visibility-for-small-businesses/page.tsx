import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';
import { plans } from '@/data/pricing';

export const metadata: Metadata = buildMetadata({
  title: 'AI Search Visibility for Small Businesses',
  description:
    'How small businesses can improve their AI search visibility without a large budget: practical steps, affordable tools, and the fixes that move the needle fastest.',
  path: '/ai-search-visibility-for-small-businesses',
  keywords: ['AI search visibility small business', 'AI visibility for SMBs', 'small business AI recommendations'],
});

const starterPlan = plans.find((p) => p.tier === 'starter')!;
const starterPrice = `$${starterPlan.monthlyPrice}/month`;

const faqs = [
  {
    question: 'Can a small business improve AI visibility without a developer?',
    answer: 'Some improvements require a developer: schema markup implementation, robots.txt changes, and server-side rendering fixes. Others do not: Google Business Profile optimization, content rewrites, and FAQ page additions. A good AEO audit identifies which fixes are which.',
  },
  {
    question: 'How much does AI visibility cost for a small business?',
    answer: `Rhemic AI's ${starterPlan.name} plan is ${starterPrice}. It includes a full AI visibility audit, competitive gap report, and 5 prioritized fixes. That is the entry point for a structured approach. Some free manual testing is also possible by running prompts yourself.`,
  },
  {
    question: 'Is AI visibility worth it for a local small business?',
    answer: 'For local service businesses in competitive categories — restaurants, salons, contractors, medical practices — yes. AI answer engines are increasingly where local buyers start their discovery, especially for "best X near me" queries.',
  },
];

export default function AiSearchVisibilityForSmallBusinessesPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="smb-ai-visibility-schemas"
        service={{
          name: 'AI search visibility for small businesses',
          description: 'Practical AI visibility improvements for small businesses and local service providers.',
          path: '/ai-search-visibility-for-small-businesses',
          audience: 'Small businesses, local service providers, and solo operators',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Small Business AI Visibility"
        title="AI search visibility for small businesses"
        description="Small businesses are being recommended — or not — in AI answers every day. Here is what determines which side you land on, and what to change if you are missing."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          {/* Direct answer */}
          <section className="mb-12 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
              The short version
            </p>
            <p className="text-xl leading-relaxed text-[var(--text-primary)]">
              Small businesses show up in AI answers when their entity is clear, their service pages
              directly answer buyer questions, their schema markup is in place, and AI crawlers can
              access their site. All of these are fixable. None require a large budget.
            </p>
          </section>

          {/* Priority fixes */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Priority fixes for small businesses</h2>
            <div className="space-y-4">
              {[
                {
                  rank: '1',
                  label: 'Optimize your Google Business Profile',
                  detail: 'Add complete categories, services, description, hours, and photos. Google Business Profile feeds both Google AI Overviews and likely influences other AI engines for local queries.',
                  effort: 'Low effort',
                },
                {
                  rank: '2',
                  label: 'Rewrite your homepage and service pages',
                  detail: 'Lead with specific answers to buyer questions. Replace generic copy with concrete descriptions of what you do, who you serve, where you operate, and what outcomes you deliver.',
                  effort: 'Medium effort',
                },
                {
                  rank: '3',
                  label: 'Add FAQPage schema to your FAQ content',
                  detail: 'If you have a FAQ page or FAQ content anywhere on your site, add FAQPage schema. This is one of the highest-leverage technical changes for AEO.',
                  effort: 'Low to medium effort',
                },
                {
                  rank: '4',
                  label: 'Add LocalBusiness or Organization schema',
                  detail: 'A structured schema block on your homepage and key service pages tells AI systems exactly who you are and what you do. Include name, address, phone, service area, and categories.',
                  effort: 'Low to medium effort',
                },
                {
                  rank: '5',
                  label: 'Check your robots.txt',
                  detail: 'Verify that GPTBot, PerplexityBot, ClaudeBot, and Google-Extended are not blocked. These are the crawlers that feed ChatGPT, Perplexity, Claude, and Google AI Overviews.',
                  effort: 'Low effort',
                },
              ].map(({ rank, label, detail, effort }) => (
                <div key={rank} className="flex gap-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                  <span className="text-xl font-extrabold text-[var(--text-muted)] font-display shrink-0 w-6">{rank}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                      <h3 className="font-bold text-[var(--text-primary)] text-sm">{label}</h3>
                      <span className="text-xs text-[var(--text-tertiary)] border border-[var(--border-subtle)] rounded px-2 py-0.5 shrink-0">{effort}</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">Get a prioritized fix list for your business</h2>
            <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              Rhemic AI&apos;s {starterPlan.name} plan runs a full visibility audit and delivers 5 prioritized fixes
              for ${starterPlan.monthlyPrice}/month. No long-term contract required for the initial audit.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-[5px] bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                See pricing
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[5px] border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                Sign up
              </Link>
            </div>
          </section>
        </div>

        <SubpageFAQ heading="Small business AI visibility FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          { title: 'For Local Businesses', description: 'The full local business AI visibility guide.', href: '/for-local-businesses' },
          { title: 'How Local Businesses Can Show Up in AI Answers', description: 'Step-by-step answer page.', href: '/answers/how-local-businesses-can-show-up-in-ai-answers' },
          { title: 'Pricing', description: `${starterPlan.name} at $${starterPlan.monthlyPrice}/mo.`, href: '/pricing' },
        ]}
      />

      <Footer />
    </main>
  );
}
