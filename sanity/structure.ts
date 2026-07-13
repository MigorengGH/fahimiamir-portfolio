import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
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
      orderableDocumentListDeskItem({
        type: 'blog',
        title: 'Blog',
        S,
        context,
      }),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Projects',
        S,
        context,
      }),
      ...S.documentTypeListItems().filter(
        (listItem) => !['profile', 'about', 'resume', 'project', 'blog'].includes(listItem.getId() as string)
      ),


    ])

