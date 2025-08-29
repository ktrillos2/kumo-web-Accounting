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

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token })

async function run() {
  const docId = 'aboutSection'
  const doc = {
    _id: docId,
    _type: 'aboutSection',
    titlePrefix: 'Sobre',
    titleAccent: 'Nosotros',
    intro: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text:
              'Somos una firma especializada en servicios contables y tributarios con más de 15 años de experiencia, comprometidos con el crecimiento y éxito de nuestros clientes.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    story: {
      title: 'Nuestra Historia',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text:
                'Fundada con la visión de brindar servicios contables y tributarios de la más alta calidad, TN Accounting ha crecido hasta convertirse en una firma de confianza para empresas de diversos sectores. Nuestro equipo de profesionales altamente capacitados combina experiencia tradicional con tecnología moderna para ofrecer soluciones integrales que impulsan el crecimiento de nuestros clientes.',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    },
    stats: [
      { value: '15+', label: 'Años de Experiencia' },
      { value: '500+', label: 'Clientes Atendidos' },
    ],
    mission: {
      title: 'Nuestra Misión',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text:
                'Proporcionar servicios contables y tributarios de excelencia, asesorando a nuestros clientes con profesionalismo, integridad y compromiso para contribuir al crecimiento sostenible de sus organizaciones.',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    },
    vision: {
      title: 'Nuestra Visión',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text:
                'Ser reconocidos como la firma líder en servicios contables y tributarios, caracterizada por la innovación, calidad de servicio y el desarrollo integral de nuestros clientes y colaboradores.',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    },
    values: [
      { _key: 'excelencia', icon: 'Award', title: 'Excelencia', description: 'Comprometidos con la calidad y precisión en cada servicio que ofrecemos.' },
      { _key: 'confianza', icon: 'Users', title: 'Confianza', description: 'Construimos relaciones duraderas basadas en la transparencia y honestidad.' },
      { _key: 'resultados', icon: 'Target', title: 'Resultados', description: 'Enfocados en generar valor y resultados tangibles para nuestros clientes.' },
      { _key: 'innovacion', icon: 'Lightbulb', title: 'Innovación', description: 'Utilizamos tecnología de vanguardia para optimizar nuestros procesos.' },
    ],
  }

  await client.createOrReplace(doc)
  console.log('Seed de aboutSection completado ✅')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
