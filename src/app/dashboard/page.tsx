"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText, Clock, CheckCircle, AlertCircle, Plus, LogOut, User, ShieldCheck } from "lucide-react"
import Link from "next/link"

const stats = [
  { name: "Total Submissions", value: "12", icon: FileText, color: "text-[#0f172a]" },
  { name: "Pending Review", value: "3", icon: Clock, color: "text-yellow-400" },
  { name: "Published", value: "8", icon: CheckCircle, color: "text-[#84cc16]" },
  { name: "Needs Revision", value: "1", icon: AlertCircle, color: "text-red-400" },
]

export default function ContributorDashboard() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    institution: "",
  })

  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [regName, setRegName] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regInstitution, setRegInstitution] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    const adminAuth = sessionStorage.getItem("admin_auth") === "true"
    const userEmail = sessionStorage.getItem("user_email")
    const loggedIn = sessionStorage.getItem("user_logged_in") === "true"

    if (adminAuth) {
      setUserData({
        name: "DFIH Administrator",
        email: "admin@dfih.org",
        institution: "DFIH Central Governance",
      })
      setIsAuthorized(true)
      return
    }

    // STRICT: Only authorize if a valid email and user_logged_in exist
    if (!userEmail || !loggedIn) {
      sessionStorage.removeItem("user_auth")
      sessionStorage.removeItem("user_logged_in")
      setIsAuthorized(false)
      return
    }

    const name = sessionStorage.getItem("user_name") || userEmail.split("@")[0]
    const institution = sessionStorage.getItem("user_institution") || "Forestry Research Department"
    setUserData({ name, email: userEmail, institution })
    setIsAuthorized(true)
  }, [])

  const handleInlineLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setTimeout(() => {
      sessionStorage.setItem("user_logged_in", "true")
      sessionStorage.setItem("user_auth", "true")
      sessionStorage.setItem("user_email", loginEmail)
      const existingName = sessionStorage.getItem("user_name")
      const resolvedName = existingName || loginEmail.split("@")[0].replace(/[._-]/g, " ")
      const formattedName = resolvedName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      sessionStorage.setItem("user_name", formattedName)
      setUserData({
        name: formattedName,
        email: loginEmail,
        institution: sessionStorage.getItem("user_institution") || "Forestry Research Department"
      })
      setIsAuthorized(true)
      setAuthLoading(false)
    }, 600)
  }

  const handleInlineRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setTimeout(() => {
      sessionStorage.setItem("user_logged_in", "true")
      sessionStorage.setItem("user_auth", "true")
      sessionStorage.setItem("user_name", regName)
      sessionStorage.setItem("user_email", regEmail)
      sessionStorage.setItem("user_institution", regInstitution || "Forestry Institute")
      setUserData({
        name: regName,
        email: regEmail,
        institution: regInstitution || "Forestry Institute"
      })
      setIsAuthorized(true)
      setAuthLoading(false)
    }, 600)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("user_auth")
    sessionStorage.removeItem("user_logged_in")
    sessionStorage.removeItem("user_name")
    sessionStorage.removeItem("user_email")
    sessionStorage.removeItem("user_institution")
    setIsAuthorized(false)
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col min-h-screen pt-28 pb-16 bg-[#163022] text-[#f5f0e6] justify-center items-center px-4 sm:px-6">
        <div className="w-full max-w-lg bg-[#1c3d2b]/90 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          {/* Subtle Glow Accent */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-[#84cc16] opacity-15 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 flex items-center justify-center mx-auto mb-4 text-[#84cc16] shadow-inner">
              <User size={30} />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-[#84cc16] font-bold mb-2">Researcher Portal</div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5f0e6] mb-2 tracking-tight">
              Account Required
            </h1>
            <p className="text-xs sm:text-sm text-[#cbd5e1]/80 max-w-sm mx-auto">
              Please sign in to your existing account or create a new researcher account to view your submissions and profile.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#12281b] rounded-2xl border border-white/10 mb-6 relative z-10">
            <button
              onClick={() => setAuthMode("login")}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                authMode === "login"
                  ? "bg-[#84cc16] text-[#0f2317] shadow-md"
                  : "text-[#cbd5e1] hover:text-white"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setAuthMode("register")}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                authMode === "register"
                  ? "bg-[#84cc16] text-[#0f2317] shadow-md"
                  : "text-[#cbd5e1] hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Mode 1: Log In Form */}
          {authMode === "login" && (
            <form onSubmit={handleInlineLogin} className="space-y-4 relative z-10 animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#cbd5e1]">Email Address</label>
                <input
                  type="email"
                  placeholder="name@university.edu"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[#cbd5e1]">Password</label>
                  <Link href="/login" className="text-[11px] text-[#84cc16] hover:underline">Forgot?</Link>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full mt-2 py-3.5 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-sm transition-all shadow-lg shadow-[#84cc16]/20 cursor-pointer disabled:opacity-50"
              >
                {authLoading ? "Signing in..." : "Log In to Account"}
              </button>

              <div className="pt-2 text-center text-xs text-[#cbd5e1]/70">
                New to DFIH?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("register")}
                  className="text-[#84cc16] font-bold hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </div>
            </form>
          )}

          {/* Mode 2: Create Account Form */}
          {authMode === "register" && (
            <form onSubmit={handleInlineRegister} className="space-y-4 relative z-10 animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#cbd5e1]">Full Name</label>
                <input
                  type="text"
                  placeholder="Dr. Jane Doe"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#cbd5e1]">Email Address</label>
                <input
                  type="email"
                  placeholder="jane.doe@forestry.org"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#cbd5e1]">Organization / Institution</label>
                <input
                  type="text"
                  placeholder="Ministry of Environment"
                  value={regInstitution}
                  onChange={(e) => setRegInstitution(e.target.value)}
                  required
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#cbd5e1]">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full mt-2 py-3.5 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-sm transition-all shadow-lg shadow-[#84cc16]/20 cursor-pointer disabled:opacity-50"
              >
                {authLoading ? "Creating account..." : "Create Account & Sign In"}
              </button>

              <div className="pt-2 text-center text-xs text-[#cbd5e1]/70">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className="text-[#84cc16] font-bold hover:underline cursor-pointer"
                >
                  Log in
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    )
  }

  const initial = userData.name ? userData.name.charAt(0).toUpperCase() : "R"

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12 bg-[#163022] text-[#f5f0e6]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* User Account Header with Small Circular Profile Image */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 bg-[#1c3d2b]/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-5">
            {/* Small Circular Profile Image with User Initial or Avatar */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-4 ring-[#84cc16]/80 overflow-hidden shadow-xl bg-[#0f2317] flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#84cc16]">
                  {initial}
                </span>
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#84cc16] rounded-full border-2 border-[#163022] shadow-sm" title="Active Contributor" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f0e6]">{userData.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#84cc16] text-[#0f2317] flex items-center gap-1">
                  <ShieldCheck size={12} />
                  Verified Researcher
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#cbd5e1]/80">
                {userData.institution} &bull; {userData.email}
              </p>
              <p className="text-xs text-[#84cc16] mt-1 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] inline-block animate-pulse"></span>
                Account Active &bull; Logged In
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link 
              href="/submit" 
              className="flex items-center justify-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-5 py-2.5 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(132,204,22,0.35)] text-sm shrink-0"
            >
              <Plus size={18} />
              Submit Resource
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-red-400/50 hover:bg-red-500/10 text-[#cbd5e1] hover:text-red-300 px-4 py-2.5 rounded-full font-medium transition-all text-sm shrink-0 cursor-pointer"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </div>
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
