// Genera dist/ para Cloudflare Workers: páginas estáticas ES/EN, datos estructurados,
// sitemap, RSS, robots, llms.txt, versiones Markdown y archivos auxiliares.
// Uso: npm run build
import { mkdir, rm, cp, readFile, writeFile, readdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';
import { SITIO, PERFIL, STACK, SERVICIOS, PROYECTOS, CARRERA, MODELOS, FAQ, PAGINAS, ORDEN_TABS, TAB_NOMBRE, RUTA_PROYECTO, AREA_EN } from '../site/datos.mjs';
import { pagina, PANELES, panelProyecto, panel404, abs } from '../site/plantilla.mjs';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const SITE = join(RAIZ, 'site'), DIST = join(RAIZ, 'dist'), PUBLIC = join(RAIZ, 'public');
const HOY = new Date().toISOString().slice(0, 10);
const OTRO = { es: 'en', en: 'es' };
const INDEXNOW_KEY = 'b6f0c1e8a4d24f7a9a3e2c5d7f8e9a10';

const existe = (p) => access(p).then(() => true, () => false);
async function escribir(ruta, contenido) { await mkdir(dirname(ruta), { recursive: true }); await writeFile(ruta, contenido); }
const archivoDe = (ruta) => join(DIST, ruta.endsWith('/') ? ruta + 'index.html' : ruta);
const mdDe = (ruta) => (ruta === '/' || ruta === '/en/') ? ruta + 'index.md' : ruta.replace(/\/$/, '') + '.md';

/* ------------------------------------------------------------ Preparación */
await rm(DIST, { recursive: true, force: true });
await cp(PUBLIC, DIST, { recursive: true, filter: (s) => !/\/(rss\.xml|site\.webmanifest|robots\.txt)$/.test(s) });
for (const d of ['fonts', 'img', 'marca', 'og']) if (await existe(join(SITE, d))) await cp(join(SITE, d), join(DIST, d), { recursive: true });
for (const f of ['favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png']) if (await existe(join(SITE, 'iconos', f))) await cp(join(SITE, 'iconos', f), join(DIST, f));

const css = (await transform(await readFile(join(SITE, 'styles.css'), 'utf8'), { loader: 'css', minify: true, target: ['chrome100', 'safari15', 'firefox100'] })).code;
const jsMin = (await transform(await readFile(join(SITE, 'app.js'), 'utf8'), { loader: 'js', minify: true, target: ['es2019'] })).code;
const jsRuta = `/assets/app.${createHash('sha256').update(jsMin).digest('hex').slice(0, 10)}.js`;
await escribir(join(DIST, jsRuta), jsMin);

const imgs = new Set(await readdir(join(SITE, 'img', 'proyectos')));
const ogs = new Set(await existe(join(SITE, 'og')) ? await readdir(join(SITE, 'og')) : []);
const ogDe = (clave) => (ogs.has(clave + '.png') ? `/og/${clave}.png` : '/og-image.png');

// Repos públicos al momento de publicar (CI), con respaldo si GitHub no responde.
const COLORES = { TypeScript: '#3178C6', JavaScript: '#F1E05A', Vue: '#41B883', 'C#': '#178600', Dart: '#00B4AB', HTML: '#E34C26', Python: '#3572A5', Java: '#B07219', 'C++': '#F34B7D', R: '#198CE7', AMPL: '#E6EFBB', CSS: '#563D7C' };
let repos;
try {
  const r = await fetch('https://api.github.com/users/ivanramirez-git/repos?per_page=100&sort=pushed', { headers: { 'User-Agent': 'ivanrene.com-build' }, signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error(r.status);
  repos = (await r.json()).filter((x) => !x.fork && !x.archived && x.name !== '.github').map(({ name, language, description, pushed_at, stargazers_count }) => ({ name, language, description, pushed_at, stargazers_count }));
  await writeFile(join(SITE, 'repos.json'), JSON.stringify(repos, null, 1));
} catch {
  repos = JSON.parse(await readFile(join(SITE, 'repos.json'), 'utf8'));
  console.warn('GitHub no respondió: uso site/repos.json');
}
const ctx = { imgs, repos: repos.slice(0, 18), colores: COLORES };

/* ------------------------------------------------------------ Datos estructurados */
const ID = { persona: abs('/#ivan'), web: abs('/#web') };
const persona = (l) => ({
  '@type': 'Person', '@id': ID.persona, name: SITIO.nombre, alternateName: ['Iván Ramírez', 'Ivan Rene Ramirez Castro'],
  givenName: 'Iván René', familyName: 'Ramírez Castro', jobTitle: PERFIL[l].rol, description: PERFIL[l].resumen,
  url: abs('/'), image: abs('/img/foto-ivan-640.webp'), email: `mailto:${SITIO.correo}`, telephone: SITIO.telefonoE164,
  address: { '@type': 'PostalAddress', addressLocality: SITIO.geo.ciudad, addressRegion: SITIO.geo.region, addressCountry: SITIO.geo.pais },
  homeLocation: { '@type': 'Place', name: `${SITIO.geo.ciudad}, ${SITIO.geo.region}, ${SITIO.geo.paisNombre}`, geo: { '@type': 'GeoCoordinates', latitude: SITIO.geo.lat, longitude: SITIO.geo.lon } },
  nationality: { '@type': 'Country', name: 'Colombia' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Pontificia Universidad Javeriana', url: 'https://www.javeriana.edu.co' },
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: l === 'en' ? 'Systems Engineer' : 'Ingeniero de Sistemas', dateCreated: '2024-09-05', recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Pontificia Universidad Javeriana' } },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: l === 'en' ? 'professional license' : 'matrícula profesional', name: `COPNIA ${SITIO.matricula}`, dateCreated: '2025-10-14', recognizedBy: { '@type': 'GovernmentOrganization', name: 'Consejo Profesional Nacional de Ingeniería (COPNIA)', url: 'https://www.copnia.gov.co' } },
  ],
  hasOccupation: { '@type': 'Occupation', name: PERFIL[l].rol, occupationLocation: { '@type': 'Country', name: 'Colombia' }, skills: Object.values(STACK).flat().join(', ') },
  knowsAbout: [...Object.values(STACK).flat(), 'Fintech', 'KYC', 'SRE', 'DevOps', 'IoT'],
  knowsLanguage: [{ '@type': 'Language', name: 'Español', alternateName: 'es' }, { '@type': 'Language', name: 'English', alternateName: 'en' }],
  memberOf: { '@type': 'Organization', name: 'Freeloz S.A.S.', url: SITIO.freeloz },
  sameAs: [SITIO.linkedin, SITIO.github],
  makesOffer: SERVICIOS.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s[l][0], description: s[l][1] } })),
});
const sitioWeb = { '@type': 'WebSite', '@id': ID.web, url: abs('/'), name: 'ivanrene.com', alternateName: SITIO.nombre, inLanguage: ['es', 'en'], publisher: { '@id': ID.persona } };
function migas(l, items) {
  return { '@type': 'BreadcrumbList', itemListElement: [{ name: 'ivanrene.com', ruta: PAGINAS.resumen[l] }, ...items].map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: abs(x.ruta) })) };
}
function webPage(tipo, l, ruta, titulo, desc, og, extra = {}) {
  return { '@type': tipo, '@id': abs(ruta) + '#pagina', url: abs(ruta), name: titulo, description: desc, inLanguage: l, isPartOf: { '@id': ID.web },
    about: { '@id': ID.persona }, primaryImageOfPage: { '@type': 'ImageObject', url: abs(og), width: 1200, height: 630 }, dateModified: HOY, ...extra };
}
const grafo = (...nodos) => [{ '@context': 'https://schema.org', '@graph': nodos }];

