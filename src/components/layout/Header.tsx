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
  { name: "Resources", href: "/resources" },
  { name: "News", href: "/news" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const isHome = pathname === "/"

  return (
    <header 
      className={cn(
        "z-50 w-full transition-colors duration-300",
        isHome 
          ? "absolute top-0 bg-transparent border-transparent" 
          : "sticky top-0 bg-[#84cc16]/80 backdrop-blur-md border-b border-black/10 shadow-sm"
      )}
    >
      <div className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8",
        isHome && "pt-6" // Add some top spacing on the homepage
      )}>
        <div className={cn(
          "flex h-20 items-center justify-between px-6 transition-all",
          isHome && "bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl rounded-full"
        )}>
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-md shadow-sm border border-slate-200">
                <Image 
                  src="/logo.png" 
                  alt="DFIH Logo" 
                  width={60} 
                  height={60} 
                  className="object-contain w-[50px] h-[50px]"
                  priority
                />
              </div>
              <div className="hidden sm:block text-slate-900">
                <h1 className="text-xl font-bold leading-tight tracking-tight">DFIH</h1>
                <p className="text-[10px] uppercase tracking-widest opacity-80 font-medium">Forests - Lungs of the World</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 px-4 py-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-all text-slate-700 hover:bg-[#84cc16]/10 hover:text-slate-900",
                  pathname === item.href && "bg-[#84cc16] text-[#0f172a]"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section: Search & Auth */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-slate-700 hover:bg-[#84cc16]/10" 
              asChild
            >
              <Link href="/resources">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <div className="h-6 w-px mx-2 bg-slate-200" aria-hidden="true" />
            <Button 
              variant="outline" 
              className="hidden lg:flex rounded-full border-slate-200 bg-white text-slate-900 hover:bg-slate-100" 
              asChild
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button 
              variant="default" 
              className="rounded-full bg-[#84cc16] text-[#0f172a] hover:bg-[#84cc16]/90 font-bold tracking-wide uppercase text-[10px] px-6 shadow-sm" 
              asChild
            >
              <Link href="/submit">
                Submit Resource
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-1">
            <Button variant="ghost" size="icon" className="text-slate-700 hover:bg-[#84cc16]/10" asChild>
              <Link href="/resources"><Search className="h-5 w-5" /></Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-700 hover:bg-[#84cc16]/10"
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
        <div className="md:hidden mt-2 mx-4 rounded-3xl overflow-hidden border border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl">
          <div className="space-y-1 pb-4 pt-3 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block py-3 px-4 text-base font-semibold rounded-lg text-slate-700 hover:bg-[#84cc16]/10 hover:text-slate-900",
                  pathname === item.href && "bg-[#84cc16] text-[#0f172a]"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-slate-100 mt-4 pt-4 pb-2 space-y-3">
              <Button variant="outline" className="w-full justify-center border-slate-200 bg-transparent text-slate-900 hover:bg-slate-100" asChild>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
              </Button>
              <Button variant="default" className="w-full justify-center bg-[#84cc16] text-[#0f172a] hover:bg-[#84cc16]/90 font-bold tracking-wide uppercase text-[10px]" asChild>
                <Link href="/submit" onClick={() => setMobileMenuOpen(false)}>Submit Resource</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
