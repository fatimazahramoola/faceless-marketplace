-- Run this in the Supabase SQL Editor

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

create unique index waitlist_email_lower_idx
  on public.waitlist (lower(trim(email)));

alter table public.waitlist enable row level security;

create policy "Allow anonymous waitlist signup"
  on public.waitlist
  for insert
  to anon
  with check (
    email ~* '^[^@]+@[^@]+\.[^@]+$'
  );

-- No SELECT, UPDATE, or DELETE policies for anon.
-- Email addresses cannot be read via the public anon key.
