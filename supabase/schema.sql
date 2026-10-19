-- CLC Barmer - Supabase schema (already applied to project knvesnzqfiydyxhxabnj).
-- Kept here for reference / disaster recovery.

create table if not exists public.site_content (
  id int primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_content_single_row check (id = 1)
);
insert into public.site_content (id, data) values (1, '{}'::jsonb) on conflict (id) do nothing;

alter table public.site_content enable row level security;

drop policy if exists "public read content" on public.site_content;
create policy "public read content" on public.site_content
  for select to anon, authenticated using (true);

create table if not exists public.app_config (
  key text primary key,
  value text not null
);
alter table public.app_config enable row level security;
insert into public.app_config (key, value) values ('admin_pass', '2026')
  on conflict (key) do nothing;

create or replace function public.admin_check(pass text)
returns boolean language sql security definer set search_path = public
as $$ select exists (select 1 from public.app_config where key = 'admin_pass' and value = pass); $$;

create or replace function public.admin_save(pass text, patch jsonb)
returns void language plpgsql security definer set search_path = public
as $$
begin
  if not exists (select 1 from public.app_config where key = 'admin_pass' and value = pass) then
    raise exception 'wrong password';
  end if;
  if jsonb_typeof(patch) <> 'object' then
    raise exception 'patch must be a json object';
  end if;
  update public.site_content set data = data || patch, updated_at = now() where id = 1;
end;
$$;

insert into storage.buckets (id, name, public) values ('media', 'media', true)
  on conflict (id) do update set public = true;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');

drop policy if exists "media public upload" on storage.objects;
create policy "media public upload" on storage.objects
  for insert to anon, authenticated
  with check (
    bucket_id = 'media'
    and name ~* '[.](jpg|jpeg|png|webp|pdf)$'
    and coalesce((metadata ->> 'size')::bigint, 0) < 3000000
  );
