import Reveal from '@/components/shared/Reveal';
import { testimonials, type Testimonial } from '@/data/testimonials';

interface TestimonialsProps {
  items?: Testimonial[];
}

export default function Testimonials({ items = testimonials }: TestimonialsProps) {
  return (
    <section className="relative z-10 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-3xl">
          <p className="section-label mb-4">Med spa feedback</p>
          <h2 className="font-display text-3xl font-semibold leading-[1.08] text-[var(--text-primary)] md:text-5xl">
            Trusted by growth-focused med spa operators
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-[var(--text-secondary)] md:text-lg">
            Operators use Rhemic to understand where search, calls, handoffs, and source context are creating lost consult opportunities.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((testimonial, index) => (
            <Reveal key={`${testimonial.name}-${testimonial.company}`} delay={(index % 3) as 0 | 1 | 2}>
              <figure className="glass-panel flex h-full flex-col p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)]">
                <span className="font-display text-5xl leading-none text-[var(--pulse-deep)]/70">
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-base leading-[1.7] text-[var(--text-secondary)]">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-[var(--glass-border)] pt-5">
                  <p className="font-body text-sm font-semibold text-[var(--text-primary)]">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {testimonial.company}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    {testimonial.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
