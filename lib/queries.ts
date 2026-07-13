import { groq } from 'next-sanity'

// ── Profile ───────────────────────────────────────────────────────────────────

export const profileQuery = groq`
  *[_type == "profile"][0] {
    name,
    title,
    avatar {
      asset->{url},
      hotspot,
      crop
    },
    "avatarUrl": avatar.asset->url,
    heroAvatar {
      asset->{url},
      hotspot,
      crop,
      alt
    },
    "heroAvatarUrl": heroAvatar.asset->url,
    heroHoverAvatar {
      asset->{url},
      hotspot,
      crop,
      alt
    },
    "heroHoverAvatarUrl": heroHoverAvatar.asset->url,
    email,
    phone,
    location,
    availability,
    shortBio,
    social,
    resumeUrl,
    "resumeDocumentUrl": resumeDocument.asset->url
  }
`

// ── About ─────────────────────────────────────────────────────────────────────

export const aboutQuery = groq`
  *[_type == "about"][0] {
    description,
    services[] {
      title,
      description,
      icon,
      color,
      borderColor,
      iconColor
    }
  }
`

// ── Resume ────────────────────────────────────────────────────────────────────

export const resumeQuery = groq`
  *[_type == "resume"][0] {
    education[] {
      title,
      institution,
      period,
      description,
      "imageUrl": coalesce(imageUrl, image.asset->url)
    },
    experience[] {
      title,
      company,
      period,
      description,
      url,
      "imageUrl": coalesce(imageUrl, image.asset->url)
    },
    skillGroups[] {
      domain,
      icon,
      color,
      borderColor,
      iconColor,
      tools[] {
        name,
        icon,
        iconUrl
      }
    },
    certifications[] {
      title,
      issuer,
      year,
      period,
      credentialId,
      url,
      "imageUrl": image.asset->url
    }
  }
`

// ── Blog / Awards & Extracurricular ───────────────────────────────────────────

export const blogQuery = groq`
  *[_type == "blog"] | order(orderRank asc) {
    title,
    org,
    startDate,
    endDate,
    category,
    description,
    "imageUrl": image.asset->url,
    "imageUrls": images[].asset->url,
    url,
    image,
    images
  }
`


// ── Projects ──────────────────────────────────────────────────────────────────

export const projectsListQuery = groq`
  *[_type == "project"] | order(orderRank asc) {
    _id,
    title,
    description,
    startDate,
    endDate,
    category,
    techStack,
    "imageUrls": images[].asset->url,
    images,
    liveUrl,
    repoUrl,
    orderRank,
    _createdAt
  }
`

