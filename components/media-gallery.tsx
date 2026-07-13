'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { urlFor } from '@/sanity/lib/image'

export function getOptimizedImageSrc(imageObj: any, fallbackUrl: string) {
  if (!imageObj) return fallbackUrl
  if (typeof fallbackUrl === 'string' && fallbackUrl.toLowerCase().includes('.pdf')) return fallbackUrl
  try {
    return urlFor(imageObj).url()
  } catch (e) {
    return fallbackUrl
  }
}

export function getOptimizedImages(post: any) {
  if (post.images && post.images.length > 0) {
    return post.images.map((img: any, i: number) => getOptimizedImageSrc(img, post.imageUrls?.[i] || ''))
  }
  if (post.image) {
    return [getOptimizedImageSrc(post.image, post.imageUrl || '')]
  }
  return [(post.imageUrls && post.imageUrls[0]) || post.imageUrl || '/placeholder.svg']
}

export function MediaItem({ src, alt, isPopup = false, className, pdfClassName }: { src: string, alt: string, isPopup?: boolean, className?: string, pdfClassName?: string }) {
  const isPdf = typeof src === 'string' && src.toLowerCase().includes('.pdf')
  
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
      className={className || (isPopup ? "max-w-full max-h-[95vh] object-contain rounded-lg" : "w-full h-auto rounded-xl border border-border/50 shadow-sm")}
    />
  )
}

export function LightboxPopup({
  images,
  title,
  activeIndex,
  onClose,
  onChangeIndex
}: {
  images: string[],
  title: string,
  activeIndex: number | null,
  onClose: () => void,
  onChangeIndex: (index: number) => void
}) {
  return (
    <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="max-w-5xl sm:max-w-5xl w-[90vw] h-[85vh] md:h-auto border-none bg-transparent shadow-none p-0 overflow-hidden flex items-center justify-center">
        <DialogTitle className="sr-only">{title} Preview</DialogTitle>
        {activeIndex !== null && (
          <div className="relative w-full h-full flex items-center justify-center px-4 md:px-16 group">
            <MediaItem src={images[activeIndex]} alt={`${title} - Image ${activeIndex + 1}`} isPopup />
            
            <button
              onClick={(e) => { e.stopPropagation(); onClose() }}
              className="absolute top-2 right-2 md:top-4 md:right-4 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:scale-105 transition-all z-30 shadow-2xl backdrop-blur-sm"
              aria-label="Close"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); onChangeIndex((activeIndex - 1 + images.length) % images.length) }}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:scale-105 transition-all z-20 shadow-2xl backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onChangeIndex((activeIndex + 1) % images.length) }}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:scale-105 transition-all z-20 shadow-2xl backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function MasonryGallery({ images, title }: { images: string[], title: string }) {
  const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  if (images.length === 1) {
    return (
      <>
        <div 
          className="cursor-pointer hover:scale-[1.02] transition-transform duration-300 w-full max-w-2xl mx-auto p-4 md:p-6"
          onClick={() => setActivePopupIndex(0)}
        >
          <MediaItem src={images[0]} alt={title} />
        </div>
        <LightboxPopup 
          images={images} 
          title={title} 
          activeIndex={activePopupIndex} 
          onClose={() => setActivePopupIndex(null)} 
          onChangeIndex={setActivePopupIndex} 
        />
      </>
    )
  }

  return (
    <>
      <div className="p-4 md:p-6 bg-background pt-16 sm:pt-6">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {images.map((src, index) => (
            <div key={index} className="break-inside-avoid mb-4">
              <div 
                className="cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                onClick={() => setActivePopupIndex(index)}
              >
                <MediaItem src={src} alt={`${title} - Image ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <LightboxPopup 
        images={images} 
        title={title} 
        activeIndex={activePopupIndex} 
        onClose={() => setActivePopupIndex(null)} 
        onChangeIndex={setActivePopupIndex} 
      />
    </>
  )
}

export function ImageSlider({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (!images || images.length <= 1 || !isAutoplay) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images, isAutoplay])

  if (!images || images.length === 0) return null

  if (images.length === 1) {
    return <MasonryGallery images={images} title={title} />
  }

  return (
    <>
      <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:h-[350px] md:h-[450px] bg-transparent overflow-hidden group rounded-xl">
        <div 
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 flex items-center justify-center p-2 sm:p-3 md:px-12 md:py-2">
               <div 
                 className="cursor-pointer flex items-center justify-center w-full h-full hover:scale-[1.01] transition-transform duration-300"
                 onClick={() => setActivePopupIndex(index)}
               >
                 <MediaItem 
                   src={src} 
                   alt={`${title} - Image ${index + 1}`} 
                   className="max-w-full max-h-full object-contain rounded-xl shadow-lg border border-border/50 bg-background/20"
                   pdfClassName="h-full aspect-video rounded-xl border border-border/50 bg-secondary overflow-hidden shadow-md relative group"
                 />
               </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={(e) => { 
            e.stopPropagation()
            setIsAutoplay(false)
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length) 
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-background/50 border border-border/50 text-foreground md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background z-20 shadow-lg backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button 
          onClick={(e) => { 
            e.stopPropagation()
            setIsAutoplay(false)
            setCurrentIndex((prev) => (prev + 1) % images.length) 
          }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-background/50 border border-border/50 text-foreground md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background z-20 shadow-lg backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-background/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { 
                e.stopPropagation()
                setIsAutoplay(false)
                setCurrentIndex(i) 
              }}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-accent w-5 sm:w-6 shadow-sm' : 'bg-foreground/50 hover:bg-foreground/80'}`}
            />
          ))}
        </div>
      </div>
      
      <LightboxPopup 
        images={images} 
        title={title} 
        activeIndex={activePopupIndex} 
        onClose={() => setActivePopupIndex(null)} 
        onChangeIndex={setActivePopupIndex} 
      />
    </>
  )
}
