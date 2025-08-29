/*
  Script: seed-footer.ts
  Descripción: Crea/actualiza el documento de configuración del Footer en Sanity.
*/
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

async function upsertFooter() {
    const docId = 'footerSettings'
    const doc = {
        _id: docId,
        _type: 'footerSettings',
        quickLinksTitle: 'Enlaces Rápidos',
        quickLinks: [
            { _key: 'hero', label: 'Inicio', sectionId: 'hero' },
            { _key: 'about', label: 'Nosotros', sectionId: 'about' },
            { _key: 'services', label: 'Servicios', sectionId: 'services' },
            { _key: 'alliances', label: 'Alianzas', sectionId: 'alliances' },
            { _key: 'testimonials', label: 'Testimonios', sectionId: 'testimonials' },
            { _key: 'contact', label: 'Contacto', sectionId: 'contact' },
        ],
        servicesTitle: 'Servicios',
        services: [
            'Contabilidad Integral',
            'Asesoría Tributaria',
            'Revisoría Fiscal',
            'Consultoría Financiera',
            'Nómina y RRHH',
            'Capacitación',
        ],
        contactTitle: 'Contacto',
        copyright: 'Todos los derechos reservados.',
    }

    await client.createIfNotExists({ _id: docId, _type: 'footerSettings' })
    await client.patch(docId).set(doc).commit()
    console.log('Footer settings sembrado/actualizado')
}

upsertFooter().catch((e) => { console.error(e); process.exit(1) })
