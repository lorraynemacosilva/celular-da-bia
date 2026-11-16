// @ts-nocheck
/* eslint-disable */
/* Ilustrações vetoriais (cenários e personagens), geradas como SVG em string. */

const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const eo=x=>1-Math.pow(1-clamp(x),3);
const eio=x=>{x=clamp(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const lerp=(a,b,t)=>a+(b-a)*t;

let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;

function roomSVG(dark?){
  seed=7;
  let b='';
  // skyline inside window (window 140..940 x 380..1280)
  let x=150;
  while(x<930){const w=60+rnd()*90,h=140+rnd()*420;const y=1280-h;
    b+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${rnd()>.5?'#151a2e':'#1a2038'}"/>`;
    for(let yy=y+20;yy<1260;yy+=34)for(let xx=x+12;xx<x+w-14;xx+=24) if(rnd()>.62) b+=`<rect x="${xx}" y="${yy}" width="10" height="14" fill="${rnd()>.3?'#FFB547':'#3BA7A0'}" opacity="${.5+rnd()*.5}"/>`;
    x+=w+4;}
  const tower=`<path d="M640 1060 Q700 980 760 1060 Z" fill="#12162a"/><rect x="697" y="830" width="6" height="200" fill="#12162a"/><rect x="684" y="880" width="32" height="26" rx="6" fill="#12162a"/><circle cx="700" cy="826" r="5" fill="#ff5a5a"/>`;
  let bulbs='';for(let i=0;i<13;i++){const t=i/12,bx=60+t*960,by=300+Math.sin(t*Math.PI)*70;bulbs+=`<circle class="bulb" cx="${bx}" cy="${by}" r="30" fill="url(#glowA)"/><circle cx="${bx}" cy="${by}" r="9" fill="#FFD48a"/>`;}
  return `<svg width="1080" height="1920" viewBox="0 0 1080 1920">
  <rect width="1080" height="1920" fill="#1C2230"/>
  <rect x="140" y="380" width="800" height="900" fill="url(#sky)"/>
  <circle cx="820" cy="500" r="44" fill="#E6E8EE" opacity=".85"/>
  ${tower}${b}
  <rect x="140" y="380" width="800" height="900" fill="none" stroke="#2A3142" stroke-width="22"/>
  <rect x="529" y="380" width="22" height="900" fill="#2A3142"/>
  <rect x="110" y="1270" width="860" height="30" rx="6" fill="#2A3142"/>
  <path d="M60 300 Q540 440 1020 300" fill="none" stroke="#0B0E14" stroke-width="4"/>
  ${bulbs}
  <rect y="1520" width="1080" height="400" fill="#141925"/>
  <circle cx="110" cy="1180" r="380" fill="url(#lampG)"/>
  <rect x="20" y="1380" width="260" height="20" fill="#2A3142"/><rect x="40" y="1400" width="16" height="140" fill="#2A3142"/><rect x="244" y="1400" width="16" height="140" fill="#2A3142"/>
  <path d="M90 1380 L110 1250 L150 1250 L170 1380 Z" fill="#2A3142"/><path d="M80 1250 L180 1250 L155 1180 L105 1180 Z" fill="#FFB547"/>
  <rect x="770" y="1400" width="360" height="190" rx="18" fill="#2b5f5c"/><rect x="800" y="1370" width="160" height="60" rx="26" fill="#E6E8EE"/>
  </svg>`;}

function corrSVG(){
  return `<svg width="1080" height="1920" viewBox="0 0 1080 1920">
  <rect width="1080" height="1920" fill="#1a1f2c"/>
  <rect y="1540" width="1080" height="380" fill="#121620"/>
  <path d="M420 0 L660 0 L1080 1540 L0 1540 Z" fill="url(#cone)"/>
  <rect x="470" y="150" width="140" height="22" rx="8" fill="#E6E8EE"/>
  <g><rect x="90" y="520" width="380" height="1020" fill="#2A3142"/><rect x="110" y="540" width="340" height="1000" fill="#3A4256"/>
  <circle cx="410" cy="1060" r="16" fill="#c8cbe0"/><rect x="210" y="620" width="140" height="70" rx="10" fill="#1C2230"/><text x="280" y="672" text-anchor="middle" font-family="Pret" font-weight="700" font-size="44" fill="#E6E8EE">302</text>
  <rect x="226" y="870" width="110" height="110" fill="#FFB547" transform="rotate(-6 281 925)"/>
  <path d="M240 905 h70 M240 930 h80 M240 955 h50" stroke="#0B0E14" stroke-width="5" transform="rotate(-6 281 925)"/></g>
  <g><rect x="610" y="520" width="380" height="1020" fill="#20263a"/><rect x="630" y="540" width="340" height="1000" fill="#2A3142"/>
  <circle cx="670" cy="1060" r="16" fill="#8b93a7"/><rect x="730" y="620" width="140" height="70" rx="10" fill="#141925"/><text x="800" y="672" text-anchor="middle" font-family="Pret" font-weight="700" font-size="44" fill="#E6E8EE">303</text>
  <rect id="under303" x="640" y="1532" width="320" height="10" fill="#3BA7A0"/></g>
  <rect y="1540" width="1080" height="8" fill="#0B0E14"/>
  </svg>`;}

function storeSVG(){
  seed=3;let shelves='';
  for(let r=0;r<4;r++)for(let i=0;i<14;i++){const x=120+i*60,y=640+r*150;shelves+=`<rect x="${x}" y="${y-30-rnd()*40}" width="${40+rnd()*12}" height="${70}" rx="6" fill="${['#3BA7A0','#8B7CFF','#FFB547','#E6E8EE'][Math.floor(rnd()*4)]}" opacity=".55"/>`;}
  return `<svg width="1080" height="1920" viewBox="0 0 1080 1920">
  <rect width="1080" height="1920" fill="#0B0E14"/>
  <rect x="0" y="380" width="1080" height="1180" fill="#1C2230"/>
  <rect x="60" y="430" width="140" height="60" rx="10" fill="none" stroke="#3BA7A0" stroke-width="5"/><text x="130" y="476" text-anchor="middle" font-family="Pret" font-weight="700" font-size="40" fill="#3BA7A0">24H</text>
  <rect x="80" y="540" width="920" height="760" fill="#cfe9e6"/><rect x="80" y="540" width="920" height="760" fill="#3BA7A0" opacity=".25"/>
  ${shelves}
  <rect x="80" y="540" width="920" height="760" fill="none" stroke="#2A3142" stroke-width="20"/><rect x="530" y="540" width="20" height="760" fill="#2A3142"/>
  <rect x="0" y="1300" width="1080" height="260" fill="#2A3142"/>
  <rect y="1560" width="1080" height="360" fill="#10141d"/>
  <rect x="80" y="1600" width="920" height="200" fill="#3BA7A0" opacity=".12"/>
  </svg>`;}


// Personagens vetoriais animáveis
const C={skin:'#A8714E',skinS:'#8A5A3C',hair:'#121016',hairHi:'#2c2735',top:'#17181e',topL:'#2b2e3a',pants:'#E2C397',pantsS:'#C7A577',shoe:'#1d2233',gold:'#E7B04A',lips:'#6e3b2a',mIn:'#3a1b17',blush:'#c97a5a'};
function _ik(S,T,l1,l2,side){
  let dx=T[0]-S[0],dy=T[1]-S[1],d=Math.hypot(dx,dy);d=Math.min(d,l1+l2-0.5);d=Math.max(d,Math.abs(l1-l2)+0.5);
  const base=Math.atan2(dy,dx),a=Math.acos((l1*l1+d*d-l2*l2)/(2*l1*d));
  const c1=[S[0]+l1*Math.cos(base+a),S[1]+l1*Math.sin(base+a)],c2=[S[0]+l1*Math.cos(base-a),S[1]+l1*Math.sin(base-a)];
  const E=(c1[1]>c2[1])?c1:c2;const ang=Math.atan2(T[1]-E[1],T[0]-E[0]);const H=[E[0]+l2*Math.cos(ang),E[1]+l2*Math.sin(ang)];return [E,H];}
function bun(cx,cy,r){let s=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.hair}"/>`;
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;s+=`<circle cx="${cx+Math.cos(a)*r*0.88}" cy="${cy+Math.sin(a)*r*0.82}" r="${r*0.34}" fill="${C.hair}"/>`;}
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2+.4;const x=cx+Math.cos(a)*r*.5,y=cy+Math.sin(a)*r*.45;s+=`<path d="M${x} ${y} c-8 -10 6 -18 12 -8 c4 8 -6 12 -8 6" fill="none" stroke="${C.hairHi}" stroke-width="4" stroke-linecap="round"/>`;}
  return s;}
