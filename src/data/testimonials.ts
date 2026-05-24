export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  role: string;
}

// Placeholder testimonials for the homepage conversion section.
// Replace this array with approved customer quotes or API-fetched data when available.
export const testimonials: Testimonial[] = [
  {
    quote:
      'Rhemic helped us see where consult demand was leaking between search visibility, missed calls, and follow-up.',
    name: 'Practice Manager',
    company: 'Demo Med Spa',
    role: 'Placeholder testimonial',
  },
  {
    quote:
      'The audit made it obvious which pages, calls, and visibility gaps needed attention first.',
    name: 'Clinic Owner',
    company: 'Demo Aesthetics Clinic',
    role: 'Placeholder testimonial',
  },
  {
    quote:
      'We wanted a clearer way to understand which demand sources were turning into consult opportunities.',
    name: 'Marketing Lead',
    company: 'Demo Wellness Spa',
    role: 'Placeholder testimonial',
  },
];
