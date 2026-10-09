import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative z-20 bg-[#4f694c] text-[#0f172a]/70 border-t border-white/20" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-3 inline-flex">
              <div className="bg-white/90 p-1 rounded-md shadow-sm">
                <Image 
                  src="/logo.png" 
                  alt="DFIH Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain w-[40px] h-[40px]"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0f172a] leading-tight">DFIH</h1>
                <p className="text-[10px] uppercase tracking-widest text-[#84cc16]">Forests - Lungs of the World</p>
              </div>
            </Link>
            <p className="text-sm leading-6 text-[#0f172a]/60 max-w-xs">
              A centralized digital resource platform dedicated to forestry research, sustainable management, and knowledge sharing.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-[#0f172a]">Platform</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="/resources" className="text-sm leading-6 hover:text-[#84cc16] transition-colors">Search Resources</Link></li>
                  <li><Link href="/submit" className="text-sm leading-6 hover:text-[#84cc16] transition-colors">Submit Resource</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-[#0f172a]">Information</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="/about" className="text-sm leading-6 hover:text-[#84cc16] transition-colors">About DFIH</Link></li>
                  <li><Link href="/news" className="text-sm leading-6 hover:text-[#84cc16] transition-colors">News</Link></li>
                  <li><Link href="/contact" className="text-sm leading-6 hover:text-[#84cc16] transition-colors">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-[#0f172a]">Portals</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="/login" className="text-sm leading-6 hover:text-[#84cc16] transition-colors">Contributor Portal</Link></li>
                  <li><Link href="/login" className="text-sm leading-6 hover:text-[#84cc16] transition-colors">Reviewer Portal</Link></li>
                  <li><Link href="/login" className="text-sm leading-6 hover:text-[#84cc16] transition-colors">Admin Dashboard</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-[#0f172a]">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="/privacy" className="text-sm leading-6 hover:text-[#84cc16] transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-sm leading-6 hover:text-[#84cc16] transition-colors">Terms of Service</Link></li>
                  <li><Link href="/accessibility" className="text-sm leading-6 hover:text-[#84cc16] transition-colors">Accessibility Statement</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/20 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-[#0f172a]/50">
            &copy; {new Date().getFullYear()} Digital Forestry Information Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
