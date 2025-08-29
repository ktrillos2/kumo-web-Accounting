/*
  Script de seed para la sección "Nuestros servicios"
  Requiere variables de entorno SANITY_PROJECT_ID, SANITY_DATASET y SANITY_WRITE_TOKEN
*/
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
    const docId = 'servicesSection' // singleton
    const servicesDoc = {
        _id: docId,
        _type: 'servicesSection',
        titlePrefix: 'Nuestros',
        titleAccent: 'Servicios',
        description:
            'Soluciones contables integrales para impulsar el crecimiento y la estabilidad financiera de su negocio.',
        services: [
            {
                _key: 'contabilidad',
                icon: 'ReceiptText',
                title: 'Contabilidad General',
                description:
                    'Gestión completa de la contabilidad de tu empresa con exactitud y cumplimiento normativo.',
                features: [
                    'Registro y clasificación de transacciones',
                    'Conciliaciones bancarias mensuales',
                    'Elaboración de estados financieros',
                    'Análisis de resultados y recomendaciones',
                ],
            },
            {
                _key: 'impuestos',
                icon: 'Calculator',
                title: 'Asesoría Fiscal y Tributaria',
                description:
                    'Optimización fiscal y cumplimiento oportuno de tus obligaciones tributarias.',
                features: [
                    'Declaración de impuestos mensuales y anuales',
                    'Planificación fiscal estratégica',
                    'Atención y gestión ante requerimientos',
                    'Actualizaciones normativas',
                ],
            },
            {
                _key: 'nomina',
                icon: 'Users',
                title: 'Nómina y Recursos Humanos',
                description:
                    'Administración integral de nómina con cálculos precisos y cumplimiento legal.',
                features: [
                    'Cálculo y dispersión de nómina',
                    'Altas, bajas y modificaciones',
                    'IMSS, INFONAVIT y retenciones',
                    'Recibos y reportes',
                ],
            },
            {
                _key: 'auditoria',
                icon: 'ShieldCheck',
                title: 'Auditoría y Control Interno',
                description:
                    'Evaluación de procesos y controles para mitigar riesgos y fortalecer la operación.',
                features: [
                    'Revisión de políticas y procedimientos',
                    'Pruebas de control y cumplimiento',
                    'Recomendaciones de mejora',
                    'Informes ejecutivos',
                ],
            },
            {
                _key: 'finanzas',
                icon: 'LineChart',
                title: 'Finanzas Corporativas',
                description:
                    'Apoyo estratégico para una toma de decisiones informada y rentable.',
                features: [
                    'Presupuestos y proyecciones',
                    'Modelos financieros',
                    'Indicadores y dashboards',
                    'Análisis de rentabilidad',
                ],
            },
            {
                _key: 'constitucion',
                icon: 'Building2',
                title: 'Constitución y Regularización',
                description:
                    'Acompañamiento en la creación o regularización legal y fiscal de tu empresa.',
                features: [
                    'Trámites de alta y permisos',
                    'Regularización de obligaciones',
                    'Cambios de régimen',
                    'Asesoría legal básica',
                ],
            },
        ],
        cta: {
            titlePrefix: '¿Necesita una',
            titleAccent: 'Consulta Personalizada',
            titleSuffix: '?',
            description:
                'Hable con un especialista para evaluar su situación y diseñar un plan a la medida.',
            buttonLabel: 'Solicitar Consulta Gratuita',
            buttonSectionId: 'contact',
        },
    }

    await client.createOrReplace(servicesDoc)
    console.log('Seed de servicesSection completado ✅')
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
