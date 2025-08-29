import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'footerSettings',
    title: 'Footer',
    type: 'document',
    fields: [
        defineField({
            name: 'quickLinksTitle',
            title: 'Título enlaces rápidos',
            type: 'string',
            initialValue: 'Enlaces Rápidos',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'quickLinks',
            title: 'Enlaces rápidos',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'label', title: 'Etiqueta', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'sectionId', title: 'ID de sección (ancla)', type: 'string', validation: (Rule) => Rule.required() }),
                ],
                preview: {
                    select: { title: 'label', subtitle: 'sectionId' },
                },
            }],
        }),
        defineField({
            name: 'servicesTitle',
            title: 'Título servicios',
            type: 'string',
            initialValue: 'Servicios',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'services',
            title: 'Servicios (lista corta en footer)',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'contactTitle',
            title: 'Título contacto',
            type: 'string',
            initialValue: 'Contacto',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'copyright',
            title: 'Texto de copyright',
            type: 'string',
            initialValue: 'Todos los derechos reservados.',
        }),
    ],
})
