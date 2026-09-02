/**
 * Verificación SEO end-to-end.
 *
 * Levanta `next start` sobre el build existente, rastrea todas las rutas del
 * registro × {es, en} + los posts + sondas de slug inexistente, y valida el
 * HTML realmente servido.
 *
 * Cada hallazgo lleva la fase del plan que lo corrige, para poder correr el
 * script entre fases y ver qué queda pendiente.
 *
 * Uso:  node scripts/seo-check.mjs [--port 3131] [--dist .next]
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const arg = (name, def) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (hit) return hit.split('=').slice(1).join('=');
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : def;
};
const PORT = Number(arg('port', 3131));
const DIST = arg('dist', '.next');
/** `--base=https://preview.vercel.app` rastrea un despliegue real en vez de levantar next start. */
const REMOTE = (arg('base', '') || '').replace(/\/+$/, '');
const BASE = REMOTE || `http://localhost:${PORT}`;
const LOCALES = ['es', 'en'];

// ── Registro ──────────────────────────────────────────────────
const routesSrc = fs.readFileSync('lib/seo/routes.ts', 'utf8');
const rs = routesSrc.indexOf('export const ROUTES: RouteMeta[] = [');
const re = routesSrc.indexOf('\n];', rs);
const ROUTES = eval(routesSrc.slice(routesSrc.indexOf('[', rs), re + 2));

// ── Slugs del blog ────────────────────────────────────────────
const blogSrc = fs.readFileSync('lib/blog.ts', 'utf8');
const BLOG_SLUGS = [...blogSrc.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1]);

// ── Rutas con FAQ (Fase 2.3) ──────────────────────────────────
const FAQ_DIR = 'lib/content/faqs';
const hasFaqModule = fs.existsSync(FAQ_DIR) || fs.existsSync('lib/content/faqs.ts');
const hasJsonLd = fs.existsSync('lib/seo/jsonld.ts');

// ── Resultado ─────────────────────────────────────────────────
const findings = [];
const fail = (phase, url, msg) => findings.push({ phase, url, msg });
let checks = 0;
const ok = () => checks++;

// ── Utilidades HTML ───────────────────────────────────────────
const one = (html, rx) => {
  const m = rx.exec(html);
  return m ? m[1] : null;
};
const count = (html, rx) => (html.match(rx) || []).length;

async function get(url) {
  const res = await fetch(url, { redirect: 'manual' });
  const body = res.status === 200 ? await res.text() : '';
  return { status: res.status, body };
}

// ── Arranque del servidor ─────────────────────────────────────
// `--external` reutiliza un `next start` ya levantado (util en Windows, donde
// spawn de npx es fragil).
const EXTERNAL = process.argv.includes('--external') || Boolean(REMOTE);
let server = null;
if (!EXTERNAL) {
  console.log(`> next start -p ${PORT} (dist: ${DIST})`);
  server = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['next', 'start', '-p', String(PORT)],
    { env: { ...process.env, NEXT_DIST_DIR: DIST }, stdio: 'ignore', shell: process.platform === 'win32' }
  );
} else {
  console.log(`> ${REMOTE ? 'despliegue remoto' : 'servidor externo'}: ${BASE}`);
}
const stop = () => { try { server && server.kill(); } catch {} };
process.on('exit', stop);
process.on('SIGINT', () => { stop(); process.exit(130); });

async function waitUp() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`${BASE}/es`, { redirect: 'manual' });
      if (r.status < 500) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

