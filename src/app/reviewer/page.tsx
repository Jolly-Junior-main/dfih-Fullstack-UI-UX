"use client"

import { useState, useEffect } from "react"
import { ClipboardList, CheckCircle, Clock, Search, Eye, ShieldAlert, ArrowRight, Lock } from "lucide-react"
import Link from "next/link"

const stats = [
  { name: "Pending Reviews", value: "5", icon: Clock, color: "text-amber-400" },
  { name: "Completed", value: "28", icon: CheckCircle, color: "text-[#84cc16]" },
  { name: "Total Assigned", value: "33", icon: ClipboardList, color: "text-[#84cc16]" },
]

export default function ReviewerPortal() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const adminAuth = sessionStorage.getItem("admin_auth") === "true"
    const userLoggedIn = sessionStorage.getItem("user_logged_in") === "true"
    
    if (adminAuth || userLoggedIn) {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
    }
  }, [])

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#163022] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#84cc16] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-[#163022] text-[#f5f0e6] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#1c3d2b]/90 border border-white/15 rounded-3xl p-8 text-center backdrop-blur-xl shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#f5f0e6] mb-3">Reviewer Authentication Required</h2>
          <p className="text-sm text-[#cbd5e1]/80 mb-8 leading-relaxed">
            The peer-review portal is restricted to accredited academic reviewers and system administrators. Please sign in to verify your credentials.
          </p>
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-sm transition-all shadow-lg shadow-[#84cc16]/20"
            >
              Sign In to Reviewer Account
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="w-full flex items-center justify-center py-3.5 px-6 rounded-xl border border-white/15 hover:bg-white/5 text-[#cbd5e1] hover:text-white font-semibold text-sm transition-all"
            >
              Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const assignedItems = [
    { title: "Silviculture Practices in Boreal Forests", author: "Dr. L. Jenkins", type: "Research Paper", priority: "High Priority", color: "text-red-400 border-red-400/30 bg-red-400/10" },
    { title: "Global Timber Trade Statistics 2025", author: "FAO Forestry Dept", type: "Dataset", priority: "Standard", color: "text-[#cbd5e1] border-white/15 bg-white/5" },
    { title: "Community Forestry Case Studies", author: "M. Ramirez", type: "Report", priority: "Standard", color: "text-[#cbd5e1] border-white/15 bg-white/5" }
  ].filter(item => 
    searchQuery === "" || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen pt-28 pb-16 bg-[#163022] text-[#f5f0e6]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#84cc16] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
            Accredited Peer-Review Portal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f5f0e6] mb-2">Reviewer Portal</h1>
          <p className="text-[#cbd5e1]/80 text-sm md:text-base">Evaluate and certify submitted scientific resources to uphold repository rigor.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex items-center justify-between shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div>
                  <p className="text-xs font-bold text-[#cbd5e1]/70 uppercase tracking-wider mb-1">{stat.name}</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-[#f5f0e6]">{stat.value}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#12281b] border border-white/10 flex items-center justify-center text-[#84cc16] shadow-inner">
                  <Icon size={26} strokeWidth={2} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Assigned Submissions */}
        <div className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#f5f0e6]">Assigned for Review</h2>
              <p className="text-xs text-[#cbd5e1]/70 mt-1">Pending evaluation submissions assigned to your profile</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assigned..." 
                className="bg-[#12281b] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-[#f5f0e6] placeholder:text-white/40 focus:outline-none focus:border-[#84cc16] w-full sm:w-64 transition-colors"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {assignedItems.length === 0 ? (
              <div className="py-12 text-center text-[#cbd5e1]/60 text-sm">
                No submissions matching your filter.
              </div>
            ) : (
              assignedItems.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-[#12281b]/60 border border-white/10 hover:border-[#84cc16]/40 hover:bg-[#12281b] transition-all group">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <h4 className="text-[#f5f0e6] font-semibold text-base md:text-lg group-hover:text-[#84cc16] transition-colors">{item.title}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${item.color}`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-xs text-[#cbd5e1]/70">By {item.author} • {item.type}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-all cursor-pointer" title="Preview Document">
                      <Eye size={18} />
                    </button>
                    <button className="px-5 py-2.5 rounded-xl bg-[#84cc16] text-[#0f2317] text-xs font-bold uppercase tracking-wider hover:bg-[#a3e635] transition-all shadow-md shadow-[#84cc16]/20 cursor-pointer">
                      Start Review
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
