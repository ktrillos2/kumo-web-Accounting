"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare } from "lucide-react"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 mb-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            <MessageSquare className="w-8 h-8 text-accent" />
            <span className="text-accent font-semibold text-lg">Contáctanos</span>
          </div>
          <h2
            className={`text-5xl font-bold font-serif text-foreground mb-6 ${isVisible ? "animate-fade-in-up animate-delay-100" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            Hablemos de tu <span className="text-accent">Futuro Financiero</span>
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            Nuestro equipo de expertos está listo para transformar la gestión contable y tributaria de tu empresa
          </p>
        </div>

        <div className="space-y-12">
          {/* Main Contact Form - Centered and prominent */}
          <div
            className={`max-w-4xl mx-auto ${isVisible ? "animate-scale-in animate-delay-300" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            <Card className="hover-lift shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-foreground">
                  Solicita tu <span className="text-accent">Consulta Gratuita</span>
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Completa el formulario y te contactaremos en menos de 24 horas
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                {isSubmitted ? (
                  <div className="text-center py-12 animate-scale-in">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-foreground mb-4">¡Mensaje Enviado!</h3>
                    <p className="text-muted-foreground text-lg">
                      Gracias por contactarnos. Te responderemos en las próximas 24 horas.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                          Nombre Completo *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                          Teléfono
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                          placeholder="+57 300 123 4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                          Empresa
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="h-12 text-base"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                        Cuéntanos sobre tus necesidades *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="text-base resize-none"
                        placeholder="Describe los servicios contables y tributarios que necesitas para tu empresa..."
                      />
                    </div>

                    <div className="text-center pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="px-12 py-4 text-lg bg-accent text-accent-foreground hover:bg-accent/90 hover-lift group shadow-lg"
                      >
                        <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                        Enviar Consulta
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Cards - Below form in grid */}
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 ${isVisible ? "animate-fade-in-up animate-delay-500" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            <Card className="hover-lift text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Teléfono</h3>
                <a
                  href="tel:+5712345678"
                  className="text-muted-foreground hover:text-accent transition-colors font-medium"
                >
                  +57 (1) 234-5678
                </a>
              </CardContent>
            </Card>

            <Card className="hover-lift text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:contacto@tnaccounting.com"
                  className="text-muted-foreground hover:text-accent transition-colors font-medium break-all"
                >
                  contacto@tnaccounting.com
                </a>
              </CardContent>
            </Card>

            <Card className="hover-lift text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Ubicación</h3>
                <p className="text-muted-foreground font-medium">
                  Calle 123 #45-67
                  <br />
                  Bogotá, Colombia
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Horario</h3>
                <p className="text-muted-foreground font-medium">
                  Lun - Vie
                  <br />
                  8:00 AM - 6:00 PM
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div
            className={`text-center ${isVisible ? "animate-fade-in-up animate-delay-700" : "opacity-0"}`}
            style={{ opacity: isVisible ? 1 : 0, animationFillMode: "both", willChange: "transform, opacity" }}
          >
            <Card className="max-w-2xl mx-auto bg-accent text-accent-foreground hover-lift">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">¿Necesitas Atención Inmediata?</h3>
                <p className="mb-6 text-lg opacity-90">Nuestro equipo está disponible para atenderte de inmediato</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-background text-foreground hover:bg-background/90 px-8"
                    onClick={() => window.open("tel:+5712345678")}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Llamar Ahora
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-background text-foreground hover:bg-background/90 px-8"
                    onClick={() => window.open("mailto:contacto@tnaccounting.com")}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Enviar Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
