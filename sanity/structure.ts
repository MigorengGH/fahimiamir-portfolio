import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Profile Settings')
        .child(S.document().schemaType('profile').documentId('profile')),
      S.listItem()
        .title('About Section')
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('Resume Section')
        .child(S.document().schemaType('resume').documentId('resume')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['profile', 'about', 'resume'].includes(listItem.getId() as string)
      ),
    ])
