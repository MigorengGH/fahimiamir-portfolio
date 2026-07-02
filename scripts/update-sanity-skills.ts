import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const skillGroups = [
  {
    _key: 'sg1',
    domain: 'Programming Languages',
    icon: 'Code',
    color: 'from-blue-500/20 to-indigo-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    tools: [
      { _key: 't1_1', name: 'HTML', icon: 'Globe' },
      { _key: 't1_2', name: 'CSS', icon: 'Zap' },
      { _key: 't1_3', name: 'JavaScript', icon: 'Code' },
      { _key: 't1_4', name: 'Java', icon: 'Code' },
      { _key: 't1_5', name: 'Python', icon: 'Code' },
      { _key: 't1_6', name: 'SQL', icon: 'Database' },
      { _key: 't1_7', name: 'React Native', icon: 'Smartphone' },
    ],
  },
  {
    _key: 'sg2',
    domain: 'Web Development & Frameworks',
    icon: 'Globe',
    color: 'from-purple-500/20 to-pink-500/10',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    tools: [
      { _key: 't2_1', name: 'Laravel', icon: 'Zap' },
      { _key: 't2_2', name: 'Filament', icon: 'Zap' },
      { _key: 't2_3', name: 'WordPress', icon: 'Globe' },
      { _key: 't2_4', name: 'Expo', icon: 'Smartphone' },
    ],
  },
  {
    _key: 'sg3',
    domain: 'Data & Analytics',
    icon: 'BarChart2',
    color: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    tools: [
      { _key: 't3_1', name: 'MySQL', icon: 'Database' },
      { _key: 't3_2', name: 'Pandas', icon: 'BarChart2' },
      { _key: 't3_3', name: 'Numpy', icon: 'BarChart2' },
      { _key: 't3_4', name: 'Microsoft Power BI', icon: 'BarChart2' },
      { _key: 't3_5', name: 'Tableau', icon: 'BarChart2' },
      { _key: 't3_6', name: 'Data Studio', icon: 'BarChart2' },
    ],
  },
  {
    _key: 'sg4',
    domain: 'Tools & Platforms',
    icon: 'Zap',
    color: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    tools: [
      { _key: 't4_1', name: 'Git/Version Control', icon: 'Code' },
      { _key: 't4_2', name: 'Android Studio', icon: 'Smartphone' },
      { _key: 't4_3', name: 'Microsoft Office Suite', icon: 'ClipboardCheck' },
      { _key: 't4_4', name: 'Microsoft Foundry', icon: 'Zap' },
    ],
  },
  {
    _key: 'sg5',
    domain: 'Languages',
    icon: 'Globe',
    color: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    tools: [
      { _key: 't5_1', name: 'English (Intermediate)', icon: 'Globe' },
      { _key: 't5_2', name: 'Bahasa Melayu (Native)', icon: 'Globe' },
    ],
  },
]

async function updateSanitySkills() {
  try {
    console.log('Fetching resume document...')
    const currentResume = await client.fetch(`*[_type == "resume"][0]`)
    if (currentResume) {
      console.log('Updating skills to skillGroups...')
      await client.patch(currentResume._id)
        .set({ skillGroups })
        .unset(['skills']) // Remove the old flat skills field if we want to completely replace it
        .commit()
      console.log('Successfully updated skillGroups.')
    } else {
      console.log('No resume document found.')
    }
  } catch (error) {
    console.error('Error updating skills:', error)
  }
}

updateSanitySkills()
