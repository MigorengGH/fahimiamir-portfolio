'use client'

import { useState, useEffect } from 'react'
import { ProfileSidebar } from '@/components/profile-sidebar'
import { AboutSection } from '@/components/about-section'
import { ResumeSection } from '@/components/resume-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { BlogSection } from '@/components/blog-section'
import { ThemeToggle } from '@/components/theme-toggle'

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

  return (
    <div className="min-h-screen bg-transparent px-3 pb-3 pt-20 sm:px-4 sm:pb-4 sm:pt-24 md:p-6 lg:p-12 relative z-10">
      {/* Floating Controls */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 md:top-6 md:left-auto md:-translate-x-0 md:right-6 z-50 flex items-center justify-between w-[calc(100%-2rem)] md:w-auto gap-2">
        {/* Navigation Pill (Mobile Only) */}
        <nav className="md:hidden flex flex-1 items-center justify-center gap-1 sm:gap-2 p-1.5 bg-card/80 backdrop-blur-md border border-border rounded-full shadow-lg overflow-x-auto scrollbar-hide">
          {NAV_TABS.map((section) => (
            <button
              key={section}
              onClick={() => {
                setActiveSection(section)
                const el = document.getElementById('main-content')
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 80 // offset for fixed nav
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all whitespace-nowrap flex-shrink-0 ${
                activeSection === section
                  ? 'text-accent-foreground bg-accent shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {section}
            </button>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className="flex-shrink-0 bg-card/80 backdrop-blur-md rounded-full shadow-lg border border-border md:bg-transparent md:border-none md:shadow-none md:rounded-none">
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-6">
          <ProfileSidebar data={profileData} />

          {/* Main Content */}
          <main id="main-content" className="flex-1 bg-card/80 backdrop-blur-md rounded-xl md:rounded-2xl border border-border overflow-hidden shadow-xl shadow-accent/5">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-4 p-6 border-b border-border">
              {NAV_TABS.map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    activeSection === section
                      ? 'text-foreground bg-accent/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {section}
                </button>
              ))}
            </nav>

            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              {activeSection === 'about' && <AboutSection data={aboutData} />}
              {activeSection === 'resume' && <ResumeSection data={resumeData} />}
              {activeSection === 'portfolio' && <PortfolioSection data={portfolioData} />}
              {activeSection === 'blog' && <BlogSection data={blogData} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
