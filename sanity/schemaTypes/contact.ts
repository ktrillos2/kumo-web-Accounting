import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'contactSection',
    title: 'Sección: Contacto',
    type: 'document',
    fields: [
        defineField({ name: 'titlePrefix', title: 'Título (prefijo)', type: 'string', initialValue: 'Hablemos de tu' }),
        defineField({ name: 'titleAccent', title: 'Título (acentuado)', type: 'string', initialValue: 'Futuro Financiero' }),
        defineField({ name: 'intro', title: 'Introducción', type: 'array', of: [{ type: 'block' }] }),
        defineField({
            name: 'form',
            title: 'Formulario',
            type: 'object',
            fields: [
                { name: 'title', title: 'Título', type: 'string', initialValue: 'Solicita tu Consulta Gratuita' },
                { name: 'subtitle', title: 'Subtítulo', type: 'array', of: [{ type: 'block' }] },
                { name: 'submitLabel', title: 'Texto del botón Enviar', type: 'string', initialValue: 'Enviar Consulta' },
                { name: 'successTitle', title: 'Título de éxito', type: 'string', initialValue: '¡Mensaje Enviado!' },
                { name: 'successMessage', title: 'Mensaje de éxito', type: 'array', of: [{ type: 'block' }] },
                defineField({
                    name: 'fields',
                    title: 'Campos del formulario',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Nombre',
                            type: 'object',
                            fields: [
                                { name: 'label', title: 'Etiqueta', type: 'string', initialValue: 'Nombre Completo *' },
                                { name: 'placeholder', title: 'Placeholder', type: 'string', initialValue: 'Tu nombre completo' },
                            ],
                        }),
                        defineField({
                            name: 'email',
                            title: 'Email',
                            type: 'object',
                            fields: [
                                { name: 'label', title: 'Etiqueta', type: 'string', initialValue: 'Email *' },
                                { name: 'placeholder', title: 'Placeholder', type: 'string', initialValue: 'tu@email.com' },
                            ],
                        }),
                        defineField({
                            name: 'phone',
                            title: 'Teléfono',
                            type: 'object',
                            fields: [
                                { name: 'label', title: 'Etiqueta', type: 'string', initialValue: 'Teléfono' },
                                { name: 'placeholder', title: 'Placeholder', type: 'string', initialValue: '+57 300 123 4567' },
                            ],
                        }),
                        defineField({
                            name: 'company',
                            title: 'Empresa',
                            type: 'object',
                            fields: [
                                { name: 'label', title: 'Etiqueta', type: 'string', initialValue: 'Empresa' },
                                { name: 'placeholder', title: 'Placeholder', type: 'string', initialValue: 'Nombre de tu empresa' },
                            ],
                        }),
                        defineField({
                            name: 'message',
                            title: 'Mensaje',
                            type: 'object',
                            fields: [
                                { name: 'label', title: 'Etiqueta', type: 'string', initialValue: 'Cuéntanos sobre tus necesidades *' },
                                { name: 'placeholder', title: 'Placeholder', type: 'string', initialValue: 'Describe los servicios contables y tributarios que necesitas para tu empresa...' },
                            ],
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: 'infoLabels',
            title: 'Etiquetas de información (datos reales vienen de Información General)',
            type: 'object',
            fields: [
                { name: 'phone', title: 'Etiqueta Teléfono', type: 'string', initialValue: 'Teléfono' },
                { name: 'email', title: 'Etiqueta Email', type: 'string', initialValue: 'Email' },
                { name: 'location', title: 'Etiqueta Ubicación', type: 'string', initialValue: 'Ubicación' },
                { name: 'schedule', title: 'Etiqueta Horario', type: 'string', initialValue: 'Horario' },
            ],
        }),
        defineField({
            name: 'cta',
            title: 'CTA inferior',
            type: 'object',
            fields: [
                { name: 'title', title: 'Título', type: 'string', initialValue: '¿Necesitas Atención Inmediata?' },
                { name: 'description', title: 'Descripción', type: 'array', of: [{ type: 'block' }] },
                { name: 'callLabel', title: 'Texto botón Llamar', type: 'string', initialValue: 'Llamar Ahora' },
                { name: 'emailLabel', title: 'Texto botón Email', type: 'string', initialValue: 'Enviar Email' },
            ],
        }),
    ],
    preview: {
        select: { title: 'titleAccent', subtitle: 'intro.0.children.0.text' },
        prepare({ title, subtitle }) {
            return { title: `Contacto: ${title ?? ''}`.trim(), subtitle }
        },
    },
})
