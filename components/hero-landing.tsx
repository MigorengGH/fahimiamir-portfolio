"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Code2, PenTool, Video, Mouse, Sparkles, MonitorSmartphone, Database, Layout } from "lucide-react"
import { urlFor } from "@/lib/sanity"
import ThermodynamicGrid from "@/components/ui/interactive-thermodynamic-grid"

interface HeroLandingProps {
  onEnter: () => void
  data: any
}

export function HeroLanding({ onEnter, data }: HeroLandingProps) {
  const [mounted, setMounted] = useState(false)

  // Cursor tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth cursor with spring
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Move useTransform before early return to satisfy Rules of Hooks
  const backgroundValue = useTransform(
    [cursorX, cursorY],
    ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 80%)`
  )

  useEffect(() => {
    setMounted(true)
    
    // Set initial position to center
    mouseX.set(window.innerWidth / 2)
    mouseY.set(window.innerHeight / 2)
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  if (!mounted) return null

  // Resolve avatar URL
  const rawAvatar = data?.heroAvatar || data?.avatar
  const avatarSrc = rawAvatar && typeof rawAvatar === 'object'
    ? urlFor(rawAvatar).url()
    : data?.heroAvatarUrl || data?.avatarUrl || rawAvatar || "/placeholder.svg"

  const nameVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9], staggerChildren: 0.04 }
    }
  } as any

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  } as any

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background text-foreground"
    >


      {/* BACKGROUND: High Resolution Heatmap */}
      <ThermodynamicGrid 
        resolution={12}
        coolingFactor={0.96}
      />

      {/* Main Content Container - Flex Row for Editorial Layout */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-0 w-full max-w-[90rem] h-full px-6 md:px-12 lg:px-20 mx-auto">
        
        {/* Left Column: Typography & Button */}
        <div className="w-full md:w-[55%] flex flex-col items-center md:items-start text-center md:text-left justify-start md:justify-center pt-16 sm:pt-20 md:pt-0 pb-0 z-50 pointer-events-auto shrink-0">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs sm:text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3 md:mb-6"
          >
            Portfolio
          </motion.div>
          
          {/* Name Reveal */}
          <motion.h1 
            variants={nameVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[8rem] font-black tracking-tighter mb-4 md:mb-6 leading-[0.9] flex flex-wrap justify-center md:justify-start text-foreground drop-shadow-sm"
          >
            {(data?.name || "Fahimi Amir").split(' ').map((word: string, i: number) => (
              <span key={i} className="inline-block mx-2 md:mx-0 md:mr-5 mb-1 md:mb-2">
                {word.split('').map((char: string, j: number) => (
                  <motion.span 
                    key={j} 
                    variants={letterVariants}
                    className="inline-block text-foreground select-none"
                    whileHover={{ 
                      scale: 1.15, 
                      y: -8,
                      rotate: Math.random() * 8 - 4,
                      transition: { duration: 0.15, type: "spring", stiffness: 400 } 
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-lg mb-8 md:mb-12 font-medium leading-relaxed border-l-0 md:border-l-4 md:border-accent px-4 md:px-0 md:pl-4"
          >
            {data?.title || "Software Engineer & Creative Video Maker"}
          </motion.p>

          {/* Enter Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#f97316]/40 transition-all duration-700 border border-transparent"
          >
            {/* Pixelated Thermodynamic Hover Overlay */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out overflow-hidden rounded-full">
              <ThermodynamicGrid resolution={8} coolingFactor={0.85} />
            </div>

            <span className="relative z-10 text-sm sm:text-base md:text-lg tracking-wide group-hover:text-white transition-colors duration-700">Enter Portfolio</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:text-white transition-all duration-700 group-hover:translate-x-1" />
            
            {/* Button Shine Effect */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          </motion.button>
        </div>

        {/* Right Column: Image and Geometric Shape (Interactive) */}
        <motion.div 
          className="w-full md:w-[45%] flex-1 md:h-[90vh] flex items-end justify-center relative z-20 pointer-events-auto -mt-16 sm:-mt-24 md:mt-0 min-h-[40vh]"
          whileHover="hover"
        >
          {/* Glowing Geometric Circle Container (Behind Avatar) */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[580px] md:h-[580px] lg:w-[700px] lg:h-[700px] z-0"
          >
            {/* The Heavily Blurred Background Orb */}
            <motion.div 
              animate={{
                boxShadow: [
                  "0 0 80px rgba(var(--accent), 0.5)",
                  "0 0 140px rgba(var(--accent), 0.8)",
                  "0 0 80px rgba(var(--accent), 0.5)"
                ]
              }}
              variants={{
                hover: { 
                  scale: 1.05,
                  boxShadow: "0 0 200px rgba(var(--accent), 1)"
                }
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-tr from-accent/90 via-purple-500/60 to-accent/20 blur-[40px] sm:blur-[60px] md:blur-[80px] transition-all duration-500 overflow-hidden z-0"
            >
              {/* Inner glowing mesh gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_320deg,rgba(255,255,255,0.4)_360deg)] opacity-50 z-0"
              />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(255,255,255,0.3)] z-0" />
            </motion.div>
              
            {/* Orbiting Icons Container */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 z-10"
            >
              {/* Icon 1: Code2 */}
              <div className="absolute -top-2 sm:-top-4 left-[12%] sm:left-[15%]">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="text-white opacity-90 scale-75 sm:scale-100 drop-shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Code2 size={48} strokeWidth={1.5} />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Icon 2: Video */}
              <div className="absolute top-[45%] -left-4 sm:-left-8">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="text-white opacity-90 scale-75 sm:scale-100 drop-shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <Video size={56} strokeWidth={1.5} />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Icon 3: PenTool */}
              <div className="absolute bottom-[5%] sm:bottom-[8%] left-[12%] sm:left-[15%]">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="text-white opacity-90 scale-75 sm:scale-100 drop-shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, -25, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  >
                    <PenTool size={40} strokeWidth={1.5} />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Icon 4: Sparkles */}
              <div className="absolute -top-2 sm:-top-4 right-[12%] sm:right-[15%]">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="text-white opacity-80 scale-75 sm:scale-90 drop-shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                  >
                    <Sparkles size={42} strokeWidth={1.5} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Icon 5: MonitorSmartphone */}
              <div className="absolute top-[45%] -right-4 sm:-right-8">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="text-white opacity-90 scale-75 sm:scale-100 drop-shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, 25, 0] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <MonitorSmartphone size={50} strokeWidth={1.5} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Icon 6: Database */}
              <div className="absolute bottom-[5%] sm:bottom-[8%] right-[12%] sm:right-[15%]">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="text-white opacity-85 scale-75 sm:scale-95 drop-shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  >
                    <Database size={44} strokeWidth={1.5} />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Icon 7: Layout */}
              <div className="absolute -top-8 sm:-top-10 left-[42%] sm:left-[45%]">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="text-white opacity-80 scale-75 sm:scale-90 drop-shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, 18, 0] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                  >
                    <Layout size={38} strokeWidth={1.5} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Avatar Image (Front Layer) */}
          <motion.img 
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            variants={{
              hover: { 
                scale: 1.08, 
                y: -15,
                transition: { duration: 0.4, ease: "easeOut" } 
              }
            }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            src={avatarSrc} 
            alt={data?.name || "Muhammad Fahimi Amir"} 
            fetchPriority="high"
            className="w-[140%] sm:w-[150%] md:w-[160%] lg:w-[180%] max-w-none h-auto max-h-[100%] md:max-h-none object-contain object-bottom origin-bottom drop-shadow-2xl relative z-10"
          />
        </motion.div>
      </div>

      {/* Bottom Fade Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[25vh] md:h-[30vh] bg-gradient-to-t from-background via-background/80 to-background/0 z-40 pointer-events-none" />

    </motion.div>
  )
}
