"use client"

import { useEffect, useState } from 'react'
import { Mail, Phone, MapPin, Github, Download } from 'lucide-react'
import { Linkedin } from 'lucide-react'
import { useTheme } from 'next-themes'
import { profileData } from '@/lib/portfolio-data'
import { urlFor } from '@/lib/sanity'

interface ProfileSidebarProps {
  data?: typeof profileData & {
    social?: { github?: string }
    resumeUrl?: string
  }
}

export function ProfileSidebar({ data = profileData }: ProfileSidebarProps) {
  const resumeHref = (data as any).resumeUrl || (data as any).resumeDocumentUrl || '#'
  const hasResume = resumeHref && resumeHref !== '#'
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const script = document.createElement('script')
    script.src = "https://platform.linkedin.com/badges/js/profile.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [resolvedTheme, mounted])

  return (
    <aside className="w-full lg:w-80 bg-card rounded-2xl border border-border p-4 md:p-6 lg:sticky lg:top-8 h-fit">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6 animate-in fade-in zoom-in-90 duration-700 ease-out fill-mode-both">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 via-accent/5 to-transparent" />
          <div className="absolute inset-[2px] rounded-3xl bg-secondary overflow-hidden">
            <img
              src={
                (data as any).avatar && typeof (data as any).avatar === 'object'
                  ? urlFor((data as any).avatar).url()
                  : (data as any).avatarUrl || data.avatar || "/placeholder.svg"
              }
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100 ease-out fill-mode-both">{data.name}</h1>
        <p className="text-xs md:text-sm text-muted-foreground bg-secondary px-3 md:px-4 py-1 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200 ease-out fill-mode-both">
          {data.title}
        </p>

        {/* Download Resume Button */}
        <a
          href={resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          download={!hasResume ? undefined : true}
          aria-disabled={!hasResume}
          className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 ease-out fill-mode-both ${hasResume
            ? 'bg-accent text-accent-foreground hover:opacity-90 hover:shadow-lg hover:shadow-accent/20 active:scale-95'
            : 'bg-accent text-accent-foreground opacity-60 cursor-not-allowed'
            }`}
          onClick={(e) => { if (!hasResume) e.preventDefault() }}
        >
          <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          Download Resume
        </a>
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-4 md:my-6 animate-in fade-in duration-700 delay-[400ms] fill-mode-both" />

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500 ease-out fill-mode-both">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase mb-1">Email</p>
            <a
              href={`mailto:${data.email}`}
              className="text-sm text-foreground hover:text-accent transition-colors break-all"
            >
              {data.email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Phone</p>
            <a
              href={`tel:${data.phone.replace(/\s/g, '')}`}
              className="text-sm text-foreground hover:text-accent transition-colors"
            >
              {data.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Location</p>
            <p className="text-sm text-foreground">{data.location}</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border animate-in fade-in slide-in-from-bottom-2 duration-700 delay-[600ms] ease-out fill-mode-both">
        <a
          href={data.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href={(data.social as any).github || 'https://github.com/fahimiamir'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href={data.social.email}
          className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
        </a>
        <a
          href={data.social.phone}
          className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
          aria-label="Phone"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* LinkedIn Badge */}
      {mounted && (
        <div key={resolvedTheme} className="mt-6 md:mt-8 w-full hidden md:flex justify-center overflow-hidden bg-white/5 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-700 delay-700 ease-out fill-mode-both">
          <div className="transform scale-[0.85] sm:scale-100 lg:scale-[0.75] xl:scale-[0.85] origin-top py-2">
            <div
              className="badge-base LI-profile-badge"
              data-locale="en_US"
              data-size="large"
              data-theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
              data-type="horizontal"
              data-vanity="fahimi-amir"
              data-version="v1"
            >
              <a className=" badge-base__link LI-simple-link" href="https://my.linkedin.com/in/fahimi-amir?trk=profile-badge">
              </a>
            </div>
          </div>
        </div>
      )}


    </aside>
  )
}
