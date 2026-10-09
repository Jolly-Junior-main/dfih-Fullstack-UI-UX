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
    <main className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-[#0f172a]">Research Submissions</h1>
            <p className="text-[#0f172a]/60 mt-1">Review, approve, and manage research submitted by users.</p>
          </div>
          <div className="flex gap-4 items-center">
            <a 
              href="/admin/research/add" 
              className="flex items-center justify-center bg-[#0f172a] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Add Research
            </a>
            <div className="flex items-center gap-4 bg-[#84cc16]/10 px-4 py-2 rounded-xl border border-white/20">
              <div className="text-sm">
                <span className="font-bold text-[#84cc16] text-xl">{submissions.length}</span>
                <span className="text-[#0f172a]/60 ml-2">Total Submissions</span>
              </div>
              <div className="w-px h-8 bg-white/20 mx-2"></div>
              <div className="text-sm">
                <span className="font-bold text-yellow-500 text-xl">
                  {submissions.filter(s => s.status === 'Pending Review').length}
                </span>
                <span className="text-[#0f172a]/60 ml-2">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-[#84cc16]/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-8 shadow-lg flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0f172a]/60" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or category..." 
              className="w-full bg-[#84cc16]/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[#0f172a] placeholder:text-[#0f172a]/60 focus:outline-none focus:border-[#84cc16]/50 transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-[#84cc16]/5 hover:bg-[#84cc16]/10 border border-white/10 rounded-xl px-4 py-2.5 text-[#0f172a] transition-colors">
              <Filter size={18} />
              Filter
            </button>
            <select className="bg-[#84cc16]/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#0f172a] focus:outline-none appearance-none cursor-pointer hidden md:block">
              <option>All Statuses</option>
              <option>Pending Review</option>
              <option>Published</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-[#84cc16]/15 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#84cc16]/20 text-[#0f172a]/60 text-sm border-b border-white/10">
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Author</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date Submitted</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[#0f172a] text-sm">
                {filteredSubmissions.length > 0 ? filteredSubmissions.map((item: any) => {
                  const dateString = item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date';
                  return (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-[#84cc16]/5 transition-colors group">
                    <td className="p-4 font-medium max-w-[250px] truncate" title={item.title}>{item.title}</td>
                    <td className="p-4 text-[#0f172a]/70">{item.category}</td>
                    <td className="p-4 text-[#0f172a]/70">{item.author}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        item.status === 'Published' ? 'bg-[#84cc16]/20 text-[#84cc16] border-[#84cc16]/30' :
                        item.status === 'Pending Review' ? 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30' :
                        item.status === 'Rejected' ? 'bg-red-500/20 text-red-600 border-red-500/30' :
                        'bg-[#84cc16]/10 text-[#0f172a]/70 border-white/20'
                      }`}>
                        {item.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-4 text-[#0f172a]/70">{dateString}</td>
                    <td className="p-4 text-right flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      
                      {item.status !== 'Published' && (
                        <button onClick={() => handleUpdateStatus(item.id, 'Published')} className="p-2 hover:bg-[#84cc16]/10 rounded-lg text-[#0f172a]/70 hover:text-[#84cc16] transition-colors" title="Approve & Publish">
                          <CheckCircle size={16} />
                        </button>
                      )}
                      
                      {item.status !== 'Rejected' && (
                        <button onClick={() => handleUpdateStatus(item.id, 'Rejected')} className="p-2 hover:bg-orange-500/10 rounded-lg text-[#0f172a]/70 hover:text-orange-500 transition-colors" title="Reject">
                          <XCircle size={16} />
                        </button>
                      )}

                      <button className="p-2 hover:bg-[#84cc16]/10 rounded-lg text-[#0f172a]/70 hover:text-blue-500 transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-[#0f172a]/70 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )}) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#0f172a]/50">No research submissions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-white/10 bg-[#84cc16]/10 flex items-center justify-between text-sm text-[#0f172a]/60">
            <span>Showing {filteredSubmissions.length} entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg hover:bg-[#84cc16]/10 transition-colors disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 rounded-lg bg-[#84cc16]/10 text-white hover:text-black transition-colors">1</button>
              <button className="px-3 py-1 rounded-lg hover:bg-[#84cc16]/10 transition-colors disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
