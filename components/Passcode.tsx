'use client';
import { useState } from 'react';

const LETTERS = ['', 'ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ'];

export default function Passcode({ episode, hint, onOk, onCancel, wall }: { episode: string; hint: string; onOk: () => void; onCancel: () => void; wall?: React.ReactNode }) {
  const [typed, setTyped] = useState('');
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function press(k: string) {
    if (typed.length >= 4) return;
    const t = typed + k;
    setTyped(t);
    if (t.length < 4) return;
    let ok = false;
    try {
      const r = await fetch('/api/unlock', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ episode, code: t }) });
      const j = await r.json();
      ok = !!j.ok;
      if (j.locked) setMsg(`Muitas tentativas. Tente de novo em ${j.retryInMin} min.`);
    } catch { setMsg('Sem conexão. Tente de novo.'); }
    if (ok) { setTimeout(() => { setTyped(''); onOk(); }, 180); return; }
    setShake(true);
    try { navigator.vibrate?.(200); } catch {}
    setTimeout(() => { setShake(false); setTyped(''); }, 480);
  }

  return (
    <section className="screen on" id="pass">
      {wall}
      <div className="status"><span>LUMEN</span><span /></div>
      <div className="pc">
        <svg className="lk" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="3" fill="#fff" /><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="#fff" strokeWidth="2.2" /></svg>
        <h2>Digite o código</h2>
        <p>{msg ?? 'O código do celular da Bia aparece no final do episódio.'}</p>
      </div>
      <div className={`dots${shake ? ' shake' : ''}`}>{[0, 1, 2, 3].map((i) => <i key={i} className={i < typed.length ? 'on' : ''} />)}</div>
      <div className="pad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <button key={n} className="key glass" onClick={() => press(String(n))}>{n}<small>{LETTERS[n - 1]}</small></button>)}
        <span /><button className="key glass" onClick={() => press('0')}>0</button><span />
      </div>
      <div className="pcfoot"><button onClick={() => setShowHint((v) => !v)}>Esqueci</button><button onClick={onCancel}>Cancelar</button></div>
      <div className={`hintbox glass${showHint ? ' on' : ''}`}>🤫 {hint}</div>
    </section>
  );
}
