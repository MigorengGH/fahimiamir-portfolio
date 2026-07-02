"use client"

import { useEffect, useState } from 'react'
import { Mail, Phone, MapPin, Github, Download, Linkedin } from 'lucide-react'
import { useTheme } from 'next-themes'
import { profileData } from '@/lib/portfolio-data'
import { urlFor } from '@/lib/sanity'
import { TextReveal } from '@/components/text-reveal'

interface ProfileSidebarProps {
  data?: typeof profileData & {
    social?: { github?: string }
    resumeUrl?: string
  }
}

export function ProfileSidebar({ data = profileData }: ProfileSidebarProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const resumeHref = (data as any).resumeUrl || (data as any).resumeDocumentUrl || '#'
  const hasResume = resumeHref && resumeHref !== '#'

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <aside className="w-full lg:w-80 bg-card rounded-2xl border border-border p-4 md:p-6 lg:sticky lg:top-8 h-fit">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6">
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

        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
          <TextReveal text={data.name} delay={100} />
        </h1>
        <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-accent bg-accent/10 border border-accent/30 shadow-[0_0_15px_rgba(var(--accent),0.3)] px-4 py-1.5 rounded-full animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out fill-mode-both">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <TextReveal text={data.title} delay={300} />
        </div>

        {/* Download Resume Button */}
        <a
          href={resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          download={!hasResume ? undefined : true}
          aria-disabled={!hasResume}
          className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${hasResume
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
      <div className="h-px bg-border my-4 md:my-6 animate-in fade-in duration-700 fill-mode-both" />

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out fill-mode-both">
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
      <div className="flex items-center justify-center gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out fill-mode-both">
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

    </aside>
  )
}
