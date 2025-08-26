"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "María González",
      position: "Gerente General",
      company: "Comercializadora ABC",
      content:
        "TN Accounting ha sido fundamental en el crecimiento de nuestra empresa. Su asesoría tributaria nos ha permitido optimizar nuestros recursos y cumplir con todas las obligaciones fiscales.",
      rating: 5,
    },
    {
      name: "Carlos Rodríguez",
      position: "Director Financiero",
      company: "Industrias XYZ",
      content:
        "La calidad del servicio y la atención personalizada que recibimos es excepcional. Su equipo siempre está disponible para resolver nuestras consultas de manera oportuna.",
      rating: 5,
    },
    {
      name: "Ana Martínez",
      position: "Propietaria",
      company: "Restaurante El Buen Sabor",
      content:
        "Como pequeña empresaria, necesitaba un servicio confiable y accesible. TN Accounting me ha brindado la tranquilidad de tener mis finanzas en orden.",
      rating: 5,
    },
    {
      name: "Luis Herrera",
      position: "CEO",
      company: "Tech Solutions",
      content:
        "Su conocimiento en normatividad y su capacidad para adaptarse a las necesidades de empresas tecnológicas los convierte en nuestro aliado estratégico ideal.",
      rating: 5,
    },
  ]

  return (
    <section ref={sectionRef} id="testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold font-serif text-foreground mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Lo que Dicen Nuestros <span className="text-accent">Clientes</span>
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto ${isVisible ? "animate-fade-in-up animate-delay-100" : "opacity-0"}`}
          >
            La satisfacción de nuestros clientes es nuestro mayor logro. Conoce sus experiencias trabajando con
            nosotros.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className={`mb-12 ${isVisible ? "animate-scale-in animate-delay-200" : "opacity-0"}`}>
          <Card className="max-w-3xl mx-auto hover-lift">
            <CardContent className="p-6 md:p-8">
              <div className="text-center">
                <Quote className="w-12 h-12 text-accent mx-auto mb-4" />
                <blockquote className="text-lg md:text-xl font-medium text-foreground mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex justify-center mb-3">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-bold text-foreground">{testimonials[currentTestimonial].name}</div>
                  <div className="text-accent font-medium text-sm">{testimonials[currentTestimonial].position}</div>
                  <div className="text-muted-foreground text-sm">{testimonials[currentTestimonial].company}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? "bg-accent scale-125" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`hover-lift cursor-pointer transition-all duration-300 ${
                index === currentTestimonial ? "ring-2 ring-accent scale-105" : ""
              } ${isVisible ? `animate-fade-in-up animate-delay-${300 + index * 100}` : "opacity-0"}`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <CardContent className="p-4">
                <div className="flex justify-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground text-xs mb-3 line-clamp-3">"{testimonial.content}"</p>
                <div className="text-center">
                  <div className="font-bold text-foreground text-xs">{testimonial.name}</div>
                  <div className="text-accent text-xs">{testimonial.position}</div>
                  <div className="text-muted-foreground text-xs">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className={`mt-16 bg-muted rounded-2xl p-8 ${isVisible ? "animate-fade-in-up animate-delay-500" : "opacity-0"}`}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted-foreground">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">99%</div>
              <div className="text-muted-foreground">Tasa de Satisfacción</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <div className="text-muted-foreground">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-muted-foreground">Soporte Disponible</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
