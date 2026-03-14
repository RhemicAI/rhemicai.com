export default function WebsiteOffer() {
  return (
    <section className="relative z-10 py-20 md:py-28 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400 mb-4 font-body">
            Included with Growth Plan
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-display mb-6">
            No website? We&apos;ll build one — free.
          </h2>
          <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed font-body">
            Growth plan includes a professional 3-page website (Home, About, Contact) — built for you, no extra charge. You focus on the work. We handle getting you online and visible.
          </p>
        </div>
      </div>
    </section>
  );
}
