import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowRight, Leaf } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#698765] pt-20">
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        
        <div className="w-full max-w-md bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-[#84cc16] opacity-10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-[#698765] border border-white/20 rounded-xl flex items-center justify-center mb-8 mx-auto">
              <Leaf className="w-6 h-6 text-[#84cc16]" />
            </div>
            
            <h1 className="text-3xl font-bold text-center text-[#f5f0e6] mb-2 tracking-tight">Welcome back</h1>
            <p className="text-center text-[#f5f0e6]/50 mb-8 text-sm">
              Sign in to manage your submissions and access the contributor dashboard.
            </p>

            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#f5f0e6]/80">Email address</label>
                <Input 
                  type="email" 
                  placeholder="name@example.com"
                  className="bg-[#698765] border-white/20 text-[#f5f0e6] h-12 focus:border-[#84cc16]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-[#f5f0e6]/80">Password</label>
                  <a href="#" className="text-xs text-[#84cc16] hover:underline">Forgot password?</a>
                </div>
                <Input 
                  type="password" 
                  placeholder="••••••••"
                  className="bg-[#698765] border-white/20 text-[#f5f0e6] h-12 focus:border-[#84cc16]"
                />
              </div>

              <Button className="w-full h-12 bg-[#84cc16] text-[#698765] hover:bg-[#65a30d] font-bold text-sm rounded-xl mt-4">
                Sign in <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#f5f0e6]/50">
                Don't have an account?{" "}
                <Link href="#" className="text-[#84cc16] hover:underline font-medium">
                  Request access
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-[#f5f0e6]/40 hover:text-[#f5f0e6] transition-colors">
            &larr; Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}
