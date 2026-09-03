/**
 * Empuja un artículo Markdown a Sanity como **borrador**.
 *
 *   npm run blog:push -- content/posts/<slug>.md [--dry-run]
 *
 * - Crea o reemplaza `drafts.post-<slug>`. Idempotente.
 * - Si existe `content/posts/<slug>.en.md`, su contenido va a los campos `*En`
 *   del mismo documento.
 * - Nunca publica: publicar es un clic humano en el Studio.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';
import { createClient } from '@sanity/client';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const file = args.find((a) => !a.startsWith('-'));

if (!file) {
  console.error('uso: npm run blog:push -- content/posts/<slug>.md [--dry-run]');
  process.exit(2);
}
if (!fs.existsSync(file)) {
  console.error(`✖ no existe: ${file}`);
  process.exit(2);
}

// ── .env.local ────────────────────────────────────────────────
if (fs.existsSync('.env.local')) {
  for (const line of fs.readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const PROJECT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5s1f6jl3';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!DRY && !TOKEN) {
  console.error(
    '✖ falta SANITY_API_WRITE_TOKEN.\n' +
      '  Ponlo en .env.local (que está en .gitignore) o expórtalo en el entorno.\n' +
      '  Se crea en sanity.io/manage → API → Tokens, con permiso Editor.\n' +
      '  Para ver el JSON sin tocar Sanity: añade --dry-run'
  );
  process.exit(2);
}

const client = createClient({
  projectId: PROJECT,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
});

// ── Esquema de blockContent, tal como está en sanity/schemaTypes ──
const defaultSchema = Schema.compile({
  name: 'default',
  types: [
    {
      type: 'object',
      name: 'post',
      fields: [
        {
          name: 'body',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'Quote', value: 'blockquote' },
              ],
              lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Number', value: 'number' },
              ],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [{ name: 'href', type: 'url', title: 'URL' }],
                  },
                ],
              },
            },
            { type: 'image' },
          ],
        },
      ],
    },
  ],
});
const blockContentType = defaultSchema.get('post').fields.find((f) => f.name === 'body').type;

/** Markdown → Portable Text. */
function toPortableText(md) {
  const html = marked.parse(md, { mangle: false, headerIds: false });
  return htmlToBlocks(html, blockContentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
    rules: [
      {
        // El H1 no existe en el esquema: si se cuela, se degrada a H2.
        deserialize(el, next, block) {
          if (el.tagName?.toLowerCase() !== 'h1') return undefined;
          return block({ _type: 'block', style: 'h2', children: next(el.childNodes) });
        },
      },
      {
        // blockContent no soporta tablas: se degrada a párrafos y se avisa.
        deserialize(el, next, block) {
          if (el.tagName?.toLowerCase() !== 'table') return undefined;
          console.warn('  ⚠ tabla degradada a párrafos: blockContent no soporta tablas');
          return block({ _type: 'block', style: 'normal', children: next(el.childNodes) });
        },
      },
    ],
  });
}

/**
 * `publishedAt` a `YYYY-MM-DD`.
 *
 * gray-matter parsea una fecha YAML sin comillas como objeto Date, no como
 * string: concatenarla directamente produciria
 * "Mon Sep 07 2026 …T08:00:00-05:00".
 */
function toDateOnly(v) {
  if (v instanceof Date) {
    // Se usa UTC para que la fecha no se desplace por la zona horaria local.
    return v.toISOString().slice(0, 10);
  }
  const s = String(v).trim();
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!m) throw new Error(`publishedAt no es una fecha valida: "${s}"`);
  return m[1];
}

async function groq(query, params = {}) {
  return client.fetch(query, params);
}

