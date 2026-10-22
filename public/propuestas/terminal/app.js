/* Propuesta «terminal»: idioma, arranque, secciones activas, línea de comandos y animaciones. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  root.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} },
  };

  /* ---------- Idioma ---------- */
  const EN = {
    skip: 'Skip to content', pause: 'Pause animations', pause_on: 'Resume animations', cta_short: 'Message me',
    explorer: 'Explorer', t_home: '~/home', t_now: '~/now', boot_t: 'zsh — boot', t_proj: '~/projects', t_career: '~/career', t_contact: '~/contact', available: 'available',
    eyebrow: 'Software Engineer · Full Stack · SRE · Tame, Colombia',
    h1a: 'Software that reaches production', h1b: 'and stays running.',
    lede: 'I\'m Iván René Ramírez Castro. I design, build, deploy and run payment, lending, IoT and AI platforms for companies in Colombia and the United States. You talk directly to the person who writes the code.',
    cta: 'Message me on WhatsApp', cta2: 'ls projects/',
    f1: 'Systems Engineer · Javeriana', f2: 'Licensed engineer (COPNIA)', f3: '6+ years in production', f4: 'Spanish & English · UTC−5',
    skip_boot: 'Skip',
    b0: '<span class="ps">$</span> ./boot --profile ivan', b1: '<span class="okc">✓</span> official monogram loaded',
    b2: '<span class="okc">✓</span> stack: TypeScript · Angular · Flutter · NestJS · .NET', b3: '<span class="okc">✓</span> cloud: AWS · Cloudflare · Terraform · Docker',
    b4: '<span class="okc">✓</span> 10 real products linked', b5: '<span class="live">●</span> operational · remote from Tame, Colombia',
    d1: 'Point-of-sale payments', d2: 'IoT access control at airports', d3: 'Credit origination', d4: 'KYC & biometrics',
    d5: 'E-signature', d6: 'Bank integrations', d7: 'AI document analysis', d8: '24/7 smart hotel',
    ahora_h: 'What I do today', remote: 'remote',
    wnr_h: 'Full Stack and SRE for a smart hotel that never switches off',
    wnr_p: 'I deploy and maintain the critical services of the hotel system: monitoring, production incident response and CI/CD pipelines that ship changes without breaking anything.',
    uptime_l: 'continuous operation · 90 days', illus: 'illustrative, not a measurement',
    partner_t: 'Partner', freeloz_p: 'Custom software, cloud and AI for small and mid-sized companies in Latin America, with a fixed budget per phase.',
    pipe_t: 'How your software reaches production', pipe_n: 'Every change goes through a build, automated deployment and monitoring before it reaches your users.', p_deploy: 'deploy', p_mon: 'monitoring', p_live: '● in production',
    map_t: 'Remote from Tame, Arauca', m_world: 'the world',
    svc_h: 'What I build for you',
    s1_h: 'Build', s1_p: 'Web with Angular, React, Vue or Next.js; mobile apps with Flutter; backends with NestJS, .NET or Node.js.',
    s2_h: 'Deploy', s2_p: 'AWS, Cloudflare and Azure with Terraform, Docker and CI/CD pipelines. Publishing to Google Play and the App Store.',
    s3_h: 'Run (SRE)', s3_p: 'Monitoring, incident response, backups and dev, QA and production environments.',
    s4_h: 'Integrate AI', s4_p: 'Document analysis, Elasticsearch search and automations with N8N, OpenAI, Anthropic or Bedrock.',
    proj_h: 'Real products, in production', proj_lede: 'Every link opens the live product. Those marked as client are platforms I built or maintain for other companies.',
    client: 'client', product: 'product', ai: 'AI', payments: 'Payments', banks: 'Banks',
    pj_wyc: '100% digital business credit with AI for Colombian companies.',
    pj_wyt: 'Local and international payments and collections in one platform.',
    pj_vf: 'Multi-step digital onboarding for financial compliance, multi-tenant.',
    pj_micro: 'Indoor-football tournaments: teams, stages, matches, goals and cards. Vue 3, LoopBack 4, MongoDB and Terraform on AWS.',
    pj_pc: 'Expenses and field work for plantain growers. PWA and Android app.',
    pj_ts: 'Online raffles with Wompi payments, GA4 analytics and a multi-tenant architecture.',
    pj_cb: 'Catalog rebuilt daily from a wholesale PDF, with cart and PayPal.',
    pj_pp: 'Central payments microservice (Wompi) used by several platforms. FastAPI and API keys. Internal service.',
    pj_timer: 'A fast, distraction-free productivity app.', pj_fz: 'Corporate site and services platform.',
    oss_h: 'Open source', oss1: 'MongoDB backups to S3 storage with a web panel', oss2: 'Flutter starter with clean architecture',
    oss3: 'Tournament API in LoopBack 4', oss4: '.NET + SQL Server + Angular template',
    stack_h: 'What I work with', o_ai: 'AI',
    career_h: 'Career',
    c1t: 'current', c1: 'Full Stack and SRE for a smart hotel that runs 24/7 · Miami, remote', c2b: 'COPNIA professional license', c2: 'active',
    c3: 'Full Stack and DevOps: GitLab pipelines, AWS, Azure and Linux and Windows servers',
    c4t: 'tag: degree', c4b: 'Systems Engineer',
    c5: 'AI web apps (NeuralSeek, OpenAI, Anthropic, Bedrock) and Elasticsearch · IBM Platinum partner',
    c6: 'Angular, Flutter, .NET with CQRS, NestJS, Hasura and AWS', c7: 'Database migration, reporting and CI/CD with Azure DevOps',
    c8: 'MVPs for startups with Flutter, Angular, Node.js and MongoDB', c9b: 'Systems Engineering', c9: 'starts at Javeriana, focused on advanced software development',
    contact_h: 'Shall we talk about your project?',
    contact_lede: 'Tell me what you need. You get a reply from me, not a salesperson, and an honest answer on whether to build it or use something that already exists.',
    email: 'Email', abroad: 'Abroad',
    m1_h: 'Managed outsourcing', m1_p: 'A services agreement with a Colombian legal entity, with clear scope, reporting and formal invoicing.',
    m2_h: 'International contractor', m2_p: 'For companies outside Colombia: a direct contract, work in English or Spanish, and in your time zone when needed.',
    bye: 'thanks for stopping by', ph: 'type help or tap a command',
    foot: 'Systems Engineer, COPNIA license 091122-0797186 CNDC · Handmade, no templates.', st_ok: 'operational',
  };
  const ES = {};
  $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (!(k in ES)) ES[k] = el.innerHTML; });
  ES.pause_on = 'Reanudar animaciones';
  $$('[data-i18n-ph]').forEach(el => { ES[el.dataset.i18nPh] = el.placeholder; });
  const META = {
    es: { title: document.title, desc: $('meta[name="description"]').content },
    en: { title: 'Iván René Ramírez Castro · Software Engineer · Full Stack · SRE',
          desc: 'Full Stack Software Engineer and SRE working remotely from Tame, Colombia. I design, build and run payment, lending, IoT and AI platforms that reach production and stay running.' },
  };
  let lang = 'es';
  function setLang(l) {
    lang = l === 'en' ? 'en' : 'es';
    const d = lang === 'en' ? EN : ES;
    $$('[data-i18n]').forEach(el => { const v = d[el.dataset.i18n]; if (v != null) el.innerHTML = v; });
    $$('[data-i18n-ph]').forEach(el => { const v = d[el.dataset.i18nPh]; if (v) el.placeholder = v; });
    root.lang = lang;
    document.title = META[lang].title;
    $('meta[name="description"]').content = META[lang].desc;
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $('#st-lang').textContent = lang.toUpperCase();
    paintPause();
    store.set('ir-lang', lang);
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ---------- Pausa ---------- */
  const pauseBtn = $('#pause');
  let paused = false;
  function paintPause() {
    pauseBtn.setAttribute('aria-pressed', String(paused));
    const span = $('span', pauseBtn);
    span.innerHTML = paused ? (lang === 'en' ? EN.pause_on : ES.pause_on) : (lang === 'en' ? EN.pause : ES.pause);
    $('use', pauseBtn).setAttribute('href', `#i-${paused ? 'play' : 'pause'}`);
  }
  function setPaused(p) { paused = p; root.classList.toggle('paused', p); paintPause(); store.set('ir-paused', p ? '1' : '0'); }
  pauseBtn.addEventListener('click', () => setPaused(!paused));

  const qLang = new URLSearchParams(location.search).get('lang');
  setLang(qLang || store.get('ir-lang') || 'es');
  setPaused(store.get('ir-paused') === '1');

  /* ---------- Arranque ---------- */
  const lines = $$('#boot-log li');
  const fill = $('#boot-fill');
  let bootT = [];
  function bootDone() {
    bootT.forEach(clearTimeout); bootT = [];
    lines.forEach(li => li.classList.add('in'));
    fill.style.transform = 'scaleX(1)';
    $('#skip-boot').hidden = true;
  }
  if (reduce || paused) bootDone();
  else {
    lines.forEach((li, i) => bootT.push(setTimeout(() => {
      li.classList.add('in');
      fill.style.transform = `scaleX(${(i + 1) / lines.length})`;
      if (i === lines.length - 1) $('#skip-boot').hidden = true;
    }, 260 + i * 330)));
  }
  $('#skip-boot').addEventListener('click', bootDone);

  /* ---------- Escritura de comandos por sección ---------- */
  function typeIt(el) {
    if (el.dataset.done) return; el.dataset.done = '1';
    if (reduce || paused) return;
    const full = el.textContent; let i = 0;
    el.textContent = ''; el.classList.add('typing');
    const step = () => { el.textContent = full.slice(0, ++i); if (i < full.length) setTimeout(step, 22 + Math.random() * 30); else setTimeout(() => el.classList.remove('typing'), 900); };
    step();
  }

  /* ---------- Operación (ilustrativa) ---------- */
  const up = $('#uptime');
  for (let i = 0; i < 90; i++) {
    const b = document.createElement('i');
    if (i === 23 || i === 61) b.className = 'soft';
    b.style.transitionDelay = `${i * 9}ms`;
    up.appendChild(b);
  }

  /* ---------- Mini mapa de puntos ---------- */
  const shapes = [
    [[105,118],[140,108],[175,112],[205,130],[232,150],[244,178],[240,200],[150,200],[120,182],[106,150]],
    [[58,66],[80,74],[100,94],[112,110],[104,118],[88,104],[70,90],[54,78]],
    [[30,8],[120,8],[112,26],[102,50],[94,60],[86,46],[72,30],[30,28]],
  ];
  const inside = (x, y, p) => { let c = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { const [xi, yi] = p[i], [xj, yj] = p[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
  const md = $('#mapdots'); let dots = '';
  for (let y = 6; y < 200; y += 7) for (let x = 6; x < 260; x += 7) if (shapes.some(s => inside(x, y, s))) dots += `<circle cx="${x}" cy="${y}" r="1.6"/>`;
  md.innerHTML = dots;

  /* ---------- Secciones visibles ---------- */
  const secs = $$('main .sec');
  const treeLinks = $$('.tree a');
  const names = { inicio: '~/inicio', ahora: '~/ahora', proyectos: '~/proyectos', stack: '~/stack', trayectoria: '~/trayectoria', contacto: '~/contacto' };
  const namesEn = { inicio: '~/home', ahora: '~/now', proyectos: '~/projects', stack: '~/stack', trayectoria: '~/career', contacto: '~/contact' };
  function setActive(id) {
    treeLinks.forEach(a => a.classList.toggle('on', a.dataset.sec === id));
    const n = (lang === 'en' ? namesEn : names)[id];
    $('#chrome-path').textContent = n; $('#st-sec').textContent = n;
    const on = treeLinks.find(a => a.dataset.sec === id);
    if (on && innerWidth <= 1024) on.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
  }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-40% 0px -55% 0px' });
  secs.forEach(s => io.observe(s));
  setActive('inicio');

  const revealIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const t = e.target;
    if (t.matches('[data-type]')) typeIt(t);
    if (t.id === 'uptime') t.classList.add('on');
    if (t.id === 'glog') { t.classList.add('on'); $$('li', t).forEach((li, i) => setTimeout(() => li.classList.add('in'), reduce ? 0 : 120 + i * 110)); }
    revealIO.unobserve(t);
  }), { rootMargin: '0px 0px -12% 0px' });
  $$('[data-type]').forEach(el => revealIO.observe(el));
  revealIO.observe(up); revealIO.observe($('#glog'));
  // Si algo quedó en el primer pantallazo o el observador no corre, que no quede oculto
  setTimeout(() => { up.classList.add('on'); }, 4000);
  setTimeout(() => { const g = $('#glog'); if (!g.classList.contains('on')) { g.classList.add('on'); $$('li', g).forEach(li => li.classList.add('in')); } }, 6000);

  const heroEl = $('#inicio');
  const cmdIO = new IntersectionObserver(([e]) => root.classList.toggle('cmd-on', !e.isIntersecting || e.intersectionRatio < .35), { threshold: [0, .35, 1] });
  cmdIO.observe(heroEl);

  /* ---------- Reloj de Tame ---------- */
  const clock = $('#clock');
  const fmt = new Intl.DateTimeFormat('es-CO', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', hour12: false });
  const tick = () => { clock.textContent = fmt.format(new Date()); };
  tick(); setInterval(tick, 20000);

  /* ---------- Brillo y leve inclinación ---------- */
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  $$('.glow').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty('--mx', `${x}px`); el.style.setProperty('--my', `${y}px`);
      if (fine && !reduce && !paused) el.style.transform = `perspective(900px) rotateX(${((y / r.height) - .5) * -2.4}deg) rotateY(${((x / r.width) - .5) * 2.4}deg) translateY(-2px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });

  /* ---------- Línea de comandos ---------- */
  const input = $('#cmd-in'), out = $('#cmd-out'), ghost = $('#ghost');
  const T = (es, en) => (lang === 'en' ? en : es);
  const go = id => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); };
  const openUrl = u => { const a = document.createElement('a'); a.href = u; a.target = '_blank'; a.rel = 'noopener'; a.click(); };
  const CMDS = {
    help: () => T('comandos: <b>inicio</b> <b>ahora</b> <b>proyectos</b> <b>stack</b> <b>trayectoria</b> <b>contacto</b> <b>whatsapp</b> <b>correo</b> <b>idioma</b> <b>pausa</b> <b>clear</b>',
                  'commands: <b>home</b> <b>now</b> <b>projects</b> <b>stack</b> <b>career</b> <b>contact</b> <b>whatsapp</b> <b>email</b> <b>language</b> <b>pause</b> <b>clear</b>'),
    inicio: () => (go('inicio'), T('cd ~/inicio', 'cd ~/home')),
    ahora: () => (go('ahora'), T('cd ~/ahora · Full Stack y SRE en Wait N\' Rest, socio en Freeloz', 'cd ~/now · Full Stack and SRE at Wait N\' Rest, partner at Freeloz')),
    proyectos: () => (go('proyectos'), T('10 productos reales · cada enlace abre el producto en vivo', '10 real products · every link opens the live product')),
    stack: () => (go('stack'), 'cat stack.json'),
    trayectoria: () => (go('trayectoria'), T('git log desde 2017', 'git log since 2017')),
    contacto: () => (go('contacto'), T('WhatsApp +57 312 276 0392 · ivanrene10@gmail.com', 'WhatsApp +57 312 276 0392 · ivanrene10@gmail.com')),
    whatsapp: () => (openUrl('https://wa.me/573122760392'), T('abriendo WhatsApp…', 'opening WhatsApp…')),
    correo: () => (location.href = 'mailto:ivanrene10@gmail.com', T('abriendo tu correo…', 'opening your email…')),
    idioma: arg => { setLang(arg === 'es' || arg === 'en' ? arg : (lang === 'es' ? 'en' : 'es')); setActive(currentId()); return T('idioma: español', 'language: English'); },
    pausa: () => (setPaused(!paused), paused ? T('animaciones en pausa', 'animations paused') : T('animaciones activas', 'animations running')),
    clear: () => '',
    sudo: () => T('permiso denegado. Pero puedes escribirme por <b>whatsapp</b>.', 'permission denied. You can still message me on <b>whatsapp</b>.'),
    whoami: () => T('Iván René Ramírez Castro · Ingeniero de Software · Full Stack · SRE', 'Iván René Ramírez Castro · Software Engineer · Full Stack · SRE'),
  };
  const ALIAS = { ayuda: 'help', home: 'inicio', now: 'ahora', projects: 'proyectos', career: 'trayectoria', contact: 'contacto', email: 'correo', mail: 'correo',
    lang: 'idioma', language: 'idioma', pause: 'pausa', cd: null, ls: 'proyectos', cls: 'clear', wa: 'whatsapp' };
  const names2 = [...Object.keys(CMDS), ...Object.keys(ALIAS).filter(k => ALIAS[k])];
  function currentId() { const on = treeLinks.find(a => a.classList.contains('on')); return on ? on.dataset.sec : 'inicio'; }
  function run(raw) {
    const line = raw.trim(); if (!line) return;
    let [c, ...rest] = line.toLowerCase().split(/\s+/);
    if (c === 'cd' && rest[0]) { c = rest[0].replace(/^~\//, '').replace(/\/$/, ''); rest = rest.slice(1); }
    c = ALIAS[c] || c;
    const fn = CMDS[c];
    const res = fn ? fn(rest[0]) : T(`comando no encontrado: ${c}. Prueba <b>help</b>.`, `command not found: ${c}. Try <b>help</b>.`);
    out.innerHTML = res ? `<span class="ps">›</span> ${res}` : '';
  }
  const suggest = v => { v = v.toLowerCase(); return v ? names2.find(n => n.startsWith(v) && n !== v) : null; };
  function paintGhost() {
    const v = input.value, s = suggest(v);
    if (!s) { ghost.textContent = ''; return; }
    const m = document.createElement('canvas').getContext('2d');
    m.font = getComputedStyle(input).font;
    ghost.style.left = `${input.offsetLeft + m.measureText(v).width}px`;
    ghost.textContent = s.slice(v.length);
  }
  const hist = []; let hi = 0;
  input.addEventListener('input', paintGhost);
  input.addEventListener('keydown', e => {
    if (e.key === 'Tab' && suggest(input.value)) { e.preventDefault(); input.value = suggest(input.value); paintGhost(); }
    else if (e.key === 'ArrowUp' && hist.length) { e.preventDefault(); hi = Math.max(0, hi - 1); input.value = hist[hi]; paintGhost(); }
    else if (e.key === 'ArrowDown' && hist.length) { e.preventDefault(); hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ''; paintGhost(); }
  });
  $('#cmd-form').addEventListener('submit', e => {
    e.preventDefault(); const v = input.value; if (v.trim()) { hist.push(v); hi = hist.length; }
    run(v); input.value = ''; paintGhost();
  });
  $$('#chips button').forEach(b => b.addEventListener('click', () => { run(b.dataset.cmd); }));
  addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== input && !e.metaKey && !e.ctrlKey && getComputedStyle($('#cmd')).display !== 'none') { e.preventDefault(); input.focus(); }
  });
})();
