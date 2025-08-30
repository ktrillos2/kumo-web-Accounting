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
    const general = await client.fetch(`*[_type=="generalSettings" && _id=="general-settings-singleton"][0]{logo}`)
    const logoUrl = general?.logo ? urlFor(general.logo).width(64).height(64).format('png').url() : null
    return {
      title: "TN Accounting - Servicios Contables y Tributarios",
      description:
        "Empresa especializada en servicios contables, tributarios y revisoría fiscal con alianzas estratégicas.",
      
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
      title: "TN Accounting - Servicios Contables y Tributarios",
      description:
        "Empresa especializada en servicios contables, tributarios y revisoría fiscal con alianzas estratégicas.",
      
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
