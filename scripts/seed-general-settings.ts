/*
  Script: seed-general-settings.ts
  Descripción: Crea/actualiza el documento de "Información general" en Sanity y sube el logo desde public/logo.png si existe.

  Requisitos de entorno:
  - NEXT_PUBLIC_SANITY_PROJECT_ID
  - NEXT_PUBLIC_SANITY_DATASET
  - NEXT_PUBLIC_SANITY_API_VERSION (opcional)
  - SANITY_WRITE_TOKEN (token con permisos de write)
*/

import fs from 'node:fs'
import path from 'node:path'
import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import dotenv from 'dotenv'

// Cargar .env.local si existe, luego .env
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

const client = createClient({projectId, dataset, apiVersion, useCdn: false, token})
const builder = imageUrlBuilder({projectId, dataset})

async function uploadLogoIfExists() {
  const possiblePaths = ['public/logo.png', 'public/placeholder-logo.png', 'public/placeholder-logo.jpg', 'public/placeholder-logo.svg']
  for (const rel of possiblePaths) {
    const abs = path.resolve(rel)
    if (fs.existsSync(abs)) {
      const fileExt = path.extname(abs).toLowerCase()
      const contentType = fileExt === '.png' ? 'image/png' : fileExt === '.jpg' || fileExt === '.jpeg' ? 'image/jpeg' : fileExt === '.svg' ? 'image/svg+xml' : 'application/octet-stream'
      const stream = fs.createReadStream(abs)
      const asset = await client.assets.upload('image', stream, {filename: path.basename(abs), contentType})
      return asset
    }
  }
  return null
}

async function upsertGeneralSettings() {
  try {
    const asset = await uploadLogoIfExists()

    const docId = 'general-settings-singleton'
    const doc = {
      _id: docId,
      _type: 'generalSettings',
      companyName: 'Kumo Accounting',
      description: 'Somos una firma de contabilidad enfocada en optimizar tus finanzas con soluciones modernas y cercanas.',
      address: 'Av. Principal 123, Bogotá, Colombia',
      schedule: 'Lun–Vie 8:00–18:00',
      phones: ['+57 300 000 0000', '+57 1 123 4567'],
      emails: ['contacto@kumo.com', 'soporte@kumo.com'],
  social: {
        facebook: 'https://facebook.com/kumo',
        instagram: 'https://instagram.com/kumo',
        twitter: 'https://x.com/kumo',
        linkedin: 'https://linkedin.com/company/kumo',
        youtube: 'https://youtube.com/@kumo',
        tiktok: 'https://tiktok.com/@kumo',
        whatsapp: 'https://wa.me/573000000000',
      },
      logo: asset ? { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } : undefined,
    }

    // Usar createIfNotExists para asegurar singleton y luego patch para actualizar campos
    await client.createIfNotExists({_id: docId, _type: 'generalSettings', companyName: doc.companyName})
  const patch = client.patch(docId).set(doc).unset(['mapsUrl'])
  await patch.commit()

    const logoUrl = doc.logo ? builder.image(doc.logo).width(200).url() : '(sin logo)'
    console.log('Información general actualizada. Logo:', logoUrl)
  } catch (err) {
    console.error('Error al sembrar información general:', err)
    process.exit(1)
  }
}

upsertGeneralSettings()
