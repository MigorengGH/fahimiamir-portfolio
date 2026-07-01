import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'


export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'REPLACE_WITH_PROJECT_ID',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}

export const client = createClient(config)

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
