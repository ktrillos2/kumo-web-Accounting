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
    const docId = 'testimonialsSection'
    const testimonials = [
        {
            _key: 'maria-gonzalez',
            name: 'María González',
            position: 'Gerente General',
            company: 'Comercializadora ABC',
            content: [block('TN Accounting ha sido fundamental en el crecimiento de nuestra empresa. Su asesoría tributaria nos ha permitido optimizar nuestros recursos y cumplir con todas las obligaciones fiscales.')],
            rating: 5,
        },
        {
            _key: 'carlos-rodriguez',
            name: 'Carlos Rodríguez',
            position: 'Director Financiero',
            company: 'Industrias XYZ',
            content: [block('La calidad del servicio y la atención personalizada que recibimos es excepcional. Su equipo siempre está disponible para resolver nuestras consultas de manera oportuna.')],
            rating: 5,
        },
        {
            _key: 'ana-martinez',
            name: 'Ana Martínez',
            position: 'Propietaria',
            company: 'Restaurante El Buen Sabor',
            content: [block('Como pequeña empresaria, necesitaba un servicio confiable y accesible. TN Accounting me ha brindado la tranquilidad de tener mis finanzas en orden.')],
            rating: 5,
        },
        {
            _key: 'luis-herrera',
            name: 'Luis Herrera',
            position: 'CEO',
            company: 'Tech Solutions',
            content: [block('Su conocimiento en normatividad y su capacidad para adaptarse a las necesidades de empresas tecnológicas los convierte en nuestro aliado estratégico ideal.')],
            rating: 5,
        },
    ]

    const doc = {
        _id: docId,
        _type: 'testimonialsSection',
        titlePrefix: 'Lo que Dicen Nuestros',
        titleAccent: 'Clientes',
        intro: [block('La satisfacción de nuestros clientes es nuestro mayor logro. Conoce sus experiencias trabajando con nosotros.')],
        testimonials,
        stats: [
            { _key: 'c1', value: '500+', label: 'Clientes Satisfechos' },
            { _key: 's1', value: '99%', label: 'Tasa de Satisfacción' },
            { _key: 'y1', value: '15+', label: 'Años de Experiencia' },
            { _key: 'h1', value: '24/7', label: 'Soporte Disponible' },
        ],
    }

    await client.createOrReplace(doc)
    console.log('Seed de testimonialsSection completado ✅')
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
