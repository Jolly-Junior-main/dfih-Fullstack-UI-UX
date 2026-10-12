import { MapPin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-[#163022] text-[#f5f0e6]">
      
      {/* 1. HERO & INFO CARDS */}
      <section className="relative pt-12 pb-24 border-b border-white/10">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-widest text-[#84cc16] font-bold bg-[#84cc16]/10 border border-[#84cc16]/30 px-3 py-1 rounded-full inline-block mb-3">
              Reach Our Team
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#f5f0e6] mb-4">Get in touch.</h1>
            <p className="text-base sm:text-lg text-[#cbd5e1] leading-relaxed">
              We are always open to discuss research partnerships, institutional data access, or any questions you might have about our repository.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 w-full">
            {/* Location Card */}
            <div className="bg-[#1c3d2b]/70 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center shadow-xl hover:border-[#84cc16]/40 transition-colors">
              <div className="w-14 h-14 bg-[#84cc16]/15 border border-[#84cc16]/30 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-[#84cc16]" />
              </div>
              <h3 className="text-xl font-bold text-[#f5f0e6] mb-2">Visit Us</h3>
              <p className="text-sm text-[#cbd5e1] leading-relaxed">
                Yeka Subcity, Woreda 06<br />
                House No. 150<br />
                Addis Ababa, Ethiopia
              </p>
            </div>

            {/* Email Card */}
            <div className="bg-[#1c3d2b]/70 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center shadow-xl hover:border-[#84cc16]/40 transition-colors">
              <div className="w-14 h-14 bg-[#84cc16]/15 border border-[#84cc16]/30 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-[#84cc16]" />
              </div>
              <h3 className="text-xl font-bold text-[#f5f0e6] mb-2">Send an Email</h3>
              <p className="text-sm text-[#cbd5e1] leading-relaxed">
                <a href="mailto:info@forestryinfohub.org" className="text-[#84cc16] hover:underline font-semibold">
                  info@forestryinfohub.org
                </a>
              </p>
            </div>

            {/* Phone Card */}
            <div className="bg-[#1c3d2b]/70 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center shadow-xl hover:border-[#84cc16]/40 transition-colors">
              <div className="w-14 h-14 bg-[#84cc16]/15 border border-[#84cc16]/30 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-[#84cc16]" />
              </div>
              <h3 className="text-xl font-bold text-[#f5f0e6] mb-2">Call Us</h3>
              <p className="text-sm text-[#cbd5e1] leading-relaxed">
                <a href="tel:+251552166276" className="text-[#84cc16] hover:underline font-semibold">
                  +251 5521662 / 76
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORM SECTION */}
      <section className="py-24 bg-[#12281b] border-b border-white/10">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            
            {/* Left: Text */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#84cc16] font-bold mb-4 bg-[#84cc16]/10 border border-[#84cc16]/30 px-3 py-1 rounded-full inline-block">
                Inquiries & Submissions
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#f5f0e6] mb-6 mt-2">
                How Can We<br />Help You?
              </h2>
              <p className="text-[#cbd5e1] leading-relaxed mb-8 max-w-md">
                Send us an inquiry or request assistance with your repository account. Our curatorial team usually replies within 24–48 business hours.
              </p>
            </div>

            {/* Right: Form */}
            <div className="bg-[#1c3d2b]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Input 
                      placeholder="Your Name" 
                      className="bg-[#12281b] border-white/10 text-[#f5f0e6] placeholder:text-[#cbd5e1]/50 h-12 focus:border-[#84cc16]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input 
                      placeholder="Your Email" 
                      type="email"
                      className="bg-[#12281b] border-white/10 text-[#f5f0e6] placeholder:text-[#cbd5e1]/50 h-12 focus:border-[#84cc16]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Input 
                    placeholder="Your Subject" 
                    className="bg-[#12281b] border-white/10 text-[#f5f0e6] placeholder:text-[#cbd5e1]/50 h-12 focus:border-[#84cc16]"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Your Message" 
                    className="bg-[#12281b] border-white/10 text-[#f5f0e6] placeholder:text-[#cbd5e1]/50 min-h-[140px] resize-none focus:border-[#84cc16]"
                  />
                </div>
                <Button className="w-full h-12 rounded-full bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold tracking-wide uppercase text-xs shadow-lg">
                  Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className="h-[360px] w-full bg-[#0d1e14] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000')] bg-cover bg-center opacity-25 mix-blend-luminosity grayscale" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#163022]/90 backdrop-blur-md p-6 rounded-3xl border border-white/15 shadow-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-[#84cc16]/20 border border-[#84cc16]/30 rounded-2xl flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-[#84cc16]" />
          </div>
          <div>
            <h4 className="font-bold text-[#f5f0e6] text-lg">DFIH Headquarters</h4>
            <p className="text-xs text-[#cbd5e1]">Yeka Subcity, Addis Ababa, Ethiopia</p>
          </div>
        </div>
      </section>

    </div>
  )
}
