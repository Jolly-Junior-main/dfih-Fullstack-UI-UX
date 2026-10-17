"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  UserCheck, 
  FileCheck, 
  Clock, 
  Calendar, 
  User, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  X,
  Plus,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Copy,
  Mail,
  Send,
  Link2,
  Share2
} from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, deleteDoc, doc, updateDoc, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore"
import Link from "next/link"

interface ResearchSubmission {
  id: string
  title: string
  author: string
  category: string
  status: string
  date?: string
  createdAt?: any
  assignedReviewer?: string
  priority?: string
  reviewDeadline?: string
  reviewerNotes?: string
  body?: string
}

const ACCREDITED_REVIEWERS = [
  { name: "Dr. Eleanor Vance, Ph.D.", expertise: "Silviculture & Boreal Ecology", email: "eleanor.vance@cifor.org" },
  { name: "Dr. Amina Diallo", expertise: "Community Forestry & Agroforestry", email: "amina.diallo@afri-forests.org" },
  { name: "Prof. Marcus Thorne", expertise: "Wood Science & Timber Technology", email: "m.thorne@nordicforestry.org" },
  { name: "Dr. L. Jenkins", expertise: "Forest Ecology, Wildlife & Biodiversity", email: "l.jenkins@gov.bc.forestry.ca" }
]

const SAMPLE_SUBMISSIONS: ResearchSubmission[] = [
  {
    id: "sub-1",
    title: "Silviculture Practices in Boreal Forests",
    author: "Dr. L. Jenkins",
    category: "Silviculture & Sustainable Forest Management",
    status: "Assigned for Review",
    assignedReviewer: "Dr. Eleanor Vance, Ph.D.",
    priority: "High Priority",
    reviewDeadline: "2026-10-25",
    date: "Oct 12, 2026",
    body: "Empirical trial evaluating canopy regeneration and root mass density under varying selective cutting regimes in sub-arctic boreal ecosystems."
  },
  {
    id: "sub-2",
    title: "Global Timber Trade Statistics 2025",
    author: "FAO Forestry Dept",
    category: "Wood Science & Timber Technology",
    status: "Pending Review",
    priority: "Standard",
    date: "Oct 14, 2026",
    body: "Cross-border trade metrics and volume indices documenting tariff implications across global timber supply chains."
  },
  {
    id: "sub-3",
    title: "Community Forestry Case Studies",
    author: "M. Ramirez",
    category: "Community Forestry & Agroforestry Systems",
    status: "Pending Review",
    priority: "Standard",
    date: "Oct 15, 2026",
    body: "Comparative field survey of participatory forest management agreements and indigenous harvest yields."
  },
  {
    id: "sub-4",
    title: "Amazon Carbon Density Model",
    author: "Dr. Rachel Thorne",
    category: "Climate Change Adaptation & Carbon Accounting",
    status: "Published",
    assignedReviewer: "Dr. Amina Diallo",
    priority: "High Priority",
    date: "Sep 28, 2026",
    body: "High-density satellite telemetry and LiDAR measurements quantifying canopy carbon pools across the Amazon Basin."
  }
]

