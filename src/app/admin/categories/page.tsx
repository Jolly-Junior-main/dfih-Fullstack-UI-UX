"use client"

import { useState, useEffect } from "react"
import { 
  Plus, 
  Edit2, 
  Trash2, 
  GitMerge, 
  FolderTree, 
  Tag, 
  X, 
  Check, 
  Sparkles, 
  RotateCcw,
  Layers,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy, updateDoc } from "firebase/firestore"

interface ThematicCategory {
  id: string
  name: string
  description?: string
  subCategories: string[]
  count: number
  status: "Active" | "Draft" | "Archived"
  createdAt?: any
}

const DEFAULT_SAMPLE_CATEGORIES: Omit<ThematicCategory, "id">[] = [
  {
    name: "Silviculture & Sustainable Forest Management",
    description: "Methodologies for timber harvesting, canopy regeneration, and multi-aged stand dynamics.",
    subCategories: [
      "Boreal Forest Ecology",
      "Canopy Gap Dynamics",
      "Selective Harvesting Systems",
      "Reforestation & Nursery Seedlings",
      "Old-Growth Stand Preservation"
    ],
    count: 289,
    status: "Active"
  },
  {
    name: "Forest Ecology, Wildlife & Biodiversity",
    description: "Fauna monitoring, flora preservation, trophic cascades, and biodiversity indices.",
    subCategories: [
      "Endangered Species Habitats",
      "Canopy Invertebrate Census",
      "Wildlife Corridors & Telemetry",
      "Riparian Buffer Zones"
    ],
    count: 256,
    status: "Active"
  },
  {
    name: "Wood Science & Timber Technology",
    description: "Structural lumber mechanics, engineered wood products, and non-destructive sonic testing.",
    subCategories: [
      "Non-Destructive Sonic Testing",
      "Cellulose & Lignin Nanomaterials",
      "Kiln Drying Optimization",
      "Lumber Stress Grading"
    ],
    count: 124,
    status: "Active"
  },
  {
    name: "Climate Change Adaptation & Carbon Accounting",
    description: "Carbon flux metrics, allometric equations, peatland preservation, and REDD+ methodologies.",
    subCategories: [
      "Biomass Allometric Equations",
      "Soil Organic Carbon Pools",
      "Peatland Fire Prevention",
      "REDD+ Project Validation"
    ],
    count: 204,
    status: "Active"
  },
  {
    name: "Community Forestry & Agroforestry Systems",
    description: "Participatory mapping, non-timber forest products, and indigenous stewardship policies.",
    subCategories: [
      "Indigenous Land Rights",
      "Silvopastoral Integration",
      "Non-Timber Forest Products (NTFPs)",
      "Participatory Forest Governance"
    ],
    count: 187,
    status: "Active"
  }
]

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<ThematicCategory[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ThematicCategory | null>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active" as "Active" | "Draft" | "Archived",
    subCategories: [] as string[]
  })
  const [newSubInput, setNewSubInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setCategories(snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name || "",
            description: data.description || "",
            subCategories: Array.isArray(data.subCategories) ? data.subCategories : [],
            count: data.count || 0,
            status: data.status || "Active",
            createdAt: data.createdAt
          }
        }))
      } else {
        // Fallback to local storage or defaults
        loadLocalCategories()
      }
    }, (err) => {
      console.warn("Firestore categories error, using local fallback:", err)
      loadLocalCategories()
    })
    return () => unsubscribe()
  }, [])

  const loadLocalCategories = () => {
    try {
      const stored = localStorage.getItem("dfih_admin_categories")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed)
          return
        }
      }
    } catch (e) {
      console.error(e)
    }
    // Seed defaults
    const seeded = DEFAULT_SAMPLE_CATEGORIES.map((cat, i) => ({
      id: `sample-cat-${i + 1}`,
      ...cat
    }))
    setCategories(seeded)
    localStorage.setItem("dfih_admin_categories", JSON.stringify(seeded))
  }

  const handleOpenAdd = () => {
    setEditingCategory(null)
    setFormData({
      name: "",
      description: "",
      status: "Active",
      subCategories: ["General Forestry", "Field Trials"]
    })
    setNewSubInput("")
    setIsModalOpen(true)
  }

  const handleOpenEdit = (category: ThematicCategory) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description || "",
      status: category.status || "Active",
      subCategories: Array.isArray(category.subCategories) ? [...category.subCategories] : []
    })
    setNewSubInput("")
    setIsModalOpen(true)
  }

  const handleAddSubCategory = () => {
    const trimmed = newSubInput.trim()
    if (!trimmed) return
    if (formData.subCategories.includes(trimmed)) {
      setNewSubInput("")
      return
    }
    setFormData(prev => ({
      ...prev,
      subCategories: [...prev.subCategories, trimmed]
    }))
    setNewSubInput("")
  }

  const handleRemoveSubCategory = (subToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      subCategories: prev.subCategories.filter(s => s !== subToRemove)
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    setIsSaving(true)
    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: formData.status,
      subCategories: formData.subCategories,
      count: editingCategory?.count || 0
    }

    try {
      if (editingCategory) {
        if (editingCategory.id.startsWith("sample-cat-")) {
          // Update in local state
          const updated = categories.map(c => c.id === editingCategory.id ? { ...c, ...payload } : c)
          setCategories(updated)
          localStorage.setItem("dfih_admin_categories", JSON.stringify(updated))
        } else {
          await updateDoc(doc(db, "categories", editingCategory.id), payload)
        }
      } else {
        try {
          const docRef = await addDoc(collection(db, "categories"), {
            ...payload,
            createdAt: serverTimestamp()
          })
        } catch {
          // fallback local
          const newCat: ThematicCategory = {
            id: `cat-${Date.now()}`,
            ...payload
          }
          const updated = [newCat, ...categories]
          setCategories(updated)
          localStorage.setItem("dfih_admin_categories", JSON.stringify(updated))
        }
      }
      setIsModalOpen(false)
    } catch (err) {
      console.error("Save error:", err)
      alert("Failed to save thematic area.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete thematic area "${name}" and all its sub-categories?`)) {
      if (id.startsWith("sample-cat-") || id.startsWith("cat-")) {
        const updated = categories.filter(c => c.id !== id)
        setCategories(updated)
        localStorage.setItem("dfih_admin_categories", JSON.stringify(updated))
      } else {
        try {
          await deleteDoc(doc(db, "categories", id))
        } catch {
          const updated = categories.filter(c => c.id !== id)
          setCategories(updated)
          localStorage.setItem("dfih_admin_categories", JSON.stringify(updated))
        }
      }
    }
  }

  const handleSeedDefaults = () => {
    if (confirm("Reset and seed 5 official forestry thematic areas with full sub-categories?")) {
      const seeded = DEFAULT_SAMPLE_CATEGORIES.map((cat, i) => ({
        id: `sample-cat-${i + 1}`,
        ...cat
      }))
      setCategories(seeded)
      localStorage.setItem("dfih_admin_categories", JSON.stringify(seeded))
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <main className="p-6 md:p-10 bg-[#163022] min-h-screen text-[#f5f0e6]">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#84cc16] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
              Taxonomy Architecture
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#f5f0e6]">
              Structure &amp; Thematic Areas
            </h1>
            <p className="text-[#cbd5e1]/70 mt-1">
              Manage disciplines, primary research categories, and nested sub-categories across the repository.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSeedDefaults}
              className="px-4 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 text-xs font-semibold text-[#cbd5e1] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              title="Reset sample categories with subcategories"
            >
              <RotateCcw size={14} />
              Reset Sample Areas
            </button>
            <button 
              onClick={handleOpenAdd}
              className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#84cc16]/20 cursor-pointer shrink-0"
            >
              <Plus size={18} />
              Add Thematic Area
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {categories.map((category) => {
            const subList = Array.isArray(category.subCategories) ? category.subCategories : []
            const isExpanded = !!expandedCards[category.id]
            const visibleSubs = isExpanded ? subList : subList.slice(0, 3)

            return (
              <div 
                key={category.id} 
                className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl relative group hover:border-[#84cc16]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-[#84cc16]/15 p-3 rounded-2xl border border-[#84cc16]/30 text-[#84cc16]">
                      <FolderTree size={22} />
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleOpenEdit(category)} 
                        className="p-2 hover:bg-[#84cc16]/20 rounded-xl text-[#cbd5e1] hover:text-[#84cc16] transition-colors cursor-pointer" 
                        title="Edit Area & Sub-categories"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id, category.name)} 
                        className="p-2 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-colors cursor-pointer" 
                        title="Delete Category"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#f5f0e6] mb-1.5 leading-snug group-hover:text-[#84cc16] transition-colors">
                    {category.name}
                  </h3>
                  
                  {category.description && (
                    <p className="text-xs text-[#cbd5e1]/70 mb-4 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  )}

                  {/* Nested Sub-Categories Section */}
                  <div className="p-3.5 rounded-2xl bg-[#12281b]/70 border border-white/10 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#84cc16] flex items-center gap-1">
                        <Tag size={12} /> Included Sub-Categories ({subList.length})
                      </span>
                    </div>

                    {subList.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {visibleSubs.map((sub, sIdx) => (
                          <span 
                            key={sIdx}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-[#f5f0e6]"
                          >
                            {sub}
                          </span>
                        ))}
                        {subList.length > 3 && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(category.id)}
                            className="px-2 py-0.5 rounded-md text-[10px] font-bold text-[#84cc16] hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            {isExpanded ? "Show Less" : `+${subList.length - 3} more`}
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#cbd5e1]/50 italic">
                        No sub-categories defined. Click Edit to add.
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-[#84cc16]/15 text-[#84cc16] border border-[#84cc16]/30">
                    {category.status || "Active"}
                  </span>
                  <span className="text-[#cbd5e1]/70 font-semibold">
                    {category.count || 0} resources attached
                  </span>
                </div>
              </div>
            )
          })}

          {/* Add New Thematic Area Card */}
          <button 
            onClick={handleOpenAdd} 
            className="bg-[#1c3d2b]/40 hover:bg-[#1c3d2b]/80 border-2 border-dashed border-white/15 hover:border-[#84cc16]/50 rounded-3xl p-8 min-h-[260px] flex flex-col items-center justify-center gap-3 transition-all group cursor-pointer text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 flex items-center justify-center group-hover:scale-110 transition-transform text-[#84cc16]">
              <Plus size={28} />
            </div>
            <div>
              <span className="text-[#f5f0e6] font-bold text-base block">Create New Thematic Area</span>
              <span className="text-xs text-[#cbd5e1]/60 mt-1 block">Define new disciplines with nested sub-categories</span>
            </div>
          </button>
          
        </div>
      </div>

      {/* ADD / EDIT MODAL WITH SUB-CATEGORY BUILDER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#1c3d2b] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#f5f0e6]">
                  {editingCategory ? "Edit Thematic Area" : "Add Thematic Area"}
                </h2>
                <p className="text-xs text-[#cbd5e1]/70 mt-0.5">Define category scope and include nested sub-categories.</p>
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
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">
                  Thematic Area Name *
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Silviculture & Sustainable Forest Management"
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">
                  Scope &amp; Description
                </label>
                <textarea 
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of research disciplines covered..."
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl p-3 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              {/* Sub-Categories Interactive Manager */}
              <div className="p-4 rounded-2xl bg-[#12281b]/70 border border-white/10">
                <label className="text-xs font-bold uppercase tracking-wider text-[#84cc16] flex items-center gap-1.5 mb-1">
                  <Tag size={14} /> Included Sub-Categories
                </label>
                <p className="text-[11px] text-[#cbd5e1]/70 mb-3">
                  Type a sub-category and press "Add" or press Enter.
                </p>

                {/* Input row */}
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text" 
                    value={newSubInput}
                    onChange={(e) => setNewSubInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddSubCategory()
                      }
                    }}
                    placeholder="e.g. Boreal Forest Ecology"
                    className="flex-1 bg-[#163022] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubCategory}
                    className="px-4 py-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>

                {/* Tag Pills */}
                {formData.subCategories.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {formData.subCategories.map((sub, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/15 text-xs text-[#f5f0e6]"
                      >
                        {sub}
                        <button
                          type="button"
                          onClick={() => handleRemoveSubCategory(sub)}
                          className="hover:text-red-400 text-[#cbd5e1]/60 transition-colors cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-yellow-400/80 italic">
                    Add at least 1 sub-category to organize research manuscripts.
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-[#f5f0e6] focus:outline-none"
                >
                  <option value="Active">Active (Published to repository)</option>
                  <option value="Draft">Draft (Internal taxonomy)</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#cbd5e1] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !formData.name.trim()}
                  className="px-6 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : editingCategory ? "Save Changes" : "Create Area"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  )
}