// ── Main ──────────────────────────────────────────────────────
const run = async () => {
  if (!(await waitUp())) {
    console.error('✖ el servidor no respondió. ¿Corriste `next build` primero?');
    process.exit(1);
  }

  const titles = new Map();
  const descs = new Map();

  // ── Rutas del registro ──
  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      const rel = `/${locale}${route.path}`;
      const url = `${BASE}${rel}`;
      const { status, body } = await get(url);

      if (status !== 200) { fail('1b', rel, `HTTP ${status}, se esperaba 200`); continue; }
      ok();

      const title = one(body, /<title>([^<]*)<\/title>/);
      const desc = one(body, /<meta name="description" content="([^"]*)"/);
      const lang = one(body, /<html lang="([^"]*)"/);
      const canonical = one(body, /rel="canonical" href="([^"]*)"/);
      const h1s = count(body, /<h1[\s>]/g);
      const hreflangs = count(body, /hrefLang="/g);
      const robots = one(body, /name="robots" content="([^"]*)"/) || '';

      // title / description
      if (!title) fail('1b', rel, 'sin <title>');
      else if (title.length < 30 || title.length > 65) fail('1b', rel, `title de ${title.length} chars: "${title}"`);
      else ok();

      if (!desc) fail('1b', rel, 'sin meta description');
      else if (desc.length < 100 || desc.length > 170) fail('1b', rel, `description de ${desc.length} chars`);
      else ok();

      // duplicados (solo entre páginas indexables)
      if (!route.noindex) {
        if (title) {
          const key = `${locale}|${title}`;
          if (titles.has(key)) fail('1b', rel, `title duplicado con ${titles.get(key)}`);
          else { titles.set(key, rel); ok(); }
        }
        if (desc) {
          const key = `${locale}|${desc}`;
          if (descs.has(key)) fail('1b', rel, `description duplicada con ${descs.get(key)}`);
          else { descs.set(key, rel); ok(); }
        }
      }

      // lang
      if (lang !== locale) fail('1b', rel, `<html lang="${lang}">, se esperaba "${locale}"`);
      else ok();

      // h1
      if (h1s !== 1) fail('1b', rel, `${h1s} <h1>, se esperaba exactamente 1`);
      else ok();

      // canonical + hreflang
      const expected = `https://grupoalternative.com${rel}`;
      if (canonical !== expected) fail('1b', rel, `canonical "${canonical}", se esperaba "${expected}"`);
      else ok();
      if (hreflangs !== 3) fail('1b', rel, `${hreflangs} hreflang, se esperaban 3`);
      else ok();

      // keywords eliminadas
      if (/<meta name="keywords"/.test(body)) fail('1b', rel, 'sigue emitiendo <meta name="keywords">');
      else ok();

      // noindex correcto
      if (route.noindex && !/noindex/.test(robots)) fail('1b', rel, `debería ser noindex, robots="${robots}"`);
      else ok();

      // JSON-LD (Fase 2)
      if (hasJsonLd && !route.noindex) {
        const blocks = [...body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
        if (!blocks.length) fail('2', rel, 'sin bloque ld+json');
        else {
          let parsed;
          try { parsed = blocks.map((b) => JSON.parse(b)); ok(); }
          catch { fail('2', rel, 'ld+json no parseable'); }
          // La home no lleva migas: un BreadcrumbList de un solo nivel no aporta nada.
          if (parsed && route.type !== 'home' && !JSON.stringify(parsed).includes('BreadcrumbList')) {
            fail('2', rel, 'ld+json sin BreadcrumbList');
          } else if (parsed) ok();
          if (parsed && hasFaqModule) {
            const faqFile = path.join(FAQ_DIR, `${(route.path || 'home').replace(/\//g, '_')}.ts`);
            if (fs.existsSync(faqFile) && !JSON.stringify(parsed).includes('FAQPage')) {
              fail('2', rel, 'tiene FAQs pero no emite FAQPage');
            } else ok();
          }
        }
      }

      // og:image apunta al PNG estatico del sitio (Fase 2/5)
      if (route.type === 'service' && !route.noindex) {
        const og = one(body, /property="og:image" content="([^"]*)"/);
        const expectedOg = 'https://grupoalternative.com/og-image.png';
        if (og !== expectedOg) fail('2', rel, `og:image "${og}", se esperaba "${expectedOg}"`);
        else ok();
      }

      // contadores del hero (Fase 4)
      if (route.path === '') {
        if (/>0<!-- -->\+/.test(body) || /># -->0<!-- -->%/.test(body) || />0<!-- -->%/.test(body)) {
          fail('4', rel, 'el hero sirve "0+" / "0%" en el HTML');
        } else ok();
      }
    }
  }

  // ── Posts del blog ──
  for (const slug of BLOG_SLUGS) {
    for (const locale of LOCALES) {
      const rel = `/${locale}/blog/${slug}`;
      const { status, body } = await get(`${BASE}${rel}`);
      if (status !== 200) { fail('1b', rel, `HTTP ${status}, se esperaba 200`); continue; }
      ok();
      const title = one(body, /<title>([^<]*)<\/title>/);
      if (title && title.length > 65) fail('1b', rel, `title de ${title.length} chars`);
      else ok();
      if (count(body, /<h1[\s>]/g) !== 1) fail('1b', rel, 'no tiene exactamente 1 <h1>');
      else ok();
    }
  }

  // ── Sondas de slug inexistente (Fase 3.4) ──
  const probes = [
    '/es/servicios/optimizacion-procesos/slug-inexistente-xyz',
    '/es/servicios/sistemas-calidad/slug-inexistente-xyz',
    '/es/industrias/slug-inexistente-xyz',
    '/es/recursos/slug-inexistente-xyz',
    '/es/blog/slug-inexistente-xyz',
  ];
  for (const rel of probes) {
    const { status } = await get(`${BASE}${rel}`);
    if (status !== 404) fail('3', rel, `HTTP ${status}, se esperaba 404 (soft-404)`);
    else ok();
  }

  // ── robots.txt ──
  {
    const r = await fetch(`${BASE}/robots.txt`);
    const txt = await r.text();
    if (/Disallow:\s*\/_next\//.test(txt)) fail('3', '/robots.txt', 'sigue bloqueando /_next/');
    else ok();
    if (!/Sitemap:/.test(txt)) fail('3', '/robots.txt', 'sin línea Sitemap');
    else ok();
  }

  // ── sitemap.xml ──
  {
    const r = await fetch(`${BASE}/sitemap.xml`);
    const xml = await r.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const mods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);

    if (!locs.length) fail('3', '/sitemap.xml', 'sin URLs');
    else ok();

    if (mods.length > 1 && new Set(mods).size === 1) {
      fail('3', '/sitemap.xml', `las ${mods.length} URLs comparten el mismo lastmod (${mods[0]})`);
    } else ok();

    const noindexPaths = ROUTES.filter((x) => x.noindex).map((x) => x.path);
    for (const np of noindexPaths) {
      if (locs.some((l) => l.endsWith(np) && np !== '')) fail('3', '/sitemap.xml', `incluye ruta noindex: ${np}`);
      else ok();
    }

    for (const loc of locs) {
      const rel = loc.replace('https://grupoalternative.com', '');
      const { status } = await get(`${BASE}${rel}`);
      if (status !== 200) fail('3', '/sitemap.xml', `${rel} responde ${status}`);
      else ok();
    }
  }

  stop();

  // ── Reporte ───────────────────────────────────────────────
  const byPhase = findings.reduce((a, f) => ((a[f.phase] ??= []).push(f), a), {});
  console.log(`\n${'─'.repeat(72)}`);
  console.log(`checks superados: ${checks}   ·   hallazgos: ${findings.length}`);
  if (!hasJsonLd) console.log('nota: lib/seo/jsonld.ts no existe → checks de JSON-LD omitidos (Fase 2)');
  console.log('─'.repeat(72));

  for (const phase of Object.keys(byPhase).sort()) {
    console.log(`\n▸ Fase ${phase} — ${byPhase[phase].length} hallazgo(s)`);
    const shown = byPhase[phase].slice(0, 15);
    for (const f of shown) console.log(`   ✖ ${f.url}\n     ${f.msg}`);
    if (byPhase[phase].length > shown.length) {
      console.log(`   … y ${byPhase[phase].length - shown.length} más`);
    }
  }

  if (!findings.length) console.log('\n✔ todo en verde');
  process.exit(findings.length ? 1 : 0);
};

run().catch((e) => { stop(); console.error(e); process.exit(1); });
