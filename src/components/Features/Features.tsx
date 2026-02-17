const features = [
  {
    title: 'Website Auditing',
    description:
      'Ensure your site is technically optimized for AI discovery. Our agents crawl your pages, analyze schema markup, content structure, and technical SEO \u2014 delivering an AEO score in under 5 minutes.',
    tags: ['AI-Ready', 'Schema Analysis', '5-Min Audit'],
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--text-secondary)]"
      >
        <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="2" />
        <line x1="28.5" y1="28.5" x2="38" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 18L17 15V25L14 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 18L23 15V25L26 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="19" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="20" x2="21" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="23" x2="21" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Competitor Analysis',
    description:
      'Decode rival strategies and see who\u2019s being recommended by AI answer engines. We query ChatGPT, Claude, and Perplexity for your target keywords \u2014 showing exactly where you stand.',
    tags: ['ChatGPT Tracking', 'Gap Analysis', 'Real-Time'],
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--text-secondary)]"
      >
        <rect x="10" y="26" width="6" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="21" y="14" width="6" height="26" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="32" y="20" width="6" height="20" rx="1" stroke="currentColor" strokeWidth="2" />
        <circle cx="13" cy="22" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="35" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 21L22 11.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M26 11L33 15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    title: 'Automated Code Generation',
    description:
      'Get AI-generated schema markup, FAQ JSON-LD, and optimized robots.txt \u2014 all tailored to boost your visibility in AI answers. Review, approve, and deploy with one click.',
    tags: ['Schema Markup', 'JSON-LD', 'One-Click Deploy'],
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--text-secondary)]"
      >
        <path d="M16 16L8 24L16 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 16L40 24L32 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="27" y1="14" x2="21" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M36 8L38 6L40 8" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="38" y1="6" x2="38" y2="11" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="42" cy="12" r="1" fill="#8B5CF6" />
        <circle cx="35" cy="5" r="0.8" fill="#6366F1" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="solutions" className="relative py-32 md:py-40 px-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <p className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-6 font-body">
          Solutions
        </p>
        <div className="mb-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.1] text-[var(--text-primary)] font-display">
            AEO platform for modern businesses
          </h2>
        </div>
        <p className="text-base md:text-lg text-[var(--text-primary)] max-w-2xl mx-auto font-normal leading-[1.6] opacity-80 font-body">
          Rhemic AI gives your brand the tools to appear in every AI-generated answer.
          Audit, analyze, and optimize — all from one platform.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-2xl p-8 hover:bg-[var(--bg-glass-hover)] hover:border-[var(--border-strong)] transition-[background-color,border-color] duration-500 flex flex-col"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
              {feature.title}
            </h3>
            <p className="text-sm text-[var(--text-tertiary)] leading-relaxed flex-1 mb-6">
              {feature.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {feature.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium text-[var(--text-tertiary)] bg-[var(--bg-glass)] rounded-full border border-[var(--border-default)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
