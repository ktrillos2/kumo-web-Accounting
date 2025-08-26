import type React from "react"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

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

export const metadata = {
  title: "TN Accounting - Servicios Contables y Tributarios",
  description:
    "Empresa especializada en servicios contables, tributarios y revisoría fiscal con alianzas estratégicas.",
    generator: 'v0.app'
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
