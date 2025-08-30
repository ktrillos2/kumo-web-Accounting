import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export async function generateMetadata(): Promise<Metadata> {
  try {
    const general = await client.fetch(`*[_type=="generalSettings" && _id=="general-settings-singleton"][0]{logo,companyName,description}`)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    const titleDefault = general?.companyName ? `${general.companyName} - Servicios Contables y Tributarios` : "TN Accounting - Servicios Contables y Tributarios"
    const description = general?.description || "Empresa especializada en servicios contables, tributarios y revisoría fiscal con alianzas estratégicas."
    const logoUrl = general?.logo ? urlFor(general.logo).width(500).height(500).format('png').url() : null
    return {
      metadataBase: new URL(siteUrl),
      title: {
        default: titleDefault,
        template: `%s | ${general?.companyName ?? "TN Accounting"}`,
      },
      description,
      keywords: [
        "contabilidad",
        "servicios contables",
        "asesoría tributaria",
        "revisoría fiscal",
        "consultoría financiera",
        "nómina",
        "impuestos",
        "Colombia",
      ],
      alternates: {
        canonical: siteUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      },
      openGraph: {
        type: 'website',
        locale: 'es_CO',
        url: siteUrl,
        siteName: general?.companyName ?? 'TN Accounting',
        title: titleDefault,
        description,
        images: logoUrl ? [{ url: logoUrl, width: 1200, height: 630, alt: general?.companyName ?? 'TN Accounting' }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: titleDefault,
        description,
        images: logoUrl ? [logoUrl] : undefined,
      },
      icons: await (async () => {
        if (!logoUrl) return undefined
        // Intento best-effort: invertir colores con sharp si está disponible en la plataforma.
        try {
          const sharpMod = await import('sharp').catch(() => null as any)
          if (!sharpMod) {
            // Fallback: usa el logo original sin invertir
            return { icon: [{ url: logoUrl }], shortcut: [{ url: logoUrl }], apple: [{ url: logoUrl }] }
          }
          const sharp = (sharpMod.default ?? sharpMod) as typeof import('sharp')
          const resp = await fetch(logoUrl)
          if (!resp.ok) return { icon: [{ url: logoUrl }], shortcut: [{ url: logoUrl }], apple: [{ url: logoUrl }] }
          const buf = Buffer.from(await resp.arrayBuffer())
          const out = await sharp(buf).negate({ alpha: false }).png().toBuffer()
          const dataUrl = `data:image/png;base64,${out.toString('base64')}`
          return { icon: [{ url: dataUrl }], shortcut: [{ url: dataUrl }], apple: [{ url: dataUrl }] }
        } catch {
          // Fallback: usa el logo original
          return { icon: [{ url: logoUrl }], shortcut: [{ url: logoUrl }], apple: [{ url: logoUrl }] }
        }
      })(),
    }
  } catch {
    return {
      title: {
        default: "TN Accounting - Servicios Contables y Tributarios",
        template: "%s | TN Accounting",
      },
      description: "Empresa especializada en servicios contables, tributarios y revisoría fiscal con alianzas estratégicas.",
      robots: { index: true, follow: true },
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfairDisplay.variable} ${inter.variable} antialiased dark`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
