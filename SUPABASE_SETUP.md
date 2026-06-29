# Supabase Setup

## Environment Variables

Set these locally and in Vercel:

```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Auth Providers

Enable:

- Email/password
- Google OAuth

Add callback URLs:

- `https://facelessmarketplace.co.za/auth/callback`
- Vercel preview callback URLs as needed
- `http://localhost:3000/auth/callback` for local development

## Database

Run migrations in `supabase/migrations/` in order. Do not make manual dashboard-only schema changes.

## Storage

Create/use the `listing-images` bucket through migrations. The bucket is public for image reads. Authenticated users upload to folders named with their user id.
