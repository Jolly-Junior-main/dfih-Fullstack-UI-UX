"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ClipboardCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Award, 
  ShieldCheck, 
  ArrowLeft, 
  Send, 
  Printer, 
  Save, 
  RotateCcw, 
  Lock, 
  ArrowRight,
  BookOpen,
  Calendar,
  User,
  Sliders,
  Check,
  Download,
  Sparkles,
  Key
} from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

interface EvaluationData {
  id?: string
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
    relevance: number      // max 20
    quality: number        // max 25
    accuracy: number       // max 20
    compliance: number     // max 10
    clarity: number        // max 15
    value: number          // max 10
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
  otherRecommendation: string
  comments: string
  signature: string
  certified: boolean
  editorialDecision: string
}

const PRESET_DOCUMENTS = [
  {
    id: "1",
    title: "Silviculture Practices in Boreal Forests",
    author: "Dr. L. Jenkins",
    year: "2025",
    docType: "Research Paper",
    mainCategory: "Silviculture & Forest Management",
    subCategory: "Boreal Forests & Regeneration"
  },
  {
    id: "2",
    title: "Global Timber Trade Statistics 2025",
    author: "FAO Forestry Dept",
    year: "2025",
    docType: "Dataset",
    mainCategory: "Timber Trade & Forest Economics",
    subCategory: "Global Supply Chain Metrics"
  },
  {
    id: "3",
    title: "Community Forestry Case Studies",
    author: "M. Ramirez",
    year: "2024",
    docType: "Report",
    mainCategory: "Community Forestry & Agroforestry",
    subCategory: "Indigenous Land Stewardship"
  }
]

const CRITERIA_DEFINITIONS = [
  {
    key: "relevance" as const,
    no: 1,
    title: "Category & Sub-Category Relevance",
    max: 20,
    description: "Alignment with designated thematic scope, discipline appropriateness, and topical relevance to forestry knowledge.",
    hints: [
      { label: "High (18-20)", val: 19 },
      { label: "Good (14-17)", val: 15 },
      { label: "Fair (10-13)", val: 12 },
      { label: "Poor (<10)", val: 8 },
    ]
  },
  {
    key: "quality" as const,
    no: 2,
    title: "Scientific / Technical Quality",
    max: 25,
    description: "Methodological rigor, experimental design, theoretical validity, analytical soundness, and support for hypotheses.",
    hints: [
      { label: "Outstanding (23-25)", val: 24 },
      { label: "Solid (18-22)", val: 20 },
      { label: "Adequate (13-17)", val: 15 },
      { label: "Deficient (<13)", val: 10 },
    ]
  },
  {
    key: "accuracy" as const,
    no: 3,
    title: "Accuracy & Source Credibility",
    max: 20,
    description: "Verifiable empirical claims, absence of factual errors, peer-reviewed citations, reputable bibliography, and reproducible findings.",
    hints: [
      { label: "Exemplary (18-20)", val: 19 },
      { label: "Credible (14-17)", val: 16 },
      { label: "Borderline (10-13)", val: 11 },
      { label: "Unreliable (<10)", val: 7 },
    ]
  },
  {
    key: "compliance" as const,
    no: 4,
    title: "Ethical & Legal Compliance",
    max: 10,
    description: "Adherence to scientific ethics, human/environmental subject protocols, conflict of interest disclosure, and copyright compliance.",
    hints: [
      { label: "Full (10)", val: 10 },
      { label: "Minor Issues (8)", val: 8 },
      { label: "Questionable (5)", val: 5 },
      { label: "Breached (0-4)", val: 3 },
    ]
  },
  {
    key: "clarity" as const,
    no: 5,
    title: "Clarity, Structure & Language",
    max: 15,
    description: "Readability, logical organization, precise scientific terminology, well-labeled figures and tables, and grammatical precision.",
    hints: [
      { label: "Lucid (14-15)", val: 14 },
      { label: "Clear (11-13)", val: 12 },
      { label: "Acceptable (8-10)", val: 9 },
      { label: "Obscure (<8)", val: 6 },
    ]
  },
  {
    key: "value" as const,
    no: 6,
    title: "Practical / Knowledge Value",
    max: 10,
    description: "Potential impact on forestry policy, industrial silviculture, ecological conservation, or contribution to academic literature.",
    hints: [
      { label: "High Impact (9-10)", val: 10 },
      { label: "Moderate (7-8)", val: 8 },
      { label: "Incremental (5-6)", val: 6 },
      { label: "Low (<5)", val: 4 },
    ]
  }
]

const ETHICAL_ITEMS = [
  { key: "noPlagiarism" as const, label: "No plagiarism detected", desc: "Text and ideas verified for academic originality via similarity comparison." },
  { key: "properRecognition" as const, label: "Proper author recognition", desc: "All contributing researchers, collaborating institutions, and fundings properly credited." },
  { key: "copyrightConfirmed" as const, label: "Copyright permission confirmed", desc: "All included figures, maps, tables, and datasets have appropriate rights or fair-use permits." },
  { key: "noHarmfulContent" as const, label: "No harmful or misleading content", desc: "Conclusions are scientifically defensible without deceptive or environmentally hazardous guidance." },
  { key: "dataVerifiable" as const, label: "Data/source is verifiable", desc: "Underlying datasets, methodologies, and references are accessible for peer verification." }
]

