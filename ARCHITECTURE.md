# Architecture

Faceless Marketplace is a Next.js 16 App Router application deployed on Vercel with Supabase for auth, Postgres, row level security, and storage.

## Application Layers

- `app/` contains pages, route handlers, and Server Actions.
- `components/` contains reusable UI built with Tailwind and the existing brand system.
- `lib/` contains Supabase clients, data helpers, metadata helpers, and shared types.
- `supabase/migrations/` is the source of truth for database and storage setup.

## Auth

Supabase Auth is used for email/password and Google OAuth. Server Actions use cookie-backed Supabase SSR clients and call `requireUser()` before protected mutations.

## Data Model

Core tables:

- `profiles`
- `listings`
- `wishlist_items`
- `recently_viewed`
- `orders`
- `notifications`
- `conversations`
- `messages`
- `reviews`
- `listing_reports`

RLS is enabled for all marketplace tables. Public reads are limited to active listings and seller profiles. User-owned data is scoped with `auth.uid()`.

## MVP Boundaries

Payments are mocked. Order statuses model the workflow without integrating a payment provider, escrow, delivery provider, or payout system.
