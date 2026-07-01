import { HomeClient } from './HomeClient'
import { sanityFetch } from '@/sanity/lib/live'
import { defineQuery } from 'next-sanity'

const profileQuery = defineQuery(`*[_type == "profile"][0]{
  ...,
  "resumeUrl": resumeDocument.asset->url
}`)
const aboutQuery = defineQuery(`*[_type == "about"][0]`)
const resumeQuery = defineQuery(`*[_type == "resume"][0]`)

export default async function Home() {
  const { data: profileData } = await sanityFetch({ query: profileQuery })
  const { data: aboutData } = await sanityFetch({ query: aboutQuery })
  const { data: resumeData } = await sanityFetch({ query: resumeQuery })

  return (
    <HomeClient
      profileData={profileData}
      aboutData={aboutData}
      resumeData={resumeData}
    />
  )
}
