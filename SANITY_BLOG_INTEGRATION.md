# Guía paso a paso: Integrar Sanity CMS con el Blog de Alternative

Esta guía detalla cómo conectar Sanity para crear y gestionar los artículos del blog desde el panel de Sanity, manteniendo la estructura actual del sitio (es/en, SEO, diseño).

---

## Parte 1: Cuenta y proyecto en Sanity

### Paso 1.1 — Crear cuenta en Sanity

1. Entra en **[sanity.io](https://www.sanity.io)**.
2. Clic en **"Get started"** o **"Sign up"**.
3. Regístrate con:
   - **Email** + contraseña, o
   - **Google** / **GitHub** (recomendado para equipos).
4. Confirma el email si usaste correo.
5. Completa el perfil (nombre, opcional).

### Paso 1.2 — Crear un proyecto (organization)

1. En el dashboard de Sanity ([manage.sanity.io](https://manage.sanity.io)), clic en **"Create project"**.
2. Rellena:
   - **Project name:** `Grupo Alternative Blog` (o el nombre que prefieras).
   - **Dataset:** dejar **Production** (luego puedes añadir `staging` si quieres).
   - **Region:** elegir la más cercana (ej. `eu` o `us`).
3. Clic en **"Create project"**.
4. Anota:
   - **Project ID** (ej. `abc123xyz`) — lo verás en *Project settings → API*.
   - Más adelante usarás también el **Dataset** (por defecto `production`).

### Paso 1.3 — Invitar usuarios al proyecto (opcional)

1. En el proyecto: **Project settings** (icono engranaje).
2. Pestaña **"API"**: ver **Project ID** y **Dataset**.
3. Pestaña **"Members"** (o **"Team"**): **Invite** para añadir editores del blog por email.
4. Asigna rol **Editor** o **Administrator** según corresponda.

---

## Parte 2: Instalar Sanity en el proyecto Next.js

### Paso 2.1 — Instalar dependencias

En la raíz del proyecto (`nextjs_space`):

```bash
npm install sanity next-sanity @sanity/image-url
```

- **sanity**: cliente y herramientas para schemas y Studio.
- **next-sanity**: helpers para Next.js (fetch, imagen, live preview).
- **@sanity/image-url**: generar URLs de imágenes optimizadas.

### Paso 2.2 — Crear estructura de carpetas para Sanity

Dos opciones habituales:

**Opción A — Sanity dentro del mismo repo (recomendado para empezar)**

```
nextjs_space/
  sanity/
    schemaTypes/
      author.ts
      category.ts
      post.ts
    lib/
      client.ts
      queries.ts
    sanity.config.ts
    sanity.cli.ts
  lib/
    blog.ts          ← aquí cambiarás a usar datos de Sanity
```

**Opción B — Studio en subcarpeta dedicada**

```
nextjs_space/
  apps/
    web/             ← Next.js (tu app actual)
    studio/          ← Sanity Studio (Next.js o Vite)
  packages/
    sanity-shared/   ← schemas compartidos (opcional)
```

En esta guía se usa **Opción A**: carpeta `sanity/` en la raíz del proyecto.

---

## Parte 3: Configuración del cliente Sanity

### Paso 3.1 — Variables de entorno

En `.env` y `.env.example` añade:

```env
# Sanity CMS - Blog
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
```

- **Project ID** y **Dataset**: los anotaste en el Paso 1.2.
- **SANITY_API_READ_TOKEN**: opcional; solo necesario si quieres contenido draft o permisos restringidos. Se crea en *Project settings → API → Tokens*.

### Paso 3.2 — Archivo del cliente

Crea `sanity/lib/client.ts`:

```ts
import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01', // usar fecha actual en YYYY-MM-DD
  useCdn: process.env.NODE_ENV === 'production',
});
```

- `useCdn: true` en producción mejora velocidad; en dev suele ser `false` para ver cambios al instante.

---

## Parte 4: Schemas (modelo de datos del blog)

Los schemas deben reflejar la estructura que ya usas en `lib/blog.ts` (slug, meta, título/es/en, autor, categoría, etc.).

### Paso 4.1 — Schema: Author

Crea `sanity/schemaTypes/author.ts`:

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
    }),
    defineField({
      name: 'nameEn',
      title: 'Nombre (EN)',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Rol (ES)',
      type: 'string',
    }),
    defineField({
      name: 'roleEn',
      title: 'Rol (EN)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio (ES)',
      type: 'text',
    }),
    defineField({
      name: 'bioEn',
      title: 'Bio (EN)',
      type: 'text',
    }),
    defineField({
      name: 'certifications',
      title: 'Certificaciones',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Enlace (ej. /nosotros)',
      type: 'string',
    }),
  ],
  preview: {
    select: { name: 'name' },
    prepare({ name }) {
      return { title: name || 'Autor' };
    },
  },
});
```

### Paso 4.2 — Schema: Category

Crea `sanity/schemaTypes/category.ts`:

```ts
import { defineField, defineType } from 'sanity';

const CATEGORY_VALUES = [
  'optimizacion-procesos',
  'calidad',
  'proyectos',
  'tecnologia',
  'estrategia',
  'transformacion-digital',
] as const;

