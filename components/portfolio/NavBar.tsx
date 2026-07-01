'use client'

type Section = 'about' | 'resume' | 'portfolio' | 'contact'

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Awards & Honours' },
]

interface NavBarProps {
  active: Section
  onChange: (section: Section) => void
}

export function NavBar({ active, onChange }: NavBarProps) {
  return (
    <nav className="flex items-center gap-1 p-4 border-b border-white/5 overflow-x-auto scrollbar-hide">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
            active === item.id
              ? 'text-gold'
              : 'text-white/40 hover:text-white/70 hover:bg-white/5'
          }`}
        >
          {item.label}
          {active === item.id && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold rounded-full" />
          )}
        </button>
      ))}
    </nav>
  )
}
