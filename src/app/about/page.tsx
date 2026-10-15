"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Globe, 
  Activity, 
  Users, 
  ShieldCheck, 
  Layers, 
  BookOpen, 
  Scale, 
  TreePine, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  FileCheck,
  Award,
  ChevronRight
} from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"mandate" | "pillars" | "standards" | "governance">("mandate")
  const [content, setContent] = useState({
    title: "About DFIH",
    subtitle: "The authoritative digital resource repository dedicated to global forestry science, conservation policy, and open ecological data.",
    missionTitle: "Executive Mandate & Vision",
    missionContent: "The Digital Forestry Information Hub (DFIH) was established as an international, open-science initiative to bridge the gap between academic silviculture, field telemetry, and actionable governmental policy. By centralizing millions of verified datasets, peer-reviewed manuscripts, and field management protocols, we empower researchers, indigenous land stewards, and ministers of forestry worldwide to make rigorous, evidence-backed decisions that safeguard our planet's vital forest biomes."
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "page_content", "about")
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setContent(prev => ({ ...prev, ...docSnap.data() }))
        }
      } catch (e) {
        console.error("Error fetching about content:", e)
      }
    }
    fetchContent()
  }, [])

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16 bg-[#0f2317] text-[#cbd5e1] relative selection:bg-[#84cc16] selection:text-[#0f2317]">
      
      {/* Background - Forest ambient lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000')] bg-cover bg-center opacity-10" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#84cc16]/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#84cc16]/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[#0f2317]/85 backdrop-blur-sm" />
      </div>

      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto relative z-10 flex-1 flex flex-col">
        
        {/* Main Glassmorphism Dashboard Container */}
        <div className="flex-1 bg-[#163022]/70 backdrop-blur-[30px] border border-white/10 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 flex flex-col xl:flex-row gap-8">
          
          {/* Left Column (Main Descriptive Content Area) */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84cc16]/15 border border-[#84cc16]/30 text-[#84cc16] text-[11px] font-bold uppercase tracking-widest mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] animate-pulse" />
                  Institutional Overview
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  {content.title}
                </h1>
                <p className="text-[#cbd5e1] text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
                  {content.subtitle}
                </p>
              </div>

              {/* Navigation Pill Tabs: Horizontal scroll on mobile, wrap on tablet/desktop */}
              <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 bg-[#0f2317]/80 p-1.5 rounded-2xl border border-white/10 self-start sm:self-auto overflow-x-auto max-w-full scrollbar-none">
                {[
                  { id: "mandate", label: "Mandate" },
                  { id: "pillars", label: "Strategic Pillars" },
                  { id: "standards", label: "Peer Review" },
                  { id: "governance", label: "Governance" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-[#84cc16] text-[#0f2317] shadow-md"
                        : "text-[#cbd5e1] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Stats Row (Global Metric Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 bg-[#12281b]/90 rounded-3xl p-6 border border-white/10 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-[#84cc16]" />
                </div>
                <div>
                  <div className="text-[#cbd5e1]/70 text-xs font-medium">Nations Connected</div>
                  <div className="text-white font-extrabold text-2xl">142 Member States</div>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 flex items-center justify-center shrink-0">
                  <Activity className="w-6 h-6 text-[#84cc16]" />
                </div>
                <div>
                  <div className="text-[#cbd5e1]/70 text-xs font-medium">Verified Datasets</div>
                  <div className="text-white font-extrabold text-2xl">10.5 Million</div>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[#84cc16]" />
                </div>
                <div>
                  <div className="text-[#cbd5e1]/70 text-xs font-medium">Accredited Researchers</div>
                  <div className="text-white font-extrabold text-2xl">28,450 Contributors</div>
                </div>
              </div>
            </div>

            {/* TAB CONTENT 1: MANDATE & VISION */}
            {activeTab === "mandate" && (
              <div className="space-y-6">
                <div className="bg-[#12281b]/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-black text-white">{content.missionTitle}</h2>
                    <span className="px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-[#84cc16] text-xs font-bold">
                      2020 &ndash; Present
                    </span>
                  </div>
                  
                  <p className="text-[#cbd5e1] text-sm sm:text-base leading-relaxed mb-8 whitespace-pre-wrap">
                    {content.missionContent}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-white/10">
                    <div className="p-5 rounded-2xl bg-[#163022]/70 border border-white/10">
                      <div className="flex items-center gap-2.5 text-[#84cc16] font-bold text-sm mb-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        FAIR Guiding Principles
                      </div>
                      <p className="text-xs text-[#cbd5e1]/80 leading-relaxed">
                        Findable, Accessible, Interoperable, and Reusable forestry data structured with standardized metadata schemas and persistent DOI identifiers.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#163022]/70 border border-white/10">
                      <div className="flex items-center gap-2.5 text-[#84cc16] font-bold text-sm mb-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        Cross-Border Interoperability
                      </div>
                      <p className="text-xs text-[#cbd5e1]/80 leading-relaxed">
                        Seamless integration with UN-REDD carbon registries, global forest observatory telemetry, and academic university repositories.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Indicators & Targets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#12281b]/80 border border-white/10 rounded-3xl p-6 shadow-xl">
                    <h3 className="text-lg font-extrabold text-white mb-5">Open Science Targets</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1.5">
                          <span className="text-[#cbd5e1]">Open-Access Peer Publications</span>
                          <span className="text-[#84cc16] font-bold">88%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-[88%] h-full bg-[#84cc16] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1.5">
                          <span className="text-[#cbd5e1]">National Policy Framework Mapping</span>
                          <span className="text-[#84cc16] font-bold">94%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-[94%] h-full bg-[#84cc16] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1.5">
                          <span className="text-[#cbd5e1]">Field Raw Sensor Calibration</span>
                          <span className="text-[#84cc16] font-bold">78%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-[78%] h-full bg-[#84cc16] rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#12281b]/80 border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-extrabold text-white">Repository Milestone</h3>
                        <span className="px-3 py-1 bg-[#84cc16]/15 rounded-full border border-[#84cc16]/30 text-[#84cc16] text-xs font-extrabold">
                          Phase 2 Complete
                        </span>
                      </div>
                      <p className="text-xs text-[#cbd5e1]/80 leading-relaxed mb-4">
                        Currently archiving over 700,000 distinct manuscripts, satellite LiDAR maps, and regional management manuals toward our 1,000,000 document target.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <div className="text-xs text-[#cbd5e1]/70">Current Indexed Holdings</div>
                        <div className="text-2xl font-black text-white">742,890</div>
                      </div>
                      <div className="w-14 h-14 rounded-full border-4 border-white/10 border-t-[#84cc16] border-r-[#84cc16] flex items-center justify-center text-white font-extrabold text-xs rotate-45 shadow-md">
                        <span className="-rotate-45">74%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: 4 STRATEGIC PILLARS */}
            {activeTab === "pillars" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: BookOpen,
                    num: "01",
                    title: "Open Science & FAIR Data Infrastructure",
                    desc: "Establishing standardized ontological classification for silviculture models, biomass carbon flux, and geospatial telemetry across global research facilities.",
                    points: ["Standardized Dublin Core & Darwin Core metadata", "Immutable digital object identifiers (DOIs)", "Federated search APIs for academic portals"]
                  },
                  {
                    icon: Scale,
                    num: "02",
                    title: "Evidence-Based Policy Translation",
                    desc: "Translating dense academic papers into digestible policy briefs, legislative drafting guides, and regulatory benchmarks for forest ministries.",
                    points: ["Bilingual policy summary generation", "Direct legislative citation tracking", "Community-based forest tenure models"]
                  },
                  {
                    icon: TreePine,
                    num: "03",
                    title: "Canopy Telemetry & Remote Sensing",
                    desc: "Harmonizing drone LiDAR, multispectral satellite observations, and ground plot sensor arrays into standardized canopy height and density maps.",
                    points: ["High-resolution biomass density strata", "Automated wildfire risk algorithms", "Mangrove & boreal permafrost monitoring"]
                  },
                  {
                    icon: Award,
                    num: "04",
                    title: "Global Extension & Researcher Grants",
                    desc: "Supporting frontline forest researchers in developing economies through compute grants, publication fee waivers, and field hardware subsidies.",
                    points: ["Sub-Saharan & Amazonian fellowship grants", "Open peer-review mentorship tracks", "Multilingual translation programs"]
                  }
                ].map((pillar, idx) => {
                  const Icon = pillar.icon
                  return (
                    <div 
                      key={idx}
                      className="bg-[#12281b]/85 border border-white/10 hover:border-[#84cc16]/40 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#0f2317] border border-white/10 flex items-center justify-center text-[#84cc16] group-hover:bg-[#84cc16] group-hover:text-[#0f2317] transition-all">
                            <Icon className="w-6 h-6" strokeWidth={1.75} />
                          </div>
                          <span className="text-xl font-black text-white/20 group-hover:text-[#84cc16]/40 transition-colors">
                            {pillar.num}
                          </span>
                        </div>

                        <h3 className="text-lg font-extrabold text-white group-hover:text-[#84cc16] transition-colors leading-snug mb-2">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#cbd5e1]/80 leading-relaxed mb-5">
                          {pillar.desc}
                        </p>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-white/10">
                        {pillar.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs text-[#cbd5e1]/70">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#84cc16] shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* TAB CONTENT 3: PEER REVIEW & SCIENTIFIC STANDARDS */}
            {activeTab === "standards" && (
              <div className="space-y-6">
                <div className="bg-[#12281b]/85 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                    Three-Stage Quality Verification Protocol
                  </h2>
                  <p className="text-xs sm:text-sm text-[#cbd5e1]/80 leading-relaxed mb-8 max-w-3xl">
                    Every submission to DFIH undergoes a rigorous multi-tier verification process before being indexed in the public catalog or assigned an official citation handle.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-[#163022]/70 border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#84cc16] bg-[#84cc16]/10 px-2.5 py-1 rounded-full border border-[#84cc16]/30 mb-3 inline-block">
                          Stage 1
                        </span>
                        <h4 className="text-base font-extrabold text-white mb-2">Metadata Automated Linter</h4>
                        <p className="text-xs text-[#cbd5e1]/80 leading-relaxed">
                          Automated validation of geospatial coordinates, file format checksums, species taxonomy, and copyright clearance.
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-[#cbd5e1]/60">
                        Average: 4-6 minutes
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#163022]/70 border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#84cc16] bg-[#84cc16]/10 px-2.5 py-1 rounded-full border border-[#84cc16]/30 mb-3 inline-block">
                          Stage 2
                        </span>
                        <h4 className="text-base font-extrabold text-white mb-2">Curator & Domain Review</h4>
                        <p className="text-xs text-[#cbd5e1]/80 leading-relaxed">
                          Human inspection by an accredited domain expert or institutional reviewer verifying scientific validity and methodology.
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-[#cbd5e1]/60">
                        Average: 24-48 hours
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#163022]/70 border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#84cc16] bg-[#84cc16]/10 px-2.5 py-1 rounded-full border border-[#84cc16]/30 mb-3 inline-block">
                          Stage 3
                        </span>
                        <h4 className="text-base font-extrabold text-white mb-2">DOI Minting & Archival</h4>
                        <p className="text-xs text-[#cbd5e1]/80 leading-relaxed">
                          Permanent publication, cross-indexing with international forestry registries, and issuance of persistent citation metadata.
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-[#cbd5e1]/60">
                        Immutable Registry
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Sovereignty Notice */}
                <div className="bg-[#12281b]/80 border border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-[#84cc16]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">Indigenous Data Sovereignty (CARE Principles)</h4>
                      <p className="text-xs text-[#cbd5e1]/80 mt-1 max-w-xl">
                        DFIH strictly adheres to CARE guidelines ensuring collective benefit, authority to control, responsibility, and ethics for customary land datasets.
                      </p>
                    </div>
                  </div>
                  <Link 
                    href="/contact" 
                    className="shrink-0 px-4 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors"
                  >
                    View Governance Charter
                  </Link>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: GOVERNANCE & ROADMAP */}
            {activeTab === "governance" && (
              <div className="space-y-6">
                <div className="bg-[#12281b]/85 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4">
                    Institutional Governance Architecture
                  </h2>
                  <p className="text-xs sm:text-sm text-[#cbd5e1]/80 leading-relaxed mb-8 max-w-3xl">
                    DFIH operates under a decentralized, international coalition of academic institutions, state forest services, and environmental NGOs.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl bg-[#163022]/70 border border-white/10">
                      <h4 className="text-sm font-extrabold text-white mb-2">Scientific Advisory Board</h4>
                      <p className="text-xs text-[#cbd5e1]/80 leading-relaxed">
                        18 global forestry professors and biometricians establishing peer-review guidelines and taxonomy.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#163022]/70 border border-white/10">
                      <h4 className="text-sm font-extrabold text-white mb-2">Technical FAIR Steering Group</h4>
                      <p className="text-xs text-[#cbd5e1]/80 leading-relaxed">
                        Data architects and cloud engineers maintaining API interoperability and open storage protocols.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#163022]/70 border border-white/10">
                      <h4 className="text-sm font-extrabold text-white mb-2">Policy Translation Council</h4>
                      <p className="text-xs text-[#cbd5e1]/80 leading-relaxed">
                        Environmental legal scholars translating technical datasets into statutory policy recommendations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chronological Roadmap */}
                <div className="bg-[#12281b]/85 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h3 className="text-lg font-extrabold text-white mb-6">Impact Roadmap (2020 &ndash; 2026)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {[
                      { year: "2020", title: "Founding Coalition", desc: "First 12 forestry universities united to build open portal." },
                      { year: "2022", title: "Global Expansion", desc: "Integration with UN-REDD & European Forestry Commission." },
                      { year: "2024", title: "LiDAR Integration", desc: "Addition of 3D drone canopy height models & telemetry." },
                      { year: "2026", title: "FAIR 2.0 Cloud", desc: "Autonomous semantic search and multi-region federated storage." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#163022]/60 border border-white/10">
                        <span className="text-base font-black text-[#84cc16]">{item.year}</span>
                        <h5 className="text-xs font-extrabold text-white mt-1 mb-1">{item.title}</h5>
                        <p className="text-[11px] text-[#cbd5e1]/70 leading-snug">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Institutional Alliance & Verification Card */}
          <div className="w-full xl:w-[360px] flex flex-col gap-6">
            
            {/* DFIH Alliance Institutional Card */}
            <div className="bg-[#12281b]/85 border border-white/10 rounded-3xl p-6 relative shadow-xl flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#84cc16]">Global Alliance</span>
                <span className="text-xs text-[#cbd5e1]/60 font-medium">Verified Authority</span>
              </div>

              {/* Vibrant Gradient Institutional Card */}
              <div className="bg-gradient-to-br from-[#1b3d2b] to-[#142e20] border border-[#84cc16]/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#84cc16]/20 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div>
                    <div className="text-[#cbd5e1]/80 text-[10px] uppercase tracking-widest font-bold">Global Consortium</div>
                    <div className="text-white font-black text-xl tracking-tight mt-0.5">DFIH ALLIANCE</div>
                  </div>
                  <div className="text-[#84cc16] font-bold text-xs bg-[#84cc16]/10 px-2.5 py-1 rounded-full border border-[#84cc16]/30">
                    Active
                  </div>
                </div>
                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <div className="text-[#cbd5e1]/70 text-[10px] uppercase font-semibold mb-0.5">Protocol</div>
                    <div className="text-white font-medium text-xs">Open Access &bull; FAIR</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#cbd5e1]/70 text-[10px] uppercase font-semibold mb-0.5">Global Users</div>
                    <div className="text-[#84cc16] font-black text-2xl">74,330</div>
                  </div>
                </div>
              </div>

              {/* Institutional Overview Points */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <Globe className="w-5 h-5 text-[#84cc16] shrink-0" />
                  <div className="text-xs text-[#cbd5e1]">
                    <span className="font-extrabold text-white">Global Interoperability:</span> Synthesizing telemetry across 140+ countries.
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <FileCheck className="w-5 h-5 text-[#84cc16] shrink-0" />
                  <div className="text-xs text-[#cbd5e1]">
                    <span className="font-extrabold text-white">Curator Verified:</span> Rigorously vetted by accredited forestry institutes.
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <Sparkles className="w-5 h-5 text-[#84cc16] shrink-0" />
                  <div className="text-xs text-[#cbd5e1]">
                    <span className="font-extrabold text-white">Public Good:</span> Fully open-access and non-commercial mission.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/partners" 
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#84cc16]/10 hover:bg-[#84cc16]/20 border border-[#84cc16]/30 text-[#84cc16] text-xs font-bold transition-all group"
                >
                  <span>Explore Partner Directory</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Quick Submit CTA */}
            <div className="bg-[#12281b]/85 border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-white mb-1.5">Contribute Your Research</h4>
                <p className="text-xs text-[#cbd5e1]/80 leading-relaxed mb-4">
                  Are you a forestry researcher, field biologist, or policy analyst? Submit your papers or datasets to the DFIH repository.
                </p>
              </div>
              <Link 
                href="/submit" 
                className="w-full py-2.5 px-4 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-extrabold text-xs text-center transition-all shadow-md"
              >
                Submit A Resource
              </Link>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  )
}
