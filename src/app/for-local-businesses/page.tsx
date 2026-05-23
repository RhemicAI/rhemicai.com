'use client';

import { useState } from 'react';
import CalBookingLink from '@/components/CalEmbed/CalBookingLink';
import FixedNav from '@/components/FixedNav/FixedNav';
import SmbHero from '@/components/SmbHero/SmbHero';
import BeforeAfter from '@/components/BeforeAfter/BeforeAfter';
import SmbPricing from '@/components/SmbPricing/SmbPricing';
import IndustryTrust from '@/components/IndustryTrust/IndustryTrust';
import Footer from '@/components/Footer/Footer';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';

/* ── Section 3: The Shift ── */
function TheShift() {
  return (
    <section className="relative z-10 py-20 md:py-28 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4 font-body">
            The Shift
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-display">
            Buyers aren&apos;t Googling anymore.
          </h2>
        </div>

        <div className="space-y-4 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-body max-w-2xl mx-auto">
          <p>
            Your customers aren&apos;t typing into Google anymore. They&apos;re asking ChatGPT, Claude, and Gemini: &ldquo;best sushi restaurant downtown,&rdquo; &ldquo;top-rated dentist near me,&rdquo; &ldquo;reliable plumber in my city.&rdquo;
          </p>
          <p>
            AI gives them a short list. If you&apos;re not on it, they never find you. It doesn&apos;t matter how good your reviews are or how long you&apos;ve been in business.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-xl mx-auto">
          <div className="rounded-xl border border-white/10 bg-[var(--glass-bg)] p-5 text-center">
            <p className="text-3xl font-bold text-white font-display">1 in 3</p>
            <p className="mt-1 text-sm text-[var(--text-muted)] font-body">
              More than 1 in 3 buyers now start their search inside an AI assistant
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[var(--glass-bg)] p-5 text-center">
            <p className="text-3xl font-bold text-white font-display">&darr;</p>
            <p className="mt-1 text-sm text-[var(--text-muted)] font-body">
              Search engine volume is projected to decline significantly as AI answers replace traditional results
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 5: How It Works ── */
const steps = [
  {
    number: '01',
    title: 'We Test What Customers Are Asking',
    description:
      'We run the exact questions your customers ask AI across ChatGPT, Claude, Gemini, and Perplexity, and see who gets recommended.',
  },
  {
    number: '02',
    title: 'You See Who\'s Getting Your Customers',
    description:
      'A clear, name-by-name breakdown of which competitors AI recommends instead of you, and for which topics.',
  },
  {
    number: '03',
    title: 'You Get a Step-by-Step Fix Plan',
    description:
      'Plain-English recommendations. No jargon, no guesswork. Do these things, in this order, and AI will start recommending you.',
  },
];

function HowItWorks() {
  return (
    <section className="relative z-10 py-20 md:py-28 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4 font-body">
            How It Works
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-display">
            We show you what AI says about your business, and your competitors.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-white/10 bg-[var(--glass-bg)] p-6 hover:border-white/20 transition-colors duration-300"
            >
              <span className="inline-block text-sm font-mono font-bold text-white/60 mb-3">
                {step.number}
              </span>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-display mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-body">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 9: FAQ ── */
const smbFaqs = [
  {
    question: 'Will this work if I don\'t have a website?',
    answer:
      'Yes, but website builds are not bundled into the SMB ladder. Starter and Growth include the audit, recommendations, and deployment guidance. Scale can generate landing pages and deployment packets through the agentic pipeline. Full website builds are handled as Enterprise scope or a separate setup project.',
  },
  {
    question: 'How is this different from SEO?',
    answer:
      'SEO gets you ranked on Google. This gets you into AI recommendations, where more buyers are starting their search every day. They\'re different systems. Most local businesses are ignoring AI entirely right now. That\'s your window.',
  },
  {
    question: 'How fast does it work?',
    answer:
      'Visibility improvements depend on how quickly the right technical and content fixes ship. Most businesses see directional movement within a few weeks of focused implementation.',
  },
  {
    question: 'Do I need any tech skills?',
    answer:
      'No. Rhemic turns AI visibility findings into plain-English recommendations and implementation-ready work, so you do not need to translate technical SEO or AEO jargon yourself.',
  },
  {
    question: 'What kinds of businesses is this built for?',
    answer:
      'Any local business where customers choose you based on reputation: restaurants, dental clinics, auto dealerships, medical practices, hair salons, retail boutiques, and more. If customers search for your type of business, they\'re starting to ask AI instead. That\'s who we help.',
  },
];

function SmbFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-20 md:py-28 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4 font-body">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-display">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {smbFaqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-[var(--glass-bg)] hover:border-[var(--border-default)] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-semibold text-[var(--text-primary)] font-body">
                  {faq.question}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`shrink-0 text-[var(--text-tertiary)] transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: openIndex === index ? '500px' : '0px' }}
              >
                <div className="px-6 pb-5">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-body">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 10: Footer CTA ── */
function SmbFooterCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[1200px] h-[800px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top center, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 30%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)] font-display">
          Your competitors are already in the AI answer. Find out where you stand. Free.
        </h2>

        <div className="mt-8">
          <CalBookingLink
            calLink="rhemic-ai/discovery-call"
            className="inline-block px-8 py-4 text-lg font-semibold text-[var(--bg)] bg-[var(--ink)] hover:bg-[var(--pulse)] rounded-full shadow-lg shadow-[var(--pulse-soft)] transition-all duration-200 hover:scale-105 font-body"
          >
            Book a Demo
          </CalBookingLink>
        </div>

        <p className="mt-4 text-sm text-[var(--text-muted)] font-body">
          See how the workflow maps to your local market.
        </p>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function ForLocalBusinesses() {
  return (
    <main className="min-h-screen selection:bg-white/10 selection:text-white">
      <PageSchemas
        id="for-local-businesses-schemas"
        service={{
          name: 'Rhemic AI for local businesses',
          description:
            'AI visibility software and implementation guidance for local businesses that want to be recommended in AI answers.',
          path: '/for-local-businesses',
          audience: 'Local service businesses and multi-location brands',
        }}
      />
      <FixedNav />
      {/* Section 1: Hero */}
      <SmbHero />
      {/* Section 2: The Shift */}
      <TheShift />
      {/* Section 3: Before / After Mock */}
      <BeforeAfter />
      {/* Section 4: How It Works */}
      <HowItWorks />
      {/* Section 5: Pricing */}
      <SmbPricing />
      {/* Section 6: Trust Signals */}
      <IndustryTrust />
      {/* Section 7: FAQ */}
      <SmbFAQ />
      {/* Section 8: Footer CTA */}
      <SmbFooterCTA />
      <RelatedLinks
        heading="Keep exploring"
        links={[
          {
            title: 'Pricing',
            description: 'Review the plans built for local AI visibility work.',
            href: '/pricing',
          },
          {
            title: 'FAQ',
            description: 'Read the buyer questions around local AI visibility and pricing.',
            href: '/faq',
          },
          {
            title: 'How It Works',
            description: 'Understand how the audit and implementation workflow fits local businesses.',
            href: '/how-it-works',
          },
        ]}
      />
      <Footer />
    </main>
  );
}
