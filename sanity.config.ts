import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from '@/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Fahimi Amir Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'REPLACE_WITH_PROJECT_ID',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema,
})
