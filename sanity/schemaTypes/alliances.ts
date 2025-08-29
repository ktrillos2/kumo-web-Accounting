import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'alliancesSection',
  title: 'Sección: Nuestras alianzas',
  type: 'document',
  fields: [
    defineField({ name: 'titlePrefix', title: 'Título (prefijo)', type: 'string', initialValue: 'Nuestras' }),
    defineField({ name: 'titleAccent', title: 'Título (acentuado)', type: 'string', initialValue: 'Alianzas' }),
    defineField({ name: 'intro', title: 'Introducción', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'alliances',
      title: 'Alianzas',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icono (nombre de lucide, ej: Shield)', type: 'string' },
          { name: 'title', title: 'Título', type: 'string' },
          { name: 'partner', title: 'Socio / Partner', type: 'string' },
          { name: 'description', title: 'Descripción', type: 'array', of: [{ type: 'block' }] },
          { name: 'benefits', title: 'Beneficios', type: 'array', of: [{ type: 'string' }] },
        ],
        preview: { select: { title: 'title', subtitle: 'partner' } },
      }],
    }),
    defineField({
      name: 'highlight',
      title: 'Bloque destacado',
      type: 'object',
      fields: [
        { name: 'icon', title: 'Icono (nombre de lucide, ej: Handshake)', type: 'string', initialValue: 'Handshake' },
        { name: 'titlePrefix', title: 'Título (prefijo)', type: 'string', initialValue: 'Compromiso con la' },
        { name: 'titleAccent', title: 'Título (acentuado)', type: 'string', initialValue: 'Excelencia' },
        { name: 'description', title: 'Descripción', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Pilares / Beneficios Clave',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icono (nombre de lucide, ej: Users)', type: 'string' },
          { name: 'title', title: 'Título', type: 'string' },
          { name: 'description', title: 'Descripción', type: 'array', of: [{ type: 'block' }] },
        ],
        preview: { select: { title: 'title', subtitle: 'icon' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'titleAccent', subtitle: 'intro.0.children.0.text' },
    prepare({ title, subtitle }) {
      return { title: `Alianzas: ${title ?? ''}`.trim(), subtitle }
    },
  },
})