// ===== Bia v2 =====
C.skin='#C68E64';C.skinS='#A9714C';C.blush='#e08f7a';C.lipU='#9c4a43';C.lipL='#b45c52';C.hair='#141118';C.hairHi='#3a3242';
function curls(pts,r){let s='';for(const [x,y,k] of pts) s+=`<circle cx="${x}" cy="${y}" r="${r*(k||1)}" fill="${C.hair}"/>`;return s;}
function spir(x,y,sz){return `<path d="M${x} ${y} c${-sz} ${-sz*.6} ${sz*.2} ${-sz*1.6} ${sz} ${-sz*.6} c${sz*.5} ${sz*.7} ${-sz*.3} ${sz*1.1} ${-sz*.6} ${sz*.5}" fill="none" stroke="${C.hairHi}" stroke-width="3" stroke-linecap="round" opacity=".55"/>`;}
function biaHairBack(){
  let s=`<path d="M-92 -1074 C-140 -1020 -136 -880 -118 -790 L118 -790 C136 -880 140 -1020 92 -1074 Z" fill="${C.hair}"/>`;
  const L=[[-96,-1060],[-116,-1024],[-126,-984],[-128,-944],[-126,-904],[-122,-864],[-116,-826],[-100,-796],[-74,-786]];
  s+=curls(L,24)+curls(L.map(p=>[-p[0],p[1]]),24);
  for(const [x,y] of [[-112,-950],[-108,-860],[112,-940],[106,-850]]) s+=spir(x,y,10);
  return s;}
