import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'servicesSection',
    title: 'Sección: Nuestros servicios',
    type: 'document',
    fields: [
        defineField({ name: 'titlePrefix', title: 'Título (prefijo)', type: 'string', initialValue: 'Nuestros' }),
        defineField({ name: 'titleAccent', title: 'Título (acentuado)', type: 'string', initialValue: 'Servicios' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
        defineField({
            name: 'services',
            title: 'Servicios',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'icon', title: 'Icono (nombre de lucide, ej: Calculator)', type: 'string' },
                    { name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'description', title: 'Descripción', type: 'text', rows: 3 },
                    { name: 'features', title: 'Características', type: 'array', of: [{ type: 'string' }] },
                ],
                preview: {
                    select: { title: 'title', subtitle: 'icon' },
                },
            }],
            validation: (Rule) => Rule.min(1),
        }),
        defineField({
            name: 'cta',
            title: 'CTA',
            type: 'object',
            fields: [
                { name: 'titlePrefix', title: 'Título CTA (prefijo)', type: 'string', initialValue: '¿Necesita una' },
                { name: 'titleAccent', title: 'Título CTA (acentuado)', type: 'string', initialValue: 'Consulta Personalizada' },
                { name: 'titleSuffix', title: 'Título CTA (sufijo)', type: 'string', initialValue: '?' },
                { name: 'description', title: 'Descripción CTA', type: 'text', rows: 3 },
                { name: 'buttonLabel', title: 'Texto botón', type: 'string', initialValue: 'Solicitar Consulta Gratuita' },
                { name: 'buttonSectionId', title: 'ID de sección (ancla) del botón', type: 'string', initialValue: 'contact' },
            ],
        }),
    ],
    preview: {
        select: { title: 'titleAccent', subtitle: 'description' },
        prepare({ title, subtitle }) {
            return { title: `Servicios: ${title ?? 'sin título'}`, subtitle }
        },
    },
})
