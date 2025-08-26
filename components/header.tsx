"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  return (
    <>
      {/* Top contact bar */}
      <div
        className={`bg-primary text-primary-foreground py-2 px-4 transition-all duration-500 ${isScrolled ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+57 (1) 234-5678</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>contacto@tnaccounting.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Horario: Lun - Vie 8:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`transition-all duration-500 ease-in-out ${isScrolled
          ? "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg transform translate-y-0"
          : "relative bg-white border-b border-border"
          }`}
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
                src="/logo.png"
                alt="TN Accounting"
                width={240}
                height={120}
                className={`w-auto hover:scale-105 transition-all duration-500 ${isScrolled ? "h-16 max-h-16" : "h-18 max-h-18"
                  }`}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {[
                { name: "Inicio", id: "hero" },
                { name: "Servicios", id: "services" },
                { name: "Nosotros", id: "about" },
                { name: "Alianzas", id: "alliances" },
                { name: "Testimonios", id: "testimonials" },
                { name: "Contacto", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-black font-medium transition-all duration-300 px-4 py-3 cursor-pointer relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection("contact")}
                className={`bg-accent text-accent-foreground hover:bg-accent/90 hover-lift transition-all duration-300 ${isScrolled ? "px-4 py-2 text-sm" : "px-6 py-2"
                  }`}
              >
                Consulta Gratuita
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
              {[
                { name: "Inicio", id: "hero" },
                { name: "Nosotros", id: "about" },
                { name: "Servicios", id: "services" },
                { name: "Alianzas", id: "alliances" },
                { name: "Testimonios", id: "testimonials" },
                { name: "Contacto", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-black hover:text-accent hover:bg-muted rounded-md transition-colors duration-300 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Consulta Gratuita
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
