"use client"

import * as React from "react"
import { Search, Filter, ChevronDown, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ResourceCard } from "@/components/resources/ResourceCard"
import { db } from "@/lib/firebase"
import { collection, query, onSnapshot, orderBy } from "firebase/firestore"

// Initial curated base repository data
const mockResults = [
  {
    id: "mock-1",
    title: "National Forest Inventory and Status Report 2024",
    resourceType: "Report",
    organization: "Ministry of Environment",
    year: 2024,
    theme: "Policy and Governance",
    description: "Comprehensive assessment of current forest cover, deforestation rates, and conservation efforts over the past five years."
  },
  {
    id: "mock-2",
    title: "Impact of Climate Change on Highland Bamboo",
    resourceType: "Publication",
    organization: "Forestry Research Institute",
    year: 2023,
    theme: "Climate Change Adaptation",
    description: "A peer-reviewed study examining the shifting ecological range of highland bamboo species under various climate projection models."
  },
  {
    id: "mock-3",
    title: "Community-Based Forest Management Guidelines",
    resourceType: "Manual",
    organization: "NGO Consortium",
    year: 2023,
    theme: "Sustainable Forest Management",
    description: "Standardized guidelines for establishing and governing local community forest associations and benefit-sharing mechanisms."
  },
  {
    id: "mock-4",
    title: "Economic Valuation of Non-Timber Forest Products",
    resourceType: "Dataset",
    organization: "University Economics Dept.",
    year: 2022,
    theme: "Forest Economics",
    description: "Raw survey data and analytical models valuing honey, medicinal plants, and wild coffee across three distinct ecological zones."
  },
  {
    id: "mock-5",
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
  year: ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "Older"],
  language: ["English", "Amharic", "Oromo", "French"]
}

