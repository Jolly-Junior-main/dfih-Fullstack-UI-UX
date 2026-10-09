"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit2, Trash2 } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, deleteDoc, doc, addDoc, serverTimestamp, query, orderBy, updateDoc } from "firebase/firestore"

export default function AdminNewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  
  // Add/Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    image: "",
    date: ""
  })

  useEffect(() => {
    const q = query(collection(db, "news"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this news item?")) {
      await deleteDoc(doc(db, "news", id))
    }
  }

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingId(item.id)
      setFormData({
        title: item.title || "",
        category: item.category || "",
        summary: item.summary || "",
        image: item.image || "",
        date: item.date || ""
      })
    } else {
      setEditingId(null)
      setFormData({
        title: "",
        category: "",
        summary: "",
        image: "",
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      })
    }
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateDoc(doc(db, "news", editingId), {
          ...formData
        })
      } else {
        await addDoc(collection(db, "news"), {
          ...formData,
          createdAt: serverTimestamp()
        })
      }
      setIsModalOpen(false)
    } catch (e) {
      console.error("Error saving news:", e)
      alert("Failed to save news update.")
    }
  }

  const filteredNews = news.filter((item: any) => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="p-6 md:p-10 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-[#0f172a]">News Updates</h1>
            <p className="text-[#0f172a]/60 mt-1">Manage news articles, updates, and milestones shown on the public site.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#ffffff] px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg"
          >
            <Plus size={18} />
            Post News
          </button>
        </div>

        {/* Content Table */}
        <div className="bg-[#84cc16]/15 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#84cc16]/20 text-[#0f172a]/60 text-sm border-b border-white/10">
                  <th className="p-4 font-medium">Image</th>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[#0f172a] text-sm">
                {filteredNews.length > 0 ? filteredNews.map((item: any) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-[#84cc16]/5 transition-colors group">
                    <td className="p-4">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-16 h-10 object-cover rounded-md" />
                      ) : (
                        <div className="w-16 h-10 bg-slate-200 rounded-md"></div>
                      )}
                    </td>
                    <td className="p-4 font-medium max-w-[250px] truncate" title={item.title}>{item.title}</td>
                    <td className="p-4 text-[#0f172a]/70">
                      <span className="bg-[#84cc16]/20 text-[#84cc16] px-2 py-1 rounded-md text-xs font-medium">{item.category}</span>
                    </td>
                    <td className="p-4 text-[#0f172a]/70">{item.date}</td>
                    <td className="p-4 text-right flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(item)} className="p-2 hover:bg-[#84cc16]/10 rounded-lg text-[#0f172a]/70 hover:text-blue-500 transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-[#0f172a]/70 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#0f172a]/50">No news updates found. Post one!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-[#0f172a] mb-6">{editingId ? "Edit News" : "Post News"}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#0f172a]/80 mb-1 block">Title</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#84cc16]"
                  placeholder="Article Title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#0f172a]/80 mb-1 block">Category</label>
                  <input 
                    type="text" 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#84cc16]"
                    placeholder="e.g. Events, Platform Update"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0f172a]/80 mb-1 block">Display Date</label>
                  <input 
                    type="text" 
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#84cc16]"
                    placeholder="October 1, 2026"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#0f172a]/80 mb-1 block">Image URL</label>
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#84cc16]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#0f172a]/80 mb-1 block">Summary / Content</label>
                <textarea 
                  value={formData.summary} 
                  onChange={e => setFormData({...formData, summary: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 min-h-[120px] focus:outline-none focus:border-[#84cc16]"
                  placeholder="Write a brief summary of the news update..."
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl text-[#0f172a]/70 hover:bg-slate-100 font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={!formData.title}
                className="px-6 py-2.5 rounded-xl bg-[#0f172a] text-white font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {editingId ? "Save Changes" : "Post News"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
