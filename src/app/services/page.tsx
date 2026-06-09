import type { Metadata } from 'next';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import Reveal from '@/components/redesign/Reveal';
import AuditButton from '@/components/redesign/AuditButton';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'What Rhemic does for your business: rank on Google, get recommended by AI, capture every lead, know what brings customers, and a website if you need one. SEO, GEO, AEO, and capture.',
  path: '/services',
  keywords: ['Rhemic AI services', 'SEO GEO AEO services', 'AI visibility services', 'lead capture'],
});

const services = [
  {
    tag: 'SEO',
    title: 'Get found on Google',
    body: 'Rank for the searches that bring you customers, and own the local map. The classic, durable visibility every business still needs.',
    points: ['Search rankings for high-intent queries', 'Google Business Profile and local pack', 'Technical and on-page foundations'],
  },
  {
    tag: 'GEO + AEO',
    title: 'Get recommended by AI',
    body: 'Be the name AI engines give when customers ask. We get you cited inside ChatGPT, Perplexity, Gemini, and Google AI Overviews.',
    points: ['Cited and recommended in AI answers', 'Structured data engines can read', 'Positioning so you beat the competitor they name today'],
  },
  {
    tag: 'Capture',
    title: 'Catch every lead',
    body: 'Visibility creates demand. We make sure none of it slips, with a response system built to your business and a lead tracker of its own.',
    points: ['Calls, missed calls, after-hours, and forms captured', 'A response process built to how you run', 'Your own board with the source of every lead'],
  },
  {
    tag: 'Reporting',
    title: 'Know what brings customers',
    body: 'No vanity charts. See which markets, channels, and dollars actually turn into customers, in plain English.',
    points: ['Source clarity on every lead', 'What moved each month and why', 'Where to put the next dollar'],
  },
  {
    tag: 'Web',
    title: 'We build your website',
    body: 'No site, or an old one holding you back? We build a fast, modern site as part of getting you visible. No separate web-design bill.',
    points: ['Built to convert, not just look good', 'Structured for SEO, GEO, and AEO from day one', 'Booking and contact wired in'],
  },
  {
    tag: 'Done-for-you',
    title: 'Run the whole growth engine',
    body: 'The full system. We run visibility, capture, and reporting across your entire business and every location, so you can run the business.',
    points: ['Everything above, handled for you', 'Across all locations and markets', 'One team, one report, real outcomes'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PaperNav />
      <main className="relative">
        <section className="px-5 pb-12 pt-32 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">Services</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">SEO · GEO · AEO · Capture</span>
            </div>
            <Reveal className="max-w-3xl">
              <h1 className="font-display text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.0] text-balance">
                Everything it takes to{' '}
                <span className="italic text-spot-deep">get found</span> and turn it into customers.
              </h1>
              <p className="mt-6 max-w-xl font-body text-[1.15rem] leading-relaxed text-ink-2 text-pretty">
                Not a menu of tasks. These are outcomes. Pick the layer you need, or have us run the whole
                thing. It works for any local service business.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 sm:pb-28">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={((i % 3) + 1) as 1 | 2 | 3} as="article" className="paper-card flex flex-col p-7">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-spot-deep">{s.tag}</span>
                <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-tight">{s.title}</h2>
                <p className="mt-3 font-body text-[1.02rem] leading-relaxed text-ink-2">{s.body}</p>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-[var(--line)] pt-4">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-spot" />
                      <span className="font-body text-[0.95rem] leading-snug text-ink-2">{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="ink-block px-5 py-24 sm:px-8 sm:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="kicker mb-5" style={{ color: 'var(--spot)' }}>Start with a free scan</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.02] text-balance">
              Not sure which layer you need?
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-body text-[1.08rem] leading-relaxed text-[rgba(244,238,222,0.72)]">
              Run the free visibility scan. We will show you exactly where you stand and which of these moves
              the needle first for your business.
            </p>
            <div className="mt-8 flex justify-center">
              <AuditButton className="btn-primary !border-[var(--paper)] !bg-[var(--paper)] !text-[var(--ink)] hover:!border-[var(--spot)] hover:!bg-[var(--spot)] hover:!text-[var(--paper)]">
                Run my free audit
              </AuditButton>
            </div>
          </Reveal>
        </section>
      </main>
      <PaperFooter />
    </>
  );
}