export function SearchInterface() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [liveResources, setLiveResources] = React.useState<any[]>([])
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([])
  const [selectedThemes, setSelectedThemes] = React.useState<string[]>([])
  const [selectedOrgs, setSelectedOrgs] = React.useState<string[]>([])
  const [selectedYears, setSelectedYears] = React.useState<string[]>([])
  const [sortBy, setSortBy] = React.useState("newest")

  // Subscribe to live research submissions from Firestore
  React.useEffect(() => {
    const q = query(collection(db, "research_submissions"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: any[] = []
      snapshot.forEach(docSnap => {
        const data = docSnap.data()
        // Include published items or newly approved items
        const isPublished = !data.status || data.status.toLowerCase() === "published"
        if (isPublished) {
          items.push({
            id: docSnap.id,
            title: data.title || "Untitled Research",
            resourceType: (data.types && data.types[0]) || data.resourceType || "Research Paper",
            organization: data.institution || data.author || "DFIH Contributor",
            year: data.year || (data.createdAt?.toDate ? data.createdAt.toDate().getFullYear() : 2026),
            theme: data.category || data.theme || "Sustainable Forest Management",
            description: data.body || data.description || "Research document submitted to DFIH repository."
          })
        }
      })
      setLiveResources(items)
    }, (error) => {
      console.error("Error subscribing to research submissions:", error)
    })

    return () => unsubscribe()
  }, [])

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item])
  }

  const clearAllFilters = () => {
    setSelectedTypes([])
    setSelectedThemes([])
    setSelectedOrgs([])
    setSelectedYears([])
    setSearchQuery("")
  }

  // Combine live and mock results (avoiding duplicates)
  const allResources = React.useMemo(() => {
    const liveIds = new Set(liveResources.map(r => r.id))
    const uniqueMock = mockResults.filter(m => !liveIds.has(m.id))
    return [...liveResources, ...uniqueMock]
  }, [liveResources])

  // Filter and sort resources
  const filteredResources = React.useMemo(() => {
    return allResources.filter(item => {
      const q = searchQuery.toLowerCase()
      const matchesSearch = !q || 
        item.title?.toLowerCase().includes(q) ||
        item.organization?.toLowerCase().includes(q) ||
        item.theme?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.resourceType?.toLowerCase().includes(q)

      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.resourceType)
      const matchesTheme = selectedThemes.length === 0 || selectedThemes.includes(item.theme)
      const matchesOrg = selectedOrgs.length === 0 || selectedOrgs.includes(item.organization)
      const matchesYear = selectedYears.length === 0 || selectedYears.includes(String(item.year))

      return matchesSearch && matchesType && matchesTheme && matchesOrg && matchesYear
    }).sort((a, b) => {
      if (sortBy === "newest") return Number(b.year || 0) - Number(a.year || 0)
      if (sortBy === "oldest") return Number(a.year || 0) - Number(b.year || 0)
      if (sortBy === "a-z") return (a.title || "").localeCompare(b.title || "")
      if (sortBy === "z-a") return (b.title || "").localeCompare(a.title || "")
      return 0
    })
  }, [allResources, searchQuery, selectedTypes, selectedThemes, selectedOrgs, selectedYears, sortBy])

  const renderFilterGroup = (title: string, options: string[], idPrefix: string, selectedList: string[], setSelectedList: React.Dispatch<React.SetStateAction<string[]>>) => (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-white mb-3 tracking-wide">{title}</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {options.map((option) => (
          <div key={`${idPrefix}-${option}`} className="flex items-start space-x-3">
            <Checkbox 
              id={`${idPrefix}-${option}`} 
              checked={selectedList.includes(option)}
              onChange={() => toggleFilter(selectedList, setSelectedList, option)}
              className="mt-1 border-white/40 accent-[#84cc16]" 
            />
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
        {(selectedTypes.length > 0 || selectedThemes.length > 0 || selectedOrgs.length > 0 || selectedYears.length > 0 || searchQuery) && (
          <button onClick={clearAllFilters} className="text-sm font-semibold text-[#84cc16] hover:text-[#a3e635] hover:underline cursor-pointer">
            Clear all
          </button>
        )}
      </div>
      
      {renderFilterGroup("Resource Type", filters.resourceType, "type", selectedTypes, setSelectedTypes)}
      <hr className="my-4 border-white/15" />
      {renderFilterGroup("Theme / Category", filters.theme, "theme", selectedThemes, setSelectedThemes)}
      <hr className="my-4 border-white/15" />
      {renderFilterGroup("Organization", filters.organization, "org", selectedOrgs, setSelectedOrgs)}
      <hr className="my-4 border-white/15" />
      {renderFilterGroup("Publication Year", filters.year, "year", selectedYears, setSelectedYears)}
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
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 w-44 appearance-none rounded-xl border border-white/20 bg-[#163022] pl-4 pr-10 text-sm font-medium text-white focus:border-[#84cc16] focus:outline-none focus:ring-1 focus:ring-[#84cc16] cursor-pointer shadow-sm"
              >
                <option value="newest" className="bg-[#163022] text-white">Sort by: Newest</option>
                <option value="oldest" className="bg-[#163022] text-white">Sort by: Oldest</option>
                <option value="a-z" className="bg-[#163022] text-white">Sort by: A-Z</option>
                <option value="z-a" className="bg-[#163022] text-white">Sort by: Z-A</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-white/80 font-medium text-sm">
            Showing <span className="font-bold text-white">{filteredResources.length > 0 ? 1 : 0}</span> to <span className="font-bold text-white">{filteredResources.length}</span> of <span className="font-bold text-white">{filteredResources.length}</span> results
          </p>
        </div>

        {/* Active Filters */}
        {(selectedTypes.length > 0 || selectedThemes.length > 0 || selectedOrgs.length > 0 || selectedYears.length > 0 || searchQuery) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white shadow-sm">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="ml-2 text-white/70 hover:text-white cursor-pointer"><X className="h-3 w-3" /></button>
              </span>
            )}
            {selectedTypes.map(t => (
              <span key={t} className="inline-flex items-center rounded-full border border-[#84cc16]/40 bg-[#84cc16]/15 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-[#84cc16] shadow-sm">
                Type: {t}
                <button onClick={() => toggleFilter(selectedTypes, setSelectedTypes, t)} className="ml-2 hover:text-white cursor-pointer"><X className="h-3 w-3" /></button>
              </span>
            ))}
            {selectedThemes.map(th => (
              <span key={th} className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white shadow-sm">
                Theme: {th}
                <button onClick={() => toggleFilter(selectedThemes, setSelectedThemes, th)} className="ml-2 text-white/70 hover:text-white cursor-pointer"><X className="h-3 w-3" /></button>
              </span>
            ))}
            {selectedYears.map(y => (
              <span key={y} className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white shadow-sm">
                Year: {y}
                <button onClick={() => toggleFilter(selectedYears, setSelectedYears, y)} className="ml-2 text-white/70 hover:text-white cursor-pointer"><X className="h-3 w-3" /></button>
              </span>
            ))}
            <button onClick={clearAllFilters} className="text-xs font-semibold text-[#84cc16] hover:underline self-center ml-2 cursor-pointer">
              Reset Filters
            </button>
          </div>
        )}

        {/* Results Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} />
            ))}
          </div>
        ) : (
          <div className="p-14 text-center bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
            <Search className="w-12 h-12 text-[#84cc16]/40 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">No matching resources found</h3>
            <p className="text-sm text-[#cbd5e1]/70 max-w-md mx-auto mb-6">
              We couldn't find any resources matching your filters. Try clearing your search filters or keyword query.
            </p>
            <Button onClick={clearAllFilters} className="rounded-full bg-[#84cc16] text-[#0f2317] font-bold text-xs uppercase px-6 py-2.5">
              Clear All Filters
            </Button>
          </div>
        )}

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
