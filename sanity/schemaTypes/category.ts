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
      name: 'label',
      title: 'Nombre (ES)',
      type: 'string',
      description: 'Nombre visible de la categoría en español.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'labelEn',
      title: 'Nombre (EN)',
      type: 'string',
      description: 'Nombre visible en inglés.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (ID interno)',
      type: 'string',
      description: 'Identificador técnico. Elige uno de la lista.',
      options: {
        list: CATEGORY_VALUES.map((c) => ({ title: c, value: c })),
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { label: 'label', slug: 'slug' },
    prepare({ label, slug }) {
      return { title: label || slug || 'Categoría' };
    },
  },
});
