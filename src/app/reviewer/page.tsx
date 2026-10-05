import { Metadata } from "next"
import { ClipboardList, CheckCircle, Clock, Search, Eye } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Reviewer Portal | DFIH",
  description: "Review assigned forestry submissions.",
}

const stats = [
  { name: "Pending Reviews", value: "5", icon: Clock, color: "text-yellow-400" },
  { name: "Completed", value: "28", icon: CheckCircle, color: "text-[#84cc16]" },
  { name: "Total Assigned", value: "33", icon: ClipboardList, color: "text-[#f5f0e6]" },
]

export default function ReviewerPortal() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-12">
          <h1 className="text-4xl font-medium tracking-tight text-[#f5f0e6] mb-2">Reviewer Portal</h1>
          <p className="text-[#f5f0e6]/70">Evaluate and approve assigned resources to ensure repository quality.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex items-center justify-between shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div>
                  <p className="text-sm text-[#f5f0e6]/70 font-medium mb-1">{stat.name}</p>
                  <p className="text-4xl font-bold text-[#f5f0e6]">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-[#577353]/50 border border-[#f5f0e6]/5 flex items-center justify-center ${stat.color} shadow-inner`}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Assigned Submissions */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-medium text-[#f5f0e6]">Assigned for Review</h2>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f5f0e6]/40" size={18} />
              <input 
                type="text" 
                placeholder="Search assigned..." 
                className="bg-[#577353]/30 border border-white/20 rounded-full py-2 pl-10 pr-4 text-sm text-[#f5f0e6] placeholder:text-[#f5f0e6]/40 focus:outline-none focus:border-[#84cc16]/50 w-full sm:w-64"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "Silviculture Practices in Boreal Forests", author: "Dr. L. Jenkins", type: "Research Paper", priority: "High Priority", color: "text-red-400 border-red-400/20 bg-red-400/10" },
              { title: "Global Timber Trade Statistics 2025", author: "FAO Forestry Dept", type: "Dataset", priority: "Standard", color: "text-[#f5f0e6]/60 border-white/20 bg-black/20" },
              { title: "Community Forestry Case Studies", author: "M. Ramirez", type: "Report", priority: "Standard", color: "text-[#f5f0e6]/60 border-white/20 bg-black/20" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#577353]/50 transition-colors group">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-[#f5f0e6] font-medium text-lg group-hover:text-[#84cc16] transition-colors">{item.title}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wider ${item.color}`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-sm text-[#f5f0e6]/60">By {item.author} • {item.type}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#698765]/50 border border-white/20 text-[#f5f0e6] hover:bg-[#84cc16] hover:text-[#2d3a2a] transition-all" title="Preview Document">
                    <Eye size={18} />
                  </button>
                  <button className="px-5 py-2 rounded-full bg-[#f5f0e6] text-[#2d3a2a] text-sm font-medium hover:bg-white transition-colors">
                    Start Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