export default function AdminResearchPage() {
  const [submissions, setSubmissions] = useState<ResearchSubmission[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [showHowToHelp, setShowHowToHelp] = useState(false)

  // Assignment Modal State
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<ResearchSubmission | null>(null)
  const [assignForm, setAssignForm] = useState({
    reviewerName: ACCREDITED_REVIEWERS[0].name,
    priority: "High Priority",
    deadline: "",
    notes: ""
  })
  const [isAssigning, setIsAssigning] = useState(false)
  const [assignmentNotice, setAssignmentNotice] = useState<string | null>(null)

  // Magic Link Modal State
  const [magicLinkModalOpen, setMagicLinkModalOpen] = useState(false)
  const [magicLinkTarget, setMagicLinkTarget] = useState<ResearchSubmission | null>(null)
  const [magicLinkReviewerName, setMagicLinkReviewerName] = useState("")
  const [magicLinkReviewerEmail, setMagicLinkReviewerEmail] = useState("")
  const [magicLinkCopied, setMagicLinkCopied] = useState(false)
  const [generatedLinkUrl, setGeneratedLinkUrl] = useState("")

  // View Details Modal State
  const [viewDetailsItem, setViewDetailsItem] = useState<ResearchSubmission | null>(null)

  useEffect(() => {
    const q = query(collection(db, "research_submissions"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ResearchSubmission)))
      } else {
        loadLocalSubmissions()
      }
    }, (err) => {
      console.warn("Firestore submissions error, loading local fallback:", err)
      loadLocalSubmissions()
    })
    return () => unsubscribe()
  }, [])

  const loadLocalSubmissions = () => {
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
    setSubmissions(SAMPLE_SUBMISSIONS)
    localStorage.setItem("dfih_admin_submissions", JSON.stringify(SAMPLE_SUBMISSIONS))
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      if (id.startsWith("sub-")) {
        const updated = submissions.filter(s => s.id !== id)
        setSubmissions(updated)
        localStorage.setItem("dfih_admin_submissions", JSON.stringify(updated))
      } else {
        try {
          await deleteDoc(doc(db, "research_submissions", id))
        } catch {
          const updated = submissions.filter(s => s.id !== id)
          setSubmissions(updated)
          localStorage.setItem("dfih_admin_submissions", JSON.stringify(updated))
        }
      }
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      if (id.startsWith("sub-")) {
        const updated = submissions.map(s => s.id === id ? { ...s, status: newStatus } : s)
        setSubmissions(updated)
        localStorage.setItem("dfih_admin_submissions", JSON.stringify(updated))
      } else {
        await updateDoc(doc(db, "research_submissions", id), {
          status: newStatus
        })
      }
    } catch (e) {
      console.error("Error updating status:", e)
      alert("Failed to update status")
    }
  }

  // Open Assign Reviewer Modal
  const handleOpenAssign = (item: ResearchSubmission) => {
    setSelectedSubmission(item)
    // Default deadline to 14 days from today
    const inTwoWeeks = new Date()
    inTwoWeeks.setDate(inTwoWeeks.getDate() + 14)
    const deadlineStr = inTwoWeeks.toISOString().split("T")[0]

    setAssignForm({
      reviewerName: item.assignedReviewer || ACCREDITED_REVIEWERS[0].name,
      priority: item.priority || "High Priority",
      deadline: item.reviewDeadline || deadlineStr,
      notes: item.reviewerNotes || `Please evaluate according to the official DFIH Peer-Review Evaluation Form score sheet criteria.`
    })
    setAssignModalOpen(true)
  }

  // Confirm Assignment
  const handleConfirmAssignment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSubmission) return

    setIsAssigning(true)
    const updatedStatus = `Assigned for Review`
    const assignmentPayload = {
      assignedReviewer: assignForm.reviewerName,
      priority: assignForm.priority,
      reviewDeadline: assignForm.deadline,
      reviewerNotes: assignForm.notes,
      status: updatedStatus
    }

    try {
      // 1. Update in submissions
      if (selectedSubmission.id.startsWith("sub-")) {
        const updated = submissions.map(s => s.id === selectedSubmission.id ? { ...s, ...assignmentPayload } : s)
        setSubmissions(updated)
        localStorage.setItem("dfih_admin_submissions", JSON.stringify(updated))
      } else {
        await updateDoc(doc(db, "research_submissions", selectedSubmission.id), assignmentPayload)
      }

      // 2. Sync to Reviewer Portal queue in localStorage
      try {
        const reviewerQueueStr = localStorage.getItem("dfih_reviewer_assigned_items")
        const currentQueue = reviewerQueueStr ? JSON.parse(reviewerQueueStr) : []
        const exists = currentQueue.some((q: any) => q.id === selectedSubmission.id || q.title === selectedSubmission.title)
        if (!exists) {
          currentQueue.unshift({
            id: selectedSubmission.id,
            title: selectedSubmission.title,
            author: selectedSubmission.author,
            type: "Research Paper",
            priority: assignForm.priority,
            color: assignForm.priority === "Urgent" 
              ? "text-red-400 border-red-400/30 bg-red-400/10" 
              : "text-amber-400 border-amber-400/30 bg-amber-400/10",
            assignedReviewer: assignForm.reviewerName,
            assignedDate: new Date().toISOString().split("T")[0]
          })
          localStorage.setItem("dfih_reviewer_assigned_items", JSON.stringify(currentQueue))
        }
      } catch (err) {
        console.error("Queue sync error:", err)
      }

      // 3. Log event to system logs
      try {
        const currentLogs = JSON.parse(localStorage.getItem("dfih_system_logs") || "[]")
        const newLog = {
          id: `LOG-${Math.floor(9500 + Math.random() * 400)}`,
          timestamp: new Date().toISOString().replace("T", " ").split(".")[0],
          category: "REVIEWER",
          level: "INFO",
          action: "Reviewer Assigned to Manuscript",
          user: "Admin",
          details: `Assigned '${selectedSubmission.title}' to ${assignForm.reviewerName} (Priority: ${assignForm.priority}, Deadline: ${assignForm.deadline}).`,
          ip: "192.168.1.105",
          resource: selectedSubmission.id
        }
        localStorage.setItem("dfih_system_logs", JSON.stringify([newLog, ...currentLogs]))
      } catch (err) {
        console.error("Log error:", err)
      }

      setAssignModalOpen(false)
      setAssignmentNotice(`✓ Manuscript successfully assigned to ${assignForm.reviewerName}!`)
      setTimeout(() => setAssignmentNotice(null), 5000)

      // Automatically launch the Magic Link modal to enable immediate copying or emailing
      handleOpenMagicLink({
        ...selectedSubmission,
        assignedReviewer: assignForm.reviewerName,
        priority: assignForm.priority,
        reviewDeadline: assignForm.deadline,
        reviewerNotes: assignForm.notes
      })
    } catch (e) {
      console.error("Assignment error:", e)
      alert("Failed to assign reviewer.")
    } finally {
      setIsAssigning(false)
    }
  }

  // Generate & Dispatch Magic Link Logic
  const buildMagicUrl = (item: ResearchSubmission | null, name: string, email: string) => {
    if (!item) return ""
    const baseUrl = typeof window !== "undefined" && window.location.origin
      ? window.location.origin 
      : "https://dfih-frontend.pages.dev"
    const safeId = item.id.replace(/[^a-zA-Z0-9]/g, "")
    const token = `rev_sec_${safeId}_${Math.floor(1000 + Math.random() * 9000)}`
    
    const params = new URLSearchParams({
      docId: item.id,
      token: token,
      reviewer: name,
      email: email,
      title: item.title,
      author: item.author,
      category: item.category
    })

    return `${baseUrl}/reviewer/evaluate?${params.toString()}`
  }

  const handleOpenMagicLink = (item: ResearchSubmission) => {
    setMagicLinkTarget(item)
    const revName = item.assignedReviewer || ACCREDITED_REVIEWERS[0].name
    const matched = ACCREDITED_REVIEWERS.find(r => r.name === revName)
    const email = matched?.email || "reviewer@cifor.org"
    setMagicLinkReviewerName(revName)
    setMagicLinkReviewerEmail(email)
    setMagicLinkCopied(false)
    const url = buildMagicUrl(item, revName, email)
    setGeneratedLinkUrl(url)
    setMagicLinkModalOpen(true)
  }

  const handleReviewerChangeInMagicModal = (name: string) => {
    setMagicLinkReviewerName(name)
    const matched = ACCREDITED_REVIEWERS.find(r => r.name === name)
    const email = matched?.email || "reviewer@cifor.org"
    setMagicLinkReviewerEmail(email)
    if (magicLinkTarget) {
      setGeneratedLinkUrl(buildMagicUrl(magicLinkTarget, name, email))
    }
  }

  const handleCopyMagicLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && generatedLinkUrl) {
      navigator.clipboard.writeText(generatedLinkUrl)
      setMagicLinkCopied(true)
      setTimeout(() => setMagicLinkCopied(false), 3000)
    }
  }

  const handleSendEmailInvitation = () => {
    if (!magicLinkTarget) return
    const subject = encodeURIComponent(`Peer Review Invitation: "${magicLinkTarget.title}" — DFIH Repository`)
    const deadlineLine = magicLinkTarget.reviewDeadline ? `Review Deadline: ${magicLinkTarget.reviewDeadline}\n` : ""
    const priorityLine = magicLinkTarget.priority ? `Priority: ${magicLinkTarget.priority}\n` : ""
    const body = encodeURIComponent(
`Dear ${magicLinkReviewerName},

You have been invited by the DFIH Editorial Board to peer-review the following research submission:

• Manuscript Title: ${magicLinkTarget.title}
• Author: ${magicLinkTarget.author}
• Discipline/Thematic Scope: ${magicLinkTarget.category}
${priorityLine}${deadlineLine}
You can evaluate and submit your score sheet directly without entering passwords using your unique Magic Link below:

${generatedLinkUrl}

Upon opening this link, your reviewer credentials and the evaluation score sheet (DFIH Form Ref: PR-EVAL-2026) will load automatically.

Thank you for contributing to the academic integrity of the Digital Forest Information Hub.

Best regards,
DFIH Editorial Board
https://dfih-frontend.pages.dev`
    )
    window.location.href = `mailto:${magicLinkReviewerEmail}?subject=${subject}&body=${body}`
  }

  const filteredSubmissions = submissions.filter((item: any) => {
    const matchesSearch = 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignedReviewer?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "All Statuses" || item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <main className="p-6 md:p-10 bg-[#163022] min-h-screen text-[#f5f0e6]">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#84cc16] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
              Editorial Workflow
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#f5f0e6]">Research Submissions</h1>
            <p className="text-[#cbd5e1]/70 mt-1">Review, approve, and assign manuscripts to accredited academic peer reviewers.</p>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setShowHowToHelp(!showHowToHelp)}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-[#cbd5e1] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle size={15} className="text-[#84cc16]" />
              {showHowToHelp ? "Hide Guide" : "How to Assign to Reviewer?"}
            </button>

            <Link 
              href="/admin/research/add" 
              className="flex items-center justify-center bg-[#84cc16] text-[#0f2317] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#a3e635] transition-colors shadow-lg shadow-[#84cc16]/20"
            >
              <Plus size={16} className="mr-1" />
              Add Research
            </Link>

            <div className="flex items-center gap-4 bg-[#1c3d2b]/80 px-4 py-2 rounded-xl border border-white/10">
              <div className="text-sm">
                <span className="font-bold text-[#84cc16] text-xl">{submissions.length}</span>
                <span className="text-[#cbd5e1]/70 ml-2">Total</span>
              </div>
              <div className="w-px h-8 bg-white/10 mx-1"></div>
              <div className="text-sm">
                <span className="font-bold text-yellow-400 text-xl">
                  {submissions.filter(s => s.status?.includes("Pending")).length}
                </span>
                <span className="text-[#cbd5e1]/70 ml-2">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* HOW TO ASSIGN & SEND MAGIC LINKS INSTRUCTIONS BANNER */}
        {showHowToHelp && (
          <div className="mb-6 p-6 rounded-3xl bg-[#1c3d2b] border border-[#84cc16]/40 text-[#f5f0e6] shadow-xl animate-in fade-in slide-in-from-top-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#84cc16] flex items-center gap-2">
                  <Sparkles size={18} />
                  How to Assign Manuscripts & Send Magic Links to Reviewers
                </h3>
                <p className="text-xs text-[#cbd5e1] mt-1 leading-relaxed">
                  DFIH provides a seamless, passwordless invitation workflow. Follow these 3 easy steps:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="p-3.5 rounded-2xl bg-[#12281b]/70 border border-white/10">
                    <div className="text-[#84cc16] font-bold text-xs uppercase mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center text-[10px]">1</span>
                      Assign Reviewer
                    </div>
                    <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                      Click <strong className="text-white font-semibold">"Assign Reviewer"</strong>, choose an accredited reviewer, set priority & deadline, and confirm.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#12281b]/70 border border-white/10">
                    <div className="text-[#84cc16] font-bold text-xs uppercase mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center text-[10px]">2</span>
                      Generate Magic Link
                    </div>
                    <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                      Click <strong className="text-white font-semibold">"Send Magic Link"</strong> (or the ✨ icon). The secure, tokenized URL generates immediately.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#12281b]/70 border border-white/10">
                    <div className="text-[#84cc16] font-bold text-xs uppercase mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#84cc16]/20 flex items-center justify-center text-[10px]">3</span>
                      Copy Link or Email
                    </div>
                    <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                      Click <strong className="text-white font-semibold">"Copy Link"</strong> (for WhatsApp/Slack/Teams) or click <strong className="text-white font-semibold">"Send via Email"</strong> to launch an official invitation draft!
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowHowToHelp(false)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbd5e1] cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Success Notice */}
        {assignmentNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/40 text-[#84cc16] text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <CheckCircle size={20} />
            {assignmentNotice}
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-[#1c3d2b]/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-8 shadow-xl flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbd5e1]/60" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, category, or assigned reviewer..." 
              className="w-full bg-[#12281b] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[#f5f0e6] placeholder:text-white/40 focus:outline-none focus:border-[#84cc16] transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#f5f0e6] focus:outline-none cursor-pointer"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Assigned for Review">Assigned for Review</option>
              <option value="Published">Published</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Submissions Table with Assign Reviewer Buttons */}
        <div className="bg-[#1c3d2b]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-[#12281b]/80 text-[#cbd5e1]/80 text-xs uppercase tracking-wider border-b border-white/10">
                  <th className="p-4 font-bold">Manuscript Title</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Author</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Assigned Reviewer</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[#f5f0e6] text-sm divide-y divide-white/5">
                {filteredSubmissions.length > 0 ? filteredSubmissions.map((item: any) => {
                  const dateString = item.createdAt?.toDate 
                    ? item.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
                    : (item.date || "Recent");

                  const isAssigned = !!item.assignedReviewer;
                  const isPublished = item.status === "Published";

                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4">
                        <div className="font-semibold text-[#f5f0e6] group-hover:text-[#84cc16] transition-colors max-w-[280px] truncate" title={item.title}>
                          {item.title}
                        </div>
                        <div className="text-[11px] text-[#cbd5e1]/60 flex items-center gap-1.5 mt-0.5">
                          <Calendar size={11} /> Submitted {dateString}
                        </div>
                      </td>

                      <td className="p-4 text-[#cbd5e1]/80 text-xs">
                        {item.category}
                      </td>

                      <td className="p-4 text-[#cbd5e1]/80 text-xs">
                        {item.author}
                      </td>

                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
                          item.status === 'Published' 
                            ? 'bg-[#84cc16]/15 text-[#84cc16] border-[#84cc16]/30' 
                            : item.status?.includes('Assigned')
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : item.status === 'Rejected'
                            ? 'bg-red-500/15 text-red-400 border-red-500/30'
                            : 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30'
                        }`}>
                          {item.status || "Pending Review"}
                        </span>
                      </td>

                      {/* Assigned Reviewer Column */}
                      <td className="p-4">
                        {isAssigned ? (
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-[#84cc16] flex items-center gap-1">
                              <ShieldCheck size={13} /> {item.assignedReviewer}
                            </span>
                            {item.reviewDeadline && (
                              <span className="text-[10px] text-[#cbd5e1]/60 mt-0.5">
                                Due: {item.reviewDeadline} • {item.priority || "Standard"}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleOpenMagicLink(item)}
                              className="text-[11px] text-[#84cc16] hover:text-[#a3e635] flex items-center gap-1 font-semibold mt-1 cursor-pointer transition-colors"
                              title="Generate & Send Magic Link to Reviewer"
                            >
                              <Sparkles size={11} className="text-[#84cc16] animate-pulse" />
                              Send Magic Link
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleOpenAssign(item)}
                            className="px-3 py-1 rounded-xl bg-[#84cc16]/15 hover:bg-[#84cc16] text-[#84cc16] hover:text-[#0f2317] border border-[#84cc16]/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <UserCheck size={13} />
                            + Assign Reviewer
                          </button>
                        )}
                      </td>

                      {/* Actions Column */}
                      <td className="p-4 text-right">
                        <div className="flex justify-end items-center gap-1.5">
                          
                          {/* Send Magic Link Button */}
                          <button
                            onClick={() => handleOpenMagicLink(item)}
                            className="p-1.5 hover:bg-[#84cc16]/20 bg-[#84cc16]/10 rounded-xl text-[#84cc16] hover:text-[#a3e635] border border-[#84cc16]/30 transition-all cursor-pointer"
                            title="Generate & Send Magic Link to Reviewer"
                          >
                            <Sparkles size={15} />
                          </button>

                          {/* Assign / Re-assign button */}
                          <button
                            onClick={() => handleOpenAssign(item)}
                            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-[#cbd5e1] hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                            title={isAssigned ? "Change Assigned Reviewer" : "Assign Reviewer"}
                          >
                            <UserCheck size={14} className="text-[#84cc16]" />
                            <span className="hidden sm:inline">{isAssigned ? "Reassign" : "Assign"}</span>
                          </button>

                          {/* Quick Publish / Approve */}
                          {!isPublished && (
                            <button 
                              onClick={() => handleUpdateStatus(item.id, 'Published')} 
                              className="p-1.5 hover:bg-[#84cc16]/20 rounded-xl text-[#cbd5e1] hover:text-[#84cc16] transition-colors cursor-pointer" 
                              title="Approve & Publish to Repository"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}

                          {/* View details */}
                          <button 
                            onClick={() => setViewDetailsItem(item)}
                            className="p-1.5 hover:bg-blue-500/20 rounded-xl text-[#cbd5e1] hover:text-blue-400 transition-colors cursor-pointer" 
                            title="Inspect Details"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Delete */}
                          <button 
                            onClick={() => handleDelete(item.id)} 
                            className="p-1.5 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-colors cursor-pointer" 
                            title="Delete Submission"
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
                      No research submissions found matching filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-white/10 bg-[#12281b]/50 flex items-center justify-between text-xs text-[#cbd5e1]/70">
            <span>Showing {filteredSubmissions.length} submissions</span>
            <Link 
              href="/reviewer" 
              className="text-[#84cc16] hover:underline flex items-center gap-1 font-semibold"
            >
              Open Peer-Review Portal &rarr;
            </Link>
          </div>
        </div>

      </div>

      {/* MODAL 1: ASSIGN REVIEWER MODAL */}
      {assignModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#1c3d2b] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#84cc16]">
                <UserCheck size={18} />
                Assign Reviewer to Manuscript
              </div>
              <button 
                onClick={() => setAssignModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbd5e1] hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Selected Manuscript Summary Box */}
            <div className="p-4 rounded-2xl bg-[#12281b] border border-white/10 mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#cbd5e1]/60">Manuscript Target</span>
              <h3 className="text-base font-bold text-[#f5f0e6] mt-0.5">{selectedSubmission.title}</h3>
              <p className="text-xs text-[#cbd5e1]/80 mt-1">
                By {selectedSubmission.author} • {selectedSubmission.category}
              </p>
            </div>

            <form onSubmit={handleConfirmAssignment} className="space-y-4">
              
              {/* Reviewer Selection */}
              <div>
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">
                  Select Accredited Reviewer *
                </label>
                <select 
                  value={assignForm.reviewerName}
                  onChange={(e) => setAssignForm({ ...assignForm, reviewerName: e.target.value })}
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-[#f5f0e6] focus:outline-none focus:border-[#84cc16]"
                >
                  {ACCREDITED_REVIEWERS.map((r, i) => (
                    <option key={i} value={r.name} className="bg-[#163022]">
                      {r.name} — {r.expertise}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#cbd5e1]/60 mt-1">
                  Reviewer will receive notification and access in their Reviewer Portal.
                </p>
              </div>

              {/* Priority & Deadline */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">
                    Priority Level
                  </label>
                  <select 
                    value={assignForm.priority}
                    onChange={(e) => setAssignForm({ ...assignForm, priority: e.target.value })}
                    className="w-full bg-[#12281b] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-[#f5f0e6] focus:outline-none"
                  >
                    <option value="High Priority">High Priority (Urgent)</option>
                    <option value="Standard">Standard</option>
                    <option value="Low Priority">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">
                    Review Target Deadline
                  </label>
                  <input 
                    type="date"
                    required
                    value={assignForm.deadline}
                    onChange={(e) => setAssignForm({ ...assignForm, deadline: e.target.value })}
                    className="w-full bg-[#12281b] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#f5f0e6] focus:outline-none focus:border-[#84cc16]"
                  />
                </div>
              </div>

              {/* Editorial Notes */}
              <div>
                <label className="text-xs font-semibold text-[#cbd5e1] block mb-1">
                  Editorial Instructions / Scope Notes
                </label>
                <textarea 
                  rows={3}
                  value={assignForm.notes}
                  onChange={(e) => setAssignForm({ ...assignForm, notes: e.target.value })}
                  placeholder="Special instructions or specific sections for the reviewer to scrutinize..."
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl p-3 text-xs text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAssignModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#cbd5e1] hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAssigning}
                  className="px-6 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isAssigning ? "Dispatching..." : "Confirm & Assign Reviewer"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: VIEW DETAILS MODAL */}
      {viewDetailsItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#1c3d2b] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-[#f5f0e6]">Submission Details</h3>
              <button
                onClick={() => setViewDetailsItem(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbd5e1] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#cbd5e1]/60 block">Title:</span>
                <p className="text-base font-bold text-[#f5f0e6] mt-0.5">{viewDetailsItem.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-[#cbd5e1]/60 block">Author:</span>
                  <p className="font-semibold text-white">{viewDetailsItem.author}</p>
                </div>
                <div>
                  <span className="text-[#cbd5e1]/60 block">Category:</span>
                  <p className="font-semibold text-white">{viewDetailsItem.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-[#cbd5e1]/60 block">Status:</span>
                  <span className="font-bold text-[#84cc16]">{viewDetailsItem.status}</span>
                </div>
                <div>
                  <span className="text-[#cbd5e1]/60 block">Assigned Reviewer:</span>
                  <span className="font-bold text-amber-300">{viewDetailsItem.assignedReviewer || "Unassigned"}</span>
                </div>
              </div>

              {viewDetailsItem.body && (
                <div className="pt-2">
                  <span className="text-[#cbd5e1]/60 block mb-1">Abstract / Content:</span>
                  <p className="p-3 rounded-xl bg-[#12281b] text-[#cbd5e1] leading-relaxed">
                    {viewDetailsItem.body}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  const target = viewDetailsItem
                  setViewDetailsItem(null)
                  handleOpenAssign(target)
                }}
                className="px-4 py-2 rounded-xl bg-[#84cc16]/15 hover:bg-[#84cc16] text-[#84cc16] hover:text-[#0f2317] border border-[#84cc16]/30 text-xs font-bold transition-all"
              >
                Assign Reviewer
              </button>
              <button
                onClick={() => setViewDetailsItem(null)}
                className="px-5 py-2 rounded-xl bg-white/10 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: MAGIC LINK GENERATOR & DISPATCH MODAL */}
      {magicLinkModalOpen && magicLinkTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#1c3d2b] border border-[#84cc16]/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/30 text-[#84cc16] flex items-center justify-center">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#f5f0e6]">Reviewer Magic Link</h3>
                  <p className="text-xs text-[#cbd5e1]/70">Passwordless invitation & direct score sheet access</p>
                </div>
              </div>
              <button
                onClick={() => setMagicLinkModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbd5e1] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Target Manuscript Summary */}
            <div className="p-3.5 rounded-2xl bg-[#12281b] border border-white/10 mb-4 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#84cc16] font-bold uppercase tracking-wider text-[10px]">Manuscript</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-[#cbd5e1]">
                  {magicLinkTarget.category}
                </span>
              </div>
              <div className="font-bold text-white text-sm truncate" title={magicLinkTarget.title}>
                {magicLinkTarget.title}
              </div>
              <div className="text-[#cbd5e1]/70 text-[11px]">
                Author: <span className="text-white">{magicLinkTarget.author}</span>
                {magicLinkTarget.reviewDeadline && ` • Due: ${magicLinkTarget.reviewDeadline}`}
              </div>
            </div>

            {/* Recipient Reviewer */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#cbd5e1]/80 mb-1.5">
                  Target Reviewer
                </label>
                <select
                  value={magicLinkReviewerName}
                  onChange={(e) => handleReviewerChangeInMagicModal(e.target.value)}
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl p-2.5 text-xs text-[#f5f0e6] focus:outline-none focus:border-[#84cc16] cursor-pointer"
                >
                  {ACCREDITED_REVIEWERS.map((rev) => (
                    <option key={rev.name} value={rev.name}>
                      {rev.name} ({rev.expertise})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#cbd5e1]/80 mb-1.5">
                  Reviewer Email Address
                </label>
                <input
                  type="email"
                  value={magicLinkReviewerEmail}
                  onChange={(e) => {
                    setMagicLinkReviewerEmail(e.target.value)
                    if (magicLinkTarget) {
                      setGeneratedLinkUrl(buildMagicUrl(magicLinkTarget, magicLinkReviewerName, e.target.value))
                    }
                  }}
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl p-2.5 text-xs text-[#f5f0e6] focus:outline-none focus:border-[#84cc16]"
                  placeholder="reviewer@institution.org"
                />
              </div>
            </div>

            {/* Generated Magic Link URL Box */}
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#84cc16] mb-1.5 flex items-center justify-between">
                <span>Secure Magic Link URL</span>
                {magicLinkCopied && (
                  <span className="text-xs text-[#84cc16] font-normal flex items-center gap-1 animate-in fade-in">
                    <Check size={12} /> Copied to clipboard!
                  </span>
                )}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedLinkUrl}
                  className="w-full bg-[#12281b] border border-white/15 rounded-xl px-3 py-2.5 text-xs font-mono text-[#84cc16] select-all focus:outline-none truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyMagicLink}
                  className="px-4 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-md shadow-[#84cc16]/20"
                >
                  {magicLinkCopied ? (
                    <>
                      <Check size={14} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons: Email and Test */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                onClick={handleSendEmailInvitation}
                className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[#f5f0e6] hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Mail size={15} className="text-[#84cc16]" />
                Send Invitation via Email
              </button>
              <a
                href={generatedLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#cbd5e1] hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <ExternalLink size={14} />
                Open & Test Link
              </a>
            </div>

            {/* Explanation Note */}
            <div className="p-3 rounded-2xl bg-[#84cc16]/10 border border-[#84cc16]/20 text-[11px] text-[#cbd5e1] leading-relaxed">
              <strong className="text-[#84cc16]">How this works:</strong> The reviewer clicks this link in their email or chat. It automatically authenticates their session, pre-fills their name and document details on the official DFIH Peer-Review Score Sheet, and bypasses the password lock screen.
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setMagicLinkModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/15 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  )
}
