import type { Metadata } from 'next';
import Link from 'next/link';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import Reveal from '@/components/redesign/Reveal';
import AuditButton from '@/components/redesign/AuditButton';
import { buildMetadata, organizationSchema, absoluteUrl } from '@/lib/seo';
import { plans } from '@/data/pricing';

export const metadata: Metadata = buildMetadata({
  title: 'About Rhemic AI: Who We Are and Who We Serve',
  description:
    'Rhemic AI is a search and answer-engine visibility firm for local service businesses in the U.S. Founded 2025 by Ittehadul Karim and Raahil Shaik. AEO, GEO, SEO and Google Business Profile, run as one stack. Plans from $200/mo.',
  path: '/about',
  keywords: [
    'about Rhemic AI',
    'Rhemic AI founders',
    'AI visibility agency',
    'answer engine optimization firm',
    'is Rhemic AI legit',
  ],
});

const faqs = [
  {
    question: 'Who founded Rhemic AI?',
    answer:
      'Ittehadul Karim is CEO and Raahil Shaik is COO and CFO. The company was founded in 2025 and operates in the United States.',
  },
  {
    question: 'What exactly does Rhemic do?',
    answer:
      'We help a business show up everywhere its customers look: Google search, the local map, and AI answer engines including ChatGPT, Claude, Perplexity, Gemini and Copilot. We run answer engine optimization (AEO), generative engine optimization (GEO), technical and local SEO, and Google Business Profile optimization as one stack.',
  },
  {
    question: 'Is Rhemic a software product or an agency?',
    answer:
      'A done-for-you service firm. There is no self-serve product, no free trial, and no white-label platform for agencies. We do the work and report the result.',
  },
  {
    question: 'Who do you work with?',
    answer:
      'Owner-led local service businesses in the U.S., roughly $500k to $5M in revenue, from a single location up to about five. Home services lead: HVAC, plumbing, electrical, roofing and auto repair. We also work with clinics, dental, restaurants, salons and similar local categories.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Plans start at $200 a month for Visibility, $700 for Capture, and $2,000 for the full done-for-you system. Every price is published on the pricing page. You will not have to sit through a call to learn a number.',
  },
  {
    question: 'Do you guarantee rankings or AI mentions?',
    answer:
      'No. These are third-party systems that change without notice, and anyone guaranteeing a ranking is guessing. What we control is whether your business is legible, consistent and quotable to those systems, and whether you can see the result. We report citation share either way.',
  },
];

export default function AboutPage() {
  const entry = plans[0];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: absoluteUrl('/about'),
    name: 'About Rhemic AI',
    mainEntity: organizationSchema(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PaperNav />

      <main className="relative">
        {/* Answer the three questions in the first screen */}
        <section className="px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">
                About
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">
                Founded 2025 · United States
              </span>
            </div>

            <Reveal className="max-w-3xl">
              <h1 className="font-display text-[clamp(2.2rem,5.4vw,4rem)] font-medium leading-[1.02] text-balance">
                We help a business{' '}
                <span className="italic text-spot-deep">show up everywhere</span> its customers
                look.
              </h1>

              <p className="mt-6 max-w-2xl font-body text-[1.12rem] leading-relaxed text-ink text-pretty">
                Google search, the local map, and the AI answer engines: ChatGPT, Claude, Perplexity,
                Gemini and Copilot. That is the whole job.
              </p>

              <p className="mt-4 max-w-2xl font-body text-[1.02rem] leading-relaxed text-ink-2 text-pretty">
                Rhemic AI is a search and answer-engine visibility firm for local service businesses
                in the United States. We run answer engine optimization (AEO), generative engine
                optimization (GEO), technical and local SEO, and Google Business Profile
                optimization as one stack, because a customer choosing who to call is influenced by
                all four at once.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <AuditButton className="btn-primary">Run my visibility audit</AuditButton>
                <Link href="/pricing" className="btn-ghost">
                  See pricing
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* The facts a buyer checks */}
        <section className="px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">
                The facts
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="paper-card p-6">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-3">
                  Founders
                </p>
                <p className="mt-3 font-body text-[1rem] leading-relaxed text-ink-2">
                  <strong>Ittehadul Karim</strong>, CEO.
                  <br />
                  <strong>Raahil Shaik</strong>, COO and CFO.
                </p>
              </div>
              <div className="paper-card p-6">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-3">
                  Founded
                </p>
                <p className="mt-3 font-body text-[1rem] leading-relaxed text-ink-2">
                  2025, United States. We work with businesses across the U.S.
                </p>
              </div>
              <div className="paper-card p-6">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-3">
                  Starting price
                </p>
                <p className="mt-3 font-body text-[1rem] leading-relaxed text-ink-2">
                  ${entry.monthlyPrice} a month. Every tier is published, so you can size it before
                  you talk to us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What we believe */}
        <section className="px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">
                How we work
              </span>
            </div>
            <div className="max-w-3xl space-y-6">
              <p className="font-body text-[1.05rem] leading-relaxed text-ink-2 text-pretty">
                <strong className="text-ink">We publish our prices.</strong> Most firms in this
                category make you book a call to learn a number. An owner-operator running a
                business does not have time for that, and a page that states a real number is also
                the only kind an AI engine can quote back to someone asking what this costs.
              </p>
              <p className="font-body text-[1.05rem] leading-relaxed text-ink-2 text-pretty">
                <strong className="text-ink">We show the audit before the invoice.</strong> The
                first thing we do is show you where you are losing customers today, with the figures
                pulled from your own accounts rather than from a template.
              </p>
              <p className="font-body text-[1.05rem] leading-relaxed text-ink-2 text-pretty">
                <strong className="text-ink">We report what we cannot control.</strong> Search and
                AI engines change without notice. We tell you what moved, what did not, and what we
                could not verify. A report that only contains good news is not a report.
              </p>
              <p className="font-body text-[1.05rem] leading-relaxed text-ink-2 text-pretty">
                <strong className="text-ink">We run the technical layer ourselves.</strong> Search
                Console, Bing Webmaster Tools, IndexNow, structured data, sitemaps, crawl access and
                entity consistency. It is unglamorous, it is where most visibility problems actually
                start, and most competitors skip it.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">
                Questions people actually ask
              </span>
            </div>
            <div className="max-w-3xl space-y-7">
              {faqs.map((f) => (
                <Reveal key={f.question}>
                  <div className="border-b border-[var(--rule)] pb-6">
                    <h2 className="font-display text-[1.25rem] font-medium leading-snug">
                      {f.question}
                    </h2>
                    <p className="mt-3 font-body text-[1rem] leading-relaxed text-ink-2 text-pretty">
                      {f.answer}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="px-5 pb-20 pt-4 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">
                Related
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { title: 'AEO', href: '/services/aeo' },
                { title: 'GEO', href: '/services/geo' },
                { title: 'SEO', href: '/services/seo' },
                { title: 'Google Business Profile', href: '/services/google-business-profile' },
                { title: 'Pricing', href: '/pricing' },
                { title: 'Results', href: '/testimonials' },
                { title: 'Contact', href: '/contact' },
              ].map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="border border-[var(--ink)] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-2 transition-colors hover:text-spot-deep"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PaperFooter />
    </>
  );
}
