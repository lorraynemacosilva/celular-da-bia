'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Flags, Msg } from './content/types';

type State = {
  flags: Flags;
  clues: string[];
  photos: string[];
  read: Record<string, boolean>;
  done: Record<string, boolean>;
  logs: Record<string, Msg[]>;
  steps: Record<string, number>;
  vote: string | null;
  unlocked: Record<string, boolean>;
  deviceId: string;
  setFlags: (keys: string[]) => void;
  addClue: (c?: string) => boolean;
  addPhotos: (p: string[]) => void;
  markRead: (id: string) => void;
  finish: (id: string) => void;
  log: (id: string, m: Msg) => void;
  setStep: (id: string, i: number) => void;
  setVote: (v: string) => void;
  unlock: (ep: string) => void;
  reset: (initialPhotos: string[]) => void;
};

const fresh = (initialPhotos: string[] = []) => ({
  flags: {}, clues: [], photos: initialPhotos, read: {}, done: {}, logs: {}, steps: {}, vote: null,
});

export const useGame = create<State>()(
  persist(
    (set, get) => ({
      ...fresh(),
      unlocked: {},
      deviceId: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Math.random()),
      setFlags: (keys) => set((s) => ({ flags: { ...s.flags, ...Object.fromEntries(keys.map((k) => [k, true])) } })),
      addClue: (c) => {
        if (!c || get().clues.includes(c)) return false;
        set((s) => ({ clues: [...s.clues, c] }));
        return true;
      },
      addPhotos: (p) => set((s) => ({ photos: Array.from(new Set([...s.photos, ...p])) })),
      markRead: (id) => set((s) => ({ read: { ...s.read, [id]: true } })),
      finish: (id) => set((s) => ({ done: { ...s.done, [id]: true } })),
      log: (id, m) => set((s) => ({ logs: { ...s.logs, [id]: [...(s.logs[id] ?? []), m] } })),
      setStep: (id, i) => set((s) => ({ steps: { ...s.steps, [id]: i } })),
      setVote: (v) => set({ vote: v }),
      unlock: (ep) => set((s) => ({ unlocked: { ...s.unlocked, [ep]: true } })),
      reset: (initialPhotos) => set({ ...fresh(initialPhotos) }),
    }),
    { name: '90dias-ep1', storage: createJSONStorage(() => localStorage) },
  ),
);
