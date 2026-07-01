import { groq } from 'next-sanity'

// ── Projects ──────────────────────────────────────────────────────────────────

export const projectsListQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    techStack,
    coverImage {
      asset,
      alt,
      hotspot,
      crop
    },
    liveUrl,
    repoUrl,
    order
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    techStack,
    coverImage {
      asset,
      alt,
      hotspot,
      crop
    },
    liveUrl,
    repoUrl,
    order
  }
`

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`
