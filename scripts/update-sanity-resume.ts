import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Hardcode projectId and dataset as seen in sanity/env.ts
const projectId = 'd8vdqbl2'
const dataset = 'production'
const apiVersion = '2023-01-01'

const envLocal = fs.readFileSync('/Users/fahimiamir/Fahimi Amir Portfolio/fahimi-portfolio/.env.local', 'utf8')
const envConfig = dotenv.parse(envLocal)
for (const k in envConfig) {
  process.env[k] = envConfig[k]
}

const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

async function updateSanity() {
  console.log('Fetching current resume data...')
  
  // 1. UPDATE RESUME (Singleton)
  console.log('Updating Resume (Experience, Education, Certifications)...')
  
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
      period: '2024',
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
      year: 'Professional Certificate',
      url: ''
    },
    {
      _key: 'cert-2',
      title: 'AI Agent Essentials: Build Smart Assistants with Generative AI',
      issuer: 'MIT',
      year: 'Professional Certificate',
      url: ''
    },
    {
      _key: 'cert-3',
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco',
      year: 'Professional Certificate',
      url: ''
    }
  ]

  await client.patch('resume')
    .set({
      experience: resumeExperience,
      education: resumeEducation,
      certifications: resumeCertifications,
    })
    .commit()

  console.log('Resume successfully updated.')

  // 2. UPDATE PROJECTS (Documents)
  console.log('Updating Projects...')

  const projectsToUpdate = [
    {
      _id: 'proj-seKODlah',
      _type: 'project',
      title: 'Aura Pulse - seKODlah TechHive Bootcamp',
      slug: { _type: 'slug', current: 'aura-pulse-sekodlah' },
      description: '40-hour Hackathon, May 2026.\n• Built Aura Pulse, a cross-platform mobile stress prevention app using React Native (Expo) during a 40-hour marathon hackathon, delivering a functional prototype within the time constraint.\n• Implemented 5 passive wellness metrics (session duration, scroll velocity, pickup frequency, movement behaviour, battery patterns) via Expo device APIs to detect doomscrolling and digital anxiety without accessing personal data.\n• Integrated an AI-powered chatbot with crisis escalation logic to identify self-harm indicators and route users to professional mental health support services.',
      techStack: ['React Native', 'Expo', 'Generative AI'],
      order: 1
    },
    {
      _id: 'proj-visionist',
      _type: 'project',
      title: 'VISIONIST - Creative Industry Social Networking System',
      slug: { _type: 'slug', current: 'visionist' },
      description: 'Final Year Project | Innovative Entrepreneurship Award (KID FTSM 2025). Oct 2024 - Jul 2025.\n• Architected a full-stack social networking platform for 100+ creative professionals using Laravel, Filament, and MySQL, streamlining talent-client matchmaking through robust database design and responsive UI components.\n• Executed the full SDLC and requirements engineering through direct stakeholder management with FINAS, leveraging Agile methodologies to ensure system compliance with national creative industry standards for negotiation and networking.',
      techStack: ['Laravel', 'Filament', 'MySQL', 'PHP'],
      order: 2
    },
    {
      _id: 'proj-ukmesabs',
      _type: 'project',
      title: 'UKMESABS - UKM e-Sport Arena Booking System',
      slug: { _type: 'slug', current: 'ukmesabs' },
      description: 'Software Development Project. Oct 2024 - Jan 2025.\n• Built a multi-facility booking platform for UKM e-sport facilities (PC/PS5) using PHP, Laravel, and MySQL, successfully integrating complex scheduling and payment management modules.\n• Gather accurate and relevant system requirements by conducting stakeholder meetings with the UKM e-Sport Club, ensuring the platform aligned with real operational needs.',
      techStack: ['PHP', 'Laravel', 'MySQL'],
      order: 3
    }
  ]

  for (const p of projectsToUpdate) {
    await client.createOrReplace(p)
  }
  
  console.log('Projects successfully updated.')

  // 3. EXTRACURRICULAR -> Update Blog (Awards & Extracurricular)
  console.log('Updating Extracurricular activities into blog...')
  const blogExtracurriculars = [
    {
      _key: 'extra-1',
      title: 'PERTAMA Deputy Executive, Media & Publicity',
      org: 'Faculty Student Association',
      year: '2023 - 2024',
      category: 'extracurricular',
      description: '• Increased faculty social media visibility by producing 50+ visual content assets supporting 10+ faculty programs annually.\n• Ensured consistent, high-quality documentation by serving as lead photographer and videographer for all faculty events.'
    },
    {
      _key: 'extra-2',
      title: 'President, Video Innovation Club (VIC)',
      org: 'Special Interest Group (SIG), FTSM',
      year: '2023 - Present',
      category: 'extracurricular',
      description: "• Mentored 30+ primary school students in creating environmental short films using smartphones through the 'From Nature to The Lens' workshop.\n• Elevated members' technical competency by organizing and leading 3 professional video production workshops covering the full production pipeline."
    }
  ]
  
  const currentBlog = await client.fetch(`*[_type == "blog"][0]`)
  if (currentBlog) {
    const oldPosts = currentBlog.posts || []
    const newPosts = [
      ...oldPosts.filter((p: any) => p.category !== 'extracurricular'),
      ...blogExtracurriculars
    ]
    await client.patch(currentBlog._id).set({ posts: newPosts }).commit()
    console.log('Blog successfully patched with new extracurriculars.')
  } else {
    console.log('No blog document found to patch.')
  }
}

updateSanity().catch(console.error)
