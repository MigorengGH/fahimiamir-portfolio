'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Eye, LayoutGrid, ArrowLeft, ChevronLeft, ChevronRight, Terminal, Globe, Database, Folder, ArrowDownWideNarrow, ArrowUpNarrowWide, List, MonitorPlay, Github } from 'lucide-react'
import { TextReveal } from '@/components/text-reveal'
import { AnimatedReveal } from '@/components/animated-reveal'
import { getOptimizedImages, MasonryGallery, ImageSlider } from '@/components/media-gallery'

function formatDateStr(dateStr: string) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

type Filter = 'all' | 'software' | 'web' | 'data' | 'other'

interface ProjectSectionProps {
  data?: any // flexible for Sanity data shape
}

const BADGE_META: Record<string, any> = {
  software: {
    label: 'Software',
    Icon: Terminal,
    chip: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    glow: 'hover:shadow-blue-500/10',
  },
  web: {
    label: 'Web',
    Icon: Globe,
    chip: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
    glow: 'hover:shadow-purple-500/10',
  },
  data: {
    label: 'Data',
    Icon: Database,
    chip: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
    glow: 'hover:shadow-emerald-500/10',
  },
  other: {
    label: 'Other',
    Icon: Folder,
    chip: 'bg-gray-500/10 text-gray-500 border-gray-500/30',
    glow: 'hover:shadow-gray-500/10',
  }
}

const FILTER_BUTTONS: Array<{ key: Filter; label: string; Icon: React.ElementType }> = [
  { key: 'all', label: 'All', Icon: LayoutGrid },
  { key: 'software', label: 'Software', Icon: Terminal },
  { key: 'web', label: 'Web', Icon: Globe },
  { key: 'data', label: 'Data', Icon: Database },
  { key: 'other', label: 'Other', Icon: Folder },
]

