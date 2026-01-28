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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', title: 'Título (ES)', type: 'string', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({ name: 'titleEn', title: 'Título (EN)', type: 'string', group: 'content' }),
    defineField({ name: 'excerpt', title: 'Resumen (ES)', type: 'text', group: 'content' }),
    defineField({ name: 'excerptEn', title: 'Resumen (EN)', type: 'text', group: 'content' }),
    defineField({ name: 'metaTitle', title: 'Meta title (ES)', type: 'string', group: 'seo' }),
    defineField({ name: 'metaTitleEn', title: 'Meta title (EN)', type: 'string', group: 'seo' }),
    defineField({ name: 'metaDescription', title: 'Meta description (ES)', type: 'text', group: 'seo' }),
    defineField({ name: 'metaDescriptionEn', title: 'Meta description (EN)', type: 'text', group: 'seo' }),
    defineField({ name: 'heroImage', title: 'Imagen hero', type: 'image', group: 'content', options: { hotspot: true } }),
    defineField({ name: 'heroImageAlt', title: 'Alt imagen (ES)', type: 'string', group: 'content' }),
    defineField({ name: 'heroImageAltEn', title: 'Alt imagen (EN)', type: 'string', group: 'content' }),
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
    defineField({ name: 'readingTimeMinutes', title: 'Minutos de lectura', type: 'number', group: 'meta' }),
    defineField({ name: 'keywords', title: 'Keywords (SEO)', type: 'array', of: [{ type: 'string' }], group: 'seo' }),
    defineField({ name: 'body', title: 'Cuerpo (ES)', type: 'blockContent', group: 'content' }),
    defineField({ name: 'bodyEn', title: 'Cuerpo (EN)', type: 'blockContent', group: 'content' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Sin título',
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : '',
      };
    },
  },
});
