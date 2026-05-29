import type { Metadata } from 'next';
import CalBookingLink from '@/components/CalEmbed/CalBookingLink';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Rhemic AI Products for Med Spa Consult Leaks',
  description:
    'Rhemic helps U.S. med spas recover missed calls, route booking intent, and see which channels create patient demand with AI receptionist coverage.',
  path: '/products',
  keywords: ['med spa consult opportunity system', 'med spa AI receptionist', 'med spa missed-call recovery', 'Meta Ads intelligence for med spas'],
});

const productLayers = [
  {
    title: 'Visibility',
    description:
      'Improve how your med spa appears across Google Business Profile, Google Maps, local SEO, treatment pages, reviews, citations, schema, and AI answers.',
    items: ['Google Business Profile', 'Google Maps', 'Treatment pages', 'AI search visibility'],
  },
  {
    title: 'Capture',
    description:
      'Help route booking intent when staff are busy, calls are missed, or after-hours leads come in.',
    items: ['AI receptionist coverage', 'Missed-call opportunities', 'Lead capture', 'Booking request routing'],
  },
  {
    title: 'Source clarity',
    description:
      'Help show which sources are creating consult opportunities so your team can see what to prioritize next.',
    items: ['Source context', 'Handoff reporting', 'Scale-tier connected-account ad reporting', 'Multi-location reporting'],
  },
];

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Rhemic AI Med Spa Growth System',
  description:
    'Visibility, handoff, and source-context products for U.S. med spas.',
  itemListElement: productLayers.map((layer, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: `Rhemic AI ${layer.title}`,
      description: layer.description,
      url: absoluteUrl('/products'),
      provider: {
        '@type': 'Organization',
        name: 'Rhemic AI',
        url: absoluteUrl('/'),
      },
      audience: {
        '@type': 'Audience',
        audienceType: 'U.S. med spa owners and operators',
      },
    },
  })),
};

const faqs = [
  {
    question: 'What are Rhemic AI products?',
    answer:
      'Rhemic AI products are organized around visibility, handoffs, and source context for U.S. med spas. The system helps clinics surface lost consult opportunities across Google, AI answers, calls, and approved handoff workflows.',
  },
  {
    question: 'Does every plan include the AI receptionist?',
    answer:
      'Yes. Every Rhemic plan includes AI receptionist coverage for common non-clinical questions, lead capture, and booking request routing. Medical advice, diagnosis, and treatment decisions stay with licensed staff.',
  },
  {
    question: 'Does Rhemic integrate with med spa software?',
    answer:
      'Direct integrations with systems like AestheticsPro, Boulevard, Mangomint, Zenoti, Meevo, and similar platforms are on the roadmap. Today, Rhemic can capture lead details, support missed-call recovery, and route booking requests through approved handoff workflows.',
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <JsonLd id="products-service-list-schema" data={productSchema} />
      <PageSchemas
        id="products-page-schemas"
        service={{
          name: 'Rhemic AI products for med spas',
          description:
            'Visibility, handoffs, and source context for U.S. med spas finding lost consult opportunities.',
          path: '/products',
          audience: 'U.S. med spa owners and operators',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Products"
        title="Visibility, handoffs, and source context for med spas."
        description="Rhemic helps med spas find lost consult opportunities and route more booking intent to the right team across search visibility, AI answers, calls, handoffs, and source context."
        showBackLink={false}
      />

      <div className="relative z-10">
        <section className="px-6 pb-16">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {productLayers.map((layer) => (
              <article
                key={layer.title}
                className="glass-panel p-6 sm:p-8"
              >
                <p className="section-label mb-4">{layer.title}</p>
                <p className="min-h-[120px] text-base leading-[1.7] text-[var(--text-secondary)]">
                  {layer.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg-2)] px-3 py-2 text-xs text-[var(--text-secondary)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-5xl rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="section-label mb-4">How the layers work together</p>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                ['Get found', 'Google Business Profile, Maps, local SEO, treatment pages, reviews, citations, schema, and AI search visibility.'],
                ['Get answered', 'AI receptionist coverage for common non-clinical questions, lead capture, missed calls, and after-hours buyer intent.'],
                ['Get clarity', 'Reporting that helps connect searches, calls, handoffs, consult opportunities, and Scale-tier connected-account ad reporting.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-bg)] p-5">
                  <h2 className="mb-3 text-lg font-bold text-[var(--text-primary)]">{title}</h2>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-5xl rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 text-center sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">
              Start with a visibility and call leak audit.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-[1.75] text-[var(--text-secondary)]">
              The audit helps show where your clinic may be losing consult opportunities across Google,
              AI answers, reviews, treatment pages, calls, handoffs, and source context.
            </p>
            <CalBookingLink
              calLink="rhemic-ai/medspa-discovery-call"
              className="inline-flex w-full max-w-[340px] items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-4 text-sm font-semibold text-[var(--btn-primary-text)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--pulse)] sm:max-w-none sm:px-8 sm:text-base"
            >
              Get the audit
            </CalBookingLink>
          </div>
        </section>

        <div className="px-6">
          <div className="mx-auto max-w-5xl">
            <SubpageFAQ heading="Product FAQ" faqs={faqs} />
          </div>
        </div>
      </div>

      <RelatedLinks
        heading="Learn more"
        links={[
          {
            title: 'Pricing',
            description: 'Compare Diagnose, Capture, Scale, and Custom for U.S. med spas.',
            href: '/pricing',
          },
          {
            title: 'How It Works',
            description: 'See how Rhemic reviews visibility, capture, and reporting gaps.',
            href: '/how-it-works',
          },
          {
            title: 'FAQ',
            description: 'Read answers about AI reception, Meta Ads intelligence, and software handoffs.',
            href: '/faq',
          },
        ]}
      />

      <Footer />
    </main>
  );
}