function biaEye(x,blink,mood,look){const ry=mood==='shock'?1.25:1;const k=Math.max(0.08,1-blink);
  let s=`<g transform="translate(${x},-990) scale(1,${k})">`;
  s+=`<path d="M-17 0 Q0 ${-15*ry} 17 0 Q0 ${10*ry} -17 0 Z" fill="#fbf4ee"/>`;
  if(k>0.3){s+=`<circle cx="${look}" cy="-1" r="${7.5*ry}" fill="#3d2418"/><circle cx="${look}" cy="-1" r="3.6" fill="#0f0806"/><circle cx="${look+2.5}" cy="-4" r="2.2" fill="#fff"/>`;}
  s+=`<path d="M-19 1 Q0 ${-17*ry} 18 0" fill="none" stroke="#120f14" stroke-width="4.5" stroke-linecap="round"/>`;
  s+=x<0?`<path d="M-18 0 l-8 -6" stroke="#120f14" stroke-width="4" stroke-linecap="round"/>`:`<path d="M17 -1 l8 -6" stroke="#120f14" stroke-width="4" stroke-linecap="round"/>`;
  s+='</g>';return s;}
function biaMouth(mouth,mood){
  if(mood==='shock'){const ry=12+mouth*9;return `<ellipse cx="0" cy="-934" rx="${13+mouth*3}" ry="${ry}" fill="#3a1714"/><path d="M-9 ${-934-ry+5} h18" stroke="#f6ebe4" stroke-width="5" stroke-linecap="round"/><path d="M-15 ${-934-ry+2} Q0 ${-934-ry-6} 15 ${-934-ry+2}" fill="none" stroke="${C.lipU}" stroke-width="5"/><path d="M-14 ${-934+ry-2} Q0 ${-934+ry+7} 14 ${-934+ry-2}" fill="none" stroke="${C.lipL}" stroke-width="6"/>`;}
  if(mouth>0.08){const ry=3+mouth*11,w=mood==='smile'?20:16;
    return `<ellipse cx="0" cy="-934" rx="${w}" ry="${ry}" fill="#3a1714"/>`+(mood==='smile'?`<path d="M${-w+5} ${-934-ry+4} h${2*w-10}" stroke="#f6ebe4" stroke-width="5" stroke-linecap="round"/>`:'')+
    `<path d="M${-w-2} -935 Q-8 ${-940-ry} 0 ${-936-ry} Q8 ${-940-ry} ${w+2} -935" fill="none" stroke="${C.lipU}" stroke-width="5" stroke-linecap="round"/><path d="M${-w} -933 Q0 ${-926+ry} ${w} -933" fill="none" stroke="${C.lipL}" stroke-width="6" stroke-linecap="round"/>`;}
  if(mood==='smile') return `<path d="M-21 -938 Q0 -918 21 -938 Q0 -930 -21 -938 Z" fill="#3a1714"/><path d="M-16 -936 h32" stroke="#f6ebe4" stroke-width="4"/><path d="M-23 -939 Q-8 -946 0 -942 Q8 -946 23 -939" fill="none" stroke="${C.lipU}" stroke-width="5" stroke-linecap="round"/><path d="M-18 -931 Q0 -918 18 -931" fill="none" stroke="${C.lipL}" stroke-width="5" stroke-linecap="round"/>`;
  const dy=mood==='worried'?3:0;
  return `<path d="M-18 ${-937+dy} Q-8 ${-945} 0 -941 Q8 -945 18 ${-937+dy} Q0 -933 -18 ${-937+dy} Z" fill="${C.lipU}"/><path d="M-16 ${-936+dy} Q0 -923 16 ${-936+dy} Q0 -932 -16 ${-936+dy} Z" fill="${C.lipL}"/><path d="M-6 -929 h8" stroke="#fff" stroke-width="2" opacity=".35" stroke-linecap="round"/>`;}
