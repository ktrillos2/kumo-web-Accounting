import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  const singletonId = 'general-settings-singleton'

  return S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Información general')
        .schemaType('generalSettings')
        .child(
          S.editor()
            .id(singletonId)
            .schemaType('generalSettings')
            .documentId(singletonId)
            .title('Información general')
        ),
      S.listItem()
        .id('header-singleton-item')
        .title('Header')
        .schemaType('header')
        .child(
          S.editor()
            .id('header-singleton')
            .schemaType('header')
            .documentId('header-singleton')
            .title('Header')
        ),
      S.divider(),
      S.listItem()
        .id('services-singleton-item')
        .title('Nuestros servicios')
        .schemaType('servicesSection')
        .child(
          S.editor()
            .id('services-singleton')
            .schemaType('servicesSection')
            .documentId('servicesSection')
            .title('Nuestros servicios')
        ),
      S.divider(),
      S.listItem()
        .id('alliances-singleton-item')
        .title('Nuestras alianzas')
        .schemaType('alliancesSection')
        .child(
          S.editor()
            .id('alliances-singleton')
            .schemaType('alliancesSection')
            .documentId('alliancesSection')
            .title('Nuestras alianzas')
        ),
      S.divider(),
      S.listItem()
        .id('testimonials-singleton-item')
        .title('Testimonios')
        .schemaType('testimonialsSection')
        .child(
          S.editor()
            .id('testimonials-singleton')
            .schemaType('testimonialsSection')
            .documentId('testimonialsSection')
            .title('Testimonios')
        ),
      S.divider(),
      S.listItem()
        .id('contact-singleton-item')
        .title('Contacto')
        .schemaType('contactSection')
        .child(
          S.editor()
            .id('contact-singleton')
            .schemaType('contactSection')
            .documentId('contactSection')
            .title('Contacto')
        ),
      S.divider(),
      S.listItem()
        .id('footer-singleton-item')
        .title('Footer')
        .schemaType('footerSettings')
        .child(
          S.editor()
            .id('footer-singleton')
            .schemaType('footerSettings')
            .documentId('footerSettings')
            .title('Footer')
        ),
      S.divider(),
      S.listItem()
        .id('about-singleton-item')
        .title('Sobre nosotros')
        .schemaType('aboutSection')
        .child(
          S.editor()
            .id('about-singleton')
            .schemaType('aboutSection')
            .documentId('aboutSection')
            .title('Sobre nosotros')
        ),
      S.divider(),
      // Resto de tipos excepto los singleton
      ...S.documentTypeListItems().filter((li) => !['generalSettings', 'header', 'servicesSection', 'alliancesSection', 'testimonialsSection', 'contactSection', 'aboutSection', 'footerSettings'].includes(li.getId() || '')),
    ])
}
