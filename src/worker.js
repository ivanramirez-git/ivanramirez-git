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

    // ivanrene.com: la web es la propuesta «perfil» (public/propuestas/perfil) con recursos en /shared/.
    // Lo que no exista ahí cae a los assets de siempre (imágenes, favicon, platano, rss…).
    const isMainHost = url.hostname === 'ivanrene.com' || url.hostname === 'www.ivanrene.com';
    if (isMainHost) {
      const perfilPath = (path.startsWith('/shared/') ? '/propuestas' + path : '/propuestas/perfil' + path).replace(/\/index\.html$/, '/');
      const perfil = await env.ASSETS.fetch(new Request(new URL(perfilPath, url.origin), request));
      if (perfil.status === 200) return perfil;
    }

    // Serve static portfolio assets
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 && (response.status < 300 || response.status >= 400)) {
      return response;
    }

    // Rutas desconocidas: en ivanrene.com vuelven al inicio de la web nueva
    if (isMainHost) {
      return Response.redirect(new URL('/', url.origin).toString(), 302);
    }

    // SPA fallback
    const indexRequest = new Request(
      new URL('/index.html', url.origin),
      request
    );
    return env.ASSETS.fetch(indexRequest);
  }
};
