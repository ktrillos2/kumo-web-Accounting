import type {StructureResolver} from 'sanity/structure'

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
      // Resto de tipos excepto el singleton
      ...S.documentTypeListItems().filter((li) => li.getId() !== 'generalSettings' && li.getId() !== 'header'),
    ])
}
