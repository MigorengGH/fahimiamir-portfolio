import { defineField, defineType } from 'sanity'

export const blog = defineType({
  name: 'blog',
  title: 'Blog / Awards & Extracurricular',
  type: 'document',
  fields: [
    defineField({
      name: 'posts',
      title: 'Posts',
      description: 'Awards, achievements and extracurricular activities displayed in the Blog section',
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
              name: 'year',
              title: 'Year',
              type: 'string',
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Award', value: 'award' },
                  { title: 'Extracurricular', value: 'extracurricular' },
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
              title: 'Images',
              description: 'Upload up to 3 images for the blog post',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
              validation: (Rule) => Rule.max(3).warning('You can only upload up to 3 images'),
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
      return { title: 'Blog / Awards & Extracurricular' }
    },
  },
})
