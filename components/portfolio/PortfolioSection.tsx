'use client'

import { useState } from 'react'
import { ExternalLink, Layers } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}


const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  software: 'Software',
  web: 'Web',
  data: 'Data',
  video: 'Video',
}

// Placeholder gradient backgrounds for cards with no image
const CARD_GRADIENTS = [
  'from-violet-900/60 via-violet-800/30 to-black',
  'from-amber-900/60 via-amber-800/30 to-black',
  'from-indigo-900/60 via-indigo-800/30 to-black',
  'from-rose-900/60 via-rose-800/30 to-black',
  'from-emerald-900/60 via-emerald-800/30 to-black',
  'from-cyan-900/60 via-cyan-800/30 to-black',
  'from-purple-900/60 via-purple-800/30 to-black',
]

interface PortfolioSectionProps {
  data?: typeof portfolioData
}

export function PortfolioSection({ data = portfolioData }: PortfolioSectionProps) {
  const [active, setActive] = useState('all')

  const filtered =
    active === 'all'
      ? data.projects
      : data.projects.filter((p) => p.category === active)

  return (
    <div className="section-content">
      <div className="section-heading">
        <span className="section-num">03</span>
        <div>
          <h2 className="section-title">Portfolio</h2>
          <div className="section-underline" />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {data.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              active === cat
                ? 'bg-gold text-black'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((project, i) => (
          <div key={i} className="project-card group">
            {/* Card art */}
            <div className={`h-36 rounded-xl overflow-hidden bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} flex items-center justify-center mb-4 relative`}>
              <div className="absolute inset-0 opacity-20 noise-texture" />
              <Layers className="w-10 h-10 text-white/20" />
              {/* Category badge */}
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/40 text-gold border border-gold/20">
                {project.category}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug group-hover:text-gold transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-white/45 leading-relaxed mb-3">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t, ti) => (
                <span key={ti} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-white/50">
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex gap-3 pt-3 border-t border-white/5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white/50 hover:text-gold transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white/50 hover:text-amber-400 transition-colors"
                  >
                    <GitHubIcon className="w-3 h-3" />
                    Code
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
