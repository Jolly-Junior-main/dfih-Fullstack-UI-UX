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
    <div className="flex flex-col min-h-screen bg-[#ffffff] text-[#0f172a] selection:bg-[#0f172a] selection:text-[#ffffff] overflow-hidden">
      
      {/* 2. HERO SECTION */}
      <section className="relative w-full h-[120vh] min-h-[900px] flex flex-col items-center justify-start pt-32">
        {/* Dark Forest Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#ffffff]">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/forest-vid.mp4" type="video/mp4" />
          </video>
          {/* Bottom fade only */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#ffffff] to-transparent" />
        </div>

        {/* Small Intro Text (Top Left of Hero) */}
        <div className="absolute top-40 left-8 md:left-24 z-20 max-w-sm text-sm md:text-base leading-relaxed text-[#0f172a] hidden md:block p-6 rounded-2xl backdrop-blur-md bg-[#84cc16]/20 border border-[#0f172a]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          The Global Repository.<br />
          Helping Researchers And Policymakers<br />
          Improve Sustainable Management<br />
          Through Expert Data.
        </div>

        {/* Central Content (Logo + Title) */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 md:gap-12 w-full px-4 mt-20 md:mt-0">
          
          {/* Glassmorphism Logo Container */}
          <div className="w-[70vw] max-w-[250px] md:max-w-[350px] aspect-auto rounded-2xl md:rounded-[2rem] backdrop-blur-xl bg-[#84cc16]/40 border border-white/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_0_30px_rgba(255,255,255,0.6)] flex items-center justify-center p-2 md:p-4 relative overflow-hidden">
            {/* Glass reflection gradients */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
            
            <Image 
              src="/glass-logo.jpeg" 
              alt="DFIH Logo" 
              width={1000} 
              height={1000} 
              className="object-contain w-full h-auto relative z-10 mix-blend-multiply drop-shadow-sm"
              priority
            />
          </div>
          
          <div className="text-center">
            <h1 className="text-[10vw] sm:text-[8vw] md:text-[60px] lg:text-[80px] font-bold tracking-tighter leading-[1.1] text-[#0f172a] mix-blend-normal drop-shadow-2xl">
              {content.heroTitle.split(' ').map((word, i) => (
                <span key={i}>{word}{(i === 1) ? <br /> : ' '}</span>
              ))}
            </h1>
          </div>
        </div>
      </section>

      {/* 3. SUB-HERO TEXT (Left Aligned Large Text) */}
      <section className="relative z-20 container mx-auto px-6 md:px-12 -mt-16 sm:-mt-32 md:-mt-48 pb-20 md:pb-32">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-[3.5rem] leading-[1.2] md:leading-[1.1] font-medium tracking-tight mb-12 md:mb-16">
            {content.heroSubtitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            <div className="text-sm leading-relaxed text-[#0f172a]/70 max-w-xs">
              We Focus On Building Strong Fundamentals, Smart Strategies, And Confident Policymakers. Our Training Programs Are Designed For Researchers, Analysts, And Decision Makers Who Want Real Impact.
            </div>
            
            {/* Two small cards (matching courtix bottom hero) */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4 h-32 md:h-48">
               <div className="bg-[#f8fafc] rounded-2xl p-4 md:p-6 flex flex-col justify-between border border-[#0f172a]/5">
                 <div className="w-8 h-8 md:w-12 md:h-12 bg-[#84cc16] rounded-full self-center my-auto opacity-80 blur-sm" />
               </div>
               <div className="bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=600')] bg-cover bg-center rounded-2xl border border-[#0f172a]/5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. BENTO GRID (Programs For Every Skill Level) */}
      <section className="py-24 bg-[#5e7a5a] border-t border-[#0f172a]/5 rounded-t-[3rem]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Resources For<br />Every Research Need.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {/* Top Left: Text Card */}
            <div className="bg-[#63805f] rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center border border-[#0f172a]/5 min-h-[300px] md:h-[400px]">
              <h3 className="text-xl md:text-2xl font-medium mb-4">Policy & Governance</h3>
              <p className="text-xs md:text-sm text-[#0f172a]/70 mb-8 max-w-xs">Guidelines and legislative frameworks for sustainable institutional management.</p>
              <Link href="/themes" className="text-xs uppercase tracking-widest text-[#84cc16] flex items-center hover:opacity-80">
                Explore Resources <span className="ml-2">→</span>
              </Link>
            </div>
            {/* Top Right: Image */}
            <div className="bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800')] bg-cover bg-center rounded-2xl min-h-[300px] md:h-[400px]" />
            
            {/* Bottom Left: Image */}
            <div className="hidden md:block bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800')] bg-cover bg-center rounded-2xl min-h-[300px] md:h-[400px]" />
            {/* Bottom Right: Text Card */}
            <div className="bg-[#63805f] rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center border border-[#0f172a]/5 min-h-[300px] md:h-[400px]">
              <h3 className="text-xl md:text-2xl font-medium mb-4">Climate Adaptation</h3>
              <p className="text-xs md:text-sm text-[#0f172a]/70 mb-8 max-w-xs">Data models and strategies for ecological resilience in changing environments.</p>
              <Link href="/themes" className="text-xs uppercase tracking-widest text-[#84cc16] flex items-center hover:opacity-80">
                Explore Resources <span className="ml-2">→</span>
              </Link>
            </div>
            {/* Mobile Bottom Left: Image (Reordered for stacking) */}
            <div className="md:hidden bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800')] bg-cover bg-center rounded-2xl min-h-[300px] h-[400px]" />
          </div>
        </div>
      </section>

      {/* 5. GALLERY (Moments From The Court -> Moments From The Field) */}
      <section className="py-32 overflow-hidden bg-[#ffffff]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Moments From The Field</h2>
          <p className="text-sm text-[#0f172a]/70 max-w-md mx-auto">A Glimpse Into Our Daily Research, Fieldwork, And The Energy That Drives DFIH Forward.</p>
        </div>
        
        {/* Angled Images Container - Horizontally scrollable on mobile */}
        <div className="w-full overflow-x-auto pb-12 pt-8 px-6 no-scrollbar flex md:justify-center">
          <div className="flex justify-start md:justify-center items-center gap-4 md:gap-8 w-max min-w-full">
            <div className="w-48 h-72 md:w-64 md:h-96 shrink-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600')] bg-cover bg-center rounded-2xl -rotate-6 shadow-2xl border border-white/10" />
            <div className="w-48 h-72 md:w-64 md:h-96 shrink-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600')] bg-cover bg-center rounded-2xl rotate-3 shadow-2xl border border-white/10 -mt-6 md:-mt-10" />
            <div className="w-48 h-72 md:w-64 md:h-96 shrink-0 bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600')] bg-cover bg-center rounded-2xl -rotate-2 shadow-2xl border border-white/10 mt-6 md:mt-10" />
            <div className="w-48 h-72 md:w-64 md:h-96 shrink-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=600')] bg-cover bg-center rounded-2xl rotate-6 shadow-2xl border border-white/10" />
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <Button variant="outline" className="rounded-full border-[#0f172a]/20 bg-[#0f172a] text-[#ffffff] hover:bg-[#e6dfcf] px-8 font-semibold text-xs uppercase tracking-widest">
            View Repository
          </Button>
        </div>
      </section>

      {/* 6. TESTIMONIALS (Trusted By Players & Parents) */}
      <section className="py-24 border-t border-white/20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Trusted By<br />Researchers & Institutions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div>
              <p className="text-sm leading-relaxed text-[#0f172a]/80 mb-6">"Structured Data That Actually Works. Every Dataset Is Well-Planned And Intense. DFIH Helped Me Prepare For Competitive Analysis With Confidence."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full bg-[url('https://randomuser.me/api/portraits/men/32.jpg')] bg-cover" />
                <div>
                  <div className="text-sm font-semibold">David Laid</div>
                  <div className="text-[10px] text-[#0f172a]/50 uppercase tracking-wider">Lead Researcher</div>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div>
              <p className="text-sm leading-relaxed text-[#0f172a]/80 mb-6">"Highly Recommended For Serious Analysts. Modern Facilities, Expert Datasets, And A Motivating Atmosphere. DFIH Stands Out From Other Repositories."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full bg-[url('https://randomuser.me/api/portraits/women/44.jpg')] bg-cover" />
                <div>
                  <div className="text-sm font-semibold">Sarah Jenkins</div>
                  <div className="text-[10px] text-[#0f172a]/50 uppercase tracking-wider">Policy Director</div>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div>
              <p className="text-sm leading-relaxed text-[#0f172a]/80 mb-6">"Best Hub For Junior Analysts. My Team Loves Training At DFIH. The Environment Is Safe, Positive, And The Curators Truly Care About Development."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full bg-[url('https://randomuser.me/api/portraits/men/67.jpg')] bg-cover" />
                <div>
                  <div className="text-sm font-semibold">Michael Chen</div>
                  <div className="text-[10px] text-[#0f172a]/50 uppercase tracking-wider">Conservationist</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* STATS */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 max-w-4xl mx-auto border-t border-b border-white/20 py-12 text-center">
            <div className="md:border-r border-b md:border-b-0 border-white/20 pb-8 md:pb-0 last:border-0 last:pb-0">
              <div className="text-3xl font-medium mb-1">4.9/5</div>
              <div className="text-[10px] text-[#0f172a]/50 uppercase tracking-widest">Average Rating</div>
            </div>
            <div className="md:border-r border-b md:border-b-0 border-white/20 pb-8 md:pb-0 last:border-0 last:pb-0">
              <div className="text-3xl font-medium mb-1">500+</div>
              <div className="text-[10px] text-[#0f172a]/50 uppercase tracking-widest">Documents Added</div>
            </div>
            <div className="pb-0">
              <div className="text-3xl font-medium mb-1">10+</div>
              <div className="text-[10px] text-[#0f172a]/50 uppercase tracking-widest">Years Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BLOG / INSIGHTS */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Forestry Tips &<br />Research Insights</h2>
              <p className="text-sm text-[#0f172a]/70 mb-8">Expert Articles, Tips, And Strategies From Top Curators To Help You Master The Data.</p>
              <Button variant="outline" className="rounded-full border-[#0f172a]/20 bg-[#0f172a] text-[#ffffff] hover:bg-[#e6dfcf] px-8 font-semibold text-xs uppercase tracking-widest" asChild>
                <Link href="/resources">View Blog</Link>
              </Button>
            </div>
            
            <div className="md:w-2/3 flex flex-col gap-6">
              {/* Horizontal Blog Card 1 */}
              <Link href="/resources/1" className="group flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-64 h-40 bg-[url('https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=600')] bg-cover bg-center rounded-xl overflow-hidden" />
                <div className="flex-1">
                  <div className="text-[10px] text-[#0f172a]/50 uppercase tracking-widest mb-2">Nov 12, 2024</div>
                  <h3 className="text-xl font-medium group-hover:text-[#84cc16] transition-colors">Understanding Carbon Sequestration In Old Growth</h3>
                </div>
              </Link>
              {/* Horizontal Blog Card 2 */}
              <Link href="/resources/2" className="group flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-64 h-40 bg-[url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600')] bg-cover bg-center rounded-xl overflow-hidden" />
                <div className="flex-1">
                  <div className="text-[10px] text-[#0f172a]/50 uppercase tracking-widest mb-2">Oct 28, 2024</div>
                  <h3 className="text-xl font-medium group-hover:text-[#84cc16] transition-colors">How To Build Resilient Policy Frameworks</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
