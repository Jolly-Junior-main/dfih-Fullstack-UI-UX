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
    const auth = sessionStorage.getItem("user_auth")
    if (!auth) {
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
    return <div className="flex flex-col min-h-screen pt-20 bg-[#ffffff] justify-center items-center"><p className="text-slate-500 font-medium">Checking authorization...</p></div>
  }

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-[#ffffff]">
      {/* Header Area */}
      <div className="border-b border-[#0f172a]/5 bg-slate-50">
        <div className="container mx-auto px-6 py-12 max-w-4xl text-center">
          <div className="text-[10px] uppercase tracking-widest text-[#84cc16] font-bold mb-4">Contributor Portal</div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#0f172a] mb-4">Submit Resource</h1>
          <p className="text-[#0f172a]/70">Contribute to the global repository by uploading a new dataset, report, or publication.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl flex-1">
        
        {/* Stepper Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#0f172a]/10 z-0"></div>
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
                        ? "bg-[#84cc16] border-[#84cc16] text-[#ffffff]" 
                        : isActive 
                          ? "bg-[#f8fafc] border-[#84cc16] text-[#84cc16]"
                          : "bg-[#f8fafc] border-[#0f172a]/20 text-[#0f172a]/60"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`absolute top-12 md:top-14 text-[10px] md:text-xs font-medium text-center ${isActive ? "text-[#0f172a]" : "text-[#0f172a]/50"} ${isActive ? "block" : "hidden sm:block"}`}>
                    {step.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#84cc16]/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 mt-16 shadow-2xl">
          
          {/* STEP 1: Document Info */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">1. Document Information</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-[#0f172a]/70">Resource Title <span className="text-[#84cc16]">*</span></label>
                  <Input 
                    placeholder="Enter the official title" 
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    className="bg-[#ffffff] border-white/20 text-[#0f172a] h-12 focus:border-[#84cc16]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0f172a]/70">Thematic Category <span className="text-[#84cc16]">*</span></label>
                  <select 
                    className="flex w-full rounded-md border border-white/20 bg-[#ffffff] px-3 py-2 text-sm text-[#0f172a] h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84cc16] appearance-none"
                    value={formData.theme}
                    onChange={(e) => updateFormData("theme", e.target.value)}
                  >
                    <option value="" disabled>Select a theme...</option>
                    <option value="Policy and Governance">Policy and Governance</option>
                    <option value="Sustainable Forest Management">Sustainable Forest Management</option>
                    <option value="Forest Economics">Forest Economics</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0f172a]/70">Description / Abstract</label>
                  <Textarea 
                    placeholder="Provide a brief summary of this resource..." 
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    className="bg-[#ffffff] border-white/20 text-[#0f172a] min-h-[120px] resize-none focus:border-[#84cc16]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Ownership */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">2. Ownership & Attribution</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-[#0f172a]/70">Primary Author(s)</label>
                  <Input 
                    placeholder="E.g. Dr. Jane Doe" 
                    value={formData.author}
                    onChange={(e) => updateFormData("author", e.target.value)}
                    className="bg-[#ffffff] border-white/20 text-[#0f172a] h-12 focus:border-[#84cc16]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0f172a]/70">Publishing Institution</label>
                  <Input 
                    placeholder="E.g. Ministry of Environment" 
                    value={formData.institution}
                    onChange={(e) => updateFormData("institution", e.target.value)}
                    className="bg-[#ffffff] border-white/20 text-[#0f172a] h-12 focus:border-[#84cc16]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: File Upload */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">3. Upload Resource</h2>
              <div className="border-2 border-dashed border-[#0f172a]/20 rounded-2xl bg-[#84cc16]/50 flex flex-col items-center justify-center p-6 md:p-12 text-center hover:bg-[#ffffff] hover:border-[#84cc16]/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#84cc16]/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <UploadCloud className="w-6 h-6 md:w-8 md:h-8 text-[#84cc16]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#0f172a] mb-2">Drag & Drop your file here</h3>
                <p className="text-sm text-[#0f172a]/50 mb-6">Supports PDF, DOCX, XLSX up to 50MB</p>
                <Button variant="outline" className="border-[#84cc16] text-[#84cc16] hover:bg-[#84cc16] hover:text-[#ffffff]">
                  Browse Files
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">4. Review & Submit</h2>
              <div className="bg-[#ffffff] rounded-xl p-6 border border-white/20 space-y-4 mb-8">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 border-b border-[#0f172a]/5 pb-4">
                  <div className="text-sm text-[#0f172a]/50">Title</div>
                  <div className="md:col-span-2 text-sm text-[#0f172a] font-medium">{formData.title || "—"}</div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 border-b border-[#0f172a]/5 pb-4">
                  <div className="text-sm text-[#0f172a]/50">Category</div>
                  <div className="md:col-span-2 text-sm text-[#0f172a]">{formData.theme || "—"}</div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 border-b border-[#0f172a]/5 pb-4">
                  <div className="text-sm text-[#0f172a]/50">Author</div>
                  <div className="md:col-span-2 text-sm text-[#0f172a]">{formData.author || "—"}</div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4">
                  <div className="text-sm text-[#0f172a]/50">File</div>
                  <div className="md:col-span-2 text-sm flex items-center text-[#84cc16]">
                    <FileText className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">document_final.pdf (Ready)</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#84cc16]/10 border border-[#84cc16]/20 rounded-xl text-sm text-[#0f172a]/80 flex gap-3">
                <Check className="w-5 h-5 text-[#84cc16] flex-shrink-0" />
                <p>By submitting this resource, you confirm that you have the right to share this data publicly on the Digital Forestry Information Hub.</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 pt-6 border-t border-white/20 flex justify-between items-center">
            {currentStep > 1 ? (
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="border-[#0f172a]/20 text-[#0f172a] hover:bg-[#0f172a] hover:text-[#ffffff]"
              >
                Back
              </Button>
            ) : (
              <div></div> // Empty div for flex spacing
            )}

            {currentStep < 4 ? (
              <Button 
                onClick={handleNext}
                className="bg-[#84cc16] text-[#ffffff] hover:bg-[#65a30d] font-bold px-8"
              >
                Continue <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.title}
                className="bg-[#0f172a] text-[#ffffff] hover:bg-slate-800 font-bold px-8 disabled:opacity-50"
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
