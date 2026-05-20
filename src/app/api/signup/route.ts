import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { plans, type PricingTier } from '@/data/pricing';

type SignupBody = {
  tier?: string;
  account?: {
    businessName?: string;
    contactName?: string;
    email?: string;
    phone?: string;
  };
};

function isTier(value: unknown): value is PricingTier {
  return value === 'starter' || value === 'growth' || value === 'scale';
}

export async function POST(request: Request) {
  let body: SignupBody;
  try {
    body = (await request.json()) as SignupBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { tier, account } = body;

  if (!isTier(tier)) {
    return NextResponse.json({ error: 'Invalid plan tier.' }, { status: 400 });
  }
  if (!account?.businessName || !account.contactName || !account.email) {
    return NextResponse.json(
      { error: 'Business name, contact name, and email are required.' },
      { status: 400 }
    );
  }
  if (!account.email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
  }

  const plan = plans.find((p) => p.tier === tier);
  if (!plan) {
    return NextResponse.json({ error: 'Plan not found.' }, { status: 404 });
  }
  if (!plan.stripePaymentLink) {
    return NextResponse.json(
      { error: 'Payment link not configured for this tier.' },
      { status: 500 }
    );
  }

  // TODO: production flow
  // 1. Hash account.password (sent in body once auth wiring lands) with argon2/bcrypt.
  // 2. INSERT INTO tenants (id, business_name, contact_name, email, phone, plan_tier,
  //    status='pending_payment', created_at) RETURNING id.
  // 3. tenantId comes from the insert above; we generate a placeholder here.
  // 4. /api/webhooks/stripe consumes checkout.session.completed, looks up the tenant
  //    by client_reference_id, flips status to 'active', and provisions dashboard access.
  // 5. Migrate stripePaymentLink resolution from pricing.ts placeholders to env vars
  //    (STRIPE_PAYMENT_LINK_STARTER / _GROWTH / _SCALE) so URLs stay out of the bundle.
  const tenantId = `tenant_${randomUUID()}`;

  const params = new URLSearchParams({
    client_reference_id: tenantId,
    prefilled_email: account.email,
  });
  const redirectUrl = `${plan.stripePaymentLink}?${params.toString()}`;

  return NextResponse.json({
    success: true,
    redirectUrl,
    plan: {
      name: plan.name,
      tier: plan.tier,
      monthlyPrice: plan.monthlyPrice,
    },
    tenantId,
  });
}
