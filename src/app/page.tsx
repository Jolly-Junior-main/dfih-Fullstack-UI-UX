"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThematicCarousel } from "@/components/resources/ThematicCarousel"
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
            
            {/* Left Column: Institutional Focus & Key Metrics (No duplicate logo) */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-start w-full">
              <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-[#84cc16]/15 border border-[#84cc16]/35 text-[#84cc16] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
                Global Forestry Hub
              </div>

              {/* Small Intro Card (Glassmorphic) */}
              <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-xl bg-[#1c3d2b]/80 border border-white/20 shadow-2xl w-full max-w-md lg:max-w-none">
                <h3 className="text-base font-extrabold text-white mb-2">Open Forestry Repository</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#f5f0e6]">
                  Helping researchers, analysts, and policymakers access critical ecological datasets, silviculture models, and verified policy frameworks.
                </p>
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#cbd5e1]">
                  <span>142 Nations Connected</span>
                  <span className="text-[#84cc16] font-bold">10M+ Records</span>
                </div>
              </div>
            </div>

            {/* Right/Center Column: Hero Title with 3D / Shadow Effect */}
            <div className="lg:col-span-8 xl:col-span-8 flex flex-col items-start w-full">
              <h1 
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[92px] font-black tracking-tight leading-[1.08] sm:leading-[1.05] text-[#ffffff] mb-6 break-words"
                style={{
                  textShadow: "0 3px 6px rgba(0,0,0,0.95), 0 8px 24px rgba(0,0,0,0.95), 0 16px 40px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.8)"
                }}
              >
                {content.heroTitle}
              </h1>

              <p 
                className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium text-[#f5f0e6] max-w-4xl leading-relaxed mb-8"
                style={{
                  textShadow: "0 2px 6px rgba(0,0,0,0.95), 0 6px 18px rgba(0,0,0,0.9), 0 12px 30px rgba(0,0,0,0.85)"
                }}
              >
                {content.heroSubtitle}
              </p>

              {/* Action Buttons: Full width stacked on small mobile, row on tablet/desktop */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="rounded-full bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-extrabold px-6 sm:px-8 py-5 sm:py-6 text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(132,204,22,0.4)] hover:shadow-[0_0_35px_rgba(132,204,22,0.6)] transition-all w-full sm:w-auto text-center justify-center"
                  asChild
                >
                  <Link href="/resources">
                    {content.heroButtonText || "Explore Repository"}
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full border-white/25 bg-white/10 hover:bg-white/20 text-[#ffffff] font-bold px-6 sm:px-8 py-5 sm:py-6 text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md shadow-lg w-full sm:w-auto text-center justify-center"
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

      {/* 3. RECENT ACTIVITY SECTION WITH RESPONSIVE IMAGE GALLERY GRID */}
      <section className="relative z-20 py-16 bg-[#12281b] border-t border-b border-white/10">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#84cc16] bg-[#84cc16]/15 border border-[#84cc16]/30 px-3 py-1 rounded-full">
                Live Community Updates
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3">
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

          {/* Activity Cards: Horizontally scrollable on mobile, grid on desktop */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 xl:gap-8 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory -mx-6 px-6 sm:-mx-10 sm:px-10 md:mx-0 md:px-0">
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
                className="min-w-[280px] sm:min-w-[320px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start bg-[#1c3d2b]/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col justify-between hover:border-[#84cc16]/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${activity.badgeColor}`}>
                      {activity.action}
                    </span>
                    <span className="text-[11px] text-[#cbd5e1]/60 font-medium">{activity.time}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-[#84cc16] transition-colors leading-snug mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-[#cbd5e1]/80 mb-6">
                    {activity.category}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <div 
                    className="w-9 h-9 rounded-full bg-cover bg-center ring-2 ring-white/15" 
                    style={{ backgroundImage: `url('${activity.avatar}')` }}
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">{activity.user}</div>
                    <div className="text-[10px] text-[#cbd5e1]/70">{activity.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Integrated Responsive Image Gallery Grid */}
          <div className="mt-14 pt-10 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#84cc16] bg-[#84cc16]/10 border border-[#84cc16]/30 px-3 py-1 rounded-full">
                  Field Dispatches & Remote Sensing
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                  Live Research & Canopy Telemetry
                </h3>
              </div>
              <p className="text-xs text-[#cbd5e1]/80 max-w-md">
                Photographic records from ongoing drone LiDAR flights, mangrove restoration zones, and high-latitude boreal core sampling.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {[
                {
                  title: "Canopy LiDAR Telemetry",
                  field: "Remote Sensing",
                  location: "Congo & Amazon Basin",
                  image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800",
                  badge: "LiDAR Flight"
                },
                {
                  title: "Mangrove Tidal Buffer",
                  field: "Blue Carbon",
                  location: "Sundarbans Estuary",
                  image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
                  badge: "Wetland Restoration"
                },
                {
                  title: "Permafrost Peat Coring",
                  field: "Soil Flux",
                  location: "Yukon Subarctic",
                  image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
                  badge: "Carbon Depth"
                },
                {
                  title: "Old-Growth Bioacoustics",
                  field: "Faunal Census",
                  location: "Pacific Northwest",
                  image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800",
                  badge: "Acoustic Trap"
                }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-white/15 shadow-xl bg-[#0f2317] flex flex-col justify-between p-5"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 group-hover:via-black/50 transition-colors" />

                  {/* Top Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-[#84cc16] backdrop-blur-md">
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-white/80 font-medium bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {item.field}
                    </span>
                  </div>

                  {/* Bottom Text */}
                  <div className="relative z-10">
                    <h4 className="text-base font-extrabold text-white group-hover:text-[#84cc16] transition-colors leading-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#cbd5e1] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
                      {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUB-HERO TEXT (Frameworks & Strategic Priorities - Balanced Neutral Palette) */}
      <section className="relative z-20 w-full bg-[#f8faf7] text-[#0f2317] border-t border-b border-[#e2e8f0] py-24">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#0f2317]/5 border border-[#0f2317]/10 text-[#0f2317] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
              Strategic Priorities
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-black tracking-tight text-[#0f2317] mb-14 max-w-6xl">
              Building Strong Frameworks, Smart Strategies, And Confident Forestry Decisions At Every Level.
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-5 text-base sm:text-lg leading-relaxed text-[#475569] font-medium">
                We focus on building strong fundamentals, transparent open science, and resilient policies for researchers, governments, and NGOs working on the frontlines of global conservation.
              </div>
              
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="bg-[#12281b] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-black/10 shadow-2xl min-h-[220px] sm:min-h-[240px]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#84cc16]">Data Fidelity</span>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white my-3">100% Peer-Reviewed</div>
                  <div>
                    <div className="flex justify-between text-xs text-[#cbd5e1] mb-2">
                      <span>Verification Index</span>
                      <span className="text-[#84cc16] font-bold">Grade A</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-[#84cc16]" />
                    </div>
                  </div>
                </div>
                <div className="bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800')] bg-cover bg-center rounded-3xl border border-black/10 shadow-2xl min-h-[180px] sm:min-h-[240px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THEMATIC AREAS CAROUSEL */}
      <section className="py-24 bg-[#0d1e14] border-t border-white/10">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          {/* Thematic Areas Sliding Carousel Navigation with Independent Scroll */}
          <div>
            <ThematicCarousel 
              title="Thematic Areas" 
              subtitle="Slide through 10 global forestry disciplines to discover verified datasets, manuals, and papers" 
            />
          </div>

          {/* "Resource for Every Research Need" section commented out as requested */}
          {/*
          <div className="text-center mb-16 mt-20">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#84cc16]">Curated Disciplines</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-2">
              Resources For Every Research Need.
            </h2>
          </div>
          
          <div className="flex md:grid md:grid-cols-2 gap-6 md:gap-8 w-full overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory -mx-6 px-6 sm:-mx-10 sm:px-10 md:mx-0 md:px-0">
            <div className="min-w-[85vw] sm:min-w-[360px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start bg-[#1c3d2b]/80 rounded-3xl p-8 md:p-14 flex flex-col items-center justify-center text-center border border-white/10 min-h-[320px] md:h-[420px] xl:h-[460px] shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Policy & Governance</h3>
              <p className="text-sm sm:text-base text-[#cbd5e1] mb-8 max-w-md leading-relaxed">
                Guidelines, legal blueprints, and legislative frameworks for sustainable institutional and community forestry.
              </p>
              <Link href="/resources?theme=Policy%20and%20Governance" className="text-xs uppercase font-extrabold tracking-widest text-[#84cc16] hover:text-[#a3e635] flex items-center">
                Explore Resources <span className="ml-2">&rarr;</span>
              </Link>
            </div>
            
            <div className="min-w-[85vw] sm:min-w-[360px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200')] bg-cover bg-center rounded-3xl min-h-[320px] md:h-[420px] xl:h-[460px] border border-white/10 shadow-xl" />
            
            <div className="min-w-[85vw] sm:min-w-[360px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start bg-[#1c3d2b]/80 rounded-3xl p-8 md:p-14 flex flex-col items-center justify-center text-center border border-white/10 min-h-[320px] md:h-[420px] xl:h-[460px] shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Climate Adaptation</h3>
              <p className="text-sm sm:text-base text-[#cbd5e1] mb-8 max-w-md leading-relaxed">
                Remote sensing models and field methodologies for ecological resilience in shifting climates.
              </p>
              <Link href="/resources?theme=Climate%20Change%20Adaptation%20%26%20Mitigation" className="text-xs uppercase font-extrabold tracking-widest text-[#84cc16] hover:text-[#a3e635] flex items-center">
                Explore Resources <span className="ml-2">&rarr;</span>
              </Link>
            </div>
            
            <div className="min-w-[85vw] sm:min-w-[360px] md:min-w-0 flex-shrink-0 md:flex-shrink snap-start bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200')] bg-cover bg-center rounded-3xl min-h-[320px] md:h-[420px] xl:h-[460px] border border-white/10 shadow-xl" />
          </div>
          */}
        </div>
      </section>

      {/* 6. MOMENTS FROM THE FIELD (Decreased, Proportional Size & Mobile Optimized) */}
      <section className="py-12 sm:py-16 overflow-hidden bg-[#163022]">
        <div className="text-center mb-6 sm:mb-10 px-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#84cc16]">Field Expeditions</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-1.5 mb-2">
            Moments From The Field
          </h2>
          <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-lg mx-auto leading-relaxed mb-3">
            A glimpse into worldwide research expeditions, on-the-ground biomass measurements, and the teams advancing DFIH.
          </p>
          <div className="inline-flex md:hidden items-center gap-1.5 text-[10px] text-[#cbd5e1]/70 font-semibold bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <span>&larr; Swipe to explore expeditions &rarr;</span>
          </div>
        </div>
        
        <div className="w-full overflow-x-auto pb-6 pt-2 px-4 sm:px-8 no-scrollbar scroll-smooth snap-x snap-mandatory flex justify-start md:justify-center">
          <div className="flex items-center gap-3.5 sm:gap-6 lg:gap-8 mx-auto w-max px-4 sm:px-6">
            <div className="w-36 h-52 sm:w-44 sm:h-64 md:w-48 md:h-68 lg:w-52 lg:h-72 xl:w-56 xl:h-76 shrink-0 snap-center bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800')] bg-cover bg-center rounded-2xl -rotate-3 sm:-rotate-6 shadow-xl border border-white/15 transition-transform hover:scale-105" />
            <div className="w-36 h-52 sm:w-44 sm:h-64 md:w-48 md:h-68 lg:w-52 lg:h-72 xl:w-56 xl:h-76 shrink-0 snap-center bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800')] bg-cover bg-center rounded-2xl rotate-2 sm:rotate-3 shadow-xl border border-white/15 -mt-2 sm:-mt-4 transition-transform hover:scale-105" />
            <div className="w-36 h-52 sm:w-44 sm:h-64 md:w-48 md:h-68 lg:w-52 lg:h-72 xl:w-56 xl:h-76 shrink-0 snap-center bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800')] bg-cover bg-center rounded-2xl -rotate-1 sm:-rotate-2 shadow-xl border border-white/15 mt-2 sm:mt-4 transition-transform hover:scale-105" />
            <div className="w-36 h-52 sm:w-44 sm:h-64 md:w-48 md:h-68 lg:w-52 lg:h-72 xl:w-56 xl:h-76 shrink-0 snap-center bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800')] bg-cover bg-center rounded-2xl rotate-3 sm:rotate-6 shadow-xl border border-white/15 transition-transform hover:scale-105" />
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Button 
            className="rounded-full bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-6 py-5 font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-[#84cc16]/20"
            asChild
          >
            <Link href="/resources">View Repository</Link>
          </Button>
        </div>
      </section>

      {/* 7. TESTIMONIALS (Balanced Neutral Palette - Tablet & Mobile Responsive) */}
      <section className="py-20 sm:py-24 border-t border-b border-[#e2e8f0] bg-[#f8faf7] text-[#0f2317]">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#15803d] bg-[#15803d]/10 px-3 py-1 rounded-full border border-[#15803d]/20">Global Trust</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0f2317] mt-3">
              Trusted By Researchers & Institutions
            </h2>
          </div>
          
          <div className="flex lg:grid lg:grid-cols-3 gap-5 sm:gap-6 xl:gap-8 w-full overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory -mx-6 px-6 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0">
            <div className="min-w-[280px] sm:min-w-[340px] lg:min-w-0 flex-shrink-0 lg:flex-shrink snap-start bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow">
              <p className="text-sm sm:text-base leading-relaxed text-[#334155] mb-8 font-medium">
                "Structured datasets that actually accelerate publications. Every model is verified and rigorous. DFIH stands out among global repositories."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[url('https://randomuser.me/api/portraits/men/32.jpg')] bg-cover ring-2 ring-[#84cc16]" />
                <div>
                  <div className="text-sm font-bold text-[#0f2317]">David Laid</div>
                  <div className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">Lead Researcher</div>
                </div>
              </div>
            </div>

            <div className="min-w-[280px] sm:min-w-[340px] lg:min-w-0 flex-shrink-0 lg:flex-shrink snap-start bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow">
              <p className="text-sm sm:text-base leading-relaxed text-[#334155] mb-8 font-medium">
                "Highly recommended for conservation analysts. Clean indexing, comprehensive categories, and an active international community."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[url('https://randomuser.me/api/portraits/women/44.jpg')] bg-cover ring-2 ring-[#84cc16]" />
                <div>
                  <div className="text-sm font-bold text-[#0f2317]">Sarah Jenkins</div>
                  <div className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">Policy Director</div>
                </div>
              </div>
            </div>

            <div className="min-w-[280px] sm:min-w-[340px] lg:min-w-0 flex-shrink-0 lg:flex-shrink snap-start bg-white border border-[#e2e8f0] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow">
              <p className="text-sm sm:text-base leading-relaxed text-[#334155] mb-8 font-medium">
                "The finest platform for academic and field forestry resources. Reliable metadata, easy document downloads, and responsive curators."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[url('https://randomuser.me/api/portraits/men/67.jpg')] bg-cover ring-2 ring-[#84cc16]" />
                <div>
                  <div className="text-sm font-bold text-[#0f2317]">Michael Chen</div>
                  <div className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">Conservationist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RESEARCH INSIGHTS */}
      <section className="py-24 bg-[#12281b] border-t border-white/10">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start w-full">
            <div className="lg:w-1/3 xl:w-1/3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#84cc16]">Analysis & Science</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-2 mb-4 leading-tight">
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
              <Link href="/resources/1" className="group flex flex-col sm:flex-row gap-6 items-center bg-[#1c3d2b]/80 p-5 rounded-3xl border border-white/10 hover:border-[#84cc16]/40 transition-all shadow-lg">
                <div className="w-full sm:w-64 h-40 bg-[url('https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=800')] bg-cover bg-center rounded-2xl overflow-hidden shrink-0" />
                <div className="flex-1">
                  <div className="text-[10px] text-[#84cc16] font-bold uppercase tracking-widest mb-1.5">Peer Reviewed &bull; Nov 2026</div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-[#84cc16] transition-colors leading-snug">
                    Understanding Carbon Sequestration In Old Growth Canopy
                  </h3>
                  <p className="text-xs sm:text-sm text-[#cbd5e1]/80 mt-2 line-clamp-2 leading-relaxed">
                    A multi-year assessment of biomass retention and carbon flux in primary rainforest corridors.
                  </p>
                </div>
              </Link>

              <Link href="/resources/2" className="group flex flex-col sm:flex-row gap-6 items-center bg-[#1c3d2b]/80 p-5 rounded-3xl border border-white/10 hover:border-[#84cc16]/40 transition-all shadow-lg">
                <div className="w-full sm:w-64 h-40 bg-[url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800')] bg-cover bg-center rounded-2xl overflow-hidden shrink-0" />
                <div className="flex-1">
                  <div className="text-[10px] text-[#84cc16] font-bold uppercase tracking-widest mb-1.5">Policy Framework &bull; Oct 2026</div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-[#84cc16] transition-colors leading-snug">
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
