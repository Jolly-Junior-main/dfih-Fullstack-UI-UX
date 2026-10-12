"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, MoreVertical, Plus, ArrowRight, Activity, Users, Globe } from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export default function AboutPage() {
  const [content, setContent] = useState({
    title: "About Us",
    content: "Building the definitive global repository for forestry research.",
    missionTitle: "Our Mission & Impact",
    missionContent: "The Digital Forestry Information Hub (DFIH) was established to bridge the gap between academic research and actionable policymaking. By centralizing millions of datasets, peer-reviewed articles, and on-the-ground management manuals, we empower researchers and governments to make data-driven decisions that protect our world's lungs."
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "page_content", "about")
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setContent(prev => ({...prev, ...docSnap.data()}))
        }
      } catch (e) {
        console.error("Error fetching about content:", e)
      }
    }
    fetchContent()
  }, [])

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12 bg-[#163022] text-[#f5f0e6] relative selection:bg-[#84cc16] selection:text-[#0f2317]">
      
      {/* Background - Forest ambient lighting */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000')] bg-cover bg-center opacity-15" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#84cc16]/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#84cc16]/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[#163022]/80 backdrop-blur-sm" />
      </div>

      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto relative z-10 flex-1 flex flex-col">
        
        {/* Main Glassmorphism Dashboard Container */}
        <div className="flex-1 bg-[#1c3d2b]/60 backdrop-blur-[30px] border border-white/10 rounded-[2.5rem] shadow-2xl p-6 md:p-10 flex flex-col xl:flex-row gap-8">
          
          {/* Left Column (Main Content) */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* Header Section */}
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#f5f0e6] mb-2">{content.title}</h1>
                <p className="text-[#cbd5e1] text-sm max-w-xl">{content.content}</p>
              </div>
            </div>

            {/* Top Stats Row (3 pill buttons) */}
            <div className="bg-[#12281b]/70 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/10 shadow-lg">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-[#84cc16]" />
                </div>
                <div>
                  <div className="text-[#cbd5e1]/70 text-xs mb-1">Global Partners</div>
                  <div className="text-[#f5f0e6] font-bold text-xl">142 Nations</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/10" />
              <div className="flex items-center gap-4 w-full md:w-auto border-t border-white/10 md:border-0 pt-4 md:pt-0">
                <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-[#84cc16]" />
                </div>
                <div>
                  <div className="text-[#cbd5e1]/70 text-xs mb-1">Total Datasets</div>
                  <div className="text-[#f5f0e6] font-bold text-xl">10.5 Million</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/10" />
              <div className="flex items-center gap-4 w-full md:w-auto border-t border-white/10 md:border-0 pt-4 md:pt-0">
                <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#84cc16]" />
                </div>
                <div>
                  <div className="text-[#cbd5e1]/70 text-xs mb-1">Active Researchers</div>
                  <div className="text-[#f5f0e6] font-bold text-xl">28,450</div>
                </div>
              </div>
            </div>

            {/* Main Mission / Statistic Chart Area */}
            <div className="bg-[#12281b]/70 border border-white/10 rounded-3xl p-6 md:p-8 flex-1 flex flex-col relative overflow-hidden shadow-lg">
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-[#f5f0e6] font-bold text-xl">{content.missionTitle}</h2>
                <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-[#84cc16] text-xs font-semibold flex items-center gap-2">
                  2020 - Present
                </div>
              </div>
              
              <p className="text-[#cbd5e1] text-sm md:text-base leading-relaxed mb-12 max-w-2xl relative z-10 whitespace-pre-wrap">
                {content.missionContent}
              </p>

              {/* Chart Graphic matching aesthetic */}
              <div className="relative flex-1 min-h-[150px] w-full mt-auto flex items-end justify-between px-4 z-10">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,80 Q25,100 50,50 T100,20" fill="none" stroke="#84cc16" strokeWidth="2.5" />
                  <path d="M0,50 Q25,20 50,70 T100,50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="3.5" fill="#84cc16" stroke="#ffffff" strokeWidth="2" />
                </svg>
                <div className="text-[#cbd5e1]/60 text-xs z-10">2021</div>
                <div className="text-[#cbd5e1]/60 text-xs z-10">2022</div>
                <div className="text-[#cbd5e1]/60 text-xs z-10">2023</div>
                <div className="text-[#cbd5e1]/60 text-xs z-10">2024</div>
                <div className="text-[#cbd5e1]/60 text-xs z-10">2025</div>
                <div className="text-[#cbd5e1]/60 text-xs z-10">2026</div>
              </div>
            </div>

            {/* Bottom Row: Strategic Goals & Target Submissions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strategic Goals */}
              <div className="bg-[#12281b]/70 border border-white/10 rounded-3xl p-6 shadow-lg">
                <h3 className="text-[#f5f0e6] font-bold text-lg mb-6">Strategic Goals</h3>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="text-2xl font-extrabold text-[#f5f0e6] mb-2">80%</div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full mb-3 overflow-hidden">
                      <div className="w-[80%] h-full bg-[#84cc16] rounded-full" />
                    </div>
                    <div className="text-[10px] text-[#cbd5e1] uppercase font-semibold">Open Access Data</div>
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="text-2xl font-extrabold text-[#f5f0e6] mb-2">95%</div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full mb-3 overflow-hidden">
                      <div className="w-[95%] h-full bg-[#84cc16] rounded-full" />
                    </div>
                    <div className="text-[10px] text-[#cbd5e1] uppercase font-semibold">Policy Integration</div>
                  </div>
                </div>
              </div>
              
              {/* Target Submissions */}
              <div className="bg-[#12281b]/70 border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[#cbd5e1] text-sm font-medium">Target Submissions</div>
                  <div className="px-3 py-1 bg-[#84cc16]/15 rounded-full border border-[#84cc16]/30 text-[#84cc16] text-xs font-bold">1,000,000</div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-4 mt-4">
                  <div>
                    <div className="text-[#cbd5e1]/70 text-xs mb-1">Current Submissions</div>
                    <div className="text-2xl font-extrabold text-[#f5f0e6]">700,345</div>
                    <div className="w-full sm:w-32 h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <div className="w-[70%] h-full bg-[#84cc16] rounded-full" />
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-[#84cc16] border-r-[#84cc16] flex items-center justify-center text-[#f5f0e6] font-bold text-sm rotate-45 shrink-0 self-start sm:self-auto shadow-md">
                    <span className="-rotate-45 font-extrabold">70%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Institutional Alliance & Global Network (Personal picture removed) */}
          <div className="w-full xl:w-[350px] flex flex-col gap-6">
            
            {/* DFIH Alliance Institutional Card */}
            <div className="bg-[#12281b]/70 border border-white/10 rounded-3xl p-6 relative shadow-xl flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest font-bold text-[#84cc16]">Global Network</span>
                <span className="text-xs text-[#cbd5e1]/60">Verified Hub</span>
              </div>

              {/* Vibrant Gradient Institutional Card */}
              <div className="bg-gradient-to-br from-[#1b3d2b] to-[#142e20] border border-[#84cc16]/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#84cc16]/20 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div>
                    <div className="text-[#cbd5e1]/80 text-[10px] uppercase tracking-widest">Global Coalition</div>
                    <div className="text-white font-extrabold text-xl tracking-tight">DFIH ALLIANCE</div>
                  </div>
                  <div className="text-[#84cc16] font-bold text-sm bg-[#84cc16]/10 px-2.5 py-1 rounded-full border border-[#84cc16]/30">Core</div>
                </div>
                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <div className="text-[#cbd5e1]/70 text-[10px] uppercase mb-1">Established</div>
                    <div className="text-white font-medium text-sm">2020 &bull; Open Access</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#cbd5e1]/70 text-[10px] uppercase mb-1">Total Members</div>
                    <div className="text-[#84cc16] font-bold text-2xl">74,330</div>
                  </div>
                </div>
              </div>

              {/* Institutional Overview Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Globe className="w-4 h-4 text-[#84cc16] shrink-0" />
                  <div className="text-xs text-[#cbd5e1]">
                    <span className="font-semibold text-[#f5f0e6]">International Scope:</span> Data synthesized from 140+ countries.
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Activity className="w-4 h-4 text-[#84cc16] shrink-0" />
                  <div className="text-xs text-[#cbd5e1]">
                    <span className="font-semibold text-[#f5f0e6]">Peer Reviewed:</span> Verified by accredited forestry institutes.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center group cursor-pointer">
                <Link href="/partners" className="text-xs uppercase tracking-wider font-bold text-[#84cc16] hover:text-[#a3e635] flex items-center gap-2">
                  View Partner Directory <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  )
}
