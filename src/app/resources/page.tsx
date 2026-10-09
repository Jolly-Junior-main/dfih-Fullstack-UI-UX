import { Metadata } from "next"
import { SearchInterface } from "./SearchInterface"
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
  Globe 
} from "lucide-react"

export const metadata: Metadata = {
  title: "Search Resources | DFIH",
  description: "Search and filter through the Digital Forestry Information Hub repository.",
}

const themes = [
  { name: "Policy and Governance", icon: Scale },
  { name: "Sustainable Forest Management", icon: TreePine },
  { name: "Climate Change Adaptation & Mitigation", icon: ThermometerSun },
  { name: "Forest Health and Fire", icon: Flame },
  { name: "Forest Economics", icon: Banknote },
  { name: "Research, Education and Extension", icon: Microscope },
  { name: "Wood Science & Technology", icon: Layers },
  { name: "Forest Ecology, Wildlife & Biodiversity", icon: PawPrint },
  { name: "Restoration of Degraded Land & Soil & Water Management", icon: Mountain },
  { name: "International Forestry", icon: Globe },
]

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <div className="border-b border-white/20">
        <div className="container mx-auto px-6 py-8 md:py-12 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-16">Resources</h1>
          
          {/* THEMES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {themes.map((theme, idx) => {
              const Icon = theme.icon
              return (
                <div key={idx} className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-[24px] p-6 flex flex-col items-start justify-between min-h-[160px] group cursor-pointer hover:bg-[#ffffff]/40 hover:border-[#84cc16]/30 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden">
                  
                  {/* Subtle highlight effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="flex items-center justify-center w-12 h-12 rounded-[14px] bg-[#f8fafc] border border-white/20 text-[#84cc16] group-hover:scale-110 group-hover:bg-[#84cc16] group-hover:text-[#ffffff] transition-all duration-300 shadow-inner z-10">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  
                  <div className="z-10 mt-6">
                    <h3 className="text-[15px] font-medium text-[#0f172a] leading-tight group-hover:text-white transition-colors">
                      {theme.name}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12 flex-1 max-w-6xl">
        <h2 className="text-2xl font-medium tracking-tight mb-8">Search Repository</h2>
        <SearchInterface />
      </div>
    </div>
  )
}
