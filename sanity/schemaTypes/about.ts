import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'Sección: Sobre nosotros',
  type: 'document',
  fields: [
    defineField({ name: 'titlePrefix', title: 'Título (prefijo)', type: 'string', initialValue: 'Sobre' }),
    defineField({ name: 'titleAccent', title: 'Título (acentuado)', type: 'string', initialValue: 'Nosotros' }),
    // Textos largos como rich text (permite negrita, etc.)
    defineField({
      name: 'intro',
      title: 'Introducción',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'story',
      title: 'Nuestra historia',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string', initialValue: 'Nuestra Historia' },
        // Un solo contenido enriquecido en lugar de "párrafos"
        { name: 'content', title: 'Contenido', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Valor', type: 'string' },
          { name: 'label', title: 'Etiqueta', type: 'string' },
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    }),
    defineField({
      name: 'mission',
      title: 'Misión',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string', initialValue: 'Nuestra Misión' },
        { name: 'description', title: 'Descripción', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'vision',
      title: 'Visión',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string', initialValue: 'Nuestra Visión' },
        { name: 'description', title: 'Descripción', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icono (nombre de lucide, ej: Award)', type: 'string' },
          { name: 'title', title: 'Título', type: 'string' },
          { name: 'description', title: 'Descripción', type: 'text' },
        ],
        preview: { select: { title: 'title', subtitle: 'icon' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'titleAccent', subtitle: 'intro' },
    prepare({ title, subtitle }) {
      return { title: `Sobre nosotros: ${title ?? ''}`.trim(), subtitle }
    },
  },
})
