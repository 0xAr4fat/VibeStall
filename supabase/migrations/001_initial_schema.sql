-- Enable UUID extension
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Custom types
create type app_status as enum ('pending', 'verified', 'rejected', 'published', 'suspended');
create type verification_status as enum ('pending', 'passed', 'failed', 'error');
create type payment_status as enum ('pending', 'completed', 'failed', 'refunded');
create type user_role as enum ('buyer', 'seller', 'admin');
create type ban_reason as enum ('policy_violation', 'fraud', 'spam', 'inappropriate_content', 'security_risk', 'other');

-- Profiles table (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role user_role not null default 'buyer',
  is_banned boolean not null default false,
  ban_reason ban_reason,
  banned_at timestamptz,
  banned_by uuid references public.profiles(id),
  phone text,
  location text,
  bio text,
  website_url text,
  total_sales integer not null default 0,
  total_purchases integer not null default 0,
  rating numeric(3,2) default 0.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Categories for apps
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  color text default '#2563EB',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Apps table
create table public.apps (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references public.profiles(id) not null,
  category_id uuid references public.categories(id),
  name text not null,
  slug text not null,
  description text not null,
  short_description text,
  app_icon_url text,
  app_preview_images text[],
  source_code_url text,
  app_version text,
  app_size_bytes bigint,
  platform text,
  price numeric(12,2) not null default 0.00,
  currency text default 'USD',
  status app_status not null default 'pending',
  verification_status verification_status not null default 'pending',
  verification_notes text,
  verified_at timestamptz,
  verified_by uuid references public.profiles(id),
  download_count integer not null default 0,
  rating numeric(3,2) default 0.00,
  review_count integer not null default 0,
  is_featured boolean not null default false,
  metadata jsonb default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(seller_id, slug)
);

-- Keystore records
create table public.keystores (
  id uuid default uuid_generate_v4() primary key,
  app_id uuid references public.apps(id) not null,
  store_type text not null,
  store_file_url text,
  alias text,
  key_password_hash text,
  store_password_hash text,
  certificate_fingerprint text,
  certificate_valid_from timestamptz,
  certificate_valid_to timestamptz,
  certificate_issuer text,
  certificate_subject text,
  key_algorithm text,
  key_size integer,
  signature_algorithm text,
  uploaded_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Signatures records
create table public.signatures (
  id uuid default uuid_generate_v4() primary key,
  app_id uuid references public.apps(id) not null,
  signature_file_url text,
  signature_type text,
  signature_algorithm text,
  signed_at timestamptz,
  signer_certificate_url text,
  signature_hash text,
  verification_result text,
  uploaded_at timestamptz not null default now()
);

-- Source code scan results
create table public.source_scans (
  id uuid default uuid_generate_v4() primary key,
  app_id uuid references public.apps(id) not null,
  scan_type text not null,
  severity text,
  rule_id text,
  message text,
  file_path text,
  line_number integer,
  column_number integer,
  code_snippet text,
  is_fixed boolean not null default false,
  scanned_at timestamptz not null default now()
);

-- Verification sessions (track each app verification run)
create table public.verification_sessions (
  id uuid default uuid_generate_v4() primary key,
  app_id uuid references public.apps(id) not null,
  triggered_by uuid references public.profiles(id),
  keystore_status verification_status not null default 'pending',
  signature_status verification_status not null default 'pending',
  source_code_status verification_status not null default 'pending',
  virus_scan_status verification_status not null default 'pending',
  overall_status verification_status not null default 'pending',
  details jsonb default '{}',
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  error_message text
);

-- Payments / Purchases
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  buyer_id uuid references public.profiles(id) not null,
  app_id uuid references public.apps(id) not null,
  seller_id uuid references public.profiles(id) not null,
  amount numeric(12,2) not null,
  currency text default 'USD',
  platform_fee numeric(12,2) not null default 0.00,
  seller_earning numeric(12,2) not null default 0.00,
  status payment_status not null default 'pending',
  payment_provider text,
  payment_provider_id text,
  download_url text,
  download_expires_at timestamptz,
  downloaded_at timestamptz,
  download_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Reviews / Ratings
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  app_id uuid references public.apps(id) not null,
  buyer_id uuid references public.profiles(id) not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  title text,
  comment text,
  is_verified_purchase boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(app_id, buyer_id)
);

-- Analytics events
create table public.analytics_events (
  id uuid default uuid_generate_v4() primary key,
  event_type text not null,
  event_name text not null,
  user_id uuid references public.profiles(id),
  app_id uuid references public.apps(id),
  properties jsonb default '{}',
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

-- Support tickets
create table public.support_tickets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  subject text not null,
  message text not null,
  status text not null default 'open',
  priority text not null default 'medium',
  assigned_to uuid references public.profiles(id),
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- App versions history
create table public.app_versions (
  id uuid default uuid_generate_v4() primary key,
  app_id uuid references public.apps(id) not null,
  version text not null,
  source_code_url text,
  keystore_id uuid references public.keystores(id),
  signature_id uuid references public.signatures(id),
  changelog text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Notification settings / preferences
create table public.user_preferences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null unique,
  email_notifications boolean not null default true,
  push_notifications boolean not null default true,
  marketing_emails boolean not null default false,
  theme text not null default 'dark',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.apps enable row level security;
alter table public.keystores enable row level security;
alter table public.signatures enable row level security;
alter table public.source_scans enable row level security;
alter table public.verification_sessions enable row level security;
alter table public.payments enable row level security;
alter table public.reviews enable row level security;
alter table public.analytics_events enable row level security;
alter table public.support_tickets enable row level security;
alter table public.app_versions enable row level security;
alter table public.user_preferences enable row level security;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Profiles: users can read all profiles, update own
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admins can manage all profiles" on public.profiles for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Categories: viewable by all, managed by admins
create policy "Categories are viewable by everyone" on public.categories for select using (true);
create policy "Admins can manage categories" on public.categories for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Apps: viewable by all (published), sellers manage own, admins manage all
create policy "Published apps are viewable by everyone" on public.apps for select using (
  status = 'published' OR auth.uid() = seller_id OR
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Sellers can insert own apps" on public.apps for insert with check (auth.uid() = seller_id);
create policy "Sellers can update own apps" on public.apps for update using (auth.uid() = seller_id);
create policy "Admins can manage all apps" on public.apps for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Keystores: sellers own app keystores, admins all
create policy "Keystores viewable by app owner and admins" on public.keystores for select using (
  exists (select 1 from public.apps where id = app_id and (seller_id = auth.uid() or
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')))
);
create policy "Sellers can manage own app keystores" on public.keystores for all using (
  exists (select 1 from public.apps where id = app_id and seller_id = auth.uid())
);
create policy "Admins can manage all keystores" on public.keystores for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Signatures: similar to keystores
create policy "Signatures viewable by app owner and admins" on public.signatures for select using (
  exists (select 1 from public.apps where id = app_id and (seller_id = auth.uid() or
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')))
);
create policy "Sellers can manage own app signatures" on public.signatures for all using (
  exists (select 1 from public.apps where id = app_id and seller_id = auth.uid())
);
create policy "Admins can manage all signatures" on public.signatures for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Source scans: viewable by app owner and admins
create policy "Source scans viewable by app owner and admins" on public.source_scans for select using (
  exists (select 1 from public.apps where id = app_id and (seller_id = auth.uid() or
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')))
);
create policy "System can insert source scans" on public.source_scans for insert with check (true);
create policy "Admins can manage all source scans" on public.source_scans for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Verification sessions: viewable by app owner and admins
create policy "Verification sessions viewable by app owner and admins" on public.verification_sessions for select using (
  exists (select 1 from public.apps where id = app_id and (seller_id = auth.uid() or
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')))
);
create policy "System can manage verification sessions" on public.verification_sessions for all with check (true);
create policy "Admins can manage all verification sessions" on public.verification_sessions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Payments: buyers see own, sellers see own sales, admins all
create policy "Payments viewable by involved parties and admins" on public.payments for select using (
  buyer_id = auth.uid() OR seller_id = auth.uid() OR
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Buyers can insert payments" on public.payments for insert with check (auth.uid() = buyer_id);
create policy "Admins can manage all payments" on public.payments for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Reviews: viewable by all, buyers insert own
create policy "Reviews are viewable by everyone" on public.reviews for select using (true);
create policy "Buyers can insert own reviews" on public.reviews for insert with check (auth.uid() = buyer_id);
create policy "Buyers can update own reviews" on public.reviews for update using (auth.uid() = buyer_id);
create policy "Admins can manage all reviews" on public.reviews for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Analytics events: viewable by admins, system inserts
create policy "Analytics viewable by admins" on public.analytics_events for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "System can insert analytics" on public.analytics_events for insert with check (true);

-- Support tickets: users see own, admins all
create policy "Support tickets viewable by owner and admins" on public.support_tickets for select using (
  user_id = auth.uid() OR exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Users can insert own support tickets" on public.support_tickets for insert with check (auth.uid() = user_id);
create policy "Admins can manage all support tickets" on public.support_tickets for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- App versions: viewable by app owner and admins
create policy "App versions viewable by app owner and admins" on public.app_versions for select using (
  exists (select 1 from public.apps where id = app_id and (seller_id = auth.uid() or
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')))
);
create policy "Sellers can manage own app versions" on public.app_versions for all using (
  exists (select 1 from public.apps where id = app_id and seller_id = auth.uid())
);
create policy "Admins can manage all app versions" on public.app_versions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- User preferences: users manage own
create policy "User preferences viewable and manageable by owner" on public.user_preferences for all using (auth.uid() = user_id);
create policy "Admins can manage all preferences" on public.user_preferences for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- TRIGGERS for updated_at
-- ============================================

create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language 'plpgsql';

do $$
declare tbl text;
begin
  for tbl in select tablename from pg_tables where schemaname = 'public' loop
    execute format('create trigger if not exists update_%I_updated_at before update on public.%I for each row execute function public.update_updated_at_column()', tbl, tbl);
  end loop;
end $$;

-- ============================================
-- SEED DATA
-- ============================================

insert into public.categories (name, slug, description, icon, color) values
  ('Mobile Apps', 'mobile-apps', 'iOS and Android applications', 'LayoutGrid', '#2563EB'),
  ('Web Apps', 'web-apps', 'Web-based applications', 'Globe', '#3B82F6'),
  ('Games', 'games', 'Video games and interactive experiences', 'Gamepad2', '#8B5CF6'),
  ('AI & ML Tools', 'ai-ml-tools', 'Artificial intelligence and machine learning apps', 'Brain', '#EC4899'),
  ('Productivity', 'productivity', 'Productivity and utility tools', 'CheckCircle', '#16A34A'),
  ('Design & Creative', 'design-creative', 'Design and creative applications', 'PenTool', '#F59E0B')
on conflict (slug) do nothing;