/* ------------------------------------------------------------ Páginas */
const urls = []; // para sitemap
const md = {};   // ruta → markdown
for (const l of ['es', 'en']) {
  for (const k of ORDEN_TABS) {
    const P = PAGINAS[k], ruta = P[l], otraRuta = P[OTRO[l]];
    const titulo = P.titulo[l], desc = P.desc[l], og = ogDe(`${l}-${k}`);
    const tipo = { resumen: 'ProfilePage', proyectos: 'CollectionPage', servicios: 'WebPage', trayectoria: 'AboutPage', preguntas: 'FAQPage', contacto: 'ContactPage' }[k];
    const extra = {};
    if (k === 'resumen') extra.mainEntity = { '@id': ID.persona };
    if (k === 'preguntas') extra.mainEntity = FAQ.map((f) => ({ '@type': 'Question', name: f[l][0], acceptedAnswer: { '@type': 'Answer', text: f[l][1] } }));
    const nodos = [persona(l), sitioWeb, webPage(tipo, l, ruta, titulo, desc, og, extra)];
    if (k !== 'resumen') nodos.push(migas(l, [{ name: TAB_NOMBRE[k][l], ruta }]));
    if (k === 'proyectos') nodos.push({ '@type': 'ItemList', name: titulo, itemListElement: PROYECTOS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(RUTA_PROYECTO[l](p.slug)), name: p.n })) });
    if (k === 'servicios') nodos.push(...SERVICIOS.map((s) => ({ '@type': 'Service', '@id': abs(ruta) + '#' + s.id, name: s[l][0], description: s[l][1], provider: { '@id': ID.persona },
      areaServed: [{ '@type': 'Country', name: 'Colombia' }, { '@type': 'Country', name: 'United States' }, { '@type': 'Place', name: l === 'en' ? 'Worldwide (remote)' : 'Todo el mundo (remoto)' }] })));
    if (k === 'resumen' && l === 'es') nodos.push({ '@type': 'FAQPage', '@id': abs('/#preguntas'), mainEntity: FAQ.slice(0, 3).map((f) => ({ '@type': 'Question', name: f.es[0], acceptedAnswer: { '@type': 'Answer', text: f.es[1] } })) });
    const html = pagina({ l, tab: k, ruta, otraRuta, titulo, desc, og, ogTipo: k === 'resumen' ? 'profile' : 'website', jsonld: grafo(...nodos), cuerpo: PANELES[k](l, ctx), css, js: jsRuta, h1Perfil: k === 'resumen' });
    await escribir(archivoDe(ruta), html);
    urls.push({ ruta, otraRuta, l, prioridad: k === 'resumen' ? '1.0' : '0.8', img: k === 'resumen' ? '/img/foto-ivan-640.webp' : null });
  }
  for (const p of PROYECTOS) {
    const ruta = RUTA_PROYECTO[l](p.slug), otraRuta = RUTA_PROYECTO[OTRO[l]](p.slug);
    const titulo = `${p.n} · ${l === 'en' ? 'Project by Iván Ramírez' : 'Proyecto de Iván Ramírez'}`;
    const desc = p[l].length > 158 ? p[l].slice(0, 155).replace(/\s+\S*$/, '') + '…' : p[l];
    const og = ogDe(`${l}-proyecto-${p.slug}`);
    const app = { '@type': 'SoftwareApplication', '@id': abs(ruta) + '#app', name: p.n, description: p[l], applicationCategory: p.cat, operatingSystem: 'Web',
      image: abs(`/img/proyectos/${p.slug}-960.webp`), contributor: { '@id': ID.persona }, keywords: p.c.map((c) => (l === 'en' && AREA_EN[c]) || c).join(', ') };
    if (p.url) app.url = p.url;
    const nodos = [persona(l), sitioWeb, webPage('ItemPage', l, ruta, titulo, desc, og, { mainEntity: { '@id': abs(ruta) + '#app' } }), app,
      migas(l, [{ name: TAB_NOMBRE.proyectos[l], ruta: PAGINAS.proyectos[l] }, { name: p.n, ruta }])];
    await escribir(archivoDe(ruta), pagina({ l, tab: 'proyectos', ruta, otraRuta, titulo, desc, og, ogAlt: `${p.n}: ${desc}`, jsonld: grafo(...nodos), cuerpo: panelProyecto(p, l, ctx), css, js: jsRuta, h1Perfil: false }));
    urls.push({ ruta, otraRuta, l, prioridad: '0.7', img: `/img/proyectos/${p.slug}-960.webp`, imgTit: p.n });
  }
  const r404 = l === 'es' ? '/404.html' : '/en/404.html';
  await escribir(join(DIST, r404), pagina({ l, tab: null, ruta: l === 'es' ? '/' : '/en/', otraRuta: l === 'es' ? '/en/' : '/', titulo: l === 'en' ? 'Page not found · ivanrene.com' : 'Página no encontrada · ivanrene.com',
    desc: PAGINAS.resumen.desc[l], og: ogDe(`${l}-resumen`), jsonld: grafo(sitioWeb), cuerpo: panel404(l), css, js: jsRuta, noindex: true, h1Perfil: false }));
}

