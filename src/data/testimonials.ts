export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  role: string;
}

// Draft testimonials for the homepage conversion section.
// Replace this array with approved customer quotes or API-fetched data when available.
export const testimonials: Testimonial[] = [
  {
    quote:
      'In the first 90 days, Rhemic helped us see where consult opportunities were getting lost between search, calls, and team handoffs. The Growth plan gave us a clearer way to decide what to fix first.',
    name: 'Jessica M.',
    company: 'Luma Aesthetics Studio',
    role: 'Growth plan, 90-day review',
  },
  {
    quote:
      'As a newer clinic, Basic helped us understand the gaps we kept missing: our Google profile, treatment pages, reviews, and missed-call opportunities. The 90-day review made the next steps feel manageable.',
    name: 'Elizabeth K.',
    company: 'Evernorth Med Spa',
    role: 'Basic plan, 90-day review',
  },
  {
    quote:
      'Premium gave our team a cleaner view of where demand was coming from and which handoffs needed attention. Within 90 days, we had better source context and stronger call coverage to work from.',
    name: 'Maria Rodriguez',
    company: 'Solara Med Spa',
    role: 'Premium plan, 90-day review',
  },
];
