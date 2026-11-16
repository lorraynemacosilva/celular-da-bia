'use client';
import { useEffect, useState } from 'react';
import type { Episode } from '@/lib/content/types';
import { useGame } from '@/lib/store';
import { image } from '@/lib/images';
import ChatView from './ChatView';
import Passcode from './Passcode';
import { ICON, wallSVG } from '@/lib/chrome';

type Screen = 'lock' | 'pass' | 'home' | 'bank' | 'chats' | 'chat' | 'gallery' | 'feed' | 'notes';

function Status({ light, left = '02:14' }: { light?: boolean; left?: string }) {
  return <div className="status" style={light ? { background: '#f5efe0', color: '#2a2420' } : undefined}><span>{left}</span><span className="si" dangerouslySetInnerHTML={{ __html: ICON.status(light ? '#2a2420' : '#fff') }} /></div>;
}
const Wall = ({ uid }: { uid: number }) => <div className="wall" dangerouslySetInnerHTML={{ __html: wallSVG(uid) }} />;
const GREEN = 'linear-gradient(180deg,#67e06f,#2fbf4c)';
const FUN: Record<string, string> = { bank: 'Saldo: ₩ 312.400. Melhor nem olhar 😅', phone: 'Ligação internacional? Com esse saldo? 😬', cam: 'A Bia tá de pijama. Sem fotos agora 🙈', translate: '"Socorro" em coreano: 도와주세요 (dowajuseyo)' };
function Top({ title, sub, onBack }: { title: string; sub?: string; onBack: () => void }) {
  return <div className="top"><button className="back" onClick={onBack}>‹</button><div className="t"><b>{title}</b>{sub && <small>{sub}</small>}</div></div>;
}

