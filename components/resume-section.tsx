'use client'

import { useState } from 'react'
import { Icon } from '@/components/icon'
import {
  BookOpen, Briefcase, Award, ExternalLink,
  Code, ImageIcon, ChevronDown, ChevronUp
} from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'

// fallback static data just in case types demand it, though we rely on props
import { resumeData } from '@/lib/portfolio-data'
import { TextReveal } from '@/components/text-reveal'
import { AnimatedReveal } from '@/components/animated-reveal'

interface ResumeSectionProps {
  data?: any // using any for flexibility with Sanity data shape
}

export function ResumeSection({ data = resumeData }: ResumeSectionProps) {
  const [hoveredCert, setHoveredCert] = useState<number | null>(null)
  const [expandedExps, setExpandedExps] = useState<number[]>(() =>
    (data.experience || []).map((_: any, i: number) => i)
  )

  const education = data.education || []
  const experience = data.experience || []
  const certifications = data.certifications || []
  const skills = data.skills || []
  const skillGroups = data.skillGroups || [] // fallback for old data

  return (
    <div className="space-y-10 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          <TextReveal text="Resume" />
        </h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* ── Education ───────────────────────────────────── */}
      {education.length > 0 && (
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-6">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              <TextReveal text="Education" delay={100} />
            </h3>
          </div>
          <div className="space-y-4">
            {education.map((item: any, index: number) => (
              <AnimatedReveal key={index} delay={index * 150} direction="up">
                <div className="relative pl-5 md:pl-6 pb-6 border-l-2 border-border last:pb-0 h-full">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
                  <div className="flex items-start gap-3 mb-2">
                    {/*make the image bigger*/}
                    {item.imageUrl && (
                      <AnimatedReveal delay={index * 150 + 200} direction="left">
                        <img width={100} height={100} src={item.imageUrl} alt={item.title} className="w-12 h-12 md:w-15 md:h-15 rounded-md object-contain flex-shrink-0" />
                      </AnimatedReveal>
                    )}
                    <div className="flex-grow flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4">
                      <h4 className="text-base md:text-lg font-semibold text-foreground">{item.title}</h4>
                      <span className="text-xs md:text-sm text-accent font-medium whitespace-nowrap">{item.period || item.institution}</span>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{item.description}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      )}

      {/* ── Experience ──────────────────────────────────── */}
      {experience.length > 0 && (
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-6">
            <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              <TextReveal text="Experience" delay={100} />
            </h3>
          </div>
          <div className="space-y-4">
            {experience.map((item: any, index: number) => (
              <AnimatedReveal key={index} delay={index * 150} direction="up">
                <div className="relative pl-5 md:pl-6 pb-6 border-l-2 border-border last:pb-0 h-full">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
                  <div 
                    className="flex items-start gap-3 mb-2 cursor-pointer group"
                    onClick={() => 
                      setExpandedExps(prev => 
                        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
                      )
                    }
                  >
                    {item.imageUrl && (
                      <AnimatedReveal delay={index * 150 + 200} direction="left">
                        <img width={100} height={100} src={item.imageUrl} alt={item.company || item.title} className="w-12 h-12 md:w-20 md:h-20 rounded-md object-contain flex-shrink-0" />
                      </AnimatedReveal>
                    )}
                    <div className="flex-grow flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4">
                      <div>
                        <h4 className="text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{item.title}</h4>
                        {item.company && (
                          <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{item.company}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm text-accent font-medium whitespace-nowrap">{item.period || ''}</span>
                        {expandedExps.includes(index) ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                  {expandedExps.includes(index) && (
                    <AnimatedReveal delay={0} direction="up">
                      <div className="mt-3 p-4 rounded-xl bg-secondary/80 border border-border text-xs md:text-sm text-foreground/90 leading-relaxed whitespace-pre-line shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent/50" />
                        {item.description}
                      </div>
                    </AnimatedReveal>
                  )}
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      )}

      {/* ── Licenses & Certifications ───────────────────── */}
      {certifications.length > 0 && (
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-6">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              <TextReveal text="Licenses & Certifications" delay={100} />
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {certifications.map((item: any, index: number) => (
              <AnimatedReveal key={index} delay={index * 100} direction="up">
                <div
                  className="group relative bg-secondary rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/10 h-full"
                  onMouseEnter={() => setHoveredCert(index)}
                  onMouseLeave={() => setHoveredCert(null)}
                >
                  <div className="p-4 md:p-5">
                    {item.issuer && (
                      <span className="inline-block px-2.5 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-3">
                        {item.issuer}
                      </span>
                    )}
                    <h4 className="text-sm md:text-base font-semibold text-foreground leading-snug mb-3 group-hover:text-accent transition-colors">
                      {item.title}
                    </h4>
                    {(item.year || item.period) && (
                      <p className="text-xs text-muted-foreground mb-1">
                        {[item.year, item.period].filter(Boolean).join(' • ')}
                      </p>
                    )}
                    {item.credentialId && (
                      <p className="text-xs text-muted-foreground font-mono mb-4">
                        ID: {item.credentialId}
                      </p>
                    )}
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 right-0 px-4 pb-4 transition-all duration-300 flex gap-2 ${hoveredCert === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
                      }`}
                  >
                    {item.imageUrl && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-accent text-accent-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                            <ImageIcon className="w-3.5 h-3.5" />
                            Preview
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl border-none bg-transparent shadow-none p-0 overflow-hidden">
                          <DialogTitle className="sr-only">{item.title} Preview</DialogTitle>
                          <img src={item.imageUrl} alt={item.title} className="w-full h-auto rounded-lg" />
                        </DialogContent>
                      </Dialog>
                    )}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-colors ${item.imageUrl
                          ? 'bg-accent/20 text-accent hover:bg-accent/30'
                          : 'bg-accent text-accent-foreground hover:opacity-90'
                          }`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {item.imageUrl ? 'Link' : 'View Certificate'}
                      </a>
                    )}
                  </div>
                  <div className={`transition-all duration-300 ${hoveredCert === index ? 'h-12' : 'h-0'}`} />
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      )}

      {/* ── Skills & Tools ──────────────────────────────── */}
      {(skills.length > 0 || skillGroups.length > 0) && (
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-6">
            <Code className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              <TextReveal text="Skills & Tools" delay={100} />
            </h3>
          </div>
          {/* Render Sanity grouped skills array */}
          {skillGroups.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {skillGroups.map((group: any, index: number) => {
                return (
                  <AnimatedReveal key={index} delay={index * 100} direction="up">
                    <div
                      className={`group relative bg-gradient-to-br ${group.color || 'from-secondary to-background'} rounded-xl border ${group.borderColor || 'border-border'} p-4 md:p-5 hover:shadow-lg transition-all duration-300 h-full`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-background/60 flex items-center justify-center flex-shrink-0">
                          <Icon name={group.icon || 'Globe'} className={`w-5 h-5 ${group.iconColor || 'text-foreground'}`} />
                        </div>
                        <h4 className={`text-sm md:text-base font-bold ${group.iconColor || 'text-foreground'}`}>{group.domain}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.tools?.map((tool: any, ti: number) => {
                          return (
                            <span
                              key={ti}
                              className="flex items-center gap-1 px-1.5 py-1 bg-background/60 border border-border/50 rounded-lg text-xs text-foreground font-medium"
                            >
                              {/* {tool.icon && <Icon name={tool.icon} className="w-3.5 h-3.5" />} */}
                              {tool.name}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </AnimatedReveal>
                )
              })}
            </div>
          )}
        </div>
      )
      }
    </div >
  )
}
