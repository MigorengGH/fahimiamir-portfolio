import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types'
import { urlFor } from '@/lib/sanity'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, slug, description, techStack, coverImage, liveUrl, repoUrl } = project

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10">
      {/* Cover Image */}
      <Link href={`/projects/${slug.current}`} className="block overflow-hidden aspect-video relative bg-white/5">
        {coverImage?.asset ? (
          <Image
            src={urlFor(coverImage).width(800).height(450).auto('format').url()}
            alt={coverImage.alt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900/40 to-indigo-900/40">
            <span className="text-5xl opacity-30">🚀</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex flex-col gap-2">
          <Link href={`/projects/${slug.current}`}>
            <h2 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors line-clamp-2">
              {title}
            </h2>
          </Link>
          {description && (
            <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">{description}</p>
          )}
        </div>

        {/* Tech Stack */}
        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {techStack.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 pt-2 border-t border-white/10">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-live-${slug.current}`}
              className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-repo-${slug.current}`}
              className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Repo
            </a>
          )}
          <Link
            href={`/projects/${slug.current}`}
            id={`project-detail-${slug.current}`}
            className="ml-auto flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
          >
            View →
          </Link>
        </div>
      </div>
    </article>
  )
}
