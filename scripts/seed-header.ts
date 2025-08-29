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

async function upsertHeader() {
  const docId = 'header-singleton'
  const doc = {
    _id: docId,
    _type: 'header',
    menuItems: [
      { label: 'Inicio', sectionId: 'hero' },
      { label: 'Servicios', sectionId: 'services' },
      { label: 'Nosotros', sectionId: 'about' },
      { label: 'Alianzas', sectionId: 'alliances' },
      { label: 'Testimonios', sectionId: 'testimonials' },
      { label: 'Contacto', sectionId: 'contact' },
    ],
    cta: { label: 'Consulta Gratuita', sectionId: 'contact' },
  }

  await client.createIfNotExists({ _id: docId, _type: 'header' })
  await client.patch(docId).set(doc).commit()
  console.log('Header configurado/actualizado')
}

upsertHeader().catch((e) => {
  console.error('Error al sembrar header:', e)
  process.exit(1)
})
