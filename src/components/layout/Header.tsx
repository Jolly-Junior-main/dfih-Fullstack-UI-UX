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
  const [userName, setUserName] = React.useState("")

  React.useEffect(() => {
    const userAuth = sessionStorage.getItem("user_auth") || sessionStorage.getItem("admin_auth")
    setIsLoggedIn(!!userAuth)
    setUserName(sessionStorage.getItem("user_name") || "")
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

          {/* Right Section: Search, User Account & Auth */}
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
            
            {/* User Account Button: Only leads to dashboard if logged in, otherwise leads to login */}
            {isLoggedIn ? (
              <Link 
                href="/dashboard"
                className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-white/10 transition-colors group border border-white/10 bg-white/5"
                title={`${userName || "User"}'s Account`}
              >
                <div className="w-8 h-8 rounded-full ring-2 ring-[#84cc16] overflow-hidden shadow-md shrink-0 bg-[#0f2317] flex items-center justify-center relative">
                  <span className="text-xs font-bold text-[#84cc16]">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </span>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#84cc16] rounded-full border-2 border-[#163022]" />
                </div>
                <span className="text-xs font-semibold text-[#f5f0e6] hidden xl:inline group-hover:text-[#84cc16] transition-colors max-w-[120px] truncate">
                  {userName || "Account"}
                </span>
              </Link>
            ) : (
              <Link 
                href="/login"
                className="flex items-center gap-2 p-1.5 px-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#84cc16]/50 transition-all text-[#cbd5e1] hover:text-white group"
                title="Log In to View Account"
              >
                <div className="w-7 h-7 rounded-full ring-1 ring-white/20 p-0.5 overflow-hidden shrink-0 bg-white/10 flex items-center justify-center text-[#cbd5e1] group-hover:text-[#84cc16] transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium hidden lg:inline">
                  Log in
                </span>
              </Link>
            )}

            {!isLoggedIn && (
              <Button 
                variant="outline" 
                className="hidden lg:flex rounded-full border-white/20 bg-white/5 text-[#f5f0e6] hover:bg-white/15 hover:text-white text-xs font-semibold px-4" 
                asChild
              >
                <Link href="/register">Register</Link>
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
              href={isLoggedIn ? "/dashboard" : "/login"}
              className="w-8 h-8 rounded-full ring-2 ring-[#84cc16] overflow-hidden shrink-0 flex items-center justify-center bg-[#0f2317]"
              title={isLoggedIn ? "My Account" : "Log In"}
            >
              {isLoggedIn ? (
                <span className="text-xs font-bold text-[#84cc16]">
                  {userName ? userName.charAt(0).toUpperCase() : "U"}
                </span>
              ) : (
                <User className="w-4 h-4 text-[#cbd5e1]" />
              )}
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
              {isLoggedIn ? (
                <Button variant="outline" className="w-full justify-center border-white/20 bg-white/5 text-[#f5f0e6] hover:bg-white/15" asChild>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>My Account ({userName || "Contributor"})</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="w-full justify-center border-white/20 bg-white/5 text-[#f5f0e6] hover:bg-white/15" asChild>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-center border-white/20 bg-white/5 text-[#f5f0e6] hover:bg-white/15" asChild>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Create Account</Link>
                  </Button>
                </>
              )}
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
