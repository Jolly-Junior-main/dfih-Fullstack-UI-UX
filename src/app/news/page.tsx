import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

const newsItems = [
  {
    id: 1,
    title: "Global Forestry Summit 2026 Concludes with Historic Agreements",
    date: "October 1, 2026",
    category: "Events",
    summary: "World leaders and researchers gathered to establish new frameworks for data sharing across borders, emphasizing the critical role of open-source repositories.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
  },
  {
    id: 2,
    title: "New Satellite Data Integration Capabilities Added to DFIH",
    date: "September 24, 2026",
    category: "Platform Update",
    summary: "Researchers can now seamlessly connect Sentinel-2 satellite imagery directly with local biomass datasets using our new API endpoints.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800",
  },
  {
    id: 3,
    title: "Record Number of Independent Submissions Reached",
    date: "September 15, 2026",
    category: "Milestone",
    summary: "Thanks to our active contributor community, DFIH just surpassed 10,000 independent datasets focused on ecological restoration.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
  },
  {
    id: 4,
    title: "Understanding Policy Shifts in the Amazon Basin",
    date: "September 5, 2026",
    category: "Analysis",
    summary: "A deep dive into the recent legislative changes affecting sustainable timber harvesting and indigenous land rights in the region.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800",
  }
]

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        <div className="mb-16">
          <div className="text-[10px] uppercase tracking-widest text-[#84cc16] font-bold mb-4">Latest Updates</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#0f172a] mb-6">News & Insights</h1>
          <p className="text-[#0f172a]/70 text-lg max-w-2xl leading-relaxed">
            Stay informed with the latest updates from the Digital Forestry Information Hub, including platform features, global forestry news, and expert analyses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsItems.map((item) => (
            <Link 
              href={`#`} 
              key={item.id}
              className="group bg-[#f8fafc] border border-white/20 rounded-3xl overflow-hidden hover:border-[#84cc16]/50 transition-colors shadow-lg flex flex-col"
            >
              <div 
                className="h-64 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="p-8 flex flex-col flex-1 relative z-10 bg-[#f8fafc]">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-[#84cc16]/20 text-[#84cc16] px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-[#0f172a]/50 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.date}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-[#0f172a] mb-4 group-hover:text-[#84cc16] transition-colors leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-[#0f172a]/70 text-sm leading-relaxed mb-8 flex-1">
                  {item.summary}
                </p>
                
                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-[#0f172a] group-hover:text-[#84cc16] transition-colors">
                  Read Article <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
