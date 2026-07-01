import { defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'Each item is a paragraph.',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineField({
          name: 'service',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({
              name: 'icon',
              title: 'Lucide Icon Name',
              type: 'string',
              description: 'e.g., Code2, Video, Smartphone',
            }),
          ],
        }),
      ],
    }),
  ],
})
