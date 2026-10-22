/* Propuesta «perfil»: idioma, tema, pausa, pestañas, terminal, proyectos, repos en vivo, trayectoria y contacto. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = 'es';
  var WA = 'https://wa.me/573122760392';

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ------------------------------------------------------------ Textos EN */
  var EN = {
    saltar: 'Skip to content', tema: 'Switch theme', pausa: 'Pause animations', escribeme: 'Message me',
    fotoAlt: 'Iván René Ramírez Castro at his desk, with two monitors and a laptop',
    disponibleCorto: 'Available', pronombre: 'he/him', rolA: 'Software Engineer',
    bio: 'I design, build and run software that reaches production and stays up: payments, digital lending, IoT, applied AI and cloud. You talk directly to me, the one who writes the code.',
    ctaWa: 'Message me on WhatsApp', remoto: 'remote', horaLocal: 'local time (UTC−5)', socio: 'Partner at',
    titulo: 'Systems Engineer · Javeriana', logros: 'Credentials', lgJav: 'Javeriana', lgCop: 'COPNIA', lgProd: '6+ years',
    tResumen: 'Overview', tProyectos: 'Projects', tTrayectoria: 'Career', tContacto: 'Contact', repetir: 'Replay',
    bcEyebrow: 'What I build', bcTit: 'Software that moves money and things',
    b1t: 'Payments', b1d: 'at point of sale and bank integrations',
    b2t: 'Digital lending', b2d: 'origination, KYC, biometrics and e-signature',
    b3t: 'IoT', b3d: 'access control at airports',
    b4t: 'Applied AI', b4d: 'document analysis and search',
    b5t: 'Cloud & operations', b5d: 'AWS, Cloudflare, Docker, Terraform, CI/CD',
    stTit: 'What I work with',
    ppEyebrow: 'How it reaches production', ppTit: 'From commit to user, without scares',
    ppAria: 'commit, build, tests, deploy, live', ppTest: 'tests', ppVivo: 'live',
    ahEyebrow: 'Now',
    ah1: '<b>Wait N\' Rest</b>: the platform of a smart hotel that never shuts down.',
    ah2: 'Monitoring, incidents and CI/CD pipelines.',
    ah3: 'Partner at <b>Freeloz</b>: custom software.',
    ahNota: 'continuous operation · illustrative',
    mpEyebrow: 'From Tame, Arauca', mpTit: 'Remote for the world', mpAria: 'Map: from Tame, Arauca to Bogotá and Miami', mpMundo: 'the world',
    hbEyebrow: 'Let\'s talk', hbTit: 'Got a project?', hbTxt: 'Tell me what you need. I answer myself, on Colombia time (UTC−5).',
    fijados: 'In production', verTodos: 'See all projects',
    fijadosTodos: 'Products in production', fijadosSub: 'Products I built or worked on. Screenshots come from each site.',
    repos: 'Public repositories', reposSub: 'Read live from GitHub.',
    buscarLbl: 'Search repository', buscarPh: 'Find a repository…', lenguajeLbl: 'Language', todos: 'All languages',
    actividadTit: 'Latest pushes to public repos, by month',
    trTit: 'Commit history of my career', trSub: 'From my résumé. Most recent first.',
    ctTit: 'Let\'s talk about your project', ctSub: 'I answer myself, no middlemen. Compose the message and open it in WhatsApp.',
    rdQue: 'What do you need?', rdProyecto: 'A new project', rdEquipo: 'Extra hands for my team', rdOperacion: 'Run or rescue a system', rdVacante: 'A job opening',
    rdNombre: 'Your name', rdMsg: 'Tell me in two lines', rdEnviar: 'Open in WhatsApp', correo: 'Email', copiarCorreo: 'Copy email',
    modTit: 'Ways to work with me',
    m1t: 'Companies in Colombia', m1d: 'Managed outsourcing through a services agreement with a Colombian legal entity, with clear scope and deliveries.',
    m2t: 'Companies abroad', m2d: 'Direct international contractor, in English or Spanish, with hours overlapping the US.',
    m3t: 'With a team, through Freeloz', m3d: 'If the project needs more hands, we build it with <a href="https://freeloz.com" target="_blank" rel="noopener">Freeloz</a>: fixed budget per phase and a demo every 1–2 weeks.',
    cp1: '<b>You talk to the person who codes.</b> No middlemen.',
    cp2: '<b>Your code, your cloud, your docs.</b> In your name from day one.',
    cp3: '<b>Working demo</b> every 1–2 weeks.',
    cp4: '<b>I don\'t vanish after launch.</b> Monitoring and operation afterwards.',
    cpNota: 'Working commitments, not statistics.'
  };
  var ES = {};

  var T = {
    es: {
      copiado: 'Correo copiado', noCopiado: 'Selecciona y copia: ivanrene10@gmail.com',
      hola: 'Hola Iván', soy: 'soy', reposEnVivo: 'Leídos en vivo desde GitHub.', reposCache: 'GitHub no respondió; muestro una copia guardada.',
      actNota: function (n, desde) { return n + ' repos públicos · mes del último push de cada uno · desde ' + desde; },
      hace: function (d) { return d < 1 ? 'hoy' : d < 31 ? 'hace ' + d + ' días' : d < 365 ? 'hace ' + Math.round(d / 30) + ' meses' : 'hace ' + Math.round(d / 365) + (Math.round(d / 365) === 1 ? ' año' : ' años'); },
      actualizado: 'Actualizado', sinDesc: 'Sin descripción', publico: 'Público', cliente: 'Cliente', producto: 'Producto', interno: 'Servicio interno', visitar: 'Visitar',
      tipos: { proyecto: 'tengo un proyecto nuevo', equipo: 'necesito reforzar mi equipo', operacion: 'necesito operar o rescatar un sistema', vacante: 'tengo una vacante para ti' },
      sinRepos: 'Ningún repositorio coincide.'
    },
    en: {
      copiado: 'Email copied', noCopiado: 'Select and copy: ivanrene10@gmail.com',
      hola: 'Hi Iván', soy: 'I\'m', reposEnVivo: 'Read live from GitHub.', reposCache: 'GitHub didn\'t respond; showing a saved copy.',
      actNota: function (n, desde) { return n + ' public repos · month of each repo\'s latest push · since ' + desde; },
      hace: function (d) { return d < 1 ? 'today' : d < 31 ? d + ' days ago' : d < 365 ? Math.round(d / 30) + ' months ago' : Math.round(d / 365) + (Math.round(d / 365) === 1 ? ' year ago' : ' years ago'); },
      actualizado: 'Updated', sinDesc: 'No description', publico: 'Public', cliente: 'Client', producto: 'Product', interno: 'Internal service', visitar: 'Visit',
      tipos: { proyecto: 'I have a new project', equipo: 'I need extra hands for my team', operacion: 'I need to run or rescue a system', vacante: 'I have a job opening for you' },
      sinRepos: 'No repository matches.'
    }
  };

  /* ------------------------------------------------------------ Datos */
  var COLORES = { TypeScript: '#3178C6', JavaScript: '#F1E05A', Vue: '#41B883', 'C#': '#178600', Dart: '#00B4AB', HTML: '#E34C26', Python: '#3572A5', Java: '#B07219', 'C++': '#F34B7D', R: '#198CE7', AMPL: '#E6EFBB', CSS: '#563D7C' };
  var AREA = { Fintech: '#3E3BD6', KYC: '#7C3AED', IA: '#F59E0B', Pagos: '#16A34A', Bancos: '#0EA5E9', Nube: '#64748B', 'Multi-tenant': '#DB2777', Formularios: '#0891B2', Compliance: '#7C3AED', 'Vue 3': '#41B883', 'LoopBack 4': '#3F5DFF', MongoDB: '#47A248', MinIO: '#C72E49', Terraform: '#7B42BC', AWS: '#FF9900', PWA: '#5A0FC8', Android: '#3DDC84', Agro: '#65A30D', Wompi: '#2E3192', GA4: '#E37400', PayPal: '#003087', Automatización: '#0EA5E9', FastAPI: '#009688', Web: '#3E3BD6', Productividad: '#F59E0B' };
  var AREA_EN = { Pagos: 'Payments', Bancos: 'Banks', Nube: 'Cloud', Formularios: 'Forms', IA: 'AI', Agro: 'Agri', Automatización: 'Automation', Productividad: 'Productivity' };

  var PROYECTOS = [
    { n: 'WyCrédito', url: 'https://wycredito.com', img: 'wycredito-home.webp', t: 'cliente', c: ['Fintech', 'KYC', 'IA'],
      es: 'Crédito empresarial 100 % digital con IA para empresas colombianas.', en: '100% digital business lending with AI for Colombian companies.' },
    { n: 'WyTransfer', url: 'https://wytransfer.com', img: 'wytransfer-home.webp', t: 'cliente', c: ['Pagos', 'Bancos', 'Nube'],
      es: 'Pagos y cobros locales e internacionales en una sola plataforma.', en: 'Local and international payments and collections in one platform.' },
    { n: 'Micro · Freeloz', url: 'https://micro.freeloz.com', img: 'micro-freeloz-home.webp', alta: true, t: 'producto', c: ['Vue 3', 'LoopBack 4', 'MongoDB', 'MinIO', 'Terraform', 'AWS'],
      es: 'Torneos de microfútbol: landing y panel con equipos, fases, partidos, goles y tarjetas.', en: 'Futsal tournaments: landing and admin panel with teams, stages, matches, goals and cards.' },
    { n: 'VinculaForm', url: 'https://vinculaform.com', img: 'vinculaform-home.webp', t: 'cliente', c: ['Formularios', 'Multi-tenant', 'Compliance'],
      es: 'Vinculación digital multipaso para cumplimiento financiero, multi-tenant.', en: 'Multi-step digital onboarding for financial compliance, multi-tenant.' },
    { n: 'PlátanoControl', url: 'https://platanocontrol.com', img: 'platanocontrol-home.webp', t: 'producto', c: ['PWA', 'Android', 'Agro'],
      es: 'Gastos y labores de campo para productores de plátano. PWA y app Android.', en: 'Expenses and field work for plantain growers. PWA and Android app.' },
    { n: 'TeSorteo', url: 'https://tesorteo.com', img: 'tesorteo-home.webp', t: 'producto', c: ['Wompi', 'GA4', 'Multi-tenant'],
      es: 'Rifas en línea con pagos Wompi, analítica GA4 y arquitectura multi-tenant.', en: 'Online raffles with Wompi payments, GA4 analytics and a multi-tenant architecture.' },
    { n: 'CelularesBaratos', url: 'https://celularesbaratos.ivanrene.com', img: 'celularesbaratos-home.webp', t: 'producto', c: ['PayPal', 'Automatización'],
      es: 'Catálogo e-commerce generado desde un PDF mayorista, con carrito, PayPal y actualización diaria.', en: 'E-commerce catalog generated from a wholesale PDF, with cart, PayPal and daily updates.' },
    { n: 'PayPay', url: '', img: 'paypay-home.webp', t: 'interno', c: ['FastAPI', 'Wompi'],
      es: 'Microservicio central de pagos con Wompi que usan varias plataformas. FastAPI y API keys.', en: 'Central Wompi payments microservice used by several platforms. FastAPI and API keys.' },
    { n: 'Freeloz', url: 'https://freeloz.com', img: 'freeloz-home.webp', alta: true, t: 'producto', c: ['Web'],
      es: 'Sitio corporativo y plataforma de servicios de Freeloz.', en: 'Freeloz corporate site and services platform.' },
    { n: 'Timer · Freeloz', url: 'https://timer.freeloz.com', img: 'timer-freeloz.webp', t: 'producto', c: ['Productividad'],
      es: 'App de productividad.', en: 'Productivity app.' }
  ];

  var REPOS_GUARDADOS = [
    { name: 'ivanramirez-git', language: 'HTML', description: 'Perfil y sitio personal ivanrene.com.', pushed_at: '2026-10-22T11:00:00Z', stargazers_count: 3 },
    { name: 'torneo-de-micro-web', language: 'Vue', description: '', pushed_at: '2025-11-25T00:00:00Z', stargazers_count: 0 },
    { name: 'torneo-de-micro-api', language: 'TypeScript', description: 'API RESTful para la gestión de torneos deportivos construida con LoopBack 4.', pushed_at: '2025-11-25T00:00:00Z', stargazers_count: 0 },
    { name: 'mongodb-backup-s3', language: 'JavaScript', description: 'MongoDB backup management with S3-compatible storage and a web interface.', pushed_at: '2025-03-29T00:00:00Z', stargazers_count: 0 },
    { name: 'test-todo-flutter', language: 'Dart', description: '', pushed_at: '2025-02-17T00:00:00Z', stargazers_count: 0 },
    { name: 'template-dot-net-sql-angular', language: 'C#', description: '', pushed_at: '2024-05-20T00:00:00Z', stargazers_count: 0 },
    { name: 'flutter_base', language: null, description: 'Una base para proyectos con una arquitectura limpia escalable', pushed_at: '2023-08-31T00:00:00Z', stargazers_count: 0 },
    { name: 'Talleres_Para_Mis_Fans', language: 'Python', description: '', pushed_at: '2023-01-31T00:00:00Z', stargazers_count: 3 }
  ];

  var CARRERA = [
    { y: 2025, tipo: 'feat', es: 'Full Stack + SRE en Wait N\' Rest', en: 'Full Stack + SRE at Wait N\' Rest',
      mes: { es: 'abr 2025 – hoy · Miami, FL (remoto)', en: 'Apr 2025 – now · Miami, FL (remote)' },
      b: { es: ['Operación 24/7 del sistema de un hotel inteligente.', 'Monitoreo, incidentes en producción y rendimiento.', 'Pipelines de CI/CD para desplegar sin romper.'],
           en: ['24/7 operation of a smart hotel\'s system.', 'Monitoring, production incidents and performance.', 'CI/CD pipelines to ship without breaking things.'] },
      tags: [['SRE', ''], ['CI/CD', ''], ['24/7', 'verde']] },
    { y: 2025, tipo: 'chore', es: 'Matrícula COPNIA vigente', en: 'COPNIA professional license',
      mes: { es: '14 oct 2025', en: 'Oct 14, 2025' },
      b: { es: ['Matrícula profesional 091122-0797186 CNDC, Ingeniería de Sistemas.'], en: ['Professional license 091122-0797186 CNDC, Systems Engineering.'] },
      tags: [['credencial', 'verde']] },
    { y: 2024, tipo: 'feat', es: 'Full Stack & DevOps en CCSolutions', en: 'Full Stack & DevOps at CCSolutions',
      mes: { es: 'sep 2024 – jul 2025 · Bogotá (remoto)', en: 'Sep 2024 – Jul 2025 · Bogotá (remote)' },
      b: { es: ['Astro, Vue y Flutter; CI/CD con GitLab hacia .NET en Azure.', 'Infraestructura multi-nube: EC2 en AWS, VPS, DNS en Cloudflare y Route 53.', 'Contenedores con CapRover y GitLab CE autogestionado.'],
           en: ['Astro, Vue and Flutter; GitLab CI/CD to .NET on Azure.', 'Multi-cloud infrastructure: AWS EC2, VPS, DNS on Cloudflare and Route 53.', 'Containers with CapRover and self-hosted GitLab CE.'] },
      tags: [['devops', ''], ['multi-nube', '']] },
    { y: 2024, tipo: 'release', es: 'Ingeniero de Sistemas · Javeriana', en: 'Systems Engineer · Javeriana',
      mes: { es: '5 sep 2024', en: 'Sep 5, 2024' },
      b: { es: ['Grado en la Pontificia Universidad Javeriana, Bogotá.'], en: ['Graduated from Pontificia Universidad Javeriana, Bogotá.'] },
      tags: [['educación', 'verde']] },
    { y: 2024, tipo: 'feat', es: 'Apps web con IA en TechD', en: 'AI web apps at TechD',
      mes: { es: 'ene – sep 2024 · Miami, FL (remoto)', en: 'Jan – Sep 2024 · Miami, FL (remote)' },
      b: { es: ['Apps en Next.js que procesan audio, PDF, imágenes y texto.', 'NeuralSeek con OpenAI, Anthropic y Amazon Bedrock; Elasticsearch para búsqueda.'],
           en: ['Next.js apps that process audio, PDFs, images and text.', 'NeuralSeek with OpenAI, Anthropic and Amazon Bedrock; Elasticsearch for search.'] },
      tags: [['ia', 'ambar']] },
    { y: 2023, tipo: 'feat', es: 'Full Stack en Double V Partners', en: 'Full Stack at Double V Partners',
      mes: { es: 'mar 2023 – sep 2024 · Bogotá (remoto)', en: 'Mar 2023 – Sep 2024 · Bogotá (remote)' },
      b: { es: ['Angular con Clean Architecture y Redux; Flutter con Bloc y GetX.', 'CQRS en .NET y APIs REST y GraphQL con NestJS y Hasura.', 'Ambientes en AWS con Docker; publicación en Google Play y App Store.'],
           en: ['Angular with Clean Architecture and Redux; Flutter with Bloc and GetX.', 'CQRS in .NET and REST/GraphQL APIs with NestJS and Hasura.', 'AWS environments with Docker; Google Play and App Store releases.'] },
      tags: [['web', ''], ['móvil', '']] },
    { y: 2022, tipo: 'feat', es: 'Full Stack en EY', en: 'Full Stack at EY',
      mes: { es: 'nov 2022 – mar 2023 · Bogotá (híbrido)', en: 'Nov 2022 – Mar 2023 · Bogotá (hybrid)' },
      b: { es: ['Migración de bases de datos, informes y backend.', 'Pipelines en Azure DevOps con SQL, Python y Azure.'], en: ['Database migration, reporting and backend.', 'Azure DevOps pipelines with SQL, Python and Azure.'] },
      tags: [['datos', '']] },
    { y: 2020, tipo: 'init', es: 'Primeros MVPs en Kloustr Labs', en: 'First MVPs at Kloustr Labs',
      mes: { es: 'oct 2020 – mar 2023 · Bogotá', en: 'Oct 2020 – Mar 2023 · Bogotá' },
      b: { es: ['MVPs para startups: pantallas, frontend, backend y soporte.', 'Flutter, Angular, Node.js, MongoDB y GitLab.'], en: ['MVPs for startups: screens, frontend, backend and support.', 'Flutter, Angular, Node.js, MongoDB and GitLab.'] },
      tags: [['startups', 'ambar']] },
    { y: 2017, tipo: 'init', es: 'Ingeniería de Sistemas en la Javeriana', en: 'Systems Engineering at Javeriana',
      mes: { es: '2017 – 2021 · Bogotá', en: '2017 – 2021 · Bogotá' },
      b: { es: ['Énfasis en Desarrollo Avanzado de Software: calidad y AWS.', 'Proyecto de grado: web y app para una fundación con Flutter, LoopBack 4 y AWS.'],
           en: ['Advanced Software Development track: quality and AWS.', 'Capstone: website and app for a nonprofit with Flutter, LoopBack 4 and AWS.'] },
      tags: [['educación', 'verde']] }
  ];

  /* ------------------------------------------------------------ Idioma */
  function aplicarIdioma(l) {
    lang = l;
    root.lang = l;
    $$('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (!(k in ES)) ES[k] = el.innerHTML;
      el.innerHTML = l === 'en' && EN[k] ? EN[k] : ES[k];
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria'), key = 'aria:' + k;
      if (!(key in ES)) ES[key] = el.getAttribute('aria-label');
      el.setAttribute('aria-label', l === 'en' && EN[k] ? EN[k] : ES[key]);
    });
    $$('[data-i18n-alt]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-alt'), key = 'alt:' + k;
      if (!(key in ES)) ES[key] = el.getAttribute('alt');
      el.setAttribute('alt', l === 'en' && EN[k] ? EN[k] : ES[key]);
    });
    $$('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph'), key = 'ph:' + k;
      if (!(key in ES)) ES[key] = el.getAttribute('placeholder');
      el.setAttribute('placeholder', l === 'en' && EN[k] ? EN[k] : ES[key]);
    });
    $$('.seg [data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    store('ir-lang', l);
    pintarProyectos();
    pintarCarrera();
    pintarRepos();
    actualizarVista();
    moverLinea();
    iniciarTerminal();
    if (pausado) setPausa(true);
    if (typeof hora === 'function') hora();
  }

  /* ------------------------------------------------------------ Tema */
  function temaActual() {
    var t = root.getAttribute('data-tema');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
  }
  $('#btn-tema').addEventListener('click', function () {
    var n = temaActual() === 'oscuro' ? 'claro' : 'oscuro';
    root.setAttribute('data-tema', n);
    store('ir-tema', n);
  });

  /* ------------------------------------------------------------ Pausa */
  var pausado = false;
  function setPausa(p) {
    pausado = p;
    document.body.classList.toggle('pausado', p);
    $('#btn-pausa').setAttribute('aria-pressed', String(p));
    var lbl = $('#btn-pausa .lbl-pausa');
    if (lbl) lbl.textContent = p ? (lang === 'en' ? 'Resume animations' : 'Reanudar animaciones') : (lang === 'en' ? 'Pause animations' : 'Pausar animaciones');
    $$('svg').forEach(function (s) { if (s.pauseAnimations) { p ? s.pauseAnimations() : s.unpauseAnimations(); } });
  }
  $('#btn-pausa').addEventListener('click', function () { setPausa(!pausado); });

  /* ------------------------------------------------------------ Pestañas */
  var tabs = $$('[role="tab"]');
  function moverLinea() {
    var sel = $('[role="tab"][aria-selected="true"]'), linea = $('.tabs-linea');
    if (!sel || !linea) return;
    linea.style.width = sel.offsetWidth + 'px';
    linea.style.transform = 'translateX(' + sel.offsetLeft + 'px)';
  }
  function abrir(id, foco) {
    if (!document.getElementById(id)) id = 'resumen';
    tabs.forEach(function (t) {
      var on = t.dataset.tab === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.dataset.tab).hidden = !on;
      if (on && foco) t.focus();
    });
    moverLinea();
    if (id === 'trayectoria') progresoTraza();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      abrir(t.dataset.tab);
      if (history.replaceState) history.replaceState(null, '', '#' + t.dataset.tab);
    });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = tabs[(i + d + tabs.length) % tabs.length];
      abrir(n.dataset.tab, true);
    });
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ir]');
    if (!b) return;
    abrir(b.dataset.ir);
    var tb = $('.tabs');
    window.scrollTo({ top: tb.getBoundingClientRect().top + window.scrollY - 60, behavior: reduce ? 'auto' : 'smooth' });
  });
  window.addEventListener('resize', moverLinea);

  /* ------------------------------------------------------------ Terminal */
  var termRun = 0;
  function guion() {
    var en = lang === 'en';
    var links = ['wycredito', 'wytransfer', 'vinculaform', 'tesorteo', 'platanocontrol', 'micro'].map(function (n) {
      var u = n === 'micro' ? 'https://micro.freeloz.com' : 'https://' + n + '.com';
      return '<a href="' + u + '" target="_blank" rel="noopener">' + n + '</a>';
    }).join('  ');
    return [
      { c: 'whoami', o: ['<span class="h">Iván René Ramírez Castro</span>', '<span class="acc">' + (en ? 'Software Engineer' : 'Ingeniero de Software') + ' · Full Stack · SRE</span>'] },
      { c: en ? 'cat now.txt' : 'cat ahora.txt', o: [
        '<span class="mut">→</span> ' + (en ? 'Full Stack + SRE at Wait N\' Rest: a smart hotel that runs 24/7' : 'Full Stack + SRE en Wait N\' Rest: un hotel inteligente que opera 24/7'),
        '<span class="mut">→</span> ' + (en ? 'Partner at Freeloz: custom software, cloud and AI' : 'Socio en Freeloz: software a medida, nube e IA')] },
      { c: en ? 'ls ~/production' : 'ls ~/producción', o: [links] },
      { c: 'status', o: ['<span class="ok">●</span> ' + (en ? 'available for projects · remote from Tame, Arauca, Colombia' : 'disponible para proyectos · remoto desde Tame, Arauca, Colombia')] },
      { c: (en ? 'contact' : 'contacto') + ' --whatsapp', o: ['<span class="k">wa</span> <a href="' + WA + '" target="_blank" rel="noopener">+57 312 276 0392</a>   <span class="k">email</span> <a href="mailto:ivanrene10@gmail.com">ivanrene10@gmail.com</a>'] }
    ];
  }
  function espera(ms, id) {
    return new Promise(function (res) {
      (function tick() {
        if (id !== termRun) return;
        if (pausado) return setTimeout(tick, 200);
        setTimeout(res, ms);
      })();
    });
  }
  function iniciarTerminal() {
    var body = $('#term-body');
    var id = ++termRun;
    var pasos = guion();
    var prompt = '<span class="p">❯</span> ';
    if (reduce) {
      body.innerHTML = pasos.map(function (p) { return prompt + '<span class="cmd">' + p.c + '</span>\n' + p.o.join('\n'); }).join('\n') + '\n' + prompt + '<span class="cursor"></span>';
      return;
    }
    body.innerHTML = '';
    (async function () {
      for (var i = 0; i < pasos.length; i++) {
        var linea = document.createElement('div');
        linea.innerHTML = prompt + '<span class="cmd"></span><span class="cursor"></span>';
        body.appendChild(linea);
        var cmd = linea.querySelector('.cmd');
        for (var j = 0; j < pasos[i].c.length; j++) {
          await espera(26 + Math.random() * 22, id);
          if (id !== termRun) return;
          cmd.textContent += pasos[i].c[j];
        }
        await espera(160, id);
        if (id !== termRun) return;
        linea.querySelector('.cursor').remove();
        for (var k = 0; k < pasos[i].o.length; k++) {
          var out = document.createElement('div');
          out.innerHTML = pasos[i].o[k];
          body.appendChild(out);
          await espera(70, id);
          if (id !== termRun) return;
        }
        await espera(180, id);
      }
      var fin = document.createElement('div');
      fin.innerHTML = prompt + '<span class="cursor"></span>';
      body.appendChild(fin);
    })();
  }
  $('#term-replay').addEventListener('click', iniciarTerminal);

  /* ------------------------------------------------------------ Barras de operación (decorativas) */
  (function () {
    var b = $('#barras'), html = '';
    for (var i = 0; i < 40; i++) html += '<i class="' + (i === 13 || i === 31 ? 'suave' : '') + '" style="animation-delay:' + (i * 18) + 'ms"></i>';
    b.innerHTML = html;
  })();

  /* ------------------------------------------------------------ Proyectos */
  function etiqueta(t) { return T[lang][t === 'cliente' ? 'cliente' : t === 'interno' ? 'interno' : 'producto']; }
  function chipsHTML(c) {
    return c.map(function (a) { return '<span class="chip" style="--c:' + (AREA[a] || 'var(--accent)') + '"><i></i>' + esc(lang === 'en' && AREA_EN[a] ? AREA_EN[a] : a) + '</span>'; }).join('');
  }
  function pinHTML(p) {
    var host = p.url ? p.url.replace('https://', '') : (lang === 'en' ? 'internal' : 'interno');
    var nombre = p.url ? '<a href="' + p.url + '" target="_blank" rel="noopener">' + esc(p.n) + '</a>' : '<span class="nombre">' + esc(p.n) + '</span>';
    return '<article class="pin">' +
      '<div class="pin-shot"><div class="barra-nav"><i></i><i></i><i></i><span>' + esc(host) + '</span></div>' +
      '<img class="' + (p.alta ? 'alta' : '') + '" src="/shared/proyectos/' + p.img + '" alt="' + esc((lang === 'en' ? 'Screenshot of ' : 'Captura de ') + p.n) + '" loading="lazy" width="800" height="450"></div>' +
      '<div class="pin-body"><div class="pin-tit"><svg><use href="#i-repo"/></svg>' + nombre + '<span class="etq">' + etiqueta(p.t) + '</span></div>' +
      '<p>' + esc(p[lang]) + '</p><div class="chips">' + chipsHTML(p.c) + '</div></div></article>';
  }
  function pintarProyectos() {
    $('#pins').innerHTML = PROYECTOS.map(pinHTML).join('');
    $('#pins-mini').innerHTML = PROYECTOS.slice(0, 3).map(pinHTML).join('');
    $('#cnt-proy').textContent = PROYECTOS.length;
  }

  /* ------------------------------------------------------------ Repos en vivo */
  var repos = null, reposFuente = 'vivo';
  function cargarRepos() {
    var ctrl = window.AbortController ? new AbortController() : null;
    var to = setTimeout(function () { if (ctrl) ctrl.abort(); }, 6000);
    fetch('https://api.github.com/users/ivanramirez-git/repos?per_page=100&sort=pushed', ctrl ? { signal: ctrl.signal } : {})
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { repos = d.filter(function (r) { return !r.fork; }); reposFuente = 'vivo'; })
      .catch(function () { repos = REPOS_GUARDADOS; reposFuente = 'cache'; })
      .then(function () { clearTimeout(to); llenarLenguajes(); pintarRepos(); pintarActividad(); });
  }
  function llenarLenguajes() {
    var sel = $('#lenguaje'), vals = {};
    repos.forEach(function (r) { if (r.language) vals[r.language] = 1; });
    $$('option:not([value=""])', sel).forEach(function (o) { o.remove(); });
    Object.keys(vals).sort().forEach(function (l) { var o = document.createElement('option'); o.value = l; o.textContent = l; sel.appendChild(o); });
  }
  function pintarRepos() {
    var ul = $('#repos');
    if (!repos) { ul.innerHTML = ''; return; }
    $('#repos-fuente').textContent = reposFuente === 'vivo' ? T[lang].reposEnVivo : T[lang].reposCache;
    var q = ($('#buscar').value || '').toLowerCase(), l = $('#lenguaje').value, ahora = Date.now();
    var lista = repos.filter(function (r) {
      return (!q || (r.name + ' ' + (r.description || '')).toLowerCase().indexOf(q) >= 0) && (!l || r.language === l);
    });
    if (!lista.length) { ul.innerHTML = '<li class="repo"><p>' + T[lang].sinRepos + '</p></li>'; return; }
    ul.innerHTML = lista.map(function (r, i) {
      var dias = Math.floor((ahora - new Date(r.pushed_at).getTime()) / 864e5);
      return '<li class="repo" style="animation-delay:' + Math.min(i * 30, 400) + 'ms"><div class="repo-tit"><a href="https://github.com/ivanramirez-git/' + encodeURIComponent(r.name) + '" target="_blank" rel="noopener">' + esc(r.name) + '</a><span class="etq">' + T[lang].publico + '</span></div>' +
        '<p>' + esc(r.description || T[lang].sinDesc) + '</p><div class="repo-meta">' +
        (r.language ? '<span class="chip" style="--c:' + (COLORES[r.language] || '#8B949E') + '"><i></i>' + esc(r.language) + '</span>' : '') +
        (r.stargazers_count ? '<span><svg><use href="#i-star"/></svg> ' + r.stargazers_count + '</span>' : '') +
        '<span>' + T[lang].actualizado + ' ' + T[lang].hace(dias) + '</span></div></li>';
    }).join('');
  }
  $('#buscar').addEventListener('input', pintarRepos);
  $('#lenguaje').addEventListener('change', pintarRepos);

  function pintarActividad() {
    if (!repos || !repos.length || reposFuente !== 'vivo') return;
    var porMes = {}, min = null;
    repos.forEach(function (r) {
      var d = new Date(r.pushed_at), k = d.getUTCFullYear() * 12 + d.getUTCMonth();
      porMes[k] = (porMes[k] || 0) + 1;
      if (min === null || k < min) min = k;
    });
    var hoy = new Date(), max = hoy.getUTCFullYear() * 12 + hoy.getUTCMonth();
    var n = max - min + 1, w = 600 / n, top = Math.max.apply(null, Object.keys(porMes).map(function (k) { return porMes[k]; }));
    var svg = '<line class="act-base" x1="0" y1="69" x2="600" y2="69"/>';
    for (var i = 0; i < n; i++) {
      var c = porMes[min + i] || 0;
      if (!c) continue;
      var h = 8 + (c / top) * 56;
      svg += '<rect class="act-barra" x="' + (i * w + w * .15).toFixed(1) + '" y="' + (69 - h).toFixed(1) + '" width="' + Math.max(w * .7, 2).toFixed(1) + '" height="' + h.toFixed(1) + '" rx="1.5"><title>' + c + '</title></rect>';
    }
    $('#act-svg').innerHTML = svg;
    $('#act-nota').textContent = T[lang].actNota(repos.length, Math.floor(min / 12));
    $('#actividad').hidden = false;
  }

  /* ------------------------------------------------------------ Trayectoria */
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return ('0000000' + (h >>> 0).toString(16)).slice(-7); }
  function pintarCarrera() {
    var html = '<span class="traza" aria-hidden="true"></span>', anio = null;
    CARRERA.forEach(function (c) {
      if (c.y !== anio) {
        anio = c.y;
        html += '<li class="grupo-h"><svg><use href="#i-commit"/></svg>' + (lang === 'en' ? 'Commits in ' : 'Commits de ') + c.y + '</li>';
      }
      html += '<li class="commit"><p class="commit-msg"><span class="tipo">' + c.tipo + ':</span> ' + esc(c[lang]) + '</p><span class="hash">' + hash(c.es) + '</span>' +
        '<span class="commit-meta">' + esc(c.mes[lang]) + '</span>' +
        '<ul>' + c.b[lang].map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<div class="tags">' + c.tags.map(function (t) { return '<span class="tag ' + t[1] + '">' + esc(t[0]) + '</span>'; }).join('') + '</div></li>';
    });
    $('#commits').innerHTML = html;
    progresoTraza();
  }
  function progresoTraza() {
    var ol = $('#commits'), tr = ol && $('.traza', ol);
    if (!tr || ol.offsetParent === null) return;
    if (reduce) { tr.style.setProperty('--p', 1); return; }
    var r = ol.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh * .85 - r.top) / r.height));
    tr.style.setProperty('--p', p.toFixed(3));
  }
  window.addEventListener('scroll', progresoTraza, { passive: true });

  /* ------------------------------------------------------------ Contacto */
  function mensaje() {
    var t = T[lang], tipo = ($('input[name="tipo"]:checked') || {}).value || 'proyecto';
    var nom = ($('#rd-nombre').value || '').trim(), msg = ($('#rd-msg').value || '').trim();
    return t.hola + ', ' + (nom ? t.soy + ' ' + nom + '. ' : '') + t.tipos[tipo].charAt(0).toUpperCase() + t.tipos[tipo].slice(1) + '.' + (msg ? ' ' + msg : '');
  }
  function actualizarVista() { $('#rd-vista').textContent = mensaje(); }
  $('#redactor').addEventListener('input', actualizarVista);
  $('#redactor').addEventListener('change', actualizarVista);
  $('#redactor').addEventListener('submit', function (e) {
    e.preventDefault();
    window.open(WA + '?text=' + encodeURIComponent(mensaje()), '_blank', 'noopener');
  });

  var toastT;
  function toast(m) {
    var el = $('#toast'); el.textContent = m; el.classList.add('ver');
    clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('ver'); }, 2200);
  }
  $('#copiar-correo').addEventListener('click', function () {
    var ok = function () { toast(T[lang].copiado); }, ko = function () { toast(T[lang].noCopiado); };
    if (navigator.clipboard) navigator.clipboard.writeText('ivanrene10@gmail.com').then(ok, ko); else ko();
  });

  /* ------------------------------------------------------------ Hora en Tame */
  function hora() {
    try {
      $('#hora-tame').textContent = new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-CO', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' }).format(new Date());
    } catch (e) { $('#hora-tame').textContent = ''; }
  }
  hora(); setInterval(hora, 30000);
  $('#anio').textContent = new Date().getFullYear();

  /* ------------------------------------------------------------ Inclinación y brillo con el puntero */
  var fino = window.matchMedia('(pointer: fine)').matches;
  if (fino && !reduce) {
    var glow = $('.glow');
    window.addEventListener('pointermove', function (e) {
      document.body.classList.add('con-mouse');
      glow.style.transform = 'translate(' + (e.clientX - 260) + 'px,' + (e.clientY - 260) + 'px)';
    }, { passive: true });
    $$('.tilt').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        c.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        if (!pausado) c.style.transform = 'perspective(900px) rotateX(' + ((.5 - y) * 4).toFixed(2) + 'deg) rotateY(' + ((x - .5) * 4).toFixed(2) + 'deg)';
      });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    });
  }

  /* ------------------------------------------------------------ Arranque */
  $$('.seg [data-lang]').forEach(function (b) { b.addEventListener('click', function () { aplicarIdioma(b.dataset.lang); }); });
  var qLang = new URLSearchParams(location.search).get('lang');
  var inicial = qLang === 'en' || qLang === 'es' ? qLang : (store('ir-lang') || ((navigator.language || 'es').slice(0, 2) === 'en' ? 'en' : 'es'));
  aplicarIdioma(inicial);
  abrir((location.hash || '#resumen').slice(1));
  cargarRepos();
  if (reduce) setPausa(true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moverLinea);
})();
