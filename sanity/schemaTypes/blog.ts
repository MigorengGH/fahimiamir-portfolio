import { defineField, defineType } from 'sanity'

export const blog = defineType({
  name: 'blog',
  title: 'Blog / Awards & Involvement',
  type: 'document',
  fields: [
    defineField({
      name: 'posts',
      title: 'Posts',
      description: 'Awards, achievements and involvement activities displayed in the Blog section',
      type: 'array',
      of: [
        defineField({
          name: 'blogItem',
          type: 'object',
          preview: {
            select: {
              title: 'title',
              subtitle: 'org',
            },
          },
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'org',
              title: 'Organization / Issuer',
              type: 'string',
            }),
            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              options: {
                dateFormat: 'MM/YYYY',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              description: 'Leave empty if ongoing',
              options: {
                dateFormat: 'MM/YYYY',
              },
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Award', value: 'award' },
                  { title: 'Involvement', value: 'involvement' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Cover Image (Legacy)',
              type: 'image',
              options: { hotspot: true },
              hidden: true,
            }),
            defineField({
              name: 'images',
              title: 'Images / Documents',
              description: 'Upload up to 6 images or PDFs for the blog post',
              type: 'array',
              of: [
                { type: 'image', options: { hotspot: true } },
                { type: 'file', options: { accept: 'application/pdf' } }
              ],
              validation: (Rule) => Rule.max(6).warning('You can only upload up to 6 items'),
            }),
            defineField({
              name: 'url',
              title: 'External URL (optional)',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return { title: 'Blog / Awards & Involvement' }
    },
  },
})
