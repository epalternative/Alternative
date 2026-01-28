import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string' }),
    defineField({ name: 'nameEn', title: 'Nombre (EN)', type: 'string' }),
    defineField({ name: 'role', title: 'Rol (ES)', type: 'string' }),
    defineField({ name: 'roleEn', title: 'Rol (EN)', type: 'string' }),
    defineField({ name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio (ES)', type: 'text' }),
    defineField({ name: 'bioEn', title: 'Bio (EN)', type: 'text' }),
    defineField({ name: 'certifications', title: 'Certificaciones', type: 'string' }),
    defineField({ name: 'link', title: 'Enlace (ej. /nosotros)', type: 'string' }),
  ],
  preview: {
    select: { name: 'name' },
    prepare({ name }) {
      return { title: name || 'Autor' };
    },
  },
});
