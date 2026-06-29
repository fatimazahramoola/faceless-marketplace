-- Buyer activity, mock orders, notifications, messaging, reviews, and reports.

create table public.wishlist_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

create table public.recently_viewed (
  user_id uuid not null references auth.users(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id),
  buyer_id uuid not null references auth.users(id),
  seller_id uuid not null references auth.users(id),
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'shipped', 'delivered', 'completed', 'cancelled')),
  amount numeric(12, 2) not null check (amount > 0),
  buyer_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_id uuid not null references auth.users(id) on delete cascade,
  seller_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (listing_id, buyer_id, seller_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_id uuid not null references auth.users(id) on delete cascade,
  seller_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  comment text not null check (char_length(trim(comment)) between 5 and 1000),
  created_at timestamptz not null default now(),
  unique (reviewer_id, seller_id, order_id)
);

create table public.listing_reports (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  reporter_id uuid references auth.users(id) on delete set null,
  reason text not null check (char_length(trim(reason)) between 5 and 500),
  created_at timestamptz not null default now()
);

alter table public.wishlist_items enable row level security;
alter table public.recently_viewed enable row level security;
alter table public.orders enable row level security;
alter table public.notifications enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;
alter table public.listing_reports enable row level security;

create policy "Users manage own wishlist" on public.wishlist_items
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own recently viewed" on public.recently_viewed
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Order participants read orders" on public.orders
  for select to authenticated
  using (auth.uid() in (buyer_id, seller_id));

create policy "Buyers create own orders" on public.orders
  for insert to authenticated
  with check (auth.uid() = buyer_id);

create policy "Order participants update orders" on public.orders
  for update to authenticated
  using (auth.uid() in (buyer_id, seller_id))
  with check (auth.uid() in (buyer_id, seller_id));

create policy "Users read own notifications" on public.notifications
  for select to authenticated
  using (auth.uid() = user_id);

create policy "Users update own notifications" on public.notifications
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users create own notifications" on public.notifications
  for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Conversation participants read conversations" on public.conversations
  for select to authenticated
  using (auth.uid() in (buyer_id, seller_id));

create policy "Buyers create conversations" on public.conversations
  for insert to authenticated
  with check (auth.uid() = buyer_id);

create policy "Conversation participants update conversations" on public.conversations
  for update to authenticated
  using (auth.uid() in (buyer_id, seller_id))
  with check (auth.uid() in (buyer_id, seller_id));

create policy "Participants read messages" on public.messages
  for select to authenticated
  using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
      and auth.uid() in (c.buyer_id, c.seller_id)
    )
  );

create policy "Participants send messages" on public.messages
  for insert to authenticated
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.conversations c
      where c.id = conversation_id
      and auth.uid() in (c.buyer_id, c.seller_id)
    )
  );

create policy "Reviews are public" on public.reviews
  for select to anon, authenticated
  using (true);

create policy "Users create own reviews" on public.reviews
  for insert to authenticated
  with check (auth.uid() = reviewer_id and auth.uid() <> seller_id);

create policy "Users create reports" on public.listing_reports
  for insert to authenticated
  with check (auth.uid() = reporter_id);

grant select, insert, delete on public.wishlist_items to authenticated;
grant select, insert, update, delete on public.recently_viewed to authenticated;
grant select, insert, update on public.orders to authenticated;
grant select, insert, update on public.notifications to authenticated;
grant select, insert, update on public.conversations to authenticated;
grant select, insert on public.messages to authenticated;
grant select on public.reviews to anon, authenticated;
grant insert on public.reviews to authenticated;
grant insert on public.listing_reports to authenticated;

create index orders_buyer_id_created_at_idx on public.orders (buyer_id, created_at desc);
create index orders_seller_id_created_at_idx on public.orders (seller_id, created_at desc);
create index notifications_user_id_created_at_idx on public.notifications (user_id, created_at desc);
create index messages_conversation_id_created_at_idx on public.messages (conversation_id, created_at);
