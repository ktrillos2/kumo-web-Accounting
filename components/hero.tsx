"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  FileText,
  PieChart,
  BarChart3,
  Receipt,
  DollarSign,
  Building2,
  Users,
  Target,
  Briefcase,
  CreditCard,
} from "lucide-react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background pt-24 sm:pt-28 lg:pt-24 pb-20 scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient waves */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-slide-right"
            style={{ animationDuration: "15s" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-l from-transparent via-accent/5 to-transparent animate-slide-left"
            style={{ animationDuration: "20s", animationDelay: "5s" }}
          />
        </div>

        {/* Subtle floating gradient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-accent/3 to-transparent rounded-full blur-3xl animate-float"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-accent/5 to-transparent rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s", animationDuration: "10s" }}
        />

        {/* Subtle floating gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Iconos existentes en accent */}
          <Calculator
            className="absolute top-20 left-10 w-8 h-8 text-accent/20 animate-float-slow"
            style={{ animationDelay: "0s", animationDuration: "12s" }}
          />
          <TrendingUp
            className="absolute top-32 right-16 w-10 h-10 text-accent/15 animate-float-slow"
            style={{ animationDelay: "2s", animationDuration: "14s" }}
          />
          <FileText
            className="absolute bottom-40 left-20 w-7 h-7 text-accent/25 animate-float-slow"
            style={{ animationDelay: "4s", animationDuration: "16s" }}
          />
          <PieChart
            className="absolute top-1/2 left-8 w-9 h-9 text-accent/20 animate-float-slow"
            style={{ animationDelay: "6s", animationDuration: "13s" }}
          />
          <BarChart3
            className="absolute bottom-32 right-12 w-8 h-8 text-accent/18 animate-float-slow"
            style={{ animationDelay: "8s", animationDuration: "15s" }}
          />
          <Receipt
            className="absolute top-40 right-32 w-6 h-6 text-accent/22 animate-float-slow"
            style={{ animationDelay: "10s", animationDuration: "11s" }}
          />

          {/* Nuevos iconos en negro muy claro */}
          <DollarSign
            className="absolute top-16 right-8 w-7 h-7 text-black/8 animate-float-slow"
            style={{ animationDelay: "1s", animationDuration: "18s" }}
          />
          <Building2
            className="absolute bottom-20 left-32 w-8 h-8 text-black/10 animate-float-slow"
            style={{ animationDelay: "3s", animationDuration: "17s" }}
          />
          <Users
            className="absolute top-1/3 right-20 w-6 h-6 text-black/7 animate-float-slow"
            style={{ animationDelay: "5s", animationDuration: "19s" }}
          />
          <Target
            className="absolute bottom-1/3 left-16 w-7 h-7 text-black/9 animate-float-slow"
            style={{ animationDelay: "7s", animationDuration: "14s" }}
          />
          <Briefcase
            className="absolute top-24 left-1/3 w-8 h-8 text-black/8 animate-float-slow"
            style={{ animationDelay: "9s", animationDuration: "16s" }}
          />
          <CreditCard
            className="absolute bottom-16 right-1/4 w-6 h-6 text-black/6 animate-float-slow"
            style={{ animationDelay: "11s", animationDuration: "20s" }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          {/* Main Content */}
          <div
            className={`space-y-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-foreground leading-tight max-w-5xl mx-auto">
                <span className="block">Servicios</span>
                <span className="text-accent block">Contables</span>
                <span className="block">Profesionales</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Más de 15 años brindando soluciones integrales en contabilidad, tributación y revisoría fiscal
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 hover-lift group px-8 py-4 text-lg cursor-pointer"
              >
                Consulta Gratuita
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("services")}
                className="border-accent text-accent hover:bg-accent hover:text-white hover-lift px-8 py-4 text-lg cursor-pointer"
              >
                Ver Servicios
              </Button>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto ${isVisible ? "animate-fade-in-up animate-delay-300" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">15+</div>
              <div className="text-lg text-muted-foreground">Años de Experiencia</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">500+</div>
              <div className="text-lg text-muted-foreground">Clientes Satisfechos</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">99%</div>
              <div className="text-lg text-muted-foreground">Tasa de Éxito</div>
            </div>
          </div>

          <div
            className={`pt-16 ${isVisible ? "animate-fade-in-up animate-delay-500" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm text-muted-foreground">Descubre más</span>
              <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
                <div className="w-1 h-3 bg-accent rounded-full animate-bounce mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