function biaHead(o){
  const blink=o.blink||0,mouth=o.mouth||0,mood=o.mood||'neutral',look=o.look?Math.max(-5,Math.min(5,o.look)):0;
  const brow=mood==='shock'?-9:0,bi=mood==='worried'?-6:0;
  let s='';
  s+=`<path d="M-64 -1000 C-64 -1062 -36 -1074 0 -1074 C36 -1074 64 -1062 64 -1000 C64 -952 36 -906 0 -902 C-36 -906 -64 -952 -64 -1000 Z" fill="${C.skin}"/>`;
  s+=`<path d="M-58 -960 C-50 -925 -25 -906 0 -903 C25 -906 50 -925 58 -960 C45 -930 25 -914 0 -912 C-25 -914 -45 -930 -58 -960 Z" fill="${C.skinS}" opacity=".35"/>`;
  s+=`<ellipse cx="-63" cy="-983" rx="11" ry="17" fill="${C.skin}"/><ellipse cx="63" cy="-983" rx="11" ry="17" fill="${C.skin}"/>`;
  
  s+=`<path d="M-46 ${-1012+brow} Q-30 ${-1028+brow+bi} -9 ${-1018+brow-bi} L-10 ${-1013+brow-bi} Q-30 ${-1021+brow+bi} -45 ${-1007+brow} Z" fill="${C.hair}"/>`;
  s+=`<path d="M46 ${-1012+brow} Q30 ${-1028+brow+bi} 9 ${-1018+brow-bi} L10 ${-1013+brow-bi} Q30 ${-1021+brow+bi} 45 ${-1007+brow} Z" fill="${C.hair}"/>`;
  s+=biaEye(-26,blink,mood,look)+biaEye(26,blink,mood,look);
  s+=`<path d="M-1 -982 Q6 -966 0 -959" fill="none" stroke="${C.skinS}" stroke-width="3.5" stroke-linecap="round"/><path d="M-8 -957 Q0 -952 8 -957" fill="none" stroke="${C.skinS}" stroke-width="3.5" stroke-linecap="round"/>`;
  s+=`<ellipse cx="-40" cy="-955" rx="14" ry="9" fill="${C.blush}" opacity=".38"/><ellipse cx="40" cy="-955" rx="14" ry="9" fill="${C.blush}" opacity=".38"/>`;
  s+=`<ellipse cx="-44" cy="-972" rx="8" ry="4" fill="#fff" opacity=".18"/><ellipse cx="44" cy="-972" rx="8" ry="4" fill="#fff" opacity=".18"/>`;
  s+=biaMouth(mouth,mood);
  // top hair, side part, framing curls
  s+=`<path d="M-72 -985 C-84 -1070 -40 -1112 6 -1108 C56 -1106 86 -1064 74 -990 C66 -1030 44 -1060 14 -1062 C-2 -1046 -40 -1040 -72 -985 Z" fill="${C.hair}"/>`;
  
  const FL=[[-72,-1034],[-80,-1004],[-84,-972]],FR=[[74,-1028],[80,-998]];
  s+=curls(FL,18)+curls(FR,16);
  s+=curls([[-44,-1090],[-10,-1104],[26,-1100],[56,-1082]],22);
  for(const [x,y] of [[-30,-1088],[10,-1100],[44,-1084]]) s+=spir(x,y,9);
  s+=`<circle cx="-66" cy="-946" r="13" fill="none" stroke="${C.gold}" stroke-width="5"/><circle cx="66" cy="-946" r="13" fill="none" stroke="${C.gold}" stroke-width="5"/><circle cx="-64" cy="-975" r="3.5" fill="${C.gold}"/><circle cx="64" cy="-975" r="3.5" fill="${C.gold}"/>`;
  return s;}
