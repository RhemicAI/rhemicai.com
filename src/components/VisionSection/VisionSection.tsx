export default function VisionSection() {
  return (
    <section className="relative py-28 md:py-36 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#8B5CF6] mb-4 font-body">
          The Vision
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] text-[var(--text-primary)] leading-tight font-display mb-8">
          The Agencies That Move First Define the Category
        </h2>
        <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-body max-w-2xl mx-auto mb-10">
          In five years, every agency will offer AI visibility services. The ones who start now won&apos;t just have a head start &mdash; they&apos;ll have the data, the case studies, and the client trust that late movers can never catch up to.
        </p>
        <a
          href="#ai-visibility-scan"
          className="inline-block px-8 py-4 text-lg font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-full shadow-lg shadow-violet-500/50 transition-all duration-200 hover:scale-105 font-body"
        >
          Start Your First Scan Free
        </a>
      </div>
    </section>
  );
}
