import { Metadata } from "next"
import { FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contributor Dashboard | DFIH",
  description: "Manage your submissions to the Digital Forestry Information Hub.",
}

const stats = [
  { name: "Total Submissions", value: "12", icon: FileText, color: "text-[#f5f0e6]" },
  { name: "Pending Review", value: "3", icon: Clock, color: "text-yellow-400" },
  { name: "Published", value: "8", icon: CheckCircle, color: "text-[#84cc16]" },
  { name: "Needs Revision", value: "1", icon: AlertCircle, color: "text-red-400" },
]

export default function ContributorDashboard() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-medium tracking-tight text-[#f5f0e6] mb-2">Welcome back, Dr. Smith</h1>
            <p className="text-[#f5f0e6]/70">Manage your forestry resources and track submission statuses.</p>
          </div>
          <Link 
            href="/submit" 
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#84cc16]/90 text-[#2d3a2a] px-6 py-3 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(132,204,22,0.3)] hover:shadow-[0_0_25px_rgba(132,204,22,0.5)]"
          >
            <Plus size={20} />
            Submit New Resource
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

        {/* Recent Submissions */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium text-[#f5f0e6]">Recent Submissions</h2>
            <Link href="#" className="text-sm text-[#84cc16] hover:underline">View all</Link>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "National Forest Inventory 2025", type: "Dataset", date: "Oct 2, 2026", status: "Published", color: "text-[#84cc16]" },
              { title: "Impact of Wildfires on Soil Ecosystems", type: "Report", date: "Sep 28, 2026", status: "In Review", color: "text-yellow-400" },
              { title: "Deforestation Rates in the Amazon (Q3)", type: "Analysis", date: "Sep 15, 2026", status: "Needs Revision", color: "text-red-400" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#577353]/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-10 h-10 rounded-full bg-[#698765] flex items-center justify-center text-[#f5f0e6]/80 group-hover:text-white group-hover:scale-110 transition-all">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="text-[#f5f0e6] font-medium group-hover:text-[#84cc16] transition-colors">{item.title}</h4>
                    <p className="text-xs text-[#f5f0e6]/50 mt-1">{item.type} • Submitted {item.date}</p>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-medium bg-black/20 backdrop-blur-sm border border-white/5 ${item.color}`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
