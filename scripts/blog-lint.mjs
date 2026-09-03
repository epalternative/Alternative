/**
 * Lint editorial de un artículo del blog.
 *
 *   npm run blog:lint -- content/posts/<slug>.md
 *
 * Falla con código ≠ 0 si algo de lo obligatorio no se cumple. Los avisos no
 * hacen fallar: se listan para que la persona decida.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const file = process.argv.slice(2).find((a) => !a.startsWith('-'));
if (!file) {
  console.error('uso: npm run blog:lint -- content/posts/<slug>.md');
  process.exit(2);
}
if (!fs.existsSync(file)) {
  console.error(`✖ no existe: ${file}`);
  process.exit(2);
}

const isEn = file.endsWith('.en.md');
const raw = fs.readFileSync(file, 'utf8');
const { data: fm, content: body } = matter(raw);

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

// ── Referencias del proyecto ──────────────────────────────────
const routesSrc = fs.readFileSync('lib/seo/routes.ts', 'utf8');
const rs = routesSrc.indexOf('export const ROUTES: RouteMeta[] = [');
const re = routesSrc.indexOf('\n];', rs);
const ROUTES = eval(routesSrc.slice(routesSrc.indexOf('[', rs), re + 2));
const ROUTE_PATHS = new Set(ROUTES.map((r) => r.path));

const blogSrc = fs.readFileSync('lib/blog.ts', 'utf8');
const STATIC_SLUGS = [...blogSrc.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1]);

/** Slugs cuyo cuerpo se renderiza desde componentes hardcodeados. */
const HARDCODED_SLUGS = [
  'que-es-bpm-business-process-management-guia-completa',
  'caso-exito-banco-regional-40-menos-tiempos-bpm',
];

const PROJECT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5s1f6jl3';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

