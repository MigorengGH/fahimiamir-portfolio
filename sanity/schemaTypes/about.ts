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
            defineField({ name: 'color', title: 'Card Background Color', type: 'string', description: 'Tailwind classes, e.g. from-blue-500/20 to-indigo-500/10 or bg-blue-500/10' }),
            defineField({ name: 'borderColor', title: 'Tailwind Border Color', type: 'string', description: 'e.g. border-blue-500/30' }),
            defineField({ name: 'iconColor', title: 'Tailwind Icon Color', type: 'string', description: 'e.g. text-blue-400' }),
          ],
        }),
      ],
    }),
  ],
})
