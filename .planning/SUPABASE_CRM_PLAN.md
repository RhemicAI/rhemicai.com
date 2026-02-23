# Supabase CRM Plan — RhemicAI

**Status:** Planning (not started)
**Cost:** ~$10/month (Micro instance)

---

## What We're Building

A lightweight CRM backend so the contact form actually captures leads and we can manage them.

---

## Prerequisites (Your Part)

1. Create Supabase project (Micro tier, ~$10/month)
2. Provide:
   - Project URL (`https://xxxxx.supabase.co`)
   - Anon key (public, safe for client-side)
   - Service role key (private, for admin dashboard — stored in `.env.local` only)

---

## Phase 1: Database + Form Wiring

**Goal:** Contact form submissions go to Supabase instead of `console.log`

### Database Schema

```sql
-- leads table
create table leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text not null,
  role text not null,
  message text not null,
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'lost')),
  source text default 'contact_form',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row Level Security
alter table leads enable row level security;

-- Allow anonymous inserts (contact form)
create policy "Allow public inserts" on leads
  for insert with check (true);

-- Block public reads (only service role can read)
create policy "Block public reads" on leads
  for select using (false);
```

### Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `.env.local` | Create | Supabase URL + keys |
| `src/lib/supabase.ts` | Create | Supabase client init |
| `src/app/api/contact/route.ts` | Create | API route for form submission |
| `src/app/contact/page.tsx` | Modify | Wire form to API, add success/error states |

### Form UX Changes

- Loading state on submit button ("Sending...")
- Success message ("Message sent! We'll be in touch within 24 hours.")
- Error handling ("Something went wrong. Please email us directly.")
- Disable double-submit

---

## Phase 2: Admin Dashboard

**Goal:** View and manage leads at `/admin/leads`

### Files to Create

| File | Purpose |
|------|---------|
| `src/app/admin/leads/page.tsx` | Lead management dashboard |
| `src/lib/supabase-admin.ts` | Server-side Supabase client (service role key) |

### Dashboard Features

- Table view of all leads (name, email, company, role, date, status)
- Filter by status (new / contacted / qualified / converted / lost)
- Click to expand full message
- Update status dropdown
- Add notes field
- Sort by date (newest first)
- Simple password protection (env variable, no auth system needed yet)

---

## Phase 3: Notifications (Optional)

**Goal:** Get notified when new leads come in

### Options (pick one later)

1. **Supabase Edge Function** → sends email via Resend ($0)
2. **Supabase Webhook** → hits a Slack webhook ($0)
3. **Database trigger** → Supabase pg_notify + listener ($0)
4. **Simple polling** → Check dashboard manually (free, no setup)

---

## Phase 4: Start Free Trial Form (Optional)

**Goal:** Wire up `/start-free-trial` page the same way

- Same Supabase table or separate `trials` table
- Captures: name, email, company, website URL
- Different source tag (`source: 'free_trial'`)

---

## Tech Stack

| Layer | Tool | Cost |
|-------|------|------|
| Database | Supabase Postgres (Micro) | ~$10/month |
| API | Next.js API routes | $0 (bundled) |
| Client | @supabase/supabase-js | $0 |
| Dashboard | React page (no extra deps) | $0 |
| Notifications | TBD | $0 |

**Total: ~$10/month**

---

## Security

- Anon key only allows INSERT to `leads` table (RLS enforced)
- No public SELECT — leads are never exposed client-side
- Service role key only used server-side in admin dashboard
- Admin page protected by env password
- No PII exposed in client bundle
- Rate limiting on API route (optional, can add later)

---

## Timeline Estimate

| Phase | Work | When |
|-------|------|------|
| Phase 1 | Form wiring | ~30 min after keys provided |
| Phase 2 | Admin dashboard | ~1 hour |
| Phase 3 | Notifications | ~30 min (when ready) |
| Phase 4 | Trial form | ~15 min |

---

## When Ready

1. Create Supabase project
2. Share URL + keys
3. Say "let's do it" and I'll build it
