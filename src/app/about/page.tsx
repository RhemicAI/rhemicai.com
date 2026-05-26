import type { Metadata } from 'next';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About Rhemic AI: Med Spa Consult Opportunity System',
  description:
    'Meet the Dallas team building Rhemic AI for U.S. med spas finding lost consult opportunities across search visibility, calls, handoffs, and source context.',
  path: '/about',
  keywords: ['about Rhemic AI', 'med spa consult opportunity system', 'med spa AI receptionist', 'Dallas med spa software'],
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
      'Med spa owners should be able to see what is broken, what matters first, and what can be fixed without learning a new acronym stack.',
  },
  {
    title: 'Capture before more spend',
    description:
      'More ads are not always the next move. Rhemic starts with the leaks across Google, reviews, treatment pages, calls, and booking handoffs.',
  },
  {
    title: 'Non-clinical coverage',
    description:
      'The AI receptionist answers common non-clinical questions, captures lead details, and routes booking requests. Medical decisions stay with licensed staff.',
  },
  {
    title: 'Source-aware growth',
    description:
      'Teams need source context for the visibility, trust, and response surfaces creating consult opportunities.',
  },
  {
    title: 'Founder-led setup',
    description:
      'Early Rhemic customers work directly with the founding team on discovery, setup, and growth priorities.',
  },
  {
    title: 'No false guarantees',
    description:
      'Rhemic helps improve visibility, capture, and reporting. It does not promise rankings, revenue, patients, or clinical outcomes.',
  },
];

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Rhemic AI',
  url: 'https://rhemicai.com',
  description:
    'Dallas-based system for U.S. med spas finding lost consult opportunities across Google visibility, AI answers, missed-call opportunities, handoffs, and source context.',
  foundingDate: '2025',
  areaServed: 'United States',
  knowsAbout: [
    'Med spa patient acquisition',
    'Google Business Profile for med spas',
    'AI search visibility',
    'AI receptionist for med spas',
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
        title="The team helping med spas find lost consult opportunities."
        description="Rhemic AI is a Dallas-based company helping U.S. med spas surface leaks across search visibility, AI answers, calls, handoffs, and source context."
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
                Rhemic AI started from clinic work, not generic marketing
                theory. Karim worked closely with dental clinics in a previous
                role, where he saw firsthand how appointment-driven clinics
                leak demand across phone coverage, legacy systems, slow
                follow-up, and unclear booking handoffs.
              </p>
              <p>
                That work included selling AI employees into clinics,
                integrating them with older operational systems, and
                building guardrailed agents for patient-facing
                workflows. The same pattern showed up in med spas: strong
                operators were still losing consult demand before the team ever
                had a real chance to respond.
              </p>
              <p>
                Raahil brings the automation side of that system. Before
                Rhemic, he deployed AI receptionist workflows for service
                businesses and built automations that helped teams capture,
                route, and follow up with leads without replacing the people who
                own the customer relationship.
              </p>
              <p>
                We built Rhemic around that combined experience. The product
                helps med spas improve local visibility, strengthen trust,
                answer common non-clinical questions, surface missed-call
                opportunities, and route booking intent to the team already
                running the clinic.
              </p>
              <p>
                We are founder-led, vertical-specific, and careful about claims.
                Rhemic does not replace licensed staff or promise rankings. It
                gives operators a clearer system for finding and prioritizing
                the leaks between patient demand and consult opportunities.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="glass-panel mb-16 p-6 sm:mb-24 sm:p-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              Help med spas surface lost consult opportunities across Google,
              AI answers, calls, handoffs, and source context so booking intent
              reaches the right team faster.
            </p>
          </section>

          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              What we believe about this market
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                  Patient discovery is fragmented
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Med spas can no longer assume every patient starts on the same channel. Demand moves through Google, AI answers, reviews, ads, calls, and referrals before it becomes a consult opportunity.
                </p>
              </div>
              <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                  Execution matters more than slogans
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Rhemic is built around concrete surfaces: GBP, Maps, reviews, treatment pages, schema, citations, AI search visibility, missed-call recovery, and Meta Ads intelligence.
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
                  'Rhemic helps U.S. med spas recover missed calls, route booking intent, and see which channels create patient demand with AI receptionist coverage.',
              },
              {
                question: 'Who founded Rhemic AI?',
                answer:
                  'Rhemic AI was founded by Ittehadul Karim (CEO) and Raahil Shaik (COO/CFO). Karim previously worked closely with dental clinics, sold AI employees into clinics, and integrated with legacy systems. Raahil is an automation expert who previously deployed AI receptionist workflows for service businesses.',
              },
              {
                question: 'Where is Rhemic AI based?',
                answer:
                  'Rhemic AI is headquartered in Dallas, Texas. The public offer is focused on U.S. med spas.',
              },
              {
                question: 'Does Rhemic AI replace clinic staff?',
                answer:
                  'No. The AI receptionist answers common non-clinical questions, captures lead details, and routes booking requests to your team. Medical advice, diagnosis, and treatment decisions stay with licensed staff.',
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
            description: 'Google, AI search, reviews, treatment pages, calls, and Meta Ads intelligence.',
            href: '/#what-we-optimize',
          },
          {
            title: 'Pricing',
            description: 'Basic, Growth, Premium, and Custom plans for U.S. med spas.',
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
