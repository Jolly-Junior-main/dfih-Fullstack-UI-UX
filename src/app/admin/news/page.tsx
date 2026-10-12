"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit2, Trash2, Calendar, Newspaper, X } from "lucide-react"
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
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const q = query(collection(db, "news"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }, (err) => console.error("Error fetching news:", err))
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this news article?")) {
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
        category: "Platform Update",
        summary: "",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800",
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      })
    }
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    try {
      setIsSaving(true)
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
    } finally {
      setIsSaving(false)
    }
  }

  const filteredNews = news.filter((item: any) => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="p-6 md:p-10 bg-[#163022] min-h-screen text-[#f5f0e6]">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#f5f0e6]">News &amp; Insights</h1>
            <p className="text-[#cbd5e1]/70 mt-1">
              Create, edit, and publish news updates shown across the public portal and homepage.
            </p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#84cc16]/20 cursor-pointer shrink-0"
          >
            <Plus size={18} />
            Post News Article
          </button>
        </div>

        {/* Search */}
        <div className="bg-[#1c3d2b]/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-8 shadow-xl flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbd5e1]/60" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news by title or category..." 
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
                  <th className="p-4 font-bold">Image</th>
                  <th className="p-4 font-bold">Title</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Display Date</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[#f5f0e6] text-sm divide-y divide-white/5">
                {filteredNews.length > 0 ? filteredNews.map((item: any) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-16 h-11 object-cover rounded-xl border border-white/10" />
                      ) : (
                        <div className="w-16 h-11 bg-[#12281b] border border-white/10 rounded-xl flex items-center justify-center text-[#cbd5e1]/40">
                          <Newspaper size={18} />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-semibold text-[#f5f0e6] max-w-[320px] truncate" title={item.title}>
                      {item.title}
                    </td>
                    <td className="p-4">
                      <span className="bg-[#84cc16]/15 border border-[#84cc16]/30 text-[#84cc16] px-2.5 py-1 rounded-full text-xs font-semibold">
                        {item.category || "News"}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-[#cbd5e1]/80 flex items-center gap-1.5 mt-2">
                      <Calendar size={13} className="text-[#84cc16]" /> {item.date || "Recent"}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(item)} 
                          className="p-2 hover:bg-[#84cc16]/20 rounded-xl text-[#cbd5e1] hover:text-[#84cc16] transition-colors cursor-pointer" 
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          className="p-2 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-colors cursor-pointer" 
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-[#cbd5e1]/50">
                      No news articles found. Click "Post News Article" to create one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#1c3d2b] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh] relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h2 className="text-2xl font-bold text-[#f5f0e6]">
                {editingId ? "Edit News Article" : "Post News Article"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbd5e1] hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">Article Title *</label>
                <input 
                  type="text" 
                  required
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                  placeholder="e.g. DFIH Launches Global Carbon Mapping Initiative"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">Category</label>
                  <input 
                    type="text" 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                    placeholder="e.g. Field Expeditions, Platform Update, Research"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">Display Date</label>
                  <input 
                    type="text" 
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                    placeholder="October 12, 2026"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">Summary / Content *</label>
                <textarea 
                  required
                  value={formData.summary} 
                  onChange={e => setFormData({...formData, summary: e.target.value})}
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-3 min-h-[140px] text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                  placeholder="Write the summary or article content here..."
                />
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#cbd5e1] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSaving || !formData.title.trim()}
                  className="px-6 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : editingId ? "Save Changes" : "Publish News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
