"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "news"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNewsItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        <div className="mb-16">
          <div className="text-[10px] uppercase tracking-widest text-[#84cc16] font-bold mb-4">Latest Updates</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#0f172a] mb-6">News & Insights</h1>
          <p className="text-[#0f172a]/70 text-lg max-w-2xl leading-relaxed">
            Stay informed with the latest updates from the Digital Forestry Information Hub, including platform features, global forestry news, and expert analyses.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#84cc16]"></div>
          </div>
        ) : newsItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((item) => (
              <Link 
                href={`#`} 
                key={item.id}
                className="group bg-[#f8fafc] border border-white/20 rounded-3xl overflow-hidden hover:border-[#84cc16]/50 transition-colors shadow-lg flex flex-col"
              >
                <div 
                  className="h-64 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${item.image || 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800'}')` }}
                />
                <div className="p-8 flex flex-col flex-1 relative z-10 bg-[#f8fafc]">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-[#84cc16]/20 text-[#84cc16] px-3 py-1 rounded-full">
                      {item.category || "News"}
                    </span>
                    <span className="text-xs text-[#0f172a]/50 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4 group-hover:text-[#84cc16] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-[#0f172a]/70 text-sm leading-relaxed mb-8 flex-1">
                    {item.summary}
                  </p>
                  
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-[#0f172a] group-hover:text-[#84cc16] transition-colors">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#0f172a]/50 bg-slate-50 rounded-3xl border border-slate-200">
            No news updates available at the moment.
          </div>
        )}

      </div>
    </div>
  )
}
