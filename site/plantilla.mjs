// Plantilla HTML del sitio. Cada página se genera completa en el servidor (sin depender de JS),
// en español y en inglés, con su propio <head>: título, descripción, canonical, hreflang,
// Open Graph, Twitter y datos estructurados.
import { SITIO, PERFIL, STACK, STACK_EN, SERVICIOS, PROYECTOS, AREA_EN, AREA_COLOR, CARRERA, MODELOS, FAQ, COMPROMISOS, PAGINAS, ORDEN_TABS, TAB_NOMBRE, RUTA_PROYECTO } from './datos.mjs';

export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const WA_TXT = { es: 'Hola Iván, vi tu web y quiero hablar de un proyecto', en: "Hi Iván, I saw your website and I'd like to talk about a project" };
const wa = (l) => `${SITIO.whatsapp}?text=${encodeURIComponent(WA_TXT[l])}`;

const TX = {
  es: {
    saltar: 'Saltar al contenido', tema: 'Cambiar tema', pausa: 'Pausar animaciones', escribeme: 'Escríbeme', idioma: 'Idioma',
    inicio: 'Iván Ramírez, inicio', fotoAlt: 'Iván René Ramírez Castro en su escritorio, con dos pantallas y un portátil',
    disponible: 'Disponible', pronombre: 'él', rolA: 'Ingeniero de Software',
    bio: 'Diseño, construyo y opero software que llega a producción y se queda funcionando: pagos, crédito digital, IoT, IA aplicada y nube. Hablas directo conmigo, el que lo programa.',
    ctaWa: 'Escríbeme por WhatsApp', remoto: 'remoto', horaLocal: 'hora local (UTC−5)', socio: 'Socio en', titulo: 'Ingeniero de Sistemas · Javeriana',
    logros: 'Credenciales', lgProd: '+6 años', secciones: 'Secciones', perfil: 'Perfil', repetir: 'Repetir',
    bcEyebrow: 'Qué construyo', bcTit: 'Software que mueve dinero y cosas',
    b: [['Pagos', 'en punto de venta e integración con bancos'], ['Crédito digital', 'originación, KYC, biometría y firma electrónica'], ['IoT', 'control de acceso en aeropuertos'], ['IA aplicada', 'análisis de documentos y búsqueda'], ['Nube y operación', 'AWS, Cloudflare, Docker, Terraform, CI/CD']],
    stTit: 'Con qué trabajo', ppEyebrow: 'Cómo llega a producción', ppTit: 'Del commit al usuario, sin sustos', ppAria: 'commit, build, pruebas, despliegue, en vivo', ppTest: 'pruebas', ppVivo: 'en vivo',
    ahEyebrow: 'Ahora', ah: ["<b>Wait N' Rest</b>: plataforma de un hotel inteligente que no se apaga.", 'Monitoreo, incidentes y pipelines de CI/CD.', 'Socio en <b>Freeloz</b>: software a medida.'], ahNota: 'operación continua · ilustrativo',
    mpEyebrow: 'Desde Tame, Arauca', mpTit: 'Remoto para el mundo', mpAria: 'Mapa: desde Tame, Arauca hacia Bogotá y Miami', mpMundo: 'el mundo',
    hbEyebrow: 'Hablemos', hbTit: '¿Tienes un proyecto?', hbTxt: 'Cuéntame qué necesitas. Te respondo yo, en horario de Colombia (UTC−5).',
    fijados: 'En producción', verTodos: 'Ver todos los proyectos', fijadosTodos: 'Productos en producción', fijadosSub: 'Productos que construí o en los que trabajo. Las capturas son de cada sitio.',
    repos: 'Repositorios públicos', reposSub: 'Lista de GitHub al momento de publicar el sitio.', actualizado: 'Actualizado', sinDesc: 'Sin descripción', publico: 'Público',
    cliente: 'Cliente', producto: 'Producto', interno: 'Servicio interno', visitar: 'Visitar el sitio', verCaso: 'Ver el proyecto', captura: 'Captura de',
    trTit: 'Historial de commits de mi carrera', trSub: 'De la hoja de vida. Más reciente arriba.', commitsDe: 'Commits de',
    svTit: 'Servicios', svSub: 'Lo que construyo y opero para empresas de Colombia y del exterior.', stackTit: 'Stack por área', modTit: 'Formas de trabajar conmigo',
    cpNota: 'Compromisos de trabajo, no estadísticas.', faqTit: 'Preguntas frecuentes', faqSub: 'Lo que suelen preguntarme antes de empezar un proyecto.',
    ctTit: 'Hablemos de tu proyecto', ctSub: 'Respondo yo, sin intermediarios. Arma el mensaje y ábrelo en WhatsApp.',
    rdQue: '¿Qué necesitas?', rd: [['proyecto', 'Un proyecto nuevo'], ['equipo', 'Reforzar mi equipo'], ['operacion', 'Operar o rescatar un sistema'], ['vacante', 'Una vacante']],
    rdNombre: 'Tu nombre', rdMsg: 'Cuéntame en dos líneas', rdEnviar: 'Abrir en WhatsApp', correo: 'Correo', copiarCorreo: 'Copiar correo',
    proyecto: 'Proyecto', tipo: 'Tipo', areas: 'Áreas y stack', codigo: 'Código', otros: 'Otros proyectos', parecido: '¿Necesitas algo parecido?',
    parecidoTxt: 'Cuéntame en dos líneas qué quieres construir y te respondo por WhatsApp.', volver: 'Todos los proyectos',
    nfTit: 'Esta página no existe', nfTxt: 'Puede que el enlace haya cambiado. Estas son las secciones del sitio:',
    pie: 'Tame, Arauca, Colombia', contactoRapido: 'Contacto rápido',
  },
  en: {
    saltar: 'Skip to content', tema: 'Switch theme', pausa: 'Pause animations', escribeme: 'Message me', idioma: 'Language',
    inicio: 'Iván Ramírez, home', fotoAlt: 'Iván René Ramírez Castro at his desk, with two monitors and a laptop',
    disponible: 'Available', pronombre: 'he/him', rolA: 'Software Engineer',
    bio: 'I design, build and run software that reaches production and stays up: payments, digital lending, IoT, applied AI and cloud. You talk directly to me, the one who writes the code.',
    ctaWa: 'Message me on WhatsApp', remoto: 'remote', horaLocal: 'local time (UTC−5)', socio: 'Partner at', titulo: 'Systems Engineer · Javeriana',
    logros: 'Credentials', lgProd: '6+ years', secciones: 'Sections', perfil: 'Profile', repetir: 'Replay',
    bcEyebrow: 'What I build', bcTit: 'Software that moves money and things',
    b: [['Payments', 'at point of sale and bank integrations'], ['Digital lending', 'origination, KYC, biometrics and e-signature'], ['IoT', 'access control at airports'], ['Applied AI', 'document analysis and search'], ['Cloud & operations', 'AWS, Cloudflare, Docker, Terraform, CI/CD']],
    stTit: 'What I work with', ppEyebrow: 'How it reaches production', ppTit: 'From commit to user, without scares', ppAria: 'commit, build, tests, deploy, live', ppTest: 'tests', ppVivo: 'live',
    ahEyebrow: 'Now', ah: ["<b>Wait N' Rest</b>: the platform of a smart hotel that never shuts down.", 'Monitoring, incidents and CI/CD pipelines.', 'Partner at <b>Freeloz</b>: custom software.'], ahNota: 'continuous operation · illustrative',
    mpEyebrow: 'From Tame, Arauca', mpTit: 'Remote for the world', mpAria: 'Map: from Tame, Arauca to Bogotá and Miami', mpMundo: 'the world',
    hbEyebrow: "Let's talk", hbTit: 'Got a project?', hbTxt: 'Tell me what you need. I answer myself, on Colombia time (UTC−5).',
    fijados: 'In production', verTodos: 'See all projects', fijadosTodos: 'Products in production', fijadosSub: 'Products I built or work on. Screenshots come from each site.',
    repos: 'Public repositories', reposSub: 'GitHub list at the time the site was published.', actualizado: 'Updated', sinDesc: 'No description', publico: 'Public',
    cliente: 'Client', producto: 'Product', interno: 'Internal service', visitar: 'Visit the site', verCaso: 'See the project', captura: 'Screenshot of',
    trTit: 'Commit history of my career', trSub: 'From my résumé. Most recent first.', commitsDe: 'Commits in',
    svTit: 'Services', svSub: 'What I build and run for companies in Colombia and abroad.', stackTit: 'Stack by area', modTit: 'Ways to work with me',
    cpNota: 'Working commitments, not statistics.', faqTit: 'Frequently asked questions', faqSub: 'What people usually ask me before starting a project.',
    ctTit: "Let's talk about your project", ctSub: 'I answer myself, no middlemen. Compose the message and open it in WhatsApp.',
    rdQue: 'What do you need?', rd: [['proyecto', 'A new project'], ['equipo', 'Extra hands for my team'], ['operacion', 'Run or rescue a system'], ['vacante', 'A job opening']],
    rdNombre: 'Your name', rdMsg: 'Tell me in two lines', rdEnviar: 'Open in WhatsApp', correo: 'Email', copiarCorreo: 'Copy email',
    proyecto: 'Project', tipo: 'Type', areas: 'Areas and stack', codigo: 'Code', otros: 'Other projects', parecido: 'Need something similar?',
    parecidoTxt: "Tell me in two lines what you want to build and I'll reply on WhatsApp.", volver: 'All projects',
    nfTit: "This page doesn't exist", nfTxt: 'The link may have changed. These are the sections of the site:',
    pie: 'Tame, Arauca, Colombia', contactoRapido: 'Quick contact',
  },
};

