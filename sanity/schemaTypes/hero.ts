import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Hero',
    type: 'document',
    fields: [
        defineField({ name: 'titleTop', title: 'Título (arriba)', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'titleAccent', title: 'Título (acentuado)', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'titleBottom', title: 'Título (abajo)', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
        defineField({
            name: 'primaryCta',
            title: 'CTA principal',
            type: 'object',
            fields: [
                { name: 'label', title: 'Etiqueta', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'sectionId', title: 'ID de sección (ancla)', type: 'string', validation: (Rule) => Rule.required() },
            ],
        }),
        defineField({
            name: 'secondaryCta',
            title: 'CTA secundario',
            type: 'object',
            fields: [
                { name: 'label', title: 'Etiqueta', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'sectionId', title: 'ID de sección (ancla)', type: 'string', validation: (Rule) => Rule.required() },
            ],
        }),
        defineField({
            name: 'stats',
            title: 'Estadísticas',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'value', title: 'Valor', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'label', title: 'Etiqueta', type: 'string', validation: (Rule) => Rule.required() },
                ],
                preview: {
                    select: { title: 'value', subtitle: 'label' },
                },
            }],
        }),
        defineField({ name: 'showScrollHint', title: 'Mostrar pista de scroll', type: 'boolean', initialValue: true }),
        defineField({ name: 'scrollHintLabel', title: 'Texto pista de scroll', type: 'string', initialValue: 'Descubre más' }),
    ],
    preview: {
        select: { title: 'titleAccent', subtitle: 'description' },
        prepare({ title, subtitle }) {
            return { title: `Hero: ${title ?? 'sin título'}`, subtitle }
        },
    },
})
