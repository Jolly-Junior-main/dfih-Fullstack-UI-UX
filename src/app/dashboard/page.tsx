import { Metadata } from "next"
import { FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contributor Dashboard | DFIH",
  description: "Manage your submissions to the Digital Forestry Information Hub.",
}

const stats = [
  { name: "Total Submissions", value: "12", icon: FileText, color: "text-[#0f172a]" },
  { name: "Pending Review", value: "3", icon: Clock, color: "text-yellow-400" },
  { name: "Published", value: "8", icon: CheckCircle, color: "text-[#84cc16]" },
  { name: "Needs Revision", value: "1", icon: AlertCircle, color: "text-red-400" },
]

export default function ContributorDashboard() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12 bg-[#163022] text-[#f5f0e6]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* User Account Header with Small Circular Profile Image */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 bg-[#1c3d2b]/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-5">
            {/* Small Circular Profile Image */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-4 ring-[#84cc16]/80 overflow-hidden shadow-xl bg-[#0f2317]">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300" 
                  alt="Dr. Elena Smith Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#84cc16] rounded-full border-2 border-[#163022] shadow-sm" title="Active Contributor" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f0e6]">Dr. Elena Smith</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#84cc16] text-[#0f2317]">
                  Verified Researcher
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1]/80">Lead Silviculture Contributor &bull; Forestry Information Hub</p>
              <p className="text-xs text-[#84cc16] mt-1 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] inline-block animate-pulse"></span>
                Account Active &bull; Contributor ID: #DFIH-8429
              </p>
            </div>
          </div>

          <Link 
            href="/submit" 
            className="flex items-center justify-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-6 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(132,204,22,0.35)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] text-sm shrink-0"
          >
            <Plus size={18} />
            Submit New Resource
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-[#1c3d2b]/70 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-[#84cc16]/40 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div>
                  <p className="text-xs text-[#cbd5e1]/80 font-medium mb-1 uppercase tracking-wider">{stat.name}</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#f5f0e6]">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-[#0f2317] border border-white/10 flex items-center justify-center ${stat.color} shadow-inner`}>
                  <Icon size={26} strokeWidth={2} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Submissions */}
        <div className="bg-[#1c3d2b]/70 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#f5f0e6]">Recent Submissions</h2>
            <Link href="/resources" className="text-xs font-semibold text-[#84cc16] hover:underline uppercase tracking-wider">View all</Link>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "National Forest Inventory 2025", type: "Dataset", date: "Oct 2, 2026", status: "Published", color: "text-[#84cc16] bg-[#84cc16]/10 border-[#84cc16]/30" },
              { title: "Impact of Wildfires on Soil Ecosystems", type: "Report", date: "Sep 28, 2026", status: "In Review", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" },
              { title: "Deforestation Rates in the Amazon (Q3)", type: "Analysis", date: "Sep 15, 2026", status: "Needs Revision", color: "text-red-400 bg-red-400/10 border-red-400/30" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-[#0f2317]/60 border border-white/5 hover:border-white/15 transition-all cursor-pointer group">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#84cc16] group-hover:scale-110 transition-transform">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="text-[#f5f0e6] font-medium group-hover:text-[#84cc16] transition-colors">{item.title}</h4>
                    <p className="text-xs text-[#cbd5e1]/60 mt-0.5">{item.type} &bull; Submitted {item.date}</p>
                  </div>
                </div>
                <div className={`px-3.5 py-1 rounded-full text-xs font-semibold border ${item.color}`}>
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
