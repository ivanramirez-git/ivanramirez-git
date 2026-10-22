export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Propuestas de rediseño: propuestas.ivanrene.com (índice) y propuesta-<slug>.ivanrene.com
    const propuesta = url.hostname.match(/^propuesta-([a-z0-9-]+)\.ivanrene\.com$/);
    if (url.hostname === 'propuestas.ivanrene.com' || propuesta) {
      const base = propuesta ? `/propuestas/${propuesta[1]}` : '/propuestas';
      // /shared/ es común a todas; html_handling sirve el index desde la ruta de directorio
      const assetPath = (path.startsWith('/shared/') ? '/propuestas' + path : base + path).replace(/\/index\.html$/, '/');
      let res = await env.ASSETS.fetch(new Request(new URL(assetPath, url.origin), request));
      if (res.status >= 300 && res.status < 400 && res.headers.get('Location')) {
        res = await env.ASSETS.fetch(new Request(new URL(res.headers.get('Location'), url.origin), request));
      }
      if (res.status === 404) {
        res = await env.ASSETS.fetch(new Request(new URL(base + '/', url.origin), request));
      }
      const headers = new Headers(res.headers);
      headers.set('X-Robots-Tag', 'noindex');
      return new Response(res.body, { status: res.status, headers });
    }

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

    // PlátanoControl — serve landing from assets, redirect special pages
    if (url.hostname === 'platano.ivanrene.com') {
      // Special pages: redirect to platanocontrol.com (same content, working tunnel)
      if (path === '/eliminar-cuenta' || path === '/eliminar-cuenta/') {
        return Response.redirect('https://platanocontrol.com/eliminar-cuenta', 302);
      }
      if (path === '/privacidad' || path === '/privacidad/') {
        return Response.redirect('https://platanocontrol.com/privacidad', 302);
      }
      // Landing page: serve from Worker assets
      const landingReq = new Request(new URL('/platano/landing.html', url.origin), request);
      return env.ASSETS.fetch(landingReq);
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
    // sitemap-cvs.xml ya no se expone: la lista de CV por empresa no debe ser pública ni indexable
    const flaskExact = ['/cv', '/panel', '/auth'];
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
      // Los CV personalizados se comparten por enlace, pero no se indexan
      if (path === '/cv' || path.startsWith('/cv/')) newHeaders.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    }

    // ivanrene.com: sitio estático generado por scripts/build-site.mjs (ES en /, EN en /en/)
    // Una sola URL canónica: https://ivanrene.com (Google tenía indexada la versión http)
    if (url.hostname === 'www.ivanrene.com' || (url.hostname === 'ivanrene.com' && url.protocol === 'http:')) {
      return Response.redirect('https://ivanrene.com' + path + url.search, 301);
    }
    // *.workers.dev sirve igual que ivanrene.com para revisar versiones antes de publicarlas
    if (url.hostname === 'ivanrene.com' || url.hostname.endsWith('.workers.dev')) {
      return servirSitio(request, env, url, path);
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

// Rutas de la web anterior que ya tienen equivalente
const REDIRECCIONES = {
  '/services': '/servicios/', '/resources': '/', '/case-studies': '/proyectos/', '/case-study-multicloud': '/proyectos/',
  '/case-study-micro': '/proyectos/micro/', '/hire-ivan': '/contacto/', '/hiring-playbook': '/contacto/',
  '/ai-integrations': '/servicios/#ia', '/data-platforms': '/servicios/#ia',
  '/cloud-architecture': '/servicios/#nube-sre', '/devops-automation': '/servicios/#nube-sre', '/platform-engineering': '/servicios/#nube-sre',
  '/cost-optimization': '/servicios/#nube-sre', '/security-compliance': '/servicios/#nube-sre',
  '/industry-fintech': '/servicios/#fintech', '/node-enterprise': '/servicios/#backend', '/product-delivery': '/servicios/#web-movil',
  '/industry-ecommerce': '/servicios/', '/industry-health': '/servicios/', '/industry-saas': '/servicios/',
  '/cto-advisory': '/servicios/', '/engineering-leadership': '/servicios/', '/customer-success': '/servicios/',
};

function cachePara(path, tipo) {
  if (path.startsWith('/assets/') || path.startsWith('/fonts/')) return 'public, max-age=31536000, immutable';
  if (/^\/(img|og|marca|images)\//.test(path) || /\.(png|webp|avif|svg|ico)$/.test(path)) return 'public, max-age=31536000';
  if (tipo.includes('text/html')) return 'public, max-age=0, must-revalidate';
  return 'public, max-age=3600';
}

async function servirSitio(request, env, url, path) {
  const destino = REDIRECCIONES[path.replace(/\/$/, '').replace(/\.html$/, '')];
  if (destino) return Response.redirect('https://ivanrene.com' + destino, 301);

  let res = await env.ASSETS.fetch(request);
  // html_handling redirige /proyectos → /proyectos/; se hace permanente para los buscadores
  if (res.status === 307 || res.status === 308) {
    const loc = res.headers.get('Location');
    if (loc) return Response.redirect(new URL(loc, url.origin).toString(), 301);
  }
  let status = res.status;
  if (status === 404) {
    res = await env.ASSETS.fetch(new Request(new URL(path.startsWith('/en/') ? '/en/404.html' : '/404.html', url.origin), request));
    status = 404;
  }
  const headers = new Headers(res.headers);
  if (path.endsWith('.md')) headers.set('Content-Type', 'text/markdown; charset=utf-8');
  else if (path.endsWith('.txt')) headers.set('Content-Type', 'text/plain; charset=utf-8');
  headers.set('Cache-Control', cachePara(path, headers.get('Content-Type') || ''));
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Strict-Transport-Security', 'max-age=31536000');
  if (path.startsWith('/propuestas/')) headers.set('X-Robots-Tag', 'noindex');
  return new Response(res.body, { status, headers });
}
