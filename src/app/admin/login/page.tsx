"use client"

import { useState } from "react"
import { Shield, KeyRound, Mail, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate auth delay before redirecting to dashboard
    setTimeout(() => {
      window.location.href = "/admin"
    }, 1500)
  }

  return (
    <main className="min-h-screen pt-20 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decorators for Admin */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#84cc16]/20 rounded-full blur-3xl -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#577353]/30 rounded-full blur-3xl -z-10 mix-blend-screen" />

      <div className="w-full max-w-md">
        
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 shadow-xl mb-4">
            <Shield size={36} className="text-[#84cc16]" />
          </div>
          <h1 className="text-3xl font-bold text-[#f5f0e6] tracking-tight">Admin Portal</h1>
          <p className="text-[#f5f0e6]/60 mt-2">Restricted access area. Please authenticate.</p>
        </div>

        {/* Login Form Container */}
        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-[#f5f0e6]/80 mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f5f0e6]/50" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="admin@forestryinfohub.org"
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[#f5f0e6] placeholder:text-[#f5f0e6]/30 focus:outline-none focus:border-[#84cc16]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-[#f5f0e6]/80">Security Key / Password</label>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f5f0e6]/50" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[#f5f0e6] placeholder:text-[#f5f0e6]/30 focus:outline-none focus:border-[#84cc16]/50 transition-colors"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#84cc16] hover:bg-[#a3e635] text-[#2d3a2a] py-3.5 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Authenticating...
                </>
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
          
        </div>
        
        {/* Footer Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-[#f5f0e6]/50 hover:text-[#f5f0e6] text-sm transition-colors flex items-center justify-center gap-2">
            <ArrowRight size={14} className="rotate-180" />
            Return to Public Site
          </Link>
        </div>

      </div>
    </main>
  )
}
