import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';

// Senhas ficam só no servidor, em variáveis de ambiente: CODE_EP1=0207, CODE_EP2=...
// Limite simples de tentativas por IP para dificultar "chutar" todas as combinações.
const attempts = new Map<string, { n: number; until: number }>();
const MAX = 8;
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const now = Date.now();
  const a = attempts.get(ip);
  if (a && a.until > now && a.n >= MAX) {
    return NextResponse.json({ ok: false, locked: true, retryInMin: Math.ceil((a.until - now) / 60000) }, { status: 429 });
  }
  const body = await req.json().catch(() => null);
  const episode = String(body?.episode ?? '').replace(/[^a-z0-9]/gi, '').toUpperCase();
  const code = String(body?.code ?? '');
  const expected = process.env[`CODE_${episode}`] ?? '';
  const ok = expected.length > 0 && code.length === expected.length && timingSafeEqual(Buffer.from(code), Buffer.from(expected));
  if (!ok) {
    const cur = a && a.until > now ? a : { n: 0, until: now + WINDOW_MS };
    cur.n += 1;
    attempts.set(ip, cur);
  } else attempts.delete(ip);
  return NextResponse.json({ ok });
}
