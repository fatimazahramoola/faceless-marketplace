-- Auth-backed marketplace ownership, profiles, categories, and safer storage.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  avatar_url text,
  is_verified_seller boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are publicly readable"
  on public.profiles
  for select
  to anon, authenticated
  using (true);

create policy "Users update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'name', ''), split_part(new.email, '@', 1), 'Faceless user'),
    nullif(new.raw_user_meta_data->>'avatar_url', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.listings
  add column if not exists user_id uuid references auth.users(id) on delete cascade,
  add column if not exists category text not null default 'Other'
    check (category in ('Electronics', 'Fashion', 'Home', 'Furniture', 'Collectibles', 'Gaming', 'Automotive', 'Other')),
  add column if not exists cover_image_url text,
  add column if not exists view_count integer not null default 0;

drop policy if exists "Allow anonymous listing creation" on public.listings;
drop policy if exists "Allow public listing reads" on public.listings;

create policy "Active listings are publicly readable"
  on public.listings
  for select
  to anon, authenticated
  using (status = 'active' or auth.uid() = user_id);

create policy "Users create own listings"
  on public.listings
  for insert
  to authenticated
  with check (auth.uid() = user_id and status in ('draft', 'active'));

create policy "Users update own listings"
  on public.listings
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users delete own listings"
  on public.listings
  for delete
  to authenticated
  using (auth.uid() = user_id);

grant select on table public.profiles to anon, authenticated;
grant update (name, avatar_url, updated_at) on table public.profiles to authenticated;
grant select on table public.listings to authenticated;
grant insert (user_id, title, description, price, image_urls, cover_image_url, category, status)
  on table public.listings
  to authenticated;
grant update (title, description, price, image_urls, cover_image_url, category, status, updated_at)
  on table public.listings
  to authenticated;
grant delete on table public.listings to authenticated;

drop policy if exists "Allow anonymous listing image uploads" on storage.objects;

create policy "Authenticated users upload own listing images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'listing-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
