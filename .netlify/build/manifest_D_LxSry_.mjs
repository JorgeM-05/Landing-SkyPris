import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_D2a1GxmP.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Linkify/Pagina%20Web/Landing-SkyPris/","cacheDir":"file:///D:/Linkify/Pagina%20Web/Landing-SkyPris/node_modules/.astro/","outDir":"file:///D:/Linkify/Pagina%20Web/Landing-SkyPris/dist/","srcDir":"file:///D:/Linkify/Pagina%20Web/Landing-SkyPris/src/","publicDir":"file:///D:/Linkify/Pagina%20Web/Landing-SkyPris/public/","buildClientDir":"file:///D:/Linkify/Pagina%20Web/Landing-SkyPris/dist/","buildServerDir":"file:///D:/Linkify/Pagina%20Web/Landing-SkyPris/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"api/send-email","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/send-email","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/send-email\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"send-email","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/send-email.ts","pathname":"/api/send-email","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/Linkify/Pagina Web/Landing-SkyPris/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/api/send-email@_@ts":"pages/api/send-email.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D_LxSry_.mjs","D:/Linkify/Pagina Web/Landing-SkyPris/src/components/Services.astro?astro&type=script&index=0&lang.ts":"_astro/Services.astro_astro_type_script_index_0_lang.BBLVXpZY.js","D:/Linkify/Pagina Web/Landing-SkyPris/src/components/Plans.astro?astro&type=script&index=0&lang.ts":"_astro/Plans.astro_astro_type_script_index_0_lang.CNRP76kH.js","D:/Linkify/Pagina Web/Landing-SkyPris/src/components/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.85iGKm0C.js","D:/Linkify/Pagina Web/Landing-SkyPris/src/components/Navigation.astro?astro&type=script&index=1&lang.ts":"_astro/Navigation.astro_astro_type_script_index_1_lang.B-fQC9Aa.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/Linkify/Pagina Web/Landing-SkyPris/src/components/Services.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.querySelectorAll(\".benefit-btn\"),n=document.getElementById(\"benefit-title\"),i=document.getElementById(\"benefit-description\"),c=document.getElementById(\"benefit-image\");!n||!i||!c||e.length===0||(e.forEach(t=>{t.addEventListener(\"click\",()=>{e.forEach(o=>o.classList.remove(\"active\")),t.classList.add(\"active\");const d=t.getAttribute(\"data-title\"),s=t.getAttribute(\"data-description\"),a=t.getAttribute(\"data-image\");d&&s&&a&&(n.textContent=d,i.textContent=s,c.src=a)})}),e[0].classList.add(\"active\"))});"],["D:/Linkify/Pagina Web/Landing-SkyPris/src/components/Plans.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const s=document.querySelectorAll(\".category-btn\"),c=document.querySelectorAll(\".plan-group\");let t=\"Chatbots\";s.forEach(a=>{a.addEventListener(\"click\",()=>{t=a.getAttribute(\"data-category\")??\"Chatbots\",s.forEach(e=>e.classList.remove(\"active\")),a.classList.add(\"active\"),c.forEach(e=>{e.getAttribute(\"data-category\")===t?(e.classList.remove(\"hidden\"),e.classList.add(\"visible\")):(e.classList.remove(\"visible\"),e.classList.add(\"hidden\"))})})}),document.querySelector(`.plan-group[data-category=\"${t}\"]`)?.classList.add(\"visible\")});"],["D:/Linkify/Pagina Web/Landing-SkyPris/src/components/Navigation.astro?astro&type=script&index=0&lang.ts","typeof window<\"u\"&&document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.querySelector(\".navbar\");window.addEventListener(\"scroll\",()=>{window.scrollY>450?e?.classList.add(\"scrolled\"):e?.classList.remove(\"scrolled\")})});"],["D:/Linkify/Pagina Web/Landing-SkyPris/src/components/Navigation.astro?astro&type=script&index=1&lang.ts","typeof window<\"u\"&&document.addEventListener(\"DOMContentLoaded\",()=>{const t=document.getElementById(\"menu-toggle\"),e=document.getElementById(\"menu-icon\"),n=document.getElementById(\"mobile-menu\");n?.classList.remove(\"open\"),t?.addEventListener(\"click\",()=>{n?.classList.toggle(\"open\"),e&&e.classList.toggle(\"open\")}),document.querySelectorAll(\".nav-links a\").forEach(o=>{o.addEventListener(\"click\",()=>{n?.classList.remove(\"open\"),e&&e.classList.remove(\"open\")})})});"]],"assets":["/_astro/index.rkGNmYev.css","/assets/FondoUniverso.svg","/assets/logoIcon.png","/assets/rocket.svg","/assets/smoke2.svg","/data/categories.json","/data/data","/assets/footer/fondoFooter.svg","/assets/Plans/bot-basic.svg","/assets/Plans/bot-premium.svg","/assets/Plans/bot-standar.svg","/assets/Plans/e-comerce-basic.svg","/assets/Plans/e-comerce-medio.svg","/assets/Plans/e-comerce-premium.svg","/assets/Plans/Planes.svg","/assets/Services/Atronauta.svg","/assets/Services/Chatbot.svg","/assets/Services/costelacion.svg","/assets/Services/e-comerce.svg","/assets/Services/mancha.svg","/assets/social/facebook.png","/assets/social/instagram.png","/assets/social/linkedin.png","/assets/social/tiktok.png","/assets/social/whatsapp.png","/assets/social/youtube.png","/assets/Services/beneficios/Chatbot-benefit.svg","/assets/Services/beneficios/e-comerce-benefits.svg","/api/send-email","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"z1ZmZG5EUU7II3hhJgh+eHe8FFkSCIa3gqt/s/VUNoM="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
