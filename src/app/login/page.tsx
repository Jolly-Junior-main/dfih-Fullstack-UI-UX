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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate auth for contributor portal
    setTimeout(() => {
      sessionStorage.setItem("user_auth", "true")
      router.push("/submit")
    }, 800)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] pt-20">
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        
        <div className="w-full max-w-md bg-[#84cc16]/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-[#84cc16] opacity-10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-[#ffffff] border border-white/20 rounded-xl flex items-center justify-center mb-8 mx-auto">
              <Leaf className="w-6 h-6 text-[#84cc16]" />
            </div>
            
            <h1 className="text-3xl font-bold text-center text-[#0f172a] mb-2 tracking-tight">Welcome back</h1>
            <p className="text-center text-[#0f172a]/50 mb-8 text-sm">
              Sign in to manage your submissions and access the contributor dashboard.
            </p>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0f172a]/80">Email address</label>
                <Input 
                  type="email" 
                  placeholder="name@example.com"
                  required
                  className="bg-[#ffffff] border-white/20 text-[#0f172a] h-12 focus:border-[#84cc16]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-[#0f172a]/80">Password</label>
                  <a href="#" className="text-xs text-[#84cc16] hover:underline">Forgot password?</a>
                </div>
                <Input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  className="bg-[#ffffff] border-white/20 text-[#0f172a] h-12 focus:border-[#84cc16]"
                />
              </div>

              <Button disabled={loading} className="w-full h-12 bg-[#84cc16] text-[#0f172a] hover:bg-[#84cc16]/90 font-bold text-sm rounded-xl mt-4">
                {loading ? "Signing in..." : <><span className="text-[#0f172a]">Sign in</span> <ArrowRight className="w-4 h-4 ml-2 text-[#0f172a]" /></>}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#0f172a]/50">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#84cc16] hover:underline font-medium">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center space-y-4">
          <Link href="/" className="block text-sm text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">
            &larr; Back to Home
          </Link>
          <Link href="/admin/login" className="block text-xs text-[#84cc16]/50 hover:text-[#84cc16] transition-colors underline underline-offset-4">
            Administrator Access &rarr;
          </Link>
        </div>

      </div>
    </div>
  )
}
