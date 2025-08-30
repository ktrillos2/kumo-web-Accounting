"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, FileText, Shield, TrendingUp, Users, BookOpen, CheckCircle, ArrowRight } from "lucide-react"

const iconMap = {
  calculator: Calculator,
  "file-text": FileText,
  shield: Shield,
  "trending-up": TrendingUp,
  users: Users,
  "book-open": BookOpen,
} as const

type ServiceItem = {
  icon: keyof typeof iconMap | any
  title: string
  description: string
  features: Array<string | { text: string }>
}

type Props = {
  items?: ServiceItem[]
}

export default function Services({ items }: Props = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const services: ServiceItem[] =
    items ?? [
      {
        icon: 'calculator',
        title: "Contabilidad Integral",
        description: "Llevamos la contabilidad completa de su empresa con precisión y cumplimiento normativo.",
        features: ["Estados financieros", "Conciliaciones bancarias", "Control de inventarios", "Análisis financiero"],
      },
      {
        icon: 'file-text',
        title: "Asesoría Tributaria",
        description: "Optimizamos su carga tributaria y aseguramos el cumplimiento de todas sus obligaciones fiscales.",
        features: ["Declaraciones de renta", "Planeación tributaria", "Régimen simple", "Consultoría fiscal"],
      },
      {
        icon: 'shield',
        title: "Revisoría Fiscal",
        description: "Servicios de revisoría fiscal con nuestros aliados estratégicos certificados.",
        features: ["Auditoría interna", "Control de riesgos", "Dictámenes fiscales", "Cumplimiento normativo"],
      },
      {
        icon: 'trending-up',
        title: "Consultoría Financiera",
        description: "Asesoramos en la toma de decisiones estratégicas para el crecimiento de su negocio.",
        features: [
          "Análisis de rentabilidad",
          "Proyecciones financieras",
          "Evaluación de inversiones",
          "Reestructuración financiera",
        ],
      },
      {
        icon: 'users',
        title: "Nómina y RRHH",
        description: "Gestión integral de nómina y administración de recursos humanos.",
        features: ["Liquidación de nómina", "Seguridad social", "Contratos laborales", "Prestaciones sociales"],
      },
      {
        icon: 'book-open',
        title: "Capacitación",
        description: "Programas de capacitación en temas contables y tributarios para su equipo.",
        features: ["Talleres especializados", "Actualización normativa", "Capacitación in-house", "Certificaciones"],
      },
    ]

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold font-serif text-foreground mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            Nuestros <span className="text-accent">Servicios</span>
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto ${isVisible ? "animate-fade-in-up animate-delay-100" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            Ofrecemos una amplia gama de servicios contables y tributarios diseñados para satisfacer las necesidades
            específicas de cada cliente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`hover-lift group cursor-pointer ${isVisible ? `animate-scale-in animate-delay-${200 + index * 100}` : "opacity-0"}`}
              style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {(() => {
                    const Icon = typeof service.icon === 'string' ? iconMap[service.icon as keyof typeof iconMap] : service.icon
                    return <Icon className="w-8 h-8 text-accent-foreground" />
                  })()}
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => {
                    const text = typeof feature === 'string' ? feature : feature?.text
                    if (!text) return null
                    return (
                      <li key={`${text}-${featureIndex}`} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{text}</span>
                      </li>
                    )
                  })}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center bg-muted rounded-2xl p-8 ${isVisible ? "animate-fade-in-up animate-delay-500" : "opacity-0"}`}
          style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-4">
            ¿Necesita una <span className="text-accent">Consulta Personalizada</span>?
          </h3>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para analizar sus necesidades específicas y brindarle la mejor
            solución para su empresa.
          </p>
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-accent text-accent-foreground hover:bg-accent/90 hover-lift group"
          >
            Solicitar Consulta Gratuita
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
