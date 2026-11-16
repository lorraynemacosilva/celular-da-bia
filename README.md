# 90 Dias na Coreia — O celular da Bia

Plataforma da história interativa: a pessoa abre o celular da Bia, conversa, junta pistas e vota o próximo episódio.

**Stack:** Next.js 15 (App Router) + React 19 + Zustand (progresso salvo no aparelho) + Supabase (votos da comunidade) + Vercel.

## Rodar no computador

```bash
npm install
cp .env.example .env.local   # preencha com os dados do Supabase (opcional para testar)
npm run dev                  # http://localhost:3000
```

Sem o Supabase configurado, o jogo funciona normalmente: só não mostra a porcentagem de votos.

## Configurar os votos (Supabase, plano gratuito)

1. Crie um projeto em supabase.com.
2. Em **SQL Editor**, rode o conteúdo de `supabase/schema.sql`.
3. Em **Project Settings → API**, copie a **Project URL** e a chave **service_role**.
4. Coloque as duas no `.env.local` (e depois na Vercel) como `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.

A chave `service_role` fica **só no servidor**, na rota `/api/vote`. Nunca coloque essa chave em código do navegador. A tabela tem RLS ligado e nenhuma política pública, então só a rota do servidor lê e grava. Cada aparelho tem um voto por episódio; se votar de novo, o voto é trocado.

## Senha de acesso de cada episódio

O celular da Bia só abre com o código de 4 dígitos que aparece no final do episódio. A senha fica **só no servidor**, numa variável de ambiente (`CODE_EP1=0207`, `CODE_EP2=...`), e nunca vai para o navegador. A rota `/api/unlock` confere o código e bloqueia por 10 minutos depois de 8 tentativas erradas, para ninguém "chutar" as 10 mil combinações. Depois que a pessoa acerta, o aparelho dela lembra.

Para um episódio novo: crie a variável `CODE_EP2` na Vercel, faça um novo deploy e mostre o código no final do vídeo. A dica do botão "Esqueci" fica em `passHint`, no arquivo do episódio.

O EP2 independente está em `public/ep2.html` e pode ser aberto em `/ep2`. O código é verificado pela rota `/api/unlock`, usando a variável de servidor `CODE_EP2`.

## Publicar na Vercel

1. Suba a pasta num repositório no GitHub.
2. Em vercel.com → **Add New → Project**, importe o repositório.
3. Em **Environment Variables**, adicione as duas variáveis do Supabase e o `CODE_EP1`.
4. Clique em **Deploy**. O link gerado é o que vai na bio do Instagram.

O plano gratuito (Hobby) da Vercel é para uso não comercial. Se o projeto passar a ser monetizado, migre para o plano pago.

## Onde fica cada coisa

| Pasta / arquivo | O que tem |
| --- | --- |
| `lib/content/ep1.ts` | **Todo o conteúdo do Episódio 1**: conversas, escolhas, pistas, posts, diário, votação |
| `lib/content/types.ts` | O formato do conteúdo (o "contrato" de um episódio) |
| `lib/images.ts` | Fotos da galeria e imagens dos posts (SVG) |
| `lib/art.ts` | Desenhos dos cenários e personagens (os mesmos do vídeo) |
| `lib/store.ts` | Progresso da jogadora, salvo no aparelho |
| `components/Phone.tsx` | As telas do celular (bloqueio, início, galeria, feed, notas, votação) |
| `components/ChatView.tsx` | O motor das conversas (digitando…, escolhas, consequências) |
| `public/ep2.html` | Experiência independente do Episódio 2 |
| `app/api/vote/route.ts` | Recebe os votos e devolve as porcentagens |

## Como criar um novo episódio

1. Copie `lib/content/ep1.ts` para `lib/content/ep2.ts` e troque o conteúdo.
2. Em `app/page.tsx`, troque `ep1` por `ep2` (ou crie uma rota `/ep2`).
3. Na API de votos, o `episode` vem do próprio arquivo (`id: 'ep2'`), então os votos ficam separados automaticamente.

Peças de uma conversa (`script`):

- `{ kind: 'msgs', msgs: [...] }`: mensagens em sequência, com "digitando…" automático.
- `{ kind: 'choice', options: [...] }`: escolha da jogadora. Cada opção pode ligar flags (`set`), guardar uma pista (`clue`) ou mandar uma foto (`photo`).
- `when: { has: ['flag'], not: ['outra'] }`: mostra o trecho só se a condição bater.
- `{ kind: 'end' }`: encerra a conversa e pode liberar fotos e pistas.

## Próximos passos sugeridos

- Página `/resultado` com o placar da votação para usar nos Stories.
- Analytics por cena (PostHog ou Plausible) para ver onde as pessoas param.
- Login opcional (link mágico do Supabase) para levar o progresso entre aparelhos.
