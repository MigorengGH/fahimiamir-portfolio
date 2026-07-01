'use client'

import { useState } from 'react'
import { ProfileSidebar } from '@/components/portfolio/ProfileSidebar'
import { NavBar } from '@/components/portfolio/NavBar'
import { AboutSection } from '@/components/portfolio/AboutSection'
import { ResumeSection } from '@/components/portfolio/ResumeSection'
import { PortfolioSection } from '@/components/portfolio/PortfolioSection'
import { ContactSection } from '@/components/portfolio/ContactSection'

type Section = 'about' | 'resume' | 'portfolio' | 'contact'

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('about')

  return (
    <>
      {/* Ambient background glows */}
      <div className="ambient" aria-hidden="true" />

      {/* Page wrapper */}
      <div className="relative z-10 min-h-screen p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-5">

            {/* Sidebar */}
            <ProfileSidebar />

            {/* Main content panel */}
            <main className="content-panel flex-1 min-w-0">
              {/* Tab nav */}
              <NavBar
                active={activeSection}
                onChange={(s) => setActiveSection(s)}
              />

              {/* Section content */}
              <div>
                {activeSection === 'about'     && <AboutSection />}
                {activeSection === 'resume'    && <ResumeSection />}
                {activeSection === 'portfolio' && <PortfolioSection />}
                {activeSection === 'contact'   && <ContactSection />}
              </div>
            </main>

          </div>
        </div>
      </div>
    </>
  )
}
