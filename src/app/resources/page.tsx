import { Metadata } from "next"
import { SearchInterface } from "./SearchInterface"
import { ThematicCarousel } from "@/components/resources/ThematicCarousel"

export const metadata: Metadata = {
  title: "Search Resources | DFIH",
  description: "Search and filter through the Digital Forestry Information Hub repository.",
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-[#163022] text-[#f5f0e6]">
      <div className="border-b border-white/10 bg-[#11281b]/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-8 md:py-12 max-w-6xl">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#84cc16] bg-[#84cc16]/10 border border-[#84cc16]/20 px-3 py-1 rounded-full">
              Forestry Research Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#f5f0e6] mt-4 mb-2">Resources</h1>
            <p className="text-[#cbd5e1] text-sm md:text-base max-w-2xl">
              Discover peer-reviewed studies, government inventories, datasets, and environmental policy guides across 10 major forestry domains.
            </p>
          </div>
          
          {/* THEMATIC AREAS SLIDING CAROUSEL */}
          <ThematicCarousel 
            title="Thematic Areas" 
            subtitle="Slide through disciplines to filter publications, policy documents, and field datasets"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12 flex-1 max-w-6xl">
        <h2 className="text-2xl font-bold tracking-tight text-[#f5f0e6] mb-8">Search Repository</h2>
        <SearchInterface />
      </div>
    </div>
  )
}
