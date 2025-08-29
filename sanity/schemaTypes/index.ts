import { type SchemaTypeDefinition } from 'sanity'
import generalSettings from './generalSettings'
import header from './header'
import hero from './hero'
import services from './services'
import about from './about'
import alliances from './alliances'
import testimonials from './testimonials'
import contact from './contact'
import footer from './footer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [generalSettings, header, hero, services, about, alliances, testimonials, contact, footer],
}
