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

const resumeExperience = [
  {
    _key: 'exp-1',
    title: 'Business Analyst (Internship)',
    company: 'PETCO Trading Labuan Company Ltd (PTLCL), Petronas',
    period: 'Aug 2025 - Dec 2025',
    description: '• Spearheaded UAT and system testing for the e-Invoice Automation project (Phase 1), achieving 100% automation accuracy and saving the TRMS support team 25-30 hours weekly.\n• Reduced QA effort by executing UAT, regression, and end-to-end testing across IMOS and ENDUR systems, maintaining 100% data integrity through systematic data validation and reconciliation.\n• Improved business-system alignment by preparing functional specifications, change records, and test documentation, alongside providing timely configuration support for core IMOS system entities.',
    url: ''
  },
  {
    _key: 'exp-2',
    title: 'Data Analytics Trainee',
    company: '',
    period: '',
    description: '• Data Engineering & Preprocessing: Cleaned and transformed retail, employee, and patient datasets using SQL, Python (Pandas, NumPy), and Advanced Google Sheets by applying joins, CRUD operations, and statistical imputation to resolve missing and inconsistent data.\n• Exploratory Data Analysis & Visualization: Conducted EDA using Matplotlib and Seaborn to uncover trends, outliers, and correlations across health and sales datasets, applying aggregation and statistical methods to surface key performance indicators.\n• Dashboard Development & Reporting: Designed an interactive Looker Studio dashboard from cleaned SQL/Sheets data sources, applying dashboard UX principles (visual hierarchy, filters, drill-downs) to turn raw metrics into stakeholder-ready insights.',
    url: ''
  }
]

const resumeEducation = [
  {
    _key: 'edu-1',
    title: 'Bachelor of Software Engineering (Information System Development) with Honours',
    institution: 'Universiti Kebangsaan Malaysia',
    period: 'Oct 2022 - Present',
    description: 'CGPA: 3.83'
  },
  {
    _key: 'edu-2',
    title: 'Matriculation - Computer Science',
    institution: 'Kolej Matrikulasi Johor',
    period: 'Aug 2021 - June 2022',
    description: 'CGPA: 3.88'
  }
]

const resumeCertifications = [
  {
    _key: 'cert-1',
    title: 'Certified Tester Foundation Level (CTFL)',
    issuer: 'ISTQB',
    year: '',
    credentialId: '',
    url: ''
  },
  {
    _key: 'cert-2',
    title: 'AI Agent Essentials: Build Smart Assistants with Generative AI',
    issuer: 'MIT',
    year: '',
    credentialId: '',
    url: ''
  },
  {
    _key: 'cert-3',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    year: '',
    credentialId: '',
    url: ''
  }
]

const rawAwards = [
  "1st Place - Safer Internet Day 2026 Video Competition, MCMC",
  "Innovative Entrepreneurship Award - Final Year Project, Karnival Inovasi Digital (KID) FTSM 2025",
  "1st Place & Best Director - National Level 48-Hour Panic Production Competition 2025",
  "Gold Medal - Digital Innovation Creativepreneur (DICE 2.0) 2024, Short Film, National Level",
  "1st Place - National Level Cyber Security Awareness Video Competition 2023, NACSA",
  "2nd Place - ASEAN-JAPAN Cyber Security Awareness Video Competition 2023",
  "3rd Place - Ministry of Higher Education Entrepreneurship Awards 2023 in Creative Video (AKKPT2023)",
  "3rd Place - UKM Student Icon Awards 2024 - Entrepreneurial Leadership Category",
  "Multimedia Icon - Kolej Pendeta Zaba, 2024",
  "3rd Place - Scam Awareness Video Contest, Kenanga Bank 2024",
  "2nd Place - Dokumentari Jejak Industri Video 2024, University Level"
]

const blogAwards = rawAwards.map((awardText, index) => {
  // Parse year from the string if possible
  const yearMatch = awardText.match(/202[0-9]/)
  const year = yearMatch ? yearMatch[0] : ''
  return {
    _key: `award_${index}`,
    title: awardText,
    org: '',
    year: year,
    category: 'award',
    description: ''
  }
})

async function updateAll() {
  try {
    console.log('Fetching resume document...')
    const currentResume = await client.fetch(`*[_type == "resume"][0]`)
    if (currentResume) {
      console.log('Updating resume (experience, education, certifications)...')
      await client.patch(currentResume._id)
        .set({ 
          experience: resumeExperience,
          education: resumeEducation,
          certifications: resumeCertifications
        })
        .commit()
      console.log('Successfully updated resume.')
    } else {
      console.log('No resume document found.')
    }

    console.log('Fetching blog document...')
    const currentBlog = await client.fetch(`*[_type == "blog"][0]`)
    if (currentBlog) {
      console.log('Updating blog with real awards...')
      const oldPosts = currentBlog.posts || []
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

updateAll()
