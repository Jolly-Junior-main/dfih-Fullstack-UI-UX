"use client"

import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { 
  Globe2, 
  TreePine, 
  Landmark, 
  ShieldCheck, 
  Layers, 
  Award, 
  Leaf, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from "lucide-react"

export interface PartnerDonor {
  id: string
  name: string
  acronym: string
  type: string
  focus: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  color: string
}

export const DONOR_PARTNERS: PartnerDonor[] = [
  {
    id: "gfc",
    name: "Global Forestry Commission",
    acronym: "GFC",
    type: "Multilateral Agency",
    focus: "International Forest Policy",
    icon: Landmark,
    color: "from-emerald-500/20 to-lime-500/10"
  },
  {
    id: "un-redd",
    name: "UN-REDD Programme",
    acronym: "UN-REDD",
    type: "United Nations Initiative",
    focus: "Carbon Emissions & Deforestation",
    icon: Globe2,
    color: "from-cyan-500/20 to-blue-500/10"
  },
  {
    id: "ife",
    name: "Institute of Forest Ecology",
    acronym: "IFE",
    type: "Academic Consortium",
    focus: "Ecosystem Resilience Studies",
    icon: TreePine,
    color: "from-lime-500/20 to-emerald-500/10"
  },
  {
    id: "gef",
    name: "Global Environment Facility",
    acronym: "GEF",
    type: "International Donor",
    focus: "Biodiversity & Land Grants",
    icon: Award,
    color: "from-amber-500/20 to-yellow-500/10"
  },
  {
    id: "acf",
    name: "Amazon Conservation Fund",
    acronym: "ACF",
    type: "Conservation Trust",
    focus: "Rainforest Canopy Monitoring",
    icon: Leaf,
    color: "from-green-500/20 to-emerald-500/10"
  },
  {
    id: "wto-timber",
    name: "World Timber Organization",
    acronym: "WTO-SFM",
    type: "Trade Authority",
    focus: "Sustainable Silviculture Quotas",
    icon: Layers,
    color: "from-teal-500/20 to-emerald-500/10"
  },
  {
    id: "brn",
    name: "Boreal Research Network",
    acronym: "BRN",
    type: "Northern Research Alliance",
    focus: "Permafrost & Subarctic Forestry",
    icon: ShieldCheck,
    color: "from-blue-500/20 to-indigo-500/10"
  },
  {
    id: "afi",
    name: "Agroforestry International",
    acronym: "AFI",
    type: "Applied Field Institute",
    focus: "Food Systems & Tree Cultivation",
    icon: TreePine,
    color: "from-emerald-500/20 to-teal-500/10"
  }
]

export function PartnerDonorCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  // Auto-slide effect when not hovered
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      if (!scrollRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      if (scrollLeft >= scrollWidth - clientWidth - 20) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
      }
    }, 4500)
    return () => clearInterval(interval)
  }, [isPaused])

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = direction === "left" ? -320 : 320
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <div className="w-full border-b border-white/10 bg-[#0a180f] py-12 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24">
      <div className="max-w-[1920px] mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84cc16]/10 border border-[#84cc16]/30 text-[#84cc16] text-[10px] font-bold uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] animate-pulse" />
              Global Coalition & Institutional Partners
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Supported By Leading Donors & Forestry Institutions
            </h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1]/80 mt-1 max-w-2xl">
              Collaborating with verified international agencies, research universities, and trust funds driving open science.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Link 
              href="/partners"
              className="text-xs font-bold uppercase tracking-wider text-[#84cc16] hover:text-[#a3e635] flex items-center gap-1.5 transition-colors mr-2"
            >
              All Partners <ExternalLink size={13} />
            </Link>
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left partners"
              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer hover:border-[#84cc16]/50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right partners"
              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer hover:border-[#84cc16]/50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {DONOR_PARTNERS.map((partner) => {
            const Icon = partner.icon
            return (
              <Link
                key={partner.id}
                href="/partners"
                className="group snap-start shrink-0 w-[270px] sm:w-[300px] p-5 rounded-2xl bg-[#12281b]/80 border border-white/10 hover:border-[#84cc16]/50 hover:bg-[#163323] transition-all duration-300 shadow-lg relative overflow-hidden flex flex-col justify-between"
              >
                {/* Background Ambient Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${partner.color} rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0b1c11] border border-white/10 flex items-center justify-center text-[#84cc16] shadow-inner group-hover:scale-105 group-hover:border-[#84cc16]/40 transition-all">
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                      {partner.acronym}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-[#84cc16] transition-colors leading-snug line-clamp-1 mb-1">
                    {partner.name}
                  </h4>
                  <p className="text-[11px] text-[#cbd5e1]/70 line-clamp-1 mb-3">
                    {partner.type}
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-[#cbd5e1]/60 font-medium truncate max-w-[190px]">
                    {partner.focus}
                  </span>
                  <span className="text-[#84cc16] font-bold group-hover:translate-x-0.5 transition-transform">
                    &rarr;
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