export default function Phone({ episode: ep }: { episode: Episode }) {
  const g = useGame();
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState<Screen>('lock');
  const [chatId, setChatId] = useState<string | null>(null);
  const [viewer, setViewer] = useState<string | null>(null);
  const [voteOpen, setVoteOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [totals, setTotals] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    // espera o estado salvo no aparelho antes de desenhar (evita "piscar")
    const done = () => { if (useGame.getState().photos.length === 0) useGame.getState().addPhotos(ep.initialPhotos); setReady(true); };
    if (useGame.persist.hasHydrated()) done(); else return useGame.persist.onFinishHydration(done);
  }, [ep.initialPhotos]);

  useEffect(() => {
    if (voteOpen && g.vote && !totals) fetch(`/api/vote?episode=${ep.id}`).then((r) => r.json()).then((j) => setTotals(j.totals ?? null)).catch(() => {});
  }, [voteOpen, g.vote, totals, ep.id]);

  const toast = (t: string) => { setToastMsg(t); setTimeout(() => setToastMsg(null), 1800); };
  if (!ready) return <div id="phone" />;

  const progress = [g.done.thais, g.done.mae, g.clues.length >= ep.cluesNeeded].filter(Boolean).length;
  const chat = ep.chats.find((c) => c.id === chatId);

  async function vote(option: string) {
    g.setVote(option);
    try {
      const r = await fetch('/api/vote', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ episode: ep.id, device: g.deviceId, option }) });
      const j = await r.json(); setTotals(j.totals ?? null);
    } catch { setTotals(null); }
  }

  const sum = totals ? Object.values(totals).reduce((a, b) => a + b, 0) : 0;
  const traits = ep.traits.filter((t) => g.flags[t.flag]).map((t) => t.label);
  traits.push(`Detetive: ${Math.min(ep.cluesNeeded, g.clues.length)}/${ep.cluesNeeded} pistas`);
  const choice = ep.vote.options.find((o) => o.id === g.vote);

  return (
    <div id="phone">
      <div className="island" /><div className="homebar" />
      {screen === 'lock' && (
        <section className="screen on" id="lock">
          <Wall uid={0} />
          <Status left="LUMEN" />
          <div className="date">{ep.dayLabel}</div>
          <div className="clock">{ep.clock}</div>
          {ep.lockNotifications.map((n, i) => (
            <div key={i} className="notif" style={{ animationDelay: `${0.4 + i * 0.5}s` }}>
              <div className="ic" style={{ background: n.icon === 'PULSE' ? 'linear-gradient(160deg,#8B7CFF,#E58FB4)' : GREEN, padding: 7 }} dangerouslySetInnerHTML={{ __html: n.icon === 'PULSE' ? ICON.pulse : ICON.msg }} />
              <div style={{ flex: 1 }}><div style={{ display: 'flex' }}><b>{n.title}</b><small>{n.time}</small></div><p>{n.text}</p></div>
            </div>
          ))}
          <div className="lockfoot">
            <div className="circ glass" dangerouslySetInnerHTML={{ __html: ICON.torch }} />
            <button className="unlock" onClick={() => setScreen(g.unlocked[ep.id] ? 'home' : 'pass')}>toque para desbloquear</button>
            <div className="circ glass" dangerouslySetInnerHTML={{ __html: ICON.cam }} />
          </div>
        </section>
      )}

      {screen === 'pass' && (
        <Passcode wall={<Wall uid={2} />} episode={ep.id} hint={ep.passHint} onOk={() => { g.unlock(ep.id); setScreen('home'); }} onCancel={() => setScreen('lock')} />
      )}

      {screen === 'home' && (() => {
        const unread = ep.chats.filter((c) => !g.read[c.id]).length;
        const A: Record<string, [string, string, string, number, boolean]> = {
          chats: ['Mensagens', 'msg', GREEN, unread, false],
          gallery: ['Galeria', 'photos', '', 0, true],
          notes: ['Notas', 'notes', 'rgba(255,181,71,.35)', 0, true],
          feed: ['Pulse', 'pulse', 'linear-gradient(160deg,rgba(139,124,255,.75),rgba(229,143,180,.6))', g.read.feed ? 0 : 1, true],
          bank: ['Banco', 'bank', 'rgba(59,167,160,.45)', 0, true],
          phone: ['Telefone', 'phone', GREEN, 0, false],
          cam: ['Câmera', 'cam', 'rgba(140,140,150,.4)', 0, true],
          translate: ['Tradutor', 'translate', 'rgba(70,130,255,.5)', 0, true],
        };
        const App = ({ k, label = true }: { k: string; label?: boolean }) => {
          const [name, ic, bg, badge, glass] = A[k];
          return (
            <button className="app" onClick={() => (FUN[k] ? toast(FUN[k]) : setScreen(k as Screen))}>
              <div className={`ico${glass ? ' glassy' : ''}`} style={bg ? { background: bg } : undefined} dangerouslySetInnerHTML={{ __html: ICON[ic] }} />
              {label && <span className="lbl">{name}</span>}
              {badge ? <span className="badge">{badge}</span> : null}
            </button>
          );
        };
        const Item = ({ ok, t }: { ok: boolean; t: string }) => <div className="it"><span className={`ck${ok ? ' on' : ''}`} /><span style={ok ? { opacity: 0.55, textDecoration: 'line-through' } : undefined}>{t}</span></div>;
        return (
          <section className="screen on" id="home">
            <Wall uid={1} />
            <Status />
            <div className="widgets">
              <div className="wbig glass"><small>CONTRATO LUMEN</small><div className="n">{ep.daysLeft} <span>dias restantes</span></div><div className="bar"><i style={{ width: `${((90 - ep.daysLeft) / 90) * 100}%` }} /></div></div>
              <div className="wsm glass"><div><div className="city">Seul</div><div className="deg">3°</div></div><small>☾ Céu limpo<br />BH agora: 24°</small></div>
              <div className="wsm glass todo">
                <b>A noite da Bia · {progress}/3</b>
                <Item ok={!!g.done.thais} t="Falar com a Thaís" />
                <Item ok={!!g.done.mae} t="Responder a mãe" />
                <Item ok={g.clues.length >= ep.cluesNeeded} t={`Pistas (${Math.min(ep.cluesNeeded, g.clues.length)}/${ep.cluesNeeded})`} />
                {progress >= 3 && <div style={{ color: 'var(--amber)', fontWeight: 700 }}>→ Responder o 303</div>}
              </div>
            </div>
            <div className="apps">{['gallery', 'notes', 'feed', 'bank'].map((k) => <App key={k} k={k} />)}</div>
            <div className="dock glass">{['phone', 'chats', 'cam', 'translate'].map((k) => <App key={k} k={k} label={false} />)}</div>
          </section>
        );
      })()}

      {screen === 'chats' && (
        <section className="screen on">
          <Status /><div className="top" style={{ background: 'none', border: 0 }}><button className="back" onClick={() => setScreen('home')}>‹</button></div><div className="big-title">Mensagens</div>
          <div className="list">
            {ep.chats.map((c) => {
              const last = c.history[c.history.length - 1];
              const preview = 'day' in last ? '' : last.text || '🎤 Mensagem de voz';
              return <button key={c.id} className="row" onClick={() => { setChatId(c.id); setScreen('chat'); }}>
                <div className="av" style={{ background: c.avatarColor }}>{c.avatar}</div>
                <div className="m"><b>{c.name}</b><p>{preview}</p></div>{!g.read[c.id] && <span className="dot" />}
              </button>;
            })}
          </div>
        </section>
      )}

      {screen === 'chat' && chat && <ChatView chat={chat} onBack={() => setScreen('chats')} onImage={setViewer} onVote={() => setVoteOpen(true)} toast={toast} />}

      {screen === 'gallery' && (
        <section className="screen on">
          <Status /><Top title="Galeria" sub="Seul · dia 1" onBack={() => setScreen('home')} />
          <div className="list"><div className="grid">
            {ep.galleryOrder.map((k) => g.photos.includes(k)
              ? <button key={k} onClick={() => setViewer(k)} dangerouslySetInnerHTML={{ __html: image(k) }} />
              : <button key={k} className="lock" disabled>🔒<br />ainda não</button>)}
          </div></div>
        </section>
      )}

      {screen === 'feed' && <Feed ep={ep} onBack={() => setScreen('home')} toast={toast} />}

      {screen === 'notes' && (
        <section className="screen on">
          <Status light />
          <div className="top" style={{ background: '#efe6d2', borderColor: '#e0d4bb', color: '#2a2420' }}><button className="back" onClick={() => setScreen('home')} style={{ color: '#b4245d' }}>‹</button><div className="t"><b>Notas</b></div></div>
          <div className="note">
            <h2>{ep.diary.title}</h2><small>{ep.diary.time}</small>
            {ep.diary.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <h3>VIZINHO 303 · PISTAS</h3>
            {g.clues.map((c) => <div key={c} className="clue">• {c}</div>)}
            {g.clues.length < ep.cluesNeeded && <div className="clue miss">• … ({ep.cluesNeeded - g.clues.length} pista(s) faltando)</div>}
            {g.clues.length >= ep.cluesNeeded && <div className="theory">{ep.theory.split('\n').map((l, i) => <div key={i}>{l}</div>)}</div>}
          </div>
        </section>
      )}

      {viewer && (
        <div className="viewer on">
          <div dangerouslySetInnerHTML={{ __html: image(viewer) }} style={{ width: '100%' }} />
          <p>{ep.captions[viewer] ?? ''}</p>
          <button className="ghost" style={{ maxWidth: 200 }} onClick={() => setViewer(null)}>Fechar</button>
        </div>
      )}

      {voteOpen && (
        <section className="vote on">
          <div className="k">FALTAM {ep.daysLeft} DIAS</div>
          {!choice ? (<>
            <h1>{ep.vote.question.split('? ').map((l, i, a) => <span key={i}>{l}{i < a.length - 1 ? '?' : ''}<br /></span>)}</h1>
            {ep.vote.options.map((o) => <button key={o.id} className="opt" onClick={() => vote(o.id)}><span>{o.id}</span>{o.label}</button>)}
            <button className="ghost" onClick={() => setVoteOpen(false)}>Ainda não</button>
          </>) : (<>
            <h1>Sua escolha:<br />{choice.id}. {choice.label}</h1>
            <div style={{ textAlign: 'center', fontSize: 14, color: '#c8cbe0' }}>Como a Bia foi nessa noite:</div>
            <div className="chips">{traits.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            {totals && sum > 0 && (
              <div style={{ margin: '4px 0 12px' }}>
                {ep.vote.options.map((o) => { const pct = Math.round(((totals[o.id] ?? 0) / sum) * 100); return (
                  <div key={o.id} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>{o.id}. {o.label}</span><b>{pct}%</b></div>
                    <div className="bar"><i style={{ width: `${pct}%`, background: o.id === choice.id ? 'var(--violet)' : 'var(--amber)' }} /></div>
                  </div>); })}
                <div className="fine" style={{ marginTop: 4 }}>{sum} votos até agora</div>
              </div>
            )}
            <div style={{ background: 'rgba(20,25,37,.8)', border: '1px solid #2A3142', borderRadius: 18, padding: 14, fontSize: 14, lineHeight: 1.5 }}>
              Comente a sua letra no <b>Episódio {ep.number}</b> no Instagram do <b>90 dias na Coreia</b>. A mais votada vira o próximo episódio.
            </div>
            <button className="cta" onClick={async () => { try { await navigator.clipboard.writeText(`Eu escolhi ${choice.id} no 90 dias na Coreia 💜 "${choice.label}". E você?`); toast('Copiado! Cola nos comentários 💜'); } catch { toast('Não deu pra copiar aqui'); } }}>Copiar meu resultado</button>
            <button className="ghost" onClick={() => { setVoteOpen(false); setScreen('home'); }}>Voltar ao celular da Bia</button>
            <button className="ghost" onClick={() => { g.reset(ep.initialPhotos); setVoteOpen(false); setScreen('lock'); }}>Recomeçar do zero</button>
            <div className="fine">Ficção. Personagens, grupo e empresa fictícios.</div>
          </>)}
        </section>
      )}

      <div className={`toast${toastMsg ? ' on' : ''}`}>{toastMsg}</div>
    </div>
  );
}

function Feed({ ep, onBack, toast }: { ep: Episode; onBack: () => void; toast: (t: string) => void }) {
  const g = useGame();
  useEffect(() => { g.markRead('feed'); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);
  return (
    <section className="screen on">
      <Status /><Top title="Pulse" sub="Em alta em Seul" onBack={onBack} />
      <div className="list">
        {ep.posts.map((p) => {
          const saved = p.clue ? g.clues.includes(p.clue) : false;
          return (
            <div key={p.id} className="post">
              <div className="h"><div className="av" style={{ background: p.color, color: p.color === '#0B0E14' ? '#E6E8EE' : '#0B0E14', width: 34, height: 34, fontSize: 11 }}>{p.name[0]}</div><div><b>{p.name}</b> <small>@{p.handle} · {p.when}</small></div></div>
              <p>{p.text}</p>
              {p.img && <div dangerouslySetInnerHTML={{ __html: image(p.img) }} />}
              <div className="acts">♥ {p.likes} · 💬 · ↗
                {p.clue && <button className={`pin${saved ? ' done' : ''}`} onClick={() => { if (g.addClue(p.clue)) toast('📌 Pista guardada nas Notas'); }}>{saved ? '✓ pista guardada' : '📌 guardar pista'}</button>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
