'use client'

import { Mail, Phone, MapPin, Sparkles } from 'lucide-react'
import { profileData } from '@/lib/portfolio-data'

interface ProfileSidebarProps {
  data?: typeof profileData
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

export function ProfileSidebar({ data = profileData }: ProfileSidebarProps) {
  return (
    <aside className="sidebar-glass w-full lg:w-[300px] xl:w-[320px] rounded-2xl p-6 lg:sticky lg:top-6 h-fit flex-shrink-0">
      {/* Avatar */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="avatar-ring mb-5">
          <div className="avatar-inner">
            <div className="w-full h-full rounded-[18px] bg-gradient-to-br from-amber-900/60 to-violet-900/60 flex items-center justify-center text-4xl font-bold text-amber-400" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
              FA
            </div>
          </div>
        </div>

        <h1 className="text-xl font-bold text-white mb-1 leading-tight" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
          {data.name}
        </h1>
        <span className="inline-block px-3 py-1 mt-1 rounded-lg text-xs font-medium bg-white/5 text-white/50 border border-white/10 leading-relaxed text-center">
          {data.title}
        </span>

        {/* Availability badge */}
        <div className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs text-emerald-400 font-medium">{data.availability}</span>
        </div>
      </div>

      <div className="divider" />

      {/* Contact Info */}
      <div className="space-y-1 my-5">
        <a href={`mailto:${data.email}`} className="contact-row group">
          <div className="contact-icon">
            <Mail className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0">
            <p className="label">Email</p>
            <p className="text-sm text-white/70 group-hover:text-amber-400 transition-colors truncate">{data.email}</p>
          </div>
        </a>

        <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="contact-row group">
          <div className="contact-icon">
            <Phone className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="label">Phone</p>
            <p className="text-sm text-white/70 group-hover:text-amber-400 transition-colors">{data.phone}</p>
          </div>
        </a>

        <div className="contact-row">
          <div className="contact-icon">
            <MapPin className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="label">Location</p>
            <p className="text-sm text-white/70">{data.location}</p>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Socials */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
          <LinkedInIcon className="w-4 h-4" />
        </a>
        <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
          <GitHubIcon className="w-4 h-4" />
        </a>
        <a href={data.social.email} className="social-btn" aria-label="Email">
          <Mail className="w-4 h-4" />
        </a>
        <a href="#" className="social-btn" aria-label="Portfolio">
          <Sparkles className="w-4 h-4" />
        </a>
      </div>
    </aside>
  )
}
