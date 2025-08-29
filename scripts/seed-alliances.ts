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
  const docId = 'alliancesSection'
  const doc = {
    _id: docId,
    _type: 'alliancesSection',
    titlePrefix: 'Nuestras',
    titleAccent: 'Alianzas',
    intro: [block('Trabajamos con socios estratégicos para ofrecer servicios especializados y ampliar nuestro alcance profesional.')],
    alliances: [
      {
        _key: 'revFiscal',
        icon: 'Shield',
        title: 'Revisoría Fiscal Especializada',
        partner: 'Alianza Estratégica',
        description: [block('Contamos con una alianza sólida con una firma especializada en revisoría fiscal, garantizando servicios de auditoría y control de la más alta calidad.')],
        benefits: [
          'Revisores fiscales certificados',
          'Experiencia en múltiples sectores',
          'Cumplimiento normativo garantizado',
          'Informes detallados y oportunos',
        ],
      },
      {
        _key: 'redProfesionales',
        icon: 'Award',
        title: 'Red de Profesionales',
        partner: 'Colaboradores Expertos',
        description: [block('Trabajamos con una red de profesionales especializados en diferentes áreas para brindar servicios integrales y especializados.')],
        benefits: [
          'Abogados tributaristas',
          'Consultores financieros',
          'Especialistas en NIIF',
          'Expertos en tecnología',
        ],
      },
    ],
    highlight: {
      icon: 'Handshake',
      titlePrefix: 'Compromiso con la',
      titleAccent: 'Excelencia',
      description: [block('Nuestras alianzas estratégicas nos permiten ofrecer servicios especializados manteniendo los más altos estándares de calidad y profesionalismo.')],
    },
    features: [
      { _key: 'equipo', icon: 'Users', title: 'Equipo Ampliado', description: [block('Acceso a especialistas en múltiples disciplinas')] },
      { _key: 'calidad', icon: 'Shield', title: 'Calidad Garantizada', description: [block('Servicios respaldados por profesionales certificados')] },
      { _key: 'experiencia', icon: 'Award', title: 'Experiencia Comprobada', description: [block('Años de experiencia en servicios especializados')] },
    ],
  }

  await client.createOrReplace(doc)
  console.log('Seed de alliancesSection completado ✅')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
