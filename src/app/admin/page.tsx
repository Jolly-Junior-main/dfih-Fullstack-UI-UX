import { Activity } from "lucide-react"

export default function AdminDashboard() {
  return (
    <main className="p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-3xl font-medium tracking-tight text-[#0f172a]">Platform Overview</h1>
          <p className="text-[#0f172a]/60 mt-1">System health and high-level metrics.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Users", val: "1,248", trend: "+12% this month" },
            { label: "Published Resources", val: "8,942", trend: "+342 this week" },
            { label: "Pending Approvals", val: "45", trend: "-5 from yesterday" },
            { label: "System Health", val: "99.9%", trend: "All services operational" }
          ].map((stat, i) => (
            <div key={i} className="bg-[#84cc16]/15 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-lg">
              <p className="text-[#0f172a]/50 text-sm font-medium mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-[#0f172a] mb-2">{stat.val}</h3>
              <p className="text-[#84cc16] text-xs font-medium">{stat.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#84cc16]/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl h-80 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-6 left-6 text-lg font-medium text-[#0f172a]">Traffic Analytics</div>
            <Activity size={48} className="text-[#0f172a]/50 mb-4" />
            <p className="text-[#0f172a]/60 text-sm">Chart visualization would render here</p>
          </div>
          
          <div className="bg-[#84cc16]/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl overflow-hidden flex flex-col">
            <h3 className="text-lg font-medium text-[#0f172a] mb-4">Recent Audit Logs</h3>
            <div className="flex-1 space-y-4">
              {[
                { action: "User 'j.doe' modified metadata on Resource #842", time: "10 mins ago" },
                { action: "System backup completed successfully", time: "2 hours ago" },
                { action: "New reviewer account created: 'm.ramirez'", time: "4 hours ago" },
                { action: "Failed login attempt from IP 192.168.1.44", time: "5 hours ago" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start pb-4 border-b border-[#0f172a]/5 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-[#84cc16] mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#0f172a]">{log.action}</p>
                    <p className="text-xs text-[#0f172a]/60 mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
