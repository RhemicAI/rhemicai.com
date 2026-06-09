import type { Metadata } from 'next';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How Rhemic AI collects, uses, shares, and protects personal and business information across our website, visibility scan, and services.',
  path: '/privacy-policy',
});

const UPDATED = 'June 8, 2026';

const sections: { id: string; title: string }[] = [
  { id: 'who-we-are', title: 'Who we are' },
  { id: 'what-we-collect', title: 'What we collect' },
  { id: 'how-we-use-it', title: 'How we use it' },
  { id: 'cookies', title: 'Cookies and analytics' },
  { id: 'sharing', title: 'How we share it' },
  { id: 'retention', title: 'Data retention' },
  { id: 'your-rights', title: 'Your rights' },
  { id: 'security', title: 'Security' },
  { id: 'children', title: "Children's privacy" },
  { id: 'international', title: 'International transfers' },
  { id: 'changes', title: 'Changes' },
  { id: 'contact', title: 'Contact' },
];

function H({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-28 font-display text-[1.6rem] font-semibold leading-tight text-ink">
      {children}
    </h2>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 font-body text-[1.05rem] leading-relaxed text-ink-2">{children}</p>;
}
function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[10px] h-1.5 w-1.5 shrink-0 bg-spot" />
      <span className="font-body text-[1.02rem] leading-relaxed text-ink-2">{children}</span>
    </li>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PaperNav />
      <main className="relative px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between border-y border-[var(--ink)] py-2">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">Privacy Policy</span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">Updated {UPDATED}</span>
          </div>

          <h1 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-medium leading-[1.05] text-balance">
            Privacy Policy
          </h1>
          <p className="mt-5 font-body text-[1.1rem] leading-relaxed text-ink-2">
            This policy explains what information Rhemic AI collects, why, how we use and share it, and the
            choices and rights you have. It covers our website, the free visibility scan, and the services
            we provide.
          </p>

          {/* Contents */}
          <nav className="mt-8 border-y border-[var(--line)] py-5">
            <p className="kicker mb-3">Contents</p>
            <ol className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="link-rule font-body text-[0.98rem] text-ink-2">
                    {String(i + 1).padStart(2, '0')} · {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <H id="who-we-are">1. Who we are</H>
          <P>
            Rhemic AI (operated by MyCrescentAI LLC, doing business as Rhemic AI) is the controller of the
            personal information described in this policy. You can reach us at contact@rhemicai.com.
          </P>

          <H id="what-we-collect">2. What we collect</H>
          <P>We only collect what we need to run the scan, respond to you, and deliver our services.</P>
          <ul className="mt-4 space-y-2.5">
            <LI><b>Information you give us.</b> Your name, email, phone number, and business website when you run the visibility scan, fill out a form, or book a call.</LI>
            <LI><b>Scan inputs.</b> The website address you submit, and the publicly available content we crawl from that address to produce your readiness report.</LI>
            <LI><b>Booking information.</b> Details you provide when scheduling a call through our scheduling provider.</LI>
            <LI><b>Usage and device data.</b> Pages viewed, actions taken, approximate location, IP address, browser and device information, and similar analytics collected automatically through cookies and similar technologies.</LI>
          </ul>

          <H id="how-we-use-it">3. How we use it</H>
          <ul className="mt-4 space-y-2.5">
            <LI>Run your visibility scan and generate and deliver your report.</LI>
            <LI>Respond to you, schedule and hold your audit call, and provide our services.</LI>
            <LI>Operate, secure, and improve our website and product.</LI>
            <LI>Send service messages, and marketing communications where you have opted in or as permitted by law. You can opt out at any time.</LI>
            <LI>Meet legal, tax, and security obligations and enforce our terms.</LI>
          </ul>
          <P>
            We do not sell your personal information, and we do not use client data to train public AI models.
            Any internal product improvement uses only aggregated or de-identified data.
          </P>

          <H id="cookies">4. Cookies and analytics</H>
          <P>
            We use cookies and similar technologies to run the site and understand how it is used, including
            Google Analytics, HubSpot, and performance tooling. You can control cookies through your browser
            settings. Blocking some cookies may affect how the site works.
          </P>

          <H id="sharing">5. How we share it</H>
          <P>We share information only as needed to run the business, never to sell it:</P>
          <ul className="mt-4 space-y-2.5">
            <LI><b>Service providers</b> who help us operate, such as hosting, our scan backend, analytics, scheduling, email delivery, and CRM, under contracts that limit their use of your data.</LI>
            <LI><b>Legal and safety</b> reasons, where required by law or to protect rights, property, or safety.</LI>
            <LI><b>Business transfers</b>, if we are involved in a merger, acquisition, or sale of assets, with notice as required.</LI>
          </ul>

          <H id="retention">6. Data retention</H>
          <P>
            We keep personal information only as long as needed for the purposes above, to provide our
            services, and to meet legal obligations, then delete or de-identify it.
          </P>

          <H id="your-rights">7. Your rights</H>
          <P>
            Depending on where you live, you may have the right to access, correct, delete, or port your
            personal information, to opt out of marketing, and to object to or restrict certain processing.
            This includes rights under the GDPR (EEA and UK) and the CCPA/CPRA (California). We do not sell or
            share personal information for cross-context behavioral advertising as those terms are defined by
            law. To exercise any right, email contact@rhemicai.com and we will respond as required.
          </P>

          <H id="security">8. Security</H>
          <P>
            We use reasonable technical and organizational measures to protect personal information. No method
            of transmission or storage is perfectly secure, but we work to protect your data and will notify
            affected parties and regulators of a breach as required by law.
          </P>

          <H id="children">9. Children&apos;s privacy</H>
          <P>
            Our website and services are for businesses and are not directed to children. We do not knowingly
            collect personal information from anyone under 16.
          </P>

          <H id="international">10. International transfers</H>
          <P>
            We are based in the United States and may process information there and in other countries. Where
            required, we use appropriate safeguards such as Standard Contractual Clauses for international
            transfers.
          </P>

          <H id="changes">11. Changes</H>
          <P>
            We may update this policy from time to time. When we do, we will revise the date at the top and,
            for material changes, provide additional notice where appropriate.
          </P>

          <H id="contact">12. Contact</H>
          <P>
            Questions or requests about this policy or your data: email contact@rhemicai.com.
          </P>

          <p className="mt-12 border-t border-[var(--line)] pt-6 font-body text-[0.9rem] italic leading-relaxed text-ink-3">
            This page describes our current practices in plain language. It is not legal advice.
          </p>
        </div>
      </main>
      <PaperFooter />
    </>
  );
}
