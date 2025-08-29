import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'menuItems',
      title: 'Items de menú',
      type: 'array',
      of: [
        defineField({
          name: 'menuItem',
          title: 'Item',
          type: 'object',
          fields: [
            { name: 'label', title: 'Etiqueta', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'sectionId', title: 'ID de sección (ancla)', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: 'label', subtitle: 'sectionId' },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'cta',
      title: 'Botón CTA',
      type: 'object',
      fields: [
        { name: 'label', title: 'Etiqueta', type: 'string', initialValue: 'Consulta Gratuita' },
        { name: 'sectionId', title: 'ID de sección (ancla)', type: 'string', initialValue: 'contact' },
      ],
      options: { collapsible: true, collapsed: false },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configuración de Header' }
    },
  },
})
