import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fahimi Amir — Portfolio',
  description: 'Full-stack developer building modern web experiences. Explore my projects, skills, and experience.',
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden flex flex-col items-center justify-center px-6">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/15 blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          Available for opportunities
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
            Fahimi
          </span>
          <br />
          <span className="bg-gradient-to-br from-violet-400 via-indigo-400 to-violet-600 bg-clip-text text-transparent">
            Amir
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12">
          Full-stack developer crafting{' '}
          <span className="text-white/80">modern web experiences</span> — from concept to deployment.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/projects"
            id="cta-projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-500/30"
          >
            View Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="mailto:hello@fahimiamir.com"
            id="cta-contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold text-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 text-xs">
        <span>scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </main>
  )
}
