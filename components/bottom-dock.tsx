"use client"

import React, { useEffect, useState } from "react"
import { User, FileText, Briefcase, Pencil, Github, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dock, DockIcon } from "@/components/magicui/dock"
import { ThemeToggle } from "@/components/theme-toggle"

export interface BottomDockProps {
  activeSection: string
  onSelectSection: (sectionId: string) => void
  social?: { linkedin?: string; github?: string }
}

const NAV_ITEMS = [
  { id: "about", icon: User, label: "About", color: "text-blue-500" },
  { id: "resume", icon: FileText, label: "Resume", color: "text-green-500" },
  { id: "projects", icon: Briefcase, label: "Projects", color: "text-purple-500" },
  { id: "blog", icon: Pencil, label: "Blog", color: "text-orange-500" },
]

export function BottomDock({ activeSection, onSelectSection, social }: BottomDockProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Use slightly smaller icons on mobile to prevent overflow
  const iconSize = isMobile ? 36 : 40
  const iconMagnification = isMobile ? 44 : 50

  return (
    <div className="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-[100vw] overflow-x-auto scrollbar-hide px-2 flex justify-center">
      <div className="pointer-events-auto">
        <TooltipProvider>
          <Dock direction="middle" iconSize={iconSize} iconMagnification={iconMagnification}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <DockIcon key={item.id} aspectRatio={!isMobile ? 2.5 : 1}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onSelectSection(item.id)}
                        aria-label={item.label}
                        className={cn(
                          buttonVariants({ variant: isActive ? "default" : "ghost" }),
                          "rounded-full transition-colors flex items-center justify-center gap-2",
                          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary/50",
                          !isActive && item.color,
                          isMobile ? "size-12 p-0" : "h-full px-4"
                        )}
                      >
                        <item.icon className="size-5 shrink-0" />
                        {!isMobile && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}
                      </button>
                    </TooltipTrigger>
                    {isMobile && (
                      <TooltipContent>
                        <p>{item.label}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </DockIcon>
              )
            })}

            <Separator orientation="vertical" className="h-full mx-1" />



            {/* Theme Toggle (Mobile Only, since dock is mobile only) */}
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center">
                    <ThemeToggle />
                  </div>
                </TooltipTrigger>
                <TooltipContent><p>Toggle Theme</p></TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </div>
    </div>
  )
}
