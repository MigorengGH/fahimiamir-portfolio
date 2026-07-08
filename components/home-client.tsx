'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProfileSidebar } from '@/components/profile-sidebar'
import { AboutSection } from '@/components/about-section'
import { ResumeSection } from '@/components/resume-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { BlogSection } from '@/components/blog-section'
import { User, FileText, Briefcase, Pencil } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { HeroLanding } from '@/components/hero-landing'
import { BottomDock } from '@/components/bottom-dock'

const NAV_TABS = ['about', 'resume', 'portfolio', 'blog'] as const
type NavTab = (typeof NAV_TABS)[number]

interface HomeClientProps {
  profileData: any
  aboutData: any
  resumeData: any
  portfolioData: any
  blogData: any
}

export function HomeClient({
  profileData,
  aboutData,
  resumeData,
  portfolioData,
  blogData,
}: HomeClientProps) {
  const [activeSection, setActiveSection] = useState<NavTab>('about')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showLanding, setShowLanding] = useState(true)

  const handleSelectSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      setShowLanding(true)
    } else {
      setShowLanding(false)
      setActiveSection(sectionId as NavTab)
      const el = document.getElementById('main-content')
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }, [])

  // Lock scroll while landing page is visible
  useEffect(() => {
    if (showLanding) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showLanding])
  // Handle mobile pull to next section
  useEffect(() => {
    let startY: number | null = null
    let isPulling = false

    const handleTouchMove = (e: TouchEvent) => {
      // Only apply on mobile devices
      if (window.innerWidth >= 768 || isTransitioning) return

      // Calculate how close we are to the bottom of the page
      const scrollPosition = window.innerHeight + window.scrollY
      const pageHeight = document.documentElement.scrollHeight
      const isAtBottom = scrollPosition >= pageHeight - 10

      if (isAtBottom) {
        if (!isPulling) {
          isPulling = true
          startY = e.touches[0].clientY
        } else if (startY !== null) {
          const currentY = e.touches[0].clientY
          const distance = startY - currentY // positive distance means swiping up
          
          // Require a deliberate pull of 80px to navigate (more force)
          if (distance > 80) {
            const currentIndex = NAV_TABS.indexOf(activeSection)
            if (currentIndex < NAV_TABS.length - 1) {
              setIsTransitioning(true)
              const nextSection = NAV_TABS[currentIndex + 1]
              
              setActiveSection(nextSection)
              isPulling = false
              startY = null
              
              // Scroll back to the top of the main content smoothly
              setTimeout(() => {
                const el = document.getElementById('main-content')
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 80
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
                // Allow transitions again after the scroll completes
                setTimeout(() => setIsTransitioning(false), 800)
              }, 50)
            }
          }
        }
      } else {
        isPulling = false
        startY = null
      }
    }

    const handleTouchEnd = () => {
      isPulling = false
      startY = null
    }

    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeSection, isTransitioning])

  return (
    <>
      <AnimatePresence>
        {showLanding && (
          <HeroLanding 
            key="hero"
            onEnter={() => setShowLanding(false)} 
            data={profileData}
          />
        )}
      </AnimatePresence>

      {!showLanding && (
      <div 
        className="min-h-screen bg-transparent px-3 pb-3 pt-4 sm:px-4 sm:pb-24 sm:pt-6 md:p-6 lg:p-12 relative z-10 animate-in fade-in duration-1000"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-6">
          <ProfileSidebar data={profileData} />

          {/* Main Content */}
          <motion.main 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            id="main-content" 
            className="flex-1 bg-card/80 backdrop-blur-md rounded-xl md:rounded-2xl border border-border overflow-hidden shadow-xl shadow-accent/5 mb-16 md:mb-0 relative min-h-[450px] sm:min-h-[550px] md:min-h-[650px]"
          >
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-between px-6 py-3 border-b border-border">
              <div className="flex gap-4">
                {NAV_TABS.map((section) => {
                  const Icon = section === 'about' ? User : section === 'resume' ? FileText : section === 'portfolio' ? Briefcase : Pencil
                  const colorClass = section === 'about' ? 'text-blue-500' : section === 'resume' ? 'text-green-500' : section === 'portfolio' ? 'text-purple-500' : 'text-orange-500'
                  
                  return (
                    <button
                      key={section}
                      onClick={() => handleSelectSection(section)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeSection === section
                          ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      <Icon className={`size-4 ${activeSection !== section ? colorClass : ''}`} />
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  )
                })}
              </div>
              <ThemeToggle />
            </nav>

            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              <div key={activeSection} className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
                {activeSection === 'about' && <AboutSection data={aboutData} />}
                {activeSection === 'resume' && <ResumeSection data={resumeData} />}
                {activeSection === 'portfolio' && <PortfolioSection data={portfolioData} />}
                {activeSection === 'blog' && <BlogSection data={blogData} />}
              </div>
            </div>
          </motion.main>
          </div>
        </div>
      </div>
      )}
    <BottomDock 
      activeSection={showLanding ? 'hero' : activeSection} 
      onSelectSection={handleSelectSection} 
      social={profileData.social}
    />
    </>
  )
}