/* ------------------------------------------------------------ Markdown (para agentes de IA) */
const lista = (xs) => xs.map((x) => `- ${x}`).join('\n');
const limpio = (s) => s.replace(/<[^>]+>/g, '');
function mdPerfil(l) {
  const en = l === 'en';
  return `# ${SITIO.nombre}\n\n> ${PERFIL[l].rol}. ${PERFIL[l].resumen}\n\n## ${en ? 'Contact' : 'Contacto'}\n\n${lista([`WhatsApp: ${SITIO.telefono} (${SITIO.whatsapp})`, `${en ? 'Email' : 'Correo'}: ${SITIO.correo}`, `LinkedIn: ${SITIO.linkedin}`, `GitHub: ${SITIO.github}`, `${en ? 'Location' : 'Ubicación'}: Tame, Arauca, Colombia (UTC−5), ${en ? 'remote' : 'remoto'}`])}\n\n## ${en ? 'Credentials' : 'Credenciales'}\n\n${lista([en ? 'Systems Engineer, Pontificia Universidad Javeriana (Sep 5, 2024)' : 'Ingeniero de Sistemas, Pontificia Universidad Javeriana (5 sep 2024)', `${en ? 'COPNIA professional license' : 'Matrícula profesional COPNIA'} ${SITIO.matricula} (${en ? 'active' : 'vigente'})`, en ? 'Partner at Freeloz S.A.S. (https://freeloz.com)' : 'Socio de Freeloz S.A.S. (https://freeloz.com)'])}\n`;
}
const mdServicios = (l) => `## ${TAB_NOMBRE.servicios[l]}\n\n${SERVICIOS.map((s) => `### ${s[l][0]}\n\n${s[l][1]}`).join('\n\n')}\n\n### Stack\n\n${Object.entries(STACK).map(([a, xs]) => `- ${a}: ${xs.join(', ')}`).join('\n')}\n\n### ${l === 'en' ? 'Ways to work together' : 'Formas de trabajar juntos'}\n\n${lista(MODELOS.map((m) => `**${m[l][0]}**: ${m[l][1]}`))}\n`;
const mdProyecto = (p, l) => `### ${p.n}\n\n${p[l]}\n\n${lista([`${l === 'en' ? 'Type' : 'Tipo'}: ${{ cliente: l === 'en' ? 'client' : 'cliente', producto: l === 'en' ? 'product' : 'producto', interno: l === 'en' ? 'internal service' : 'servicio interno' }[p.t]}`, `${l === 'en' ? 'Areas/stack' : 'Áreas/stack'}: ${p.c.join(', ')}`, ...(p.url ? [`URL: ${p.url}`] : []), `${l === 'en' ? 'Page' : 'Página'}: ${abs(RUTA_PROYECTO[l](p.slug))}`])}\n`;
const mdProyectos = (l) => `## ${TAB_NOMBRE.proyectos[l]}\n\n${PROYECTOS.map((p) => mdProyecto(p, l)).join('\n')}`;
const mdCarrera = (l) => `## ${TAB_NOMBRE.trayectoria[l]}\n\n${CARRERA.map((c) => `### ${c[l]} (${c.mes[l]})\n\n${lista(c.b[l])}`).join('\n\n')}\n`;
const mdFaq = (l) => `## ${TAB_NOMBRE.preguntas[l]}\n\n${FAQ.map((f) => `### ${f[l][0]}\n\n${f[l][1]}`).join('\n\n')}\n`;
const mdContacto = (l) => `## ${TAB_NOMBRE.contacto[l]}\n\n${lista([`WhatsApp: ${SITIO.whatsapp}`, `${l === 'en' ? 'Email' : 'Correo'}: ${SITIO.correo}`, `LinkedIn: ${SITIO.linkedin}`])}\n\n${lista(MODELOS.map((m) => `**${m[l][0]}**: ${m[l][1]}`))}\n`;
for (const l of ['es', 'en']) {
  const pie = `\n---\n${l === 'en' ? 'Source' : 'Fuente'}: ${abs(PAGINAS.resumen[l])}\n`;
  md[PAGINAS.resumen[l]] = mdPerfil(l) + '\n' + mdServicios(l) + '\n' + mdFaq(l) + pie;
  md[PAGINAS.proyectos[l]] = `# ${PAGINAS.proyectos.titulo[l]}\n\n` + mdProyectos(l) + pie;
  md[PAGINAS.servicios[l]] = `# ${PAGINAS.servicios.titulo[l]}\n\n` + mdServicios(l) + pie;
  md[PAGINAS.trayectoria[l]] = `# ${PAGINAS.trayectoria.titulo[l]}\n\n` + mdCarrera(l) + pie;
  md[PAGINAS.preguntas[l]] = `# ${PAGINAS.preguntas.titulo[l]}\n\n` + mdFaq(l) + pie;
  md[PAGINAS.contacto[l]] = `# ${PAGINAS.contacto.titulo[l]}\n\n` + mdContacto(l) + pie;
  for (const p of PROYECTOS) md[RUTA_PROYECTO[l](p.slug)] = `# ${p.n}\n\n` + mdProyecto(p, l).replace(/^### .*\n\n/, '') + pie;
}
for (const [ruta, txt] of Object.entries(md)) await escribir(join(DIST, mdDe(ruta)), limpio(txt));

const llms = `# ${SITIO.nombre}

> ${PERFIL.es.rol}. ${PERFIL.es.resumen}

Sitio personal y portafolio. Contenido en español (/) y en inglés (/en/). Cada página tiene una versión Markdown enlazada abajo.
Para contratar: WhatsApp ${SITIO.telefono} (${SITIO.whatsapp}), correo ${SITIO.correo}.

## Páginas

${ORDEN_TABS.map((k) => `- [${TAB_NOMBRE[k].es}](${abs(mdDe(PAGINAS[k].es))}): ${PAGINAS[k].desc.es}`).join('\n')}

## Proyectos

${PROYECTOS.map((p) => `- [${p.n}](${abs(mdDe(RUTA_PROYECTO.es(p.slug)))}): ${p.es}`).join('\n')}

## English

${ORDEN_TABS.map((k) => `- [${TAB_NOMBRE[k].en}](${abs(mdDe(PAGINAS[k].en))}): ${PAGINAS[k].desc.en}`).join('\n')}

## Optional

- [Contenido completo en un solo archivo](${abs('/llms-full.txt')})
- [Hoja de vida en JSON Resume](${abs('/resume.json')})
- [Perfil de GitHub](${SITIO.github})
- [LinkedIn](${SITIO.linkedin})
`;
await escribir(join(DIST, 'llms.txt'), llms);
const full = ['es', 'en'].map((l) => limpio(mdPerfil(l) + '\n' + mdServicios(l) + '\n' + mdProyectos(l) + '\n' + mdCarrera(l) + '\n' + mdFaq(l) + '\n' + mdContacto(l))).join('\n\n---\n\n');
await escribir(join(DIST, 'llms-full.txt'), full);

/* ------------------------------------------------------------ Sitemap, robots, RSS y auxiliares */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((u) => {
  const es = u.l === 'es' ? u.ruta : u.otraRuta, en = u.l === 'en' ? u.ruta : u.otraRuta;
  return `<url><loc>${abs(u.ruta)}</loc><lastmod>${HOY}</lastmod><priority>${u.prioridad}</priority>` +
    `<xhtml:link rel="alternate" hreflang="es" href="${abs(es)}"/><xhtml:link rel="alternate" hreflang="en" href="${abs(en)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${abs(es)}"/>` +
    (u.img ? `<image:image><image:loc>${abs(u.img)}</image:loc>${u.imgTit ? `<image:title>${u.imgTit.replace(/&/g, '&amp;')}</image:title>` : ''}</image:image>` : '') + '</url>';
}).join('\n')}
</urlset>
`;
await escribir(join(DIST, 'sitemap.xml'), sitemap);

const bots = ['Googlebot', 'Bingbot', 'DuckDuckBot', 'Applebot', 'Applebot-Extended', 'Google-Extended', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'CCBot', 'Meta-ExternalAgent', 'Amazonbot', 'cohere-ai', 'MistralAI-User', 'YouBot'];
await escribir(join(DIST, 'robots.txt'), `# ivanrene.com — ${SITIO.nombre}, ${PERFIL.es.rol}
# Personas, buscadores y agentes de IA son bienvenidos. Resumen para IA: https://ivanrene.com/llms.txt

