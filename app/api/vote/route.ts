import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const db = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
const OPTIONS = new Set(['A', 'B', 'C']);

async function totals(episode: string) {
  if (!db) return null;
  const { data, error } = await db.from('vote_totals').select('option_id,total').eq('episode_id', episode);
  if (error) return null;
  return Object.fromEntries((data ?? []).map((r) => [r.option_id, r.total]));
}

export async function GET(req: Request) {
  const episode = new URL(req.url).searchParams.get('episode') ?? 'ep1';
  return NextResponse.json({ totals: await totals(episode) });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const episode = String(body?.episode ?? '');
  const device = String(body?.device ?? '');
  const option = String(body?.option ?? '');
  if (!episode || device.length < 8 || !OPTIONS.has(option)) {
    return NextResponse.json({ error: 'voto inválido' }, { status: 400 });
  }
  if (!db) return NextResponse.json({ totals: null, note: 'Supabase não configurado' });
  const { error } = await db.from('votes').upsert(
    { episode_id: episode, device_id: device, option_id: option },
    { onConflict: 'episode_id,device_id' },
  );
  if (error) return NextResponse.json({ error: 'não foi possível salvar' }, { status: 500 });
  return NextResponse.json({ totals: await totals(episode) });
}
