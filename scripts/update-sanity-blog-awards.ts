import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

const envLocal = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8')
const envConfig = dotenv.parse(envLocal)
for (const k in envConfig) {
  process.env[k] = envConfig[k]
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const blogAwards = [
  {
    _key: 'award_1',
    title: '1st Place - seKODlah TechHive Hackathon',
    org: 'seKODlah',
    year: 'Jan 2026',
    category: 'award',
    description: 'Awarded for Aura Pulse AI wellbeing app.'
  },
  {
    _key: 'award_2',
    title: "Dean's List Award (7 Consecutive Semesters)",
    org: 'Faculty of Information Science & Technology, UKM',
    year: '2022 - 2025',
    category: 'award',
    description: 'Consistently achieved Dean\'s List recognition.'
  },
  {
    _key: 'award_3',
    title: 'Best Capstone Project - UKM',
    org: 'Universiti Kebangsaan Malaysia (UKM)',
    year: 'Dec 2025',
    category: 'award',
    description: 'Awarded for VISIONIST Social Networking System.'
  }
]

async function updateSanityBlogAwards() {
  try {
    console.log('Fetching blog document...')
    const blogs = await client.fetch(`*[_type == "blog"]`)
    const currentBlog = blogs[0]
    if (currentBlog) {
      console.log('Updating blog with awards...')
      const oldPosts = currentBlog.posts || []
      // Remove any existing awards to avoid duplicates
      const newPosts = [
        ...oldPosts.filter((p: any) => p.category !== 'award'),
        ...blogAwards
      ]
      
      await client.patch(currentBlog._id)
        .set({ posts: newPosts })
        .commit()
      console.log('Successfully updated blog with awards.')
    } else {
      console.log('No blog document found.')
    }
  } catch (error) {
    console.error('Error updating:', error)
  }
}

updateSanityBlogAwards()