async function groq(query) {
  const url = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Sanity ${r.status}`);
  return (await r.json()).result;
}

// ── Frases prohibidas (content/CLAUDE.md) ─────────────────────
const BANNED_ES = [
  'en el dinámico mundo', 'en la era digital', 'es fundamental', 'cabe destacar',
  'sin duda', 'hoy en día', 'en un mundo cada vez más', 'la clave del éxito',
  'no es un secreto que', '¿alguna vez te has preguntado',
];
const BANNED_EN = [
  'in today', 'in the dynamic world', 'it is essential', 'it is worth noting',
  'without a doubt', 'in the digital era', 'the key to success', 'have you ever wondered',
];

// ── Lista blanca de cifras propias ────────────────────────────
const WHITELIST = [
  '15+', '50+', '98%', '4-8 meses', '4–8 meses', '4-8 months', '4–8 months',
  '85%', '30-50%', '30–50%', '60-80%', '60–80%', '40-60%', '40–60%',
  '5-15', '5–15',
];

const run = async () => {
  console.log(`\n▶ ${file}${isEn ? '  (versión EN)' : ''}\n`);

  // ── Frontmatter obligatorio ──
  for (const k of ['title', 'description', 'slug', 'author', 'category', 'keyword', 'publishedAt', 'status']) {
    if (!fm[k]) err(`frontmatter: falta "${k}"`);
  }

  // ── Longitudes ──
  if (fm.title) {
    const n = fm.title.length;
    if (n < 50 || n > 60) err(`title de ${n} caracteres (50–60): "${fm.title}"`);
  }
  if (fm.description) {
    const n = fm.description.length;
    if (n < 140 || n > 160) err(`description de ${n} caracteres (140–160)`);
  }

  // ── Slug ──
  if (fm.slug) {
    if (HARDCODED_SLUGS.includes(fm.slug)) {
      err(`slug "${fm.slug}" se renderiza desde un componente hardcodeado; su body de Sanity se ignoraría`);
    }
    if (STATIC_SLUGS.includes(fm.slug)) {
      err(`slug "${fm.slug}" ya existe en el fallback estático de lib/blog.ts`);
    }
    try {
      const existing = await groq(`*[_type=="post" && slug.current=="${fm.slug}"][0]{"s":slug.current}`);
      // Un slug ya en Sanity solo es error si el post es nuevo (no hay borrador previo nuestro).
      if (existing) warn(`el slug "${fm.slug}" ya existe en Sanity; el push haría createOrReplace sobre su borrador`);
    } catch (e) {
      warn(`no se pudo consultar Sanity para el slug (${e.message})`);
    }
  }

  // ── Categoría y autora ──
  try {
    const cats = await groq('*[_type=="category"].slug');
    if (fm.category && !cats.includes(fm.category)) {
      err(`category "${fm.category}" no existe en Sanity. Disponibles: ${cats.join(', ')}`);
    }
  } catch (e) {
    warn(`no se pudo verificar la categoría (${e.message})`);
  }
  try {
    const authors = await groq('*[_type=="author"].name');
    if (fm.author && !authors.includes(fm.author)) {
      err(`author "${fm.author}" no existe en Sanity. Disponibles: ${authors.join(', ')}`);
    }
  } catch (e) {
    warn(`no se pudo verificar la autora (${e.message})`);
  }

  // ── Cuerpo: H1 y extensión ──
  const h1s = (body.match(/^# .+$/gm) || []).length;
  if (h1s > 0) err(`el cuerpo tiene ${h1s} H1; el H1 lo pone el título, empieza en H2`);

  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_\-|]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  if (words < 1100) err(`${words} palabras (mínimo 1.100)`);
  else if (words > 1900) err(`${words} palabras (máximo 1.900)`);
  else if (words < 1200 || words > 1800) warn(`${words} palabras: fuera de 1.200–1.800, dentro del margen duro`);

  // ── Tablas ──
  if (/^\|.+\|\s*$/m.test(body)) {
    err('el cuerpo tiene una tabla Markdown; blockContent no las soporta, usa checklist o lista numerada');
  }

  // ── Frases prohibidas ──
  const lower = body.toLowerCase();
  for (const p of isEn ? BANNED_EN : BANNED_ES) {
    if (lower.includes(p.toLowerCase())) err(`frase prohibida: "${p}"`);
  }

  // ── Enlaces internos ──
  const localePrefix = isEn ? '/en' : '/es';
  const internal = [...body.matchAll(/\]\((\/(?:es|en)[^)\s]*)\)/g)].map((m) => m[1]);
  const postSlugs = new Set(STATIC_SLUGS);
  try {
    (await groq('*[_type=="post"].slug.current')).forEach((s) => postSlugs.add(s));
  } catch {}

  for (const link of new Set(internal)) {
    if (!link.startsWith(localePrefix + '/') && link !== localePrefix) {
      err(`enlace con locale equivocado en la versión ${isEn ? 'EN' : 'ES'}: ${link}`);
      continue;
    }
    const bare = link.replace(/^\/(es|en)/, '') || '';
    if (ROUTE_PATHS.has(bare)) continue;
    const m = bare.match(/^\/blog\/(.+)$/);
    if (m && postSlugs.has(m[1])) continue;
    err(`enlace interno que no resuelve: ${link}`);
  }

  // ── CTA a contacto ──
  if (!internal.some((l) => l === `${localePrefix}/contacto`)) {
    err(`falta el enlace a ${localePrefix}/contacto`);
  }

  // ── serviceLink y relatedLinks ──
  if (fm.serviceLink) {
    const bare = String(fm.serviceLink).replace(/^\/(es|en)/, '');
    if (!ROUTE_PATHS.has(bare)) err(`serviceLink no está en lib/seo/routes.ts: ${fm.serviceLink}`);
  }
  for (const rel of fm.relatedLinks || []) {
    const bare = String(rel).replace(/^\/(es|en)/, '');
    const m = bare.match(/^\/blog\/(.+)$/);
    if (!ROUTE_PATHS.has(bare) && !(m && postSlugs.has(m[1]))) {
      err(`relatedLinks no resuelve: ${rel}`);
    }
  }

  // ── Cifras fuera de la lista blanca (heurística: avisa) ──
  const paragraphs = body.split(/\n\s*\n/);
  for (const p of paragraphs) {
    const nums = p.match(/\d+(?:[.,]\d+)?\s*%|\d+\+|\d+\s*(?:años|years|proyectos|projects|clientes|clients)/gi) || [];
    for (const n of nums) {
      const norm = n.replace(/\s+/g, '');
      if (WHITELIST.some((w) => norm.includes(w.replace(/\s+/g, '')))) continue;
      const hasSource = /https?:\/\//.test(p);
      if (!hasSource) warn(`cifra fuera de la lista blanca y sin URL en su párrafo: "${n.trim()}"`);
    }
  }

  // ── Par EN ──
  if (!isEn) {
    const enFile = file.replace(/\.md$/, '.en.md');
    if (!fs.existsSync(enFile)) {
      warn(`falta la versión en inglés: ${path.basename(enFile)} (obligatoria antes del PR)`);
    }
  }

  // ── Fuentes ──
  if (!Array.isArray(fm.sources) || fm.sources.length === 0) {
    warn('sources vacío: si el artículo cita normativa, debe llevar su URL');
  }

  // ── Reporte ──
  console.log(`palabras: ${words}`);
  if (fm.title) console.log(`title:    ${fm.title.length} chars`);
  if (fm.description) console.log(`descr.:   ${fm.description.length} chars`);
  console.log('─'.repeat(70));
  for (const w of warns) console.log(`  ⚠ ${w}`);
  for (const e of errors) console.log(`  ✖ ${e}`);
  console.log('─'.repeat(70));

  if (errors.length) {
    console.log(`✖ ${errors.length} error(es), ${warns.length} aviso(s)\n`);
    process.exit(1);
  }
  console.log(`✔ lint en verde${warns.length ? ` (${warns.length} aviso(s))` : ''}\n`);
};

run().catch((e) => {
  console.error('✖', e.message);
  process.exit(1);
});
