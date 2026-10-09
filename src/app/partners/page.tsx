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
    <div className="flex flex-col min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#0f172a] mb-4">Partner Organizations</h1>
          <p className="text-[#0f172a]/70 text-lg">DFIH is supported by a global network of institutions, governments, and NGOs dedicated to forestry knowledge.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, idx) => (
            <div key={idx} className="bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col justify-between group hover:bg-[#ffffff]/40 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                <Globe size={100} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] border border-white/20 flex items-center justify-center text-[#84cc16]">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-[#0f172a]/20 text-[#0f172a]/60">
                    {partner.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-medium text-[#0f172a] mb-3 group-hover:text-white transition-colors">{partner.name}</h3>
                <p className="text-sm text-[#0f172a]/60 leading-relaxed mb-6">{partner.desc}</p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/20">
                <div className="text-sm">
                  <span className="font-bold text-[#84cc16]">{partner.count}</span>
                  <span className="text-[#0f172a]/50 ml-1">resources</span>
                </div>
                <button className="flex items-center gap-1 text-sm text-[#0f172a] hover:text-[#84cc16] transition-colors">
                  View Profile <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