export function ProjectSection({ data }: ProjectSectionProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [galleryMode, setGalleryMode] = useState<'masonry' | 'slider'>('slider')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [sortOrder, setSortOrder] = useState<'custom' | 'desc' | 'asc'>('custom')

  useEffect(() => {
    if (selectedProject) {
      const isMobile = window.innerWidth < 768
      setGalleryMode(isMobile ? 'slider' : 'masonry')
    }
  }, [selectedProject])

  const projects = data?.projects || []

  const filteredProjects = [...(activeFilter === 'all' 
      ? projects 
      : projects.filter((p: any) => 
          (p.category && p.category.toLowerCase() === activeFilter) || 
          (p.techStack && p.techStack.some((t: string) => t.toLowerCase() === activeFilter))
        ))].sort((a: any, b: any) => {
    if (sortOrder === 'custom') return 0;
    
    const getSortValue = (post: any) => {
      const dStr = post.endDate || post.startDate;
      if (dStr) return new Date(dStr).getTime();
      return post._createdAt ? new Date(post._createdAt).getTime() : 0;
    }
    
    const valA = getSortValue(a);
    const valB = getSortValue(b);
    
    if (valA === valB) {
       return a.title?.localeCompare(b.title) || 0;
    }
    return sortOrder === 'desc' ? valB - valA : valA - valB;
  })

  /* ── Detail view ─────────────────────────────────────────────── */
  if (selectedProject) {
    const meta = BADGE_META[selectedProject.category || 'software'] || BADGE_META.software
    const BadgeIcon = meta.Icon
    const techList = selectedProject.techStack || selectedProject.tech || []
    const previewUrl = selectedProject.liveUrl || '#'
    const sourceUrl = selectedProject.repoUrl || selectedProject.githubUrl || '#'
    
    return (
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center gap-2 text-sm px-4 py-2 bg-secondary border border-border rounded-xl text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all font-semibold shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all
          </button>

          {(selectedProject.imageUrls?.length > 1 || selectedProject.images?.length > 1) && (
            <div className="flex items-center bg-secondary border border-border rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setGalleryMode('masonry')}
                className={`p-1.5 rounded-lg transition-colors ${galleryMode === 'masonry' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                title="Gallery View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGalleryMode('slider')}
                className={`p-1.5 rounded-lg transition-colors ${galleryMode === 'slider' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                title="Slider View"
              >
                <MonitorPlay className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Detail card */}
        <div className="bg-secondary rounded-2xl border border-border overflow-hidden">
          {/* Images */}
          <div className="w-full bg-background border-b border-border relative">
            {galleryMode === 'slider' ? (
              <ImageSlider 
                images={getOptimizedImages(selectedProject)} 
                title={selectedProject.title} 
              />
            ) : (
              <MasonryGallery 
                images={getOptimizedImages(selectedProject)} 
                title={selectedProject.title} 
              />
            )}
          </div>

          <div className="p-5 md:p-8 space-y-4">
            {/* Badge + date */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-semibold ${meta.chip}`}>
                <BadgeIcon className="w-4 h-4" />
                {meta.label}
              </span>
              {(selectedProject.startDate) && (
                <span className="text-sm text-blue-500 font-medium">
                  {formatDateStr(selectedProject.startDate)}
                  {selectedProject.endDate && formatDateStr(selectedProject.startDate) !== formatDateStr(selectedProject.endDate) 
                    ? ` - ${formatDateStr(selectedProject.endDate)}` 
                    : ''}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-2xl font-bold text-foreground leading-snug">
              {selectedProject.title}
            </h3>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 py-1">
              {techList.map((t: string, ti: number) => (
                <span
                  key={ti}
                  className="px-2.5 py-1 bg-background border border-border rounded-lg text-xs text-muted-foreground font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Full description */}
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap text-justify">
              {selectedProject.description}
            </p>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-6 mt-6 border-t border-border gap-4">
              <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
                {previewUrl !== '#' && (
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </a>
                )}
                {sourceUrl !== '#' && (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-background border border-border text-foreground rounded-xl text-sm font-semibold hover:border-accent hover:text-accent transition-all shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    Github
                  </a>
                )}
              </div>

              {/* Next/Prev Navigation */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const idx = filteredProjects.findIndex((p: any) => p === selectedProject);
                    if (idx > 0) setSelectedProject(filteredProjects[idx - 1]);
                  }}
                  disabled={filteredProjects.findIndex((p: any) => p === selectedProject) <= 0}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-background border border-border rounded-xl text-sm text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={() => {
                    const idx = filteredProjects.findIndex((p: any) => p === selectedProject);
                    if (idx !== -1 && idx < filteredProjects.length - 1) setSelectedProject(filteredProjects[idx + 1]);
                  }}
                  disabled={filteredProjects.findIndex((p: any) => p === selectedProject) === -1 || filteredProjects.findIndex((p: any) => p === selectedProject) === filteredProjects.length - 1}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-background border border-border rounded-xl text-sm text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── List view ───────────────────────────────────────────────── */
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Heading */}
      <div>
        <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4">
          <TextReveal text="Projects" />
        </h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* Filter and view toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {FILTER_BUTTONS.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 ${activeFilter === key
                ? key === 'software' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : key === 'web' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : key === 'data' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : key === 'other' ? 'bg-gray-500 text-white shadow-lg shadow-gray-500/20'
                  : 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Sort toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === 'custom' ? 'desc' : sortOrder === 'desc' ? 'asc' : 'custom')}
            className="flex items-center gap-2 px-3 py-1.5 bg-secondary border border-border rounded-xl text-xs md:text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all shadow-sm h-full"
            title={`Sort: ${sortOrder === 'custom' ? 'Custom order' : sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}`}
          >
            {sortOrder === 'custom' ? <ArrowDownWideNarrow className="w-4 h-4" /> : sortOrder === 'desc' ? <ArrowDownWideNarrow className="w-4 h-4" /> : <ArrowUpNarrowWide className="w-4 h-4" />}
            {sortOrder === 'custom' ? 'Arranged' : sortOrder === 'desc' ? 'Newest' : 'Oldest'}
          </button>
          
          {/* View mode toggle */}
          <div className="hidden sm:flex items-center bg-secondary border border-border rounded-xl p-1 shadow-sm h-full">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards list/grid */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5" : "flex flex-col gap-4 md:gap-5"}>
        {filteredProjects.map((project: any, index: number) => {
          const meta = BADGE_META[project.category || 'software'] || BADGE_META.software
          const BadgeIcon = meta.Icon
          const techList = project.techStack || project.tech || []
          const previewUrl = project.liveUrl || '#'
          const sourceUrl = project.repoUrl || project.githubUrl || '#'

          return (
            <div key={project._id || index} className="h-full flex w-full">
              <AnimatedReveal delay={(index % 3) * 50} direction="up" className="h-full w-full">
                <div
                  onClick={() => setSelectedProject(project)}
                  className={`group relative bg-secondary border border-border overflow-hidden hover:border-accent hover:shadow-lg ${meta.glow} transition-all duration-300 flex cursor-pointer h-full ${viewMode === 'grid' ? 'flex-col rounded-xl md:rounded-2xl' : 'flex-col sm:flex-row items-stretch sm:items-center p-3 gap-4 rounded-xl md:rounded-2xl'}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden bg-background flex-shrink-0 ${viewMode === 'grid' ? 'aspect-video w-full' : 'aspect-video sm:aspect-[4/3] w-full sm:w-48 sm:h-32 rounded-lg'}`}>
                    <div className="w-full h-full">
                      {(() => {
                        const optimizedImages = getOptimizedImages(project)
                        const src = optimizedImages[0]
                        const isPdf = typeof src === 'string' && src.toLowerCase().includes('.pdf')
                        
                        return isPdf ? (
                          <div className={`relative overflow-hidden bg-secondary ${viewMode === 'grid' ? 'w-full h-full min-h-[200px]' : 'w-full h-full'}`}>
                            <iframe 
                              src={`${src}#toolbar=0&navpanes=0&scrollbar=0`} 
                              title={project.title}
                              className="w-full h-[400px] border-none pointer-events-none transform origin-top group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <img
                            src={src}
                            alt={project.title}
                            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${viewMode === 'grid' ? 'w-full h-auto min-h-[200px]' : 'w-full h-full'}`}
                          />
                        )
                      })()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex flex-col flex-1 ${viewMode === 'grid' ? 'p-4 md:p-5' : 'py-2 px-1 sm:px-2'}`}>
                    {/* Badge + date */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${meta.chip}`}>
                        <BadgeIcon className="w-3 h-3" />
                        {meta.label}
                      </span>
                      {(project.startDate) && (
                        <span className="text-xs text-blue-500 font-medium ml-auto">
                          {formatDateStr(project.startDate)}
                          {project.endDate && formatDateStr(project.startDate) !== formatDateStr(project.endDate)
                            ? ` - ${formatDateStr(project.endDate)}`
                            : ''}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-1 text-justify line-clamp-2 mt-2">
                      {project.description}
                    </p>

                    {/* Read more cue */}
                    <div className="flex items-center gap-1 mt-3 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                    
                    {viewMode === 'grid' && (
                      <div className="flex flex-col gap-3 mt-auto pt-4">
                        <div className="flex flex-wrap gap-1.5">
                          {techList.slice(0, 4).map((t: string, ti: number) => (
                            <span
                              key={ti}
                              className="px-2.5 py-0.5 bg-background border border-border rounded-lg text-xs text-muted-foreground font-medium"
                            >
                              {t}
                            </span>
                          ))}
                          {techList.length > 4 && (
                             <span className="px-2.5 py-0.5 bg-background border border-border rounded-lg text-xs text-muted-foreground font-medium">
                               +{techList.length - 4} more
                             </span>
                          )}
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex md:hidden gap-2 pt-3 border-t border-border">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-accent text-accent-foreground rounded-lg text-xs font-semibold shadow-sm active:scale-95 transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Details
                          </button>
                          {sourceUrl !== '#' && (
                          <a
                            href={sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => { e.stopPropagation(); }}
                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-background border border-border text-foreground rounded-lg text-xs font-semibold shadow-sm active:scale-95 transition-all"
                          >
                            <Github className="w-3.5 h-3.5" />
                            Github
                          </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedReveal>
            </div>
          )
        })}
      </div>
    </div>
  )
}
