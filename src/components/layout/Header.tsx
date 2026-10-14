"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, Menu, X, User, LogOut, Plus } from "lucide-react"
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
  const [userAvatar, setUserAvatar] = React.useState("")
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false)
  const accountMenuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const admin = sessionStorage.getItem("admin_auth") === "true"
    const email = sessionStorage.getItem("user_email")
    const loggedIn = sessionStorage.getItem("user_logged_in") === "true"
    const avatar = sessionStorage.getItem("user_avatar") || ""

    setUserAvatar(avatar)

    if (admin) {
      setIsLoggedIn(true)
      setUserName("Admin")
    } else if (email && loggedIn) {
      setIsLoggedIn(true)
      setUserName(sessionStorage.getItem("user_name") || email.split("@")[0])
    } else {
      // Clear any legacy stale dummy keys
      sessionStorage.removeItem("user_auth")
      setIsLoggedIn(false)
      setUserName("")
      setUserAvatar("")
    }
  }, [pathname])

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("user_auth")
    sessionStorage.removeItem("user_logged_in")
    sessionStorage.removeItem("user_name")
    sessionStorage.removeItem("user_email")
    sessionStorage.removeItem("user_institution")
    sessionStorage.removeItem("user_avatar")
    setIsLoggedIn(false)
    setUserName("")
    setUserAvatar("")
    setAccountMenuOpen(false)
  }

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
        "w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20",
        isHome && "pt-6" // Add some top spacing on the homepage
      )}>
        <div className={cn(
          "flex h-20 items-center justify-between px-6 sm:px-8 md:px-10 transition-all",
          isHome && "bg-[#163022]/85 backdrop-blur-xl border border-white/15 shadow-2xl rounded-full"
        )}>
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/logo.png" 
                alt="DFIH Logo" 
                width={50} 
                height={50} 
                className="object-contain w-[46px] h-[46px] transition-transform group-hover:scale-105 drop-shadow-md"
                priority
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-extrabold leading-tight tracking-tight text-white group-hover:text-[#84cc16] transition-colors">DFIH</h1>
                <p className="text-[10px] uppercase tracking-widest text-[#cbd5e1] font-semibold">Forests - Lungs of the World</p>
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
            
            {/* User Account Button & Dropdown */}
            <div className="relative" ref={accountMenuRef}>
              {isLoggedIn ? (
                <button 
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-white/10 transition-colors group border border-white/10 bg-white/5 cursor-pointer"
                  title={`${userName || "User"}'s Account`}
                >
                  <div className="w-8 h-8 rounded-full ring-2 ring-[#84cc16] overflow-hidden shadow-md shrink-0 bg-[#0f2317] flex items-center justify-center relative">
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span className="text-xs font-bold text-[#84cc16]">
                        {userName ? userName.charAt(0).toUpperCase() : "U"}
                      </span>
                    )}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#84cc16] rounded-full border-2 border-[#163022]" />
                  </div>
                  <span className="text-xs font-semibold text-[#f5f0e6] hidden xl:inline group-hover:text-[#84cc16] transition-colors max-w-[120px] truncate">
                    {userName || "Account"}
                  </span>
                </button>
              ) : (
                <button 
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center gap-2 p-1.5 px-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#84cc16]/50 transition-all text-[#cbd5e1] hover:text-white group cursor-pointer"
                  title="Account Access"
                >
                  <div className="w-7 h-7 rounded-full ring-1 ring-white/20 p-0.5 overflow-hidden shrink-0 bg-white/10 flex items-center justify-center text-[#cbd5e1] group-hover:text-[#84cc16] transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold hidden lg:inline">
                    Account
                  </span>
                </button>
              )}

              {/* Floating Dropdown Dialog */}
              {accountMenuOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-[#163022] border border-white/15 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95">
                  {isLoggedIn ? (
                    <div>
                      <div className="flex items-center gap-3 pb-3 mb-3 border-b border-white/10">
                        <div className="w-10 h-10 rounded-full ring-2 ring-[#84cc16] bg-[#0f2317] overflow-hidden flex items-center justify-center text-[#84cc16] font-bold text-sm shrink-0">
                          {userAvatar ? (
                            <img src={userAvatar} alt={userName} className="w-full h-full object-cover rounded-full" />
                          ) : (
                            userName ? userName.charAt(0).toUpperCase() : "U"
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-[#f5f0e6] truncate">{userName}</p>
                          <p className="text-[10px] text-[#84cc16] font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] inline-block animate-pulse"></span>
                            Logged in
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Link 
                          href="/dashboard"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/10 text-xs font-semibold text-[#f5f0e6] transition-colors"
                        >
                          <User size={15} className="text-[#84cc16]" />
                          My Profile & Submissions
                        </Link>
                        <Link 
                          href="/submit"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/10 text-xs font-semibold text-[#f5f0e6] transition-colors"
                        >
                          <Plus size={15} className="text-[#84cc16]" />
                          Submit New Resource
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-xs font-semibold text-red-300 transition-colors cursor-pointer text-left"
                        >
                          <LogOut size={15} />
                          Log Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#84cc16] font-bold mb-1">
                        Researcher Portal
                      </div>
                      <h4 className="text-base font-bold text-[#f5f0e6] mb-1">
                        Sign In or Register
                      </h4>
                      <p className="text-xs text-[#cbd5e1]/80 mb-4 leading-relaxed">
                        Please log in to your account or create a new researcher account to access your profile and submissions.
                      </p>

                      <div className="space-y-2">
                        <Link 
                          href="/login"
                          onClick={() => setAccountMenuOpen(false)}
                          className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-xs transition-all shadow-md shadow-[#84cc16]/20"
                        >
                          Log In to Account
                        </Link>
                        <Link 
                          href="/register"
                          onClick={() => setAccountMenuOpen(false)}
                          className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl border border-white/20 hover:bg-white/10 text-[#f5f0e6] font-semibold text-xs transition-all"
                        >
                          Create New Account
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

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
