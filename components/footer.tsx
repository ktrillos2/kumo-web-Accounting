"use client"

import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Youtube, MessageCircle, X as TwitterX, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

type Social = { platform: string; url: string }
type General = {
  companyName?: string
  logo?: any
  description?: string
  address?: string
  schedule?: string
  phones?: string[]
  emails?: string[]
  socials?: Social[]
}
type FooterSettings = {
  quickLinksTitle?: string
  quickLinks?: { label: string; sectionId: string }[]
  servicesTitle?: string
  services?: string[]
  contactTitle?: string
  copyright?: string
}

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [general, setGeneral] = useState<General | null>(null)
  const [footerCfg, setFooterCfg] = useState<FooterSettings | null>(null)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    let mounted = true
    const run = async () => {
      try {
        const data = await client.fetch(`*[_type=="generalSettings" && _id=="general-settings-singleton"][0]{companyName,logo,description,address,schedule,phones,emails,socials}`)
        if (!mounted) return
        setGeneral(data ?? null)
      } catch (e) {
        // noop
      }
    }
    run()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    let mounted = true
    const run = async () => {
      try {
        const data = await client.fetch(`*[_type=="footerSettings" && _id=="footerSettings"][0]{quickLinksTitle,quickLinks,label,servicesTitle,services,contactTitle,copyright}`)
        if (!mounted) return
        setFooterCfg(data ?? null)
      } catch (e) {
        // noop
      }
    }
    run()
    return () => { mounted = false }
  }, [])

  const socials = (general?.socials || []).filter((s) => s?.url)

  const SocialIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case 'facebook': return <Facebook className="w-5 h-5 text-accent-foreground" />
      case 'instagram': return <Instagram className="w-5 h-5 text-accent-foreground" />
      case 'twitter':
      case 'x':
        return <TwitterX className="w-5 h-5 text-accent-foreground" />
      case 'linkedin': return <Linkedin className="w-5 h-5 text-accent-foreground" />
      case 'youtube': return <Youtube className="w-5 h-5 text-accent-foreground" />
      case 'tiktok': return <MessageCircle className="w-5 h-5 text-accent-foreground" />
      case 'whatsapp': return <MessageCircle className="w-5 h-5 text-accent-foreground" />
      default: return <MessageCircle className="w-5 h-5 text-accent-foreground" />
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <Image
                src={general?.logo ? urlFor(general.logo).width(240).url() : "/logo.png"}
                alt={general?.companyName || "TN Accounting"}
                width={120}
                height={60}
                className="h-22 w-auto mb-4 "
              />
              <p className="text-primary-foreground/80 leading-relaxed">
                {general?.description ?? 'Más de 15 años brindando servicios contables y tributarios de excelencia, comprometidos con el crecimiento de nuestros clientes.'}
              </p>
            </div>

            {/* Social Media */}
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={`${s.platform}-${s.url}`}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label={s.platform}
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">{footerCfg?.quickLinksTitle ?? 'Enlaces Rápidos'}</h3>
            <ul className="space-y-3">
              {(footerCfg?.quickLinks ?? [
                { label: "Inicio", sectionId: "hero" },
                { label: "Nosotros", sectionId: "about" },
                { label: "Servicios", sectionId: "services" },
                { label: "Alianzas", sectionId: "alliances" },
                { label: "Testimonios", sectionId: "testimonials" },
                { label: "Contacto", sectionId: "contact" },
              ]).map((link) => (
                <li key={link.sectionId}>
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">{footerCfg?.servicesTitle ?? 'Servicios'}</h3>
            <ul className="space-y-3">
              {(footerCfg?.services ?? [
                'Contabilidad Integral', 'Asesoría Tributaria', 'Revisoría Fiscal', 'Consultoría Financiera', 'Nómina y RRHH', 'Capacitación',
              ]).map((s, idx) => (
                <li className="text-primary-foreground/80" key={idx}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">{footerCfg?.contactTitle ?? 'Contacto'}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                <div className="min-w-0">
                  <p className="text-primary-foreground/80 leading-relaxed">{general?.phones?.[0] ?? "+57 (1) 234-5678"}</p>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed">{general?.schedule ?? "Lun - Vie: 8:00 AM - 6:00 PM"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                <div className="min-w-0">
                  <a
                    href={`mailto:${general?.emails?.[0] ?? 'contacto@tnaccounting.com'}`}
                    className="text-primary-foreground/80 hover:text-accent transition-colors break-all leading-relaxed"
                  >
                    {general?.emails?.[0] ?? 'contacto@tnaccounting.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                <div className="min-w-0">
                  <p className="text-primary-foreground/80 whitespace-pre-line leading-relaxed break-words">
                    {general?.address ?? 'Calle 123 #45-67\nBogotá, Colombia'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center gap-4">
            <div className="text-primary-foreground/60 text-sm text-center">
              © {new Date().getFullYear()} {general?.companyName ?? 'TN Accounting'}. {footerCfg?.copyright ?? 'Todos los derechos reservados.'}
            </div>


          </div>
        </div>
      </div>

      {/* Floating Scroll To Top Button */}
      <Button
        aria-label="Volver arriba"
        onClick={scrollToTop}
        size="icon"
        className={`fixed bottom-8 right-8 z-50 bg-black border-2 border-accent text-accent hover:bg-black/90 shadow-lg rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer animate-bob ${showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <ArrowUp className="w-5 h-5 text-accent" />
      </Button>
    </footer>
  )
}
