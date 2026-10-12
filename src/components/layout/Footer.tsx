import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative z-20 bg-[#0d1e14] text-[#cbd5e1] border-t border-white/10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 pb-8 pt-16 lg:pt-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          <div className="space-y-6 xl:col-span-1">
            <Link href="/" className="flex items-center gap-3 inline-flex group">
              <div className="bg-white/10 p-1.5 rounded-xl border border-white/20 shadow-md">
                <Image 
                  src="/logo.png" 
                  alt="DFIH Logo" 
                  width={44} 
                  height={44} 
                  className="object-contain w-[40px] h-[40px]"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#f5f0e6] leading-tight group-hover:text-[#84cc16] transition-colors">DFIH</h1>
                <p className="text-[10px] uppercase tracking-widest text-[#84cc16] font-semibold">Forests - Lungs of the World</p>
              </div>
            </Link>
            <p className="text-sm leading-6 text-[#cbd5e1]/80 max-w-sm">
              A centralized digital resource platform dedicated to forestry research, sustainable management, and knowledge sharing worldwide.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold leading-6 text-[#f5f0e6]">Platform</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li><Link href="/resources" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">Search Resources</Link></li>
                  <li><Link href="/submit" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">Submit Resource</Link></li>
                  <li><Link href="/dashboard" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">Contributor Portal</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold leading-6 text-[#f5f0e6]">Information</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li><Link href="/about" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">About DFIH</Link></li>
                  <li><Link href="/news" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">News Updates</Link></li>
                  <li><Link href="/partners" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">Partner Organizations</Link></li>
                  <li><Link href="/contact" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold leading-6 text-[#f5f0e6]">Portals</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li><Link href="/login" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">Sign In</Link></li>
                  <li><Link href="/register" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">Researcher Account</Link></li>
                  <li><Link href="/admin/login" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">Admin Dashboard</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold leading-6 text-[#f5f0e6]">Thematic Focus</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li><Link href="/resources?theme=Policy%20and%20Governance" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">Policy & Governance</Link></li>
                  <li><Link href="/resources?theme=Sustainable%20Forest%20Management" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">Sustainable Management</Link></li>
                  <li><Link href="/resources?theme=Climate%20Change%20Adaptation%20%26%20Mitigation" className="text-sm text-[#cbd5e1] hover:text-[#84cc16] transition-colors">Climate Adaptation</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs leading-5 text-[#cbd5e1]/60">
            &copy; {new Date().getFullYear()} Digital Forestry Information Hub. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs text-[#cbd5e1]/60">
            <Link href="/about" className="hover:text-[#84cc16] transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-[#84cc16] transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-[#84cc16] transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
