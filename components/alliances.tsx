"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Handshake, Shield, Award, Users } from "lucide-react"

export default function Alliances() {
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

  const alliances = [
    {
      icon: Shield,
      title: "Revisoría Fiscal Especializada",
      partner: "Alianza Estratégica",
      description:
        "Contamos con una alianza sólida con una firma especializada en revisoría fiscal, garantizando servicios de auditoría y control de la más alta calidad.",
      benefits: [
        "Revisores fiscales certificados",
        "Experiencia en múltiples sectores",
        "Cumplimiento normativo garantizado",
        "Informes detallados y oportunos",
      ],
    },
    {
      icon: Award,
      title: "Red de Profesionales",
      partner: "Colaboradores Expertos",
      description:
        "Trabajamos con una red de profesionales especializados en diferentes áreas para brindar servicios integrales y especializados.",
      benefits: [
        "Abogados tributaristas",
        "Consultores financieros",
        "Especialistas en NIIF",
        "Expertos en tecnología",
      ],
    },
  ]

  return (
    <section ref={sectionRef} id="alliances" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold font-serif text-foreground mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            Nuestras <span className="text-accent">Alianzas</span>
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto ${isVisible ? "animate-fade-in-up animate-delay-100" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            Trabajamos con socios estratégicos para ofrecer servicios especializados y ampliar nuestro alcance
            profesional.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {alliances.map((alliance, index) => (
            <Card
              key={alliance.title}
              className={`hover-lift ${isVisible ? `animate-slide-in-${index % 2 === 0 ? "left" : "right"} animate-delay-200` : "opacity-0"}`}
              style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <alliance.icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{alliance.title}</h3>
                      <p className="text-accent font-medium">{alliance.partner}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{alliance.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Beneficios:</h4>
                      <ul className="space-y-1">
                        {alliance.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnership Values */}
        <div
          className={`bg-card rounded-2xl p-8 ${isVisible ? "animate-fade-in-up animate-delay-400" : "opacity-0"}`}
          style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
        >
          <div className="text-center mb-8">
            <Handshake className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Compromiso con la <span className="text-accent">Excelencia</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Nuestras alianzas estratégicas nos permiten ofrecer servicios especializados manteniendo los más altos
              estándares de calidad y profesionalismo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-muted rounded-lg hover-lift">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-foreground mb-2">Equipo Ampliado</h4>
              <p className="text-muted-foreground">Acceso a especialistas en múltiples disciplinas</p>
            </div>
            <div className="text-center p-6 bg-muted rounded-lg hover-lift">
              <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-foreground mb-2">Calidad Garantizada</h4>
              <p className="text-muted-foreground">Servicios respaldados por profesionales certificados</p>
            </div>
            <div className="text-center p-6 bg-muted rounded-lg hover-lift">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-foreground mb-2">Experiencia Comprobada</h4>
              <p className="text-muted-foreground">Años de experiencia en servicios especializados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
