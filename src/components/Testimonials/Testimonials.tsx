import Image from 'next/image';
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
                <figcaption className="mt-8 flex items-center gap-3 border-t border-[var(--glass-border)] pt-5">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg-2)] shadow-[0_0_20px_rgba(77,214,224,0.12)]">
                    {testimonial.avatarSrc ? (
                      <Image
                        src={testimonial.avatarSrc}
                        alt={`${testimonial.name}, ${testimonial.company}`}
                        width={44}
                        height={44}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--pulse-deep)]">
                        {testimonial.initials}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-[var(--text-primary)]">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {testimonial.company}
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      {testimonial.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
