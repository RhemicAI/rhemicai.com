'use client';

import type { PricingPlan as CheckoutPlan } from '@/data/pricing';

type Props = {
  plan: CheckoutPlan;
  className: string;
  children: React.ReactNode;
};

export default function PlanCheckoutButton({ plan, className, children }: Props) {
  return (
    <a href={`/signup?plan=${plan.tier}`} className={className}>
      {children}
    </a>
  );
}
