export interface SanityImage {
  asset: { _ref: string; _type: string }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  techStack?: string[]
  coverImage?: SanityImage
  liveUrl?: string
  repoUrl?: string
  order?: number
}
