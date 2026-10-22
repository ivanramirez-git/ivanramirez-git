/* ivanrene.com: el HTML llega completo desde el servidor; este script solo añade
   tema, pausa de animaciones, la terminal que se escribe, hora de Tame, contacto y efectos. */
(function () {
  'use strict';

  var root = document.documentElement;
  var lang = root.lang === 'en' ? 'en' : 'es';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WA = 'https://wa.me/573122760392';

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  var T = {
    es: { copiado: 'Correo copiado', noCopiado: 'Selecciona y copia: ivanrene10@gmail.com', hola: 'Hola Iván', soy: 'soy', reanudar: 'Reanudar animaciones', pausar: 'Pausar animaciones',
      tipos: { proyecto: 'tengo un proyecto nuevo', equipo: 'necesito reforzar mi equipo', operacion: 'necesito operar o rescatar un sistema', vacante: 'tengo una vacante para ti' } },
    en: { copiado: 'Email copied', noCopiado: 'Select and copy: ivanrene10@gmail.com', hola: 'Hi Iván', soy: "I'm", reanudar: 'Resume animations', pausar: 'Pause animations',
      tipos: { proyecto: 'I have a new project', equipo: 'I need extra hands for my team', operacion: 'I need to run or rescue a system', vacante: 'I have a job opening for you' } }
  }[lang];

  /* Tema */
  var btnTema = $('#btn-tema');
  if (btnTema) btnTema.addEventListener('click', function () {
    var actual = root.getAttribute('data-tema') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro');
    var n = actual === 'oscuro' ? 'claro' : 'oscuro';
    root.setAttribute('data-tema', n);
    store('ir-tema', n);
  });

  /* Pausa */
  var pausado = false, btnPausa = $('#btn-pausa');
  function setPausa(p) {
    pausado = p;
    document.body.classList.toggle('pausado', p);
    if (!btnPausa) return;
    btnPausa.setAttribute('aria-pressed', String(p));
    btnPausa.setAttribute('aria-label', p ? T.reanudar : T.pausar);
    var lbl = $('.lbl-pausa', btnPausa); if (lbl) lbl.textContent = p ? T.reanudar : T.pausar;
    $$('svg').forEach(function (s) { if (s.pauseAnimations) { p ? s.pauseAnimations() : s.unpauseAnimations(); } });
  }
  if (btnPausa) btnPausa.addEventListener('click', function () { setPausa(!pausado); });

  /* Terminal: el contenido ya está en el HTML; se vuelve a escribir línea a línea */
  var body = $('#term-body'), termRun = 0;
  function espera(ms, id) {
    return new Promise(function (res) {
      (function tick() { if (id !== termRun) return; if (pausado) return setTimeout(tick, 200); setTimeout(res, ms); })();
    });
  }
  function escribir() {
    if (!body) return;
    var id = ++termRun, lineas = $$(':scope > div', body);
    lineas.forEach(function (l) { l.hidden = true; });
    (async function () {
      for (var i = 0; i < lineas.length; i++) {
        var l = lineas[i], cmd = $('.cmd', l);
        l.hidden = false;
        if (cmd) {
          var txt = cmd.textContent; cmd.textContent = '';
          for (var j = 0; j < txt.length; j++) { await espera(24 + Math.random() * 20, id); if (id !== termRun) return; cmd.textContent += txt[j]; }
          await espera(150, id);
        } else { await espera(70, id); }
        if (id !== termRun) return;
      }
    })();
  }
  var replay = $('#term-replay');
  if (body && !reduce) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); escribir(); } });
      io.observe(body);
    }
  }
  if (replay) replay.addEventListener('click', function () { if (!reduce) escribir(); });

  /* Hora en Tame */
  var hora = $('#hora-tame');
  function tick() { try { hora.textContent = new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-CO', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' }).format(new Date()); } catch (e) {} }
  if (hora) { tick(); setInterval(tick, 30000); }

  /* Trayectoria: la línea avanza con el scroll */
  var ol = $('#commits'), traza = ol && $('.traza', ol), pend = false;
  function progreso() {
    pend = false;
    if (reduce) { traza.style.setProperty('--p', 1); return; }
    var r = ol.getBoundingClientRect(), vh = window.innerHeight;
    traza.style.setProperty('--p', Math.min(1, Math.max(0, (vh * .85 - r.top) / r.height)).toFixed(3));
  }
  if (traza) { progreso(); window.addEventListener('scroll', function () { if (!pend) { pend = true; requestAnimationFrame(progreso); } }, { passive: true }); }

  /* Contacto: redactor de WhatsApp y copiar correo */
  var form = $('#redactor');
  function mensaje() {
    var tipo = ($('input[name="tipo"]:checked') || {}).value || 'proyecto';
    var nom = ($('#rd-nombre').value || '').trim(), msg = ($('#rd-msg').value || '').trim(), t = T.tipos[tipo];
    return T.hola + ', ' + (nom ? T.soy + ' ' + nom + '. ' : '') + t.charAt(0).toUpperCase() + t.slice(1) + '.' + (msg ? ' ' + msg : '');
  }
  if (form) {
    var vista = $('#rd-vista'), upd = function () { vista.textContent = mensaje(); };
    form.addEventListener('input', upd); form.addEventListener('change', upd);
    form.addEventListener('submit', function (e) { e.preventDefault(); window.open(WA + '?text=' + encodeURIComponent(mensaje()), '_blank', 'noopener'); });
  }
  var toastT;
  function toast(m) { var el = $('#toast'); el.textContent = m; el.classList.add('ver'); clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('ver'); }, 2200); }
  var copiar = $('#copiar-correo');
  if (copiar) copiar.addEventListener('click', function () {
    if (navigator.clipboard) navigator.clipboard.writeText('ivanrene10@gmail.com').then(function () { toast(T.copiado); }, function () { toast(T.noCopiado); });
    else toast(T.noCopiado);
  });

  /* Inclinación y brillo con el puntero (solo mouse, sin movimiento reducido) */
  if (window.matchMedia('(pointer: fine)').matches && !reduce) {
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

  /* Tarjetas: animar solo las visibles */
  if ('IntersectionObserver' in window) {
    var vis = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('en-vista', e.isIntersecting); }); }, { rootMargin: '80px' });
    $$('.card').forEach(function (c) { vis.observe(c); });
  } else { $$('.card').forEach(function (c) { c.classList.add('en-vista'); }); }

  if (reduce) setPausa(true);
})();