function arm(side,S,EH,o){const E=EH[0],H=EH[1];
  let s=`<path d="M${S[0]} ${S[1]} L${E[0]} ${E[1]} L${H[0]} ${H[1]}" fill="none" stroke="${C.skin}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>`;
  s+=`<circle cx="${H[0]}" cy="${H[1]}" r="19" fill="${C.skin}"/>`;
  if(o.bracelet){const dx=H[0]-E[0],dy=H[1]-E[1],L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,W=[H[0]-ux*30,H[1]-uy*30];
    for(const off of [0,9]) s+=`<path d="M${W[0]-uy*19-ux*off} ${W[1]+ux*19-uy*off} L${W[0]+uy*19-ux*off} ${W[1]-ux*19-uy*off}" stroke="${C.gold}" stroke-width="5" stroke-linecap="round"/>`;}
  if(o.phone){s+=`<g transform="translate(${H[0]},${H[1]}) rotate(${o.phoneRot||-8})"><rect x="-20" y="-58" width="40" height="76" rx="8" fill="#0B0E14" stroke="#3A4256" stroke-width="3"/><rect x="-15" y="-52" width="30" height="58" rx="4" fill="${o.screen||'#8B7CFF'}" opacity=".85"/></g><circle cx="${H[0]+side*-4}" cy="${H[1]+6}" r="15" fill="${C.skin}"/>`;}
  return s;}
function biaTorso(){let s=`<rect x="-16" y="-905" width="32" height="50" fill="${C.skin}"/><path d="M-16 -884 q16 14 32 0" fill="${C.skinS}" opacity=".45"/>`;
  s+=`<path d="M-58 -870 C-94 -866 -100 -834 -92 -800 C-86 -760 -66 -700 -64 -640 L-70 -598 L70 -598 L64 -640 C66 -700 86 -760 92 -800 C100 -834 94 -866 58 -870 C40 -850 -40 -850 -58 -870 Z" fill="${C.top}"/>`;
  for(let x=-54;x<=54;x+=12) s+=`<path d="M${x} ${-848+Math.abs(x)*0.12} Q${x*0.78} -700 ${x*0.95} -602" fill="none" stroke="${C.topL}" stroke-width="2"/>`;
  s+=`<path d="M-30 -880 Q0 -852 30 -880" fill="none" stroke="${C.gold}" stroke-width="2.5"/><circle cx="0" cy="-858" r="5" fill="${C.gold}"/>`;
  s+=`<rect x="-70" y="-606" width="140" height="16" fill="#2b2420"/><rect x="-12" y="-610" width="24" height="24" rx="4" fill="none" stroke="${C.gold}" stroke-width="4"/>`;
  return s;}
function biaLegs(sit){
  if(!sit){let s=`<path d="M-70 -598 L2 -598 L-6 -40 L-122 -40 Z" fill="${C.pants}"/><path d="M-2 -598 L70 -598 L122 -40 L6 -40 Z" fill="${C.pants}"/>`;
    s+=`<path d="M-36 -580 L-58 -44" stroke="${C.pantsS}" stroke-width="3"/><path d="M36 -580 L58 -44" stroke="${C.pantsS}" stroke-width="3"/><path d="M-2 -580 L-6 -44 L-28 -44 Z" fill="${C.pantsS}" opacity=".6"/>`;
    s+=`<path d="M-96 -40 L-40 -40 L-44 -18 Q-80 -8 -112 -16 Z" fill="#6b4a3a"/><path d="M96 -40 L40 -40 L44 -18 Q80 -8 112 -16 Z" fill="#6b4a3a"/><rect x="-64" y="-20" width="8" height="20" fill="#6b4a3a"/><rect x="56" y="-20" width="8" height="20" fill="#6b4a3a"/>`;return s;}
  let s=`<path d="M-86 -320 L86 -320 L112 -232 L-112 -232 Z" fill="${C.pantsS}"/>`;
  s+=`<path d="M-112 -240 L-8 -240 L-16 -30 L-126 -30 Z" fill="${C.pants}"/><path d="M8 -240 L112 -240 L126 -30 L16 -30 Z" fill="${C.pants}"/>`;
  s+=`<path d="M-104 -30 L-40 -30 L-44 -10 Q-80 0 -112 -8 Z" fill="#6b4a3a"/><path d="M104 -30 L40 -30 L44 -10 Q80 0 112 -8 Z" fill="#6b4a3a"/>`;return s;}
