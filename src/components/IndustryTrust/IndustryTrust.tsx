const industries = [
  'Roofers',
  'Plumbers',
  'HVAC',
  'Electricians',
  'Landscapers',
  'Contractors',
  'Painters',
  'Pest Control',
  'Auto Repair',
  'Dental',
  'Legal',
];

export default function IndustryTrust() {
  return (
    <section className="relative z-10 py-16 md:py-20 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-sm text-[var(--text-muted)] font-body mr-1">
            Built for:
          </span>
          {industries.map((industry) => (
            <span
              key={industry}
              className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-[var(--text-secondary)] font-body"
            >
              {industry}
            </span>
          ))}
        </div>

        <p className="text-sm text-[var(--text-muted)] font-body max-w-xl mx-auto">
          Powered by the same AI visibility engine used by marketing agencies — at a price built for local business.
        </p>

        {/* TODO: add real testimonials */}
      </div>
    </section>
  );
}
