import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Sign up — Rhemic AI',
  description:
    'Start your Rhemic AI plan. Pick Starter, Growth, or Scale and get set up in minutes. Cancel anytime.',
  path: '/signup',
  keywords: ['rhemic ai signup', 'aeo signup', 'rhemic checkout'],
});

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
