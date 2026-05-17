import CalBookingLink from '@/components/CalEmbed/CalBookingLink';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] font-display">
            Your competitors are already being recommended by AI.
          </h2>
        </div>

        <p className="mt-6 text-base md:text-lg text-[var(--text-primary)] font-normal max-w-2xl mx-auto leading-relaxed opacity-75 font-body">
          Book a discovery call and we&apos;ll help you understand where AI answer engines are passing you over.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CalBookingLink
            calLink="rhemic-ai/discovery-call"
            className="px-8 py-4 text-lg font-semibold text-black bg-white hover:bg-gray-100 rounded-[5px] shadow-lg shadow-white/10 transition-all duration-200 hover:scale-105"
          >
            Book a Demo
          </CalBookingLink>

          <Link
            href="/how-it-works"
            className="px-8 py-4 text-base font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] rounded-[5px] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300"
          >
            How it works
          </Link>
        </div>

        <p className="mt-6 text-sm text-[var(--text-secondary)] tracking-wide">
          No pressure. We&apos;ll show you what a real AI visibility workflow looks like.
        </p>
      </div>
    </section>
  );
}
