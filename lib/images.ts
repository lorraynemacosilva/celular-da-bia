import { roomSVG, storeSVG, bia, viz } from './art';

// Imagens do jogo, geradas como SVG a partir dos mesmos desenhos do vídeo.
const DEFS = `<defs><radialGradient id="glowA"><stop offset="0" stop-color="#FFB547" stop-opacity=".9"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient><radialGradient id="lampG"><stop offset="0" stop-color="#FFB547" stop-opacity=".45"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0E14"/><stop offset="1" stop-color="#262c5a"/></linearGradient></defs>`;
const wrap = (inner: string, vb: string) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const strip = (s: string) => s.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

function note(lines: string[], sig: string, bg: string, ink: string) {
  const t = lines.map((l, i) => `<text x="70" y="${210 + i * 105}" font-family="Caveat,cursive" font-size="92" fill="${ink}">${l}</text>`).join('');
  return wrap(`<rect width="1080" height="1080" fill="#2A3142"/><rect x="110" y="110" width="860" height="860" rx="10" fill="${bg}" transform="rotate(-2 540 540)"/><rect x="440" y="80" width="200" height="70" fill="#E6E8EE" opacity=".6" transform="rotate(-4 540 115)"/><g transform="rotate(-2 540 540) translate(60,60)">${t}<text x="760" y="${260 + lines.length * 105}" text-anchor="end" font-family="Caveat,cursive" font-size="84" fill="${ink}">${sig}</text></g>`, '0 0 1080 1080');
}

const cache: Record<string, string> = {};
const build: Record<string, () => string> = {
  quarto: () => wrap(DEFS + strip(roomSVG()), '0 300 1080 1080'),
  janela: () => wrap(DEFS + strip(roomSVG()), '140 380 800 800'),
  selfie: () => wrap(`<rect width="1080" height="1080" fill="#3a3470"/><circle cx="540" cy="380" r="420" fill="#8B7CFF" opacity=".35"/><g transform="translate(540,2700) scale(2.25)">${bia({ mood: 'smile' })}</g><text x="540" y="1040" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="54" fill="#FFB547">primeiro dia em Seul 🇰🇷</text>`, '0 0 1080 1080'),
  bilhete1: () => note(['You sing too loud', 'in the shower.'], '— 303', '#FFB547', '#0B0E14'),
  bilhete2: () => note(["Sorry!! I'll sing", 'quieter. Or better.'], '— 302', '#E6E8EE', '#4b3fb8'),
  bilhete3: () => note(['Better, please.', 'Complaints:', '010-3030-0303'], '— 303', '#FFB547', '#0B0E14'),
  print: () => wrap(`<rect width="1080" height="1080" fill="#10141d"/><rect width="1080" height="190" fill="#141925"/><circle cx="110" cy="95" r="52" fill="#3BA7A0"/><text x="110" y="112" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="40" fill="#0B0E14">303</text><text x="190" y="90" font-family="sans-serif" font-weight="700" font-size="50" fill="#E6E8EE">Vizinho 303</text><text x="190" y="140" font-family="sans-serif" font-size="34" fill="#8b93a7">online</text><rect x="420" y="300" width="620" height="140" rx="40" fill="#8B7CFF"/><text x="470" y="390" font-family="sans-serif" font-weight="700" font-size="46" fill="#0B0E14">▶ ıllıılıllıılı  4:12</text><rect x="40" y="520" width="520" height="210" rx="40" fill="#2A3142"/><text x="90" y="610" font-family="sans-serif" font-size="56" fill="#E6E8EE">you okay?</text><text x="90" y="690" font-family="sans-serif" font-size="56" fill="#E6E8EE">괜찮아요?</text>`, '0 0 1080 1080'),
  loja: () => wrap(DEFS + strip(storeSVG()) + `<g transform="translate(560,1840) scale(.95)">${viz({ p: 0.9, blink: 0 })}</g>`, '0 420 1080 1080'),
  lumen: () => wrap(`<rect width="1080" height="700" fill="#1C2230"/><rect width="1080" height="700" fill="#3BA7A0" opacity=".12"/><text x="540" y="200" text-anchor="middle" font-family="serif" font-size="90" fill="#E6E8EE">LUMEN</text><text x="540" y="270" text-anchor="middle" font-family="sans-serif" font-size="38" fill="#8b93a7">Global Analyst Program · 2026</text><g transform="translate(540,1520) scale(.95)">${bia({ mood: 'smile' })}</g>`, '0 0 1080 700'),
};

export const image = (key: string) => (cache[key] ??= build[key] ? build[key]() : '');
