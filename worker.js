export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "") {
      return Response.redirect(`${url.origin}/es`, 307);
    }
    return env.ASSETS.fetch(request);
  },
};
