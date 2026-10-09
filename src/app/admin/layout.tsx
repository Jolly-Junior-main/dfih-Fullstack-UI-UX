"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Users, FileText, Database, Settings, Activity, LayoutDashboard, Shield, FolderGit2 } from "lucide-react"

const sidebarLinks = [
  { name: "Overview", icon: LayoutDashboard, href: "/admin" },
  { name: "Research Submissions", icon: FileText, href: "/admin/research" },
  { name: "Content", icon: FileText, href: "/admin/content" },
  { name: "Categories", icon: FolderGit2, href: "/admin/categories" },
  { name: "Users & Roles", icon: Users, href: "/admin/users" },
  { name: "System Logs", icon: Activity, href: "/admin/logs" },
  { name: "Security", icon: Shield, href: "/admin/security" },
  { name: "Database", icon: Database, href: "/admin/database" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === "/admin/login"
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (!isLoginPage) {
      const auth = sessionStorage.getItem("admin_auth")
      if (!auth) {
        router.push("/admin/login")
      } else {
        setIsAuthenticated(true)
      }
    }
  }, [isLoginPage, router])

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth")
    router.push("/admin/login")
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  // Prevent flash of unauthenticated content
  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#ffffff]"></div>
  }

  return (
    <div className="flex min-h-screen pt-20">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 hidden md:block border-r border-white/20 bg-[#84cc16]/10 backdrop-blur-sm relative z-10 flex flex-col">
        <div className="p-6 flex-1 flex flex-col">
          <div className="text-xs font-bold text-[#0f172a]/50 uppercase tracking-wider mb-6">Admin Menu</div>
          <nav className="space-y-2 flex-1">
            {sidebarLinks.map((link, idx) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link 
                  key={idx} 
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-[#84cc16]/20 text-[#84cc16] border border-[#84cc16]/30 shadow-inner' 
                      : 'text-[#0f172a]/70 hover:bg-[#f8fafc]/30 hover:text-[#0f172a]'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium text-sm">{link.name}</span>
                </Link>
              )
            })}
          </nav>
          
          <div className="pt-6 mt-6 border-t border-white/10">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-400/80 hover:bg-red-500/20 hover:text-red-400 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
