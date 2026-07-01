'use client'

import { BookOpen, Briefcase, Award, Trophy, BadgeCheck, ExternalLink, TerminalSquare, Smartphone, Globe, Database, Code2, BarChart3, Video, LayoutTemplate, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { resumeData } from '@/lib/portfolio-data'

const CARD_GRADIENTS = [
  'from-violet-900/60 via-violet-800/30 to-black',
  'from-amber-900/60 via-amber-800/30 to-black',
  'from-indigo-900/60 via-indigo-800/30 to-black',
  'from-rose-900/60 via-rose-800/30 to-black',
  'from-emerald-900/60 via-emerald-800/30 to-black',
  'from-cyan-900/60 via-cyan-800/30 to-black',
  'from-purple-900/60 via-purple-800/30 to-black',
]

const iconMap: Record<string, LucideIcon> = {
  TerminalSquare,
  Smartphone,
  Globe,
  Database,
  Code2,
  BarChart3,
  Video,
  LayoutTemplate,
}

interface ResumeSectionProps {
  data?: typeof resumeData
}

export function ResumeSection({ data = resumeData }: ResumeSectionProps) {
  return (
    <div className="section-content">
      <div className="section-heading">
        <span className="section-num">02</span>
        <div>
          <h2 className="section-title">Resume</h2>
          <div className="section-underline" />
        </div>
      </div>

      {/* Two-column: Education + Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Education */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold/10">
              <BookOpen className="w-4 h-4 text-gold" />
            </div>
            <h3 className="text-base font-semibold text-white font-display">Education</h3>
          </div>
          <div className="timeline">
            {data.education.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-body">
                  <h4 className="text-sm font-semibold text-white leading-snug mb-0.5">{item.title}</h4>
                  <p className="text-xs text-gold mb-1">{item.institution}</p>
                  <p className="text-xs text-white/40 mb-2">{item.period}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold/10">
              <Briefcase className="w-4 h-4 text-gold" />
            </div>
            <h3 className="text-base font-semibold text-white font-display">Experience</h3>
          </div>
          <div className="timeline">
            {data.experience.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-body">
                  <h4 className="text-sm font-semibold text-white leading-snug mb-0.5">{item.title}</h4>
                  <p className="text-xs text-sky-400 mb-1">{item.company}</p>
                  <p className="text-xs text-white/40 mb-2">{item.period}</p>
                  <p className="text-xs text-white/50 leading-relaxed mb-3">{item.description}</p>
                  {'url' in item && item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-sky-400 transition-colors bg-white/5 px-2 py-1 rounded-md border border-white/10 hover:bg-white/10"
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-10">
        <h3 className="text-base font-semibold text-white font-display mb-5">Software & Skills</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {data.skills.map((skill: any, i) => {
            const Icon = iconMap[skill.icon]
            return (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-sky-500/50 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 overflow-hidden relative">
                  {skill.customIcon ? (
                    <Image src={urlFor(skill.customIcon).width(32).height(32).url()} alt={skill.name} fill className="object-cover p-1" />
                  ) : skill.iconUrl ? (
                    <img src={skill.iconUrl} alt={skill.name} className="w-full h-full object-cover p-1" />
                  ) : (
                    Icon && <Icon className="w-4 h-4 text-sky-400" />
                  )}
                </div>
                <span className="text-sm font-medium text-white/80">{skill.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold/10">
            <BadgeCheck className="w-4 h-4 text-gold" />
          </div>
          <h3 className="text-base font-semibold text-white font-display">Certifications</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.certifications.map((cert: any, i) => {
            const linkUrl = cert.url || (cert.image ? urlFor(cert.image).url() : undefined);
            const CardWrapper = linkUrl ? 'a' : 'div';
            
            return (
              <CardWrapper 
                key={i} 
                className={`project-card group block ${linkUrl ? 'cursor-pointer' : ''}`}
                {...(linkUrl ? { href: linkUrl, target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <div className={`h-36 rounded-xl overflow-hidden bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} flex items-center justify-center mb-4 relative`}>
                  <div className="absolute inset-0 opacity-20 noise-texture" />
                  {cert.image ? (
                    <Image src={urlFor(cert.image).width(600).height(400).url()} alt={cert.title} fill className="object-cover" />
                  ) : (
                    <BadgeCheck className="w-10 h-10 text-white/20" />
                  )}
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/40 text-gold border border-gold/20">
                    {cert.year}
                  </span>
                  
                  {linkUrl && (
                    <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/40 border border-gold/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-3.5 h-3.5 text-gold" />
                    </div>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug group-hover:text-gold transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-white/45 leading-relaxed mb-1">
                  {cert.issuer}
                </p>
                {cert.credentialId && (
                  <p className="text-[10px] text-white/30 font-mono tracking-wider">
                    ID: {cert.credentialId}
                  </p>
                )}
              </CardWrapper>
            )
          })}
        </div>
      </div>


    </div>
  )
}
