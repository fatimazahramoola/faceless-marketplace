-- Allow anonymous waitlist signups through the Supabase Data API.
grant usage on schema public to anon;
grant insert (email) on table public.waitlist to anon;
