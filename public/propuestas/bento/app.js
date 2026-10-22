(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
  };

  /* ---------------- Textos ---------------- */
  const T = {
    es: {
      skip: 'Saltar al contenido',
      'nav.work': 'Proyectos', 'nav.how': 'Cómo trabajo', 'nav.hire': 'Contratar', 'nav.contact': 'Contacto',
      pause: 'Pausar animaciones', resume: 'Reanudar animaciones',
      'cta.short': 'WhatsApp', 'cta.wa': 'Escríbeme por WhatsApp', 'cta.mail': 'Correo',
      'hero.eyebrow': 'Ingeniero de Software · Full Stack · SRE',
      'hero.t1': 'Construyo software que llega a producción,', 'hero.t2': 'y lo mantengo ahí.',
      'hero.p': 'Soy <b>Iván René Ramírez Castro</b>. Diseño, construyo y opero plataformas de pagos, crédito digital, IoT e IA aplicada para empresas de Colombia y Estados Unidos.',
      'hero.cta2': 'Ver proyectos',
      'hero.status': 'Disponible para proyectos · remoto desde Tame, Arauca, Colombia',
      'term.hint': 'Toca un comando:',
      'build.k': 'Qué construyo', 'build.t': 'Software que mueve dinero y cosas',
      'flow.1': 'Solicitud', 'flow.3': 'Scoring IA', 'flow.4': 'Firma', 'flow.5': 'Desembolso', 'flow.note': 'esquema ilustrativo de un flujo de crédito digital',
      'dom.1': 'Pagos en punto de venta', 'dom.2': 'Acceso IoT en aeropuertos', 'dom.3': 'Originación de crédito', 'dom.4': 'KYC y biometría', 'dom.5': 'Firma electrónica', 'dom.6': 'Integración con bancos', 'dom.7': 'Documentos con IA',
      'duty.1': 'Monitoreo proactivo', 'duty.2': 'Atención de incidentes en producción', 'duty.3': 'CI/CD y despliegue continuo',
      'build.pay': 'Pagos', 'build.kyc': 'Crédito y KYC', 'build.iot': 'IoT y acceso', 'build.ai': 'IA aplicada', 'build.cloud': 'Nube y DevOps',
      'stack.t': 'Con qué trabajo',
      'now.k': 'Ahora', 'now.t': 'Full Stack y SRE, 24/7',
      'now.p1': '<b>Wait N\' Rest</b> · Miami (remoto): la plataforma de un hotel inteligente que no se apaga.',
      'now.p2': '<b>Freeloz</b> · socio: software a medida, nube e IA para pymes.',
      'now.note': 'barras ilustrativas · no son mediciones',
      'work.k': 'En producción',
      'map.k': 'Desde Tame', 'map.t': 'Remoto desde los Llanos', 'map.p': 'Tame, Arauca → Bogotá → Miami → donde esté tu equipo.', 'map.world': 'el mundo',
      'cred.k': 'Credenciales', 'cred.deg': 'Ingeniero de Sistemas', 'cred.cop': 'Matrícula COPNIA', 'cred.yrs': '+6 años en producción', 'cred.since': 'desde 2020: web, móvil y nube',
      'talk.k': 'Hablemos', 'talk.t': '¿Tienes un proyecto?', 'talk.p': 'Te respondo yo, el ingeniero que lo va a construir.',
      chat1: 'Hola Iván, tengo un proyecto…', chat2: '¡Hola! Cuéntame: ¿qué necesitas llevar a producción?', 'chat.note': 'conversación ilustrativa',
      'work.h': 'Software que ya está en producción',
      'work.lead': 'Productos reales y en línea. Algunos son de clientes; otros, productos propios o de Freeloz.',
      'oss.1': 'Copias de MongoDB a almacenamiento S3 con panel web.', 'oss.2': 'Base de Flutter con arquitectura limpia.', 'oss.3': 'Plantilla .NET + SQL Server + Angular.',
      'how.h': 'Cómo trabajo', 'how.lead': 'Compromisos que puedes comprobar, no estadísticas.',
      'how.1t': 'Hablas conmigo', 'how.1p': 'Sin intermediarios: quien te responde es quien programa.',
      'how.2t': 'Demo cada 1–2 semanas', 'how.2p': 'Ves software funcionando, no informes.',
      'how.3t': 'Tu código, tu nube', 'how.3p': 'Repositorio, cuentas y documentación a tu nombre desde el primer día.',
      'how.4t': 'Listo para producción', 'how.4p': 'CI/CD, monitoreo y respaldos antes del lanzamiento.',
      'how.5t': 'Después del lanzamiento', 'how.5p': 'Opero, mantengo y mejoro lo que construyo, o te lo dejo documentado.',
      'hire.h': 'Dos formas de trabajar juntos',
      'hire.1t': 'Empresas en Colombia', 'hire.1p': 'Outsourcing gestionado con persona jurídica en Colombia, por prestación de servicios. Alcance claro y reportes semanales.',
      'hire.2t': 'Empresas del exterior', 'hire.2p': 'Contratista internacional directo, en español o inglés, con alcance definido y responsabilidad de la entrega.',
      'contact.h': 'Hablemos de tu proyecto', 'contact.p': 'WhatsApp es lo más rápido. También respondo por correo y LinkedIn.',
      foot: 'hecho a mano: HTML, CSS y SVG',
      tags: { client: 'Cliente', product: 'Producto', freeloz: 'Freeloz', internal: 'Servicio interno' },
      shot: 'Captura de'
    },
    en: {
      skip: 'Skip to content',
      'nav.work': 'Work', 'nav.how': 'How I work', 'nav.hire': 'Hire me', 'nav.contact': 'Contact',
      pause: 'Pause animations', resume: 'Resume animations',
      'cta.short': 'WhatsApp', 'cta.wa': 'Message me on WhatsApp', 'cta.mail': 'Email',
      'hero.eyebrow': 'Software Engineer · Full Stack · SRE',
      'hero.t1': 'I build software that reaches production,', 'hero.t2': 'and keep it running there.',
      'hero.p': 'I\'m <b>Iván René Ramírez Castro</b>. I design, build and operate payments, digital lending, IoT and applied-AI platforms for companies in Colombia and the United States.',
      'hero.cta2': 'See the work',
      'hero.status': 'Available for projects · remote from Tame, Arauca, Colombia',
      'term.hint': 'Tap a command:',
      'build.k': 'What I build', 'build.t': 'Software that moves money and things',
      'flow.1': 'Application', 'flow.3': 'AI scoring', 'flow.4': 'e-Signature', 'flow.5': 'Payout', 'flow.note': 'illustrative digital-lending flow',
      'dom.1': 'Point-of-sale payments', 'dom.2': 'IoT access at airports', 'dom.3': 'Loan origination', 'dom.4': 'KYC & biometrics', 'dom.5': 'e-Signature', 'dom.6': 'Bank integrations', 'dom.7': 'AI document analysis',
      'duty.1': 'Proactive monitoring', 'duty.2': 'Production incident response', 'duty.3': 'CI/CD and continuous delivery',
      'build.pay': 'Payments', 'build.kyc': 'Lending & KYC', 'build.iot': 'IoT & access', 'build.ai': 'Applied AI', 'build.cloud': 'Cloud & DevOps',
      'stack.t': 'What I work with',
      'now.k': 'Now', 'now.t': 'Full Stack & SRE, 24/7',
      'now.p1': '<b>Wait N\' Rest</b> · Miami (remote): the platform of a smart hotel that never shuts down.',
      'now.p2': '<b>Freeloz</b> · partner: custom software, cloud and AI for small businesses.',
      'now.note': 'illustrative bars · not measurements',
      'work.k': 'In production',
      'map.k': 'From Tame', 'map.t': 'Remote from the Colombian plains', 'map.p': 'Tame, Arauca → Bogotá → Miami → wherever your team is.', 'map.world': 'the world',
      'cred.k': 'Credentials', 'cred.deg': 'Systems Engineer', 'cred.cop': 'COPNIA license', 'cred.yrs': '6+ years in production', 'cred.since': 'since 2020: web, mobile and cloud',
      'talk.k': 'Let\'s talk', 'talk.t': 'Got a project?', 'talk.p': 'You\'ll hear back from me, the engineer who will build it.',
      chat1: 'Hi Iván, I have a project…', chat2: 'Hi! Tell me: what do you need to get into production?', 'chat.note': 'illustrative conversation',
      'work.h': 'Software already in production',
      'work.lead': 'Real, live products. Some belong to clients; others are my own or Freeloz products.',
      'oss.1': 'MongoDB backups to S3-compatible storage, with a web panel.', 'oss.2': 'Flutter starter with clean architecture.', 'oss.3': '.NET + SQL Server + Angular template.',
      'how.h': 'How I work', 'how.lead': 'Commitments you can check, not statistics.',
      'how.1t': 'You talk to me', 'how.1p': 'No middlemen: the person who answers is the person who codes.',
      'how.2t': 'A demo every 1–2 weeks', 'how.2p': 'You see working software, not reports.',
      'how.3t': 'Your code, your cloud', 'how.3p': 'Repository, accounts and documentation in your name from day one.',
      'how.4t': 'Production-ready', 'how.4p': 'CI/CD, monitoring and backups before launch.',
      'how.5t': 'After launch', 'how.5p': 'I operate, maintain and improve what I build, or leave it documented.',
      'hire.h': 'Two ways to work together',
      'hire.1t': 'Companies in Colombia', 'hire.1p': 'Managed outsourcing through a Colombian legal entity, under a service agreement. Clear scope and weekly reports.',
      'hire.2t': 'Companies abroad', 'hire.2p': 'Direct international contractor, in Spanish or English, with defined scope and ownership of delivery.',
      'contact.h': 'Let\'s talk about your project', 'contact.p': 'WhatsApp is fastest. I also reply by email and LinkedIn.',
      foot: 'handmade: HTML, CSS and SVG',
      tags: { client: 'Client', product: 'Product', freeloz: 'Freeloz', internal: 'Internal service' },
      shot: 'Screenshot of'
    }
  };

  const P = [
    { n: 'WyCrédito', tag: 'client', url: 'https://wycredito.com', img: 'wycredito-home.webp', w: 1440, h: 782,
      es: 'Crédito empresarial 100 % digital con IA para empresas colombianas.', en: '100% digital, AI-powered business lending for Colombian companies.' },
    { n: 'WyTransfer', tag: 'client', url: 'https://wytransfer.com', img: 'wytransfer-home.webp', w: 1440, h: 782,
      es: 'Pagos y cobros locales e internacionales en una sola plataforma.', en: 'Local and international payments and collections on one platform.' },
    { n: 'VinculaForm', tag: 'client', url: 'https://vinculaform.com', img: 'vinculaform-home.webp', w: 800, h: 600,
      es: 'Vinculación digital multipaso para cumplimiento financiero, multi-tenant.', en: 'Multi-step digital onboarding for financial compliance, multi-tenant.' },
    { n: 'Micro · Freeloz', tag: 'freeloz', url: 'https://micro.freeloz.com', img: 'micro-freeloz-home.webp', w: 1200, h: 3701,
      es: 'Torneos de microfútbol: landing y panel de equipos, fases, partidos y estadísticas.', en: 'Futsal tournaments: landing page and panel for teams, stages, matches and stats.' },
    { n: 'PlátanoControl', tag: 'product', url: 'https://platanocontrol.com', img: 'platanocontrol-home.webp', w: 800, h: 600,
      es: 'Gastos y labores de campo para productores de plátano. PWA + Android.', en: 'Expenses and field work for plantain growers. PWA + Android.' },
    { n: 'TeSorteo', tag: 'product', url: 'https://tesorteo.com', img: 'tesorteo-home.webp', w: 800, h: 600,
      es: 'Rifas en línea con pagos Wompi, analítica GA4 y multi-tenant.', en: 'Online raffles with Wompi payments, GA4 analytics, multi-tenant.' },
    { n: 'CelularesBaratos', tag: 'product', url: 'https://celularesbaratos.ivanrene.com', img: 'celularesbaratos-home.webp', w: 800, h: 600,
      es: 'Catálogo generado a diario desde un PDF mayorista, con carrito y PayPal.', en: 'Catalog generated daily from a wholesale PDF, with cart and PayPal.' },
    { n: 'PayPay', tag: 'internal', url: null, img: 'paypay-home.webp', w: 800, h: 600,
      es: 'Microservicio central de pagos (Wompi) que usan varias plataformas. FastAPI.', en: 'Central payments microservice (Wompi) used by several platforms. FastAPI.' },
    { n: 'Freeloz', tag: 'freeloz', url: 'https://freeloz.com', img: 'freeloz-home.webp', w: 1200, h: 5956,
      es: 'Sitio y plataforma de servicios de Freeloz, la empresa de la que soy socio.', en: 'Site and services platform for Freeloz, the company I\'m a partner in.' }
  ];
  const WORK = [0, 3, 1, 8, 4];

  let lang = (new URLSearchParams(location.search).get('lang') || store.get('ir-lang') || 'es');
  if (!T[lang]) lang = 'es';
  let paused = reduce;

  /* ---------------- Traducción ---------------- */
  function applyLang() {
    const t = T[lang];
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (t[k] != null) el.textContent = t[k]; });
    $$('[data-i18n-html]').forEach(el => { const k = el.dataset.i18nHtml; if (t[k] != null) el.innerHTML = t[k]; });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $('#map-world').textContent = t['map.world'];
    setPauseLabel();
    renderProjects();
    showWork(workIdx, true);
    term.reset();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => {
    lang = b.dataset.lang; store.set('ir-lang', lang); applyLang();
  }));

  /* ---------------- Pausa ---------------- */
  const pauseBtn = $('#pause');
  function setPauseLabel() {
    pauseBtn.setAttribute('aria-pressed', String(paused));
    const s = pauseBtn.querySelector('span');
    s.textContent = paused ? T[lang].resume : T[lang].pause;
    s.removeAttribute('data-i18n');
  }
  function applyPause() {
    document.body.classList.toggle('paused', paused);
    $$('svg').forEach(s => { try { paused ? s.pauseAnimations() : s.unpauseAnimations(); } catch (_) {} });
    setPauseLabel();
    if (paused) stopCycle(); else startCycle();
  }
  pauseBtn.addEventListener('click', () => { paused = !paused; applyPause(); if (paused) term.finish(); });

  /* ---------------- Terminal ---------------- */
  const term = (() => {
    const body = $('#term');
    const L = {
      es: {
        whoami: ['<b class="cmd">Iván René Ramírez Castro</b>', 'Ingeniero de Software · <span class="hl">Full Stack</span> · <span class="hl">SRE</span>'],
        ahora: ['Full Stack + SRE en <b class="cmd">Wait N\' Rest</b> · hotel inteligente 24/7', 'Socio en <b class="cmd">Freeloz</b> · software a medida'],
        prod: ['wycredito  wytransfer  vinculaform  micro', 'platanocontrol  tesorteo  paypay'],
        stack: ['TypeScript · Node.js · Angular · React · Flutter', 'NestJS · .NET · PostgreSQL · Supabase · MongoDB', 'AWS · Cloudflare · Docker · Terraform · n8n'],
        contacto: ['<a href="https://wa.me/573122760392" target="_blank" rel="noopener">WhatsApp +57 312 276 0392 ↗</a>', '<a href="mailto:ivanrene10@gmail.com">ivanrene10@gmail.com</a>  <span class="gr">· remoto desde Tame, Arauca</span>']
      },
      en: {
        whoami: ['<b class="cmd">Iván René Ramírez Castro</b>', 'Software Engineer · <span class="hl">Full Stack</span> · <span class="hl">SRE</span>'],
        ahora: ['Full Stack + SRE at <b class="cmd">Wait N\' Rest</b> · smart hotel, 24/7', 'Partner at <b class="cmd">Freeloz</b> · custom software'],
        prod: ['wycredito  wytransfer  vinculaform  micro', 'platanocontrol  tesorteo  paypay'],
        stack: ['TypeScript · Node.js · Angular · React · Flutter', 'NestJS · .NET · PostgreSQL · Supabase · MongoDB', 'AWS · Cloudflare · Docker · Terraform · n8n'],
        contacto: ['<a href="https://wa.me/573122760392" target="_blank" rel="noopener">WhatsApp +57 312 276 0392 ↗</a>', '<a href="mailto:ivanrene10@gmail.com">ivanrene10@gmail.com</a>  <span class="gr">· remote from Tame, Arauca</span>']
      }
    };
    const CMD = { whoami: 'whoami', ahora: 'cat ahora.txt', prod: 'ls producción/', stack: 'cat stack.txt', contacto: 'contacto --whatsapp' };
    const INTRO = ['whoami', 'ahora', 'prod', 'contacto'];
    let queue = [], busy = false, timer = null, token = 0;

    const prompt = () => '<span class="pr">❯</span> ';
    function cursorLine() {
      const c = document.createElement('div'); c.className = 'ln cur'; c.innerHTML = prompt() + '<span class="cursor"></span>'; return c;
    }
    function removeCursor() { $$('.cur', body).forEach(c => c.remove()); }
    function scroll() { body.scrollTop = body.scrollHeight; }

    function run(key, instant) {
      const my = token;
      return new Promise(res => {
        removeCursor();
        const line = document.createElement('div'); line.className = 'ln';
        line.innerHTML = prompt() + '<span class="cmd"></span>';
        body.appendChild(line);
        const span = line.querySelector('.cmd'); const text = CMD[key];
        const out = () => {
          L[lang][key].forEach(h => { const o = document.createElement('div'); o.className = 'ln out'; o.innerHTML = h; body.appendChild(o); });
          body.appendChild(cursorLine()); scroll(); res();
        };
        if (instant || paused) { span.textContent = text; out(); return; }
        let i = 0;
        const step = () => {
          if (my !== token) return res();
          span.textContent = text.slice(0, ++i); scroll();
          if (i < text.length) timer = setTimeout(step, 26 + Math.random() * 30);
          else timer = setTimeout(out, 140);
        };
        step();
      });
    }
    async function pump() {
      if (busy) return; busy = true;
      while (queue.length) { const k = queue.shift(); await run(k); await new Promise(r => setTimeout(r, paused ? 0 : 220)); }
      busy = false;
    }
    function reset() {
      token++; clearTimeout(timer); queue = []; busy = false; body.innerHTML = '';
      if (paused) { INTRO.forEach(k => run(k, true)); return; }
      body.appendChild(cursorLine());
      queue = INTRO.slice(); setTimeout(pump, 350);
    }
    function finish() {
      if (!queue.length && !busy) return;
      token++; clearTimeout(timer); queue = []; busy = false; body.innerHTML = '';
      INTRO.forEach(k => run(k, true));
    }
    $$('.term-cmds button').forEach(b => b.addEventListener('click', () => {
      queue.push(b.dataset.cmd); pump();
    }));
    return { reset, finish };
  })();

  /* ---------------- Barras «Ahora» ---------------- */
  (() => {
    const bars = $('#bars'); const n = 46; let h = '';
    for (let i = 0; i < n; i++) {
      const v = 58 + ((i * 37) % 40);
      h += `<i style="--i:${i};height:${v}%"${i === 13 || i === 31 ? ' class="soft"' : ''}></i>`;
    }
    bars.innerHTML = h;
  })();

  /* ---------------- Tarjeta «En producción» ---------------- */
  const wImg = $('#work-img'), wName = $('#work-name'), wDesc = $('#work-desc'), wUrl = $('#work-url'), wLink = $('#work-link'), dots = $('#work-dots');
  let workIdx = 0, cycle = null;
  WORK.forEach((pi, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.id = 'work-dot-' + i;
    b.setAttribute('aria-label', P[pi].n); b.addEventListener('click', () => { showWork(i); startCycle(); });
    dots.appendChild(b);
  });
  function setPan() {
    const view = wImg.parentElement; const p = P[WORK[workIdx]];
    const rendered = view.clientWidth * (p.h / p.w);
    const extra = rendered - view.clientHeight;
    if (extra > 40 && !reduce) {
      wImg.style.setProperty('--dist', -extra + 'px');
      wImg.style.setProperty('--pan', Math.min(22, Math.max(8, extra / 120)) + 's');
      wImg.classList.add('scroll');
    } else wImg.classList.remove('scroll');
  }
  function showWork(i, now) {
    workIdx = i; const p = P[WORK[i]];
    $$('button', dots).forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    const swap = () => {
      wImg.classList.remove('scroll');
      wImg.src = '/shared/proyectos/' + p.img; wImg.width = p.w; wImg.height = p.h;
      wImg.alt = T[lang].shot + ' ' + p.n;
      wName.textContent = p.n; wDesc.textContent = p[lang];
      const host = p.url ? p.url.replace('https://', '') : T[lang].tags.internal;
      wUrl.textContent = host; if (p.url) wLink.href = p.url;
      const done = () => { setPan(); wImg.classList.remove('fading'); };
      if (wImg.complete && wImg.naturalWidth) done(); else wImg.onload = done;
    };
    if (now) return swap();
    wImg.classList.add('fading'); setTimeout(swap, 380);
  }
  function startCycle() { stopCycle(); if (paused) return; cycle = setInterval(() => showWork((workIdx + 1) % WORK.length), 6500); }
  function stopCycle() { clearInterval(cycle); cycle = null; }
  addEventListener('resize', () => setPan());

  /* ---------------- Grilla de proyectos ---------------- */
  const frame = '<svg viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true"><rect width="400" height="24" fill="#141B2D"/><circle cx="13" cy="12" r="3.6" fill="#FF5F57"/><circle cx="25" cy="12" r="3.6" fill="#FEBC2E"/><circle cx="37" cy="12" r="3.6" fill="#28C840"/><rect x="120" y="6" width="160" height="12" rx="6" fill="#0B0F19"/></svg>';
  function renderProjects() {
    const g = $('#proj-grid'); const t = T[lang];
    g.innerHTML = P.map(p => {
      const tall = p.h / p.w > 1;
      const cls = p.tag === 'freeloz' ? 'tag free' : p.tag === 'client' ? 'tag' : 'tag own';
      const inner = `<div class="proj-shot">${frame}<img src="/shared/proyectos/${p.img}" alt="${t.shot} ${p.n}" loading="lazy" width="${p.w}" height="${p.h}" style="--hover-dist:${tall ? '-60%' : '-6%'}"></div>
        <div class="proj-body"><div class="proj-top"><h3>${p.n}</h3><span class="${cls}">${t.tags[p.tag]}</span></div>
        <p>${p[lang]}</p><span class="proj-url">${p.url ? p.url.replace('https://', '') + ' ↗' : t.tags.internal}</span></div>`;
      return p.url ? `<a class="proj" href="${p.url}" target="_blank" rel="noopener">${inner}</a>` : `<div class="proj nolink">${inner}</div>`;
    }).join('');
  }

  /* ---------------- Glow e inclinación ---------------- */
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  $$('.tile, .proj').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty('--mx', x + 'px'); el.style.setProperty('--my', y + 'px');
      if (fine && !reduce && !paused && el.classList.contains('tile') && !el.classList.contains('t-term')) {
        el.style.setProperty('--ry', ((x / r.width) - .5) * 4 + 'deg');
        el.style.setProperty('--rx', (.5 - (y / r.height)) * 4 + 'deg');
      }
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  });

  /* ---------------- Aparición bajo el pliegue ---------------- */
  if (!reduce && 'IntersectionObserver' in window) {
    const items = $$('.sec-h, .proj-grid, .oss, .pipe, .how, .hire, .contact');
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); e.target.classList.remove('pre'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => {
      if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('pre'); io.observe(el); }
    });
  }

  applyLang();
  applyPause();
})();