const ICONOS = `<svg class="sprite" aria-hidden="true" focusable="false">
<symbol id="i-wa" viewBox="0 0 24 24"><path d="M12 2.2a9.6 9.6 0 0 0-8.3 14.5L2.4 21.6l5-1.3A9.6 9.6 0 1 0 12 2.2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.6 7.3c.3-.6.7-.6 1-.1l.9 1.9c.1.3 0 .6-.2.9l-.5.6c.7 1.3 1.7 2.3 3 3l.6-.5c.3-.2.6-.3.9-.2l1.9.9c.6.3.6.7.1 1.1-.9.8-2.2 1-3.4.5-2.3-1-4.2-2.9-5.2-5.2-.5-1.1-.4-2.1.9-2.9Z" fill="currentColor"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>
<symbol id="i-in" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor"/><path d="M8 10.5v6M8 7.6v.1M11.5 16.5v-3.3c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6v3.3M11.5 10.5v6" stroke="var(--panel)" stroke-width="1.9" stroke-linecap="round"/></symbol>
<symbol id="i-gh" viewBox="0 0 24 24"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.6-.2.6-.5v-1.7c-2.6.6-3.2-1.2-3.2-1.2-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.7 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.7-2.2 4.5-4.3 4.7.3.3.6.8.6 1.6v2.4c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" fill="currentColor"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.4" fill="currentColor"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
<symbol id="i-build" viewBox="0 0 24 24"><rect x="3.5" y="4" width="17" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 9h17" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="6.5" r=".9" fill="currentColor"/><circle cx="9.7" cy="6.5" r=".9" fill="currentColor"/></symbol>
<symbol id="i-cap" viewBox="0 0 24 24"><path d="M12 5 22 9.5 12 14 2 9.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>
<symbol id="i-seal" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m8.3 12.2 2.5 2.5 4.9-5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-repo" viewBox="0 0 24 24"><path d="M6 3.5h11.5v15H7.2A2.2 2.2 0 0 0 5 20.7V5.5c0-1.1.9-2 2-2Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5 20.7c0-1.2 1-2.2 2.2-2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 3.5v7l1.6-1.2 1.6 1.2v-7" fill="currentColor"/></symbol>
<symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></symbol>
<symbol id="i-book" viewBox="0 0 24 24"><path d="M4 5.5c2.7-1 5.3-1 8 .7 2.7-1.7 5.3-1.7 8-.7v13c-2.7-1-5.3-1-8 .7-2.7-1.7-5.3-1.7-8-.7Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 6.2v13" stroke="currentColor" stroke-width="1.7"/></symbol>
<symbol id="i-commit" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2.5 12h5.9M15.6 12h5.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
<symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 9.5h8M8 12.5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
<symbol id="i-tools" viewBox="0 0 24 24"><path d="M14.5 6.5a4 4 0 0 0 5 5l-8.6 8.6a2.1 2.1 0 0 1-3-3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m4 4 4.5 4.5M3.5 7l3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
<symbol id="i-help" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5v.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="16.6" r="1.1" fill="currentColor"/></symbol>
<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
<symbol id="i-moon" viewBox="0 0 24 24"><path d="M19.5 14.5A7.8 7.8 0 0 1 9.5 4.5a7.8 7.8 0 1 0 10 10Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>
<symbol id="i-pause" viewBox="0 0 24 24"><rect x="6.5" y="5" width="3.6" height="14" rx="1.2" fill="currentColor"/><rect x="13.9" y="5" width="3.6" height="14" rx="1.2" fill="currentColor"/></symbol>
<symbol id="i-play" viewBox="0 0 24 24"><path d="M7.5 5.2v13.6L19 12Z" fill="currentColor"/></symbol>
<symbol id="i-copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-replay" viewBox="0 0 24 24"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 4.5V9H9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>
</svg>`;

