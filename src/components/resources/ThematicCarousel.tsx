"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Scale, 
  TreePine, 
  ThermometerSun, 
  Flame, 
  Banknote, 
  Microscope, 
  Layers, 
  PawPrint, 
  Mountain, 
  Globe,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

export interface ThemeItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  description?: string
  count?: number
}

export const THEMES: ThemeItem[] = [
  { id: "policy-governance", name: "Policy and Governance", icon: Scale, description: "Frameworks & institutional policies", count: 142 },
  { id: "sustainable-management", name: "Sustainable Forest Management", icon: TreePine, description: "Silviculture & harvest models", count: 289 },
  { id: "climate-adaptation", name: "Climate Change Adaptation & Mitigation", icon: ThermometerSun, description: "Carbon models & resilience", count: 204 },
  { id: "forest-health-fire", name: "Forest Health and Fire", icon: Flame, description: "Pest control & wildfire management", count: 168 },
  { id: "forest-economics", name: "Forest Economics", icon: Banknote, description: "Valuation, trade & financing", count: 95 },
  { id: "research-education", name: "Research, Education and Extension", icon: Microscope, description: "Curricula, field trials & capacity", count: 310 },
  { id: "wood-science", name: "Wood Science & Technology", icon: Layers, description: "Timber quality & processing", count: 124 },
  { id: "ecology-biodiversity", name: "Forest Ecology, Wildlife & Biodiversity", icon: PawPrint, description: "Habitat protection & species census", count: 256 },
  { id: "restoration-land-water", name: "Restoration of Degraded Land & Soil & Water", icon: Mountain, description: "Watershed protection & re-greening", count: 187 },
  { id: "international-forestry", name: "International Forestry", icon: Globe, description: "Cross-border pacts & conventions", count: 83 },
]

interface ThematicCarouselProps {
  title?: string
  subtitle?: string
  selectedTheme?: string
  onSelectTheme?: (themeName: string) => void
  showViewAll?: boolean
}

export function ThematicCarousel({
  title = "Thematic Areas",
  subtitle = "Explore research and policy datasets across key forestry disciplines",
  selectedTheme,
  onSelectTheme,
  showViewAll = true
}: ThematicCarouselProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const checkScroll = React.useCallback(() => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }, [])

  React.useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [checkScroll])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const cardWidth = 280
    const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  return (
    <div className="w-full relative py-4">
      {/* Header with Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f0e6] mb-1">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-[#cbd5e1] max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {showViewAll && (
            <Link 
              href="/resources" 
              className="text-xs uppercase tracking-wider font-semibold text-[#84cc16] hover:text-[#a3e635] mr-3 transition-colors hidden md:inline-block"
            >
              Browse All
            </Link>
          )}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous themes"
            className="w-10 h-10 rounded-full border border-white/10 bg-[#163022]/80 hover:bg-[#1f422e] text-[#f5f0e6] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md hover:border-[#84cc16]/50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next themes"
            className="w-10 h-10 rounded-full border border-white/10 bg-[#163022]/80 hover:bg-[#1f422e] text-[#f5f0e6] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md hover:border-[#84cc16]/50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory focus:outline-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {THEMES.map((theme) => {
          const Icon = theme.icon
          const isSelected = selectedTheme === theme.name

          const CardContent = (
            <div 
              className={`
                w-[260px] sm:w-[280px] shrink-0 snap-start
                rounded-[24px] p-6 flex flex-col justify-between min-h-[190px]
                border transition-all duration-300 shadow-lg relative overflow-hidden group select-none
                ${isSelected 
                  ? "bg-[#84cc16]/25 border-[#84cc16] shadow-[0_0_25px_rgba(132,204,22,0.35)] -translate-y-1" 
                  : "bg-[#163022]/85 hover:bg-[#1f422e] border-white/10 hover:border-[#84cc16]/50 hover:-translate-y-1.5"
                }
              `}
            >
              {/* Subtle hover gradient bloom */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="flex items-center justify-between w-full z-10">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-[16px]
                  border transition-all duration-300 shadow-inner
                  ${isSelected
                    ? "bg-[#84cc16] text-[#0f2317] border-[#84cc16]"
                    : "bg-[#0f2317] border-white/10 text-[#84cc16] group-hover:bg-[#84cc16] group-hover:text-[#0f2317] group-hover:scale-105"
                  }
                `}>
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                {theme.count !== undefined && (
                  <span className="text-[11px] font-medium text-[#cbd5e1]/70 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                    {theme.count} docs
                  </span>
                )}
              </div>

              <div className="z-10 mt-6">
                <h3 className="text-[15px] font-bold text-[#f5f0e6] group-hover:text-[#ffffff] leading-snug line-clamp-2 mb-1.5 transition-colors">
                  {theme.name}
                </h3>
                {theme.description && (
                  <p className="text-xs text-[#cbd5e1]/70 line-clamp-1">
                    {theme.description}
                  </p>
                )}
              </div>
            </div>
          )

          if (onSelectTheme) {
            return (
              <div 
                key={theme.id}
                onClick={() => onSelectTheme(theme.name)}
                className="cursor-pointer"
              >
                {CardContent}
              </div>
            )
          }

          return (
            <Link
              key={theme.id}
              href={`/resources?theme=${encodeURIComponent(theme.name)}`}
              className="cursor-pointer block"
            >
              {CardContent}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
