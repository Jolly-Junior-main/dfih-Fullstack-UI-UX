"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  Newspaper, 
  X, 
  Upload, 
  Image as ImageIcon, 
  Images, 
  Star, 
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, deleteDoc, doc, addDoc, serverTimestamp, query, orderBy, updateDoc } from "firebase/firestore"

export default function AdminNewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Add/Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    image: "", // primary cover image
    images: [] as string[], // multiple images array
    date: ""
  })
  const [urlInput, setUrlInput] = useState("")
  const [showUrlField, setShowUrlField] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null)

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
      const imgs = Array.isArray(item.images) && item.images.length > 0 
        ? item.images 
        : (item.image ? [item.image] : [])
      
      setFormData({
        title: item.title || "",
        category: item.category || "",
        summary: item.summary || "",
        image: item.image || (imgs[0] || ""),
        images: imgs,
        date: item.date || ""
      })
    } else {
      setEditingId(null)
      const defaultImg = "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800"
      setFormData({
        title: "",
        category: "Platform Update",
        summary: "",
        image: defaultImg,
        images: [defaultImg],
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      })
    }
    setUrlInput("")
    setShowUrlField(false)
    setUploadFeedback(null)
    setIsModalOpen(true)
  }

  // Handle local file uploads (multiple images support)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadFeedback(`Processing ${files.length} image(s)...`)
    const fileArray = Array.from(files)
    let loadedCount = 0
    const newImages: string[] = []

    fileArray.forEach((file) => {
      // Validate file type
      if (!file.type.startsWith("image/")) return

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string)
        }
        loadedCount++
        if (loadedCount === fileArray.length) {
          setFormData(prev => {
            const combined = [...prev.images, ...newImages]
            return {
              ...prev,
              images: combined,
              image: prev.image ? prev.image : combined[0] || ""
            }
          })
          setUploadFeedback(`Successfully added ${newImages.length} image(s)!`)
          setTimeout(() => setUploadFeedback(null), 3000)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  // Add image via URL as an optional method
  const handleAddUrlImage = () => {
    if (!urlInput.trim()) return
    setFormData(prev => {
      const combined = [...prev.images, urlInput.trim()]
      return {
        ...prev,
        images: combined,
        image: prev.image ? prev.image : urlInput.trim()
      }
    })
    setUrlInput("")
    setShowUrlField(false)
  }

  // Remove specific image
  const handleRemoveImage = (indexToRemove: number) => {
    setFormData(prev => {
      const updated = prev.images.filter((_, idx) => idx !== indexToRemove)
      const newCover = prev.image === prev.images[indexToRemove]
        ? (updated[0] || "")
        : prev.image
      return {
        ...prev,
        images: updated,
        image: newCover
      }
    })
  }

  // Set primary cover image
  const handleSetPrimary = (imgSrc: string) => {
    setFormData(prev => ({
      ...prev,
      image: imgSrc
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    try {
      setIsSaving(true)
      const payload = {
        ...formData,
        image: formData.image || (formData.images[0] || ""),
        images: formData.images
      }

      if (editingId) {
        await updateDoc(doc(db, "news", editingId), payload)
      } else {
        await addDoc(collection(db, "news"), {
          ...payload,
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
              Create, edit, and publish news updates with direct image upload and multi-image gallery support.
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
                  <th className="p-4 font-bold">Cover &amp; Gallery</th>
                  <th className="p-4 font-bold">Title</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Display Date</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[#f5f0e6] text-sm divide-y divide-white/5">
                {filteredNews.length > 0 ? filteredNews.map((item: any) => {
                  const imageCount = Array.isArray(item.images) ? item.images.length : (item.image ? 1 : 0)
                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4">
                        <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-white/15 bg-[#12281b] flex items-center justify-center shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <Newspaper size={18} className="text-[#cbd5e1]/40" />
                          )}
                          {imageCount > 1 && (
                            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[9px] font-bold text-[#84cc16] border border-[#84cc16]/40 flex items-center gap-0.5">
                              <Images size={9} /> {imageCount}
                            </span>
                          )}
                        </div>
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
                            title="Edit Article"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)} 
                            className="p-2 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-colors cursor-pointer" 
                            title="Delete Article"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                }) : (
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

      {/* Editor Modal with Direct File Upload & Multiple Images */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#1c3d2b] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[92vh] relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#f5f0e6]">
                  {editingId ? "Edit News Article" : "Post News Article"}
                </h2>
                <p className="text-xs text-[#cbd5e1]/70 mt-0.5">Upload multiple photos and author article content.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbd5e1] hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-5">
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
                    placeholder="October 16, 2026"
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD & MULTI-IMAGE MANAGEMENT SECTION */}
              <div className="p-5 rounded-2xl bg-[#12281b]/70 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#84cc16] flex items-center gap-1.5">
                      <Images size={15} /> Article Images &amp; Gallery
                    </label>
                    <p className="text-[11px] text-[#cbd5e1]/70 mt-0.5">
                      Upload one or multiple photos directly from your device. You can choose any photo as the cover.
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setShowUrlField(!showUrlField)}
                    className="text-[11px] text-[#cbd5e1] hover:text-[#84cc16] flex items-center gap-1 underline cursor-pointer"
                  >
                    <LinkIcon size={12} />
                    {showUrlField ? "Hide URL Input" : "Add via URL instead"}
                  </button>
                </div>

                {/* Direct File Picker / Drag-Drop Trigger */}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/15 hover:border-[#84cc16]/50 rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-white/5 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 text-[#84cc16] flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                    <Upload size={22} />
                  </div>
                  <p className="text-sm font-bold text-[#f5f0e6]">
                    Click to browse or drop images here
                  </p>
                  <p className="text-xs text-[#cbd5e1]/60 mt-1">
                    Supports PNG, JPG, WebP, SVG • Select multiple files at once
                  </p>
                </div>

                {uploadFeedback && (
                  <div className="mt-3 p-2.5 rounded-xl bg-[#84cc16]/15 border border-[#84cc16]/30 text-xs text-[#84cc16] flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    {uploadFeedback}
                  </div>
                )}

                {/* Optional URL Input */}
                {showUrlField && (
                  <div className="mt-3 flex gap-2">
                    <input 
                      type="text" 
                      value={urlInput}
                      onChange={e => setUrlInput(e.target.value)}
                      placeholder="Paste image URL (https://...)" 
                      className="flex-1 bg-[#163022] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                    />
                    <button
                      type="button"
                      onClick={handleAddUrlImage}
                      className="px-3 py-2 bg-[#84cc16] text-[#0f2317] rounded-xl text-xs font-bold hover:bg-[#a3e635] cursor-pointer"
                    >
                      Add Photo
                    </button>
                  </div>
                )}

                {/* Images Preview Grid */}
                {formData.images.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#cbd5e1]">
                        Uploaded Images ({formData.images.length})
                      </span>
                      <span className="text-[11px] text-[#cbd5e1]/60">
                        Click the star on any image to make it the main cover
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {formData.images.map((img, idx) => {
                        const isCover = formData.image === img || (idx === 0 && !formData.image)
                        return (
                          <div 
                            key={idx} 
                            className={`relative group rounded-xl overflow-hidden border-2 transition-all aspect-video bg-[#12281b] ${
                              isCover ? "border-[#84cc16] ring-2 ring-[#84cc16]/40" : "border-white/10 hover:border-white/30"
                            }`}
                          >
                            <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                            
                            {/* Cover Badge */}
                            {isCover && (
                              <span className="absolute top-1 left-1 bg-[#84cc16] text-[#0f2317] text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                                COVER
                              </span>
                            )}

                            {/* Hover overlay with action buttons */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                              {!isCover && (
                                <button
                                  type="button"
                                  onClick={() => handleSetPrimary(img)}
                                  className="p-1.5 rounded-lg bg-[#84cc16] text-[#0f2317] hover:bg-[#a3e635] transition-transform hover:scale-110 cursor-pointer"
                                  title="Set as Cover Photo"
                                >
                                  <Star size={13} fill="#0f2317" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="p-1.5 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-transform hover:scale-110 cursor-pointer"
                                title="Remove Image"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">Summary / Content *</label>
                <textarea 
                  required
                  value={formData.summary} 
                  onChange={e => setFormData({...formData, summary: e.target.value})}
                  className="w-full bg-[#12281b] border border-white/10 rounded-2xl p-4 min-h-[140px] text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
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
