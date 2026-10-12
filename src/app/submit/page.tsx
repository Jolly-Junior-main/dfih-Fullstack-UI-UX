"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronRight, UploadCloud, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const steps = [
  { id: 1, name: "Document Info" },
  { id: 2, name: "Ownership" },
  { id: 3, name: "File Upload" },
  { id: 4, name: "Review & Submit" },
]

export default function SubmitResourcePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const email = sessionStorage.getItem("user_email")
    const loggedIn = sessionStorage.getItem("user_logged_in") === "true"
    const admin = sessionStorage.getItem("admin_auth") === "true"
    if (!admin && (!email || !loggedIn)) {
      router.push("/login")
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  // Dummy state to hold form data for the review step
  const [formData, setFormData] = useState({
    title: "",
    theme: "",
    description: "",
    author: "",
    institution: "",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(c => c + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(c => c - 1)
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      await addDoc(collection(db, "research_submissions"), {
        title: formData.title,
        category: formData.theme,
        body: formData.description,
        author: formData.author,
        institution: formData.institution,
        status: "Pending Review",
        createdAt: serverTimestamp()
      })
      alert("Research submitted successfully! It is now pending review.")
      router.push("/")
    } catch (error) {
      console.error("Error submitting document: ", error)
      alert("There was an error submitting your research.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthorized) {
    return <div className="flex flex-col min-h-screen pt-20 bg-[#163022] justify-center items-center"><p className="text-slate-400 font-medium">Checking authorization...</p></div>
  }

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-[#163022]">
      {/* Header Area */}
      <div className="border-b border-white/10 bg-[#0d1e14]/60">
        <div className="container mx-auto px-6 py-12 max-w-4xl text-center">
          <div className="text-[10px] uppercase tracking-widest text-[#84cc16] font-bold mb-4">Contributor Portal</div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#f5f0e6] mb-4">Submit Resource</h1>
          <p className="text-[#f5f0e6]/70">Contribute to the global repository by uploading a new dataset, report, or publication.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl flex-1">
        
        {/* Stepper Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/10 z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#84cc16] z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
            
            {steps.map((step) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
                      isCompleted 
                        ? "bg-[#84cc16] border-[#84cc16] text-[#0f2317]" 
                        : isActive 
                          ? "bg-[#163022] border-[#84cc16] text-[#84cc16]"
                          : "bg-[#163022] border-white/20 text-[#f5f0e6]/40"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : step.id}
                  </div>
                  <span className={`absolute top-12 md:top-14 text-[10px] md:text-xs font-medium text-center ${isActive ? "text-[#f5f0e6]" : "text-[#f5f0e6]/40"} ${isActive ? "block" : "hidden sm:block"}`}>
                    {step.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#1c3d2b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mt-16 shadow-2xl">
          
          {/* STEP 1: Document Info */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#f5f0e6] mb-6">1. Document Information</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-[#f5f0e6]/80">Resource Title <span className="text-[#84cc16]">*</span></label>
                  <Input 
                    placeholder="Enter the official title" 
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    className="bg-[#163022] border-white/15 text-[#f5f0e6] placeholder:text-white/40 h-12 focus:border-[#84cc16]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#f5f0e6]/80">Thematic Category <span className="text-[#84cc16]">*</span></label>
                  <select 
                    className="flex w-full rounded-md border border-white/15 bg-[#163022] px-3 py-2 text-sm text-[#f5f0e6] h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84cc16]"
                    value={formData.theme}
                    onChange={(e) => updateFormData("theme", e.target.value)}
                  >
                    <option value="" disabled className="bg-[#163022] text-[#f5f0e6]">Select a theme...</option>
                    <option value="Forest Biotechnology" className="bg-[#163022] text-[#f5f0e6]">Forest Biotechnology</option>
                    <option value="Forest Genetics & Tree Improvement" className="bg-[#163022] text-[#f5f0e6]">Forest Genetics & Tree Improvement</option>
                    <option value="Forest Products Development" className="bg-[#163022] text-[#f5f0e6]">Forest Products Development</option>
                    <option value="Policy, Economics & Gender" className="bg-[#163022] text-[#f5f0e6]">Policy, Economics & Gender</option>
                    <option value="Forest Entomology" className="bg-[#163022] text-[#f5f0e6]">Forest Entomology</option>
                    <option value="Forest Ecology & Management" className="bg-[#163022] text-[#f5f0e6]">Forest Ecology & Management</option>
                    <option value="Agroforestry" className="bg-[#163022] text-[#f5f0e6]">Agroforestry</option>
                    <option value="Afforestation & Reforestation" className="bg-[#163022] text-[#f5f0e6]">Afforestation & Reforestation</option>
                    <option value="Dryland Forestry" className="bg-[#163022] text-[#f5f0e6]">Dryland Forestry</option>
                    <option value="Forest Pathology" className="bg-[#163022] text-[#f5f0e6]">Forest Pathology</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#f5f0e6]/80">Description / Abstract</label>
                  <Textarea 
                    placeholder="Provide a brief summary of this resource..." 
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    className="bg-[#163022] border-white/15 text-[#f5f0e6] placeholder:text-white/40 min-h-[120px] resize-none focus:border-[#84cc16]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Ownership */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#f5f0e6] mb-6">2. Ownership & Attribution</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-[#f5f0e6]/80">Primary Author(s)</label>
                  <Input 
                    placeholder="E.g. Dr. Jane Doe" 
                    value={formData.author}
                    onChange={(e) => updateFormData("author", e.target.value)}
                    className="bg-[#163022] border-white/15 text-[#f5f0e6] placeholder:text-white/40 h-12 focus:border-[#84cc16]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#f5f0e6]/80">Publishing Institution</label>
                  <Input 
                    placeholder="E.g. Ministry of Environment" 
                    value={formData.institution}
                    onChange={(e) => updateFormData("institution", e.target.value)}
                    className="bg-[#163022] border-white/15 text-[#f5f0e6] placeholder:text-white/40 h-12 focus:border-[#84cc16]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: File Upload */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#f5f0e6] mb-6">3. Upload Resource</h2>
              <div className="border-2 border-dashed border-white/20 rounded-2xl bg-[#163022]/60 flex flex-col items-center justify-center p-6 md:p-12 text-center hover:bg-[#163022] hover:border-[#84cc16]/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#84cc16]/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <UploadCloud className="w-6 h-6 md:w-8 md:h-8 text-[#84cc16]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#f5f0e6] mb-2">Drag & Drop your file here</h3>
                <p className="text-sm text-[#f5f0e6]/60 mb-6">Supports PDF, DOCX, XLSX up to 50MB</p>
                <Button variant="outline" className="border-[#84cc16] text-[#84cc16] hover:bg-[#84cc16] hover:text-[#0f2317]">
                  Browse Files
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#f5f0e6] mb-6">4. Review & Submit</h2>
              <div className="bg-[#163022] rounded-xl p-6 border border-white/10 space-y-4 mb-8">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 border-b border-white/10 pb-4">
                  <div className="text-sm text-[#f5f0e6]/50">Title</div>
                  <div className="md:col-span-2 text-sm text-[#f5f0e6] font-medium">{formData.title || "—"}</div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 border-b border-white/10 pb-4">
                  <div className="text-sm text-[#f5f0e6]/50">Category</div>
                  <div className="md:col-span-2 text-sm text-[#f5f0e6]">{formData.theme || "—"}</div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 border-b border-white/10 pb-4">
                  <div className="text-sm text-[#f5f0e6]/50">Author</div>
                  <div className="md:col-span-2 text-sm text-[#f5f0e6]">{formData.author || "—"}</div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4">
                  <div className="text-sm text-[#f5f0e6]/50">File</div>
                  <div className="md:col-span-2 text-sm flex items-center text-[#84cc16]">
                    <FileText className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">document_final.pdf (Ready)</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#84cc16]/10 border border-[#84cc16]/20 rounded-xl text-sm text-[#f5f0e6]/80 flex gap-3">
                <Check className="w-5 h-5 text-[#84cc16] flex-shrink-0" />
                <p>By submitting this resource, you confirm that you have the right to share this data publicly on the Digital Forestry Information Hub.</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
            {currentStep > 1 ? (
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="border-white/20 text-[#f5f0e6] hover:bg-white/10 hover:text-white"
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < 4 ? (
              <Button 
                onClick={handleNext}
                className="bg-[#84cc16] text-[#0f2317] hover:bg-[#84cc16]/90 font-bold px-8 shadow-lg"
              >
                Continue <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.title}
                className="bg-[#84cc16] text-[#0f2317] hover:bg-[#84cc16]/90 font-bold px-8 disabled:opacity-50 shadow-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit to Repository"}
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
