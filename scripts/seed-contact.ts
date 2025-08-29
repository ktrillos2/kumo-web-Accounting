import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { createClient } from 'next-sanity'

const envLocalPath = path.resolve('.env.local')
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath })
} else {
    dotenv.config()
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-28'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !dataset) {
    console.error('Faltan variables NEXT_PUBLIC_SANITY_PROJECT_ID o NEXT_PUBLIC_SANITY_DATASET')
    process.exit(1)
}
if (!token) {
    console.error('Falta SANITY_WRITE_TOKEN en el entorno')
    process.exit(1)
}

const block = (text: string) => ({ _type: 'block', style: 'normal', markDefs: [], children: [{ _type: 'span', text, marks: [] }] })

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token })

async function run() {
    const docId = 'contactSection'
    const doc = {
        _id: docId,
        _type: 'contactSection',
        titlePrefix: 'Hablemos de tu',
        titleAccent: 'Futuro Financiero',
        intro: [block('Nuestro equipo de expertos está listo para transformar la gestión contable y tributaria de tu empresa')],
        form: {
            title: 'Solicita tu Consulta Gratuita',
            subtitle: [block('Completa el formulario y te contactaremos en menos de 24 horas')],
            submitLabel: 'Enviar Consulta',
            successTitle: '¡Mensaje Enviado!',
            successMessage: [block('Gracias por contactarnos. Te responderemos en las próximas 24 horas.')],
            fields: {
                name: { label: 'Nombre Completo *', placeholder: 'Tu nombre completo' },
                email: { label: 'Email *', placeholder: 'tu@email.com' },
                phone: { label: 'Teléfono', placeholder: '+57 300 123 4567' },
                company: { label: 'Empresa', placeholder: 'Nombre de tu empresa' },
                message: { label: 'Cuéntanos sobre tus necesidades *', placeholder: 'Describe los servicios contables y tributarios que necesitas para tu empresa...' },
            },
        },
        infoLabels: {
            phone: 'Teléfono',
            email: 'Email',
            location: 'Ubicación',
            schedule: 'Horario',
        },
        cta: {
            title: '¿Necesitas Atención Inmediata?',
            description: [block('Nuestro equipo está disponible para atenderte de inmediato')],
            callLabel: 'Llamar Ahora',
            emailLabel: 'Enviar Email',
        },
    }

    await client.createOrReplace(doc)
    console.log('Seed de contactSection completado ✅')
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
