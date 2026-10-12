"use client"

import * as React from "react"
import { Search, Filter, ChevronDown, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ResourceCard } from "@/components/resources/ResourceCard"

// Re-using the mock data
const mockResults = [
  {
    id: "1",
    title: "National Forest Inventory and Status Report 2024",
    resourceType: "Report",
    organization: "Ministry of Environment",
    year: 2024,
    theme: "Policy and Governance",
    description: "Comprehensive assessment of current forest cover, deforestation rates, and conservation efforts over the past five years."
  },
  {
    id: "2",
    title: "Impact of Climate Change on Highland Bamboo",
    resourceType: "Publication",
    organization: "Forestry Research Institute",
    year: 2023,
    theme: "Climate Change Adaptation",
    description: "A peer-reviewed study examining the shifting ecological range of highland bamboo species under various climate projection models."
  },
  {
    id: "3",
    title: "Community-Based Forest Management Guidelines",
    resourceType: "Manual",
    organization: "NGO Consortium",
    year: 2023,
    theme: "Sustainable Forest Management",
    description: "Standardized guidelines for establishing and governing local community forest associations and benefit-sharing mechanisms."
  },
  {
    id: "4",
    title: "Economic Valuation of Non-Timber Forest Products",
    resourceType: "Dataset",
    organization: "University Economics Dept.",
    year: 2022,
    theme: "Forest Economics",
    description: "Raw survey data and analytical models valuing honey, medicinal plants, and wild coffee across three distinct ecological zones."
  },
  {
    id: "5",
    title: "Biodiversity Conservation in Fragmented Habitats",
    resourceType: "Publication",
    organization: "Global Wildlife Fund",
    year: 2024,
    theme: "Forest Ecology",
    description: "Analysis of species richness and conservation strategies in heavily fragmented tropical forest landscapes."
  }
]

const filters = {
  resourceType: ["Report", "Publication", "Manual", "Dataset", "Policy Brief", "Other"],
  theme: ["Sustainable Forest Management", "Policy and Governance", "Climate Change Adaptation", "Forest Economics", "Forest Ecology", "Wood Science"],
  organization: ["Ministry of Environment", "Forestry Research Institute", "NGO Consortium", "University Economics Dept.", "Global Wildlife Fund"],
  year: ["2024", "2023", "2022", "2021", "2020", "Older"],
  language: ["English", "Amharic", "Oromo", "French"]
}

export function SearchInterface() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const renderFilterGroup = (title: string, options: string[], idPrefix: string) => (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-white mb-3 tracking-wide">{title}</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {options.map((option) => (
          <div key={`${idPrefix}-${option}`} className="flex items-start space-x-3">
            <Checkbox id={`${idPrefix}-${option}`} className="mt-1 border-white/40 data-[state=checked]:bg-[#84cc16] data-[state=checked]:border-[#84cc16] data-[state=checked]:text-[#0f2317]" />
            <Label htmlFor={`${idPrefix}-${option}`} className="text-sm font-medium text-[#f5f0e6]/90 cursor-pointer hover:text-white leading-snug">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )

  const Sidebar = () => (
    <div className="bg-[#84cc16]/15 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white">Filters</h2>
        <button className="text-sm font-semibold text-[#84cc16] hover:text-[#a3e635] hover:underline">Clear all</button>
      </div>
      
      {renderFilterGroup("Resource Type", filters.resourceType, "type")}
      <hr className="my-4 border-white/15" />
      {renderFilterGroup("Theme / Category", filters.theme, "theme")}
      <hr className="my-4 border-white/15" />
      {renderFilterGroup("Organization", filters.organization, "org")}
      <hr className="my-4 border-white/15" />
      {renderFilterGroup("Publication Year", filters.year, "year")}
      <hr className="my-4 border-white/15" />
      {renderFilterGroup("Language", filters.language, "lang")}
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-[#163022] border-r border-white/20 pb-12 shadow-2xl z-50 h-full">
            <div className="flex items-center justify-between px-4 pt-5 pb-2 border-b border-white/20">
              <h2 className="text-lg font-bold text-white">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)} className="text-white hover:bg-white/10">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="p-4">
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Search Bar & Mobile Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
            <Input 
              type="search" 
              placeholder="Search resources by keyword, title, or author..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/60 focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16] rounded-xl shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="h-12 lg:hidden flex-1 sm:flex-none border-white/20 bg-white/10 text-white hover:bg-white/20 rounded-xl"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4 text-[#84cc16]" /> Filters
            </Button>
            <div className="relative hidden sm:block">
              <select className="h-12 w-44 appearance-none rounded-xl border border-white/20 bg-[#163022] pl-4 pr-10 text-sm font-medium text-white focus:border-[#84cc16] focus:outline-none focus:ring-1 focus:ring-[#84cc16] cursor-pointer shadow-sm">
                <option className="bg-[#163022] text-white">Sort by: Newest</option>
                <option className="bg-[#163022] text-white">Sort by: Oldest</option>
                <option className="bg-[#163022] text-white">Sort by: A-Z</option>
                <option className="bg-[#163022] text-white">Sort by: Z-A</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-white/80 font-medium text-sm">
            Showing <span className="font-bold text-white">1</span> to <span className="font-bold text-white">5</span> of <span className="font-bold text-white">248</span> results
          </p>
        </div>

        {/* Active Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white shadow-sm">
            Year: 2024
            <button className="ml-2 text-white/70 hover:text-white"><X className="h-3 w-3" /></button>
          </span>
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white shadow-sm">
            Type: Report
            <button className="ml-2 text-white/70 hover:text-white"><X className="h-3 w-3" /></button>
          </span>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {mockResults.map((resource) => (
            <ResourceCard key={resource.id} {...resource} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-between border border-white/15 bg-white/5 backdrop-blur-md px-4 py-3 sm:px-6 rounded-2xl shadow-lg">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">Previous</Button>
            <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">Next</Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-white/80">
                Showing <span className="font-bold text-white">1</span> to <span className="font-bold text-white">5</span> of <span className="font-bold text-white">248</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm overflow-hidden" aria-label="Pagination">
                <button className="relative inline-flex items-center rounded-l-md px-3 py-2 text-white/70 border border-white/20 hover:bg-white/10 transition-colors">
                  <span className="sr-only">Previous</span>
                  &larr;
                </button>
                <button aria-current="page" className="relative z-10 inline-flex items-center bg-[#84cc16] px-4 py-2 text-sm font-bold text-[#0f2317]">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">
                  3
                </button>
                <button className="relative inline-flex items-center rounded-r-md px-3 py-2 text-white/70 border border-white/20 hover:bg-white/10 transition-colors">
                  <span className="sr-only">Next</span>
                  &rarr;
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
