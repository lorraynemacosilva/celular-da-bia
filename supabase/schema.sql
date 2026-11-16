-- Votos da comunidade: um voto por aparelho por episódio.
create table if not exists public.votes (
  episode_id text not null,
  device_id  text not null,
  option_id  text not null,
  created_at timestamptz not null default now(),
  primary key (episode_id, device_id)
);

alter table public.votes enable row level security;
-- Sem políticas para anon: só a rota do servidor (service role) lê e grava.

create or replace view public.vote_totals as
  select episode_id, option_id, count(*)::int as total
  from public.votes group by episode_id, option_id;
