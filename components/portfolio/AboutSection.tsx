'use client'

import { Code2, ClipboardCheck, Video, Film, BarChart3, Smartphone, LucideIcon } from 'lucide-react'
import { aboutData } from '@/lib/portfolio-data'

const iconMap: Record<string, LucideIcon> = {
  Code2,
  ClipboardCheck,
  Video,
  Film,
  BarChart3,
  Smartphone,
}

interface AboutSectionProps {
  data?: typeof aboutData
}

export function AboutSection({ data = aboutData }: AboutSectionProps) {
  return (
    <div className="section-content">
      {/* Section heading */}
      <div className="section-heading">
        <span className="section-num">01</span>
        <div>
          <h2 className="section-title">About Me</h2>
          <div className="section-underline" />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-4 mb-10">
        {data.description.map((para, i) => (
          <p key={i} className="text-white/60 text-sm leading-7">
            {para}
          </p>
        ))}
      </div>

      {/* What I Do */}
      <h3 className="text-lg font-semibold text-white/90 mb-5 font-display">What I Do</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.services.map((service, i) => {
          const Icon = iconMap[service.icon]
          return (
            <div key={i} className="service-card group">
              <div className="service-icon-wrap">
                {Icon && <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">{service.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed">{service.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
