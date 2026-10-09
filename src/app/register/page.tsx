import { Metadata } from "next"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Leaf } from "lucide-react"

export const metadata: Metadata = {
  title: "Register | DFIH",
  description: "Create an account on the Digital Forestry Information Hub.",
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <div className="flex-1 flex items-center justify-center p-6">
        
        <div className="w-full max-w-md bg-[#84cc16]/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Leaf size={120} />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-medium tracking-tight text-[#0f172a] mb-2">Create Account</h1>
            <p className="text-[#0f172a]/70 mb-8">Join the DFIH network to submit resources and access advanced features.</p>
            
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0f172a]">Full Name</label>
                <Input type="text" placeholder="Dr. Jane Doe" className="bg-[#f8fafc]/30 border-white/20 h-12 focus:border-[#84cc16]/50 text-[#0f172a]" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0f172a]">Email Address</label>
                <Input type="email" placeholder="jane.doe@university.edu" className="bg-[#f8fafc]/30 border-white/20 h-12 focus:border-[#84cc16]/50 text-[#0f172a]" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0f172a]">Organization / Institution</label>
                <Input type="text" placeholder="Ministry of Forestry" className="bg-[#f8fafc]/30 border-white/20 h-12 focus:border-[#84cc16]/50 text-[#0f172a]" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0f172a]">Password</label>
                <Input type="password" placeholder="••••••••" className="bg-[#f8fafc]/30 border-white/20 h-12 focus:border-[#84cc16]/50 text-[#0f172a]" />
              </div>
              
              <Button className="w-full h-12 rounded-xl bg-[#84cc16] hover:bg-[#84cc16]/90 text-[#ffffff] font-medium text-base mt-2 shadow-[0_0_15px_rgba(132,204,22,0.2)] hover:shadow-[0_0_25px_rgba(132,204,22,0.4)] transition-all">
                Create Account
              </Button>
            </form>
            
            <p className="mt-8 text-center text-sm text-[#0f172a]/60">
              Already have an account? <Link href="/login" className="text-[#84cc16] hover:underline font-medium">Log in</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