const run = async () => {
  const { data: fm, content: body } = matter(fs.readFileSync(file, 'utf8'));

  for (const k of ['title', 'description', 'slug', 'author', 'category', 'publishedAt']) {
    if (!fm[k]) {
      console.error(`✖ frontmatter: falta "${k}"`);
      process.exit(1);
    }
  }

  // ── Referencias ──
  const authorId = await groq('*[_type=="author" && name==$n][0]._id', { n: fm.author });
  if (!authorId) {
    console.error(`✖ no existe el autor "${fm.author}" en Sanity`);
    process.exit(1);
  }
  const categoryId = await groq('*[_type=="category" && slug==$c][0]._id', { c: fm.category });
  if (!categoryId) {
    console.error(`✖ no existe la categoría "${fm.category}" en Sanity`);
    process.exit(1);
  }

  // ── Cuerpos ──
  const bodyBlocks = toPortableText(body);

  const enFile = file.replace(/\.md$/, '.en.md');
  let en = null;
  if (fs.existsSync(enFile)) {
    const parsed = matter(fs.readFileSync(enFile, 'utf8'));
    en = { fm: parsed.data, blocks: toPortableText(parsed.content) };
  } else {
    console.warn(`  ⚠ sin versión EN (${path.basename(enFile)}): los campos *En quedarán vacíos`);
  }

  const words = body.split(/\s+/).filter(Boolean).length;

  const doc = {
    _id: `drafts.post-${fm.slug}`,
    _type: 'post',
    slug: { _type: 'slug', current: fm.slug },
    title: fm.title,
    metaTitle: fm.metaTitle || fm.title,
    // La description alimenta los dos campos: la <meta> y el resumen del índice.
    metaDescription: fm.description,
    excerpt: fm.description,
    author: { _type: 'reference', _ref: authorId },
    category: { _type: 'reference', _ref: categoryId },
    // El campo es `datetime`: una fecha suelta lo rompe.
    publishedAt: `${toDateOnly(fm.publishedAt)}T08:00:00-05:00`,
    readingTimeMinutes: Math.ceil(words / 200),
    keywords: [fm.keyword, ...(fm.secondaryKeywords || [])].filter(Boolean),
    body: bodyBlocks,
    heroImageAlt: fm.heroImageAlt || undefined,
  };

  if (en) {
    doc.titleEn = en.fm.title;
    doc.metaTitleEn = en.fm.metaTitle || en.fm.title;
    doc.metaDescriptionEn = en.fm.description;
    doc.excerptEn = en.fm.description;
    doc.bodyEn = en.blocks;
    doc.heroImageAltEn = en.fm.heroImageAlt || undefined;
  }

  // ── Imagen ──
  if (fm.heroImage) {
    const imgPath = path.isAbsolute(fm.heroImage) ? fm.heroImage : path.join('content/images', path.basename(fm.heroImage));
    if (!fs.existsSync(imgPath)) {
      console.warn(`  ⚠ heroImage no encontrada: ${imgPath} — se omite`);
    } else if (DRY) {
      console.log(`  (dry-run) se subiría la imagen ${imgPath}`);
    } else {
      const asset = await client.assets.upload('image', fs.createReadStream(imgPath), {
        filename: path.basename(imgPath),
      });
      doc.heroImage = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
      console.log(`  imagen subida: ${asset._id}`);
    }
  }

  // ── Salida ──
  if (DRY) {
    const preview = { ...doc, body: doc.body.slice(0, 30), bodyEn: doc.bodyEn ? `[${doc.bodyEn.length} bloques]` : undefined };
    console.log(JSON.stringify(preview, null, 2));
    console.log(`\n(dry-run) body: ${doc.body.length} bloques · bodyEn: ${doc.bodyEn?.length ?? 0}`);
    console.log('No se ha tocado Sanity.');
    return;
  }

  await client.createOrReplace(doc);

  // ── Verificación de vuelta ──
  const back = await groq('*[_id==$id][0]{"slug":slug.current,"body":count(body),"bodyEn":count(bodyEn),title}', {
    id: doc._id,
  });
  if (!back) {
    console.error('✖ el borrador no se pudo leer de vuelta');
    process.exit(1);
  }
  if (back.slug !== fm.slug) {
    console.error(`✖ slug distinto tras el push: "${back.slug}" vs "${fm.slug}"`);
    process.exit(1);
  }
  if (!back.body) {
    console.error('✖ el borrador quedó sin bloques en body');
    process.exit(1);
  }

  console.log(`\n✔ borrador creado: ${doc._id}`);
  console.log(`  título:  ${back.title}`);
  console.log(`  body:    ${back.body} bloques · bodyEn: ${back.bodyEn ?? 0}`);
  console.log(`  Studio:  https://${PROJECT}.sanity.studio/structure/post;${encodeURIComponent(doc._id)}`);
  console.log('\n  El borrador NO está publicado. Publicar es un clic en el Studio.');
};

run().catch((e) => {
  console.error('✖', e.message);
  process.exit(1);
});
