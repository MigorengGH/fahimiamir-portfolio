'use client'

import { BookOpen, Briefcase, Award, Trophy, BadgeCheck } from 'lucide-react'
import { resumeData } from '@/lib/portfolio-data'

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
                  <p className="text-xs text-gold mb-1">{item.company}</p>
                  <p className="text-xs text-white/40 mb-2">{item.period}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-10">
        <h3 className="text-base font-semibold text-white font-display mb-5">Skills</h3>
        <div className="space-y-4">
          {data.skills.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-white/70">{skill.name}</span>
                <span className="text-xs text-gold font-medium">{skill.level}%</span>
              </div>
              <div className="skill-track">
                <div
                  className="skill-bar"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {data.certifications.map((cert, i) => (
            <div key={i} className="cert-card">
              <BadgeCheck className="w-4 h-4 text-gold mb-2 flex-shrink-0" />
              <h4 className="text-xs font-semibold text-white leading-snug mb-1">{cert.title}</h4>
              <p className="text-xs text-white/40">{cert.issuer} · {cert.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Awards marquee */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold/10">
            <Trophy className="w-4 h-4 text-gold" />
          </div>
          <h3 className="text-base font-semibold text-white font-display">Awards & Honours</h3>
          <span className="ml-auto text-xs text-white/30 italic">scroll →</span>
        </div>
        {/* Marquee */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...data.awards, ...data.awards].map((award, i) => (
              <div key={i} className="award-pill">
                <Trophy className="w-3 h-3 text-gold flex-shrink-0" />
                <span className="font-medium text-white/80">{award.title}</span>
                <span className="text-white/30">·</span>
                <span className="text-gold text-[10px]">{award.org}</span>
                <span className="text-white/20 text-[10px]">{award.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
