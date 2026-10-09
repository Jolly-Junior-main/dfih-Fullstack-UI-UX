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
    })
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      await deleteDoc(doc(db, "content", id))
    }
  }

  const handleAdd = async () => {
    await addDoc(collection(db, "content"), {
      title: `New Content Item ${Math.floor(Math.random() * 1000)}`,
      type: "Draft",
      author: "admin",
      status: "Draft",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: serverTimestamp()
    })
  }

  const filteredContent = content.filter((item: any) => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.author?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-[#0f172a]">Manage Content</h1>
            <p className="text-[#0f172a]/60 mt-1">Find, edit, and manage all resources across the platform.</p>
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#ffffff] px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg"
          >
            <Plus size={18} />
            Add Content
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-8 shadow-lg flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0f172a]/40" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or keyword..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[#0f172a] placeholder:text-[#0f172a]/40 focus:outline-none focus:border-[#84cc16]/50 transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-[#0f172a] transition-colors">
              <Filter size={18} />
              Filter
            </button>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#0f172a] focus:outline-none appearance-none cursor-pointer hidden md:block">
              <option>All Types</option>
              <option>Datasets</option>
              <option>Maps</option>
              <option>Reports</option>
            </select>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 text-[#0f172a]/60 text-sm border-b border-white/10">
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Author</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Updated</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[#0f172a] text-sm">
                {filteredContent.length > 0 ? filteredContent.map((item: any) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-4 font-medium">{item.title}</td>
                    <td className="p-4 text-[#0f172a]/70">{item.type}</td>
                    <td className="p-4 text-[#0f172a]/70">{item.author}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        item.status === 'Published' ? 'bg-[#84cc16]/20 text-[#84cc16] border-[#84cc16]/30' :
                        item.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                        'bg-white/10 text-[#0f172a]/70 border-white/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#0f172a]/70">{item.date}</td>
                    <td className="p-4 text-right flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-[#0f172a]/70 hover:text-white transition-colors" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-[#0f172a]/70 hover:text-white transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-[#0f172a]/70 hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#0f172a]/50">No content found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-white/10 bg-black/10 flex items-center justify-between text-sm text-[#0f172a]/60">
            <span>Showing {filteredContent.length} entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 rounded-lg bg-white/10 text-white transition-colors">1</button>
              <button className="px-3 py-1 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
