"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowRight, Leaf } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      sessionStorage.setItem("user_logged_in", "true")
      sessionStorage.setItem("user_auth", "true")
      sessionStorage.setItem("user_email", email)
      const existingName = sessionStorage.getItem("user_name")
      if (!existingName) {
        const raw = email.split("@")[0].replace(/[._-]/g, " ")
        const formatted = raw
          .split(" ")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
        sessionStorage.setItem("user_name", formatted || "Researcher Contributor")
      }
      router.push("/dashboard")
    }, 800)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#163022] text-[#f5f0e6] pt-20">
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        
        <div className="w-full max-w-md bg-[#1c3d2b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-[#84cc16] opacity-15 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-[#0f2317] border border-white/10 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-inner">
              <Leaf className="w-6 h-6 text-[#84cc16]" />
            </div>
            
            <h1 className="text-3xl font-extrabold text-center text-[#f5f0e6] mb-2 tracking-tight">Welcome back</h1>
            <p className="text-center text-[#cbd5e1]/70 mb-8 text-sm">
              Sign in to manage your submissions and access the contributor dashboard.
            </p>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#cbd5e1]">Email address</label>
                <Input 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#12281b] border-white/10 text-[#f5f0e6] placeholder:text-[#cbd5e1]/40 h-12 focus:border-[#84cc16]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-[#cbd5e1]">Password</label>
                  <a href="#" className="text-xs text-[#84cc16] hover:underline">Forgot password?</a>
                </div>
                <Input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#12281b] border-white/10 text-[#f5f0e6] placeholder:text-[#cbd5e1]/40 h-12 focus:border-[#84cc16]"
                />
              </div>

              <Button disabled={loading} className="w-full h-12 bg-[#84cc16] text-[#0f2317] hover:bg-[#a3e635] font-bold text-sm rounded-xl mt-4 shadow-lg shadow-[#84cc16]/20">
                {loading ? "Signing in..." : <><span className="text-[#0f2317]">Sign in</span> <ArrowRight className="w-4 h-4 ml-2 text-[#0f2317]" /></>}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#cbd5e1]/70">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#84cc16] hover:underline font-bold">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center space-y-3">
          <Link href="/" className="block text-sm text-[#cbd5e1]/70 hover:text-[#84cc16] transition-colors">
            &larr; Back to Home
          </Link>
          <Link href="/admin/login" className="block text-xs text-[#84cc16]/70 hover:text-[#84cc16] transition-colors underline underline-offset-4">
            Administrator Access &rarr;
          </Link>
        </div>

      </div>
    </div>
  )
}
