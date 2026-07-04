"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Code2, PenTool, Video, Mouse, Sparkles, MonitorSmartphone, Database, Layout } from "lucide-react"
import { SiReact, SiLaravel, SiPython, SiNextdotjs } from "react-icons/si"
import { urlFor } from "@/lib/sanity"

const SiPowerbiCustom = ({ size = 60, className }: { size?: number; className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="#F2C811"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 12a1 1 0 0 1 1 1v11H4a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1h6Zm-2-.5V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17h-4.5V13a1.5 1.5 0 0 0-1.5-1.5H8Zm5-6V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1h-3.5V7A1.5 1.5 0 0 0 15 5.5h-2Z" />
  </svg>
)

import ThermodynamicGrid from "@/components/ui/interactive-thermodynamic-grid"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"

interface HeroLandingProps {
  onEnter: () => void
  data: any
}

export function HeroLanding({ onEnter, data }: HeroLandingProps) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isEntering, setIsEntering] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
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
        <motion.div 
          animate={isEntering ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full md:w-[55%] flex flex-col items-center md:items-start text-center md:text-left justify-start md:justify-center pt-16 sm:pt-20 md:pt-0 pb-0 z-50 pointer-events-auto shrink-0"
        >

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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-lg mb-4 font-medium leading-relaxed border-l-0 md:border-l-4 md:border-accent px-4 md:px-0 md:pl-4"
          >
            {data?.title || "Software Engineer & Creative Video Maker"}
          </motion.p>

          {/* Short Brief / Description */}
          {data?.shortBio && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-sm sm:text-base text-muted-foreground/80 max-w-lg mb-8 md:mb-12 font-normal leading-relaxed border-l-0 md:border-l-4 md:border-accent/40 px-4 md:px-0 md:pl-4"
            >
              {data.shortBio}
            </motion.p>
          )}

          {/* Enter Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isEntering ? { opacity: 0, scale: 0.8 } : { opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: isEntering ? 0 : 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsEntering(true)
              setTimeout(() => {
                onEnter()
              }, 1500)
            }}
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
        </motion.div>

        {/* Right Column: Image and Geometric Shape (Interactive) */}
        <motion.div
          animate={isEntering && !isMobile ? { x: "-61%" } : { x: "0%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full md:w-[45%] flex-1 md:h-[90vh] flex items-end justify-center relative z-20 pointer-events-auto -mt-16 sm:-mt-24 md:mt-0 min-h-[40vh]"
          whileHover="hover"
        >
          {/* Glowing Geometric Circle Container (Behind Avatar) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isEntering ? { scale: 3.5, opacity: 0 } : { scale: 1, opacity: 1 }}
            exit={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 0.7, delay: isEntering ? 0.8 : 0, ease: [0.22, 1, 0.36, 1] }}
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
            <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
              {/* Inner Circles */}
              <OrbitingCircles iconSize={isMobile ? 35 : 50} radius={isMobile ? 120 : 220} speed={1.5}>
                <SiReact size={isMobile ? 35 : 50} color="#61DAFB" className="drop-shadow-lg" />
                <SiLaravel size={isMobile ? 35 : 50} color="#FF2D20" className="drop-shadow-lg" />
                <SiPython size={isMobile ? 35 : 50} color="#3776AB" className="drop-shadow-lg" />
                <SiNextdotjs size={isMobile ? 35 : 50} className="drop-shadow-lg text-foreground dark:text-white" />
              </OrbitingCircles>

              {/* Outer Circles (reverse) */}
              <OrbitingCircles iconSize={isMobile ? 45 : 60} radius={isMobile ? 190 : 330} speed={1} reverse>
                <SiPowerbiCustom size={isMobile ? 45 : 60} className="drop-shadow-lg" />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1920px-Figma-logo.svg.png"
                  alt="Figma"
                  className="w-full h-full object-contain drop-shadow-lg scale-90"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png"
                  alt="DaVinci Resolve"
                  className="w-full h-full object-contain drop-shadow-lg scale-110"
                />
              </OrbitingCircles>
            </div>
          </motion.div>

          {/* Avatar Image Container */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            variants={{
              hover: {
                scale: 1.12,
                y: -15,
                transition: { type: "spring", stiffness: 400, damping: 12 }
              }
            }}
            transition={{
              default: { type: "spring", stiffness: 400, damping: 20 },
              opacity: { duration: 1, delay: 0.5, ease: "easeOut" },
              y: { duration: 1, delay: 0.5, ease: "easeOut" }
            }}
            className="w-[140%] sm:w-[150%] md:w-[160%] lg:w-[170%] shrink-0 max-w-none origin-bottom relative z-10 group cursor-pointer"
          >
            {/* Subtle Floating Wrapper */}
            <motion.div
              layoutId="hero-avatar-container"
              animate={isEntering ? { scale: 1.15, y: -40, rotate: 0 } : {
                y: [0, -8, 0],
                rotate: [0, -0.5, 0.5, 0]
              }}
              transition={{
                layout: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                duration: isEntering ? 0.7 : 10,
                delay: isEntering ? 0.8 : 0,
                repeat: isEntering ? 0 : Infinity,
              }}
              className="w-full h-auto relative origin-bottom"
            >
              {/* Default Avatar */}
              <motion.img
                src={avatarSrc}
                alt={data?.heroAvatar?.alt || data?.name || "Muhammad Fahimi Amir"}
                fetchPriority="high"
                initial={{ opacity: 1 }}
                animate={isEntering ? { opacity: 0 } : { opacity: 1 }}
                transition={isEntering ? { duration: 0.8, ease: "easeInOut" } : {}}
                variants={{
                  hover: {
                    opacity: 0,
                    transition: { duration: 0.25, ease: "easeIn" }
                  }
                }}
                className="w-full h-auto max-h-[100%] md:max-h-none object-contain object-bottom drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              />

              {/* Hover Avatar */}
              {(data?.heroHoverAvatarUrl || data?.heroHoverAvatar) && (
                <motion.img
                  layoutId="hero-avatar-image"
                  src={typeof data?.heroHoverAvatar === 'object' && data?.heroHoverAvatar?.asset ? urlFor(data?.heroHoverAvatar).url() : data?.heroHoverAvatarUrl || data?.heroHoverAvatar}
                  alt={data?.heroHoverAvatar?.alt || "Hover Avatar"}
                  initial={{ opacity: 0 }}
                  animate={isEntering ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    layout: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                    duration: 0.8, 
                    ease: "easeInOut" 
                  }}
                  variants={{
                    hover: {
                      opacity: 1,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }
                  }}
                  className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none drop-shadow-[0_0_25px_rgba(var(--accent),0.6)]"
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[25vh] md:h-[30vh] bg-gradient-to-t from-background via-background/80 to-background/0 z-40 pointer-events-none" />

    </motion.div>
  )
}