const ico = (id) => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;
const ICONO_TAB = { resumen: 'i-book', proyectos: 'i-repo', servicios: 'i-tools', trayectoria: 'i-commit', preguntas: 'i-help', contacto: 'i-chat' };

export function rutaDe(pagina, l) { return PAGINAS[pagina][l]; }
export const abs = (p) => SITIO.url + p;

function chips(c, l) {
  return c.map((a) => `<span class="chip" style="--c:${AREA_COLOR[a] || 'var(--accent)'}"><i></i>${esc(l === 'en' && AREA_EN[a] ? AREA_EN[a] : a)}</span>`).join('');
}
const etiqueta = (t, l) => TX[l][t === 'cliente' ? 'cliente' : t === 'interno' ? 'interno' : 'producto'];

function picture(base, alt, { anchos, sizes, w, h, cls = '', lazy = true, prioridad = false }) {
  const srcset = (ext) => anchos.map((a) => `${base}-${a}.${ext} ${a}w`).join(', ');
  return `<picture><source type="image/avif" srcset="${srcset('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}">` +
    `<img${cls ? ` class="${cls}"` : ''} src="${base}-${anchos[0]}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy" decoding="async"' : ''}${prioridad ? ' fetchpriority="high"' : ''}></picture>`;
}

export function anchosProyecto(p, existentes) { return [480, 640, 960, 1440].filter((a) => existentes.has(`${p.slug}-${a}.webp`)); }

