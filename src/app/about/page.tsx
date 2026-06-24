import type { Metadata } from 'next';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About Rhemic AI: Get Found by AI and Google',
  description:
    'Rhemic AI is the visibility and capture operating system that gets local businesses found on Google and recommended by AI, then turns that demand into customers. Meet the team and the mission.',
  path: '/about',
  keywords: ['about Rhemic AI', 'AI visibility company', 'SEO GEO AEO agency', 'get recommended by AI'],
});

const founders = [
  {
    name: 'Ittehadul Karim',
    role: 'CEO',
    linkedin: 'https://www.linkedin.com/in/ittehadul-karim-3302a51a5/',
  },
  {
    name: 'Raahil Shaik',
    role: 'COO/CFO',
    linkedin: 'https://www.linkedin.com/in/raahil-shaik/',
  },
];

const values = [
  {
    title: 'Operator clarity',
    description:
      'A local business owner should be able to see what is broken, what matters first, and what can be fixed without learning a new acronym stack.',
  },
  {
    title: 'Capture before more spend',
    description:
      'More ads are not always the next move. Rhemic starts with the leaks across Google, reviews, service pages, calls, and booking handoffs.',
  },
  {
    title: 'Capture without replacing people',
    description:
      'Instant response answers common questions, captures lead details, and routes the booking. The people who run the business keep the customer relationship.',
  },
  {
    title: 'Source-aware growth',
    description:
      'Teams need source context for the visibility, trust, and response surfaces that turn demand into new leads.',
  },
  {
    title: 'Founder-led setup',
    description:
      'Early Rhemic customers work directly with the founding team on discovery, setup, and growth priorities.',
  },
  {
    title: 'No false guarantees',
    description:
      'Rhemic helps improve visibility, capture, and reporting. It does not promise rankings, revenue, or guaranteed outcomes.',
  },
];

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Rhemic AI',
  url: 'https://rhemicai.com',
  description:
    'Dallas-based visibility and capture system that gets local businesses found on Google and recommended by AI, then captures and books the leads that come in.',
  foundingDate: '2025',
  areaServed: 'United States',
  knowsAbout: [
    'Local business visibility',
    'Google Business Profile optimization',
    'AI search visibility (GEO and AEO)',
    'AI receptionist and instant lead response',
    'Missed-call recovery',
    'Meta Ads intelligence',
  ],
  employee: founders.map((f) => ({
    '@type': 'Person',
    name: f.name,
    jobTitle: f.role,
    sameAs: f.linkedin,
  })),
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="About"
        title="The team helping local businesses get found by AI and capture every lead."
        description="Rhemic AI is a Dallas-based company helping local businesses get found and recommended across Google and AI answers, then capture and book the leads that come in."
        showBackLink={false}
      />


      <div className="relative z-10 py-12 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* Founding Story */}
          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>
                Rhemic started from real operator work, not marketing theory.
                Karim spent a previous role inside local service businesses,
                watching how much demand they lose before anyone on the team
                ever gets a chance to respond. The pattern was the same
                everywhere: the business was good at the actual work and losing
                money in the gap between a customer looking and a customer
                booked.
              </p>
              <p>
                That gap is now open in three places at once. AI assistants
                answer the customer&apos;s question without naming the business.
                Google buries it under whoever set their profile up better. And
                the calls that do come in go to voicemail. Most owners feel the
                slow season. They never see the leak that caused it.
              </p>
              <p>
                Raahil brings the capture side. Before Rhemic he built and
                deployed instant-response and follow-up automations for service
                businesses, the systems that catch a lead the moment it lands
                and route it to the team without replacing the people who own
                the customer relationship.
              </p>
              <p>
                We built Rhemic around that combined experience. It is one
                system for a local business to get found and recommended across
                Google and AI answers, capture every inbound lead, and turn that
                into booked work. We lead with home services and run the same
                playbook across any local vertical where speed and visibility
                decide who wins the job.
              </p>
              <p>
                We are founder-led, conversion-first, and careful about claims.
                Rhemic does not promise rankings or replace the people who run
                the business. It gives operators a clearer system for finding
                and closing the leaks between customer demand and booked
                revenue.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="glass-panel mb-16 p-6 sm:mb-24 sm:p-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              Help local businesses get found and recommended across Google and
              AI answers, then capture every inbound lead so demand turns into
              booked work.
            </p>
          </section>

          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              What we believe about this market
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                  Customer discovery is fragmented
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  A local business can no longer assume every customer starts on the same channel. Demand moves through Google, AI answers, reviews, ads, calls, and referrals before it becomes a booked job.
                </p>
              </div>
              <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                  Execution matters more than slogans
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Rhemic is built around concrete surfaces: GBP, Maps, reviews, service pages, schema, citations, AI search visibility, missed-call recovery, and Meta Ads intelligence.
                </p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              Leadership Team
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {founders.map((founder) => (
                <div
                  key={founder.name}
                  className="glass-panel p-8 transition-colors hover:border-[var(--border-default)]"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-[var(--text-primary)]">
                        {founder.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                      {founder.name}
                    </h3>
                    <p className="text-sm text-[var(--text-tertiary)] mb-4">
                      {founder.role}
                    </p>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="glass-panel p-6 transition-colors hover:border-[var(--border-default)]"
                >
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <SubpageFAQ
            heading="About Rhemic AI, FAQ"
            faqs={[
              {
                question: 'What is Rhemic AI?',
                answer:
                  'Rhemic helps local businesses get found and recommended across Google and AI answers, recover missed calls, capture and route inbound leads, and see which channels create demand.',
              },
              {
                question: 'Who founded Rhemic AI?',
                answer:
                  'Rhemic AI was founded by Ittehadul Karim (CEO) and Raahil Shaik (COO/CFO). Karim previously worked with local service businesses, sold AI employees into them, and integrated with legacy systems. Raahil is an automation expert who previously deployed instant-response and follow-up workflows for service businesses.',
              },
              {
                question: 'Where is Rhemic AI based?',
                answer:
                  'Rhemic AI is headquartered in Dallas, Texas. It serves local businesses across the U.S., leading with home services.',
              },
              {
                question: 'Does Rhemic AI replace my team?',
                answer:
                  'No. The instant-response layer answers common questions, captures lead details, and routes the booking to your team. The people who run the business keep the customer relationship.',
              },
            ]}
          />
        </div>
      </div>

      <RelatedLinks
        heading="Explore more"
        links={[
          {
            title: 'What We Optimize',
            description: 'Google, AI search, reviews, service pages, calls, and Meta Ads intelligence.',
            href: '/#what-we-optimize',
          },
          {
            title: 'Pricing',
            description: 'Visibility, Capture, and full growth plans for local businesses.',
            href: '/pricing',
          },
          {
            title: 'Contact',
            description: 'Start with a visibility and call leak audit.',
            href: '/contact',
          },
        ]}
      />

      <Footer />
    </main>
  );
}
