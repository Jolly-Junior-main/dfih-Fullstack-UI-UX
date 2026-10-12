"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Resources", href: "/resources" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  React.useEffect(() => {
    const userAuth = sessionStorage.getItem("user_auth") || sessionStorage.getItem("admin_auth")
    setIsLoggedIn(!!userAuth)
  }, [pathname])

  const isHome = pathname === "/"

  return (
    <header 
      className={cn(
        "z-50 w-full transition-colors duration-300",
        isHome 
          ? "absolute top-0 bg-transparent border-transparent" 
          : "sticky top-0 bg-[#12281b]/90 backdrop-blur-md border-b border-white/10 shadow-md"
      )}
    >
      <div className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8",
        isHome && "pt-6" // Add some top spacing on the homepage
      )}>
        <div className={cn(
          "flex h-20 items-center justify-between px-6 transition-all",
          isHome && "bg-[#163022]/85 backdrop-blur-xl border border-white/15 shadow-2xl rounded-full"
        )}>
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-white/10 p-1.5 rounded-xl shadow-sm border border-white/20 backdrop-blur-sm group-hover:border-[#84cc16]/50 transition-colors">
                <Image 
                  src="/logo.png" 
                  alt="DFIH Logo" 
                  width={55} 
                  height={55} 
                  className="object-contain w-[44px] h-[44px]"
                  priority
                />
              </div>
              <div className="hidden sm:block text-[#f5f0e6]">
                <h1 className="text-xl font-bold leading-tight tracking-tight group-hover:text-[#84cc16] transition-colors">DFIH</h1>
                <p className="text-[10px] uppercase tracking-widest text-[#cbd5e1] font-medium">Forests - Lungs of the World</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Home and About side by side */}
          <nav className="hidden md:flex items-center space-x-1 px-4 py-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-all text-[#cbd5e1] hover:bg-white/10 hover:text-[#f5f0e6]",
                  pathname === item.href && "bg-[#84cc16] text-[#0f2317] font-bold shadow-sm"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section: Search, Circular Profile Image & Auth */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-[#cbd5e1] hover:bg-white/10 hover:text-white" 
              asChild
            >
              <Link href="/resources" aria-label="Search resources">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            
            <div className="h-6 w-px mx-1 bg-white/15" aria-hidden="true" />
            
            {/* User Account with Small Circular Profile Image */}
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors group"
              title="User Account"
            >
              <div className="w-9 h-9 rounded-full ring-2 ring-[#84cc16] p-0.5 overflow-hidden shadow-md shrink-0 bg-[#0f2317] flex items-center justify-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" 
                  alt="User Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#84cc16] rounded-full border-2 border-[#163022]" />
              </div>
              <span className="text-xs font-medium text-[#f5f0e6] hidden xl:inline group-hover:text-[#84cc16] transition-colors">
                Account
              </span>
            </Link>

            {!isLoggedIn && (
              <Button 
                variant="outline" 
                className="hidden lg:flex rounded-full border-white/20 bg-white/5 text-[#f5f0e6] hover:bg-white/15 hover:text-white text-xs font-semibold px-4" 
                asChild
              >
                <Link href="/login">Log in</Link>
              </Button>
            )}

            <Button 
              variant="default" 
              className="rounded-full bg-[#84cc16] text-[#0f2317] hover:bg-[#a3e635] font-bold tracking-wide uppercase text-[10px] px-5 shadow-sm" 
              asChild
            >
              <Link href="/submit">
                Submit Resource
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link 
              href="/dashboard"
              className="w-8 h-8 rounded-full ring-2 ring-[#84cc16] overflow-hidden shrink-0 inline-block"
              title="User Account"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </Link>
            <Button variant="ghost" size="icon" className="text-[#cbd5e1] hover:bg-white/10" asChild>
              <Link href="/resources"><Search className="h-5 w-5" /></Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#cbd5e1] hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 rounded-3xl overflow-hidden border border-white/15 bg-[#163022]/95 backdrop-blur-2xl shadow-2xl">
          <div className="space-y-1 pb-4 pt-3 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block py-3 px-4 text-base font-semibold rounded-xl text-[#cbd5e1] hover:bg-white/10 hover:text-white",
                  pathname === item.href && "bg-[#84cc16] text-[#0f2317] font-bold"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-4 pt-4 pb-2 space-y-3">
              <Button variant="outline" className="w-full justify-center border-white/20 bg-white/5 text-[#f5f0e6] hover:bg-white/15" asChild>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
              </Button>
              <Button variant="outline" className="w-full justify-center border-white/20 bg-white/5 text-[#f5f0e6] hover:bg-white/15" asChild>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
              </Button>
              <Button variant="default" className="w-full justify-center bg-[#84cc16] text-[#0f2317] hover:bg-[#a3e635] font-bold tracking-wide uppercase text-[10px]" asChild>
                <Link href="/submit" onClick={() => setMobileMenuOpen(false)}>Submit Resource</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
