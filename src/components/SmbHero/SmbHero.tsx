import CalBookingLink from '@/components/CalEmbed/CalBookingLink';

export default function SmbHero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 pt-28 pb-12">
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(10, 10, 10, 0.85) 0%, rgba(10, 10, 10, 0.5) 50%, transparent 80%)',
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="text-[11px] sm:text-sm font-medium tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-6 font-body">
          AI VISIBILITY FOR LOCAL BUSINESSES
        </p>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)] font-display mb-6"
          style={{ textShadow: '0 0 40px rgba(10, 10, 10, 0.9)' }}
        >
          When someone asks AI &ldquo;best restaurant near me,&rdquo; do you show up?
        </h1>

        {/* A/B test variant - uncomment to test */}
        {/* <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)] font-display mb-6"
          style={{ textShadow: '0 0 40px rgba(10, 10, 10, 0.9)' }}
        >
          I asked AI &ldquo;best roofer in [city]&rdquo; and here&apos;s whose name came up. Not yours.
        </h1> */}

        <p
          className="text-base md:text-lg text-[var(--text-primary)] max-w-2xl mx-auto font-normal leading-[1.6] mb-10 opacity-80 font-body"
          style={{ textShadow: '0 0 40px rgba(10, 10, 10, 0.9)' }}
        >
          More customers now ask AI for recommendations before they search Google. If you&apos;re not in the answer, you&apos;re losing business to competitors who are.
        </p>

        <CalBookingLink
          calLink="rhemic-ai/discovery-call"
          className="inline-block px-8 py-4 text-lg font-semibold text-[var(--bg)] bg-[var(--ink)] hover:bg-[var(--pulse)] rounded-full shadow-lg shadow-[var(--pulse-soft)] transition-all duration-200 hover:scale-105 font-body tracking-[0.01em]"
        >
          Book a Demo
        </CalBookingLink>
      </div>
    </section>
  );
}
