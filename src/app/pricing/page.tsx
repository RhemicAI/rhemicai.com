import type { Metadata } from 'next';
import PaperNav from '@/components/redesign/PaperNav';
import PaperFooter from '@/components/redesign/PaperFooter';
import Reveal from '@/components/redesign/Reveal';
import AuditButton from '@/components/redesign/AuditButton';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing: Quoted Per Business',
  description:
    'Rhemic quotes every business on its own needs. We set up and run your ChatGPT business profile, Google Business Profile, website and reviews. Book a 30-minute discovery call for your quote.',
  path: '/pricing',
  keywords: ['AI visibility pricing', 'SEO GEO AEO pricing', 'AI visibility audit cost', 'local business SEO pricing'],
});

export default function PricingPage() {
  return (
    <>
      <PaperNav />
      <main className="relative">
        {/* Header */}
        <section className="px-5 pb-12 pt-32 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-center justify-between border-y border-[var(--ink)] py-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-2">Pricing</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">Any industry · U.S.</span>
            </div>
            <Reveal className="max-w-3xl">
              <h1 className="font-display text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.0] text-balance">
                Quoted on{' '}
                <span className="italic text-spot-deep">your needs.</span>
              </h1>
              <p className="mt-6 max-w-xl font-body text-[1.15rem] leading-relaxed text-ink-2 text-pretty">
                We quote every business on its own needs: the number of locations, the market and
                the work involved. You get the price on a 30-minute discovery call.
              </p>
            </Reveal>
          </div>
        </section>


        {/* Footnote */}
        <section className="border-t border-[var(--line)] bg-[var(--paper-2)] px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[1.4rem] font-semibold leading-snug text-ink">
              Book a discovery call.
            </p>
            <p className="mt-3 font-body text-[1.02rem] leading-relaxed text-ink-2">
              On the call we learn your business, look at your ChatGPT business profile, Google Business
              Profile and website, and scope the work. The quote follows the call.
            </p>
            <AuditButton className="btn-primary mt-7">Book a discovery call</AuditButton>
          </div>
        </section>
      </main>
      <PaperFooter />
    </>
  );
}
