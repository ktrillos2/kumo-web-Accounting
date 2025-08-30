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
    const hasLogo = Boolean(general?.logo)
    return {
      title: "TN Accounting - Servicios Contables y Tributarios",
      description:
        "Empresa especializada en servicios contables, tributarios y revisoría fiscal con alianzas estratégicas.",
      generator: 'v0.app',
      icons: {
        icon: [{ url: '/api/favicon' }],
        shortcut: [{ url: '/api/favicon' }],
        apple: [{ url: '/api/favicon' }],
      },
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
