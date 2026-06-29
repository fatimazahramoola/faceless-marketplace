# Deployment

The app targets Vercel with Cloudflare managing DNS for `facelessmarketplace.co.za`.

## Vercel

Required build command:

```bash
npm run build
```

Required environment variables are documented in `SUPABASE_SETUP.md`.

## Cloudflare

Point DNS to Vercel according to the Vercel project domain instructions. Keep SSL/TLS mode compatible with Vercel managed certificates.

## Pre-Deploy Checklist

- Migrations applied
- Supabase Auth providers configured
- Storage bucket policies verified
- `npm run lint` passes
- `npm run build` passes