export default defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (ID)',
      type: 'string',
      options: {
        list: CATEGORY_VALUES.map((c) => ({ title: c, value: c })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Etiqueta (ES)',
      type: 'string',
    }),
    defineField({
      name: 'labelEn',
      title: 'Etiqueta (EN)',
      type: 'string',
    }),
  ],
  preview: {
    select: { label: 'label' },
    prepare({ label }) {
      return { title: label || 'Categoría' };
    },
  },
});
```

### Paso 4.3 — Schema: Post (artículo del blog)

Crea `sanity/schemaTypes/post.ts`:

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Artículo del blog',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenido' },
    { name: 'seo', title: 'SEO' },
    { name: 'meta', title: 'Meta' },
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'meta',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título (ES)',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Título (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen (ES)',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'excerptEn',
      title: 'Resumen (EN)',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta title (ES)',
      type: 'string',
      group: 'seo',
      description: '~59 caracteres',
    }),
    defineField({
      name: 'metaTitleEn',
      title: 'Meta title (EN)',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description (ES)',
      type: 'text',
      group: 'seo',
      description: '~154 caracteres',
    }),
    defineField({
      name: 'metaDescriptionEn',
      title: 'Meta description (EN)',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen hero',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Alt imagen (ES)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heroImageAltEn',
      title: 'Alt imagen (EN)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTimeMinutes',
      title: 'Minutos de lectura',
      type: 'number',
      group: 'meta',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords (SEO)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
    }),
    defineField({
      name: 'body',
      title: 'Cuerpo (ES)',
      type: 'blockContent',
      group: 'content',
      description: 'Contenido en español. Si usas contenido estático por slug, este campo puede no usarse.',
    }),
    defineField({
      name: 'bodyEn',
      title: 'Cuerpo (EN)',
      type: 'blockContent',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Sin título',
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : '',
      };
    },
  },
});
```

### Paso 4.4 — Schema: blockContent (contenido enriquecido)

Crea `sanity/schemaTypes/blockContent.ts`:

```ts
import { defineType, defineArrayMember } from 'sanity';

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Number', value: 'number' }],
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
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
```

### Paso 4.5 — Índice de schemas

Crea `sanity/schemaTypes/index.ts`:

```ts
import author from './author';
import category from './category';
import post from './post';
import blockContent from './blockContent';

export const schemaTypes = [author, category, post, blockContent];
```

---

## Parte 5: Sanity Studio (dónde se crean los artículos)

Tienes dos formas de usar el Studio: **embebido en Next.js** o **proyecto aparte**.

### Opción A — Studio embebido en la misma app Next.js

1. Crea la ruta del Studio, por ejemplo `app/studio/[[...tool]]/page.tsx`:

```tsx
// app/studio/[[...tool]]/page.tsx
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

2. Crea `sanity/sanity.config.ts`:

```ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: 'alternative-blog',
  title: 'Blog Alternative',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
```

3. Instala el plugin de estructura si hace falta:

```bash
npm install @sanity/vision
```

4. Acceso: `https://tudominio.com/studio` (recomendado proteger con auth en producción).

### Opción B — Studio como proyecto independiente (CLI)

1. En la raíz del proyecto:

```bash
npm create sanity@latest -- --project-id TU_PROJECT_ID --dataset production --create-project "no"
```

2. Elige **“Blog”** o **“Clean”** y se creará una carpeta (ej. `sanity-studio/`) con su propio `package.json`.
3. Entra en esa carpeta y:

```bash
cd sanity-studio
npm install
npm run dev
```

4. Abre la URL que indique (ej. `http://localhost:3333`) y gestiona documentos ahí.
5. Para producción: `npx sanity deploy` (te pedirá dominio en `*.sanity.studio`).

---

## Parte 6: Queries GROQ y uso en Next.js

### Paso 6.1 — Queries

Crea `sanity/lib/queries.ts`:

```ts
export const postsQuery = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    title,
    titleEn,
    excerpt,
    excerptEn,
    metaTitle,
    metaTitleEn,
    metaDescription,
    metaDescriptionEn,
    heroImage,
    "heroImageAlt": heroImageAlt,
    "heroImageAltEn": heroImageAltEn,
    publishedAt,
    readingTimeMinutes,
    keywords,
    "category": category->{
      "category": slug,
      "categoryLabel": label,
      "categoryLabelEn": labelEn
    },
    "author": author->{
      name,
      nameEn,
      role,
      roleEn,
      image,
      bio,
      bioEn,
      certifications,
      link
    }
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    titleEn,
    excerpt,
    excerptEn,
    metaTitle,
    metaTitleEn,
    metaDescription,
    metaDescriptionEn,
    heroImage,
    heroImageAlt,
    heroImageAltEn,
    publishedAt,
    _updatedAt,
    readingTimeMinutes,
    keywords,
    "category": category->{
      "category": slug,
      "categoryLabel": label,
      "categoryLabelEn": labelEn
    },
    "author": author->{
      name,
      nameEn,
      role,
      roleEn,
      image,
      bio,
      bioEn,
      certifications,
      link
    },
    body,
    bodyEn
  }
`;

