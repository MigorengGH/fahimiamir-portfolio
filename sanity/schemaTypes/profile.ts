import { defineField, defineType } from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Profile Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Brief/Description',
      description: 'A short description appearing below the title (e.g., Software Engineer).',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroAvatar',
      title: 'Hero Avatar (Transparent PNG)',
      description: 'Used exclusively for the Hero Landing page. Upload a transparent PNG for the best effect.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        })
      ]
    }),
    defineField({
      name: 'heroHoverAvatar',
      title: 'Hero Hover Avatar (Transparent PNG)',
      description: 'Used for the hover effect on the Hero Landing page. Upload a transparent PNG for the best effect.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        })
      ]
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
        defineField({ name: 'github', title: 'GitHub URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume URL (External Link)',
      type: 'url',
      description: 'If provided, this URL will be used for the Download Resume button. If left empty, the uploaded document below will be used.',
    }),
    defineField({
      name: 'resumeDocument',
      title: 'Resume Document (PDF)',
      type: 'file',
      options: {
        accept: '.pdf'
      }
    }),
  ],
})
