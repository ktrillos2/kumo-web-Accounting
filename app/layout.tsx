import type React from "react"
import type { Metadata } from "next"
import sharp from 'sharp'
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
      generator: 'v0.app',
      icons: await (async () => {
        if (!logoUrl) return undefined
        try {
          const resp = await fetch(logoUrl)
          if (!resp.ok) return undefined
          const buf = Buffer.from(await resp.arrayBuffer())
          const out = await sharp(buf).negate({ alpha: false }).png().toBuffer()
          const dataUrl = `data:image/png;base64,${out.toString('base64')}`
          return {
            icon: [{ url: dataUrl }],
            shortcut: [{ url: dataUrl }],
            apple: [{ url: dataUrl }],
          }
        } catch {
          return undefined
        }
      })(),
    }
  } catch {
    return {
      title: "TN Accounting - Servicios Contables y Tributarios",
      description:
        "Empresa especializada en servicios contables, tributarios y revisoría fiscal con alianzas estratégicas.",
      generator: 'v0.app',
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
