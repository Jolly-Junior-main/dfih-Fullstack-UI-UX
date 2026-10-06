// Global navigation header with dynamic styling for the homepage`n"use client"
// Global navigation header with dynamic styling for the homepage`n
// Global navigation header with dynamic styling for the homepage`nimport * as React from "react"
// Global navigation header with dynamic styling for the homepage`nimport Link from "next/link"
// Global navigation header with dynamic styling for the homepage`nimport Image from "next/image"
// Global navigation header with dynamic styling for the homepage`nimport { usePathname } from "next/navigation"
// Global navigation header with dynamic styling for the homepage`nimport { Search, Menu, X, User } from "lucide-react"
// Global navigation header with dynamic styling for the homepage`nimport { Button } from "@/components/ui/button"
// Global navigation header with dynamic styling for the homepage`nimport { cn } from "@/lib/utils"
// Global navigation header with dynamic styling for the homepage`n
// Global navigation header with dynamic styling for the homepage`nconst navigation = [
// Global navigation header with dynamic styling for the homepage`n  { name: "Home", href: "/" },
// Global navigation header with dynamic styling for the homepage`n  { name: "Resources", href: "/resources" },
// Global navigation header with dynamic styling for the homepage`n  { name: "News", href: "/news" },
// Global navigation header with dynamic styling for the homepage`n  { name: "About", href: "/about" },
// Global navigation header with dynamic styling for the homepage`n  { name: "Contact", href: "/contact" },
// Global navigation header with dynamic styling for the homepage`n]
// Global navigation header with dynamic styling for the homepage`n
// Global navigation header with dynamic styling for the homepage`nexport function Header() {
// Global navigation header with dynamic styling for the homepage`n  const pathname = usePathname()
// Global navigation header with dynamic styling for the homepage`n  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
// Global navigation header with dynamic styling for the homepage`n
// Global navigation header with dynamic styling for the homepage`n  const isHome = pathname === "/"
// Global navigation header with dynamic styling for the homepage`n
// Global navigation header with dynamic styling for the homepage`n  return (
// Global navigation header with dynamic styling for the homepage`n    <header 
// Global navigation header with dynamic styling for the homepage`n      className={cn(
// Global navigation header with dynamic styling for the homepage`n        "z-50 w-full transition-colors duration-300",
// Global navigation header with dynamic styling for the homepage`n        isHome 
// Global navigation header with dynamic styling for the homepage`n          ? "absolute top-0 bg-transparent border-transparent" 
// Global navigation header with dynamic styling for the homepage`n          : "sticky top-0 bg-white/80 backdrop-blur-md border-b border-black/10 shadow-sm"
// Global navigation header with dynamic styling for the homepage`n      )}
// Global navigation header with dynamic styling for the homepage`n    >
// Global navigation header with dynamic styling for the homepage`n      <div className={cn(
// Global navigation header with dynamic styling for the homepage`n        "container mx-auto px-4 sm:px-6 lg:px-8",
// Global navigation header with dynamic styling for the homepage`n        isHome && "pt-6" // Add some top spacing on the homepage
// Global navigation header with dynamic styling for the homepage`n      )}>
// Global navigation header with dynamic styling for the homepage`n        <div className={cn(
// Global navigation header with dynamic styling for the homepage`n          "flex h-20 items-center justify-between px-6 transition-all",
// Global navigation header with dynamic styling for the homepage`n          isHome && "bg-white/80 backdrop-blur-md border border-white/20 shadow-xl rounded-full"
// Global navigation header with dynamic styling for the homepage`n        )}>
// Global navigation header with dynamic styling for the homepage`n          
// Global navigation header with dynamic styling for the homepage`n          {/* Logo Section */}
// Global navigation header with dynamic styling for the homepage`n          <div className="flex-shrink-0 flex items-center">
// Global navigation header with dynamic styling for the homepage`n            <Link href="/" className="flex items-center gap-3">
// Global navigation header with dynamic styling for the homepage`n              <div className="bg-white/90 p-1 rounded-md shadow-sm border border-black/5">
// Global navigation header with dynamic styling for the homepage`n                <Image 
// Global navigation header with dynamic styling for the homepage`n                  src="/logo.png" 
// Global navigation header with dynamic styling for the homepage`n                  alt="DFIH Logo" 
// Global navigation header with dynamic styling for the homepage`n                  width={60} 
// Global navigation header with dynamic styling for the homepage`n                  height={60} 
// Global navigation header with dynamic styling for the homepage`n                  className="object-contain w-[50px] h-[50px]"
// Global navigation header with dynamic styling for the homepage`n                  priority
// Global navigation header with dynamic styling for the homepage`n                />
// Global navigation header with dynamic styling for the homepage`n              </div>
// Global navigation header with dynamic styling for the homepage`n              <div className="hidden sm:block text-[#698765]">
// Global navigation header with dynamic styling for the homepage`n                <h1 className="text-xl font-bold leading-tight tracking-tight">DFIH</h1>
// Global navigation header with dynamic styling for the homepage`n                <p className="text-[10px] uppercase tracking-widest opacity-80 font-medium">Forests - Lungs of the World</p>
// Global navigation header with dynamic styling for the homepage`n              </div>
// Global navigation header with dynamic styling for the homepage`n            </Link>
// Global navigation header with dynamic styling for the homepage`n          </div>
// Global navigation header with dynamic styling for the homepage`n
// Global navigation header with dynamic styling for the homepage`n          {/* Desktop Navigation */}
// Global navigation header with dynamic styling for the homepage`n          <nav className="hidden md:flex items-center space-x-1 px-4 py-2">
// Global navigation header with dynamic styling for the homepage`n            {navigation.map((item) => (
// Global navigation header with dynamic styling for the homepage`n              <Link
// Global navigation header with dynamic styling for the homepage`n                key={item.name}
// Global navigation header with dynamic styling for the homepage`n                href={item.href}
// Global navigation header with dynamic styling for the homepage`n                className={cn(
// Global navigation header with dynamic styling for the homepage`n                  "inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-all text-[#698765] hover:bg-black/5 hover:text-[#2d3a2a]",
// Global navigation header with dynamic styling for the homepage`n                  pathname === item.href && "bg-[#698765] text-white hover:text-white hover:bg-[#698765]"
// Global navigation header with dynamic styling for the homepage`n                )}
// Global navigation header with dynamic styling for the homepage`n              >
// Global navigation header with dynamic styling for the homepage`n                {item.name}
// Global navigation header with dynamic styling for the homepage`n              </Link>
// Global navigation header with dynamic styling for the homepage`n            ))}
// Global navigation header with dynamic styling for the homepage`n          </nav>
// Global navigation header with dynamic styling for the homepage`n
// Global navigation header with dynamic styling for the homepage`n          {/* Right Section: Search & Auth */}
// Global navigation header with dynamic styling for the homepage`n          <div className="hidden md:flex items-center space-x-2">
// Global navigation header with dynamic styling for the homepage`n            <Button 
// Global navigation header with dynamic styling for the homepage`n              variant="ghost" 
// Global navigation header with dynamic styling for the homepage`n              size="icon" 
// Global navigation header with dynamic styling for the homepage`n              className="rounded-full text-[#698765] hover:bg-black/5" 
// Global navigation header with dynamic styling for the homepage`n              asChild
// Global navigation header with dynamic styling for the homepage`n            >
// Global navigation header with dynamic styling for the homepage`n              <Link href="/resources">
// Global navigation header with dynamic styling for the homepage`n                <Search className="h-5 w-5" />
// Global navigation header with dynamic styling for the homepage`n              </Link>
// Global navigation header with dynamic styling for the homepage`n            </Button>
// Global navigation header with dynamic styling for the homepage`n            <div className="h-6 w-px mx-2 bg-[#698765]/20" aria-hidden="true" />
// Global navigation header with dynamic styling for the homepage`n            <Button 
// Global navigation header with dynamic styling for the homepage`n              variant="outline" 
// Global navigation header with dynamic styling for the homepage`n              className="hidden lg:flex rounded-full border-[#698765]/30 bg-transparent text-[#698765] hover:bg-[#698765] hover:text-white" 
// Global navigation header with dynamic styling for the homepage`n              asChild
// Global navigation header with dynamic styling for the homepage`n            >
// Global navigation header with dynamic styling for the homepage`n              <Link href="/login">Log in</Link>
// Global navigation header with dynamic styling for the homepage`n            </Button>
// Global navigation header with dynamic styling for the homepage`n            <Button 
// Global navigation header with dynamic styling for the homepage`n              variant="default" 
// Global navigation header with dynamic styling for the homepage`n              className="rounded-full bg-[#84cc16] text-[#2d3a2a] hover:bg-[#84cc16]/90 font-bold tracking-wide uppercase text-[10px] px-6 shadow-sm" 
// Global navigation header with dynamic styling for the homepage`n              asChild
// Global navigation header with dynamic styling for the homepage`n            >
// Global navigation header with dynamic styling for the homepage`n              <Link href="/submit">
// Global navigation header with dynamic styling for the homepage`n                Submit Resource
// Global navigation header with dynamic styling for the homepage`n              </Link>
// Global navigation header with dynamic styling for the homepage`n            </Button>
// Global navigation header with dynamic styling for the homepage`n          </div>
// Global navigation header with dynamic styling for the homepage`n
// Global navigation header with dynamic styling for the homepage`n          {/* Mobile menu button */}
// Global navigation header with dynamic styling for the homepage`n          <div className="flex md:hidden items-center space-x-1">
// Global navigation header with dynamic styling for the homepage`n            <Button variant="ghost" size="icon" className="text-[#698765] hover:bg-black/5" asChild>
// Global navigation header with dynamic styling for the homepage`n              <Link href="/resources"><Search className="h-5 w-5" /></Link>
// Global navigation header with dynamic styling for the homepage`n            </Button>
// Global navigation header with dynamic styling for the homepage`n            <Button
// Global navigation header with dynamic styling for the homepage`n              variant="ghost"
// Global navigation header with dynamic styling for the homepage`n              size="icon"
// Global navigation header with dynamic styling for the homepage`n              className="text-[#698765] hover:bg-black/5"
// Global navigation header with dynamic styling for the homepage`n              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// Global navigation header with dynamic styling for the homepage`n              aria-expanded={mobileMenuOpen}
// Global navigation header with dynamic styling for the homepage`n            >
// Global navigation header with dynamic styling for the homepage`n              <span className="sr-only">Open main menu</span>
// Global navigation header with dynamic styling for the homepage`n              {mobileMenuOpen ? (
// Global navigation header with dynamic styling for the homepage`n                <X className="block h-6 w-6" aria-hidden="true" />
// Global navigation header with dynamic styling for the homepage`n              ) : (
// Global navigation header with dynamic styling for the homepage`n                <Menu className="block h-6 w-6" aria-hidden="true" />
// Global navigation header with dynamic styling for the homepage`n              )}
// Global navigation header with dynamic styling for the homepage`n            </Button>
// Global navigation header with dynamic styling for the homepage`n          </div>
// Global navigation header with dynamic styling for the homepage`n        </div>
// Global navigation header with dynamic styling for the homepage`n      </div>
// Global navigation header with dynamic styling for the homepage`n
// Global navigation header with dynamic styling for the homepage`n      {/* Mobile Menu */}
// Global navigation header with dynamic styling for the homepage`n      {mobileMenuOpen && (
// Global navigation header with dynamic styling for the homepage`n        <div className="md:hidden mt-2 mx-4 rounded-3xl overflow-hidden border border-black/10 bg-white/95 backdrop-blur-xl shadow-2xl">
// Global navigation header with dynamic styling for the homepage`n          <div className="space-y-1 pb-4 pt-3 px-4">
// Global navigation header with dynamic styling for the homepage`n            {navigation.map((item) => (
// Global navigation header with dynamic styling for the homepage`n              <Link
// Global navigation header with dynamic styling for the homepage`n                key={item.name}
// Global navigation header with dynamic styling for the homepage`n                href={item.href}
// Global navigation header with dynamic styling for the homepage`n                className={cn(
// Global navigation header with dynamic styling for the homepage`n                  "block py-3 px-4 text-base font-semibold rounded-lg text-[#698765]/80 hover:bg-black/5 hover:text-[#698765]",
// Global navigation header with dynamic styling for the homepage`n                  pathname === item.href && "bg-[#698765] text-white hover:text-white hover:bg-[#698765]"
// Global navigation header with dynamic styling for the homepage`n                )}
// Global navigation header with dynamic styling for the homepage`n                onClick={() => setMobileMenuOpen(false)}
// Global navigation header with dynamic styling for the homepage`n              >
// Global navigation header with dynamic styling for the homepage`n                {item.name}
// Global navigation header with dynamic styling for the homepage`n              </Link>
// Global navigation header with dynamic styling for the homepage`n            ))}
// Global navigation header with dynamic styling for the homepage`n            <div className="border-t border-black/10 mt-4 pt-4 pb-2 space-y-3">
// Global navigation header with dynamic styling for the homepage`n              <Button variant="outline" className="w-full justify-center border-[#698765]/30 bg-transparent text-[#698765] hover:bg-[#698765] hover:text-white" asChild>
// Global navigation header with dynamic styling for the homepage`n                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
// Global navigation header with dynamic styling for the homepage`n              </Button>
// Global navigation header with dynamic styling for the homepage`n              <Button variant="default" className="w-full justify-center bg-[#84cc16] text-[#2d3a2a] hover:bg-[#84cc16]/90 font-bold tracking-wide uppercase text-[10px]" asChild>
// Global navigation header with dynamic styling for the homepage`n                <Link href="/submit" onClick={() => setMobileMenuOpen(false)}>Submit Resource</Link>
// Global navigation header with dynamic styling for the homepage`n              </Button>
// Global navigation header with dynamic styling for the homepage`n            </div>
// Global navigation header with dynamic styling for the homepage`n          </div>
// Global navigation header with dynamic styling for the homepage`n        </div>
// Global navigation header with dynamic styling for the homepage`n      )}
// Global navigation header with dynamic styling for the homepage`n    </header>
// Global navigation header with dynamic styling for the homepage`n  )
// Global navigation header with dynamic styling for the homepage`n}
