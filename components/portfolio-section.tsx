'use client'

import { useState, useMemo } from 'react'
import { ExternalLink, Eye } from 'lucide-react'

interface PortfolioSectionProps {
  data?: any // flexible for Sanity data shape
}

export function PortfolioSection({ data }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = data?.projects || []
  
  // Extract unique tags/categories from projects for the filter tabs
  const categories = useMemo(() => {
    if (data?.categories) return data.categories
    const tags = new Set<string>(['all'])
    projects.forEach((p: any) => {
       if (p.techStack) p.techStack.forEach((t: string) => tags.add(t.toLowerCase()))
    })
    return Array.from(tags)
  }, [data, projects])

  // If using techStack for filtering, check if any techStack includes the filter
  const filteredProjects =
    activeFilter === 'all' 
      ? projects 
      : projects.filter((p: any) => 
          (p.category && p.category.toLowerCase() === activeFilter.toLowerCase()) || 
          (p.techStack && p.techStack.some((t: string) => t.toLowerCase() === activeFilter.toLowerCase()))
        )

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Portfolio</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {categories.map((category: string) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium capitalize transition-all ${
              activeFilter === category
                ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {filteredProjects.map((project: any, index: number) => {
          // Fallbacks to support both static and Sanity data
          const imageSrc = project.coverImage?.asset?.url || project.image || '/placeholder.svg'
          const techList = project.techStack || project.tech || []
          const previewUrl = project.liveUrl || '#'
          const sourceUrl = project.repoUrl || project.githubUrl || '#'

          return (
            <div
              key={project._id || index}
              className="group bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 flex flex-col"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-background flex-shrink-0">
                <img
                  src={imageSrc}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {project.category && (
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-[10px] font-bold text-accent uppercase tracking-wider">
                  {project.category}
                </div>
                )}

                <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (previewUrl === '#') e.preventDefault() }}
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-xs font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all scale-90 group-hover:scale-100 duration-300"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </a>
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (sourceUrl === '#') e.preventDefault() }}
                    className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-foreground rounded-lg text-xs font-semibold shadow-lg hover:border-accent hover:text-accent active:scale-95 transition-all scale-90 group-hover:scale-100 duration-300 delay-[40ms]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit
                  </a>
                </div>
              </div>

              <div className="p-4 md:p-5 flex flex-col gap-2 flex-1">
                <h3 className="text-base md:text-lg font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {techList.map((t: string, ti: number) => (
                    <span
                      key={ti}
                      className="px-2.5 py-0.5 bg-background border border-border rounded-lg text-xs text-muted-foreground font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
