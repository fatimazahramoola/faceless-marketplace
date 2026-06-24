-- Marketplace MVP listings and public image storage.

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 3 and 120),
  description text not null check (char_length(trim(description)) between 10 and 2000),
  price numeric(12, 2) not null check (price > 0),
  image_urls text[] not null default '{}',
  status text not null default 'active'
    check (status in ('draft', 'active', 'sold', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index listings_status_created_at_idx
  on public.listings (status, created_at desc);

alter table public.listings enable row level security;

create policy "Allow public listing reads"
  on public.listings
  for select
  to anon
  using (status = 'active');

create policy "Allow anonymous listing creation"
  on public.listings
  for insert
  to anon
  with check (status = 'active');

grant usage on schema public to anon;
grant select, insert (title, description, price, image_urls, status)
  on table public.listings
  to anon;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-images',
  'listing-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Allow public listing image reads"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'listing-images');

create policy "Allow anonymous listing image uploads"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'listing-images');
