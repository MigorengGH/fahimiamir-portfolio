import { HomeClient } from '@/components/home-client'
import { sanityFetch } from '@/sanity/lib/live'
import {
  profileQuery,
  aboutQuery,
  resumeQuery,
  projectsListQuery,
  blogQuery,
} from '@/lib/queries'

export default async function Home() {
  // Fetch all necessary data from Sanity in parallel for performance
  const [
    profileResponse,
    aboutResponse,
    resumeResponse,
    projectsResponse,
    blogResponse,
  ] = await Promise.all([
    sanityFetch({ query: profileQuery }),
    sanityFetch({ query: aboutQuery }),
    sanityFetch({ query: resumeQuery }),
    sanityFetch({ query: projectsListQuery }),
    sanityFetch({ query: blogQuery }),
  ])

  // Extract the actual data from the sanityFetch wrapper ({ data, ... })
  const profileData = (profileResponse.data || {}) as any
  const aboutData = (aboutResponse.data || {}) as any
  const resumeData = (resumeResponse.data || {}) as any
  const projectsData = (projectsResponse.data || []) as any[]
  const blogDataRaw = (blogResponse.data || {}) as any

  // Format the projects array to match what PortfolioSection expects
  const portfolioData = {
    categories: ['all', 'software', 'web', 'data', 'video'], // or extract from tags
    projects: projectsData,
  }

  // Format blog data
  const blogData = {
    categories: ['all', 'award', 'extracurricular'] as const,
    posts: blogDataRaw.posts || [],
  }

  return (
    <HomeClient
      profileData={profileData}
      aboutData={aboutData}
      resumeData={resumeData}
      portfolioData={portfolioData}
      blogData={blogData}
    />
  )
}
