import { defineField, defineType } from 'sanity'

export const resume = defineType({
  name: 'resume',
  title: 'Resume Section',
  type: 'document',
  fields: [
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        defineField({
          name: 'educationItem',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'institution', title: 'Institution', type: 'string' }),
            defineField({ name: 'period', title: 'Period', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [
        defineField({
          name: 'experienceItem',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'company', title: 'Company', type: 'string' }),
            defineField({ name: 'period', title: 'Period', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
            defineField({ name: 'url', title: 'Company URL', type: 'url' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        defineField({
          name: 'skillItem',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Skill Name', type: 'string' }),
            defineField({ name: 'icon', title: 'Lucide Icon Name', type: 'string', description: 'Used as fallback if no Custom Icon or URL is provided' }),
            defineField({ name: 'customIcon', title: 'Custom Icon (Upload Image)', type: 'image' }),
            defineField({ name: 'iconUrl', title: 'Icon Image URL (Link)', type: 'url', description: 'URL to an external image for the icon' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        defineField({
          name: 'certificationItem',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'issuer', title: 'Issuer', type: 'string' }),
            defineField({ name: 'year', title: 'Year', type: 'string' }),
            defineField({ name: 'url', title: 'Credential URL', type: 'url' }),
            defineField({ name: 'image', title: 'Certificate Image', type: 'image' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'awards',
      title: 'Awards & Honours',
      type: 'array',
      of: [
        defineField({
          name: 'awardItem',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'org', title: 'Organization', type: 'string' }),
            defineField({ name: 'year', title: 'Year', type: 'string' }),
            defineField({ name: 'image', title: 'Award Photo', type: 'image' }),
          ],
        }),
      ],
    }),
  ],
})
