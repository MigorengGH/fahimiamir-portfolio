import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { projectBySlugQuery, projectSlugsQuery } from '@/lib/queries'
import { Project } from '@/types'

// ISR: revalidate every 60 seconds
export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(projectSlugsQuery)
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project: Project | null = await client.fetch(projectBySlugQuery, { slug })
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} | Fahimi Amir Portfolio`,
    description: project.description ?? `Details about ${project.title}`,
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project: Project | null = await client.fetch(projectBySlugQuery, { slug })

  if (!project) notFound()

  const { title, description, techStack, coverImage, liveUrl, repoUrl } = project

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Back */}
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <Link
          href="/projects"
          id="back-to-projects"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
        >
          ← Back to Projects
        </Link>
      </div>

      {/* Hero */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Cover Image */}
        {coverImage?.asset && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-white/10">
            <Image
              src={urlFor(coverImage).width(1200).height(675).auto('format').url()}
              alt={coverImage.alt ?? title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent mb-6">
            {title}
          </h1>

          {/* Links */}
          <div className="flex flex-wrap gap-4 mb-8">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="project-live-link"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="project-repo-link"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-semibold transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                View Repo
              </a>
            )}
          </div>

          {/* Tech Stack */}
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techStack.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Description */}
        {description && (
          <section className="prose prose-invert prose-lg max-w-none">
            <p className="text-white/70 leading-relaxed text-lg">{description}</p>
          </section>
        )}
      </article>
    </main>
  )
}
