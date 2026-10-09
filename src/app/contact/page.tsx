import { MapPin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-[#ffffff]">
      
      {/* 1. HERO & INFO CARDS */}
      <section className="relative pt-12 pb-24 border-b border-[#0f172a]/5">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0f172a] mb-6">Get in touch.</h1>
            <p className="text-lg text-[#0f172a]/70">We are always open to discuss research partnerships, data access, or any questions you might have about our repository.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Location Card */}
            <div className="bg-[#84cc16]/15 backdrop-blur-xl border border-white/20 p-8 rounded-3xl flex flex-col items-center text-center shadow-lg">
              <div className="w-14 h-14 bg-[#0f172a]/5 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-[#84cc16]" />
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Visit Us Anytime</h3>
              <p className="text-sm text-[#0f172a]/70 leading-relaxed">
                Yeka Subcity, Woreda 06<br />
                House No. 150<br />
                Addis Ababa
              </p>
            </div>

            {/* Email Card */}
            <div className="bg-[#84cc16]/15 backdrop-blur-xl border border-white/20 p-8 rounded-3xl flex flex-col items-center text-center shadow-lg">
              <div className="w-14 h-14 bg-[#0f172a]/5 rounded-full flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-[#84cc16]" />
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Send an Email</h3>
              <p className="text-sm text-[#0f172a]/70 leading-relaxed">
                <a href="mailto:info@forestryinfohub.org" className="hover:text-[#84cc16] transition-colors">info@forestryinfohub.org</a>
              </p>
            </div>

            {/* Phone Card */}
            <div className="bg-[#84cc16]/15 backdrop-blur-xl border border-white/20 p-8 rounded-3xl flex flex-col items-center text-center shadow-lg">
              <div className="w-14 h-14 bg-[#0f172a]/5 rounded-full flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-[#84cc16]" />
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Call Us</h3>
              <p className="text-sm text-[#0f172a]/70 leading-relaxed">
                <a href="tel:+251552166276" className="hover:text-[#84cc16] transition-colors">+251 5521662/76</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORM SECTION */}
      <section className="py-24 bg-[#5e7a5a]">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            
            {/* Left: Text & Social */}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#84cc16] font-bold mb-4">Contact Us</div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#0f172a] mb-6">How Can We<br />Help You?</h2>
              <p className="text-[#0f172a]/70 leading-relaxed mb-10 max-w-md">
                Send us an email, call us, or drop by our office. We are happy to help answer any questions you may have about submitting resources or accessing data.
              </p>
              
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-[#f8fafc] border border-white/20 flex items-center justify-center text-[#0f172a]/70 hover:text-[#ffffff] hover:bg-[#0f172a] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#f8fafc] border border-white/20 flex items-center justify-center text-[#0f172a]/70 hover:text-[#ffffff] hover:bg-[#0f172a] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#f8fafc] border border-white/20 flex items-center justify-center text-[#0f172a]/70 hover:text-[#ffffff] hover:bg-[#0f172a] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-[#84cc16]/15 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-3xl shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Input 
                      placeholder="Your Name" 
                      className="bg-[#ffffff] border-white/20 text-[#0f172a] h-12 focus:border-[#84cc16]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input 
                      placeholder="Your Email" 
                      type="email"
                      className="bg-[#ffffff] border-white/20 text-[#0f172a] h-12 focus:border-[#84cc16]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Input 
                    placeholder="Your Subject" 
                    className="bg-[#ffffff] border-white/20 text-[#0f172a] h-12 focus:border-[#84cc16]"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Your Message" 
                    className="bg-[#ffffff] border-white/20 text-[#0f172a] min-h-[150px] resize-none focus:border-[#84cc16]"
                  />
                </div>
                <Button className="w-full h-12 rounded-full bg-[#0f172a] text-[#ffffff] hover:bg-[#e6dfcf] font-bold tracking-wide uppercase text-[11px]">
                  Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MAP SECTION (Dark Styled) */}
      <section className="h-[400px] w-full bg-[#f8fafc] relative">
        {/* Placeholder for map - using a stylized dark map image for now so it doesn't break */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-luminosity grayscale" />
        <div className="absolute inset-0 border-t border-white/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#84cc16]/90 backdrop-blur-md p-6 rounded-2xl border border-[#0f172a]/20 shadow-2xl flex items-center gap-4">
           <div className="w-12 h-12 bg-[#84cc16]/20 rounded-full flex items-center justify-center">
             <MapPin className="w-6 h-6 text-[#84cc16]" />
           </div>
           <div>
             <h4 className="font-bold text-[#0f172a] text-lg">DFIH Headquarters</h4>
             <p className="text-sm text-[#0f172a]/70">Yeka Subcity, Addis Ababa</p>
           </div>
        </div>
      </section>

    </div>
  )
}
