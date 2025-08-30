"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { toTelHref } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"

type GeneralSettings = {
  companyName: string
  logo?: any
  address?: string
  schedule?: string
  phones?: string[]
  emails?: string[]
}

type HeaderConfig = {
  menuItems: { label: string; sectionId: string }[]
  cta?: { label: string; sectionId: string }
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoader, setShowLoader] = useState(true)
  const [loaderPhase, setLoaderPhase] = useState<'idle' | 'exit'>('idle')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const [general, setGeneral] = useState<GeneralSettings | null>(null)
  const [headerCfg, setHeaderCfg] = useState<HeaderConfig | null>(null)

  useEffect(() => {
    let mounted = true
    const run = async () => {
      try {
        setIsLoading(true)
        const [generalResp, headerResp] = await Promise.all([
          client.fetch(`*[_type=="generalSettings" && _id=="general-settings-singleton"][0]{companyName,logo,address,schedule,phones,emails}`),
          client.fetch(`*[_type=="header" && _id=="header-singleton"][0]{menuItems,cta}`),
        ])
        if (!mounted) return
        setGeneral((generalResp as any) ?? null)
        setHeaderCfg((headerResp as any) ?? null)
      } catch (e) {
        // noop
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    run()
    return () => { mounted = false }
  }, [])

  // Al terminar de cargar, disparar fade-out y desmontar luego
  useEffect(() => {
    if (!isLoading && showLoader) {
      setLoaderPhase('exit')
      const t = setTimeout(() => setShowLoader(false), 250) // debe coincidir con duration-200
      return () => clearTimeout(t)
    }
  }, [isLoading, showLoader])

  // Nota: Usamos header sticky para evitar saltos del contenido.

  return (
    <>
      {showLoader && (
        <div
          className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-200 ${loaderPhase === 'exit' ? 'opacity-0' : 'opacity-100'}`}
          aria-busy="true"
          aria-live="polite"
        >
          <div className="relative flex items-center justify-center">
            {/* Halo dorado suave */}
            <div className="absolute -inset-8 rounded-full bg-[#D4AF37]/10 blur-2xl" />

            {/* Anillo exterior (negro + dorado) */}
            <div className="animate-[spin_0.8s_linear_infinite] rounded-full w-36 h-36 border-4 border-black/30 border-t-[#D4AF37]" />

            {/* Anillo interior con otra velocidad */}
            <div className="absolute rounded-full w-24 h-24 border-4 border-[#D4AF37]/70 border-l-black animate-[spin_1s_linear_infinite]" />

            {/* Puntos orbitando */}
            <div className="absolute w-44 h-44 animate-[spin_3s_linear_infinite]">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black shadow-[0_0_6px_rgba(0,0,0,0.4)]" />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
            </div>

            {/* Logo centrado */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={general?.logo ? urlFor(general.logo).width(96).height(96).url() : "/logo.png"}
                alt={general?.companyName || "Logo"}
                width={96}
                height={96}
                className="object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.35)]"
                priority
              />
            </div>
          </div>
        </div>
      )}
  {/* Top contact bar (colapsa suavemente al hacer scroll) */}
      <div
        className={`bg-primary text-primary-foreground px-4 overflow-hidden transition-[max-height,opacity] duration-300 ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100 py-2'}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a
              href={`tel:${toTelHref(general?.phones?.[0] ?? "+57 (1) 234-5678")}`}
              className="flex items-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-accent rounded-sm"
              aria-label={`Llamar al ${general?.phones?.[0] ?? "+57 (1) 234-5678"}`}
            >
              <Phone className="w-4 h-4" />
              <span>{general?.phones?.[0] ?? "+57 (1) 234-5678"}</span>
            </a>
            <a
              href={`mailto:${general?.emails?.[0] ?? "contacto@tnaccounting.com"}`}
              className="flex items-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-accent rounded-sm"
              aria-label={`Enviar correo a ${general?.emails?.[0] ?? "contacto@tnaccounting.com"}`}
            >
              <Mail className="w-4 h-4" />
              <span>{general?.emails?.[0] ?? "contacto@tnaccounting.com"}</span>
            </a>
          </div>
          <div className="hidden md:block">
            <span>{general?.schedule ? `Horario: ${general.schedule}` : 'Horario: Lun - Vie 8:00 AM - 6:00 PM'}</span>
          </div>
        </div>
      </div>

      {/* Main header (sticky) */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white border-b border-border'}`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${isScrolled ? "py-2" : "py-0"
            }`}
        >
          <div
            className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? "h-18" : "h-24"}`}
          >
            {/* Logo */}
            <div
              className={`flex-shrink-0 cursor-pointer ${isScrolled ? "p-1" : "p-3"}`}
              onClick={() => scrollToSection("hero")}
            >
              <Image
                src={general?.logo ? urlFor(general.logo).width(240).url() : "/logo.png"}
                alt={general?.companyName || "TN Accounting"}
                width={240}
                height={120}
                className={`w-auto hover:scale-105 transition-all duration-500 ${isScrolled ? "h-16 max-h-16" : "h-18 max-h-18"}`}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {(headerCfg?.menuItems ?? [
                { label: "Inicio", sectionId: "hero" },
                { label: "Servicios", sectionId: "services" },
                { label: "Nosotros", sectionId: "about" },
                { label: "Alianzas", sectionId: "alliances" },
                { label: "Testimonios", sectionId: "testimonials" },
                { label: "Contacto", sectionId: "contact" },
              ]).map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-black font-medium transition-all duration-300 px-4 py-3 cursor-pointer relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection(headerCfg?.cta?.sectionId ?? "contact")}
                className={`bg-accent text-accent-foreground hover:bg-accent/90 hover-lift transition-all duration-300 ${isScrolled ? "px-4 py-2 text-sm" : "px-6 py-2"
                  }`}
              >
                {headerCfg?.cta?.label ?? 'Consulta Gratuita'}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-black hover:text-accent transition-colors duration-300"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-border animate-fade-in-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {(headerCfg?.menuItems ?? [
                { label: "Inicio", sectionId: "hero" },
                { label: "Nosotros", sectionId: "about" },
                { label: "Servicios", sectionId: "services" },
                { label: "Alianzas", sectionId: "alliances" },
                { label: "Testimonios", sectionId: "testimonials" },
                { label: "Contacto", sectionId: "contact" },
              ]).map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="block w-full text-left px-4 py-3 text-black hover:text-accent hover:bg-muted rounded-md transition-colors duration-300 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => scrollToSection(headerCfg?.cta?.sectionId ?? "contact")}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {headerCfg?.cta?.label ?? 'Consulta Gratuita'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
