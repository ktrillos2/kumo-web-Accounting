import { type SchemaTypeDefinition } from 'sanity'
import generalSettings from './generalSettings'
import header from './header'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [generalSettings, header],
}
