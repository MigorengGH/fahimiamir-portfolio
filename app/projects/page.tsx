import { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { projectsListQuery } from '@/lib/queries'
import { Project } from '@/types'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects | Fahimi Amir Portfolio',
  description: 'A showcase of my projects — built with modern web technologies.',
}

// ISR: revalidate every 60 seconds
export const revalidate = 60

export default async function ProjectsPage() {
  const projects: Project[] = await client.fetch(projectsListQuery)

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-indigo-900/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-6">
            ✦ Selected Work
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent mb-6">
            Projects
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Things I&apos;ve built — from side experiments to production-grade applications.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-white/30">
            <span className="text-6xl mb-4">🚧</span>
            <p className="text-lg">No projects yet — add some in Sanity Studio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
