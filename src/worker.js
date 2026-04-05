export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Routes that should be proxied to Flask backend (CV Manager)
    const flaskRoutes = ['/cv/', '/panel/', '/auth/', '/api/', '/sitemap.xml', '/robots.txt', '/llms.txt'];
    const isFlaskRoute = flaskRoutes.some(route => path.startsWith(route) || path === route.replace(/\/$/, ''));

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
