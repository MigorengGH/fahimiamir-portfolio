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

async function migrate() {
  console.log('Fetching old blog document...')
  const oldBlog = await client.getDocument('blog')
  if (!oldBlog) {
    console.log('No old blog document with ID "blog" found or already migrated.')
    return
  }

  const posts = oldBlog.posts || []
  console.log(`Found ${posts.length} posts to migrate.`)

  const transaction = client.transaction()
  
  // Delete the old single blog document
  transaction.delete('blog')
  
  // Create new blog documents
  posts.forEach((post: any, index: number) => {
    const newId = `blogPost-${Date.now()}-${index}`
    transaction.create({
      _id: newId,
      _type: 'blog',
      title: post.title,
      org: post.org,
      startDate: post.startDate,
      endDate: post.endDate,
      category: post.category,
      description: post.description,
      image: post.image,
      images: post.images,
      url: post.url,
      orderRank: `a${index.toString().padStart(4, '0')}`
    })
  })

  console.log('Executing transaction...')
  await transaction.commit()
  console.log('Migration complete!')
}

migrate().catch(console.error)
