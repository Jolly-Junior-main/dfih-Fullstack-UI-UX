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
  ChevronRight,
  MousePointer2
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
  subtitle = "Slide through disciplines to filter publications, policy documents, and field datasets",
  selectedTheme,
  onSelectTheme,
  showViewAll = true
}: ThematicCarouselProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const [isHovering, setIsHovering] = React.useState(false)
  const [activePanDirection, setActivePanDirection] = React.useState<"left" | "right" | "idle">("idle")
  
  // Dragging state
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [scrollStartLeft, setScrollStartLeft] = React.useState(0)

  // Hover Pan animation velocity
  const panVelocityRef = React.useRef(0)
  const animFrameRef = React.useRef<number | null>(null)

  const checkScroll = React.useCallback(() => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)))
    }
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

  // Continuous animation loop for cursor-detected movement
  React.useEffect(() => {
    const step = () => {
      if (scrollContainerRef.current && Math.abs(panVelocityRef.current) > 0.1 && !isDragging) {
        scrollContainerRef.current.scrollLeft += panVelocityRef.current
        checkScroll()
      }
      animFrameRef.current = requestAnimationFrame(step)
    }
    animFrameRef.current = requestAnimationFrame(step)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isDragging, checkScroll])

  // Mouse Move Cursor Detection: Moves track while cursor is detected
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // If dragging with mouse, handle drag scroll
    if (isDragging && scrollContainerRef.current) {
      const deltaX = e.pageX - startX
      scrollContainerRef.current.scrollLeft = scrollStartLeft - deltaX
      return
    }

    if (!scrollContainerRef.current) return
    const rect = scrollContainerRef.current.getBoundingClientRect()
    const relativeX = e.clientX - rect.left
    const width = rect.width

    const leftZone = width * 0.35   // Left 35%
    const rightZone = width * 0.65  // Right 35%

    if (relativeX < leftZone) {
      // Scale velocity up to -12px/frame
      const intensity = (leftZone - relativeX) / leftZone
      panVelocityRef.current = -Math.max(1, intensity * 14)
      setActivePanDirection("left")
    } else if (relativeX > rightZone) {
      // Scale velocity up to +12px/frame
      const intensity = (relativeX - rightZone) / (width - rightZone)
      panVelocityRef.current = Math.max(1, intensity * 14)
      setActivePanDirection("right")
    } else {
      panVelocityRef.current = 0
      setActivePanDirection("idle")
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    panVelocityRef.current = 0
    setActivePanDirection("idle")
    setIsDragging(false)
  }

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollStartLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const cardWidth = 280
    const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
      scrollContainerRef.current.scrollBy({ left: e.deltaY * 1.5, behavior: "auto" })
    }
  }

  return (
    <div className="w-full relative py-4">
      {/* Header with Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          {title && (
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
                {title}
              </h2>
              {isHovering && (
                <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#84cc16]/20 border border-[#84cc16]/40 text-[#84cc16] animate-pulse">
                  <MousePointer2 size={11} />
                  Cursor Detected • Dynamic Move
                </span>
              )}
            </div>
          )}
          {subtitle && (
            <p className="text-sm text-[#cbd5e1] max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Arrow Controls & View All */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {showViewAll && (
            <Link 
              href="/resources" 
              className="text-xs uppercase tracking-wider font-bold text-[#84cc16] hover:text-[#a3e635] mr-3 transition-colors hidden md:inline-block"
            >
              Browse All
            </Link>
          )}
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous themes"
            className="w-10 h-10 rounded-full border border-white/15 bg-[#163022]/80 hover:bg-[#1f422e] text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md hover:border-[#84cc16]/50 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next themes"
            className="w-10 h-10 rounded-full border border-white/15 bg-[#163022]/80 hover:bg-[#1f422e] text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md hover:border-[#84cc16]/50 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Edge Motion Glow Indicator when moving while cursor is detected */}
      <div 
        className={`absolute left-0 top-16 bottom-10 w-24 bg-gradient-to-r from-[#84cc16]/20 to-transparent pointer-events-none transition-opacity duration-300 z-20 ${
          activePanDirection === "left" ? "opacity-100" : "opacity-0"
        }`} 
      />
      <div 
        className={`absolute right-0 top-16 bottom-10 w-24 bg-gradient-to-l from-[#84cc16]/20 to-transparent pointer-events-none transition-opacity duration-300 z-20 ${
          activePanDirection === "right" ? "opacity-100" : "opacity-0"
        }`} 
      />

      {/* Carousel Track with cursor detection and mouse dragging */}
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={`flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory focus:outline-none scrollbar-none select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {THEMES.map((theme) => {
          const Icon = theme.icon
          const isSelected = selectedTheme === theme.name

          const CardContent = (
            <div 
              className={`
                w-[230px] sm:w-[260px] md:w-[280px] shrink-0 snap-start
                rounded-[24px] p-5 sm:p-6 flex flex-col justify-between min-h-[180px] sm:min-h-[190px]
                border transition-all duration-300 shadow-lg relative overflow-hidden group select-none
                ${isSelected 
                  ? "bg-[#84cc16]/25 border-[#84cc16] shadow-[0_0_25px_rgba(132,204,22,0.35)] -translate-y-1" 
                  : "bg-[#163022]/90 hover:bg-[#1f422e] border-white/10 hover:border-[#84cc16]/50 hover:-translate-y-1.5"
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
                  <span className="text-[11px] font-bold text-white bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full">
                    {theme.count} docs
                  </span>
                )}
              </div>

              <div className="z-10 mt-6">
                <h3 className="text-[15px] font-extrabold text-white group-hover:text-[#84cc16] leading-snug line-clamp-2 mb-1.5 transition-colors">
                  {theme.name}
                </h3>
                {theme.description && (
                  <p className="text-xs text-[#cbd5e1]/80 line-clamp-1">
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
                onClick={(e) => {
                  if (!isDragging) onSelectTheme(theme.name)
                }}
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
              onClick={(e) => {
                if (isDragging) e.preventDefault()
              }}
              className="cursor-pointer block"
            >
              {CardContent}
            </Link>
          )
        })}
      </div>

      {/* Progress Track & Indicator */}
      <div className="w-full max-w-md mx-auto mt-4 px-2 flex items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#cbd5e1]/50">
          Scroll
        </span>
        <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden relative border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-[#84cc16] to-[#a3e635] rounded-full transition-all duration-150"
            style={{ 
              width: `${Math.max(15, scrollProgress)}%`,
              marginLeft: `${(scrollProgress * (100 - Math.max(15, scrollProgress))) / 100}%` 
            }}
          />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#84cc16]">
          {Math.round(scrollProgress)}%
        </span>
      </div>
    </div>
  )
}