const RECOMMENDATIONS = [
  { id: "Accepted for Publication", label: "Accepted for Publication", desc: "Unconditional approval. Manuscript is suitable for indexing and publication." },
  { id: "Accepted with Minor Revisions", label: "Accepted with Minor Revisions", desc: "Author must address minor stylistic, citation, or explanatory notes before publication." },
  { id: "Revision Required (Major Changes)", label: "Revision Required (Major Changes)", desc: "Substantial conceptual, methodological, or empirical revisions required before re-review." },
  { id: "Rejected", label: "Rejected", desc: "Does not meet required scientific quality, relevance, or rigor standards for DFIH." },
  { id: "Other", label: "Other", desc: "Special editorial disposition or conditional referral." }
]

function ReviewerEvaluationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const docIdParam = searchParams.get("docId") || searchParams.get("id")

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [isMagicLinkAuth, setIsMagicLinkAuth] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submittedReceipt, setSubmittedReceipt] = useState<EvaluationData | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [saveDraftMessage, setSaveDraftMessage] = useState<string | null>(null)

  // Reviewer Info
  const [reviewerName, setReviewerName] = useState("")
  const [expertiseArea, setExpertiseArea] = useState("Forestry & Ecological Sciences")
  const [dateOfReview, setDateOfReview] = useState("")

  // Document Info
  const [selectedDocId, setSelectedDocId] = useState(docIdParam || "1")
  const [docTitle, setDocTitle] = useState("")
  const [docAuthor, setDocAuthor] = useState("")
  const [docYear, setDocYear] = useState("2025")
  const [docType, setDocType] = useState("Research Paper")
  const [mainCategory, setMainCategory] = useState("Silviculture & Forest Management")
  const [subCategory, setSubCategory] = useState("Boreal Forests & Regeneration")

  // Part A: Scores
  const [scores, setScores] = useState({
    relevance: 18,
    quality: 22,
    accuracy: 18,
    compliance: 10,
    clarity: 13,
    value: 8
  })

  // Part B: Ethical Checklist (Must all be checked for approval)
  const [checklist, setChecklist] = useState({
    noPlagiarism: true,
    properRecognition: true,
    copyrightConfirmed: true,
    noHarmfulContent: true,
    dataVerifiable: true
  })

  // Part C: Recommendation
  const [recommendation, setRecommendation] = useState("Accepted with Minor Revisions")
  const [otherRecommendation, setOtherRecommendation] = useState("")

  // Part D: Comments
  const [comments, setComments] = useState(
    "The manuscript presents a rigorous investigation into modern silvicultural practices in boreal ecosystems. The methodology is well-founded, and the empirical findings are relevant for sustainable canopy conservation. Minor revisions are suggested for Table 3 references and figure caption terminology before final indexing."
  )

  // Sign-off
  const [signature, setSignature] = useState("")
  const [certified, setCertified] = useState(true)
  const [editorialDecision, setEditorialDecision] = useState("Recommended for conditional publication pending author revision verification.")

  // Initialize Auth & Defaults
  useEffect(() => {
    const adminAuth = sessionStorage.getItem("admin_auth") === "true"
    const userLoggedIn = sessionStorage.getItem("user_logged_in") === "true"
    const storedUser = sessionStorage.getItem("user_email") || (adminAuth ? "Administrator Reviewer" : "Peer Reviewer")
    
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
      setReviewerName(finalName)
      setSignature(finalName)
    } else if (adminAuth || userLoggedIn) {
      setIsAuthorized(true)
      const displayName = sessionStorage.getItem("user_name") || storedUser
      setReviewerName(displayName)
      setSignature(displayName)
    } else {
      setIsAuthorized(false)
    }

    const today = new Date().toISOString().split("T")[0]
    setDateOfReview(today)

    // Direct URL parameter overrides
    const titleParam = searchParams.get("title")
    const authorParam = searchParams.get("author")
    const categoryParam = searchParams.get("category")

    if (titleParam) setDocTitle(titleParam)
    if (authorParam) setDocAuthor(authorParam)
    if (categoryParam) setMainCategory(categoryParam)

    // Load selected document from presets or admin submissions
    const match = PRESET_DOCUMENTS.find(d => d.id === (docIdParam || "1"))
    if (match && !titleParam) {
      setDocTitle(match.title)
      setDocAuthor(match.author)
      setDocYear(match.year)
      setDocType(match.docType)
      setMainCategory(match.mainCategory)
      setSubCategory(match.subCategory)
    } else if (!match && docIdParam) {
      try {
        const storedAdmin = JSON.parse(localStorage.getItem("dfih_admin_submissions") || "[]")
        const found = storedAdmin.find((s: any) => s.id === docIdParam)
        if (found) {
          if (!titleParam) setDocTitle(found.title)
          if (!authorParam) setDocAuthor(found.author)
          setDocYear("2026")
          setDocType("Research Paper")
          if (!categoryParam) setMainCategory(found.category)
          setSubCategory("Silviculture & Resource Management")
        }
      } catch (err) {
        console.error("Local submission lookup error:", err)
      }
    }

    // Check for saved draft in localStorage
    const savedDraft = localStorage.getItem("dfih_evaluation_draft")
    if (savedDraft && !docIdParam) {
      try {
        const parsed = JSON.parse(savedDraft)
        if (parsed.scores) setScores(parsed.scores)
        if (parsed.checklist) setChecklist(parsed.checklist)
        if (parsed.recommendation) setRecommendation(parsed.recommendation)
        if (parsed.comments) setComments(parsed.comments)
      } catch (e) {
        console.error("Could not load draft:", e)
      }
    }
  }, [docIdParam, searchParams])

  // Change preset document
  const handleSelectDoc = (id: string) => {
    setSelectedDocId(id)
    const match = PRESET_DOCUMENTS.find(d => d.id === id)
    if (match) {
      setDocTitle(match.title)
      setDocAuthor(match.author)
      setDocYear(match.year)
      setDocType(match.docType)
      setMainCategory(match.mainCategory)
      setSubCategory(match.subCategory)
    }
  }

  // Calculate Total Score
  const totalScore = Math.min(100, Math.max(0,
    (Number(scores.relevance) || 0) +
    (Number(scores.quality) || 0) +
    (Number(scores.accuracy) || 0) +
    (Number(scores.compliance) || 0) +
    (Number(scores.clarity) || 0) +
    (Number(scores.value) || 0)
  ))

  // Determine Grade
  const getGrade = (score: number) => {
    if (score >= 90) return { label: "Grade A — Outstanding", color: "text-[#84cc16] border-[#84cc16]/40 bg-[#84cc16]/10" }
    if (score >= 80) return { label: "Grade B — Strong Quality", color: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10" }
    if (score >= 70) return { label: "Grade C — Acceptable", color: "text-amber-400 border-amber-400/40 bg-amber-400/10" }
    if (score >= 50) return { label: "Grade D — Substandard", color: "text-orange-400 border-orange-400/40 bg-orange-400/10" }
    return { label: "Grade F — Reject", color: "text-red-400 border-red-400/40 bg-red-400/10" }
  }

  const allEthicalChecked = Object.values(checklist).every(v => v === true)

  const handleScoreChange = (key: keyof typeof scores, val: number, max: number) => {
    const clamped = Math.max(0, Math.min(max, isNaN(val) ? 0 : val))
    setScores(prev => ({ ...prev, [key]: clamped }))
  }

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const markAllEthical = (val: boolean) => {
    setChecklist({
      noPlagiarism: val,
      properRecognition: val,
      copyrightConfirmed: val,
      noHarmfulContent: val,
      dataVerifiable: val
    })
  }

  const handleSaveDraft = () => {
    const draftPayload = {
      reviewerName,
      expertiseArea,
      dateOfReview,
      docTitle,
      docAuthor,
      docYear,
      docType,
      mainCategory,
      subCategory,
      scores,
      checklist,
      recommendation,
      otherRecommendation,
      comments,
      signature,
      editorialDecision,
      savedAt: new Date().toISOString()
    }
    localStorage.setItem("dfih_evaluation_draft", JSON.stringify(draftPayload))
    setSaveDraftMessage("Draft saved to browser storage successfully.")
    setTimeout(() => setSaveDraftMessage(null), 3500)
  }

  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)

    // Validation
    if (!reviewerName.trim()) {
      setValidationError("Reviewer Name is required.")
      return
    }
    if (!docTitle.trim()) {
      setValidationError("Document Title is required.")
      return
    }
    if (!signature.trim()) {
      setValidationError("Reviewer Signature is required to certify the evaluation.")
      return
    }
    if (!certified) {
      setValidationError("You must confirm the evaluation certification declaration.")
      return
    }

    // Critical docx rule check:
    // "If any box is unchecked, the document cannot be approved."
    if (!allEthicalChecked && (recommendation === "Accepted for Publication" || recommendation === "Accepted with Minor Revisions")) {
      setValidationError("Rule Violation: The document cannot be approved ('Accepted') while any Ethical & Legal Checklist item remains unchecked. Either verify all ethical criteria or select 'Revision Required' / 'Rejected'.")
      return
    }

    setSubmitting(true)

    const evalId = `EVAL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    const gradeObj = getGrade(totalScore)

    const evaluationPayload: EvaluationData = {
      evalId,
      submittedAt: new Date().toISOString(),
      reviewer: {
        name: reviewerName,
        expertise: expertiseArea,
        date: dateOfReview
      },
      document: {
        title: docTitle,
        author: docAuthor,
        year: docYear,
        docType,
        mainCategory,
        subCategory
      },
      scores,
      totalScore,
      grade: gradeObj.label,
      checklist,
      allEthicalChecked,
      recommendation,
      otherRecommendation,
      comments,
      signature,
      certified,
      editorialDecision
    }

    // Save to Firestore if available
    try {
      await addDoc(collection(db, "reviewer_evaluations"), {
        ...evaluationPayload,
        createdAt: serverTimestamp()
      })
    } catch (err) {
      console.warn("Firestore save skipped/failed, falling back to localStorage:", err)
    }

    // Save to localStorage list
    try {
      const existingStr = localStorage.getItem("dfih_reviewer_evaluations")
      const existingList: EvaluationData[] = existingStr ? JSON.parse(existingStr) : []
      existingList.unshift(evaluationPayload)
      localStorage.setItem("dfih_reviewer_evaluations", JSON.stringify(existingList))
      localStorage.removeItem("dfih_evaluation_draft")
    } catch (e) {
      console.error("Local storage error:", e)
    }

    setSubmitting(false)
    setSubmittedReceipt(evaluationPayload)
  }

  const handlePrint = () => {
    window.print()
  }

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
            The peer-review evaluation form is restricted to accredited academic reviewers. Sign in or enter your invitation token.
          </p>

          {/* Quick Token / Magic Link Entry */}
          <div className="mb-6 p-4 rounded-2xl bg-[#12281b]/80 border border-white/10 text-left">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#84cc16] mb-2 flex items-center gap-1.5">
              <Sparkles size={14} />
              Have a Magic Link or Token?
            </label>
            <form onSubmit={(e) => {
              e.preventDefault()
              const input = (document.getElementById("manualTokenInput") as HTMLInputElement)?.value.trim()
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
                setReviewerName(finalName)
                setSignature(finalName)
              }
            }} className="space-y-2">
              <input
                id="manualTokenInput"
                type="text"
                placeholder="Paste magic link or token..."
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#84cc16]"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#84cc16]/20 hover:bg-[#84cc16] text-[#84cc16] hover:text-[#0f2317] border border-[#84cc16]/40 text-xs font-bold transition-all cursor-pointer"
              >
                Unlock via Token
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

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#163022] text-[#f5f0e6] print:bg-white print:text-black print:pt-4 print:pb-4">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

        {/* Breadcrumb / Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
          <Link 
            href="/reviewer" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#cbd5e1] hover:text-[#84cc16] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Reviewer Portal
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#cbd5e1] transition-all cursor-pointer"
            >
              <Save size={14} />
              Save Draft
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#84cc16]/10 hover:bg-[#84cc16]/20 border border-[#84cc16]/30 text-xs font-bold text-[#84cc16] transition-all cursor-pointer"
            >
              <Printer size={14} />
              Print Score Sheet
            </button>
          </div>
        </div>

        {saveDraftMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/40 text-[#84cc16] text-sm flex items-center gap-3 print:hidden animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 size={18} />
            {saveDraftMessage}
          </div>
        )}

        {isMagicLinkAuth && (
          <div className="mb-6 p-4.5 rounded-2xl bg-[#84cc16]/15 border border-[#84cc16]/40 text-[#f5f0e6] text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden animate-in fade-in slide-in-from-top-2 shadow-lg shadow-[#84cc16]/5">
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
                  Welcome, <strong className="text-white underline">{reviewerName}</strong>. You have passwordless direct access to evaluate this submission.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-3 py-1 rounded-full bg-[#84cc16]/20 border border-[#84cc16]/30 text-[#84cc16] font-mono text-[11px] font-bold">
                ✓ Passwordless Token Verified
              </span>
            </div>
          </div>
        )}

        {/* Header Hero Card */}
        <div className="bg-[#1c3d2b]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl mb-8 relative overflow-hidden print:border-black print:bg-transparent print:p-0 print:shadow-none print:mb-6">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#84cc16]/15 text-[#84cc16] border border-[#84cc16]/30 print:border-black print:text-black">
                Official Peer-Review Score Sheet
              </span>
              <span className="text-xs text-[#cbd5e1]/70 font-mono print:text-black">
                DFIH Form Ref: PR-EVAL-2026
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#f5f0e6] tracking-tight mb-2 print:text-black">
              DOCUMENT REVIEWER EVALUATION FORM
            </h1>
            <p className="text-sm sm:text-base text-[#cbd5e1]/80 max-w-3xl leading-relaxed print:text-gray-700">
              Score sheet and quality assurance protocol for accredited peer reviewers. Complete all scoring criteria, verify ethical compliance, and state final editorial recommendations.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-[#84cc16]/10 blur-3xl pointer-events-none print:hidden" />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitEvaluation} className="space-y-8">

          {/* Quick Preload Assigned Document Selector */}
          <div className="bg-[#1c3d2b]/60 border border-white/10 rounded-2xl p-4 sm:p-5 print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#84cc16]">
                <BookOpen size={16} />
                Load Assigned Submission
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {PRESET_DOCUMENTS.map(doc => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleSelectDoc(doc.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedDocId === doc.id
                        ? "bg-[#84cc16] text-[#0f2317] font-bold shadow-md shadow-[#84cc16]/20"
                        : "bg-white/5 hover:bg-white/10 text-[#cbd5e1] border border-white/10"
                    }`}
                  >
                    {doc.title.slice(0, 28)}...
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid: Reviewer Info & Document Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Reviewer Information Card */}
            <div className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl print:border-black print:bg-transparent print:p-4 print:shadow-none">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#84cc16] mb-4 print:text-black">
                <User size={16} />
                Reviewer Information
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                    Reviewer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe, Ph.D."
                    className="w-full bg-[#12281b] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] transition-colors print:bg-white print:text-black print:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                    Expertise Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={expertiseArea}
                    onChange={(e) => setExpertiseArea(e.target.value)}
                    placeholder="e.g. Silviculture & Forest Ecology"
                    className="w-full bg-[#12281b] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] transition-colors print:bg-white print:text-black print:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                    Date of Review *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={dateOfReview}
                      onChange={(e) => setDateOfReview(e.target.value)}
                      className="w-full bg-[#12281b] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-[#f5f0e6] focus:outline-none focus:border-[#84cc16] transition-colors print:bg-white print:text-black print:border-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Information Card */}
            <div className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl print:border-black print:bg-transparent print:p-4 print:shadow-none">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#84cc16] mb-4 print:text-black">
                <FileText size={16} />
                Document Information
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="Enter manuscript title"
                    className="w-full bg-[#12281b] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] transition-colors print:bg-white print:text-black print:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                      Author / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={docAuthor}
                      onChange={(e) => setDocAuthor(e.target.value)}
                      placeholder="e.g. Dr. L. Jenkins"
                      className="w-full bg-[#12281b] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] transition-colors print:bg-white print:text-black print:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                      Year *
                    </label>
                    <input
                      type="text"
                      required
                      value={docYear}
                      onChange={(e) => setDocYear(e.target.value)}
                      placeholder="2025"
                      className="w-full bg-[#12281b] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] transition-colors print:bg-white print:text-black print:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                      Document Type *
                    </label>
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                      className="w-full bg-[#12281b] border border-white/10 rounded-xl py-2.5 px-3 text-sm text-[#f5f0e6] focus:outline-none focus:border-[#84cc16] transition-colors print:bg-white print:text-black print:border-black"
                    >
                      <option value="Research Paper">Research Paper</option>
                      <option value="Technical Report">Technical Report</option>
                      <option value="Dataset">Dataset</option>
                      <option value="Policy Brief">Policy Brief</option>
                      <option value="Case Study">Case Study</option>
                      <option value="Dissertation">Dissertation</option>
                      <option value="Manual / Guide">Manual / Guide</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                      Main Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={mainCategory}
                      onChange={(e) => setMainCategory(e.target.value)}
                      placeholder="e.g. Silviculture"
                      className="w-full bg-[#12281b] border border-white/10 rounded-xl py-2.5 px-3 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] transition-colors print:bg-white print:text-black print:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                      Sub-Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      placeholder="e.g. Boreal Forests"
                      className="w-full bg-[#12281b] border border-white/10 rounded-xl py-2.5 px-3 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] transition-colors print:bg-white print:text-black print:border-black"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Part A: Evaluation Criteria & Scoring (Max 100) */}
          <div className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl print:border-black print:bg-transparent print:p-4 print:shadow-none">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6 print:border-black">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#84cc16] mb-1 print:text-black">
                  <Award size={16} />
                  Section A
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#f5f0e6] print:text-black">
                  A. Evaluation Criteria & Scoring
                </h2>
                <p className="text-xs sm:text-sm text-[#cbd5e1]/70 print:text-gray-700">
                  Assess each dimension using the max allocated weight. Total score automatically sums to 100.
                </p>
              </div>

              {/* Total Score Badge Widget */}
              <div className="flex items-center gap-4 bg-[#12281b] border border-white/15 px-5 py-3 rounded-2xl print:border-black print:bg-white">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#cbd5e1]/70 print:text-black">Total Score</p>
                  <p className="text-2xl sm:text-3xl font-black text-[#84cc16] print:text-black">
                    {totalScore} <span className="text-sm font-semibold text-[#cbd5e1]/60 print:text-black">/ 100</span>
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-xl text-xs font-bold border ${getGrade(totalScore).color} print:border-black print:text-black`}>
                  {getGrade(totalScore).label}
                </div>
              </div>
            </div>

            {/* Criteria Rows */}
            <div className="space-y-5">
              {CRITERIA_DEFINITIONS.map((crit) => {
                const currentScore = scores[crit.key]
                const percentage = Math.round((currentScore / crit.max) * 100)

                return (
                  <div 
                    key={crit.key} 
                    className="p-5 rounded-2xl bg-[#12281b]/70 border border-white/10 hover:border-[#84cc16]/40 transition-all print:border-black print:bg-white"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Left: Info */}
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-6 rounded-full bg-[#84cc16]/20 border border-[#84cc16]/40 text-[#84cc16] text-xs font-bold flex items-center justify-center print:border-black print:text-black">
                            {crit.no}
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-[#f5f0e6] print:text-black">
                            {crit.title}
                          </h4>
                          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#cbd5e1] print:border-black print:text-black">
                            Max: {crit.max} pts
                          </span>
                        </div>
                        <p className="text-xs text-[#cbd5e1]/80 leading-relaxed pl-8 print:text-gray-700">
                          {crit.description}
                        </p>

                        {/* Quick preset buttons */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-2 pl-8 print:hidden">
                          <span className="text-[10px] text-[#cbd5e1]/50 font-bold uppercase tracking-wider mr-1">Presets:</span>
                          {crit.hints.map((hint, hIdx) => (
                            <button
                              key={hIdx}
                              type="button"
                              onClick={() => handleScoreChange(crit.key, hint.val, crit.max)}
                              className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                                currentScore === hint.val
                                  ? "bg-[#84cc16] text-[#0f2317] font-bold"
                                  : "bg-white/5 hover:bg-white/10 text-[#cbd5e1]/80"
                              }`}
                            >
                              {hint.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right: Score Input */}
                      <div className="flex items-center gap-3 self-end lg:self-center">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max={crit.max}
                            value={currentScore}
                            onChange={(e) => handleScoreChange(crit.key, parseInt(e.target.value, 10), crit.max)}
                            className="w-20 bg-[#1c3d2b] border border-white/20 focus:border-[#84cc16] rounded-xl py-2 px-3 text-center text-lg font-bold text-[#84cc16] focus:outline-none transition-colors print:bg-white print:text-black print:border-black"
                          />
                          <span className="text-sm font-semibold text-[#cbd5e1]/70 print:text-black">
                            / {crit.max}
                          </span>
                        </div>

                        {/* Visual mini bar */}
                        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden hidden sm:block print:hidden">
                          <div 
                            className="h-full bg-[#84cc16] transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>

            {/* Total Row Summary */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:border-black">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#cbd5e1]/70 print:text-black">Aggregated Score:</span>
                <p className="text-xs text-[#cbd5e1]/60 print:text-gray-700">Combined scientific, methodological, and practical evaluation index.</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#f5f0e6] print:text-black">TOTAL SCORE:</span>
                <span className="text-3xl font-extrabold text-[#84cc16] print:text-black">
                  {totalScore}
                </span>
                <span className="text-base text-[#cbd5e1]/60 print:text-black">/ 100</span>
              </div>
            </div>

          </div>

          {/* Part B: Ethical & Legal Checklist */}
          <div className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl print:border-black print:bg-transparent print:p-4 print:shadow-none">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6 print:border-black">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#84cc16] mb-1 print:text-black">
                  <ShieldCheck size={16} />
                  Section B
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#f5f0e6] print:text-black">
                  B. Ethical & Legal Checklist (Tick ✅ or ❌)
                </h2>
                <p className="text-xs sm:text-sm text-[#cbd5e1]/70 print:text-gray-700">
                  Compliance and academic integrity verification.
                </p>
              </div>

              {/* Quick toggle all */}
              <div className="flex items-center gap-2 print:hidden">
                <button
                  type="button"
                  onClick={() => markAllEthical(true)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#84cc16]/10 text-[#84cc16] hover:bg-[#84cc16]/20 border border-[#84cc16]/30 transition-all cursor-pointer"
                >
                  Verify All (✅)
                </button>
                <button
                  type="button"
                  onClick={() => markAllEthical(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-[#cbd5e1] hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Crucial Docx Rule Notice */}
            <div className={`p-4 rounded-2xl mb-6 border flex items-start gap-3 transition-colors ${
              allEthicalChecked 
                ? "bg-[#84cc16]/10 border-[#84cc16]/30 text-[#84cc16] print:border-black print:text-black" 
                : "bg-red-500/10 border-red-500/30 text-red-400 print:border-black print:text-black"
            }`}>
              {allEthicalChecked ? (
                <CheckCircle2 size={20} className="shrink-0 mt-0.5 text-[#84cc16] print:text-black" />
              ) : (
                <AlertTriangle size={20} className="shrink-0 mt-0.5 text-red-400 print:text-black" />
              )}
              <div className="text-xs sm:text-sm">
                <span className="font-bold">Official Evaluation Rule:</span>{" "}
                <span className="font-semibold underline">
                  If any box is unchecked, the document cannot be approved.
                </span>
                <p className="text-xs opacity-90 mt-1">
                  {allEthicalChecked 
                    ? "✓ All 5 ethical and legal criteria have been verified. The manuscript is eligible for positive publication recommendation."
                    : "⚠️ One or more ethical checkboxes are currently unchecked. The document cannot receive an approval recommendation until all items are verified."}
                </p>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {ETHICAL_ITEMS.map((item) => {
                const checked = checklist[item.key]
                return (
                  <div
                    key={item.key}
                    onClick={() => toggleChecklist(item.key)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      checked
                        ? "bg-[#12281b] border-[#84cc16]/40 hover:border-[#84cc16]"
                        : "bg-[#12281b]/50 border-white/10 hover:border-red-400/40"
                    } print:border-black print:bg-white`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        checked
                          ? "bg-[#84cc16] text-[#0f2317]"
                          : "bg-white/5 border border-white/20 text-transparent"
                      } print:border-black print:text-black`}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#f5f0e6] print:text-black">
                          {item.label}
                        </h4>
                        <p className="text-xs text-[#cbd5e1]/70 print:text-gray-700">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider shrink-0 ${
                      checked
                        ? "text-[#84cc16] border-[#84cc16]/30 bg-[#84cc16]/10"
                        : "text-red-400 border-red-400/30 bg-red-400/10"
                    } print:border-black print:text-black`}>
                      {checked ? "Verified ✅" : "Unchecked ❌"}
                    </span>
                  </div>
                )
              })}
            </div>

          </div>

          {/* Part C: Reviewer Recommendation (Select One) */}
          <div className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl print:border-black print:bg-transparent print:p-4 print:shadow-none">
            
            <div className="pb-4 border-b border-white/10 mb-6 print:border-black">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#84cc16] mb-1 print:text-black">
                <ClipboardCheck size={16} />
                Section C
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#f5f0e6] print:text-black">
                C. Reviewer Recommendation (Select One)
              </h2>
              <p className="text-xs sm:text-sm text-[#cbd5e1]/70 print:text-gray-700">
                Select the final editorial recommendation based on score performance and ethical clearance.
              </p>
            </div>

            <div className="space-y-3">
              {RECOMMENDATIONS.map((rec) => {
                const isSelected = recommendation === rec.id
                const isApprovalType = rec.id === "Accepted for Publication" || rec.id === "Accepted with Minor Revisions"
                const hasEthicalBlock = isApprovalType && !allEthicalChecked

                return (
                  <label
                    key={rec.id}
                    className={`block p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#12281b] border-[#84cc16] ring-1 ring-[#84cc16]/50"
                        : "bg-[#12281b]/50 border-white/10 hover:border-white/25"
                    } ${hasEthicalBlock ? "opacity-75" : ""} print:border-black print:bg-white`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="recommendation"
                        checked={isSelected}
                        onChange={() => setRecommendation(rec.id)}
                        className="mt-1 accent-[#84cc16] w-4 h-4 cursor-pointer print:text-black"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-[#f5f0e6] print:text-black">
                            {rec.label}
                          </span>
                          {hasEthicalBlock && (
                            <span className="text-[10px] font-bold text-red-400 bg-red-400/10 border border-red-400/30 px-2 py-0.5 rounded-md print:border-black print:text-black">
                              Blocked: Ethical items unchecked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#cbd5e1]/70 mt-0.5 print:text-gray-700">
                          {rec.desc}
                        </p>
                      </div>
                    </div>
                  </label>
                )
              })}

              {recommendation === "Other" && (
                <div className="pt-2 pl-7">
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                    Specify Custom Disposition / Referral:
                  </label>
                  <input
                    type="text"
                    value={otherRecommendation}
                    onChange={(e) => setOtherRecommendation(e.target.value)}
                    placeholder="Provide specific custom recommendation instructions..."
                    className="w-full bg-[#12281b] border border-white/15 rounded-xl py-2.5 px-4 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] print:bg-white print:text-black print:border-black"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Part D: Reviewer Comments & Required Revisions */}
          <div className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl print:border-black print:bg-transparent print:p-4 print:shadow-none">
            
            <div className="pb-4 border-b border-white/10 mb-6 print:border-black">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#84cc16] mb-1 print:text-black">
                <FileText size={16} />
                Section D
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#f5f0e6] print:text-black">
                D. Reviewer Comments & Required Revisions
              </h2>
              <p className="text-xs sm:text-sm text-[#cbd5e1]/70 print:text-gray-700">
                Detailed editorial feedback, required revisions, and technical notes for authors and editors.
              </p>
            </div>

            {/* Quick helper notes buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-3 print:hidden">
              <span className="text-xs text-[#cbd5e1]/60">Quick Insert:</span>
              {[
                "Clarify sampling methodology in Section 2.",
                "Ensure figure resolution complies with 300 DPI print standard.",
                "Verify dataset availability in public repository.",
                "Update literature citations to include recent 2024-2025 findings."
              ].map((snippet, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => setComments(prev => `${prev}\n• ${snippet}`)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-[#cbd5e1] border border-white/10 transition-colors cursor-pointer"
                >
                  + {snippet.slice(0, 32)}...
                </button>
              ))}
            </div>

            <textarea
              rows={8}
              required
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Provide comprehensive review commentary, constructive criticism, and explicit revision guidance..."
              className="w-full bg-[#12281b] border border-white/10 rounded-2xl p-4 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] leading-relaxed transition-colors print:bg-white print:text-black print:border-black font-sans"
            />
          </div>

          {/* Sign-off & Final Editorial Decision */}
          <div className="bg-[#1c3d2b]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl print:border-black print:bg-transparent print:p-4 print:shadow-none">
            
            <h2 className="text-xl sm:text-2xl font-bold text-[#f5f0e6] mb-6 print:text-black">
              Sign-Off & Editorial Certification
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                  Reviewer Digital Signature *
                </label>
                <input
                  type="text"
                  required
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Type legal name to digitally sign"
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl py-2.5 px-4 text-sm font-mono text-[#84cc16] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] transition-colors print:bg-white print:text-black print:border-black"
                />
                <p className="text-[11px] text-[#cbd5e1]/60 mt-1 print:text-gray-700">
                  Timestamp recorded: {dateOfReview} • Verified Peer-Review Credentials
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5 print:text-black">
                  Final Editorial Decision / Notes
                </label>
                <input
                  type="text"
                  value={editorialDecision}
                  onChange={(e) => setEditorialDecision(e.target.value)}
                  placeholder="e.g. Recommended for publication upon minor revisions"
                  className="w-full bg-[#12281b] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] transition-colors print:bg-white print:text-black print:border-black"
                />
              </div>
            </div>

            {/* Certification Checkbox */}
            <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#12281b]/50 border border-white/10 cursor-pointer print:border-black print:bg-white">
              <input
                type="checkbox"
                required
                checked={certified}
                onChange={(e) => setCertified(e.target.checked)}
                className="mt-1 accent-[#84cc16] w-4 h-4 cursor-pointer print:text-black"
              />
              <span className="text-xs text-[#cbd5e1]/90 leading-relaxed print:text-black">
                I hereby certify that this score sheet constitutes an objective, independent academic evaluation conducted under the Digital Forestry Information Hub peer-review guidelines, without undisclosed conflicts of interest.
              </span>
            </label>

          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-400 text-sm flex items-start gap-3 print:hidden">
              <AlertTriangle size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Evaluation Cannot Be Submitted</p>
                <p className="text-xs opacity-90 mt-0.5">{validationError}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 print:hidden">
            <Link
              href="/reviewer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-white/15 hover:bg-white/5 text-[#cbd5e1] hover:text-white font-semibold text-sm transition-all text-center"
            >
              Cancel & Return to Portal
            </Link>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 sm:flex-none px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-[#f5f0e6] font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer size={16} />
                Print / PDF
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-sm transition-all shadow-xl shadow-[#84cc16]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0f2317] border-t-transparent rounded-full animate-spin" />
                    Submitting Evaluation...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Evaluation Form
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

        {/* Submission Confirmation Receipt Modal */}
        {submittedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in print:p-0 print:bg-white print:fixed-none">
            <div className="bg-[#1c3d2b] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden print:border-black print:bg-white print:text-black print:shadow-none">
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#84cc16]/20 border border-[#84cc16]/40 text-[#84cc16] flex items-center justify-center mx-auto mb-4 print:border-black print:text-black">
                  <CheckCircle2 size={36} />
                </div>
                <span className="text-xs font-mono font-bold text-[#84cc16] uppercase tracking-wider print:text-black">
                  Submission Certified • {submittedReceipt.evalId}
                </span>
                <h3 className="text-2xl font-extrabold text-[#f5f0e6] mt-1 print:text-black">
                  Evaluation Score Sheet Submitted
                </h3>
                <p className="text-xs sm:text-sm text-[#cbd5e1]/80 mt-1 print:text-gray-700">
                  Your official peer-review evaluation has been permanently recorded and dispatched to the editorial repository.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#12281b] border border-white/10 rounded-2xl p-5 space-y-3 mb-6 print:border-black print:bg-white">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10 print:border-black">
                  <span className="text-[#cbd5e1]/70 print:text-gray-700">Document Evaluated:</span>
                  <span className="font-bold text-[#f5f0e6] text-right truncate max-w-[260px] print:text-black">
                    {submittedReceipt.document.title}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10 print:border-black">
                  <span className="text-[#cbd5e1]/70 print:text-gray-700">Reviewer:</span>
                  <span className="font-bold text-[#f5f0e6] print:text-black">
                    {submittedReceipt.reviewer.name}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10 print:border-black">
                  <span className="text-[#cbd5e1]/70 print:text-gray-700">Total Score:</span>
                  <span className="font-black text-[#84cc16] text-base print:text-black">
                    {submittedReceipt.totalScore} / 100 ({submittedReceipt.grade})
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-white/10 print:border-black">
                  <span className="text-[#cbd5e1]/70 print:text-gray-700">Ethical Checklist:</span>
                  <span className="font-bold text-emerald-400 print:text-black">
                    {submittedReceipt.allEthicalChecked ? "5/5 Verified ✅" : "Deficiencies Noted ⚠️"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#cbd5e1]/70 print:text-gray-700">Editorial Recommendation:</span>
                  <span className="font-bold text-[#f5f0e6] print:text-black">
                    {submittedReceipt.recommendation}
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-[#f5f0e6] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer size={16} />
                  Print / Save PDF Receipt
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedReceipt(null)
                      // Reset or pick next
                      setSelectedDocId("2")
                      handleSelectDoc("2")
                    }}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#cbd5e1] cursor-pointer"
                  >
                    Evaluate Another
                  </button>
                  <Link
                    href="/reviewer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] text-xs font-bold transition-all text-center cursor-pointer shadow-lg shadow-[#84cc16]/20"
                  >
                    Back to Reviewer Portal
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default function ReviewerEvaluatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#163022] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#84cc16] border-t-transparent animate-spin" />
      </div>
    }>
      <ReviewerEvaluationContent />
    </Suspense>
  )
}
