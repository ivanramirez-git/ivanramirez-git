// Genera las imágenes Open Graph (1200×630) de cada página y los iconos con el monograma oficial.
// Usa Chrome sin interfaz para que la tipografía sea exactamente la del sitio. Se ejecuta a mano
// (npm run og) y el resultado se versiona en site/og y site/iconos.
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { PROYECTOS, ORDEN_TABS, TAB_NOMBRE, AREA_EN } from '../site/datos.mjs';

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SITE = fileURLToPath(new URL('../site/', import.meta.url));
const TMP = join(tmpdir(), 'ivanrene-og');
const fuente = (f) => pathToFileURL(join(SITE, 'fonts', f)).href;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const BASE_CSS = `
@font-face{font-family:Manrope;font-weight:400 800;src:url(${fuente('manrope-latin.woff2')}) format('woff2')}
@font-face{font-family:'JetBrains Mono';font-weight:400 700;src:url(${fuente('jetbrains-mono-latin.woff2')}) format('woff2')}
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px;overflow:hidden}
body{font-family:Manrope,sans-serif;background:#0B0F19;color:#EEF0F5;position:relative;
 background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,.07) 1px,transparent 0),radial-gradient(ellipse 70% 80% at 92% 0%,rgba(62,59,214,.45),transparent 60%);background-size:28px 28px,100% 100%}
.mono{position:absolute;left:72px;top:64px;width:84px;height:84px;border-radius:20px;background:#1D2939;display:grid;place-items:center;font-weight:800;font-size:34px;letter-spacing:-1px;color:#fff}
.mono::after{content:"";position:absolute;right:8px;bottom:8px;width:9px;height:9px;border-radius:50%;background:#6E6BF0}
.eyebrow{position:absolute;left:72px;top:184px;font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;letter-spacing:.16em;color:#A5A4FF;text-transform:uppercase}
h1{position:absolute;left:72px;top:226px;width:1050px;font-size:66px;line-height:1.06;letter-spacing:-.035em;font-weight:800;text-wrap:balance}
h1 em{font-style:normal;color:#8B89FF}
.sub{position:absolute;left:72px;width:1000px;font-size:25px;line-height:1.4;color:#B4BBCB}
.pie{position:absolute;left:72px;right:72px;bottom:52px;display:flex;justify-content:space-between;align-items:center;font-family:'JetBrains Mono',monospace;font-size:19px;color:#8A92A6}
.pie b{color:#EEF0F5;font-family:Manrope,sans-serif;font-size:22px}
.ok{display:inline-block;width:12px;height:12px;border-radius:50%;background:#22C55E;margin-right:10px;box-shadow:0 0 0 6px rgba(34,197,94,.18)}
.chips{position:absolute;left:72px;right:72px;top:470px;display:flex;flex-wrap:wrap;gap:10px}
.chips span{border:1.5px solid #2B3445;background:rgba(255,255,255,.04);border-radius:999px;padding:8px 16px;font-size:19px;font-weight:600;color:#D0D5DD}
.shot{position:absolute;right:56px;top:150px;width:520px;border-radius:16px;overflow:hidden;border:1.5px solid #2B3445;background:#101828;box-shadow:0 30px 60px -20px rgba(0,0,0,.6)}
.shot .bar{height:34px;display:flex;align-items:center;gap:7px;padding:0 14px;background:#141B2B;font-family:'JetBrains Mono',monospace;font-size:14px;color:#8A92A6}
.shot .bar i{width:10px;height:10px;border-radius:50%;background:#344054}
.shot img{display:block;width:100%;height:325px;object-fit:cover;object-position:top}
`;

const TXT = {
  es: { rol: 'Ingeniero de Software · Full Stack · SRE', lugar: 'Tame, Arauca · remoto',
    resumen: ['Construyo software que llega a producción, <em>y lo mantengo ahí.</em>', 'Pagos, crédito digital, IoT, IA aplicada y nube.'],
    proyectos: ['Proyectos en <em>producción</em>', null], servicios: ['Web, móvil, pagos, <em>nube y SRE</em>', 'Desarrollo a medida, APIs, fintech, DevOps, IA aplicada e IoT.'],
    trayectoria: ['Más de seis años llevando <em>software a producción</em>', "Wait N' Rest · CCSolutions · TechD · Double V Partners · EY · Kloustr Labs"],
    preguntas: ['Preguntas para <em>contratarme</em>', 'Quién soy, qué construyo, cómo trabajo, cuánto cuesta y cómo contactarme.'],
    contacto: ['¿Tienes un proyecto? <em>Hablemos.</em>', 'WhatsApp +57 312 276 0392 · ivanrene10@gmail.com'], proyecto: 'Proyecto' },
  en: { rol: 'Software Engineer · Full Stack · SRE', lugar: 'Tame, Arauca · remote',
    resumen: ['I build software that reaches production, <em>and keep it there.</em>', 'Payments, digital lending, IoT, applied AI and cloud.'],
    proyectos: ['Projects in <em>production</em>', null], servicios: ['Web, mobile, payments, <em>cloud and SRE</em>', 'Custom development, APIs, fintech, DevOps, applied AI and IoT.'],
    trayectoria: ['Six-plus years shipping <em>software to production</em>', "Wait N' Rest · CCSolutions · TechD · Double V Partners · EY · Kloustr Labs"],
    preguntas: ['Questions before <em>hiring me</em>', "Who I am, what I build, how I work, what it costs and how to reach me."],
    contacto: ['Got a project? <em>Let\'s talk.</em>', 'WhatsApp +57 312 276 0392 · ivanrene10@gmail.com'], proyecto: 'Project' },
};

