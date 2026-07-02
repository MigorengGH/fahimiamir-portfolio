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
    _key: 'award_0',
    title: '1st Place - Safer Internet Day 2026 Video Competition',
    org: 'MCMC',
    year: '2026',
    category: 'award',
    description: ''
  },
  {
    _key: 'award_1',
    title: 'Innovative Entrepreneurship Award - Final Year Project',
    org: 'Karnival Inovasi Digital (KID) FTSM 2025',
    year: '2025',
    category: 'award',
    description: ''
  },
  {
    _key: 'award_2',
    title: '1st Place & Best Director - National Level 48-Hour Panic Production Competition',
    org: 'National Level',
    year: '2025',
    category: 'award',
    description: ''
  },
  {
    _key: 'award_3',
    title: 'Gold Medal - Digital Innovation Creativepreneur (DICE 2.0) 2024, Short Film',
    org: 'National Level',
    year: '2024',
    category: 'award',
    description: ''
  },
  {
    _key: 'award_4',
    title: '1st Place - National Level Cyber Security Awareness Video Competition 2023',
    org: 'NACSA',
    year: '2023',
    category: 'award',
    description: ''
  },
  {
    _key: 'award_5',
    title: '2nd Place - ASEAN-JAPAN Cyber Security Awareness Video Competition',
    org: 'ASEAN-JAPAN',
    year: '2023',
    category: 'award',
    description: ''
  },
  {
    _key: 'award_6',
    title: '3rd Place - Ministry of Higher Education Entrepreneurship Awards 2023 in Creative Video',
    org: 'AKKPT2023',
    year: '2023',
    category: 'award',
    description: ''
  },
  {
    _key: 'award_7',
    title: '3rd Place - UKM Student Icon Awards 2024 - Entrepreneurial Leadership Category',
    org: 'UKM',
    year: '2024',
    category: 'award',
    description: ''
  },
  {
    _key: 'award_8',
    title: 'Multimedia Icon',
    org: 'Kolej Pendeta Zaba',
    year: '2024',
    category: 'award',
    description: ''
  },
  {
    _key: 'award_9',
    title: '3rd Place - Scam Awareness Video Contest',
    org: 'Kenanga Bank',
    year: '2024',
    category: 'award',
    description: ''
  },
  {
    _key: 'award_10',
    title: '2nd Place - Dokumentari Jejak Industri Video 2024',
    org: 'University Level',
    year: '2024',
    category: 'award',
    description: ''
  }
]

async function fixSanity() {
  try {
    console.log('Fixing resume document...')
    await client.patch('resume').unset(['_system']).commit()
    console.log('Fixed resume.')

    console.log('Fixing blog document...')
    const blogs = await client.fetch(`*[_type == "blog"]`)
    const currentBlog = blogs[0]
    
    if (currentBlog) {
      const oldPosts = currentBlog.posts || []
      const newPosts = [
        ...oldPosts.filter((p: any) => p.category !== 'award' && p.title),
        ...blogAwards
      ]
      
      await client.patch(currentBlog._id)
        .unset(['_system'])
        .set({ posts: newPosts })
        .commit()
      console.log('Successfully updated blog with awards and removed _system.')
    }
  } catch (error) {
    console.error('Error updating:', error)
  }
}

fixSanity()
