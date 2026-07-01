import { createClient } from 'next-sanity'
import { profileData, aboutData, resumeData } from '../lib/portfolio-data'
import { apiVersion, dataset, projectId } from '../sanity/env'

// To run this script, we need a write token.
// The user should set SANITY_API_WRITE_TOKEN in .env.local
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Please add it to your .env.local")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

async function seed() {
  console.log('Seeding profile data...')
  await client.createOrReplace({
    _id: 'profile',
    _type: 'profile',
    name: profileData.name,
    title: profileData.title,
    email: profileData.email,
    phone: profileData.phone,
    location: profileData.location,
    availability: profileData.availability,
    social: {
      linkedin: profileData.social.linkedin,
      github: profileData.social.github,
    }
  })
  console.log('Profile data seeded.')

  console.log('Seeding about data...')
  await client.createOrReplace({
    _id: 'about',
    _type: 'about',
    description: aboutData.description,
    services: aboutData.services.map((service: any, index: number) => ({
      _key: `service-${index}`,
      title: service.title,
      description: service.description,
      icon: service.icon,
    }))
  })
  console.log('About data seeded.')

  console.log('Seeding resume data...')
  await client.createOrReplace({
    _id: 'resume',
    _type: 'resume',
    education: resumeData.education.map((item: any, index: number) => ({
      _key: `edu-${index}`,
      ...item,
    })),
    experience: resumeData.experience.map((item: any, index: number) => ({
      _key: `exp-${index}`,
      ...item,
    })),
    skills: resumeData.skills.map((item: any, index: number) => ({
      _key: `skill-${index}`,
      ...item,
    })),
    certifications: resumeData.certifications.map((item: any, index: number) => ({
      _key: `cert-${index}`,
      ...item,
    })),
    awards: resumeData.awards.map((item: any, index: number) => ({
      _key: `award-${index}`,
      ...item,
    })),
  })
  console.log('Resume data seeded.')
}

seed().catch(console.error)
