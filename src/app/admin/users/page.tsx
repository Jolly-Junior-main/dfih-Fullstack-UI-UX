"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Trash2, Shield, Mail, CheckCircle2, XCircle, FileText, User as UserIcon, Building2, Calendar, Check, X, ExternalLink } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy, updateDoc } from "firebase/firestore"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [submissions, setSubmissions] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All Roles")
  const [statusFilter, setStatusFilter] = useState("All Statuses")

  // Modal states
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    institution: "",
    role: "Contributor",
    status: "Active"
  })
  const [submittingUser, setSubmittingUser] = useState(false)

  // Listen to users
  useEffect(() => {
    const qUsers = query(collection(db, "users"), orderBy("createdAt", "desc"))
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }, (err) => console.error("Error fetching users:", err))

    // Listen to research submissions
    const qSubs = query(collection(db, "research_submissions"), orderBy("createdAt", "desc"))
    const unsubSubs = onSnapshot(qSubs, (snapshot) => {
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }, (err) => console.error("Error fetching submissions:", err))

    return () => {
      unsubUsers()
      unsubSubs()
    }
  }, [])

  // Keep selectedUser in sync if updated
  useEffect(() => {
    if (selectedUser) {
      const refreshed = users.find(u => u.id === selectedUser.id)
      if (refreshed) setSelectedUser(refreshed)
    }
  }, [users])

  const getUserResearches = (userEmail: string, userName?: string) => {
    const emailLower = (userEmail || "").toLowerCase()
    const nameLower = (userName || "").toLowerCase()
    return submissions.filter((sub: any) => {
      const subUserEmail = (sub.userEmail || "").toLowerCase()
      const subAuthorEmail = (sub.authorEmail || "").toLowerCase()
      const subAuthor = (sub.author || "").toLowerCase()
      return (
        (emailLower && (subUserEmail === emailLower || subAuthorEmail === emailLower)) ||
        (nameLower && subAuthor === nameLower)
      )
    })
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUser.name.trim() || !newUser.email.trim()) return

    try {
      setSubmittingUser(true)
      const cleanEmail = newUser.email.trim().toLowerCase()
      await addDoc(collection(db, "users"), {
        name: newUser.name.trim(),
        email: cleanEmail,
        institution: newUser.institution.trim() || "Independent Forestry Researcher",
        role: newUser.role,
        status: newUser.status,
        lastActive: "Just now",
        createdAt: serverTimestamp()
      })
      setIsAddUserOpen(false)
      setNewUser({
        name: "",
        email: "",
        institution: "",
        role: "Contributor",
        status: "Active"
      })
    } catch (err) {
      console.error("Error adding user:", err)
      alert("Failed to add user.")
    } finally {
      setSubmittingUser(false)
    }
  }

  const handleDeleteUser = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete user account "${name}"?`)) {
      await deleteDoc(doc(db, "users", id))
      if (selectedUser?.id === id) setSelectedUser(null)
    }
  }

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole })
    } catch (err) {
      console.error("Error updating role:", err)
      alert("Failed to update role.")
    }
  }

  const handleUpdateUserStatus = async (userId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "users", userId), { status: newStatus })
    } catch (err) {
      console.error("Error updating status:", err)
      alert("Failed to update status.")
    }
  }

  const handleUpdateResearchStatus = async (researchId: string, status: string) => {
    try {
      await updateDoc(doc(db, "research_submissions", researchId), { status })
    } catch (err) {
      console.error("Error updating research status:", err)
      alert("Failed to update submission status.")
    }
  }

  const handleDeleteResearch = async (researchId: string, title: string) => {
    if (confirm(`Delete submission "${title}"?`)) {
      try {
        await deleteDoc(doc(db, "research_submissions", researchId))
      } catch (err) {
        console.error("Error deleting research:", err)
        alert("Failed to delete research.")
      }
    }
  }

  const filteredUsers = users.filter((u: any) => {
    const matchesSearch = 
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.institution?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = roleFilter === "All Roles" || u.role === roleFilter
    const matchesStatus = statusFilter === "All Statuses" || u.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const selectedUserResearches = selectedUser ? getUserResearches(selectedUser.email, selectedUser.name) : []

  return (
    <main className="p-6 md:p-10 bg-[#163022] min-h-screen text-[#f5f0e6]">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#f5f0e6]">Users &amp; Researches</h1>
            <p className="text-[#cbd5e1]/70 mt-1">
              Manage registered researchers, inspect their submitted papers, and assign permissions.
            </p>
          </div>
          <button 
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#84cc16]/20 cursor-pointer shrink-0"
          >
            <Plus size={18} />
            Add Researcher
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
              placeholder="Search researchers by name, email, or institution..." 
              className="w-full bg-[#12281b] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[#f5f0e6] placeholder:text-white/40 focus:outline-none focus:border-[#84cc16] transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-[#f5f0e6] focus:outline-none cursor-pointer"
            >
              <option value="All Roles">All Roles</option>
              <option value="Administrator">Administrator</option>
              <option value="Reviewer">Reviewer</option>
              <option value="Contributor">Contributor</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-[#f5f0e6] focus:outline-none cursor-pointer"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#1c3d2b]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#12281b]/80 text-[#cbd5e1]/80 text-xs uppercase tracking-wider border-b border-white/10">
                  <th className="p-4 font-bold">Researcher</th>
                  <th className="p-4 font-bold">Institution</th>
                  <th className="p-4 font-bold">Role</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Researches</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[#f5f0e6] text-sm divide-y divide-white/5">
                {filteredUsers.length > 0 ? filteredUsers.map((user: any) => {
                  const userPapers = getUserResearches(user.email, user.name)
                  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U"

                  return (
                    <tr 
                      key={user.id} 
                      className="hover:bg-white/5 transition-colors group cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#12281b] border border-[#84cc16]/40 flex items-center justify-center text-[#84cc16] font-extrabold shrink-0">
                            {initial}
                          </div>
                          <div>
                            <span className="font-semibold text-[#f5f0e6] group-hover:text-[#84cc16] transition-colors">
                              {user.name}
                            </span>
                            <span className="text-xs text-[#cbd5e1]/60 flex items-center gap-1 mt-0.5">
                              <Mail size={12} /> {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-[#cbd5e1]/80 text-xs">
                        {user.institution || "Forestry Research Department"}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          {user.role === 'Administrator' ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#84cc16]/20 text-[#84cc16] border border-[#84cc16]/30 flex items-center gap-1">
                              <Shield size={12} /> Administrator
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-[#cbd5e1] border border-white/10">
                              {user.role || "Contributor"}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                          {user.status === 'Active' && (
                            <span className="flex items-center gap-1 text-[#84cc16]">
                              <CheckCircle2 size={14} /> Active
                            </span>
                          )}
                          {user.status === 'Pending' && (
                            <span className="flex items-center gap-1 text-yellow-400">
                              <div className="w-2 h-2 rounded-full bg-yellow-400" /> Pending
                            </span>
                          )}
                          {user.status === 'Suspended' && (
                            <span className="flex items-center gap-1 text-red-400">
                              <XCircle size={14} /> Suspended
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          userPapers.length > 0 
                            ? 'bg-[#84cc16]/15 text-[#84cc16] border border-[#84cc16]/30' 
                            : 'bg-white/5 text-[#cbd5e1]/50 border border-white/10'
                        }`}>
                          <FileText size={12} />
                          {userPapers.length} {userPapers.length === 1 ? 'Paper' : 'Papers'}
                        </span>
                      </td>

                      <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end items-center gap-2">
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="px-3 py-1.5 rounded-xl bg-[#84cc16]/15 hover:bg-[#84cc16] text-[#84cc16] hover:text-[#0f2317] border border-[#84cc16]/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <ExternalLink size={13} />
                            View Profile &amp; Researches
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id, user.name)} 
                            className="p-2 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-[#cbd5e1]/50">
                      No researchers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-white/10 bg-[#12281b]/50 flex items-center justify-between text-xs text-[#cbd5e1]/70">
            <span>Showing {filteredUsers.length} researchers</span>
            <span>Total research papers linked: {submissions.length}</span>
          </div>
        </div>

      </div>

      {/* MODAL 1: USER PROFILE & RESEARCHES DRAWER */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#1c3d2b] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[92vh] relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#12281b] border-2 border-[#84cc16] flex items-center justify-center text-[#84cc16] text-2xl font-black shadow-lg">
                  {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-bold text-[#f5f0e6]">{selectedUser.name}</h2>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#84cc16]/20 text-[#84cc16] border border-[#84cc16]/30">
                      {selectedUser.role}
                    </span>
                  </div>
                  <p className="text-xs text-[#cbd5e1]/70 mt-1 flex items-center gap-1">
                    <Mail size={12} /> {selectedUser.email}
                  </p>
                  <p className="text-xs text-[#cbd5e1]/60 mt-0.5 flex items-center gap-1">
                    <Building2 size={12} /> {selectedUser.institution || "Forestry Research Department"}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedUser(null)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbd5e1] hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Permissions Controls */}
            <div className="py-6 border-b border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#cbd5e1]/80 mb-2 block uppercase tracking-wider">
                  Account Role
                </label>
                <div className="flex gap-2">
                  {["Contributor", "Reviewer", "Administrator"].map((r) => (
                    <button
                      key={r}
                      onClick={() => handleUpdateUserRole(selectedUser.id, r)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedUser.role === r 
                          ? "bg-[#84cc16] text-[#0f2317] shadow-md"
                          : "bg-[#12281b] border border-white/10 text-[#cbd5e1] hover:text-white"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#cbd5e1]/80 mb-2 block uppercase tracking-wider">
                  Account Status
                </label>
                <div className="flex gap-2">
                  {["Active", "Pending", "Suspended"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleUpdateUserStatus(selectedUser.id, s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedUser.status === s 
                          ? s === "Active" ? "bg-[#84cc16] text-[#0f2317]" : s === "Pending" ? "bg-yellow-400 text-[#0f2317]" : "bg-red-400 text-[#0f2317]"
                          : "bg-[#12281b] border border-white/10 text-[#cbd5e1] hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Researches Under This Profile */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#f5f0e6] flex items-center gap-2">
                  <FileText className="text-[#84cc16]" size={18} />
                  Researches Under Profile ({selectedUserResearches.length})
                </h3>
                <span className="text-xs text-[#cbd5e1]/60">
                  Direct moderation controls
                </span>
              </div>

              {selectedUserResearches.length > 0 ? (
                <div className="space-y-4">
                  {selectedUserResearches.map((res: any) => {
                    const dateStr = res.createdAt?.toDate 
                      ? res.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : (res.date || "Recent")

                    const statusLower = (res.status || "Pending Review").toLowerCase()
                    let badgeColor = "text-yellow-400 bg-yellow-400/10 border-yellow-400/30"
                    if (statusLower === "published") {
                      badgeColor = "text-[#84cc16] bg-[#84cc16]/10 border-[#84cc16]/30"
                    } else if (statusLower.includes("revision") || statusLower === "rejected") {
                      badgeColor = "text-red-400 bg-red-400/10 border-red-400/30"
                    }

                    return (
                      <div 
                        key={res.id} 
                        className="p-5 rounded-2xl bg-[#12281b]/70 border border-white/10 hover:border-white/20 transition-all shadow-md"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                          <div>
                            <h4 className="text-base font-bold text-[#f5f0e6]">{res.title}</h4>
                            <div className="flex items-center gap-2 mt-1 text-xs text-[#cbd5e1]/60 flex-wrap">
                              <span className="text-[#84cc16] font-semibold">{res.category || "General Forestry"}</span>
                              <span>&bull;</span>
                              <span>Submitted {dateStr}</span>
                              {res.year && <span>&bull; Year: {res.year}</span>}
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border self-start ${badgeColor}`}>
                            {res.status || "Pending Review"}
                          </span>
                        </div>

                        {res.body && (
                          <p className="text-xs text-[#cbd5e1]/80 mt-2 line-clamp-2 leading-relaxed bg-[#163022]/60 p-3 rounded-xl border border-white/5">
                            {res.body}
                          </p>
                        )}

                        {/* Direct moderation actions for this paper */}
                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                          <span className="text-[11px] text-[#cbd5e1]/50">Actions:</span>
                          <div className="flex items-center gap-2">
                            {res.status !== "Published" && (
                              <button
                                onClick={() => handleUpdateResearchStatus(res.id, "Published")}
                                className="px-3 py-1 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                              >
                                <Check size={12} strokeWidth={3} /> Approve / Publish
                              </button>
                            )}
                            {res.status !== "Rejected" && (
                              <button
                                onClick={() => handleUpdateResearchStatus(res.id, "Rejected")}
                                className="px-3 py-1 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <X size={12} strokeWidth={3} /> Reject
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteResearch(res.id, res.title)}
                              className="px-2.5 py-1 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        </div>

                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-10 px-4 rounded-2xl bg-[#12281b]/50 border border-white/5">
                  <FileText className="w-10 h-10 text-[#cbd5e1]/30 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#f5f0e6]">No research submissions found</p>
                  <p className="text-xs text-[#cbd5e1]/60 mt-1 max-w-sm mx-auto">
                    This researcher has not uploaded any papers or datasets to the DFIH platform yet.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-6 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: ADD / INVITE RESEARCHER */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#1c3d2b] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#f5f0e6]">Add Researcher</h2>
                <p className="text-xs text-[#cbd5e1]/70 mt-0.5">Register a new researcher account to the database.</p>
              </div>
              <button 
                onClick={() => setIsAddUserOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbd5e1] hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Dr. Elena Vance"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="elena.vance@forestry.org"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">Organization / Institution</label>
                <input 
                  type="text" 
                  placeholder="National Forestry Institute"
                  value={newUser.institution}
                  onChange={(e) => setNewUser({...newUser, institution: e.target.value})}
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">Role</label>
                  <select 
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full bg-[#12281b] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-[#f5f0e6] focus:outline-none"
                  >
                    <option value="Contributor">Contributor</option>
                    <option value="Reviewer">Reviewer</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">Status</label>
                  <select 
                    value={newUser.status}
                    onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                    className="w-full bg-[#12281b] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-[#f5f0e6] focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#cbd5e1] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingUser}
                  className="px-5 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submittingUser ? "Creating..." : "Save Researcher"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </main>
  )
}