function bia(o){
  const sit=!!o.sit, up=sit?258:0;
  const L=o.L||P.relaxedL,R=o.R||P.relaxedR;
  let s=biaLegs(sit);
  s+=`<g transform="translate(0,${up})">`;
  s+=`<g transform="rotate(${(o.tilt||0)*0.5} 0 -900)">${biaHairBack()}</g>`;
  s+=biaTorso();
  s+=`<g transform="rotate(${o.tilt||0} 0 -900)">${biaHead(o)}</g>`;
  s+=arm(-1,[-86,-848],L,{phone:o.phoneL,bracelet:true});
  s+=arm(1,[86,-848],R,{phone:o.phoneR,phoneRot:o.phoneRot,screen:o.screen});
  s+='</g>';return s;}
function biaBack(o){
  let s=biaLegs(false);
  s+=`<rect x="-16" y="-905" width="32" height="50" fill="${C.skin}"/>`;
  s+=`<path d="M-52 -868 C-84 -864 -90 -834 -84 -800 C-80 -760 -64 -700 -62 -640 L-68 -598 L68 -598 L62 -640 C64 -700 80 -760 84 -800 C90 -834 84 -864 52 -868 C36 -860 -36 -860 -52 -868 Z" fill="${C.top}"/>`;
  s+=`<rect x="-70" y="-606" width="140" height="16" fill="#2b2420"/>`;
  s+=arm(-1,[-80,-850],o.L||P.relaxedL,{bracelet:true});s+=arm(1,[80,-850],o.R||P.relaxedR,{});
  s+=`<g transform="rotate(${o.tilt||0} 0 -900)"><ellipse cx="-63" cy="-983" rx="11" ry="17" fill="${C.skin}"/><ellipse cx="63" cy="-983" rx="11" ry="17" fill="${C.skin}"/>${biaHairBack()}`;
  s+=`<path d="M-80 -1000 C-86 -1080 -40 -1112 0 -1110 C40 -1112 86 -1080 80 -1000 C84 -940 70 -880 0 -870 C-70 -880 -84 -940 -80 -1000 Z" fill="${C.hair}"/>`;
  s+=curls([[-40,-1092],[-6,-1108],[30,-1100],[60,-1080],[-70,-1050],[72,-1046]],26);
  for(const [x,y] of [[-30,-1060],[20,-1040],[-50,-960],[40,-930],[0,-990],[-20,-900]]) s+=spir(x,y,11);
  s+='</g>';return s;}
// Vizinho 303, 3/4, walking. p = walk phase (rad)
const V={hood:'#111218',hoodL:'#2a2c3a',pants:'#2b2d38',pantsS:'#1e2029',shoe:'#1a1b22',sole:'#8b8f9c',skin:'#EBC9AA',hat:'#0c0d12',mask:'#09090c',hair:'#16151c'};
function vizLeg(hip,ang,knee,front){const l1=290,l2=290;const a=ang*Math.PI/180,k=(ang-knee)*Math.PI/180;
  const K=[hip[0]+Math.sin(a)*l1,hip[1]+Math.cos(a)*l1],F=[K[0]+Math.sin(k)*l2,K[1]+Math.cos(k)*l2];const col=front?V.pants:V.pantsS;
  return `<path d="M${hip[0]} ${hip[1]} L${K[0]} ${K[1]} L${F[0]} ${F[1]}" fill="none" stroke="${col}" stroke-width="74" stroke-linejoin="round"/>`+
  `<g transform="translate(${F[0]},${F[1]+20}) rotate(${-(ang-knee)*0.5})"><rect x="-42" y="-24" width="104" height="44" rx="20" fill="${V.shoe}"/><rect x="-42" y="10" width="104" height="10" rx="5" fill="${V.sole}"/></g>`;}