export const postSlugsQuery = `
  *[_type == "post" && defined(slug.current)].slug.current
`;
```

### Paso 6.2 — Adaptar tipos para Sanity

En `lib/blog.ts` (o en `lib/sanity-blog.ts`) define tipos que coincidan con la respuesta de GROQ y un mapeo desde Sanity al tipo `BlogPost` que ya usas:

- `slug` → string
- `category` → `{ category, categoryLabel, categoryLabelEn }`
- `author` → objeto con name, nameEn, role, etc.
- `heroImage` → necesitarás `urlFor(heroImage)` con `@sanity/image-url` para la URL final.

Ejemplo de mapeo (pseudocódigo):

```ts
// Ejemplo: en lib/blog.ts o lib/sanity-blog.ts
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { postsQuery, postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

function mapSanityPostToBlogPost(doc: any): BlogPost {
  return {
    slug: doc.slug,
    metaTitle: doc.metaTitle ?? doc.title,
    metaTitleEn: doc.metaTitleEn ?? doc.titleEn,
    // ... resto de campos
    heroImage: doc.heroImage ? urlFor(doc.heroImage).url() : undefined,
    category: doc.category?.category ?? 'optimizacion-procesos',
    categoryLabel: doc.category?.categoryLabel ?? '',
    categoryLabelEn: doc.category?.categoryLabelEn ?? '',
    author: {
      name: doc.author?.name ?? '',
      nameEn: doc.author?.nameEn ?? doc.author?.name ?? '',
      // ...
    },
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const data = await client.fetch(postsQuery);
  return (data ?? []).map(mapSanityPostToBlogPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const data = await client.fetch(postBySlugQuery, { slug });
  return data ? mapSanityPostToBlogPost(data) : undefined;
}

export async function getAllSlugs(): Promise<string[]> {
  const data = await client.fetch(postSlugsQuery);
  return data ?? [];
}
```

Las páginas que hoy usan `getAllPosts()`, `getPostBySlug(slug)` y `getAllSlugs()` tendrán que pasar a **async**: `getStaticProps` / `generateStaticParams` y `generateMetadata` llamando a estas funciones con `await`. El resto de la UI (listado, detalle, breadcrumb, panel lateral) puede seguir igual.

### Paso 6.3 — Contenido del artículo (body)

Hoy tienes componentes por slug (BPM, Banco Regional). Con Sanity puedes:

- **Opción 1:** Seguir usando componentes React por slug y en Sanity solo meta + excerpt; el body lo sigues definiendo en código.
- **Opción 2:** Guardar el cuerpo en `body` / `bodyEn` (blockContent) y renderizarlo con `@portabletext/react`:

```bash
npm install @portabletext/react
```

Luego en la página del post:

```tsx
import { PortableText } from '@portabletext/react';

// En el componente del artículo
<PortableText value={post.body} components={...} />
```

Puedes mezclar: algunos posts con body desde Sanity y otros (como BPM) que sigan usando el componente estático por slug.

---

## Parte 7: Checklist de implementación

- [ ] Cuenta Sanity creada y proyecto con Project ID y Dataset anotados.
- [ ] Variables en `.env`: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`.
- [ ] Dependencias instaladas: `sanity`, `next-sanity`, `@sanity/image-url`.
- [ ] Carpeta `sanity/` con `lib/client.ts`, `lib/queries.ts`, `schemaTypes/` y `sanity.config.ts` (si usas Studio en Next.js).
- [ ] Schemas creados: `author`, `category`, `post`, `blockContent`.
- [ ] Studio accesible (ruta `/studio` o proyecto CLI) y al menos un autor y una categoría creados.
- [ ] Crear en Sanity un post de prueba con slug, título ES/EN, autor, categoría y publicar.
- [ ] En `lib/blog.ts` (o nuevo `lib/sanity-blog.ts`): funciones async que usen `client.fetch` y mapeen a `BlogPost`.
- [ ] Páginas de blog (listado y `[slug]`) actualizadas a async: `getStaticProps`/`generateStaticParams`/`generateMetadata` con `await getAllPosts()` / `getPostBySlug()` / `getAllSlugs()`.
- [ ] Si usas body desde Sanity: instalar `@portabletext/react` y renderizar `body`/`bodyEn` en la plantilla del post.
- [ ] Probar build: `npm run build`.
- [ ] En producción, restringir acceso a `/studio` (p.ej. con NextAuth o Sanity’s built-in auth).

---

## Resumen de URLs útiles

| Dónde | URL |
|-------|-----|
| Dashboard Sanity | [manage.sanity.io](https://manage.sanity.io) |
| Documentación | [sanity.io/docs](https://www.sanity.io/docs) |
| GROQ | [sanity.io/docs/groq](https://www.sanity.io/docs/groq) |
| Studio (si haces deploy con CLI) | `https://tu-proyecto.sanity.studio` |

Si quieres, el siguiente paso puede ser bajar esta guía a código concreto en tu repo: crear la carpeta `sanity/`, los archivos de config y schemas, y el nuevo `lib/sanity-blog.ts` con el mapeo a tu tipo `BlogPost` actual.
