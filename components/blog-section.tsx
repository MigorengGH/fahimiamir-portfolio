'use client'

import { useState } from 'react'
import { Trophy, Users, LayoutGrid, ChevronRight, ChevronLeft, ExternalLink, ArrowLeft, Home } from 'lucide-react'
import { TextReveal } from '@/components/text-reveal'
import { AnimatedReveal } from '@/components/animated-reveal'

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
        {/* Heading */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            <TextReveal text="Blog" />
          </h2>
          <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-1 hover:text-accent transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Blog
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-border flex-shrink-0" />
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${meta.chip}`}
          >
            <BadgeIcon className="w-3 h-3" />
            {meta.label}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-border flex-shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{selectedPost.title}</span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all
        </button>

        {/* Detail card */}
        <div className="bg-secondary rounded-2xl border border-border overflow-hidden">
          {/* Images */}
          <div className="w-full bg-background border-b border-border relative">
            {selectedPost.imageUrls?.length > 0 ? (
              <ImageSlider images={selectedPost.imageUrls} title={selectedPost.title} />
            ) : (
              <img
                src={selectedPost.imageUrl || selectedPost.image || '/placeholder.svg'}
                alt={selectedPost.title}
                className="w-full h-auto max-h-[70vh] object-contain mx-auto"
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

            {/* Visit button if URL */}
            {selectedPost.url && (
              <a
                href={selectedPost.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity mt-2"
              >
                <ExternalLink className="w-4 h-4" />
                Visit
              </a>
            )}
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
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 ${
              activeFilter === key
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filtered.map((post: any, index: number) => {
          const meta = BADGE_META[post.category || 'award'] || BADGE_META.award
          const BadgeIcon = meta.Icon
          return (
            <AnimatedReveal key={index} delay={index * 100} direction="up" className="h-full">
              <div
                onClick={() => setSelectedPost(post)}
                className={`group relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent hover:shadow-lg ${meta.glow} transition-all duration-300 flex flex-col cursor-pointer h-full`}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-background flex-shrink-0">
                  <AnimatedReveal delay={index * 100 + 150} direction="none" className="w-full h-full">
                    <img
                      src={(post.imageUrls && post.imageUrls[0]) || post.imageUrl || post.image || '/placeholder.svg'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
          )
        })}
      </div>
    </div>
  )
}

function ImageSlider({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) return null
  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={title}
        className="w-full h-auto max-h-[70vh] object-contain mx-auto"
      />
    )
  }

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full group">
      <img
        src={images[currentIndex]}
        alt={`${title} - Image ${currentIndex + 1}`}
        className="w-full h-auto max-h-[70vh] object-contain mx-auto transition-opacity duration-300"
      />
      
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-md border border-border text-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-background/80"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-md border border-border text-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-background/80"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-1.5 rounded-full bg-background/50 backdrop-blur-md border border-border">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex(index)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-foreground scale-125' : 'bg-foreground/40 hover:bg-foreground/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
