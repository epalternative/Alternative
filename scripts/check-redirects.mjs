/**
 * Verificación de las redirecciones de `vercel.json`.
 *
 * Solo tiene sentido contra un despliegue real (preview o producción): las
 * reglas de `vercel.json` son configuración de plataforma y `next start` no las
 * aplica.
 *
 * Para cada regla comprueba:
 *   1. `source` responde 308 y `Location` apunta al `destination` esperado.
 *   2. El `destination` responde 200 y no es un soft-404 (sin "Contenido en
 *      desarrollo" ni "Próximamente").
 *
 * Las reglas con comodín (`:path*`) se prueban sustituyendo el comodín por una
 * ruta real tomada del registro o de los slugs del blog.
 *
 * Uso:  node scripts/check-redirects.mjs --base https://preview.vercel.app
 */
import fs from 'node:fs';

const arg = (name, def) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (hit) return hit.split('=').slice(1).join('=');
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : def;
};

const BASE = (arg('base', '') || '').replace(/\/+$/, '');
if (!BASE) {
  console.error('✖ falta --base=https://…');
  process.exit(2);
}

const { redirects } = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

// ── Muestras reales para los comodines ────────────────────────
const routesSrc = fs.readFileSync('lib/seo/routes.ts', 'utf8');
const rs = routesSrc.indexOf('export const ROUTES: RouteMeta[] = [');
const re = routesSrc.indexOf('\n];', rs);
const ROUTES = eval(routesSrc.slice(routesSrc.indexOf('[', rs), re + 2));
const blogSrc = fs.readFileSync('lib/blog.ts', 'utf8');
const BLOG_SLUGS = [...blogSrc.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1]);

/** Devuelve un segmento real que exista bajo `prefix` (p. ej. '/industrias'). */
function sampleFor(prefix) {
  if (prefix.endsWith('/blog') && BLOG_SLUGS.length) return BLOG_SLUGS[0];
  const hit = ROUTES.find((r) => r.path.startsWith(`${prefix}/`) && !r.noindex);
  return hit ? hit.path.slice(prefix.length + 1) : null;
}

const SOFT_404 = ['Contenido en desarrollo', 'Content in development', 'Próximamente', 'Coming Soon'];

const findings = [];
let okCount = 0;
const fail = (rule, msg) => findings.push({ rule, msg });

const norm = (loc) => (loc || '').replace(BASE, '').replace(/^https?:\/\/[^/]+/, '') || '/';

async function head(url) {
  const r = await fetch(url, { redirect: 'manual' });
  return { status: r.status, location: r.headers.get('location') };
}

const run = async () => {
  console.log(`▶ ${redirects.length} reglas contra ${BASE}\n`);

  for (const rule of redirects) {
    let { source, destination } = rule;

    // Sustituir comodines por una ruta real
    let wildcard = false;
    if (source.includes(':path*')) {
      wildcard = true;
      const prefix = source.replace('/:path*', '');
      const destPrefix = destination.replace('/:path*', '');
      const sample = sampleFor(destPrefix.replace(/^\/(es|en)/, '')) ?? sampleFor(prefix);
      if (!sample) {
        findings.push({ rule: source, msg: 'sin muestra real para el comodín; no verificable', soft: true });
        continue;
      }
      source = source.replace(':path*', sample);
      destination = destination.replace(':path*', sample);
    }

    // 1. El source debe redirigir 308 al destination
    let res;
    try { res = await head(`${BASE}${source}`); }
    catch (e) { fail(source, `error de red: ${e.message}`); continue; }

    if (res.status !== 308) {
      fail(source, `HTTP ${res.status}, se esperaba 308${res.location ? ` (Location: ${res.location})` : ''}`);
      continue;
    }
    okCount++;

    const got = norm(res.location);
    if (got !== destination) {
      fail(source, `Location "${got}", se esperaba "${destination}"`);
      continue;
    }
    okCount++;

    // 2. El destino debe responder 200 y no ser un soft-404
    let dest;
    try { dest = await fetch(`${BASE}${destination}`, { redirect: 'follow' }); }
    catch (e) { fail(source, `destino ${destination}: error de red ${e.message}`); continue; }

    if (dest.status !== 200) {
      fail(source, `destino ${destination} responde ${dest.status}`);
      continue;
    }
    okCount++;

    const body = await dest.text();
    const marker = SOFT_404.find((m) => body.includes(m));
    if (marker) {
      // Un destino marcado `noindex` en el registro es un placeholder conocido,
      // no una regresion: se reporta como aviso.
      const destPath = destination.replace(/^\/(es|en)/, '');
      const known = ROUTES.find((r) => r.path === destPath && r.noindex);
      if (known) {
        findings.push({
          rule: source,
          msg: `destino ${destination} es un placeholder noindex (contiene "${marker}")`,
          soft: true,
        });
      } else {
        fail(source, `destino ${destination} es soft-404 (contiene "${marker}")`);
      }
      continue;
    }
    okCount++;

    if (wildcard) console.log(`   · comodín probado con: ${source} → ${destination}`);
  }

  console.log(`\n${'─'.repeat(72)}`);
  const hard = findings.filter((f) => !f.soft);
  console.log(`checks superados: ${okCount}   ·   fallos: ${hard.length}   ·   avisos: ${findings.length - hard.length}`);
  for (const f of findings) {
    console.log(`   ${f.soft ? '⚠' : '✖'} ${f.rule}\n     ${f.msg}`);
  }
  if (!findings.length) console.log('✔ todas las redirecciones correctas');
  process.exit(hard.length ? 1 : 0);
};

run().catch((e) => { console.error(e); process.exit(1); });