function pin(p, l, ctx, mini = false, i = 9) {
  const host = p.url ? p.url.replace('https://', '') : (l === 'en' ? 'internal' : 'interno');
  const detalle = RUTA_PROYECTO[l](p.slug);
  const img = picture(`/img/proyectos/${p.slug}`, `${TX[l].captura} ${p.n}`, { anchos: anchosProyecto(p, ctx.imgs).slice(0, 3), sizes: mini ? '(max-width: 640px) 92vw, 260px' : '(max-width: 640px) 92vw, 380px', w: 960, h: 600, lazy: mini || i > 1, prioridad: !mini && i === 0 });
  return `<article class="pin"><a class="pin-shot" href="${detalle}" tabindex="-1" aria-hidden="true"><div class="barra-nav"><i></i><i></i><i></i><span>${esc(host)}</span></div>${img}</a>` +
    `<div class="pin-body"><${mini ? 'h3' : 'h2'} class="pin-tit">${ico('i-repo')}<a class="pin-detalle" href="${detalle}">${esc(p.n)}</a><span class="etq">${etiqueta(p.t, l)}</span></${mini ? 'h3' : 'h2'}>` +
    `<p>${esc(p[l])}</p><div class="chips">${chips(p.c, l)}</div>` +
    (mini ? '' : `<div class="pin-acc"><a href="${detalle}">${TX[l].verCaso} ${ico('i-arrow')}</a>${p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${host} ${ico('i-arrow')}</a>` : ''}</div>`) +
    `</div></article>`;
}

/* ------------------------------------------------------------ Paneles */
function terminal(l) {
  const en = l === 'en';
  const links = ['wycredito', 'wytransfer', 'vinculaform', 'tesorteo', 'platanocontrol', 'micro']
    .map((s) => `<a href="${RUTA_PROYECTO[l](s)}">${s}</a>`).join('  ');
  const p = '<span class="p">❯</span> ';
  const pasos = [
    ['whoami', [`<span class="h">${SITIO.nombre}</span>`, `<span class="acc">${PERFIL[l].rol}</span>`]],
    [en ? 'cat now.txt' : 'cat ahora.txt', [`<span class="mut">→</span> ${en ? "Full Stack + SRE at Wait N' Rest: a smart hotel that runs 24/7" : "Full Stack + SRE en Wait N' Rest: un hotel inteligente que opera 24/7"}`, `<span class="mut">→</span> ${en ? 'Partner at Freeloz: custom software, cloud and AI' : 'Socio en Freeloz: software a medida, nube e IA'}`]],
    [en ? 'ls ~/production' : 'ls ~/producción', [links]],
    ['status', [`<span class="ok">●</span> ${en ? 'available for projects · remote from Tame, Arauca, Colombia' : 'disponible para proyectos · remoto desde Tame, Arauca, Colombia'}`]],
    [`${en ? 'contact' : 'contacto'} --whatsapp`, [`<span class="k">wa</span> <a href="${SITIO.whatsapp}" target="_blank" rel="noopener">${SITIO.telefono}</a>   <span class="k">email</span> <a href="mailto:${SITIO.correo}">${SITIO.correo}</a>`]],
  ];
  return pasos.map(([c, o]) => `<div>${p}<span class="cmd">${c}</span></div>${o.map((x) => `<div>${x}</div>`).join('')}`).join('') + `<div>${p}<span class="cursor"></span></div>`;
}

function panelResumen(l, ctx) {
  const t = TX[l];
  const orbita = [['o1', 0, 'Angular'], ['o1', -7, 'Flutter'], ['o1', -14, 'React'], ['o2', -3.5, 'TypeScript'], ['o2', -10.5, 'Node.js'], ['o2', -17.5, 'NestJS'], ['o2', -24.5, '.NET'], ['o3', 0, 'AWS'], ['o3', -6, 'Cloudflare'], ['o3', -12, 'Docker'], ['o3', -18, 'Terraform'], ['o3', -24, 'PostgreSQL'], ['o3', -30, 'Supabase']];
  const minis = [
    '<svg class="mini m-pago" viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="12" width="36" height="24" rx="5" class="s-line"/><rect x="6" y="18" width="36" height="5" class="s-fillacc"/><rect class="tarjeta" x="10" y="27" width="12" height="4" rx="2"/><circle class="nfc" cx="36" cy="30" r="2.5"/></svg>',
    '<svg class="mini m-credito" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 34a16 16 0 0 1 32 0" class="s-line"/><path class="arco" d="M8 34a16 16 0 0 1 32 0"/><path class="aguja" d="M24 34 33 23"/><circle cx="24" cy="34" r="2.8" class="s-fillacc"/></svg>',
    '<svg class="mini m-iot" viewBox="0 0 48 48" aria-hidden="true"><rect x="16" y="14" width="16" height="26" rx="3" class="s-line"/><circle cx="24" cy="31" r="2.5" class="s-fillacc"/><path class="onda o1" d="M17 9a10 10 0 0 1 14 0"/><path class="onda o2" d="M13 5a16 16 0 0 1 22 0"/></svg>',
    '<svg class="mini m-ia" viewBox="0 0 48 48" aria-hidden="true"><path class="chispa" d="M24 6c1.5 8 4 10.5 12 12-8 1.5-10.5 4-12 12-1.5-8-4-10.5-12-12 8-1.5 10.5-4 12-12Z"/><path class="chispa c2" d="M37 29c.7 3.2 1.8 4.3 5 5-3.2.7-4.3 1.8-5 5-.7-3.2-1.8-4.3-5-5 3.2-.7 4.3-1.8 5-5Z"/></svg>',
    '<svg class="mini m-nube" viewBox="0 0 48 48" aria-hidden="true"><path d="M14 34h21a8 8 0 0 0 0-16 11 11 0 0 0-21 3 6.5 6.5 0 0 0 0 13Z" class="s-line"/><path class="sube" d="M24 30v-9m-4 4 4-4 4 4"/></svg>',
  ];
  let barras = '';
  for (let i = 0; i < 40; i++) barras += `<i class="${i === 13 || i === 31 ? 'suave' : ''}" style="animation-delay:${i * 18}ms"></i>`;
  return `
<div class="readme">
  <div class="readme-h">${ico('i-book')}<span>ivanramirez-git / <b>README</b>.md</span></div>
  <div class="term" id="term">
    <div class="term-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="term-tit">ivan@tame: ~</span>
      <button type="button" class="term-replay" id="term-replay">${ico('i-replay')}<span>${t.repetir}</span></button></div>
    <div class="term-body" id="term-body">${terminal(l)}</div>
  </div>
  <div class="bento">
    <article class="card c-construyo tilt"><p class="eyebrow">${t.bcEyebrow}</p><h2 class="card-h">${t.bcTit}</h2>
      <ul class="construyo">${t.b.map(([b, d], i) => `<li>${minis[i]}<span><b>${b}</b> <small>${d}</small></span></li>`).join('')}</ul></article>
    <article class="card c-stack tilt"><p class="eyebrow">Stack</p><h2 class="card-h">${t.stTit}</h2>
      <div class="orbita" role="img" aria-label="${orbita.map((o) => o[2]).join(', ')}">
        <svg class="orb-svg" viewBox="0 0 320 300" aria-hidden="true"><ellipse cx="160" cy="150" rx="150" ry="116" class="orb-ring r3"/><ellipse cx="160" cy="150" rx="112" ry="80" class="orb-ring r2"/><ellipse cx="160" cy="150" rx="70" ry="46" class="orb-ring r1"/></svg>
        <img class="orb-centro" src="/marca/monograma.svg" width="56" height="56" alt="">
        ${orbita.map(([o, d, n]) => `<span class="chip-o ${o}" style="--d:${d.toFixed(2)}s" aria-hidden="true">${n}</span>`).join('')}
      </div></article>
    <article class="card c-pipe tilt"><p class="eyebrow">${t.ppEyebrow}</p><h2 class="card-h">${t.ppTit}</h2>
      <svg class="pipe" viewBox="0 0 560 150" role="img" aria-label="${t.ppAria}">
        <path id="pipe-camino" class="pipe-camino" d="M40 75 H520"/><path class="pipe-avance" d="M40 75 H520"/>
        <g class="nodo n1"><circle cx="40" cy="75" r="20"/><path d="M33 75h5m4 0h5" class="nodo-ico"/><circle cx="40" cy="75" r="3.5" class="nodo-dot"/></g>
        <g class="nodo n2"><circle cx="160" cy="75" r="20"/><path d="m153 70 7-5 7 5v10l-7 5-7-5Z" class="nodo-ico"/></g>
        <g class="nodo n3"><circle cx="280" cy="75" r="20"/><path d="m272 75 5 5 10-10" class="nodo-ico"/></g>
        <g class="nodo n4"><circle cx="400" cy="75" r="20"/><path d="M400 84V66m-6 6 6-6 6 6" class="nodo-ico"/></g>
        <g class="nodo n5 vivo"><circle cx="520" cy="75" r="20"/><circle cx="520" cy="75" r="6" class="vivo-dot"/><circle cx="520" cy="75" r="6" class="vivo-halo"/></g>
        <text x="40" y="122" class="pipe-lbl">commit</text><text x="160" y="122" class="pipe-lbl">build</text><text x="280" y="122" class="pipe-lbl">${t.ppTest}</text><text x="400" y="122" class="pipe-lbl">deploy</text><text x="520" y="122" class="pipe-lbl vivo-lbl">${t.ppVivo}</text>
        <circle class="paquete" r="6"><animateMotion dur="4.2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#pipe-camino"/></animateMotion></circle>
      </svg>
      <div class="log" aria-hidden="true"><span><i class="ok">✓</i> lint · tests</span><span><i class="ok">✓</i> terraform plan</span><span><i class="ok">✓</i> docker build</span><span><i class="ok">✓</i> health check</span></div></article>
    <article class="card c-ahora tilt"><p class="eyebrow">${t.ahEyebrow}</p><h2 class="card-h">Full Stack · SRE <span class="h-sub">24/7</span></h2>
      <ul class="ahora-l">${t.ah.map((x) => `<li>${x}</li>`).join('')}</ul><div class="barras" aria-hidden="true">${barras}</div><p class="nota">${t.ahNota}</p></article>
    <article class="card c-mapa tilt"><p class="eyebrow">${t.mpEyebrow}</p><h2 class="card-h">${t.mpTit}</h2>
      <img class="mapa" src="/img/mapa.svg" width="360" height="260" alt="${t.mpAria}" loading="lazy" decoding="async"></article>
    <article class="card c-hablemos tilt"><p class="eyebrow">${t.hbEyebrow}</p><h2 class="card-h">${t.hbTit}</h2><p class="c-txt">${t.hbTxt}</p>
      <ul class="canales"><li><span class="k">WA</span><a href="${SITIO.whatsapp}" target="_blank" rel="noopener">${SITIO.telefono}</a></li><li><span class="k">E</span><a href="mailto:${SITIO.correo}">${SITIO.correo}</a></li><li><span class="k">in</span><a href="${SITIO.linkedin}" target="_blank" rel="noopener">in/ivanramirez-in</a></li></ul>
      <a class="btn btn-wa" href="${wa(l)}" target="_blank" rel="noopener">${ico('i-wa')}<span>${t.ctaWa}</span></a></article>
  </div>
</div>
<div class="bloque"><div class="bloque-h"><h2 class="h2">${t.fijados}</h2><a class="link-btn" href="${rutaDe('proyectos', l)}"><span>${t.verTodos}</span> ${ico('i-arrow')}</a></div>
  <div class="pins pins-mini">${PROYECTOS.slice(0, 3).map((p) => pin(p, l, ctx, true)).join('')}</div></div>
<div class="bloque"><div class="bloque-h"><h2 class="h2">${t.faqTit}</h2><a class="link-btn" href="${rutaDe('preguntas', l)}"><span>${TAB_NOMBRE.preguntas[l]}</span> ${ico('i-arrow')}</a></div>
  <div class="faq">${FAQ.slice(0, 3).map((f) => `<article><h3>${esc(f[l][0])}</h3><p>${esc(f[l][1])}</p></article>`).join('')}</div></div>`;
}

function panelProyectos(l, ctx) {
  const t = TX[l];
  const repos = ctx.repos.map((r) => `<li class="repo"><div class="repo-tit"><a href="https://github.com/ivanramirez-git/${encodeURIComponent(r.name)}" target="_blank" rel="noopener">${esc(r.name)}</a><span class="etq">${t.publico}</span></div>` +
    `<p>${esc(r.description || t.sinDesc)}</p><div class="repo-meta">${r.language ? `<span class="chip" style="--c:${ctx.colores[r.language] || '#8B949E'}"><i></i>${esc(r.language)}</span>` : ''}` +
    `${r.stargazers_count ? `<span>${ico('i-star')} ${r.stargazers_count}</span>` : ''}<span>${t.actualizado} <time datetime="${r.pushed_at}">${r.pushed_at.slice(0, 10)}</time></span></div></li>`).join('');
  return `<div class="bloque"><div class="bloque-h"><h1 class="h2">${t.fijadosTodos}</h1><p class="sub">${t.fijadosSub}</p></div>
  <div class="pins">${PROYECTOS.map((p, i) => pin(p, l, ctx, false, i)).join('')}</div></div>
<div class="bloque"><div class="bloque-h"><h2 class="h2">${t.repos}</h2><p class="sub">${t.reposSub}</p></div><ul class="repos">${repos}</ul></div>`;
}

function panelProyecto(p, l, ctx) {
  const t = TX[l];
  const anchos = anchosProyecto(p, ctx.imgs);
  const host = p.url ? p.url.replace('https://', '') : '';
  const repos = (p.repos || []).map((r) => `<a class="btn btn-sec" href="https://github.com/ivanramirez-git/${r}" target="_blank" rel="noopener">${ico('i-gh')}<span>${r}</span></a>`).join('');
  const otros = PROYECTOS.filter((x) => x.slug !== p.slug).map((x) => `<li><a href="${RUTA_PROYECTO[l](x.slug)}">${esc(x.n)}<small>${etiqueta(x.t, l)}</small></a></li>`).join('');
  return `<nav aria-label="Breadcrumb"><ol class="migas"><li><a href="${rutaDe('resumen', l)}">ivanrene.com</a></li><li><a href="${rutaDe('proyectos', l)}">${TAB_NOMBRE.proyectos[l]}</a></li><li aria-current="page">${esc(p.n)}</li></ol></nav>
<article class="detalle">
  <div class="detalle-shot"><div class="barra-nav"><i></i><i></i><i></i><span>${esc(host || (l === 'en' ? 'internal' : 'interno'))}</span></div>
    ${picture(`/img/proyectos/${p.slug}`, `${t.captura} ${p.n}`, { anchos, sizes: '(max-width: 900px) 92vw, 760px', w: 1440, h: 900, lazy: false })}</div>
  <div class="detalle-meta"><span class="etq">${etiqueta(p.t, l)}</span><div class="chips">${chips(p.c, l)}</div></div>
  <h1 class="h2">${esc(p.n)}</h1>
  <p class="lead">${esc(p[l])}</p>
  <div class="detalle-acc">${p.url ? `<a class="btn btn-wa" href="${p.url}" target="_blank" rel="noopener">${ico('i-arrow')}<span>${t.visitar}: ${esc(host)}</span></a>` : ''}${repos}</div>
</article>
<div class="bloque"><div class="bloque-h"><h2 class="h2">${t.parecido}</h2><p class="sub">${t.parecidoTxt}</p></div>
  <a class="btn btn-wa" href="${wa(l)}" target="_blank" rel="noopener">${ico('i-wa')}<span>${t.ctaWa}</span></a></div>
<div class="bloque"><div class="bloque-h"><h2 class="h2">${t.otros}</h2><a class="link-btn" href="${rutaDe('proyectos', l)}"><span>${t.volver}</span> ${ico('i-arrow')}</a></div><ul class="otros">${otros}</ul></div>`;
}

function modelos(l) {
  const iconos = ['<svg class="modelo-ico" viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="20" width="44" height="34" rx="6" class="s-line"/><path d="M24 20v-6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6" class="s-line"/><path d="M10 34h44" class="s-line"/><circle cx="32" cy="34" r="4" class="s-fillacc"/></svg>',
    '<svg class="modelo-ico" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22" class="s-line"/><path d="M10 32h44M32 10c7 7 7 37 0 44M32 10c-7 7-7 37 0 44" class="s-line"/><circle cx="46" cy="18" r="4" class="s-fillacc"/></svg>',
    '<svg class="modelo-ico" viewBox="0 0 64 64" aria-hidden="true"><circle cx="22" cy="26" r="7" class="s-line"/><circle cx="42" cy="26" r="7" class="s-line"/><path d="M10 50c0-7 5-12 12-12s12 5 12 12M30 50c0-7 5-12 12-12s12 5 12 12" class="s-line"/></svg>'];
  return `<div class="modelos">${MODELOS.map((m, i) => `<article class="modelo">${iconos[i]}<h3>${m[l][0]}</h3><p>${m[l][1].replace('Freeloz', `<a href="${SITIO.freeloz}" target="_blank" rel="noopener">Freeloz</a>`)}</p></article>`).join('')}</div>
  <ul class="compromisos">${COMPROMISOS[l].map((c) => `<li>${c}</li>`).join('')}</ul><p class="nota">${TX[l].cpNota}</p>`;
}

function panelServicios(l) {
  const t = TX[l];
  const filas = Object.entries(STACK).map(([a, xs]) => `<tr><th scope="row">${l === 'en' && STACK_EN[a] ? STACK_EN[a] : a}</th><td>${xs.join(' · ')}</td></tr>`).join('');
  return `<div class="bloque"><div class="bloque-h"><h1 class="h2">${t.svTit}</h1><p class="sub">${t.svSub}</p></div>
  <div class="servicios">${SERVICIOS.map((s, i) => `<article class="servicio" id="${s.id}"><span class="num">${String(i + 1).padStart(2, '0')}</span><h2>${s[l][0]}</h2><p>${s[l][1]}</p></article>`).join('')}</div></div>
<div class="bloque"><div class="bloque-h"><h2 class="h2">${t.stackTit}</h2></div><table class="stack-tabla"><tbody>${filas}</tbody></table></div>
<div class="bloque"><div class="bloque-h"><h2 class="h2">${t.modTit}</h2></div>${modelos(l)}</div>`;
}

const hash7 = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return ('0000000' + (h >>> 0).toString(16)).slice(-7); };
function panelTrayectoria(l) {
  const t = TX[l];
  let html = '<span class="traza" aria-hidden="true"></span>', anio = null;
  for (const c of CARRERA) {
    if (c.y !== anio) { anio = c.y; html += `<li class="grupo-h">${ico('i-commit')}<h2>${t.commitsDe} ${c.y}</h2></li>`; }
    html += `<li class="commit" id="${c.desde}"><h3 class="commit-msg"><span class="tipo">${c.tipo}:</span> ${esc(c[l])}</h3><span class="hash" aria-hidden="true">${hash7(c.es)}</span>` +
      `<span class="commit-meta">${esc(c.mes[l])}</span><ul>${c.b[l].map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` +
      `<div class="tags">${c.tags.map((x) => `<span class="tag ${x[1]}">${esc(x[0])}</span>`).join('')}</div></li>`;
  }
  return `<div class="bloque"><div class="bloque-h"><h1 class="h2">${t.trTit}</h1><p class="sub">${t.trSub}</p></div><ol class="commits" id="commits">${html}</ol></div>`;
}

function panelPreguntas(l) {
  const t = TX[l];
  return `<div class="bloque"><div class="bloque-h"><h1 class="h2">${t.faqTit}</h1><p class="sub">${t.faqSub}</p></div>
  <div class="faq">${FAQ.map((f) => `<article><h2>${esc(f[l][0])}</h2><p>${esc(f[l][1])}</p></article>`).join('')}</div></div>`;
}

function panelContacto(l) {
  const t = TX[l];
  return `<div class="bloque"><div class="bloque-h"><h1 class="h2">${t.ctTit}</h1><p class="sub">${t.ctSub}</p></div>
  <div class="contacto-grid">
    <form class="redactor" id="redactor" novalidate>
      <fieldset><legend>${t.rdQue}</legend><div class="opciones">${t.rd.map(([v, x], i) => `<label><input type="radio" name="tipo" value="${v}" id="tipo-${v}"${i ? '' : ' checked'}><span>${x}</span></label>`).join('')}</div></fieldset>
      <label class="campo"><span>${t.rdNombre}</span><input id="rd-nombre" type="text" autocomplete="name"></label>
      <label class="campo"><span>${t.rdMsg}</span><textarea id="rd-msg" rows="3"></textarea></label>
      <div class="vista" aria-live="polite"><span class="vista-k">WhatsApp ·</span> <span id="rd-vista">${l === 'en' ? 'Hi Iván, I have a new project.' : 'Hola Iván, tengo un proyecto nuevo.'}</span></div>
      <button class="btn btn-wa" type="submit">${ico('i-wa')}<span>${t.rdEnviar}</span></button>
    </form>
    <div class="canales-grid">
      <a class="canal" href="${SITIO.whatsapp}" target="_blank" rel="noopener">${ico('i-wa')}<span><b>WhatsApp</b><small>${SITIO.telefono}</small></span></a>
      <div class="canal">${ico('i-mail')}<span><b>${t.correo}</b><small><a href="mailto:${SITIO.correo}">${SITIO.correo}</a></small></span><button type="button" class="copiar" id="copiar-correo" aria-label="${t.copiarCorreo}">${ico('i-copy')}</button></div>
      <a class="canal" href="${SITIO.linkedin}" target="_blank" rel="noopener">${ico('i-in')}<span><b>LinkedIn</b><small>in/ivanramirez-in</small></span></a>
      <a class="canal" href="${SITIO.github}" target="_blank" rel="noopener">${ico('i-gh')}<span><b>GitHub</b><small>ivanramirez-git</small></span></a>
    </div>
  </div></div>
<div class="bloque"><div class="bloque-h"><h2 class="h2">${t.modTit}</h2></div>${modelos(l)}</div>`;
}

function panel404(l) {
  const t = TX[l];
  return `<div class="no-encontrada"><img src="/marca/monograma.svg" width="64" height="64" alt=""><h1>${t.nfTit}</h1><p>${t.nfTxt}</p>
  <ul class="otros">${ORDEN_TABS.map((k) => `<li><a href="${rutaDe(k, l)}">${TAB_NOMBRE[k][l]}</a></li>`).join('')}</ul></div>`;
}

export const PANELES = { resumen: panelResumen, proyectos: panelProyectos, servicios: panelServicios, trayectoria: panelTrayectoria, preguntas: panelPreguntas, contacto: panelContacto };
export { panelProyecto, panel404 };

/* ------------------------------------------------------------ Página completa */
export function pagina({ l, tab, ruta, otraRuta, titulo, desc, og, ogAlt, ogTipo = 'website', jsonld, cuerpo, css, js, noindex = false, h1Perfil = true }) {
  const t = TX[l], otro = l === 'es' ? 'en' : 'es';
  const url = abs(ruta), urlOtra = abs(otraRuta);
  const es = l === 'es' ? url : urlOtra, en = l === 'en' ? url : urlOtra;
  const foto = picture('/img/foto-ivan', t.fotoAlt, { anchos: [240, 360, 480, 640], sizes: '(max-width: 900px) 120px, 296px', w: 640, h: 640, cls: 'foto', lazy: false, prioridad: false });
  return `<!doctype html>
<html lang="${l}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="${SITIO.nombre}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">'}
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="es" href="${es}">
<link rel="alternate" hreflang="en" href="${en}">
<link rel="alternate" hreflang="x-default" href="${es}">
<link rel="alternate" type="application/rss+xml" title="${SITIO.nombre}" href="${abs(l === 'en' ? '/en/rss.xml' : '/rss.xml')}">
<link rel="alternate" type="text/markdown" href="${url.replace(/\/$/, '') + (ruta === '/' || ruta === '/en/' ? '/index.md' : '.md')}">
<meta name="theme-color" content="#0B0F19" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#F6F7FA" media="(prefers-color-scheme: light)">
<meta name="geo.region" content="${SITIO.geo.regionCodigo}">
<meta name="geo.placename" content="${SITIO.geo.ciudad}, ${SITIO.geo.region}, ${SITIO.geo.paisNombre}">
<meta name="geo.position" content="${SITIO.geo.lat};${SITIO.geo.lon}">
<meta name="ICBM" content="${SITIO.geo.lat}, ${SITIO.geo.lon}">
<meta property="og:type" content="${ogTipo}">
<meta property="og:site_name" content="ivanrene.com">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs(og)}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ogAlt || titulo)}">
<meta property="og:locale" content="${l === 'es' ? 'es_CO' : 'en_US'}">
<meta property="og:locale:alternate" content="${l === 'es' ? 'en_US' : 'es_CO'}">
${ogTipo === 'profile' ? '<meta property="profile:first_name" content="Iván René">\n<meta property="profile:last_name" content="Ramírez Castro">\n<meta property="profile:username" content="ivanramirez-git">' : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${abs(og)}">
<meta name="twitter:image:alt" content="${esc(ogAlt || titulo)}">
<link rel="icon" href="/marca/monograma.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="me" href="${SITIO.linkedin}">
<link rel="me" href="${SITIO.github}">
<link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
<style>${css}</style>
<script>document.documentElement.classList.add('js');(function(){var q=new URLSearchParams(location.search).get('tema'),t=null;try{t=localStorage.getItem('ir-tema')}catch(e){}if(q==='oscuro'||q==='claro')t=q;if(t)document.documentElement.setAttribute('data-tema',t)})();</script>
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('\n')}
</head>
<body>
<a class="saltar" href="#contenido">${t.saltar}</a>
${ICONOS}
<header class="topbar">
  <div class="topbar-in">
    <a class="marca" href="${rutaDe('resumen', l)}"><img src="/marca/monograma.svg" width="34" height="34" alt="IR"><span class="marca-txt"><span class="marca-dom">ivanrene.com</span><span class="marca-sep">/</span><b>ivanramirez</b></span></a>
    <div class="topbar-acc">
      <nav class="seg" aria-label="${t.idioma}"><a href="${l === 'es' ? ruta : otraRuta}" hreflang="es" lang="es"${l === 'es' ? ' aria-current="true"' : ''}>ES</a><a href="${l === 'en' ? ruta : otraRuta}" hreflang="en" lang="en"${l === 'en' ? ' aria-current="true"' : ''}>EN</a></nav>
      <button type="button" class="ico-btn" id="btn-tema" aria-label="${t.tema}"><svg class="if-dark" aria-hidden="true"><use href="#i-sun"/></svg><svg class="if-light" aria-hidden="true"><use href="#i-moon"/></svg></button>
      <button type="button" class="ico-btn" id="btn-pausa" aria-pressed="false" aria-label="${t.pausa}"><svg class="when-run" aria-hidden="true"><use href="#i-pause"/></svg><svg class="when-paused" aria-hidden="true"><use href="#i-play"/></svg><span class="lbl-pausa" aria-hidden="true">${t.pausa}</span></button>
      <a class="btn btn-wa btn-sm" href="${wa(l)}" target="_blank" rel="noopener">${ico('i-wa')}<span>${t.escribeme}</span></a>
    </div>
  </div>
