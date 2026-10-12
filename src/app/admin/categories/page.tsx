"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, GitMerge, FolderTree } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }, (err) => console.error("Error fetching categories:", err))
    return () => unsubscribe()
  }, [])

  const handleAdd = async () => {
    const name = prompt("Enter new category / thematic area name:")
    if (name && name.trim()) {
      await addDoc(collection(db, "categories"), {
        name: name.trim(),
        count: 0,
        status: "Active",
        createdAt: serverTimestamp()
      })
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete category "${name}"?`)) {
      await deleteDoc(doc(db, "categories", id))
    }
  }

  return (
    <main className="p-6 md:p-10 bg-[#163022] min-h-screen text-[#f5f0e6]">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#f5f0e6]">Structure &amp; Thematic Areas</h1>
            <p className="text-[#cbd5e1]/70 mt-1">Manage content taxonomies, categories, and research thematic areas.</p>
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#84cc16]/20 cursor-pointer shrink-0"
          >
            <Plus size={18} />
            Add Thematic Area
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {categories.map((category: any) => (
            <div key={category.id} className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl relative group hover:border-[#84cc16]/40 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-[#84cc16]/15 p-3 rounded-2xl border border-[#84cc16]/30">
                  <GitMerge className="text-[#84cc16]" size={22} />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDelete(category.id, category.name)} 
                    className="p-2 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-colors cursor-pointer" 
                    title="Delete Category"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-[#f5f0e6] mb-1">{category.name}</h3>
              <p className="text-[#cbd5e1]/70 text-xs mb-4">{category.count || 0} resources attached</p>
              
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#84cc16]/15 text-[#84cc16] border border-[#84cc16]/30">
                  {category.status || "Active"}
                </span>
                <span className="text-[#cbd5e1]/60 text-xs">Thematic Area</span>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <button 
            onClick={handleAdd} 
            className="bg-[#1c3d2b]/40 hover:bg-[#1c3d2b]/70 border-2 border-dashed border-white/15 hover:border-[#84cc16]/50 rounded-3xl p-6 min-h-[200px] flex flex-col items-center justify-center gap-3 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 flex items-center justify-center group-hover:scale-110 transition-transform text-[#84cc16]">
              <Plus size={24} />
            </div>
            <span className="text-[#f5f0e6] font-semibold text-sm">Create New Thematic Area</span>
          </button>
          
        </div>
      </div>
    </main>
  )
}
