-- 포드지점 12팀 급여계산기: Supabase SQL Editor에 그대로 붙여넣고 Run
create table if not exists public.kv_store (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now()
);
alter table public.kv_store enable row level security;
drop policy if exists "salary app read/write" on public.kv_store;
create policy "salary app read/write" on public.kv_store
  for all to anon
  using (key like 'salary:%')
  with check (key like 'salary:%');