</header>
<div class="layout" id="contenido">
  <aside class="perfil" aria-label="${t.perfil}">
    <div class="avatar">${foto}<span class="avatar-mono"><img src="/marca/monograma.svg" width="76" height="76" alt=""></span>
      <span class="estado-burbuja"><span class="pulso" aria-hidden="true"></span><span>${t.disponible}</span></span></div>
    <div class="perfil-nombre"><${h1Perfil ? 'h1' : 'p'} class="nombre">${SITIO.nombre}</${h1Perfil ? 'h1' : 'p'}><p class="handle">ivanramirez-git · <span>${t.pronombre}</span></p></div>
    <p class="rol"><span class="rol-a">${t.rolA}</span> · Full Stack · SRE</p>
    <p class="bio">${t.bio}</p>
    <div class="perfil-cta">
      <a class="btn btn-wa btn-full" href="${wa(l)}" target="_blank" rel="noopener">${ico('i-wa')}<span>${t.ctaWa}</span></a>
      <a class="btn btn-sec btn-full" href="mailto:${SITIO.correo}">${ico('i-mail')}<span>${SITIO.correo}</span></a>
    </div>
    <ul class="datos">
      <li>${ico('i-pin')}<span>Tame, Arauca · Colombia · ${t.remoto}</span></li>
      <li>${ico('i-clock')}<span><span id="hora-tame">UTC−5</span> ${t.horaLocal}</span></li>
      <li>${ico('i-build')}<span>${t.socio} <a href="${SITIO.freeloz}" target="_blank" rel="noopener">Freeloz</a></span></li>
      <li>${ico('i-cap')}<span>${t.titulo}</span></li>
      <li>${ico('i-seal')}<span>COPNIA <code>${SITIO.matricula}</code></span></li>
      <li>${ico('i-in')}<a href="${SITIO.linkedin}" target="_blank" rel="noopener me">in/ivanramirez-in</a></li>
      <li>${ico('i-gh')}<a href="${SITIO.github}" target="_blank" rel="noopener me">github.com/ivanramirez-git</a></li>
    </ul>
    <div class="logros"><p class="mini-h">${t.logros}</p><div class="logros-fila">
      <figure class="logro"><img src="/img/logro-javeriana.svg" width="64" height="64" alt="${l === 'en' ? 'Systems Engineer, Pontificia Universidad Javeriana' : 'Ingeniero de Sistemas, Pontificia Universidad Javeriana'}" loading="lazy"><figcaption>Javeriana</figcaption></figure>
      <figure class="logro"><img src="/img/logro-copnia.svg" width="64" height="64" alt="${l === 'en' ? 'Active COPNIA professional license' : 'Matrícula profesional COPNIA vigente'}" loading="lazy"><figcaption>COPNIA</figcaption></figure>
      <figure class="logro"><img src="/img/logro-freeloz.svg" width="64" height="64" alt="${l === 'en' ? 'Partner at Freeloz S.A.S.' : 'Socio de Freeloz S.A.S.'}" loading="lazy"><figcaption>Freeloz</figcaption></figure>
      <figure class="logro"><img src="/img/logro-produccion.svg" width="64" height="64" alt="${l === 'en' ? 'Six-plus years shipping software to production' : 'Más de seis años llevando software a producción'}" loading="lazy"><figcaption>${t.lgProd}</figcaption></figure>
    </div></div>
  </aside>
  <main class="principal">
    <nav class="tabs" aria-label="${t.secciones}"><div class="tabs-in">
      ${ORDEN_TABS.map((k) => `<a href="${rutaDe(k, l)}"${k === tab ? ' aria-current="page"' : ''}>${ico(ICONO_TAB[k])}<span>${TAB_NOMBRE[k][l]}</span>${k === 'proyectos' ? `<span class="contador">${PROYECTOS.length}</span>` : ''}</a>`).join('')}
    </div></nav>
    <section class="panel">${cuerpo}</section>
    <footer class="pie">
      <img src="/marca/monograma.svg" width="28" height="28" alt="" loading="lazy">
      <span>© ${new Date().getFullYear()} ${SITIO.nombre} · ${t.pie}</span>
      <span class="pie-der"><a href="/llms.txt">llms.txt</a> · <a href="${l === 'en' ? '/en/rss.xml' : '/rss.xml'}">RSS</a> · COPNIA ${SITIO.matricula}</span>
    </footer>
  </main>
</div>
<div class="cta-movil" role="complementary" aria-label="${t.contactoRapido}">
  <a class="btn btn-wa" href="${wa(l)}" target="_blank" rel="noopener">${ico('i-wa')}WhatsApp</a>
  <a class="btn btn-sec" href="mailto:${SITIO.correo}">${ico('i-mail')}<span>${t.correo}</span></a>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<div class="glow" aria-hidden="true"></div>
<script src="${js}" defer></script>
</body>
</html>
`;
}
