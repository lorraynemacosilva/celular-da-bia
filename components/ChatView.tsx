'use client';
import { useEffect, useRef, useState } from 'react';
import type { Chat, ChoiceOption, HistoryItem, Msg } from '@/lib/content/types';
import { matches } from '@/lib/content/types';
import { useGame } from '@/lib/store';
import { image } from '@/lib/images';
import { ICON } from '@/lib/chrome';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const now = () => `02:${String(14 + Math.floor(Math.random() * 3)).padStart(2, '0')}`;

function Bubble({ m, onImage }: { m: HistoryItem; onImage: (k: string) => void }) {
  if ('day' in m) return <div className="day">{m.day}</div>;
  const cls = `b ${m.from}${m.img ? ' img' : ''}`;
  return (
    <div className={cls} onClick={m.img ? () => onImage(m.img!) : undefined}>
      {m.img && <div dangerouslySetInnerHTML={{ __html: image(m.img) }} />}
      {m.audio && (
        <div className="aud">
          <div className="pl" />
          <div className="w">{Array.from({ length: 26 }, (_, i) => <i key={i} style={{ height: 6 + Math.abs(Math.sin(i * 1.7)) * 18 }} />)}</div>
          <span>{m.audio}</span>
        </div>
      )}
      {m.transcript && <div className="tr">{m.transcript}</div>}
      {!m.img && !m.audio && m.text?.split('\n').map((l, i) => <div key={i}>{l}</div>)}
      {m.time && <time>{m.time}{m.from === 'me' ? ' ✓✓' : ''}</time>}
    </div>
  );
}

export default function ChatView({ chat, onBack, onImage, onVote, toast }: {
  chat: Chat; onBack: () => void; onImage: (k: string) => void; onVote: () => void; toast: (t: string) => void;
}) {
  const g = useGame();
  const [typing, setTyping] = useState(false);
  const [options, setOptions] = useState<ChoiceOption[] | null>(null);
  const [busy, setBusy] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const alive = useRef(true);
  const resolver = useRef<((o: ChoiceOption) => void) | null>(null);

  useEffect(() => { box.current?.scrollTo({ top: 1e6 }); });

  useEffect(() => {
    alive.current = true;
    g.markRead(chat.id);
    if (chat.script && !useGame.getState().done[chat.id]) run();
    return () => { alive.current = false; resolver.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat.id]);

  async function say(m: Msg) {
    if (m.from === 'them') {
      setTyping(true);
      await sleep(500 + Math.min(1400, (m.text ?? '').length * 28));
      setTyping(false);
    } else await sleep(350);
    if (!alive.current) return;
    useGame.getState().log(chat.id, { ...m, time: m.time ?? now() });
  }

  async function run() {
    setBusy(true);
    const script = chat.script!;
    for (let i = useGame.getState().steps[chat.id] ?? 0; i < script.length; i++) {
      if (!alive.current) return;
      const st = script[i];
      useGame.getState().setStep(chat.id, i);
      if ('when' in st && !matches(st.when, useGame.getState().flags)) continue;
      if (st.kind === 'msgs') for (const m of st.msgs) { if (!alive.current) return; await say(m); }
      if (st.kind === 'choice') {
        setBusy(false);
        const pick = await new Promise<ChoiceOption>((res) => { resolver.current = res; setOptions(st.options); });
        if (!alive.current) return;
        setOptions(null); setBusy(true);
        const s = useGame.getState();
        if (pick.set) s.setFlags(pick.set);
        if (s.addClue(pick.clue)) toast('📌 Pista guardada nas Notas');
        if (pick.photo) { s.addPhotos([pick.photo]); await say({ from: 'me', img: pick.photo }); }
        else await say({ from: 'me', text: pick.label });
      }
      if (st.kind === 'end') {
        const s = useGame.getState();
        s.finish(chat.id);
        if (s.addClue(st.clue)) toast('📌 Pista guardada nas Notas');
        if (st.unlockPhotos) s.addPhotos(st.unlockPhotos);
      }
      useGame.getState().setStep(chat.id, i + 1);
    }
    setBusy(false);
  }

  const done = g.done[chat.id];
  return (
    <section className="screen on">
      <div className="status"><span>02:14</span><span className="si" dangerouslySetInnerHTML={{ __html: ICON.status() }} /></div>
      <div className="top chat-top">
        <button className="back" onClick={onBack} style={{ visibility: busy ? 'hidden' : 'visible' }}>‹</button>
        <div className="av" style={{ background: chat.avatarColor }}>{chat.avatar}</div>
        <div className="t"><b>{chat.name}</b><small style={typing ? { color: 'var(--teal)' } : undefined}>{typing ? 'digitando…' : chat.status}</small></div>
      </div>
      <div className="msgs" ref={box}>
        {chat.history.map((m, i) => <Bubble key={'h' + i} m={m} onImage={onImage} />)}
        {(g.logs[chat.id] ?? []).map((m, i) => <Bubble key={'l' + i} m={m} onImage={onImage} />)}
        {typing && <div className="typing"><i /><i /><i /></div>}
      </div>
      <div className="composer">
        {chat.isVote ? (
          <>
            <div className="hint">{g.vote ? <>Você escolheu <b>{g.vote}</b>. A comunidade decide o Episódio 2 💜</> : 'O que a Bia responde? A decisão é sua 👇'}</div>
            <button className="choice" onClick={onVote}>{g.vote ? 'Ver meu resultado' : 'Decidir a resposta da Bia'}</button>
          </>
        ) : options ? (
          options.map((o) => <button key={o.label} className="choice" onClick={() => resolver.current?.(o)}>{o.label}</button>)
        ) : done ? (
          <div className="hint">Conversa encerrada por hoje. Volte ao início 🏠</div>
        ) : null}
      </div>
    </section>
  );
}
