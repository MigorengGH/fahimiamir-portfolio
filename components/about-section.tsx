import { Icon } from '@/components/icon'
import { aboutData } from '@/lib/portfolio-data'
import { TextReveal } from '@/components/text-reveal'
import { AnimatedReveal } from '@/components/animated-reveal'

interface AboutSectionProps {
  data?: typeof aboutData
}

export function AboutSection({ data = aboutData }: AboutSectionProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      {/* About Me */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          <TextReveal text="About Me" />
        </h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          {data.description.map((paragraph, index) => (
            <AnimatedReveal key={index} delay={index * 100}>
              <p>{paragraph}</p>
            </AnimatedReveal>
          ))}
        </div>
      </div>

      {/* What I'm Doing */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          <TextReveal text="What I'm Doing" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {data.services.map((service: any, index) => {
            return (
              <AnimatedReveal key={index} delay={index * 150} direction="up">
                <div
                  className={`flex gap-3 md:gap-4 p-4 md:p-6 bg-gradient-to-br ${service.color || 'from-secondary to-secondary'} rounded-xl md:rounded-2xl border ${service.borderColor || 'border-border hover:border-accent'} transition-colors h-full`}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                    <AnimatedReveal delay={index * 150 + 200} direction="left">
                      <Icon name={service.icon} className={`w-full h-full ${service.iconColor || 'text-accent'}`} strokeWidth={1.5} />
                    </AnimatedReveal>
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">{service.title}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </AnimatedReveal>
            )
          })}
        </div>
      </div>

    </div>
  )
}
