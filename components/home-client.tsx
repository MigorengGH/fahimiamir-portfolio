'use client'

import { useState } from 'react'
import { ProfileSidebar } from '@/components/profile-sidebar'
import { AboutSection } from '@/components/about-section'
import { ResumeSection } from '@/components/resume-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { BlogSection } from '@/components/blog-section'
import { ContactSection } from '@/components/contact-section-new'
import { ThemeToggle } from '@/components/theme-toggle'

// Assuming you still want static contact data for the map embed url, or we can use the profile data.
import { contactData } from '@/lib/portfolio-data'

const NAV_TABS = ['about', 'resume', 'portfolio', 'blog', 'contact'] as const
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

  // We merge profileData into contactData for email/phone/location to stay dynamic, but keep the map embed
  const mergedContactData = {
    ...contactData,
    email: profileData?.email || contactData.email,
    phone: profileData?.phone || contactData.phone,
    location: profileData?.location || contactData.location,
  }

  return (
    <div className="min-h-screen bg-transparent p-3 sm:p-4 md:p-6 lg:p-12 relative z-10">
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
          <ProfileSidebar data={profileData} />

          {/* Main Content */}
          <main className="flex-1 bg-card/80 backdrop-blur-md rounded-xl md:rounded-2xl border border-border overflow-hidden shadow-xl shadow-accent/5">
            {/* Navigation */}
            <nav className="flex gap-1 sm:gap-2 md:gap-4 p-3 sm:p-4 md:p-6 border-b border-border overflow-x-auto scrollbar-hide sticky top-0 bg-card/80 backdrop-blur-md z-40">
              {NAV_TABS.map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section)
                    const el = document.getElementById(`section-${section}`)
                    if (el && window.innerWidth < 768) {
                      el.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap flex-shrink-0 ${
                    activeSection === section
                      ? 'text-foreground bg-accent/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {section}
                </button>
              ))}
            </nav>

            {/* Desktop View (Tabbed) */}
            <div className="hidden md:block p-6 lg:p-8">
              {activeSection === 'about' && <AboutSection data={aboutData} />}
              {activeSection === 'resume' && <ResumeSection data={resumeData} />}
              {activeSection === 'portfolio' && <PortfolioSection data={portfolioData} />}
              {activeSection === 'blog' && <BlogSection data={blogData} />}
              {activeSection === 'contact' && <ContactSection data={mergedContactData} />}
            </div>

            {/* Mobile View (Scrollable all sections) */}
            <div className="md:hidden flex flex-col h-[calc(100vh-10rem)] overflow-y-auto snap-y snap-mandatory scroll-smooth">
              <div id="section-about" className="snap-start snap-always p-4 sm:p-5 border-b border-border min-h-[calc(100vh-10rem)]">
                <AboutSection data={aboutData} />
              </div>
              <div id="section-resume" className="snap-start snap-always p-4 sm:p-5 border-b border-border min-h-[calc(100vh-10rem)]">
                <ResumeSection data={resumeData} />
              </div>
              <div id="section-portfolio" className="snap-start snap-always p-4 sm:p-5 border-b border-border min-h-[calc(100vh-10rem)]">
                <PortfolioSection data={portfolioData} />
              </div>
              <div id="section-blog" className="snap-start snap-always p-4 sm:p-5 border-b border-border min-h-[calc(100vh-10rem)]">
                <BlogSection data={blogData} />
              </div>
              <div id="section-contact" className="snap-start snap-always p-4 sm:p-5 min-h-[calc(100vh-10rem)]">
                <ContactSection data={mergedContactData} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
