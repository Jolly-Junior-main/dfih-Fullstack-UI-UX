import { Metadata } from "next"
import Link from "next/link"
import { Users, FileText, Database, Settings, Activity, LayoutDashboard, Shield, FolderGit2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard | DFIH",
  description: "Platform administration and management.",
}

const sidebarLinks = [
  { name: "Overview", icon: LayoutDashboard, href: "/admin" },
  { name: "Content", icon: FileText, href: "/admin/content" },
  { name: "Categories", icon: FolderGit2, href: "/admin/categories" },
  { name: "Users & Roles", icon: Users, href: "/admin/users" },
  { name: "System Logs", icon: Activity, href: "/admin/logs" },
  { name: "Security", icon: Shield, href: "/admin/security" },
  { name: "Database", icon: Database, href: "/admin/database" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[#f5f0e6]/70 hover:bg-[#577353]/30 hover:text-[#f5f0e6] aria-[current=page]:bg-[#84cc16]/20 aria-[current=page]:text-[#84cc16] aria-[current=page]:border aria-[current=page]:border-[#84cc16]/30 aria-[current=page]:shadow-inner"
                >
                  <Icon size={18} />
                  <span className="font-medium text-sm">{link.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
