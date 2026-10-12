import { Metadata } from "next"
import { ExternalLink, Globe, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Partner Organizations | DFIH",
  description: "Organizations contributing to the Digital Forestry Information Hub.",
}

const partners = [
  { name: "Global Forestry Commission", type: "Government", count: 142, desc: "Leading international policy and monitoring for sustainable forest management." },
  { name: "Institute of Forest Ecology", type: "Research", count: 89, desc: "Dedicated to studying the interactions between forest ecosystems and climate change." },
  { name: "World Timber Organization", type: "Trade", count: 56, desc: "Tracking and promoting sustainable timber trade practices globally." },
  { name: "Amazon Conservation Fund", type: "NGO", count: 204, desc: "Protecting biodiversity and indigenous rights in the Amazon basin." },
  { name: "Boreal Research Network", type: "Academic", count: 73, desc: "A consortium of universities studying northern latitude forests." },
  { name: "Agroforestry International", type: "NGO", count: 115, desc: "Integrating trees into agricultural systems for sustainable food production." },
]

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12 bg-[#163022] text-[#f5f0e6]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-widest text-[#84cc16] font-bold bg-[#84cc16]/10 border border-[#84cc16]/30 px-3 py-1 rounded-full inline-block mb-3">
            Global Network
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#f5f0e6] mb-4">Partner Organizations</h1>
          <p className="text-[#cbd5e1] text-base leading-relaxed">
            DFIH is supported by a global network of accredited institutions, government ministries, and international NGOs dedicated to open forestry science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, idx) => (
            <div key={idx} className="bg-[#1c3d2b]/70 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-[#84cc16]/50 hover:-translate-y-1 transition-all duration-300 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none text-[#84cc16]">
                <Globe size={100} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#0f2317] border border-white/10 flex items-center justify-center text-[#84cc16] shadow-inner">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-white/15 bg-white/5 text-[#cbd5e1]">
                    {partner.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[#f5f0e6] mb-3 group-hover:text-[#84cc16] transition-colors">{partner.name}</h3>
                <p className="text-sm text-[#cbd5e1]/70 leading-relaxed mb-6">{partner.desc}</p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-sm">
                  <span className="font-extrabold text-[#84cc16]">{partner.count}</span>
                  <span className="text-[#cbd5e1]/60 ml-1">resources</span>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#f5f0e6] hover:text-[#84cc16] transition-colors">
                  View Profile <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
