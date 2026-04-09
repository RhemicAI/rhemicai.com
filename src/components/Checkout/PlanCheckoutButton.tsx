'use client';

import type { CheckoutPlan } from '@/lib/pricing';

const SIGNUP_URL = process.env.NEXT_PUBLIC_PORTAL_URL
  ? `${process.env.NEXT_PUBLIC_PORTAL_URL}/signup`
  : 'https://app.rhemicai.com/signup';

type Props = {
  plan: CheckoutPlan;
  className: string;
  children: React.ReactNode;
};

export default function PlanCheckoutButton({ plan, className, children }: Props) {
  return (
    <a href={SIGNUP_URL} className={className}>
      {children}
    </a>
  );
}
