export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-28'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const hasSanityCreds = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET
)

if (!hasSanityCreds && typeof window === 'undefined') {
  console.warn('[sanity] Falta NEXT_PUBLIC_SANITY_PROJECT_ID o NEXT_PUBLIC_SANITY_DATASET. Usando valores de respaldo para compilar.')
}
