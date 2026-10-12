"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export default function Home() {
  const [content, setContent] = useState({
    heroTitle: "Digital Forestry Information Hub",
    heroSubtitle: "At DFIH, We Build Strong Frameworks, Smart Strategies, And Confident Decisions At Every Level.",
    heroButtonText: "Explore Data"
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "page_content", "home")
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setContent(prev => ({...prev, ...docSnap.data()}))
        }
      } catch (e) {
        console.error("Error fetching home content:", e)
      }
    }
    fetchContent()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-[#163022] text-[#f5f0e6] selection:bg-[#84cc16] selection:text-[#0f2317] overflow-hidden">
      
      {/* 2. HERO SECTION */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-center pt-28 pb-20">
        {/* Dark Forest Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0d1e14]">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          >
            <source src="/forest-vid.mp4" type="video/mp4" />
          </video>
          {/* Multi-layered dark forest gradient fade for maximum text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1e14]/90 via-[#163022]/65 to-[#0d1e14]/40" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#163022] via-[#163022]/80 to-transparent" />
        </div>

        {/* Hero Content - Logo on Left & 3D Shadow Text */}
        <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Column: Transparent Logo & Institutional Badge */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-start w-full">
              {/* Logo on the Left Side without background */}
              <div className="flex items-center gap-4 mb-6 group">
                <div className="p-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl transition-transform group-hover:scale-105">
                  <Image 
                    src="/logo.png" 
                    alt="DFIH Logo Emblem" 
                    width={180} 
                    height={180} 
                    className="object-contain w-[95px] h-[95px] sm:w-[115px] sm:h-[115px]"
                    priority
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#84cc16] bg-[#84cc16]/15 border border-[#84cc16]/30 px-3 py-1 rounded-full inline-block mb-1">
                    Global Repository
                  </span>
                  <div className="text-xs text-[#cbd5e1] font-medium leading-tight">
                    Digital Forestry Information Hub
                  </div>
                </div>
              </div>

              {/* Small Intro Card (Glassmorphic) */}
              <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-xl bg-[#1c3d2b]/70 border border-white/15 shadow-2xl w-full max-w-md lg:max-w-none">
                <p className="text-xs sm:text-sm leading-relaxed text-[#f5f0e6]">
                  Helping researchers, analysts, and policymakers access critical ecological datasets, silviculture models, and verified policy frameworks.
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#cbd5e1]/80">
                  <span>142 Nations Connected</span>
                  <span className="text-[#84cc16] font-bold">10M+ Records</span>
                </div>
              </div>
            </div>

            {/* Right/Center Column: Hero Title with 3D / Shadow Effect */}
            <div className="lg:col-span-8 xl:col-span-8 flex flex-col items-start w-full">
              <h1 
                className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-[92px] font-black tracking-tight leading-[1.05] text-[#ffffff] mb-6"
                style={{
                  textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 6px 14px rgba(0,0,0,0.8), 0 16px 32px rgba(0,0,0,0.7), 0 0 40px rgba(132,204,22,0.2)"
                }}
              >
                {content.heroTitle}
              </h1>

              <p 
                className="text-base sm:text-xl md:text-2xl font-medium text-[#f5f0e6] max-w-4xl leading-relaxed mb-8"
                style={{
                  textShadow: "0 2px 6px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.7)"
                }}
              >
                {content.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-extrabold px-8 py-6 text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(132,204,22,0.4)] hover:shadow-[0_0_35px_rgba(132,204,22,0.6)] transition-all"
                  asChild
                >
                  <Link href="/resources">
                    {content.heroButtonText || "Explore Repository"}
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full border-white/25 bg-white/10 hover:bg-white/20 text-[#ffffff] font-bold px-8 py-6 text-sm uppercase tracking-wider backdrop-blur-md shadow-lg"
                  asChild
                >
                  <Link href="/submit">
                    Submit Resource
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. RECENT ACTIVITY SECTION (Moved from About Us to Home page!) */}
      <section className="relative z-20 py-16 bg-[#12281b] border-t border-b border-white/10">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#84cc16] bg-[#84cc16]/15 border border-[#84cc16]/30 px-3 py-1 rounded-full">
                Live Community Updates
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f5f0e6] mt-3">
                Recent Platform Activity
              </h2>
              <p className="text-[#cbd5e1] text-sm mt-1">
                Latest independent research submissions, verified datasets, and policy documents added by global contributors.
              </p>
            </div>
            <Link 
              href="/resources" 
              className="text-xs uppercase font-bold tracking-wider text-[#84cc16] hover:text-[#a3e635] flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              View Repository Feed &rarr;
            </Link>
          </div>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {[
              {
                user: "Akeem Jamiu",
                role: "Forest Analyst",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                action: "New Dataset",
                title: "National Forest Volume Index",
                category: "Sustainable Forestry",
                time: "15 min ago",
                badgeColor: "bg-[#84cc16] text-[#0f2317]"
              },
              {
                user: "Dr. Rachel Thorne",
                role: "Biometrician",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
                action: "Verified Manuscript",
                title: "Amazon Carbon Density Model",
                category: "Climate Mitigation",
                time: "1 hour ago",
                badgeColor: "bg-blue-400 text-[#0f2317]"
              },
              {
                user: "Sarah Jenkins",
                role: "Policy Director",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                action: "Policy Brief",
                title: "Sub-Saharan Silviculture Guidelines",
                category: "Governance",
                time: "3 hours ago",
                badgeColor: "bg-emerald-400 text-[#0f2317]"
              },
              {
                user: "Michael Chen",
                role: "Ecologist",
                avatar: "https://randomuser.me/api/portraits/men/67.jpg",
                action: "Inventory Report",
                title: "Boreal Wildlife Habitat Census",
                category: "Biodiversity",
                time: "Yesterday",
                badgeColor: "bg-yellow-400 text-[#0f2317]"
              }
            ].map((activity, idx) => (
              <div 
                key={idx}
                className="bg-[#1c3d2b]/70 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col justify-between hover:border-[#84cc16]/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${activity.badgeColor}`}>
                      {activity.action}
                    </span>
                    <span className="text-[11px] text-[#cbd5e1]/60 font-medium">{activity.time}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#f5f0e6] group-hover:text-[#84cc16] transition-colors leading-snug mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-[#cbd5e1]/70 mb-6">
                    {activity.category}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <div 
                    className="w-9 h-9 rounded-full bg-cover bg-center ring-2 ring-white/15" 
                    style={{ backgroundImage: `url('${activity.avatar}')` }}
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#f5f0e6]">{activity.user}</div>
                    <div className="text-[10px] text-[#cbd5e1]/60">{activity.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SUB-HERO TEXT (Frameworks & Strategic Priorities) */}
      <section className="relative z-20 w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 py-24 max-w-[1920px] mx-auto">
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-bold tracking-tight text-[#f5f0e6] mb-14 max-w-6xl">
            Building Strong Frameworks, Smart Strategies, And Confident Forestry Decisions At Every Level.
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-5 text-base sm:text-lg leading-relaxed text-[#cbd5e1]">
              We focus on building strong fundamentals, transparent open science, and resilient policies for researchers, governments, and NGOs working on the frontlines of global conservation.
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-56 sm:h-64">
              <div className="bg-[#1c3d2b]/80 rounded-3xl p-8 flex flex-col justify-between border border-white/10 shadow-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#84cc16]">Data Fidelity</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#f5f0e6]">100% Peer-Reviewed</div>
                <div>
                  <div className="flex justify-between text-xs text-[#cbd5e1]/70 mb-2">
                    <span>Verification Index</span>
                    <span className="text-[#84cc16] font-bold">Grade A</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#84cc16]" />
                  </div>
                </div>
              </div>
              <div className="bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800')] bg-cover bg-center rounded-3xl border border-white/10 shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENTO GRID (Resources For Every Research Need) */}
      <section className="py-24 bg-[#12281b] border-t border-white/10 rounded-t-[3rem]">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#84cc16]">Curated Disciplines</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#f5f0e6] mt-2">
              Resources For Every Research Need.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Top Left: Text Card */}
            <div className="bg-[#1c3d2b]/80 rounded-3xl p-8 md:p-14 flex flex-col items-center justify-center text-center border border-white/10 min-h-[340px] md:h-[420px] xl:h-[460px] shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f0e6] mb-4">Policy & Governance</h3>
              <p className="text-sm sm:text-base text-[#cbd5e1] mb-8 max-w-md leading-relaxed">
                Guidelines, legal blueprints, and legislative frameworks for sustainable institutional and community forestry.
              </p>
              <Link href="/resources?theme=Policy%20and%20Governance" className="text-xs uppercase font-extrabold tracking-widest text-[#84cc16] hover:text-[#a3e635] flex items-center">
                Explore Resources <span className="ml-2">&rarr;</span>
              </Link>
            </div>
            
            {/* Top Right: Image */}
            <div className="bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200')] bg-cover bg-center rounded-3xl min-h-[340px] md:h-[420px] xl:h-[460px] border border-white/10 shadow-xl" />
            
            {/* Bottom Left: Image */}
            <div className="hidden md:block bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200')] bg-cover bg-center rounded-3xl min-h-[340px] md:h-[420px] xl:h-[460px] border border-white/10 shadow-xl" />
            
            {/* Bottom Right: Text Card */}
            <div className="bg-[#1c3d2b]/80 rounded-3xl p-8 md:p-14 flex flex-col items-center justify-center text-center border border-white/10 min-h-[340px] md:h-[420px] xl:h-[460px] shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f0e6] mb-4">Climate Adaptation</h3>
              <p className="text-sm sm:text-base text-[#cbd5e1] mb-8 max-w-md leading-relaxed">
                Remote sensing models and field methodologies for ecological resilience in shifting climates.
              </p>
              <Link href="/resources?theme=Climate%20Change%20Adaptation%20%26%20Mitigation" className="text-xs uppercase font-extrabold tracking-widest text-[#84cc16] hover:text-[#a3e635] flex items-center">
                Explore Resources <span className="ml-2">&rarr;</span>
              </Link>
            </div>
            
            <div className="md:hidden bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200')] bg-cover bg-center rounded-3xl min-h-[300px] h-[350px] border border-white/10" />
          </div>
        </div>
      </section>

      {/* 6. MOMENTS FROM THE FIELD */}
      <section className="py-28 overflow-hidden bg-[#163022]">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#84cc16]">Field Expeditions</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#f5f0e6] mt-2 mb-4">
            Moments From The Field
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] max-w-xl mx-auto">
            A glimpse into worldwide research expeditions, on-the-ground biomass measurements, and the teams advancing DFIH.
          </p>
        </div>
        
        <div className="w-full overflow-x-auto pb-14 pt-8 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 no-scrollbar flex justify-center">
          <div className="flex justify-start md:justify-center items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-12 w-max min-w-full">
            <div className="w-56 h-80 sm:w-64 sm:h-96 lg:w-72 lg:h-[440px] xl:w-80 xl:h-[480px] shrink-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800')] bg-cover bg-center rounded-3xl -rotate-6 shadow-2xl border border-white/15 transition-transform hover:scale-105" />
            <div className="w-56 h-80 sm:w-64 sm:h-96 lg:w-72 lg:h-[440px] xl:w-80 xl:h-[480px] shrink-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800')] bg-cover bg-center rounded-3xl rotate-3 shadow-2xl border border-white/15 -mt-6 md:-mt-10 transition-transform hover:scale-105" />
            <div className="w-56 h-80 sm:w-64 sm:h-96 lg:w-72 lg:h-[440px] xl:w-80 xl:h-[480px] shrink-0 bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800')] bg-cover bg-center rounded-3xl -rotate-2 shadow-2xl border border-white/15 mt-6 md:mt-10 transition-transform hover:scale-105" />
            <div className="w-56 h-80 sm:w-64 sm:h-96 lg:w-72 lg:h-[440px] xl:w-80 xl:h-[480px] shrink-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800')] bg-cover bg-center rounded-3xl rotate-6 shadow-2xl border border-white/15 transition-transform hover:scale-105" />
          </div>
        </div>
        
        <div className="mt-10 flex justify-center">
          <Button 
            className="rounded-full bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-8 py-6 font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-[#84cc16]/20"
            asChild
          >
            <Link href="/resources">View Repository</Link>
          </Button>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 border-t border-white/10 bg-[#12281b]">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#84cc16]">Global Trust</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#f5f0e6] mt-2">
              Trusted By Researchers & Institutions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-10 w-full">
            <div className="bg-[#1c3d2b]/60 border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-md shadow-lg">
              <p className="text-sm sm:text-base leading-relaxed text-[#cbd5e1] mb-8">
                "Structured datasets that actually accelerate publications. Every model is verified and rigorous. DFIH stands out among global repositories."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[url('https://randomuser.me/api/portraits/men/32.jpg')] bg-cover ring-2 ring-[#84cc16]" />
                <div>
                  <div className="text-sm font-bold text-[#f5f0e6]">David Laid</div>
                  <div className="text-[10px] text-[#cbd5e1]/60 uppercase tracking-wider font-semibold">Lead Researcher</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1c3d2b]/60 border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-md shadow-lg">
              <p className="text-sm sm:text-base leading-relaxed text-[#cbd5e1] mb-8">
                "Highly recommended for conservation analysts. Clean indexing, comprehensive categories, and an active international community."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[url('https://randomuser.me/api/portraits/women/44.jpg')] bg-cover ring-2 ring-[#84cc16]" />
                <div>
                  <div className="text-sm font-bold text-[#f5f0e6]">Sarah Jenkins</div>
                  <div className="text-[10px] text-[#cbd5e1]/60 uppercase tracking-wider font-semibold">Policy Director</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1c3d2b]/60 border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-md shadow-lg">
              <p className="text-sm sm:text-base leading-relaxed text-[#cbd5e1] mb-8">
                "The finest platform for academic and field forestry resources. Reliable metadata, easy document downloads, and responsive curators."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[url('https://randomuser.me/api/portraits/men/67.jpg')] bg-cover ring-2 ring-[#84cc16]" />
                <div>
                  <div className="text-sm font-bold text-[#f5f0e6]">Michael Chen</div>
                  <div className="text-[10px] text-[#cbd5e1]/60 uppercase tracking-wider font-semibold">Conservationist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RESEARCH INSIGHTS */}
      <section className="py-24 bg-[#163022] border-t border-white/10">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start w-full">
            <div className="lg:w-1/3 xl:w-1/3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#84cc16]">Analysis & Science</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#f5f0e6] mt-2 mb-4 leading-tight">
                Forestry Insights & Articles
              </h2>
              <p className="text-sm sm:text-base text-[#cbd5e1] mb-8 leading-relaxed">
                Expert articles, field methods, and strategies from accredited forestry scientists to help you navigate open datasets.
              </p>
              <Button 
                className="rounded-full bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-8 py-6 font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-[#84cc16]/20" 
                asChild
              >
                <Link href="/news">View News & Insights</Link>
              </Button>
            </div>
            
            <div className="lg:w-2/3 xl:w-2/3 flex flex-col gap-6 w-full">
              <Link href="/resources/1" className="group flex flex-col sm:flex-row gap-6 items-center bg-[#1c3d2b]/60 p-5 rounded-3xl border border-white/10 hover:border-[#84cc16]/40 transition-all shadow-lg">
                <div className="w-full sm:w-64 h-40 bg-[url('https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=800')] bg-cover bg-center rounded-2xl overflow-hidden shrink-0" />
                <div className="flex-1">
                  <div className="text-[10px] text-[#84cc16] font-bold uppercase tracking-widest mb-1.5">Peer Reviewed &bull; Nov 2026</div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#f5f0e6] group-hover:text-[#84cc16] transition-colors leading-snug">
                    Understanding Carbon Sequestration In Old Growth Canopy
                  </h3>
                  <p className="text-xs sm:text-sm text-[#cbd5e1]/80 mt-2 line-clamp-2 leading-relaxed">
                    A multi-year assessment of biomass retention and carbon flux in primary rainforest corridors.
                  </p>
                </div>
              </Link>

              <Link href="/resources/2" className="group flex flex-col sm:flex-row gap-6 items-center bg-[#1c3d2b]/60 p-5 rounded-3xl border border-white/10 hover:border-[#84cc16]/40 transition-all shadow-lg">
                <div className="w-full sm:w-64 h-40 bg-[url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800')] bg-cover bg-center rounded-2xl overflow-hidden shrink-0" />
                <div className="flex-1">
                  <div className="text-[10px] text-[#84cc16] font-bold uppercase tracking-widest mb-1.5">Policy Framework &bull; Oct 2026</div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#f5f0e6] group-hover:text-[#84cc16] transition-colors leading-snug">
                    Building Resilient Forestry Policy Frameworks
                  </h3>
                  <p className="text-xs sm:text-sm text-[#cbd5e1]/80 mt-2 line-clamp-2 leading-relaxed">
                    Synthesizing cross-border treaties into practical local conservation ordinances and enforcement guidelines.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
