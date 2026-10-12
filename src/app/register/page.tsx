"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Leaf } from "lucide-react"

import { db } from "@/lib/firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [institution, setInstitution] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const cleanEmail = email.trim().toLowerCase()
      await setDoc(doc(db, "users", cleanEmail), {
        name: fullName.trim(),
        email: cleanEmail,
        institution: institution.trim() || "Forestry Research Department",
        role: "Contributor",
        status: "Active",
        lastActive: "Just now",
        createdAt: serverTimestamp()
      }, { merge: true })

      sessionStorage.setItem("user_logged_in", "true")
      sessionStorage.setItem("user_auth", "true")
      sessionStorage.setItem("user_name", fullName.trim())
      sessionStorage.setItem("user_email", cleanEmail)
      sessionStorage.setItem("user_institution", institution.trim() || "Forestry Research Department")
      router.push("/dashboard")
    } catch (err) {
      console.error("Error creating user:", err)
      // Fallback to session
      sessionStorage.setItem("user_logged_in", "true")
      sessionStorage.setItem("user_auth", "true")
      sessionStorage.setItem("user_name", fullName)
      sessionStorage.setItem("user_email", email.trim().toLowerCase())
      sessionStorage.setItem("user_institution", institution)
      router.push("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-[#163022]">
      <div className="flex-1 flex items-center justify-center p-6">
        
        <div className="w-full max-w-md bg-[#1c3d2b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-[#84cc16]">
            <Leaf size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="text-[10px] uppercase tracking-widest text-[#84cc16] font-bold mb-2">Researcher Portal</div>
            <h1 className="text-3xl font-medium tracking-tight text-[#f5f0e6] mb-2">Create Account</h1>
            <p className="text-[#f5f0e6]/70 mb-8 text-sm">Join the DFIH network to submit your research and access advanced curator features.</p>
            
            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#f5f0e6]">Full Name</label>
                <Input 
                  type="text" 
                  placeholder="Dr. Jane Doe" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                  className="bg-[#163022] border-white/10 h-12 focus:border-[#84cc16]/50 text-[#f5f0e6] placeholder:text-white/40" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#f5f0e6]">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="jane.doe@university.edu" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="bg-[#163022] border-white/10 h-12 focus:border-[#84cc16]/50 text-[#f5f0e6] placeholder:text-white/40" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#f5f0e6]">Organization / Institution</label>
                <Input 
                  type="text" 
                  placeholder="Ministry of Forestry" 
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  required 
                  className="bg-[#163022] border-white/10 h-12 focus:border-[#84cc16]/50 text-[#f5f0e6] placeholder:text-white/40" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#f5f0e6]">Password</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="bg-[#163022] border-white/10 h-12 focus:border-[#84cc16]/50 text-[#f5f0e6] placeholder:text-white/40" 
                />
              </div>
              
              <Button disabled={loading} className="w-full h-12 rounded-xl bg-[#84cc16] hover:bg-[#84cc16]/90 text-[#0f2317] font-bold text-base mt-2 shadow-[0_0_15px_rgba(132,204,22,0.2)] hover:shadow-[0_0_25px_rgba(132,204,22,0.4)] transition-all">
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
            
            <p className="mt-8 text-center text-sm text-[#f5f0e6]/60">
              Already have an account? <Link href="/login" className="text-[#84cc16] hover:underline font-medium">Log in</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
