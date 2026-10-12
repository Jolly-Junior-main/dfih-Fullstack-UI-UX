"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Edit2, Trash2, Eye, CheckCircle, XCircle } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"

export default function AdminResearchPage() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const q = query(collection(db, "research_submissions"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      await deleteDoc(doc(db, "research_submissions", id))
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "research_submissions", id), {
        status: newStatus
      })
    } catch (e) {
      console.error("Error updating status:", e)
      alert("Failed to update status")
    }
  }

  const filteredSubmissions = submissions.filter((item: any) => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="p-6 md:p-10 bg-[#163022] min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-[#f5f0e6]">Research Submissions</h1>
            <p className="text-[#f5f0e6]/60 mt-1">Review, approve, and manage research submitted by users.</p>
          </div>
          <div className="flex gap-4 items-center">
            <a 
              href="/admin/research/add" 
              className="flex items-center justify-center bg-[#84cc16] text-[#0f2317] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#84cc16]/90 transition-colors shadow-lg"
            >
              Add Research
            </a>
            <div className="flex items-center gap-4 bg-[#1c3d2b]/80 px-4 py-2 rounded-xl border border-white/10">
              <div className="text-sm">
                <span className="font-bold text-[#84cc16] text-xl">{submissions.length}</span>
                <span className="text-[#f5f0e6]/60 ml-2">Total Submissions</span>
              </div>
              <div className="w-px h-8 bg-white/10 mx-2"></div>
              <div className="text-sm">
                <span className="font-bold text-yellow-400 text-xl">
                  {submissions.filter(s => s.status === 'Pending Review').length}
                </span>
                <span className="text-[#f5f0e6]/60 ml-2">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-[#1c3d2b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-8 shadow-lg flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f5f0e6]/60" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or category..." 
              className="w-full bg-[#163022] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[#f5f0e6] placeholder:text-[#f5f0e6]/40 focus:outline-none focus:border-[#84cc16]/50 transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-[#163022] hover:bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#f5f0e6] transition-colors">
              <Filter size={18} />
              Filter
            </button>
            <select className="bg-[#163022] border border-white/10 rounded-xl px-4 py-2.5 text-[#f5f0e6] focus:outline-none appearance-none cursor-pointer hidden md:block">
              <option className="bg-[#163022]">All Statuses</option>
              <option className="bg-[#163022]">Pending Review</option>
              <option className="bg-[#163022]">Published</option>
              <option className="bg-[#163022]">Rejected</option>
            </select>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-[#1c3d2b]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#163022]/60 text-[#f5f0e6]/60 text-sm border-b border-white/10">
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Author</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date Submitted</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[#f5f0e6] text-sm">
                {filteredSubmissions.length > 0 ? filteredSubmissions.map((item: any) => {
                  const dateString = item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date';
                  return (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-4 font-medium max-w-[250px] truncate" title={item.title}>{item.title}</td>
                    <td className="p-4 text-[#f5f0e6]/70">{item.category}</td>
                    <td className="p-4 text-[#f5f0e6]/70">{item.author}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        item.status === 'Published' ? 'bg-[#84cc16]/20 text-[#84cc16] border-[#84cc16]/30' :
                        item.status === 'Pending Review' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                        item.status === 'Rejected' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                        'bg-white/10 text-[#f5f0e6]/70 border-white/20'
                      }`}>
                        {item.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-4 text-[#f5f0e6]/70">{dateString}</td>
                    <td className="p-4 text-right flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      
                      {item.status !== 'Published' && (
                        <button onClick={() => handleUpdateStatus(item.id, 'Published')} className="p-2 hover:bg-[#84cc16]/10 rounded-lg text-[#f5f0e6]/70 hover:text-[#84cc16] transition-colors" title="Approve & Publish">
                          <CheckCircle size={16} />
                        </button>
                      )}
                      
                      {item.status !== 'Rejected' && (
                        <button onClick={() => handleUpdateStatus(item.id, 'Rejected')} className="p-2 hover:bg-orange-500/10 rounded-lg text-[#f5f0e6]/70 hover:text-orange-400 transition-colors" title="Reject">
                          <XCircle size={16} />
                        </button>
                      )}

                      <button className="p-2 hover:bg-blue-500/10 rounded-lg text-[#f5f0e6]/70 hover:text-blue-400 transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-[#f5f0e6]/70 hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )}) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#f5f0e6]/50">No research submissions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-white/10 bg-[#163022]/60 flex items-center justify-between text-sm text-[#f5f0e6]/60">
            <span>Showing {filteredSubmissions.length} entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 rounded-lg bg-[#84cc16] text-[#0f2317] font-semibold transition-colors">1</button>
              <button className="px-3 py-1 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
