import { Metadata } from "next"
import { Users, FileText, Database, Settings, Activity, LayoutDashboard, Shield, FolderGit2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Admin Dashboard | DFIH",
  description: "Platform administration and management.",
}

const sidebarLinks = [
  { name: "Overview", icon: LayoutDashboard, active: true },
  { name: "Documents", icon: FileText, active: false },
  { name: "Categories", icon: FolderGit2, active: false },
  { name: "Users & Roles", icon: Users, active: false },
  { name: "System Logs", icon: Activity, active: false },
  { name: "Security", icon: Shield, active: false },
  { name: "Database", icon: Database, active: false },
  { name: "Settings", icon: Settings, active: false },
]

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen pt-20">
      
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 hidden md:block border-r border-white/20 bg-white/10 backdrop-blur-sm relative z-10">
        <div className="p-6">
          <div className="text-xs font-bold text-[#f5f0e6]/50 uppercase tracking-wider mb-6">Admin Menu</div>
          <nav className="space-y-2">
            {sidebarLinks.map((link, idx) => {
              const Icon = link.icon
              return (
                <Link 
                  key={idx} 
                  href="#"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${link.active ? 'bg-[#84cc16]/20 text-[#84cc16] border border-[#84cc16]/30 shadow-inner' : 'text-[#f5f0e6]/70 hover:bg-[#577353]/30 hover:text-[#f5f0e6]'}`}
                >
                  <Icon size={18} />
                  <span className="font-medium text-sm">{link.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-10">
            <h1 className="text-3xl font-medium tracking-tight text-[#f5f0e6]">Platform Overview</h1>
            <p className="text-[#f5f0e6]/60 mt-1">System health and high-level metrics.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Users", val: "1,248", trend: "+12% this month" },
              { label: "Published Resources", val: "8,942", trend: "+342 this week" },
              { label: "Pending Approvals", val: "45", trend: "-5 from yesterday" },
              { label: "System Health", val: "99.9%", trend: "All services operational" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-lg">
                <p className="text-[#f5f0e6]/50 text-sm font-medium mb-2">{stat.label}</p>
                <h3 className="text-3xl font-bold text-[#f5f0e6] mb-2">{stat.val}</h3>
                <p className="text-[#84cc16] text-xs font-medium">{stat.trend}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl h-80 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-6 left-6 text-lg font-medium text-[#f5f0e6]">Traffic Analytics</div>
              <Activity size={48} className="text-[#f5f0e6]/20 mb-4" />
              <p className="text-[#f5f0e6]/40 text-sm">Chart visualization would render here</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl overflow-hidden flex flex-col">
              <h3 className="text-lg font-medium text-[#f5f0e6] mb-4">Recent Audit Logs</h3>
              <div className="flex-1 space-y-4">
                {[
                  { action: "User 'j.doe' modified metadata on Resource #842", time: "10 mins ago" },
                  { action: "System backup completed successfully", time: "2 hours ago" },
                  { action: "New reviewer account created: 'm.ramirez'", time: "4 hours ago" },
                  { action: "Failed login attempt from IP 192.168.1.44", time: "5 hours ago" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 items-start pb-4 border-b border-[#f5f0e6]/5 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-[#84cc16] mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[#f5f0e6]">{log.action}</p>
                      <p className="text-xs text-[#f5f0e6]/40 mt-1">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  )
}
