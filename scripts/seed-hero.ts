import fs from 'node:fs'
import path from 'node:path'
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'

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

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token })

async function upsertHero() {
    const docId = 'hero-singleton'
    const doc = {
        _id: docId,
        _type: 'hero',
        titleTop: 'Servicios',
        titleAccent: 'Contables',
        titleBottom: 'Profesionales',
        description: 'Más de 15 años brindando soluciones integrales en contabilidad, tributación y revisoría fiscal',
        primaryCta: { label: 'Consulta Gratuita', sectionId: 'contact' },
        secondaryCta: { label: 'Ver Servicios', sectionId: 'services' },
        stats: [
            { value: '15+', label: 'Años de Experiencia' },
            { value: '500+', label: 'Clientes Satisfechos' },
            { value: '99%', label: 'Tasa de Éxito' },
        ],
        showScrollHint: true,
        scrollHintLabel: 'Descubre más',
    }

    await client.createIfNotExists({ _id: docId, _type: 'hero' })
    await client.patch(docId).set(doc).commit()
    console.log('Hero configurado/actualizado')
}

upsertHero().catch((e) => {
    console.error('Error al sembrar hero:', e)
    process.exit(1)
})