const pie = (l) => `<div class="pie"><span><b>Iván René Ramírez Castro</b> · ${TXT[l].rol}</span><span><span class="ok"></span>${TXT[l].lugar}</span></div>`;
function htmlPagina(l, k) {
  const [tit, sub] = TXT[l][k];
  const extra = k === 'proyectos' ? `<div class="chips">${PROYECTOS.map((p) => `<span>${esc(p.n)}</span>`).join('')}</div>` : (sub ? `<p class="sub" style="top:${k === 'resumen' || k === 'trayectoria' ? 440 : 400}px">${esc(sub)}</p>` : '');
  return `<div class="mono">IR</div><p class="eyebrow">ivanrene.com · ${TAB_NOMBRE[k][l]}</p><h1>${tit}</h1>${extra}${pie(l)}`;
}
function htmlProyecto(l, p) {
  const img = pathToFileURL(join(SITE, 'img', 'proyectos', `${p.slug}-960.webp`)).href;
  const host = p.url ? p.url.replace('https://', '') : (l === 'en' ? 'internal service' : 'servicio interno');
  const chips = p.c.map((c) => (l === 'en' && AREA_EN[c]) || c);
  return `<div class="mono">IR</div><p class="eyebrow">${TXT[l].proyecto}</p><h1 style="width:560px;font-size:60px">${esc(p.n)}</h1>
    <p class="sub" style="top:${p.n.length > 14 ? 380 : 320}px;width:560px;font-size:23px">${esc(p[l].length > 130 ? p[l].slice(0, 127).replace(/\s+\S*$/, '') + '…' : p[l])}</p>
    <div class="chips" style="right:640px;top:480px">${chips.slice(0, 4).map((c) => `<span>${esc(c)}</span>`).join('')}</div>
    <div class="shot"><div class="bar"><i></i><i></i><i></i>&nbsp;${esc(host)}</div><img src="${img}"></div>${pie(l)}`;
}

function captura(html, salida, w = 1200, h = 630, css = BASE_CSS) {
  const f = join(TMP, 'p.html');
  return writeFile(f, `<!doctype html><meta charset="utf-8"><style>${css}</style><body>${html}</body>`).then(() => {
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${w},${h}`, '--virtual-time-budget=3000', '--allow-file-access-from-files', '--default-background-color=00000000', `--screenshot=${salida}`, pathToFileURL(f).href], { stdio: 'ignore' });
  });
}

await rm(TMP, { recursive: true, force: true });
await mkdir(TMP, { recursive: true });
await mkdir(join(SITE, 'og'), { recursive: true });
await mkdir(join(SITE, 'iconos'), { recursive: true });

for (const l of ['es', 'en']) {
  for (const k of ORDEN_TABS) { await captura(htmlPagina(l, k), join(SITE, 'og', `${l}-${k}.png`)); console.log('og', l, k); }
  for (const p of PROYECTOS) { await captura(htmlProyecto(l, p), join(SITE, 'og', `${l}-proyecto-${p.slug}.png`)); console.log('og', l, p.slug); }
}

// Iconos: el monograma ocupa todo el lienzo (o 80 % con margen en la versión maskable).
const icono = (s, maskable) => `@font-face{font-family:Manrope;font-weight:800;src:url(${fuente('manrope-latin.woff2')})}*{margin:0}html,body{width:${s}px;height:${s}px;overflow:hidden;background:${maskable ? '#1D2939' : 'transparent'}}
.m{position:absolute;inset:${maskable ? s * .1 : 0}px;border-radius:${maskable ? 0 : s * 18 / 76}px;background:#1D2939;display:grid;place-items:center;font-family:Manrope;font-weight:800;font-size:${(maskable ? .8 : 1) * s * 31 / 76}px;letter-spacing:${-s / 76}px;color:#fff}
.m::after{content:"";position:absolute;right:${(maskable ? .8 : 1) * s * 6 / 76}px;bottom:${(maskable ? .8 : 1) * s * 6 / 76}px;width:${(maskable ? .8 : 1) * s * 8 / 76}px;height:${(maskable ? .8 : 1) * s * 8 / 76}px;border-radius:50%;background:#3E3BD6}`;
// Chrome sin interfaz no baja de 500 px: se dibuja a 512 y se reduce con sharp.
await captura('<div class="m">IR</div>', join(TMP, 'base.png'), 512, 512, icono(512, false));
await captura('<div class="m">IR</div>', join(TMP, 'mask.png'), 512, 512, icono(512, true));
for (const [n, s, m] of [['favicon-32.png', 32, false], ['apple-touch-icon.png', 180, true], ['icon-192.png', 192, false], ['icon-512.png', 512, false], ['icon-maskable-512.png', 512, true]]) {
  await sharp(join(TMP, m ? 'mask.png' : 'base.png')).resize(s, s).png().toFile(join(SITE, 'iconos', n));
  console.log('icono', n);
}
