# Faceless Marketplace

A trusted marketplace MVP for South African buyers and everyday sellers.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, Storage, and RLS
- Vercel
- Cloudflare DNS

## Development

```bash
npm install
npm run dev
```

Before committing:

```bash
npm run lint
npm run build
```

## Documentation

- `ARCHITECTURE.md`
- `SUPABASE_SETUP.md`
- `DEPLOYMENT.md`
- `ROADMAP.md`
- `CONTRIBUTING.md`

## Authentication updates (work in progress)

- Added Confirm Password UI with live validation and password strength meter (client-side).
- Enforced a sensible minimum password length of 8 characters server-side and required at least one uppercase, one lowercase, and one number.
- Added Forgot Password and Reset Password pages (Supabase reset email flow).
- Preserves `redirectTo` through login/signup flows to return users to the intended page.
Authentication architecture:

- Uses Supabase Auth (client + server) with server-side actions for signup, login, logout, profile updates, and password reset.
- Client forms submit to server actions implemented in `app/actions/auth.ts` which use `createServerClient()` from `lib/supabase/server.ts`.
- Protected pages use `requireUser()` / `getCurrentUser()` helpers from `lib/supabase/server.ts` to enforce authentication on the server.

Environment variables (important):

- `NEXT_PUBLIC_SUPABASE_URL` — public Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public anon key for browser clients
- `SUPABASE_URL` / `SUPABASE_ANON_KEY` — server-side fallback if needed
- For production email/SMS customization, configure SMTP in the Supabase project settings.

Google OAuth setup:

- Create OAuth credentials in Google Cloud and register the client ID/secret in the Supabase Auth provider settings.
- Ensure the redirect URI matches `https://<your-domain>/auth/callback` and add that URL to the Google OAuth consent/redirect URIs.

Password reset flow:

- Users request a reset via `/forgot-password` which calls a server action to trigger Supabase's `resetPasswordForEmail` with a redirect to `/reset-password`.
- On the reset page, if Supabase has authenticated the session from the reset link the user can set a new password using the client-side `supabase.auth.updateUser`.

Remaining work:

- Resend verification via Supabase admin API (requires service-role keys) — deferred until production.
- Robust account linking for Google/email identities — deferred and requires secure server-side admin flows.
