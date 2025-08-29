import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'generalSettings',
  title: 'Información general',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Nombre de la empresa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Descripción (footer)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'string',
    }),
    defineField({
      name: 'schedule',
      title: 'Horario de atención',
      type: 'string',
    }),
    defineField({
      name: 'phones',
      title: 'Números de contacto',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'emails',
      title: 'Correos electrónicos',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'socials',
      title: 'Redes sociales',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'platform',
            title: 'Plataforma',
            type: 'string',
            options: {
              list: [
                { title: 'Facebook', value: 'facebook' },
                { title: 'Instagram', value: 'instagram' },
                { title: 'Twitter/X', value: 'twitter' },
                { title: 'LinkedIn', value: 'linkedin' },
                { title: 'YouTube', value: 'youtube' },
                { title: 'TikTok', value: 'tiktok' },
                { title: 'WhatsApp', value: 'whatsapp' },
              ],
              layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
          }),
          defineField({ name: 'url', title: 'Enlace', type: 'url', validation: (Rule) => Rule.required() }),
        ],
        preview: {
          select: { title: 'platform', subtitle: 'url' },
          prepare({ title, subtitle }) {
            const t = (title || '').toString()
            const label = t.charAt(0).toUpperCase() + t.slice(1)
            return { title: label, subtitle }
          },
        },
      }],
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      media: 'logo',
      subtitle: 'address',
    },
  },
})
