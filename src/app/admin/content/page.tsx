"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Plus, Edit2, Trash2, Eye } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore"

export default function AdminContentPage() {
  const [content, setContent] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const q = query(collection(db, "content"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setContent(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }, (err) => console.error("Error fetching content:", err))
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this content item?")) {
      await deleteDoc(doc(db, "content", id))
    }
  }

  const handleAdd = async () => {
    const title = prompt("Enter title for new content item:")
    if (!title) return
    await addDoc(collection(db, "content"), {
      title,
      type: "Report",
      author: "DFIH Administrator",
      status: "Published",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: serverTimestamp()
    })
  }

  const filteredContent = content.filter((item: any) => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.author?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="p-6 md:p-10 bg-[#163022] min-h-screen text-[#f5f0e6]">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#f5f0e6]">Platform Content</h1>
            <p className="text-[#cbd5e1]/70 mt-1">Review and manage general published content assets and reports.</p>
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#84cc16]/20 cursor-pointer shrink-0"
          >
            <Plus size={18} />
            Add Content
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-[#1c3d2b]/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-8 shadow-xl flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbd5e1]/60" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search content by title or author..." 
              className="w-full bg-[#12281b] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[#f5f0e6] placeholder:text-white/40 focus:outline-none focus:border-[#84cc16] transition-colors"
            />
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-[#1c3d2b]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-[#12281b]/80 text-[#cbd5e1]/80 text-xs uppercase tracking-wider border-b border-white/10">
                  <th className="p-4 font-bold">Title</th>
                  <th className="p-4 font-bold">Type</th>
                  <th className="p-4 font-bold">Author</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[#f5f0e6] text-sm divide-y divide-white/5">
                {filteredContent.length > 0 ? filteredContent.map((item: any) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 font-semibold text-[#f5f0e6]">{item.title}</td>
                    <td className="p-4 text-xs text-[#cbd5e1]/80">{item.type}</td>
                    <td className="p-4 text-xs text-[#cbd5e1]/80">{item.author}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        item.status === 'Published' ? 'bg-[#84cc16]/15 text-[#84cc16] border-[#84cc16]/30' :
                        'bg-yellow-500/15 text-yellow-300 border-yellow-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-[#cbd5e1]/70">{item.date}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="p-2 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-[#cbd5e1]/50">
                      No content items found. Click "Add Content" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  )
}
