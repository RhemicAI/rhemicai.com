import Link from 'next/link';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import Reveal from '@/components/redesign/Reveal';
import AuditButton from '@/components/redesign/AuditButton';
import { absoluteUrl, siteConfig } from '@/lib/seo';
import { plans } from '@/data/pricing';

export type ServiceFaq = { question: string; answer: string };
export type ServiceLink = { title: string; href: string };

export type ServicePageProps = {
  /** Short mono label above the title, e.g. "Services / AEO". */
  eyebrow: string;
  /** Plain-language page title. Acronym belongs in `acronymLine`, not here. */
  title: string;
  /** Optional phrase inside the title rendered in the spot colour. */
  titleHighlight?: string;
  /** Route path, e.g. "/services/aeo". */
  path: string;
  /** Plain phrase and acronym together, per the positioning language rules. */
  acronymLine: string;
  /** One paragraph: what this is, in the buyer's words. */
  whatItIs: string;
  /** Concrete work items. Name the actual surfaces and fields. */
  workItems: string[];
  /** What the buyer sees change. */
  whatChanges: string[];
  /** Schema.org service name used in the Service JSON-LD. */
  schemaServiceName: string;
  faqs: ServiceFaq[];
  related?: ServiceLink[];
};

export default function ServicePageLayout({
  eyebrow,
  title,
  titleHighlight,
  path,
  acronymLine,
  whatItIs,
  workItems,
  whatChanges,
  schemaServiceName,
  faqs,
  related = [],
}: ServicePageProps) {
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

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: schemaServiceName,
    serviceType: schemaServiceName,
    url: absoluteUrl(path),
    description: whatItIs,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    offers: {
      '@type': 'Offer',
      price: entry.monthlyPrice,
      priceCurrency: 'USD',
      url: absoluteUrl('/pricing'),
      description: `Included from the ${entry.name} plan at $${entry.monthlyPrice} a month.`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PaperNav />

      <main className="relative">
        {/* Header */}
        <section className="px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">
                {eyebrow}
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">
                Local service businesses · U.S.
              </span>
            </div>

            <Reveal className="max-w-3xl">
              <h1 className="font-display text-[clamp(2.2rem,5.4vw,4rem)] font-medium leading-[1.02] text-balance">
                {titleHighlight ? (
                  <>
                    {title.split(titleHighlight)[0]}
                    <span className="italic text-spot-deep">{titleHighlight}</span>
                    {title.split(titleHighlight)[1]}
                  </>
                ) : (
                  title
                )}
              </h1>
              <p className="mt-6 max-w-2xl font-body text-[1.12rem] leading-relaxed text-ink text-pretty">
                {acronymLine}
              </p>
              <p className="mt-4 max-w-2xl font-body text-[1.02rem] leading-relaxed text-ink-2 text-pretty">
                {whatItIs}
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

        {/* What we actually do */}
        <section className="px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">
                What we actually do
              </span>
            </div>
            <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {workItems.map((item) => (
                <Reveal key={item}>
                  <div className="flex gap-3 border-b border-[var(--rule)] py-3">
                    <span className="mt-[0.55em] h-[7px] w-[7px] shrink-0 bg-spot" aria-hidden="true" />
                    <p className="font-body text-[1rem] leading-relaxed text-ink-2">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* What changes */}
        <section className="px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">
                What you see change
              </span>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {whatChanges.map((c) => (
                <li key={c} className="paper-card p-6">
                  <p className="font-body text-[1rem] leading-relaxed text-ink-2">{c}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Price */}
        <section className="px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="paper-card flex flex-wrap items-center justify-between gap-6 p-8">
              <div className="max-w-xl">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">
                  What it costs
                </p>
                <p className="mt-3 font-body text-[1.05rem] leading-relaxed text-ink-2">
                  This is included from the {entry.name} plan at ${entry.monthlyPrice} a month. We
                  publish every price on the pricing page, so you can size it before you talk to us.
                </p>
              </div>
              <Link href="/pricing" className="btn-primary">
                See the full ladder
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">
                Questions
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
        {related.length > 0 && (
          <section className="px-5 pb-20 pt-4 sm:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="mb-6 flex items-center justify-between border-y border-[var(--ink)] py-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">
                  Related
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {related.map((r) => (
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
        )}
      </main>

      <PaperFooter />
    </>
  );
}
