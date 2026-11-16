// Modelo de conteúdo: tudo que é história fica em dados.
// Novo episódio = novo arquivo em lib/content/, sem mexer nos componentes.

export type Flags = Record<string, boolean>;

/** Condição declarativa: todas as flags em `has` ligadas e nenhuma em `not`. */
export type Cond = { has?: string[]; not?: string[] };

export type Msg = {
  from: 'me' | 'them';
  text?: string;
  time?: string;
  /** chave de uma imagem em IMAGES */
  img?: string;
  /** duração exibida de uma mensagem de voz */
  audio?: string;
  /** transcrição da mensagem de voz */
  transcript?: string;
};

export type DayMarker = { day: string };
export type HistoryItem = Msg | DayMarker;

export type ChoiceOption = {
  label: string;
  set?: string[];
  clue?: string;
  /** foto enviada pela Bia ao escolher (também desbloqueia na galeria) */
  photo?: string;
};

export type Step =
  | { kind: 'msgs'; when?: Cond; msgs: Msg[] }
  | { kind: 'choice'; when?: Cond; options: ChoiceOption[] }
  | { kind: 'end'; clue?: string; unlockPhotos?: string[] };

export type Chat = {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  status: string;
  history: HistoryItem[];
  /** sem script = conversa da votação */
  script?: Step[];
  isVote?: boolean;
};

export type Post = {
  id: string;
  handle: string;
  name: string;
  color: string;
  text: string;
  when: string;
  likes: string;
  img?: string;
  clue?: string;
};

export type Episode = {
  id: string;
  number: number;
  clock: string;
  daysLeft: number;
  dayLabel: string;
  lockNotifications: { icon: string; color: string; title: string; text: string; time: string }[];
  chats: Chat[];
  posts: Post[];
  diary: { title: string; time: string; paragraphs: string[] };
  /** pistas necessárias para a "teoria" aparecer nas Notas */
  cluesNeeded: number;
  theory: string;
  initialPhotos: string[];
  galleryOrder: string[];
  captions: Record<string, string>;
  vote: { question: string; options: { id: string; label: string }[] };
  traits: { flag: string; label: string }[];
  /** dica mostrada em "Esqueci" na tela de senha */
  passHint: string;
};

export const matches = (c: Cond | undefined, f: Flags) =>
  !c || ((c.has ?? []).every((k) => f[k]) && (c.not ?? []).every((k) => !f[k]));
