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
    <div className="flex flex-col min-h-screen pt-24 pb-12 bg-[#ffffff] relative selection:bg-[#84cc16] selection:text-[#18221a]">
      
      {/* Background - Sage green, blurred ambient light */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000')] bg-cover bg-center opacity-20" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#84cc16]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#84cc16]/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[#84cc16]/60 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex-1 flex flex-col">
        
        {/* Main Glassmorphism Dashboard Container */}
        <div className="flex-1 bg-white/[0.05] backdrop-blur-[30px] border border-white/10 rounded-[2.5rem] shadow-2xl p-6 md:p-10 flex flex-col xl:flex-row gap-8">
          
          {/* Left Column (Main Content) */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* Header Section */}
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-2">{content.title}</h1>
                <p className="text-[#0f172a]/70 text-sm max-w-xl">{content.content}</p>
              </div>
            </div>

            {/* Top Stats Row (Like the 3 pill buttons) */}
            <div className="bg-[#84cc16]/10 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/10">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 rounded-full bg-[#84cc16]/10 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-[#0f172a]/90" />
                </div>
                <div>
                  <div className="text-[#0f172a]/60 text-xs mb-1">Global Partners</div>
                  <div className="text-[#0f172a] font-bold text-xl">142 Nations</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-10 bg-[#84cc16]/10" />
              <div className="flex items-center gap-4 w-full md:w-auto border-t border-white/10 md:border-0 pt-4 md:pt-0">
                <div className="w-12 h-12 rounded-full bg-[#84cc16]/10 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-[#0f172a]/90" />
                </div>
                <div>
                  <div className="text-[#0f172a]/60 text-xs mb-1">Total Datasets</div>
                  <div className="text-[#0f172a] font-bold text-xl">10.5 Million</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-10 bg-[#84cc16]/10" />
              <div className="flex items-center gap-4 w-full md:w-auto border-t border-white/10 md:border-0 pt-4 md:pt-0">
                <div className="w-12 h-12 rounded-full bg-[#84cc16]/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#0f172a]/90" />
                </div>
                <div>
                  <div className="text-[#0f172a]/60 text-xs mb-1">Active Researchers</div>
                  <div className="text-[#0f172a] font-bold text-xl">28,450</div>
                </div>
              </div>
            </div>

            {/* Main Mission / "Statistic" Chart Area */}
            <div className="bg-[#84cc16]/10 border border-white/10 rounded-3xl p-6 md:p-8 flex-1 flex flex-col relative overflow-hidden">
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-[#0f172a] font-semibold text-lg">{content.missionTitle}</h2>
                <div className="px-4 py-2 rounded-full border border-white/20 text-[#0f172a]/80 text-xs flex items-center gap-2">
                  2020 - Present
                </div>
              </div>
              
              <p className="text-[#0f172a]/80 text-sm md:text-base leading-relaxed mb-12 max-w-2xl relative z-10 whitespace-pre-wrap">
                {content.missionContent}
              </p>

              {/* Fake Chart Graphic matching the aesthetic */}
              <div className="relative flex-1 min-h-[150px] w-full mt-auto flex items-end justify-between px-4 z-10">
                {/* Curved lime line (SVG approximation) */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,80 Q25,100 50,50 T100,20" fill="none" stroke="#84cc16" strokeWidth="2" />
                  <path d="M0,50 Q25,20 50,70 T100,50" fill="none" stroke="rgba(245,240,230,0.3)" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="3" fill="#ffffff" stroke="#84cc16" strokeWidth="2" />
                </svg>
                {/* X-axis labels */}
                <div className="text-[#0f172a]/50 text-xs z-10">2021</div>
                <div className="text-[#0f172a]/50 text-xs z-10">2022</div>
                <div className="text-[#0f172a]/50 text-xs z-10">2023</div>
                <div className="text-[#0f172a]/50 text-xs z-10">2024</div>
                <div className="text-[#0f172a]/50 text-xs z-10">2025</div>
                <div className="text-[#0f172a]/50 text-xs z-10">2026</div>
              </div>
            </div>

            {/* Bottom Row: Goals & Business */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* My Goals equivalent */}
              <div className="bg-[#84cc16]/10 border border-white/10 rounded-3xl p-6">
                <h3 className="text-[#0f172a] font-medium mb-6">Strategic Goals</h3>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1 bg-[#84cc16]/10 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="text-2xl font-bold text-[#0f172a] mb-2">80%</div>
                    <div className="w-full h-1 bg-[#84cc16]/20 rounded-full mb-3">
                      <div className="w-[80%] h-full bg-[#84cc16] rounded-full" />
                    </div>
                    <div className="text-[10px] text-[#0f172a]/70 uppercase">Open Access Data</div>
                  </div>
                  <div className="flex-1 bg-[#84cc16]/10 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="text-2xl font-bold text-[#0f172a] mb-2">95%</div>
                    <div className="w-full h-1 bg-[#84cc16]/20 rounded-full mb-3">
                      <div className="w-[95%] h-full bg-[#84cc16] rounded-full" />
                    </div>
                    <div className="text-[10px] text-[#0f172a]/70 uppercase">Policy Integration</div>
                  </div>
                </div>
              </div>
              
              {/* Business equivalent */}
              <div className="bg-[#84cc16]/10 border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[#0f172a]/70 text-sm">Target Submissions</div>
                  <div className="px-3 py-1 bg-[#84cc16]/10 rounded-md border border-[#84cc16]/30 text-[#84cc16] text-xs">1,000,000</div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-4 mt-4">
                  <div>
                    <div className="text-[#0f172a]/70 text-xs mb-1">Current Submissions</div>
                    <div className="text-xl font-bold text-[#0f172a]">700,345</div>
                    <div className="w-full sm:w-32 h-1 bg-[#84cc16]/20 rounded-full mt-3">
                      <div className="w-[70%] h-full bg-[#84cc16] rounded-full" />
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-[#84cc16] border-r-[#84cc16] flex items-center justify-center text-[#0f172a] font-bold text-sm rotate-45 shrink-0 self-start sm:self-auto">
                    <span className="-rotate-45">70%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full xl:w-[350px] flex flex-col gap-6">
            
            {/* Top Profile Card */}
            <div className="bg-[#84cc16]/10 border border-white/10 rounded-3xl p-6 relative">
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <Bell className="w-5 h-5 text-[#0f172a]/70" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#ffffff]" />
                </div>
                <MoreVertical className="w-5 h-5 text-[#0f172a]/70" />
              </div>
              
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-[url('https://randomuser.me/api/portraits/women/44.jpg')] bg-cover border-4 border-white/20 mb-3" />
                <div className="px-3 py-1 bg-[#84cc16]/20 rounded-full text-[#0f172a]/90 text-xs mb-3">Lead Curator</div>
                <h3 className="text-[#0f172a] font-medium text-lg">Dr. Elena Rostova</h3>
              </div>
              
              {/* Vibrant Gradient Card (Visa equivalent) */}
              <div className="bg-gradient-to-br from-[#84cc16] to-green-700 rounded-2xl p-5 shadow-[0_10px_30px_rgba(132,204,22,0.3)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#84cc16]/30 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="text-white/90 font-medium tracking-widest text-sm">DFIH ALLIANCE</div>
                  <div className="text-white font-bold italic text-lg opacity-90">Core</div>
                </div>
                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <div className="text-white/80 text-[10px] uppercase mb-1">Established</div>
                    <div className="text-white font-medium text-sm">09/20</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/80 text-[10px] uppercase mb-1">Total Members</div>
                    <div className="text-white font-bold text-xl">74,330</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Month Transaction equivalent */}
            <div className="bg-[#84cc16]/10 border border-white/10 rounded-3xl p-6 flex-1 flex flex-col">
              <h3 className="text-[#0f172a] font-medium mb-6">Recent Activity</h3>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[url('https://randomuser.me/api/portraits/men/32.jpg')] bg-cover" />
                  <div>
                    <div className="text-[#0f172a] font-medium text-sm">Akeem Jamiu</div>
                    <div className="text-[#0f172a]/60 text-[10px]">15.01.2024 13:30PM</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#0f172a]/60 text-[10px] mb-1">New Dataset</div>
                  <div className="px-3 py-1 bg-[#84cc16] rounded-full text-[#18221a] text-xs font-bold">+ Forest Vol.</div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center group cursor-pointer">
                <span className="text-[#0f172a]/80 text-sm group-hover:text-[#0f172a] transition-colors">See all activity</span>
                <div className="w-6 h-6 rounded-full bg-[#0f172a] flex items-center justify-center group-hover:bg-[#84cc16] transition-colors">
                  <ArrowRight className="w-3 h-3 text-[#18221a] group-hover:text-[#18221a]" />
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  )
}
