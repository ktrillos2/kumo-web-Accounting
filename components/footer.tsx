"use client"

import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
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

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <Image
                src="/logo.png"
                alt="TN Accounting"
                width={120}
                height={60}
                className="h-22 w-auto mb-4 "
              />
              <p className="text-primary-foreground/80 leading-relaxed">
                Más de 15 años brindando servicios contables y tributarios de excelencia, comprometidos con el
                crecimiento de nuestros clientes.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Facebook className="w-5 h-5 text-accent-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Twitter className="w-5 h-5 text-accent-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Linkedin className="w-5 h-5 text-accent-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram className="w-5 h-5 text-accent-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: "Inicio", id: "hero" },
                { name: "Nosotros", id: "about" },
                { name: "Servicios", id: "services" },
                { name: "Alianzas", id: "alliances" },
                { name: "Testimonios", id: "testimonials" },
                { name: "Contacto", id: "contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Servicios</h3>
            <ul className="space-y-3">
              <li className="text-primary-foreground/80">Contabilidad Integral</li>
              <li className="text-primary-foreground/80">Asesoría Tributaria</li>
              <li className="text-primary-foreground/80">Revisoría Fiscal</li>
              <li className="text-primary-foreground/80">Consultoría Financiera</li>
              <li className="text-primary-foreground/80">Nómina y RRHH</li>
              <li className="text-primary-foreground/80">Capacitación</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary-foreground/80">+57 (1) 234-5678</p>
                  <p className="text-sm text-primary-foreground/60">Lun - Vie: 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <a
                    href="mailto:contacto@tnaccounting.com"
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    contacto@tnaccounting.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary-foreground/80">
                    Calle 123 #45-67
                    <br />
                    Bogotá, Colombia
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
              © 2024 TN Accounting. Todos los derechos reservados.
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