function viz(o){const p=o.p||0,bob=Math.abs(Math.sin(p))*-10;
  const aA=24*Math.sin(p),aB=-24*Math.sin(p);const kA=Math.max(0,-30*Math.sin(p+0.9)),kB=Math.max(0,30*Math.sin(p+0.9));
  let s=`<g transform="translate(0,${bob})">`;
  s+=vizLeg([18,-600],aB,kB,false);
  s+=vizLeg([-18,-600],aA,kA,true);
  s+=`<path d="M-120 -900 C-140 -860 -138 -700 -126 -560 L118 -560 C130 -700 132 -860 112 -900 C80 -930 -90 -930 -120 -900 Z" fill="${V.hood}"/>`;
  s+=`<path d="M-80 -700 L76 -700 L92 -580 L-96 -580 Z" fill="none" stroke="${V.hoodL}" stroke-width="4"/>`;
  s+=`<path d="M-120 -900 C-160 -820 -150 -700 -110 -640" fill="none" stroke="${V.hoodL}" stroke-width="4"/><path d="M112 -900 C150 -820 146 -700 104 -640" fill="none" stroke="${V.hoodL}" stroke-width="4"/>`;
  s+=`<rect x="-126" y="-590" width="244" height="34" rx="10" fill="${V.hood}" stroke="${V.hoodL}" stroke-width="3"/>`;
  s+=`<path d="M-78 -952 C-66 -886 66 -886 78 -952 C40 -920 -40 -920 -78 -952 Z" fill="${V.hood}" stroke="${V.hoodL}" stroke-width="4"/>`;
  s+=`<g transform="rotate(${o.nod||0} 0 -930)">`;
  s+=`<rect x="-18" y="-950" width="36" height="20" fill="${V.skin}"/>`;
  s+=`<ellipse cx="8" cy="-1010" rx="60" ry="72" fill="${V.skin}"/><ellipse cx="-50" cy="-1005" rx="11" ry="17" fill="${V.skin}"/>`;
  s+=`<rect x="-58" y="-1000" width="14" height="22" rx="7" fill="#f2f3f5"/>`;
  s+=`<path d="M-44 -1010 C-10 -1016 40 -1016 66 -1008 C70 -975 52 -942 10 -938 C-28 -940 -46 -968 -44 -1010 Z" fill="${V.mask}"/><path d="M-44 -1000 L-56 -1002" stroke="${V.mask}" stroke-width="4"/>`;
  const eb=o.blink?Math.max(1.5,9*(1-o.blink)):9;
  s+=`<ellipse cx="0" cy="-1030" rx="6" ry="${eb}" fill="#141218"/><ellipse cx="40" cy="-1030" rx="5.5" ry="${eb}" fill="#141218"/>`;
  s+=`<path d="M-14 -1046 L10 -1050 M30 -1050 L52 -1046" stroke="${V.hair}" stroke-width="5" stroke-linecap="round"/>`;
  s+=`<path d="M-52 -1046 L-40 -1030 L-30 -1048 L-16 -1034 L-4 -1050 L10 -1036 L22 -1050 L36 -1034 L50 -1048 L66 -1034 L66 -1060 L-52 -1060 Z" fill="${V.hair}"/>`;
  s+=`<path d="M-92 -1046 Q8 -1086 108 -1046 L94 -1024 Q8 -1052 -78 -1024 Z" fill="${V.hat}"/><path d="M-64 -1062 L-50 -1128 Q8 -1146 66 -1128 L80 -1062 Z" fill="${V.hat}"/><path d="M-58 -1074 C-20 -1066 40 -1066 74 -1074" fill="none" stroke="#1d1f28" stroke-width="5"/>`;
  s+='</g></g>';return s;}

const mir=a=>[[-a[0][0],a[0][1]],[-a[1][0],a[1][1]]];
const P={relaxedR:[[108,-660],[112,-470]],phoneChestR:[[124,-690],[58,-770]],chinR:[[112,-700],[24,-906]],phoneMouthR:[[118,-700],[34,-926]],
 presentL:[[-250,-790],[-390,-850]],hipL:[[-158,-720],[-92,-612]],typeR:[[120,-680],[40,-610]],headR:[[190,-930],[78,-1030]]};
P.relaxedL=mir(P.relaxedR);P.typeL=mir(P.typeR);P.headL=mir(P.headR);P.chinL=mir(P.chinR);
function lerpPose(a,b,t){return [[a[0][0]+(b[0][0]-a[0][0])*t,a[0][1]+(b[0][1]-a[0][1])*t],[a[1][0]+(b[1][0]-a[1][0])*t,a[1][1]+(b[1][1]-a[1][1])*t]];}

export { roomSVG, corrSVG, storeSVG, bia, biaBack, viz, P, lerpPose };
