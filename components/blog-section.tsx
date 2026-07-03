'use client'

import { useState, useEffect } from 'react'
import { Trophy, Users, LayoutGrid, ChevronRight, ChevronLeft, ExternalLink, ArrowLeft, Home, FileText, MonitorPlay } from 'lucide-react'
import { TextReveal } from '@/components/text-reveal'
import { AnimatedReveal } from '@/components/animated-reveal'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'

type Filter = 'all' | 'award' | 'extracurricular'

interface BlogSectionProps {
  data?: any // flexible for Sanity data shape
}

const BADGE_META: Record<string, any> = {
  award: {
    label: 'Award',
    Icon: Trophy,
    chip: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    glow: 'hover:shadow-amber-500/10',
  },
  extracurricular: {
    label: 'Extracurricular',
    Icon: Users,
    chip: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    glow: 'hover:shadow-blue-500/10',
  },
}

const FILTER_BUTTONS: Array<{ key: Filter; label: string; Icon: React.ElementType }> = [
  { key: 'all', label: 'All', Icon: LayoutGrid },
  { key: 'award', label: 'Award', Icon: Trophy },
  { key: 'extracurricular', label: 'Extracurricular', Icon: Users },
]

export function BlogSection({ data }: BlogSectionProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [galleryMode, setGalleryMode] = useState<'masonry' | 'slider'>('slider')

  const posts = data?.posts || []
  const categories = data?.categories || ['all', 'award', 'extracurricular']

  const filtered =
    activeFilter === 'all' ? posts : posts.filter((p: any) => p.category === activeFilter)

  /* ── Detail view ─────────────────────────────────────────────── */
  if (selectedPost) {
    const meta = BADGE_META[selectedPost.category || 'award'] || BADGE_META.award
    const BadgeIcon = meta.Icon
    return (
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-sm px-4 py-2 bg-secondary border border-border rounded-xl text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all font-semibold shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all
          </button>

          {selectedPost.imageUrls?.length > 1 && (
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
                images={selectedPost.imageUrls?.length > 0 ? selectedPost.imageUrls : [selectedPost.imageUrl || selectedPost.image || '/placeholder.svg']} 
                title={selectedPost.title} 
              />
            ) : (
              <MasonryGallery 
                images={selectedPost.imageUrls?.length > 0 ? selectedPost.imageUrls : [selectedPost.imageUrl || selectedPost.image || '/placeholder.svg']} 
                title={selectedPost.title} 
              />
            )}
          </div>

          <div className="p-5 md:p-8 space-y-4">
            {/* Badge + year */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${meta.chip}`}>
                <BadgeIcon className="w-3.5 h-3.5" />
                {meta.label}
              </span>
              <span className="text-sm text-muted-foreground">{selectedPost.year}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
              {selectedPost.title}
            </h3>

            {/* Org */}
            <p className="text-sm text-accent font-semibold">{selectedPost.org}</p>

            {/* Full description */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {selectedPost.description}
            </p>

            <div className="flex flex-row justify-between items-center pt-6 mt-6 border-t border-border gap-2">
              <div className="flex gap-3 items-center">
                {selectedPost.url ? (
                  <a
                    href={selectedPost.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-xl text-xs md:text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit
                  </a>
                ) : (
                  <div className="hidden" />
                )}
              </div>

              {/* Next/Prev Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const idx = filtered.findIndex((p: any) => p === selectedPost);
                    if (idx > 0) setSelectedPost(filtered[idx - 1]);
                  }}
                  disabled={filtered.findIndex((p: any) => p === selectedPost) <= 0}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-background border border-border rounded-xl text-xs md:text-sm text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={() => {
                    const idx = filtered.findIndex((p: any) => p === selectedPost);
                    if (idx !== -1 && idx < filtered.length - 1) setSelectedPost(filtered[idx + 1]);
                  }}
                  disabled={filtered.findIndex((p: any) => p === selectedPost) === -1 || filtered.findIndex((p: any) => p === selectedPost) === filtered.length - 1}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-background border border-border rounded-xl text-xs md:text-sm text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm"
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
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          <TextReveal text="Blog" />
        </h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* Badge filter bar */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {FILTER_BUTTONS.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 ${activeFilter === key
              ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
              : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5">
        {filtered.map((post: any, index: number) => {
          const meta = BADGE_META[post.category || 'award'] || BADGE_META.award
          const BadgeIcon = meta.Icon
          return (
            <div key={index} className="break-inside-avoid mb-4 md:mb-5">
              <AnimatedReveal delay={index * 100} direction="up" className="h-full">
                <div
                  onClick={() => setSelectedPost(post)}
                  className={`group relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent hover:shadow-lg ${meta.glow} transition-all duration-300 flex flex-col cursor-pointer h-full`}
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-background flex-shrink-0">
                    <AnimatedReveal delay={index * 100 + 150} direction="none" className="w-full h-full">
                      {(() => {
                        const src = (post.imageUrls && post.imageUrls[0]) || post.imageUrl || post.image || '/placeholder.svg'
                        const isPdf = src.toLowerCase().includes('.pdf')
                        
                        return isPdf ? (
                          <div className="w-full h-full min-h-[200px] relative overflow-hidden bg-secondary">
                            <iframe 
                              src={`${src}#toolbar=0&navpanes=0&scrollbar=0`} 
                              title={post.title}
                              className="w-full h-[400px] border-none pointer-events-none transform origin-top group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <img
                            src={src}
                            alt={post.title}
                            className="w-full h-auto min-h-[200px] object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )
                      })()}
                    </AnimatedReveal>

                    {/* Hover overlay with Visit button */}
                    <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedPost(post)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-xs font-semibold shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300 cursor-pointer hover:opacity-90"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Visit
                      </div>
                    </div>
                  </div>

                {/* Content */}
                <div className="p-4 md:p-5 flex flex-col flex-1">
                  {/* Badge + year */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${meta.chip}`}>
                      <BadgeIcon className="w-3 h-3" />
                      {meta.label}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">{post.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm md:text-base font-semibold text-foreground mb-1.5 leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>

                  {/* Org */}
                  <p className="text-xs text-accent font-medium mb-2">{post.org}</p>

                  {/* Description — clipped in list, full in detail */}
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                    {post.description}
                  </p>

                  {/* Read more cue */}
                  <div className="flex items-center gap-1 mt-3 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
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

function MediaItem({ src, alt, isPopup = false, className, pdfClassName }: { src: string, alt: string, isPopup?: boolean, className?: string, pdfClassName?: string }) {
  const isPdf = src.toLowerCase().includes('.pdf')
  
  if (isPdf) {
    if (isPopup) {
      return (
        <iframe 
          src={`${src}#toolbar=0`} 
          title={alt}
          className="w-full h-[85vh] rounded-lg bg-background" 
        />
      )
    }
    
    return (
      <div className={pdfClassName || "w-full aspect-[3/4] rounded-xl border border-border/50 bg-secondary overflow-hidden shadow-sm relative group"}>
        <iframe 
          src={`${src}#toolbar=0&navpanes=0&scrollbar=0`} 
          title={alt}
          className="w-full h-full border-none pointer-events-none"
        />
        {/* Invisible overlay to capture clicks */}
        <div className="absolute inset-0 z-10 cursor-pointer bg-transparent" />
      </div>
    )
  }
  
  return (
    <img
      src={src}
      alt={alt}
      className={className || (isPopup ? "max-w-full max-h-[90vh] object-contain rounded-lg" : "w-full h-auto rounded-xl border border-border/50 shadow-sm")}
    />
  )
}

