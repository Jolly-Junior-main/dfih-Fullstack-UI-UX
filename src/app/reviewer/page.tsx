"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  Search, 
  Eye, 
  ArrowRight, 
  Lock, 
  FileCheck, 
  Award, 
  Calendar, 
  User, 
  ChevronRight, 
  ExternalLink,
  X,
  Printer,
  ShieldCheck,
  Sparkles
} from "lucide-react"
import Link from "next/link"

interface EvaluationRecord {
  evalId: string
  submittedAt: string
  reviewer: {
    name: string
    expertise: string
    date: string
  }
  document: {
    title: string
    author: string
    year: string
    docType: string
    mainCategory: string
    subCategory: string
  }
  scores: {
    relevance: number
    quality: number
    accuracy: number
    compliance: number
    clarity: number
    value: number
  }
  totalScore: number
  grade: string
  checklist: {
    noPlagiarism: boolean
    properRecognition: boolean
    copyrightConfirmed: boolean
    noHarmfulContent: boolean
    dataVerifiable: boolean
  }
  allEthicalChecked: boolean
  recommendation: string
  comments: string
  signature: string
  editorialDecision: string
}

const DEFAULT_ASSIGNED = [
  { id: "1", title: "Silviculture Practices in Boreal Forests", author: "Dr. L. Jenkins", type: "Research Paper", priority: "High Priority", color: "text-red-400 border-red-400/30 bg-red-400/10" },
  { id: "2", title: "Global Timber Trade Statistics 2025", author: "FAO Forestry Dept", type: "Dataset", priority: "Standard", color: "text-[#cbd5e1] border-white/15 bg-white/5" },
  { id: "3", title: "Community Forestry Case Studies", author: "M. Ramirez", type: "Report", priority: "Standard", color: "text-[#cbd5e1] border-white/15 bg-white/5" }
]

const INITIAL_COMPLETED: EvaluationRecord[] = [
  {
    evalId: "EVAL-2026-8812",
    submittedAt: "2026-10-14T11:20:00Z",
    reviewer: {
      name: "Dr. Eleanor Vance, Ph.D.",
      expertise: "Silviculture & Forest Ecology",
      date: "2026-10-14"
    },
    document: {
      title: "Agroforestry Integration in Sub-Saharan Drylands",
      author: "K. Mensah et al.",
      year: "2025",
      docType: "Research Paper",
      mainCategory: "Community Forestry & Agroforestry",
      subCategory: "Dryland Regeneration"
    },
    scores: {
      relevance: 19,
      quality: 24,
      accuracy: 19,
      compliance: 10,
      clarity: 14,
      value: 9
    },
    totalScore: 95,
    grade: "Grade A — Outstanding",
    checklist: {
      noPlagiarism: true,
      properRecognition: true,
      copyrightConfirmed: true,
      noHarmfulContent: true,
      dataVerifiable: true
    },
    allEthicalChecked: true,
    recommendation: "Accepted for Publication",
    comments: "Exceptional methodological rigor with comprehensive field trial data. Fully complies with DFIH scientific criteria.",
    signature: "Dr. Eleanor Vance",
    editorialDecision: "Approved for publication in repository Volume 4."
  }
]

