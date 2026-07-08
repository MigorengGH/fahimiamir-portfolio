"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Download, Linkedin } from 'lucide-react'
import Image from 'next/image'
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
  const [contactsExpanded, setContactsExpanded] = useState(false)
  const resumeHref = (data as any).resumeUrl || (data as any).resumeDocumentUrl || '#'
  const hasResume = resumeHref && resumeHref !== '#'

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <aside className="relative w-full lg:w-80 bg-card rounded-2xl border border-border p-4 md:p-6 lg:sticky lg:top-8 h-fit">
      {/* Mobile Social Links (Top Right) */}
      <div className="absolute top-4 right-4 flex flex-col lg:hidden items-center gap-2">
        {data.social?.linkedin && (
          <a
            href={data.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-[#0077b5] hover:bg-secondary/80 transition-all active:scale-95 shadow-sm"
          >
            <Linkedin className="w-[18px] h-[18px]" />
          </a>
        )}
        {data.social?.github && (
          <a
            href={data.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-[#ea4335] dark:text-[#ea4335] hover:bg-secondary/80 transition-all active:scale-95 shadow-sm"
          >
            <Github className="w-[18px] h-[18px]" />
          </a>
        )}
      </div>

      {/* Profile Header: Avatar left, Name & Title right on mobile, Centered on desktop */}
      <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-6 w-full pr-16 lg:pr-0">
        {/* Profile Image */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 flex-shrink-0">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 via-accent/5 to-transparent" />
          <motion.div 
            layoutId="hero-avatar-container" 
            transition={{ layout: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute inset-[2px] rounded-3xl bg-secondary overflow-hidden"
          >
            <motion.img
              src={
                (data as any).avatar && typeof (data as any).avatar === 'object'
                  ? urlFor((data as any).avatar).url()
                  : (data as any).avatarUrl || data.avatar || "/placeholder.svg"
              }
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Name & Title Container */}
        <div className="flex flex-col items-start lg:items-center min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1.5 lg:text-center">
            <TextReveal text={data.name} delay={100} />
          </h1>
          <div className="flex items-center gap-2 text-xs lg:text-sm font-medium text-accent bg-accent/10 border border-accent/30 shadow-[0_0_15px_rgba(var(--accent),0.3)] px-3 py-1 lg:px-4 lg:py-1.5 rounded-full animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out fill-mode-both w-fit">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="truncate">
              <TextReveal text={data.title} delay={300} />
            </span>
          </div>
        </div>
      </div>

      {/* Buttons Block */}
      <div className="flex gap-3 w-full mt-4 lg:mt-6">
        <a
          href={resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          download={!hasResume ? undefined : true}
          aria-disabled={!hasResume}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${hasResume
            ? 'bg-accent text-accent-foreground hover:opacity-90 hover:shadow-lg hover:shadow-accent/20 active:scale-95'
            : 'bg-accent text-accent-foreground opacity-60 cursor-not-allowed'
            }`}
          onClick={(e) => { if (!hasResume) e.preventDefault() }}
        >
          <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          <span>Resume</span>
        </a>

        {/* Toggle Contact Info (Mobile/Tablet Only) */}
        <button
          onClick={() => setContactsExpanded(!contactsExpanded)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all active:scale-95 cursor-pointer"
          aria-label={contactsExpanded ? "Hide Contact Details" : "Show Contact Details"}
        >
          <span>{contactsExpanded ? 'Hide Info' : 'Show Info'}</span>
        </button>
      </div>


      {/* Collapsible/Always-Visible Divider */}
      <div className={`h-px bg-border my-4 lg:my-6 transition-all duration-300 ${contactsExpanded ? 'block' : 'hidden lg:block'}`} />

      {/* Contact Info: Collapsible on Mobile/Tablet, Always visible on Desktop */}
      <div className={`
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4
        transition-all duration-300 ease-in-out origin-top overflow-hidden
        ${contactsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'}
      `}>
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

        <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Location</p>
            <p className="text-sm text-foreground">{data.location}</p>
          </div>
        </div>
      </div>

      {/* Social Links (Desktop Only) */}
      <div className="hidden lg:flex items-center justify-center gap-3 w-full mt-6 pt-6 border-t border-border">
        {data.social?.linkedin && (
          <a
            href={data.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-[#0077b5] hover:bg-secondary/80 transition-all active:scale-95"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {data.social?.github && (
          <a
            href={data.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-[#ea4335] dark:text-[#ea4335] hover:bg-secondary/80 transition-all active:scale-95"
          >
            <Github className="w-5 h-5" />
          </a>
        )}
      </div>
    </aside>
  )
}
