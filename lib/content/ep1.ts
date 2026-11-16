import type { Episode, Msg } from './types';

const T = (text: string, time?: string, extra: Partial<Msg> = {}): Msg => ({ from: 'them', text, time, ...extra });
const M = (text: string, time?: string, extra: Partial<Msg> = {}): Msg => ({ from: 'me', text, time, ...extra });

export const ep1: Episode = {
  id: 'ep1',
  number: 1,
  clock: '02:14',
  daysLeft: 89,
  dayLabel: 'sábado · dia 1 de 90',
  lockNotifications: [
    { icon: 'MSG', color: '#3BA7A0', title: 'Vizinho 303', text: 'you okay? 괜찮아요?', time: '02:07' },
    { icon: 'MSG', color: '#E58FB4', title: 'Thaís 💛', text: 'BIA eu tô vendo você online', time: '02:13' },
    { icon: 'MSG', color: '#FFB547', title: 'Mãe ❤️', text: '🎤 Mensagem de voz (0:42)', time: 'ontem' },
    { icon: 'PULSE', color: '#8B7CFF', title: 'Pulse', text: 'NOCTURNE: Haneul segue afastado das atividades', time: '01:40' },
  ],
  chats: [
    {
      id: 'viz', name: 'Vizinho 303', avatar: '303', avatarColor: '#3BA7A0', status: 'online', isVote: true,
      history: [{ day: 'Ontem' }, M('', '23:58', { audio: '4:12' }), { day: 'Hoje' }, T('you okay?\n괜찮아요?', '02:07')],
    },
    {
      id: 'thais', name: 'Thaís 💛', avatar: 'T', avatarColor: '#E58FB4', status: 'online',
      history: [
        { day: 'Ontem' }, T('E AÍ??? como foi o primeiro dia?? 🇰🇷', '18:02'), T('me conta TUDO', '18:03'),
        M('amiga vou te mandar um áudio, prepara', '23:58'),
        { day: 'Hoje' }, T('cadê o áudio??? 👀', '00:30'), T('dormiu né', '01:12'), T('BIA eu tô vendo você online', '02:13'),
      ],
      script: [
        { kind: 'choice', options: [
          { label: 'Amiga… eu mandei o áudio pro número errado 😭', set: ['direta'] },
          { label: 'Você não vai acreditar no que eu fiz', set: ['suspense'] },
          { label: 'Promete que não vai rir?', set: ['humor'] },
        ] },
        { kind: 'msgs', when: { not: ['direta'] }, msgs: [T('fala logo 😳'), M('mandei o áudio… pro número errado 😭')] },
        { kind: 'msgs', msgs: [T('PERA'), T('pra quem??'), M('pro vizinho 💀'), T('O DO BILHETE DO BANHO??'), T('KKKKKKKKKKKKKKK'), T('desculpa desculpa. continua 😭'), M('4 minutos, Thaís. QUATRO. chorando e falando da chefe'), T('e ele???')] },
        { kind: 'choice', options: [
          { label: '📸 Mandar o print da resposta dele', set: ['print'], photo: 'print' },
          { label: 'Ele respondeu em inglês e em coreano…' },
        ] },
        { kind: 'msgs', when: { not: ['print'] }, msgs: [M('ele mandou "you okay?" e "괜찮아요?" 😭')] },
        { kind: 'msgs', msgs: [T('GENTE.'), T('ele perguntou se você tá bem 🥹'), T('às 2 da manhã'), T('isso é fofo ou é estranho?')] },
        { kind: 'choice', options: [
          { label: 'Fofo 🥹', set: ['fofo'] },
          { label: 'Estranho 😳', set: ['desconfiada'] },
          { label: 'As duas coisas', set: ['fofo', 'desconfiada'] },
        ] },
        { kind: 'msgs', when: { has: ['fofo'], not: ['desconfiada'] }, msgs: [T('também achei. ninguém pergunta isso à toa')] },
        { kind: 'msgs', when: { has: ['desconfiada'], not: ['fofo'] }, msgs: [T('pois é… quem fica acordado ouvindo áudio de estranha às 2h? 🤨')] },
        { kind: 'msgs', when: { has: ['fofo', 'desconfiada'] }, msgs: [T('as duas coisas, igual a gente kkkk')] },
        { kind: 'msgs', msgs: [T('mas você já viu a cara dele?')] },
        { kind: 'choice', options: [
          { label: 'Só de máscara e boné', clue: 'Usa máscara e bucket hat, até de madrugada' },
          { label: 'Nunca. Ele só sai de madrugada', clue: 'Só sai de madrugada' },
        ] },
        { kind: 'msgs', msgs: [T('hmmm 🤔'), T('ou ele é MUITO tímido… ou tá se escondendo de alguém'), T('manda foto do bilhete, quero ver a letra dele')] },
        { kind: 'choice', options: [{ label: '📸 Mandar a foto do bilhete', photo: 'bilhete3' }] },
        { kind: 'msgs', msgs: [T('"complaints" com o número 😂😂'), T('ele é engraçado, Bia'), T('vai responder o quê??'), M('não sei ainda 😩'), T('então deixa que eu pergunto pra internet 😂'), T('sério, dorme. amanhã é o dia 2 de 90 💜')] },
        { kind: 'end', clue: 'Respondeu em inglês e em coreano às 02:07', unlockPhotos: ['bilhete2'] },
      ],
    },
    {
      id: 'mae', name: 'Mãe ❤️', avatar: 'M', avatarColor: '#FFB547', status: 'visto por último às 22:05',
      history: [
        { day: 'Ontem' }, T('Filha, chegou em casa? Comeu?', '21:40'),
        T('', '21:41', { audio: '0:42', transcript: '"Ô filha, a mãe tá aqui pensando em você. A vó mandou dizer que tá rezando. Come direitinho, viu? E me conta como foi."' }),
      ],
      script: [
        { kind: 'choice', options: [
          { label: 'Foi difícil, mãe…', set: ['sincera'] },
          { label: 'Foi ótimo, mãe! Tudo tranquilo 😊', set: ['escondeu'] },
        ] },
        { kind: 'msgs', when: { has: ['sincera'] }, msgs: [T('Primeiro dia é assim mesmo, minha filha.'), T('Você é mais forte do que pensa. E se ficar difícil demais, aqui é sua casa.'), T('Mas a mãe sabe que você consegue ❤️')] },
        { kind: 'msgs', when: { has: ['escondeu'] }, msgs: [T('Que bom, filha! 🙏'), T('Mas a mãe te conhece… qualquer coisa me liga, tá? ❤️')] },
        { kind: 'msgs', msgs: [M('te amo, mãe. vou dormir 💜'), T('Bença. Te amo.')] },
        { kind: 'end' },
      ],
    },
  ],
  posts: [
    { id: 'p1', handle: 'nocturne_official', name: 'NOCTURNE', color: '#0B0E14', when: '3 dias', likes: '812 mil', text: '[Comunicado] Haneul ficará afastado das atividades por alguns dias para descansar. Agradecemos o carinho e a compreensão. 🌙', clue: 'NOCTURNE: Haneul sumiu da agenda há 3 dias' },
    { id: 'p2', handle: 'noct.brasil', name: 'NOCTURNE Brasil', color: '#8B7CFF', when: '5 h', likes: '24 mil', text: '3 dias sem notícia do Haneul 😭 alguém sabe de alguma coisa?? #HaneulVolta' },
    { id: 'p3', handle: 'seoul.spotter', name: 'Seoul Spotter', color: '#3BA7A0', when: '1 h', likes: '3.104', img: 'loja', text: 'juro que vi um cara IGUALZINHO ao Haneul, de bucket hat e máscara, numa conveniência perto de Mangwon às 2h da manhã 👀 ou eu tô ficando doida', clue: 'Alguém viu "um cara igual ao Haneul" de bucket hat perto de Mangwon, de madrugada' },
    { id: 'p4', handle: 'lumen.ent', name: 'LUMEN Entertainment', color: '#FFB547', when: '1 dia', likes: '9.877', img: 'lumen', text: 'Boas-vindas aos novos analistas do nosso programa global! 🌍 Seis meses, um time, um comeback pela frente.' },
    { id: 'p5', handle: 'thais.bh', name: 'Thaís', color: '#E58FB4', when: '1 dia', likes: '87', text: 'minha melhor amiga tá em SEUL e eu aqui no busão de BH 😭💜 orgulho define' },
  ],
  diary: {
    title: 'Dia 1 de 90', time: '02:15',
    paragraphs: [
      'Primeiro dia. A Sra. Park fala rápido e não repete. Metade da reunião foi em coreano e eu sorri e balancei a cabeça igual boneco de painel.',
      'Almocei kimbap na mesa. A Ji-woo me salvou duas vezes. Gosto dela.',
      'E à noite… o áudio. Não quero falar sobre o áudio.',
    ],
  },
  cluesNeeded: 4,
  theory: 'Vizinho 303 = … ??\nNão, Bia. Para. Você tá cansada. Vai dormir. 😴',
  initialPhotos: ['selfie', 'quarto', 'janela', 'bilhete1'],
  galleryOrder: ['selfie', 'quarto', 'janela', 'bilhete1', 'bilhete2', 'bilhete3', 'print'],
  captions: {
    quarto: 'Quarto 302. "Aconchegante", segundo o anúncio.',
    janela: 'A vista da janela. A única coisa grande do quarto.',
    selfie: 'Selfie do primeiro dia (antes de tudo dar errado).',
    bilhete1: 'O primeiro bilhete do 303.',
    bilhete2: 'A resposta dela.',
    bilhete3: 'A resposta dele. Com o número.',
    print: 'Print da resposta das 02:07.',
  },
  vote: {
    question: 'E agora? O que a Bia responde?',
    options: [
      { id: 'A', label: 'Explica tudo, rindo de vergonha' },
      { id: 'B', label: 'Finge que foi engano e some' },
      { id: 'C', label: 'Pergunta se ele entendeu alguma coisa' },
    ],
  },
  passHint: 'Assista o Episódio 1 até o final. Dica: é a hora em que alguém respondeu a Bia.',
  traits: [
    { flag: 'sincera', label: 'Sincera com a mãe' },
    { flag: 'escondeu', label: 'Escondeu o perrengue da mãe' },
    { flag: 'humor', label: 'Riu da própria desgraça' },
    { flag: 'direta', label: 'Foi direto ao ponto' },
    { flag: 'desconfiada', label: 'Desconfiada' },
    { flag: 'fofo', label: 'Coração mole' },
  ],
};
