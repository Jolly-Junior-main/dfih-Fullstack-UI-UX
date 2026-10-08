"use client"

import { Plus, Edit2, Trash2, GitMerge } from "lucide-react"
import { addCategory, deleteCategory } from "@/app/actions"

export default function AdminCategoriesClient({ initialCategories }: { initialCategories: any[] }) {

  const handleAdd = async () => {
    const name = prompt("Enter new category name:")
    if (name) {
      await addCategory({ name, count: 0, status: "Active" })
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Delete this category?")) {
      await deleteCategory(id)
    }
  }

  return (
    <main className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-[#f5f0e6]">Structure & Categories</h1>
            <p className="text-[#f5f0e6]/60 mt-1">Manage content taxonomies, categories, and tags.</p>
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#2d3a2a] px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>

        {/* Tree View / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {initialCategories.map((category: any) => (
            <div key={category.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl relative group hover:bg-white/15 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-[#84cc16]/20 p-3 rounded-xl border border-[#84cc16]/30">
                  <GitMerge className="text-[#84cc16]" size={24} />
                </div>
                <div className="flex gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-white/10 rounded-lg text-[#f5f0e6]/70 hover:text-white transition-colors" title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(category.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-[#f5f0e6]/70 hover:text-red-400 transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-[#f5f0e6] mb-1">{category.name}</h3>
              <p className="text-[#f5f0e6]/60 text-sm mb-4">{category.count} resources attached</p>
              
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  category.status === 'Active' ? 'bg-[#84cc16]/20 text-[#84cc16] border-[#84cc16]/30' :
                  'bg-white/10 text-[#f5f0e6]/70 border-white/20'
                }`}>
                  {category.status}
                </span>
                <span className="text-[#f5f0e6]/40 text-xs cursor-pointer hover:text-white transition-colors">Manage Sub-categories</span>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <button onClick={handleAdd} className="bg-white/5 hover:bg-white/10 backdrop-blur-md border-2 border-dashed border-white/20 hover:border-white/40 rounded-3xl p-6 h-full min-h-[220px] flex flex-col items-center justify-center gap-4 transition-all group">
            <div className="bg-white/10 p-4 rounded-full group-hover:scale-110 transition-transform">
              <Plus className="text-[#f5f0e6]" size={32} />
            </div>
            <span className="text-[#f5f0e6] font-medium">Create New Taxonomy</span>
          </button>
          
        </div>
      </div>
    </main>
  )
}
