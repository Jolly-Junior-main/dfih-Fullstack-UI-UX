"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  Plus, 
  Trash2, 
  Shield, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  User as UserIcon, 
  Building2, 
  Calendar, 
  Check, 
  X, 
  ExternalLink,
  RotateCcw,
  Sparkles
} from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy, updateDoc } from "firebase/firestore"

interface UserRecord {
  id: string
  name: string
  email: string
  institution: string
  role: "Contributor" | "Reviewer" | "Administrator"
  status: "Active" | "Pending" | "Suspended"
  avatar?: string
  lastActive?: string
  createdAt?: any
}

interface ResearchItem {
  id: string
  title: string
  author: string
  authorEmail?: string
  userEmail?: string
  category: string
  year?: string
  date?: string
  status: string
  body?: string
}

const DEFAULT_SAMPLE_USERS: UserRecord[] = [
  {
    id: "usr-sample-1",
    name: "Dr. Eleanor Vance, Ph.D.",
    email: "eleanor.vance@cifor.org",
    institution: "Center for International Forestry Research (CIFOR)",
    role: "Reviewer",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
    lastActive: "10 mins ago"
  },
  {
    id: "usr-sample-2",
    name: "Prof. Marcus Thorne",
    email: "m.thorne@nordicforestry.org",
    institution: "Nordic Forestry & Ecological Research Lab",
    role: "Contributor",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastActive: "1 hour ago"
  },
  {
    id: "usr-sample-3",
    name: "Dr. Amina Diallo",
    email: "amina.diallo@afri-forests.org",
    institution: "African Forest Landscape Restoration Initiative",
    role: "Reviewer",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastActive: "Yesterday"
  },
  {
    id: "usr-sample-4",
    name: "Liam Jenkins, M.Sc.",
    email: "l.jenkins@gov.bc.forestry.ca",
    institution: "British Columbia Ministry of Forests",
    role: "Contributor",
    status: "Pending",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    lastActive: "3 days ago"
  }
]

