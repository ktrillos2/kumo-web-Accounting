"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Target, Lightbulb } from "lucide-react"

export default function About() {
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

  const values = [
    {
      icon: Award,
      title: "Excelencia",
      description: "Comprometidos con la calidad y precisión en cada servicio que ofrecemos.",
    },
    {
      icon: Users,
      title: "Confianza",
      description: "Construimos relaciones duraderas basadas en la transparencia y honestidad.",
    },
    {
      icon: Target,
      title: "Resultados",
      description: "Enfocados en generar valor y resultados tangibles para nuestros clientes.",
    },
    {
      icon: Lightbulb,
      title: "Innovación",
      description: "Utilizamos tecnología de vanguardia para optimizar nuestros procesos.",
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold font-serif text-foreground mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Sobre <span className="text-accent">Nosotros</span>
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto ${isVisible ? "animate-fade-in-up animate-delay-100" : "opacity-0"}`}
          >
            Somos una firma especializada en servicios contables y tributarios con más de 15 años de experiencia,
            comprometidos con el crecimiento y éxito de nuestros clientes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className={`space-y-6 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <h3 className="text-3xl font-bold text-foreground">
              Nuestra <span className="text-accent">Historia</span>
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Fundada con la visión de brindar servicios contables y tributarios de la más alta calidad, TN Accounting
              ha crecido hasta convertirse en una firma de confianza para empresas de diversos sectores.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Nuestro equipo de profesionales altamente capacitados combina experiencia tradicional con tecnología
              moderna para ofrecer soluciones integrales que impulsan el crecimiento de nuestros clientes.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-card rounded-lg hover-lift">
                <div className="text-3xl font-bold text-accent mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Años de Experiencia</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg hover-lift">
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Clientes Atendidos</div>
              </div>
            </div>
          </div>

          <div className={`relative ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="bg-card rounded-2xl p-8 shadow-xl hover-lift">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-foreground">Nuestra Misión</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Proporcionar servicios contables y tributarios de excelencia, asesorando a nuestros clientes con
                  profesionalismo, integridad y compromiso para contribuir al crecimiento sostenible de sus
                  organizaciones.
                </p>

                <h4 className="text-2xl font-bold text-foreground pt-4">Nuestra Visión</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Ser reconocidos como la firma líder en servicios contables y tributarios, caracterizada por la
                  innovación, calidad de servicio y el desarrollo integral de nuestros clientes y colaboradores.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-12">
          <h3
            className={`text-3xl font-bold text-foreground mb-6 ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
          >
            Nuestros <span className="text-accent">Valores</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card
              key={value.title}
              className={`hover-lift ${isVisible ? `animate-scale-in animate-delay-${300 + index * 100}` : "opacity-0"}`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
