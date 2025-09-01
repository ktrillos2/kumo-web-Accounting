import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  // Rutas estáticas principales del sitio (sin anchors #, Google no indexa fragmentos)
  const routes = ['']

  const now = new Date()
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1.0 : 0.6,
  }))
}
