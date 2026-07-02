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

const certifications = [
  {
    _key: 'cert1',
    title: 'Data Science Bootcamp',
    issuer: 'Codecademy',
    year: 'Dec 2025',
    credentialId: 'CC-102948X',
    url: 'https://codecademy.com'
  },
  {
    _key: 'cert2',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: 'Nov 2025',
    credentialId: 'AWS-992384P',
    url: 'https://aws.amazon.com/certification/'
  },
  {
    _key: 'cert3',
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Coursera',
    year: 'Oct 2025',
    credentialId: 'GDAP-827364',
    url: 'https://coursera.org'
  }
]

const awards = [
  {
    _key: 'award1',
    title: '1st Place - seKODlah TechHive Hackathon',
    org: 'seKODlah',
    year: 'Jan 2026',
  },
  {
    _key: 'award2',
    title: "Dean's List Award (7 Consecutive Semesters)",
    org: 'Faculty of Information Science & Technology, UKM',
    year: '2022 - 2025',
  },
  {
    _key: 'award3',
    title: 'Best Capstone Project - UKM',
    org: 'Universiti Kebangsaan Malaysia (UKM)',
    year: 'Dec 2025',
  }
]

async function updateSanityAwards() {
  try {
    console.log('Fetching resume document...')
    const currentResume = await client.fetch(`*[_type == "resume"][0]`)
    if (currentResume) {
      console.log('Updating certifications and awards...')
      await client.patch(currentResume._id)
        .set({ certifications, awards })
        .commit()
      console.log('Successfully updated certifications and awards.')
    } else {
      console.log('No resume document found.')
    }
  } catch (error) {
    console.error('Error updating:', error)
  }
}

updateSanityAwards()