User-agent: *
Allow: /
Disallow: /panel/
Disallow: /auth/
Disallow: /api/
Disallow: /propuestas/

${bots.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /
Disallow: /panel/
Disallow: /auth/

Sitemap: https://ivanrene.com/sitemap.xml
`);

const rss = (l) => {
  const en = l === 'en';
  const items = [
    ...PROYECTOS.map((p) => ({ t: p.n, link: abs(RUTA_PROYECTO[l](p.slug)), d: p[l], cat: en ? 'Projects' : 'Proyectos' })),
    ...CARRERA.map((c) => ({ t: c[l], link: abs(PAGINAS.trayectoria[l]) + '#' + c.desde, d: `${c.mes[l]}. ${c.b[l].join(' ')}`, cat: en ? 'Career' : 'Trayectoria', fecha: new Date(c.desde.length === 7 ? c.desde + '-01' : c.desde).toUTCString() })),
  ];
  const x = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${x(SITIO.nombre)} · ${x(PERFIL[l].rol)}</title>
<link>${abs(PAGINAS.resumen[l])}</link>
<atom:link href="${abs(en ? '/en/rss.xml' : '/rss.xml')}" rel="self" type="application/rss+xml"/>
<description>${x(PERFIL[l].resumen)}</description>
<language>${en ? 'en' : 'es-co'}</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<image><url>${abs('/icon-192.png')}</url><title>${x(SITIO.nombre)}</title><link>${abs(PAGINAS.resumen[l])}</link></image>
${items.map((i) => `<item><title>${x(i.t)}</title><link>${i.link}</link><guid isPermaLink="false">${x(i.link + '|' + i.t)}</guid><category>${i.cat}</category><description>${x(i.d)}</description>${i.fecha ? `<pubDate>${i.fecha}</pubDate>` : ''}</item>`).join('\n')}
</channel>
</rss>
`;
};
await escribir(join(DIST, 'rss.xml'), rss('es'));
await escribir(join(DIST, 'en/rss.xml'), rss('en'));