const DEFAULT_SAMPLE_RESEARCHES: ResearchItem[] = [
  {
    id: "res-sample-1",
    title: "Silviculture Practices in Boreal Forests",
    author: "Dr. Eleanor Vance, Ph.D.",
    authorEmail: "eleanor.vance@cifor.org",
    userEmail: "eleanor.vance@cifor.org",
    category: "Silviculture & Forest Management",
    year: "2025",
    date: "Oct 12, 2026",
    status: "Published",
    body: "Comprehensive 5-year empirical trial evaluating canopy regeneration and root mass density under varying selective cutting regimes in sub-arctic boreal ecosystems."
  },
  {
    id: "res-sample-2",
    title: "LiDAR Telemetry for Canopy Biomass In Congo Basin",
    author: "Dr. Eleanor Vance, Ph.D.",
    authorEmail: "eleanor.vance@cifor.org",
    userEmail: "eleanor.vance@cifor.org",
    category: "Climate Change Adaptation & Carbon Accounting",
    year: "2025",
    date: "Sep 28, 2026",
    status: "Published",
    body: "High-density airborne LiDAR mapping quantifying aboveground carbon stocks across protected tropical lowland rain forests."
  },
  {
    id: "res-sample-3",
    title: "Global Timber Trade Statistics 2025",
    author: "Prof. Marcus Thorne",
    authorEmail: "m.thorne@nordicforestry.org",
    userEmail: "m.thorne@nordicforestry.org",
    category: "Wood Science & Timber Technology",
    year: "2025",
    date: "Oct 10, 2026",
    status: "Pending Review",
    body: "Cross-border softwood and hardwood trade matrices documenting tariff impacts and chain-of-custody compliance."
  },
  {
    id: "res-sample-4",
    title: "Sub-Saharan Silviculture Guidelines",
    author: "Prof. Marcus Thorne",
    authorEmail: "m.thorne@nordicforestry.org",
    userEmail: "m.thorne@nordicforestry.org",
    category: "Community Forestry & Agroforestry Systems",
    year: "2024",
    date: "Aug 15, 2026",
    status: "Published",
    body: "Field manual for community-managed woodlots in arid and semi-arid savanna transitions."
  },
  {
    id: "res-sample-5",
    title: "Community Forestry Case Studies",
    author: "Dr. Amina Diallo",
    authorEmail: "amina.diallo@afri-forests.org",
    userEmail: "amina.diallo@afri-forests.org",
    category: "Community Forestry & Agroforestry Systems",
    year: "2024",
    date: "Oct 05, 2026",
    status: "Pending Review",
    body: "Comparative analysis of participatory natural resource agreements in East and West African communities."
  },
  {
    id: "res-sample-6",
    title: "Old-Growth Douglas Fir Canopy Census",
    author: "Liam Jenkins, M.Sc.",
    authorEmail: "l.jenkins@gov.bc.forestry.ca",
    userEmail: "l.jenkins@gov.bc.forestry.ca",
    category: "Forest Ecology, Wildlife & Biodiversity",
    year: "2026",
    date: "Oct 14, 2026",
    status: "Pending Review",
    body: "Inventory of microclimate niches and arboreal lichen biodiversity across coastal British Columbia temperate rain forests."
  }
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [submissions, setSubmissions] = useState<ResearchItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All Roles")
  const [statusFilter, setStatusFilter] = useState("All Statuses")

  // Modal states
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    institution: "",
    role: "Contributor" as const,
    status: "Active" as const
  })
  const [submittingUser, setSubmittingUser] = useState(false)

  // Listen to users & submissions
  useEffect(() => {
    const qUsers = query(collection(db, "users"), orderBy("createdAt", "desc"))
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      if (!snapshot.empty) {
        setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserRecord)))
      } else {
        loadLocalUsers()
      }
    }, (err) => {
      console.warn("Firestore users fallback:", err)
      loadLocalUsers()
    })

    const qSubs = query(collection(db, "research_submissions"), orderBy("createdAt", "desc"))
    const unsubSubs = onSnapshot(qSubs, (snapshot) => {
      if (!snapshot.empty) {
        setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ResearchItem)))
      } else {
        loadLocalResearches()
      }
    }, (err) => {
      console.warn("Firestore submissions fallback:", err)
      loadLocalResearches()
    })

    return () => {
      unsubUsers()
      unsubSubs()
    }
  }, [])

  const loadLocalUsers = () => {
    try {
      const stored = localStorage.getItem("dfih_admin_users")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUsers(parsed)
          return
        }
      }
    } catch (e) {
      console.error(e)
    }
    setUsers(DEFAULT_SAMPLE_USERS)
    localStorage.setItem("dfih_admin_users", JSON.stringify(DEFAULT_SAMPLE_USERS))
  }

  const loadLocalResearches = () => {
    try {
      const stored = localStorage.getItem("dfih_admin_submissions")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSubmissions(parsed)
          return
        }
      }
    } catch (e) {
      console.error(e)
    }
    setSubmissions(DEFAULT_SAMPLE_RESEARCHES)
    localStorage.setItem("dfih_admin_submissions", JSON.stringify(DEFAULT_SAMPLE_RESEARCHES))
  }

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
        (nameLower && subAuthor.includes(nameLower) || nameLower.includes(subAuthor))
      )
    })
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUser.name.trim() || !newUser.email.trim()) return

    try {
      setSubmittingUser(true)
      const cleanEmail = newUser.email.trim().toLowerCase()
      const payload = {
        name: newUser.name.trim(),
        email: cleanEmail,
        institution: newUser.institution.trim() || "Independent Forestry Researcher",
        role: newUser.role,
        status: newUser.status,
        lastActive: "Just now"
      }

      try {
        await addDoc(collection(db, "users"), {
          ...payload,
          createdAt: serverTimestamp()
        })
      } catch {
        const userObj: UserRecord = {
          id: `usr-${Date.now()}`,
          ...payload
        }
        const updated = [userObj, ...users]
        setUsers(updated)
        localStorage.setItem("dfih_admin_users", JSON.stringify(updated))
      }

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
      if (id.startsWith("usr-sample-") || id.startsWith("usr-")) {
        const updated = users.filter(u => u.id !== id)
        setUsers(updated)
        localStorage.setItem("dfih_admin_users", JSON.stringify(updated))
      } else {
        try {
          await deleteDoc(doc(db, "users", id))
        } catch {
          const updated = users.filter(u => u.id !== id)
          setUsers(updated)
          localStorage.setItem("dfih_admin_users", JSON.stringify(updated))
        }
      }
      if (selectedUser?.id === id) setSelectedUser(null)
    }
  }

  const handleUpdateUserRole = async (userId: string, newRole: any) => {
    if (userId.startsWith("usr-sample-") || userId.startsWith("usr-")) {
      const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u)
      setUsers(updated)
      localStorage.setItem("dfih_admin_users", JSON.stringify(updated))
    } else {
      try {
        await updateDoc(doc(db, "users", userId), { role: newRole })
      } catch {
        const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u)
        setUsers(updated)
        localStorage.setItem("dfih_admin_users", JSON.stringify(updated))
      }
    }
  }

  const handleUpdateUserStatus = async (userId: string, newStatus: any) => {
    if (userId.startsWith("usr-sample-") || userId.startsWith("usr-")) {
      const updated = users.map(u => u.id === userId ? { ...u, status: newStatus } : u)
      setUsers(updated)
      localStorage.setItem("dfih_admin_users", JSON.stringify(updated))
    } else {
      try {
        await updateDoc(doc(db, "users", userId), { status: newStatus })
      } catch {
        const updated = users.map(u => u.id === userId ? { ...u, status: newStatus } : u)
        setUsers(updated)
        localStorage.setItem("dfih_admin_users", JSON.stringify(updated))
      }
    }
  }

  const handleUpdateResearchStatus = async (researchId: string, status: string) => {
    if (researchId.startsWith("res-sample-") || researchId.startsWith("res-")) {
      const updated = submissions.map(s => s.id === researchId ? { ...s, status } : s)
      setSubmissions(updated)
      localStorage.setItem("dfih_admin_submissions", JSON.stringify(updated))
    } else {
      try {
        await updateDoc(doc(db, "research_submissions", researchId), { status })
      } catch {
        const updated = submissions.map(s => s.id === researchId ? { ...s, status } : s)
        setSubmissions(updated)
        localStorage.setItem("dfih_admin_submissions", JSON.stringify(updated))
      }
    }
  }

  const handleDeleteResearch = async (researchId: string, title: string) => {
    if (confirm(`Delete submission "${title}"?`)) {
      if (researchId.startsWith("res-sample-") || researchId.startsWith("res-")) {
        const updated = submissions.filter(s => s.id !== researchId)
        setSubmissions(updated)
        localStorage.setItem("dfih_admin_submissions", JSON.stringify(updated))
      } else {
        try {
          await deleteDoc(doc(db, "research_submissions", researchId))
        } catch {
          const updated = submissions.filter(s => s.id !== researchId)
          setSubmissions(updated)
          localStorage.setItem("dfih_admin_submissions", JSON.stringify(updated))
        }
      }
    }
  }

  const handleResetDefaults = () => {
    if (confirm("Reset and load official sample researchers and linked researches?")) {
      setUsers(DEFAULT_SAMPLE_USERS)
      setSubmissions(DEFAULT_SAMPLE_RESEARCHES)
      localStorage.setItem("dfih_admin_users", JSON.stringify(DEFAULT_SAMPLE_USERS))
      localStorage.setItem("dfih_admin_submissions", JSON.stringify(DEFAULT_SAMPLE_RESEARCHES))
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
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#84cc16] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
              Researcher Accounts &amp; Attribution
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#f5f0e6]">
              Users &amp; Researches
            </h1>
            <p className="text-[#cbd5e1]/70 mt-1">
              Manage registered researchers, inspect their submitted papers, assign roles, and moderate submissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="px-4 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 text-xs font-semibold text-[#cbd5e1] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              title="Reset demo users & researches"
            >
              <RotateCcw size={14} />
              Reset Demo Users
            </button>
            <button 
              onClick={() => setIsAddUserOpen(true)}
              className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#84cc16]/20 cursor-pointer shrink-0"
            >
              <Plus size={18} />
              Add Researcher
            </button>
          </div>
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
                          <div className="w-10 h-10 rounded-full bg-[#12281b] border border-[#84cc16]/40 flex items-center justify-center text-[#84cc16] font-extrabold shrink-0 overflow-hidden">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                              initial
                            )}
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
                          ) : user.role === 'Reviewer' ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              Reviewer
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
                      No researchers found matching your search. Click "Reset Demo Users" to load sample accounts!
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

      {/* MODAL: USER PROFILE & RESEARCHES DRAWER */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#1c3d2b] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[92vh] relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#12281b] border-2 border-[#84cc16] flex items-center justify-center text-[#84cc16] text-2xl font-black shadow-lg overflow-hidden shrink-0">
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full object-cover" />
                  ) : (
                    selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : "U"
                  )}
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
                              <span>Submitted {res.date || "Recent"}</span>
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

      {/* MODAL: ADD RESEARCHER */}
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
                    onChange={(e) => setNewUser({...newUser, role: e.target.value as any})}
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
                    onChange={(e) => setNewUser({...newUser, status: e.target.value as any})}
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
