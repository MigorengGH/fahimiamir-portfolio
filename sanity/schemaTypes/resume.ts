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
            defineField({ name: 'imageUrl', title: 'Direct Image URL', type: 'url', description: 'Paste an image link to use instead of uploading' }),
            defineField({ name: 'image', title: 'Upload Image', type: 'image', options: { hotspot: true } }),
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
            defineField({ name: 'imageUrl', title: 'Direct Image URL', type: 'url', description: 'Paste an image link to use instead of uploading' }),
            defineField({ name: 'image', title: 'Upload Image', type: 'image', options: { hotspot: true } }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'skillGroups',
      title: 'Skill Groups',
      type: 'array',
      of: [
        defineField({
          name: 'skillGroupItem',
          type: 'object',
          fields: [
            defineField({ name: 'domain', title: 'Domain / Category', type: 'string' }),
            defineField({ name: 'icon', title: 'Lucide Icon Name', type: 'string' }),
            defineField({ name: 'color', title: 'Tailwind Gradient Start', type: 'string' }),
            defineField({ name: 'borderColor', title: 'Tailwind Border Color', type: 'string' }),
            defineField({ name: 'iconColor', title: 'Tailwind Icon Color', type: 'string' }),
            defineField({
              name: 'tools',
              title: 'Tools & Technologies',
              type: 'array',
              of: [
                defineField({
                  name: 'toolItem',
                  type: 'object',
                  fields: [
                    defineField({ name: 'name', title: 'Tool Name', type: 'string' }),
                    //defineField({ name: 'icon', title: 'Lucide Icon Name', type: 'string', description: 'Paste icon name from lucide.dev' }),
                  ],
                }),
              ],
            }),
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
            defineField({ name: 'period', title: 'Period', type: 'string' }),
            defineField({ name: 'credentialId', title: 'Credential ID', type: 'string' }),
            defineField({ name: 'url', title: 'Credential URL', type: 'url' }),
            defineField({ name: 'image', title: 'Certificate Image', type: 'image' }),
          ],
        }),
      ],
    }),
  ],
})
