import {defineType, defineField} from 'sanity'

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
      options: {hotspot: true},
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
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'emails',
      title: 'Correos electrónicos',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'social',
      title: 'Redes sociales',
      type: 'object',
      fields: [
        {name: 'facebook', title: 'Facebook', type: 'url'},
        {name: 'instagram', title: 'Instagram', type: 'url'},
        {name: 'twitter', title: 'Twitter/X', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn', type: 'url'},
        {name: 'youtube', title: 'YouTube', type: 'url'},
        {name: 'tiktok', title: 'TikTok', type: 'url'},
        {name: 'whatsapp', title: 'WhatsApp', type: 'url'},
      ],
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
