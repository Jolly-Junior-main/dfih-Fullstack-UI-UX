// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`nimport Link from "next/link"
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`nimport Image from "next/image"
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`nimport { Button } from "@/components/ui/button"
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`nexport default function Home() {
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n  return (
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n    <div className="flex flex-col min-h-screen bg-[#698765] text-[#f5f0e6] selection:bg-[#f5f0e6] selection:text-[#698765] overflow-hidden">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      {/* 2. HERO SECTION */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      <section className="relative w-full h-[120vh] min-h-[900px] flex flex-col items-center justify-start pt-32">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        {/* Dark Forest Background */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        <div className="absolute inset-0 z-0 overflow-hidden bg-[#698765]">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <video 
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            autoPlay 
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            loop 
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            muted 
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            playsInline 
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            className="absolute inset-0 w-full h-full object-cover"
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          >
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <source src="/forest-vid.mp4" type="video/mp4" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </video>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          {/* Bottom fade only */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#698765] to-transparent" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        {/* Small Intro Text (Top Left of Hero) */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        <div className="absolute top-40 left-8 md:left-24 z-20 max-w-sm text-sm md:text-base leading-relaxed text-[#f5f0e6] hidden md:block p-6 rounded-2xl backdrop-blur-md bg-black/20 border border-[#f5f0e6]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          The Global Repository.<br />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          Helping Researchers And Policymakers<br />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          Improve Sustainable Management<br />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          Through Expert Data.
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        {/* Central Content (Logo + Title) */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        <div className="relative z-10 flex flex-col items-center justify-center gap-8 md:gap-12 w-full px-4 mt-20 md:mt-0">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          {/* Glassmorphism Logo Container */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <div className="w-[70vw] max-w-[250px] md:max-w-[350px] aspect-auto rounded-2xl md:rounded-[2rem] backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_0_30px_rgba(255,255,255,0.6)] flex items-center justify-center p-2 md:p-4 relative overflow-hidden">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            {/* Glass reflection gradients */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <Image 
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              src="/glass-logo.jpeg" 
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              alt="DFIH Logo" 
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              width={1000} 
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              height={1000} 
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              className="object-contain w-full h-auto relative z-10 mix-blend-multiply drop-shadow-sm"
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              priority
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <div className="text-center">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <h1 className="text-[10vw] sm:text-[8vw] md:text-[60px] lg:text-[80px] font-bold tracking-tighter leading-[1.1] text-[#f5f0e6] mix-blend-normal drop-shadow-2xl">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              Digital Forestry<br />Information Hub
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </h1>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      </section>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      {/* 3. SUB-HERO TEXT (Left Aligned Large Text) */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      <section className="relative z-20 container mx-auto px-6 md:px-12 -mt-16 sm:-mt-32 md:-mt-48 pb-20 md:pb-32">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        <div className="max-w-4xl">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <h2 className="text-3xl md:text-[3.5rem] leading-[1.2] md:leading-[1.1] font-medium tracking-tight mb-12 md:mb-16">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            At DFIH, We Build Strong<br className="hidden md:block" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            Frameworks, Smart Strategies,<br className="hidden md:block" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            And Confident Decisions At Every<br className="hidden md:block" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            Level.
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </h2>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="text-sm leading-relaxed text-[#f5f0e6]/70 max-w-xs">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              We Focus On Building Strong Fundamentals, Smart Strategies, And Confident Policymakers. Our Training Programs Are Designed For Researchers, Analysts, And Decision Makers Who Want Real Impact.
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            {/* Two small cards (matching courtix bottom hero) */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="md:col-span-2 grid grid-cols-2 gap-4 h-32 md:h-48">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n               <div className="bg-[#577353] rounded-2xl p-4 md:p-6 flex flex-col justify-between border border-[#f5f0e6]/5">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                 <div className="w-8 h-8 md:w-12 md:h-12 bg-[#84cc16] rounded-full self-center my-auto opacity-80 blur-sm" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n               </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n               <div className="bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=600')] bg-cover bg-center rounded-2xl border border-[#f5f0e6]/5" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      </section>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      {/* 4. BENTO GRID (Programs For Every Skill Level) */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      <section className="py-24 bg-[#5e7a5a] border-t border-[#f5f0e6]/5 rounded-t-[3rem]">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        <div className="container mx-auto px-6 md:px-12">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <div className="text-center mb-16">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Resources For<br />Every Research Need.</h2>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            {/* Top Left: Text Card */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="bg-[#63805f] rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center border border-[#f5f0e6]/5 min-h-[300px] md:h-[400px]">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <h3 className="text-xl md:text-2xl font-medium mb-4">Policy & Governance</h3>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <p className="text-xs md:text-sm text-[#f5f0e6]/70 mb-8 max-w-xs">Guidelines and legislative frameworks for sustainable institutional management.</p>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <Link href="/themes" className="text-xs uppercase tracking-widest text-[#84cc16] flex items-center hover:opacity-80">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                Explore Resources <span className="ml-2">→</span>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              </Link>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            {/* Top Right: Image */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800')] bg-cover bg-center rounded-2xl min-h-[300px] md:h-[400px]" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            {/* Bottom Left: Image */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="hidden md:block bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800')] bg-cover bg-center rounded-2xl min-h-[300px] md:h-[400px]" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            {/* Bottom Right: Text Card */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="bg-[#63805f] rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center border border-[#f5f0e6]/5 min-h-[300px] md:h-[400px]">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <h3 className="text-xl md:text-2xl font-medium mb-4">Climate Adaptation</h3>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <p className="text-xs md:text-sm text-[#f5f0e6]/70 mb-8 max-w-xs">Data models and strategies for ecological resilience in changing environments.</p>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <Link href="/themes" className="text-xs uppercase tracking-widest text-[#84cc16] flex items-center hover:opacity-80">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                Explore Resources <span className="ml-2">→</span>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              </Link>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            {/* Mobile Bottom Left: Image (Reordered for stacking) */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="md:hidden bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800')] bg-cover bg-center rounded-2xl min-h-[300px] h-[400px]" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      </section>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      {/* 5. GALLERY (Moments From The Court -> Moments From The Field) */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      <section className="py-32 overflow-hidden bg-[#698765]">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        <div className="text-center mb-16">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Moments From The Field</h2>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <p className="text-sm text-[#f5f0e6]/70 max-w-md mx-auto">A Glimpse Into Our Daily Research, Fieldwork, And The Energy That Drives DFIH Forward.</p>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        {/* Angled Images Container - Horizontally scrollable on mobile */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        <div className="w-full overflow-x-auto pb-12 pt-8 px-6 no-scrollbar flex md:justify-center">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <div className="flex justify-start md:justify-center items-center gap-4 md:gap-8 w-max min-w-full">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="w-48 h-72 md:w-64 md:h-96 shrink-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600')] bg-cover bg-center rounded-2xl -rotate-6 shadow-2xl border border-white/10" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="w-48 h-72 md:w-64 md:h-96 shrink-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600')] bg-cover bg-center rounded-2xl rotate-3 shadow-2xl border border-white/10 -mt-6 md:-mt-10" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="w-48 h-72 md:w-64 md:h-96 shrink-0 bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600')] bg-cover bg-center rounded-2xl -rotate-2 shadow-2xl border border-white/10 mt-6 md:mt-10" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="w-48 h-72 md:w-64 md:h-96 shrink-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=600')] bg-cover bg-center rounded-2xl rotate-6 shadow-2xl border border-white/10" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        <div className="mt-16 flex justify-center">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <Button variant="outline" className="rounded-full border-[#f5f0e6]/20 bg-[#f5f0e6] text-[#698765] hover:bg-[#e6dfcf] px-8 font-semibold text-xs uppercase tracking-widest">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            View Repository
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </Button>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      </section>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      {/* 6. TESTIMONIALS (Trusted By Players & Parents) */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      <section className="py-24 border-t border-white/20">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        <div className="container mx-auto px-6 md:px-12">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <div className="text-center mb-20">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Trusted By<br />Researchers & Institutions</h2>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            {/* Testimonial 1 */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <p className="text-sm leading-relaxed text-[#f5f0e6]/80 mb-6">"Structured Data That Actually Works. Every Dataset Is Well-Planned And Intense. DFIH Helped Me Prepare For Competitive Analysis With Confidence."</p>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <div className="flex items-center gap-3">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                <div className="w-10 h-10 bg-gray-600 rounded-full bg-[url('https://randomuser.me/api/portraits/men/32.jpg')] bg-cover" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                <div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                  <div className="text-sm font-semibold">David Laid</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                  <div className="text-[10px] text-[#f5f0e6]/50 uppercase tracking-wider">Lead Researcher</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            {/* Testimonial 2 */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <p className="text-sm leading-relaxed text-[#f5f0e6]/80 mb-6">"Highly Recommended For Serious Analysts. Modern Facilities, Expert Datasets, And A Motivating Atmosphere. DFIH Stands Out From Other Repositories."</p>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <div className="flex items-center gap-3">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                <div className="w-10 h-10 bg-gray-600 rounded-full bg-[url('https://randomuser.me/api/portraits/women/44.jpg')] bg-cover" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                <div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                  <div className="text-sm font-semibold">Sarah Jenkins</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                  <div className="text-[10px] text-[#f5f0e6]/50 uppercase tracking-wider">Policy Director</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            {/* Testimonial 3 */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <p className="text-sm leading-relaxed text-[#f5f0e6]/80 mb-6">"Best Hub For Junior Analysts. My Team Loves Training At DFIH. The Environment Is Safe, Positive, And The Curators Truly Care About Development."</p>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <div className="flex items-center gap-3">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                <div className="w-10 h-10 bg-gray-600 rounded-full bg-[url('https://randomuser.me/api/portraits/men/67.jpg')] bg-cover" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                <div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                  <div className="text-sm font-semibold">Michael Chen</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                  <div className="text-[10px] text-[#f5f0e6]/50 uppercase tracking-wider">Conservationist</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          {/* STATS */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 max-w-4xl mx-auto border-t border-b border-white/20 py-12 text-center">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="md:border-r border-b md:border-b-0 border-white/20 pb-8 md:pb-0 last:border-0 last:pb-0">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <div className="text-3xl font-medium mb-1">4.9/5</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <div className="text-[10px] text-[#f5f0e6]/50 uppercase tracking-widest">Average Rating</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="md:border-r border-b md:border-b-0 border-white/20 pb-8 md:pb-0 last:border-0 last:pb-0">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <div className="text-3xl font-medium mb-1">500+</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <div className="text-[10px] text-[#f5f0e6]/50 uppercase tracking-widest">Documents Added</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="pb-0">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <div className="text-3xl font-medium mb-1">10+</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <div className="text-[10px] text-[#f5f0e6]/50 uppercase tracking-widest">Years Data</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      </section>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      {/* 7. BLOG / INSIGHTS */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      <section className="py-24">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          <div className="flex flex-col md:flex-row gap-16">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="md:w-1/3">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Forestry Tips &<br />Research Insights</h2>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <p className="text-sm text-[#f5f0e6]/70 mb-8">Expert Articles, Tips, And Strategies From Top Curators To Help You Master The Data.</p>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <Button variant="outline" className="rounded-full border-[#f5f0e6]/20 bg-[#f5f0e6] text-[#698765] hover:bg-[#e6dfcf] px-8 font-semibold text-xs uppercase tracking-widest" asChild>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                <Link href="/resources">View Blog</Link>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              </Button>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            <div className="md:w-2/3 flex flex-col gap-6">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              {/* Horizontal Blog Card 1 */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <Link href="/resources/1" className="group flex flex-col sm:flex-row gap-6 items-center">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                <div className="w-full sm:w-64 h-40 bg-[url('https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=600')] bg-cover bg-center rounded-xl overflow-hidden" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                <div className="flex-1">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                  <div className="text-[10px] text-[#f5f0e6]/50 uppercase tracking-widest mb-2">Nov 12, 2024</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                  <h3 className="text-xl font-medium group-hover:text-[#84cc16] transition-colors">Understanding Carbon Sequestration In Old Growth</h3>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              </Link>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              {/* Horizontal Blog Card 2 */}
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              <Link href="/resources/2" className="group flex flex-col sm:flex-row gap-6 items-center">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                <div className="w-full sm:w-64 h-40 bg-[url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600')] bg-cover bg-center rounded-xl overflow-hidden" />
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                <div className="flex-1">
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                  <div className="text-[10px] text-[#f5f0e6]/50 uppercase tracking-widest mb-2">Oct 28, 2024</div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                  <h3 className="text-xl font-medium group-hover:text-[#84cc16] transition-colors">How To Build Resilient Policy Frameworks</h3>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n                </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n              </Link>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n            </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n          </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n        </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n      </section>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n    </div>
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n  )
// Main landing page for the DFIH platform, featuring video hero and glassmorphism styling`n}
