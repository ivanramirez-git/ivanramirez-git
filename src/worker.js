export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 && (response.status < 300 || response.status >= 400)) {
      return response;
    }

    const url = new URL(request.url);
    const indexRequest = new Request(
      new URL('/index.html', url.origin),
      request
    );

    return env.ASSETS.fetch(indexRequest);
  }
};