function MasonryGallery({ images, title }: { images: string[], title: string }) {
  if (!images || images.length === 0) return null

  if (images.length === 1) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer hover:scale-[1.02] transition-transform duration-300 w-full max-w-2xl mx-auto p-4 md:p-6">
            <MediaItem src={images[0]} alt={title} />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-5xl w-[95vw] border-none bg-transparent shadow-none p-0 overflow-hidden flex items-center justify-center">
          <DialogTitle className="sr-only">{title} Preview</DialogTitle>
          <MediaItem src={images[0]} alt={title} isPopup />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="p-4 md:p-6 bg-background pt-16 sm:pt-6">
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
        {images.map((src, index) => (
          <div key={index} className="break-inside-avoid mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                  <MediaItem src={src} alt={`${title} - Image ${index + 1}`} />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[95vw] border-none bg-transparent shadow-none p-0 overflow-hidden flex items-center justify-center">
                <DialogTitle className="sr-only">{`${title} - Image ${index + 1} Preview`}</DialogTitle>
                <MediaItem src={src} alt={`${title} - Image ${index + 1}`} isPopup />
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  )
}

function ImageSlider({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images])

  if (!images || images.length === 0) return null

  if (images.length === 1) {
    return <MasonryGallery images={images} title={title} />
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] bg-background/30 overflow-hidden group">
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 flex items-center justify-center p-4 pb-12 md:pb-4 md:px-16">
             <Dialog>
               <DialogTrigger asChild>
                 <div className="cursor-pointer flex items-center justify-center w-full h-full hover:scale-[1.01] transition-transform duration-300">
                   <MediaItem 
                     src={src} 
                     alt={`${title} - Image ${index + 1}`} 
                     className="max-w-full max-h-full object-contain rounded-xl shadow-md"
                     pdfClassName="h-full aspect-[3/4] rounded-xl border border-border/50 bg-secondary overflow-hidden shadow-md relative group"
                   />
                 </div>
               </DialogTrigger>
               <DialogContent className="max-w-5xl w-[95vw] border-none bg-transparent shadow-none p-0 overflow-hidden flex items-center justify-center">
                 <DialogTitle className="sr-only">{`${title} - Image ${index + 1} Preview`}</DialogTitle>
                 <MediaItem src={src} alt={`${title} - Image ${index + 1}`} isPopup />
               </DialogContent>
             </Dialog>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length) }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/50 border border-border/50 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background z-20 shadow-lg backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % images.length) }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/50 border border-border/50 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background z-20 shadow-lg backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-background/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i) }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-accent w-6 shadow-sm' : 'bg-foreground/50 hover:bg-foreground/80'}`}
          />
        ))}
      </div>
    </div>
  )
}