function ReviewerPortalContent() {
  const searchParams = useSearchParams()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [isMagicLinkAuth, setIsMagicLinkAuth] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"assigned" | "completed">("assigned")
  const [completedList, setCompletedList] = useState<EvaluationRecord[]>([])
  const [assignedList, setAssignedList] = useState<any[]>(DEFAULT_ASSIGNED)
  const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationRecord | null>(null)

  useEffect(() => {
    const adminAuth = sessionStorage.getItem("admin_auth") === "true"
    const userLoggedIn = sessionStorage.getItem("user_logged_in") === "true"
    
    // Check for Magic Link Token
    const magicToken = searchParams.get("token")
    const reviewerParam = searchParams.get("reviewer")
    const emailParam = searchParams.get("email")

    if (magicToken && magicToken.trim().length > 0) {
      sessionStorage.setItem("user_logged_in", "true")
      const finalName = reviewerParam || "Accredited Peer Reviewer"
      const finalEmail = emailParam || "reviewer@cifor.org"
      sessionStorage.setItem("user_name", finalName)
      sessionStorage.setItem("user_email", finalEmail)
      setIsAuthorized(true)
      setIsMagicLinkAuth(true)
    } else if (adminAuth || userLoggedIn) {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
    }

    // Load assigned items from localStorage if newly dispatched
    try {
      const storedAssigned = localStorage.getItem("dfih_reviewer_assigned_items")
      if (storedAssigned) {
        const parsed = JSON.parse(storedAssigned)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge unique
          const merged = [...parsed]
          DEFAULT_ASSIGNED.forEach(def => {
            if (!merged.some(m => m.id === def.id || m.title === def.title)) {
              merged.push(def)
            }
          })
          setAssignedList(merged)
        }
      }
    } catch (e) {
      console.error("Error reading assigned:", e)
    }

    // Load completed evaluations from localStorage
    try {
      const stored = localStorage.getItem("dfih_reviewer_evaluations")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCompletedList(parsed)
          return
        }
      }
      // If empty, initialize with demonstration sample
      setCompletedList(INITIAL_COMPLETED)
      localStorage.setItem("dfih_reviewer_evaluations", JSON.stringify(INITIAL_COMPLETED))
    } catch (e) {
      console.error("Error reading evaluations:", e)
      setCompletedList(INITIAL_COMPLETED)
    }
  }, [searchParams])

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#163022] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#84cc16] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-[#163022] text-[#f5f0e6] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#1c3d2b]/90 border border-white/15 rounded-3xl p-8 text-center backdrop-blur-xl shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#f5f0e6] mb-3">Reviewer Authentication Required</h2>
          <p className="text-sm text-[#cbd5e1]/80 mb-6 leading-relaxed">
            The peer-review portal is restricted to accredited academic reviewers. Sign in or enter your invitation token.
          </p>

          {/* Quick Token / Magic Link Entry */}
          <div className="mb-6 p-4 rounded-2xl bg-[#12281b]/80 border border-white/10 text-left">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#84cc16] mb-2 flex items-center gap-1.5">
              <Sparkles size={14} />
              Have a Magic Link or Token?
            </label>
            <form onSubmit={(e) => {
              e.preventDefault()
              const input = (document.getElementById("portalTokenInput") as HTMLInputElement)?.value.trim()
              if (!input) return
              let extractedToken = input
              let extractedReviewer = ""
              if (input.includes("token=")) {
                try {
                  const url = new URL(input.startsWith("http") ? input : `https://dfih.org/${input}`)
                  extractedToken = url.searchParams.get("token") || ""
                  extractedReviewer = url.searchParams.get("reviewer") || ""
                } catch {}
              }
              if (extractedToken) {
                sessionStorage.setItem("user_logged_in", "true")
                const finalName = extractedReviewer || "Accredited Reviewer"
                sessionStorage.setItem("user_name", finalName)
                sessionStorage.setItem("user_email", "reviewer@cifor.org")
                setIsAuthorized(true)
                setIsMagicLinkAuth(true)
              }
            }} className="space-y-2">
              <input
                id="portalTokenInput"
                type="text"
                placeholder="Paste magic link or token..."
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#84cc16]"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#84cc16]/20 hover:bg-[#84cc16] text-[#84cc16] hover:text-[#0f2317] border border-[#84cc16]/40 text-xs font-bold transition-all cursor-pointer"
              >
                Unlock Portal via Token
              </button>
            </form>
          </div>

          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-sm transition-all shadow-lg shadow-[#84cc16]/20"
            >
              Sign In to Reviewer Account
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="w-full flex items-center justify-center py-3.5 px-6 rounded-xl border border-white/15 hover:bg-white/5 text-[#cbd5e1] hover:text-white font-semibold text-sm transition-all"
            >
              Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const assignedItems = assignedList.filter(item => 
    searchQuery === "" || 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.author?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCompleted = completedList.filter(item =>
    searchQuery === "" ||
    item.document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.document.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.evalId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = [
    { name: "Pending Reviews", value: assignedItems.length.toString(), icon: Clock, color: "text-amber-400" },
    { name: "Completed Score Sheets", value: completedList.length.toString(), icon: CheckCircle, color: "text-[#84cc16]" },
    { name: "Total Assigned", value: (assignedItems.length + completedList.length).toString(), icon: ClipboardList, color: "text-[#84cc16]" },
  ]

  return (
    <div className="flex flex-col min-h-screen pt-28 pb-16 bg-[#163022] text-[#f5f0e6]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {isMagicLinkAuth && (
          <div className="mb-8 p-4.5 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/40 text-[#f5f0e6] text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 shadow-lg shadow-[#84cc16]/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#84cc16]/20 border border-[#84cc16]/40 flex items-center justify-center text-[#84cc16] shrink-0">
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <div>
                <div className="font-bold text-[#84cc16] flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-ping" />
                  Authenticated via Magic Link
                </div>
                <div className="text-xs text-[#cbd5e1] mt-0.5">
                  Welcome to the portal queue, <strong className="text-white underline">{sessionStorage.getItem("user_name") || "Accredited Reviewer"}</strong>. You have instant access to your assigned manuscripts.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-3 py-1 rounded-full bg-[#84cc16]/20 border border-[#84cc16]/30 text-[#84cc16] font-mono text-[11px] font-bold">
                ✓ Passwordless Session
              </span>
            </div>
          </div>
        )}
        
        {/* Top Header Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-[#1c3d2b]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#84cc16] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
              Accredited Peer-Review Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f5f0e6] mb-2">
              Reviewer Portal
            </h1>
            <p className="text-[#cbd5e1]/80 text-sm md:text-base max-w-2xl">
              Evaluate, score, and certify submitted scientific manuscripts using the official evaluation score sheet protocol.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/reviewer/evaluate"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-sm transition-all shadow-xl shadow-[#84cc16]/20 cursor-pointer"
            >
              <FileCheck size={18} />
              Fill Evaluation Form
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex items-center justify-between shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div>
                  <p className="text-xs font-bold text-[#cbd5e1]/70 uppercase tracking-wider mb-1">{stat.name}</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-[#f5f0e6]">{stat.value}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#12281b] border border-white/10 flex items-center justify-center text-[#84cc16] shadow-inner">
                  <Icon size={26} strokeWidth={2} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Content Area: Tabs & List */}
        <div className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          
          {/* Header Bar with Tabs and Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 pb-6 border-b border-white/10">
            
            {/* Tab Buttons */}
            <div className="flex items-center gap-2 p-1 bg-[#12281b] rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("assigned")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "assigned"
                    ? "bg-[#84cc16] text-[#0f2317] shadow-md shadow-[#84cc16]/20"
                    : "text-[#cbd5e1] hover:text-white"
                }`}
              >
                Assigned for Review ({assignedItems.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("completed")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "completed"
                    ? "bg-[#84cc16] text-[#0f2317] shadow-md shadow-[#84cc16]/20"
                    : "text-[#cbd5e1] hover:text-white"
                }`}
              >
                Completed Evaluations ({completedList.length})
              </button>
            </div>
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search submissions or evaluations..." 
                className="bg-[#12281b] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-[#f5f0e6] placeholder:text-white/40 focus:outline-none focus:border-[#84cc16] w-full sm:w-64 transition-colors"
              />
            </div>
          </div>
          
          {/* TAB 1: Assigned Submissions */}
          {activeTab === "assigned" && (
            <div className="space-y-4">
              {assignedItems.length === 0 ? (
                <div className="py-12 text-center text-[#cbd5e1]/60 text-sm">
                  No pending submissions matching your filter.
                </div>
              ) : (
                assignedItems.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-[#12281b]/60 border border-white/10 hover:border-[#84cc16]/40 hover:bg-[#12281b] transition-all group">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <h4 className="text-[#f5f0e6] font-semibold text-base md:text-lg group-hover:text-[#84cc16] transition-colors">{item.title}</h4>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${item.color}`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-xs text-[#cbd5e1]/70">By {item.author} • {item.type}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/reviewer/evaluate?docId=${item.id}`}
                        className="px-5 py-2.5 rounded-xl bg-[#84cc16] text-[#0f2317] text-xs font-bold uppercase tracking-wider hover:bg-[#a3e635] transition-all shadow-md shadow-[#84cc16]/20 cursor-pointer flex items-center gap-1.5"
                      >
                        <FileCheck size={15} />
                        Start Review
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Completed Evaluations */}
          {activeTab === "completed" && (
            <div className="space-y-4">
              {filteredCompleted.length === 0 ? (
                <div className="py-12 text-center text-[#cbd5e1]/60 text-sm">
                  No completed evaluation score sheets found.
                </div>
              ) : (
                filteredCompleted.map((evalItem, idx) => (
                  <div 
                    key={evalItem.evalId || idx}
                    className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-[#12281b]/60 border border-white/10 hover:border-[#84cc16]/40 hover:bg-[#12281b] transition-all group"
                  >
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <span className="text-xs font-mono text-[#84cc16] font-bold">
                          {evalItem.evalId}
                        </span>
                        <h4 className="text-[#f5f0e6] font-semibold text-base md:text-lg group-hover:text-[#84cc16] transition-colors">
                          {evalItem.document.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#cbd5e1]/70">
                        <span>Author: {evalItem.document.author}</span>
                        <span>•</span>
                        <span>Reviewer: {evalItem.reviewer.name}</span>
                        <span>•</span>
                        <span>Date: {evalItem.reviewer.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Score Badge */}
                      <div className="text-right">
                        <span className="text-xs text-[#cbd5e1]/60 block">Score</span>
                        <span className="text-lg font-black text-[#84cc16]">
                          {evalItem.totalScore} <span className="text-xs font-normal text-[#cbd5e1]/60">/ 100</span>
                        </span>
                      </div>

                      {/* Recommendation Pill */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider shrink-0 ${
                        evalItem.recommendation.includes("Accepted")
                          ? "text-[#84cc16] border-[#84cc16]/30 bg-[#84cc16]/10"
                          : evalItem.recommendation.includes("Revision")
                          ? "text-amber-400 border-amber-400/30 bg-amber-400/10"
                          : "text-red-400 border-red-400/30 bg-red-400/10"
                      }`}>
                        {evalItem.recommendation}
                      </span>

                      {/* View Score Sheet Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedEvaluation(evalItem)}
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-[#f5f0e6] transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye size={15} />
                        View Sheet
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Modal: View Full Completed Evaluation Sheet */}
        {selectedEvaluation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="bg-[#1c3d2b] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-[#84cc16]">
                    {selectedEvaluation.evalId}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#f5f0e6]">
                    Evaluation Score Sheet
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEvaluation(null)}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#cbd5e1] hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Document & Reviewer Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#12281b] p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#cbd5e1]/60 mb-1">Document Information</p>
                  <p className="text-sm font-bold text-[#f5f0e6]">{selectedEvaluation.document.title}</p>
                  <p className="text-xs text-[#cbd5e1]/80 mt-1">By {selectedEvaluation.document.author} • {selectedEvaluation.document.year}</p>
                  <p className="text-xs text-[#cbd5e1]/60 mt-0.5">{selectedEvaluation.document.mainCategory} ({selectedEvaluation.document.subCategory})</p>
                </div>

                <div className="bg-[#12281b] p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#cbd5e1]/60 mb-1">Reviewer Information</p>
                  <p className="text-sm font-bold text-[#f5f0e6]">{selectedEvaluation.reviewer.name}</p>
                  <p className="text-xs text-[#cbd5e1]/80 mt-1">Expertise: {selectedEvaluation.reviewer.expertise}</p>
                  <p className="text-xs text-[#cbd5e1]/60 mt-0.5">Date of Review: {selectedEvaluation.reviewer.date}</p>
                </div>
              </div>

              {/* Part A: Score Breakdown */}
              <div className="bg-[#12281b] p-5 rounded-2xl border border-white/10 mb-6">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#84cc16]">
                    Part A: Criteria Scores
                  </span>
                  <span className="text-base font-black text-[#84cc16]">
                    Total: {selectedEvaluation.totalScore} / 100 ({selectedEvaluation.grade})
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl">
                    <p className="text-[#cbd5e1]/70">1. Relevance</p>
                    <p className="text-sm font-bold text-[#f5f0e6] mt-0.5">{selectedEvaluation.scores.relevance} / 20</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <p className="text-[#cbd5e1]/70">2. Technical Quality</p>
                    <p className="text-sm font-bold text-[#f5f0e6] mt-0.5">{selectedEvaluation.scores.quality} / 25</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <p className="text-[#cbd5e1]/70">3. Source Credibility</p>
                    <p className="text-sm font-bold text-[#f5f0e6] mt-0.5">{selectedEvaluation.scores.accuracy} / 20</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <p className="text-[#cbd5e1]/70">4. Legal Compliance</p>
                    <p className="text-sm font-bold text-[#f5f0e6] mt-0.5">{selectedEvaluation.scores.compliance} / 10</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <p className="text-[#cbd5e1]/70">5. Clarity & Structure</p>
                    <p className="text-sm font-bold text-[#f5f0e6] mt-0.5">{selectedEvaluation.scores.clarity} / 15</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <p className="text-[#cbd5e1]/70">6. Practical Value</p>
                    <p className="text-sm font-bold text-[#f5f0e6] mt-0.5">{selectedEvaluation.scores.value} / 10</p>
                  </div>
                </div>
              </div>

              {/* Part B: Ethical Verification */}
              <div className="bg-[#12281b] p-4 rounded-2xl border border-white/10 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#84cc16] block mb-2">
                  Part B: Ethical & Legal Checklist
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {Object.entries(selectedEvaluation.checklist).map(([key, val]) => (
                    <span 
                      key={key}
                      className={`px-3 py-1 rounded-full font-semibold border ${
                        val 
                          ? "bg-[#84cc16]/10 text-[#84cc16] border-[#84cc16]/30" 
                          : "bg-red-400/10 text-red-400 border-red-400/30"
                      }`}
                    >
                      {val ? "✓" : "✗"} {key.replace(/([A-Z])/g, " $1")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Part C: Recommendation & Comments */}
              <div className="bg-[#12281b] p-4 rounded-2xl border border-white/10 mb-6">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#84cc16] block mb-1">
                    Part C: Editorial Recommendation
                  </span>
                  <p className="text-sm font-bold text-[#f5f0e6]">{selectedEvaluation.recommendation}</p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#84cc16] block mb-1">
                    Part D: Comments & Required Revisions
                  </span>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed whitespace-pre-line bg-white/5 p-3 rounded-xl">
                    {selectedEvaluation.comments}
                  </p>
                </div>
              </div>

              {/* Sign-Off */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#cbd5e1]/70 pt-2 border-t border-white/10 gap-3">
                <span>Signed by: <strong className="text-[#84cc16]">{selectedEvaluation.signature}</strong></span>
                <span>Decision: {selectedEvaluation.editorialDecision}</span>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={15} />
                  Print Score Sheet
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEvaluation(null)}
                  className="px-5 py-2 rounded-xl bg-[#84cc16] text-[#0f2317] text-xs font-bold hover:bg-[#a3e635] cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default function ReviewerPortal() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#163022] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#84cc16] border-t-transparent animate-spin" />
      </div>
    }>
      <ReviewerPortalContent />
    </Suspense>
  )
}