await escribir(join(DIST, 'site.webmanifest'), JSON.stringify({
  name: `${SITIO.nombre} · ${PERFIL.es.rol}`, short_name: 'Iván Ramírez', description: PAGINAS.resumen.desc.es, lang: 'es', start_url: '/', scope: '/', display: 'standalone',
  background_color: '#0B0F19', theme_color: '#0B0F19',
  icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }, { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }, { src: '/marca/monograma.svg', sizes: 'any', type: 'image/svg+xml' }],
}, null, 1));
await escribir(join(DIST, 'humans.txt'), `/* TEAM */\nIngeniero: ${SITIO.nombre}\nContacto: ${SITIO.correo}\nWhatsApp: ${SITIO.telefono}\nDesde: Tame, Arauca, Colombia\n\n/* SITE */\nÚltima actualización: ${HOY}\nIdiomas: Español, English\nHecho con: HTML, CSS y JS sin frameworks, Cloudflare Workers\n`);
const expira = new Date(Date.now() + 365 * 864e5).toISOString();
await escribir(join(DIST, '.well-known/security.txt'), `Contact: mailto:${SITIO.correo}\nExpires: ${expira}\nPreferred-Languages: es, en\nCanonical: https://ivanrene.com/.well-known/security.txt\n`);
await escribir(join(DIST, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY);
await escribir(join(DIST, 'resume.json'), JSON.stringify({
  $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
  basics: { name: SITIO.nombre, label: PERFIL.es.rol, image: abs('/img/foto-ivan-640.webp'), email: SITIO.correo, phone: SITIO.telefono, url: abs('/'), summary: PERFIL.es.resumen,
    location: { city: 'Tame', region: 'Arauca', countryCode: 'CO' }, profiles: [{ network: 'LinkedIn', username: 'ivanramirez-in', url: SITIO.linkedin }, { network: 'GitHub', username: 'ivanramirez-git', url: SITIO.github }] },
  work: CARRERA.filter((c) => c.org).map((c) => ({ name: c.org, position: c.es.replace(/ en .*/, ''), startDate: c.desde, summary: c.mes.es, highlights: c.b.es })),
  education: [{ institution: 'Pontificia Universidad Javeriana', area: 'Ingeniería de Sistemas', studyType: 'Pregrado', startDate: '2017', endDate: '2024-09-05' }],
  certificates: [{ name: `Matrícula profesional COPNIA ${SITIO.matricula}`, date: '2025-10-14', issuer: 'COPNIA' }],
  skills: Object.entries(STACK).map(([name, keywords]) => ({ name, keywords })),
  languages: [{ language: 'Español', fluency: 'Nativo' }, { language: 'English', fluency: 'Profesional' }],
  projects: PROYECTOS.map((p) => ({ name: p.n, description: p.es, url: p.url || undefined, keywords: p.c })),
}, null, 1));

console.log(`dist listo: ${urls.length} páginas, ${Object.keys(md).length} Markdown, JS ${jsRuta}, CSS ${(css.length / 1024).toFixed(1)} KB`);
