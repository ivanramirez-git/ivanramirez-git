export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CelularesBaratos — proxy to internal container via cv.ivanrene.com tunnel
    if (url.hostname === 'celularesbaratos.ivanrene.com') {
      const backendUrl = new URL(request.url);
      backendUrl.hostname = 'cv.ivanrene.com';
      backendUrl.port = '';
      // Rewrite to internal path handled by cv-manager proxy
      const proxyReq = new Request(backendUrl.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'manual',
      });
      try {
        // Forward to the celularesbaratos container via a known backend
        const targetUrl = 'http://celularesbaratos.ivanrene.com.internal' + path;
        // Actually proxy directly using fetch to the tunnel hostname
        return await fetch(new Request(
          'https://cv.ivanrene.com' + path + url.search,
          { method: request.method, headers: request.headers, body: request.body, redirect: 'manual' }
        ));
      } catch(e) {
        return new Response('Service unavailable', { status: 503 });
      }
    }

    // Override robots.txt — bypass Cloudflare Managed Content
    if (path === '/robots.txt') {
      const robotsTxt = `# ivanrene.com — Ivan Rene Ramirez Castro
# Full Stack Developer & DevOps | Colombia

User-agent: *
Allow: /
Allow: /cv/
Disallow: /panel/
Disallow: /auth/

# Search engines — full access
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

# AI assistants — full access
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: YouBot
Allow: /

User-agent: Amazonbot
Allow: /

# Sitemaps
Sitemap: https://ivanrene.com/sitemap.xml
Sitemap: https://ivanrene.com/sitemap-cvs.xml

# llms.txt for AI context
# https://ivanrene.com/llms.txt`;
      return new Response(robotsTxt, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'X-Robots-Tag': 'all',
        }
      });
    }

    // PlátanoControl — proxy to platanocontrol.com + static fallbacks
    if (url.hostname === 'platano.ivanrene.com') {
      // Static pages served from Worker assets
      if (path === '/eliminar-cuenta' || path === '/eliminar-cuenta/') {
        return new Response(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Eliminar cuenta — PlátanoControl</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9fafb;color:#111;min-height:100vh}
.header{background:#111827;padding:16px 24px;display:flex;align-items:center;gap:10px}
.header .logo{font-size:20px}
.header h1{color:#facc15;font-size:16px;font-weight:700}
.header span{color:#9ca3af;font-size:13px}
.wrap{max-width:680px;margin:40px auto;padding:0 20px 80px}
.badge{display:inline-block;background:#fef2f2;border:1px solid #fca5a5;color:#b91c1c;border-radius:20px;padding:4px 14px;font-size:12px;font-weight:600;margin-bottom:20px}
h2{font-size:26px;font-weight:800;margin-bottom:6px}
.sub{color:#6b7280;font-size:14px;margin-bottom:32px}
.section-title{font-size:14px;font-weight:700;margin:28px 0 10px;border-left:4px solid #e53935;padding-left:12px;color:#111}
table{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.06)}
th{background:#f3f4f6;text-align:left;padding:10px 14px;color:#374151;font-weight:600}
td{padding:10px 14px;border-top:1px solid #f0f0f0;color:#374151}
ol{padding-left:20px;color:#374151;font-size:14px;line-height:2}
p{color:#374151;font-size:14px;line-height:1.7;margin-bottom:12px}
.form-box{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:28px;margin-top:28px;box-shadow:0 1px 4px rgba(0,0,0,.06)}
label{display:block;font-weight:600;font-size:13px;margin-bottom:4px;color:#374151}
input,select,textarea{width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 14px;font-size:14px;margin-bottom:16px;font-family:inherit;outline:none;transition:border-color .15s}
input:focus,select:focus,textarea:focus{border-color:#111827}
textarea{resize:vertical;min-height:90px}
.btn{background:#e53935;color:#fff;border:none;border-radius:8px;padding:12px 28px;font-size:15px;font-weight:700;cursor:pointer;width:100%}
.btn:hover{background:#c62828}
.alert-ok{background:#f0fdf4;border:1px solid #86efac;color:#166534;border-radius:10px;padding:16px 20px;margin-bottom:20px;font-size:14px}
.alert-err{background:#fef2f2;border:1px solid #fca5a5;color:#b91c1c;border-radius:10px;padding:16px 20px;margin-bottom:20px;font-size:14px}
.footer{margin-top:40px;color:#9ca3af;font-size:12px;text-align:center}
.footer a{color:#6b7280}
@media(max-width:600px){.wrap{padding:0 16px 60px}.header h1{font-size:14px}}
</style>
</head>
<body>

<div class="header">
  <span class="logo">🌿</span>
  <div>
    <h1>PlátanoControl</h1>
    <span>Solicitud de eliminación de cuenta</span>
  </div>
</div>

<div class="wrap">
  <div id="alert-ok" class="alert-ok" style="display:none">
    ✅ <strong>Solicitud recibida.</strong> Procesaremos tu solicitud en un plazo de <strong>7 días hábiles</strong>. Recibirás confirmación al correo indicado.
  </div>
  <div id="alert-err" class="alert-err" style="display:none"></div>

  <span class="badge">🌿 PlátanoControl — Freeloz SAS</span>
  <h2>Eliminar mi cuenta</h2>
  <p class="sub">Última actualización: 8 de marzo de 2026</p>

  <div class="section-title">¿Qué datos se borran?</div>
  <table>
    <thead><tr><th>Dato</th><th>Acción</th><th>Plazo</th></tr></thead>
    <tbody>
      <tr><td>Correo electrónico</td><td>🗑️ Eliminado</td><td>7 días hábiles</td></tr>
      <tr><td>Nombre de usuario</td><td>🗑️ Eliminado</td><td>7 días hábiles</td></tr>
      <tr><td>Contraseña (hash)</td><td>🗑️ Eliminado</td><td>7 días hábiles</td></tr>
      <tr><td>Evidencias fotográficas</td><td>🗑️ Eliminadas</td><td>7 días hábiles</td></tr>
      <tr><td>Registros de gastos</td><td>⚠️ Anonimizados</td><td>30 días</td></tr>
      <tr><td>Logs de seguridad</td><td>🔒 Conservados (legal)</td><td>90 días</td></tr>
    </tbody>
  </table>

  <div class="section-title">Pasos</div>
  <ol>
    <li>Completa el formulario con el correo de tu cuenta.</li>
    <li>Selecciona qué deseas eliminar.</li>
    <li>Envía la solicitud — te llegará confirmación por correo.</li>
    <li>Nuestro equipo procesará la solicitud en 7 días hábiles.</li>
  </ol>
  <p style="margin-top:12px">También puedes escribirnos a <a href="mailto:soporte@freeloz.com">soporte@freeloz.com</a> con el asunto <em>"Eliminación de cuenta PlátanoControl"</em>.</p>

  <div class="form-box">
    <div class="section-title" style="margin-top:0;margin-bottom:20px">Formulario de solicitud</div>
    <form id="del-form">
      <label>Correo de tu cuenta *</label>
      <input type="email" id="email" required placeholder="tu@correo.com"/>

      <label>¿Qué deseas eliminar? *</label>
      <select id="tipo" required>
        <option value="">— Selecciona —</option>
        <option value="Cuenta completa y todos los datos">Cuenta completa y todos mis datos</option>
        <option value="Solo datos personales (conservar cuenta)">Solo mis datos personales</option>
        <option value="Solo evidencias fotográficas">Solo mis evidencias fotográficas</option>
      </select>

      <label>Motivo (opcional)</label>
      <textarea id="motivo" placeholder="Cuéntanos el motivo..."></textarea>

      <button type="submit" class="btn" id="submit-btn">Enviar solicitud</button>
    </form>
  </div>

  <div class="footer">
    PlátanoControl · <strong>Freeloz SAS</strong> · Colombia<br>
    <a href="mailto:soporte@freeloz.com">soporte@freeloz.com</a> · <a href="/privacidad">Política de privacidad</a>
  </div>
</div>

<script>
document.getElementById('del-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  document.getElementById('alert-ok').style.display = 'none';
  document.getElementById('alert-err').style.display = 'none';

  const email = document.getElementById('email').value;
  const tipo = document.getElementById('tipo').value;
  const motivo = document.getElementById('motivo').value || 'No especificado';

  try {
    const fd = new FormData();
    fd.append('email', email);
    fd.append('tipo', tipo === 'Cuenta completa y todos los datos' ? 'cuenta_y_datos' : tipo === 'Solo datos personales (conservar cuenta)' ? 'solo_datos' : 'evidencias');
    fd.append('motivo', motivo);

    const r = await fetch('/eliminar-cuenta', { method: 'POST', body: fd });
    if (r.ok) {
      document.getElementById('alert-ok').style.display = 'block';
      this.reset();
    } else {
      throw new Error('Error ' + r.status);
    }
  } catch(err) {
    document.getElementById('alert-err').textContent = '⚠️ Error al enviar. Escríbenos a soporte@freeloz.com';
    document.getElementById('alert-err').style.display = 'block';
  }
  btn.textContent = 'Enviar solicitud';
  btn.disabled = false;
});
</script>
</body>
</html>
`, {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' }
        });
      }
      if (path === '/privacidad' || path === '/privacidad/') {
        const assetReq = new Request(new URL('/platano/privacidad.html', url.origin), request);
        const assetRes = await env.ASSETS.fetch(assetReq);
        if (assetRes.status === 200) return assetRes;
      }
      // Landing: serve static HTML from assets
      if (path === '/' || path === '') {
        const r = new Request(new URL('/platano/landing.html', url.origin), request);
        return env.ASSETS.fetch(r);
      }
      // All other paths: try as asset first, then proxy
      const assetReq = new Request(new URL('/platano' + path, url.origin), request);
      const ar = await env.ASSETS.fetch(assetReq);
      if (ar.status === 200) return ar;
      // Proxy to platanocontrol.com as last resort
      const tgt = new URL(request.url);
      tgt.hostname = 'platanocontrol.com';
      const h2 = new Headers(request.headers);
      h2.set('host', 'platanocontrol.com');
      const pr = await fetch(tgt.toString(), { method: request.method, headers: h2 });
      return new Response(pr.body, { status: pr.status, headers: pr.headers });
    }

    // BTG Fund Manager demo at prueba-ceiba.ivanrene.com or /btg/
    if (url.hostname === 'prueba-ceiba.ivanrene.com' || path.startsWith('/btg/')) {
      let assetPath = path.startsWith('/btg/') ? path.replace('/btg', '') : path;
      if (assetPath === '/' || assetPath === '') assetPath = '/index.html';
      const assetUrl = new URL('/btg-app' + assetPath, url.origin);
      const assetReq = new Request(assetUrl.toString(), request);
      const res = await env.ASSETS.fetch(assetReq);
      if (res.status === 200) return res;
      // SPA fallback
      return env.ASSETS.fetch(new Request(new URL('/btg-app/index.html', url.origin), request));
    }

    // Routes that should be proxied to Flask backend (CV Manager)
    const flaskPrefixes = ['/cv/', '/panel/', '/auth/', '/api/', '/static/'];
    const flaskExact = ['/sitemap.xml', '/robots.txt', '/llms.txt', '/cv', '/panel', '/auth'];
    const isFlaskRoute = flaskPrefixes.some(p => path.startsWith(p)) || flaskExact.includes(path);

    if (isFlaskRoute) {
      // Proxy to Flask backend via cv.ivanrene.com tunnel
      const backendUrl = new URL(request.url);
      backendUrl.hostname = 'cv.ivanrene.com';
      const backendRequest = new Request(backendUrl.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'manual',
      });
      const response = await fetch(backendRequest);
      // Rewrite Location headers to use ivanrene.com
      const newHeaders = new Headers(response.headers);
      const location = newHeaders.get('Location');
      if (location) {
        newHeaders.set('Location', location.replace('cv.ivanrene.com', 'ivanrene.com'));
      }
      // Prevent CF from caching Flask responses
      newHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    }

    // Serve static portfolio assets
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 && (response.status < 300 || response.status >= 400)) {
      return response;
    }

    // SPA fallback
    const indexRequest = new Request(
      new URL('/index.html', url.origin),
      request
    );
    return env.ASSETS.fetch(indexRequest);
  }
};
