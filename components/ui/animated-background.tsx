'use client'

import { useEffect, useState } from 'react'

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="fixed inset-0 -z-10 bg-background" />

  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Halftone Dot Overlay (subtle texture) */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #808080 1px, transparent 1px)',
          backgroundSize: '8px 8px'
        }}
      />

      {/* Glowing Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent rounded-full opacity-20 blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/3 -left-40 w-[30rem] h-[30rem] bg-purple-500 rounded-full opacity-10 blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute -bottom-40 right-1/4 w-[25rem] h-[25rem] bg-blue-500 rounded-full opacity-10 blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />
    </div>
  )
}
