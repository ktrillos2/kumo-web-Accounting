import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'testimonialsSection',
    title: 'Sección: Testimonios',
    type: 'document',
    fields: [
        defineField({ name: 'titlePrefix', title: 'Título (prefijo)', type: 'string', initialValue: 'Lo que Dicen Nuestros' }),
        defineField({ name: 'titleAccent', title: 'Título (acentuado)', type: 'string', initialValue: 'Clientes' }),
        defineField({ name: 'intro', title: 'Introducción', type: 'array', of: [{ type: 'block' }] }),
        defineField({
            name: 'testimonials',
            title: 'Testimonios',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'name', title: 'Nombre', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'position', title: 'Cargo', type: 'string' },
                    { name: 'company', title: 'Empresa', type: 'string' },
                    { name: 'content', title: 'Contenido', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.min(1) },
                    { name: 'rating', title: 'Calificación (1-5)', type: 'number', validation: (Rule) => Rule.min(1).max(5).required() },
                ],
                preview: {
                    select: { title: 'name', subtitle: 'company' },
                },
            }],
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
    ],
    preview: {
        select: { title: 'titleAccent', subtitle: 'intro.0.children.0.text' },
        prepare({ title, subtitle }) {
            return { title: `Testimonios: ${title ?? ''}`.trim(), subtitle }
        },
    },
})
