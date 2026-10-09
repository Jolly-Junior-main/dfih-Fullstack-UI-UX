"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronRight, UploadCloud, FileText, ImageIcon, Link as LinkIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Media & Files" },
  { id: 3, name: "Contact & Social" },
  { id: 4, name: "Review" },
]

const resourceTypes = [
  "Applications", "Case studies", "Dataset", "Handbook", "Infographics", "Maps", "Models",
  "Photos", "Podcast", "Regulations", "Reports", "Scientific Papers", "Syllabus", "Videos",
  "Books / excerpts", "Guidelines", "Manuals", "News", "Presentation", "Roadmap", "Tools"
]

const regions = ["All", "Global", "Africa", "Asia", "Australia", "Europe", "North America", "South America"]

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

  // Comprehensive state matching the requested form
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
    types: [] as string[],
    region: "",
    resourceURL: "",
    listingAddress: "",
    contactEmail: "",
    contactPhone: "",
    contactWebsite: "",
    socialFacebook: "",
    socialTwitter: "",
    socialGoogle: "",
    socialLinkedin: ""
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleResourceType = (type: string) => {
    setFormData(prev => {
      const types = prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
      return { ...prev, types }
    })
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
        ...formData,
        status: "Pending Review",
        author: "Researcher User", // Mock user for now since auth is mocked
        createdAt: serverTimestamp()
      })
      alert("Research submitted successfully! It is now pending review by an administrator.")
      router.push("/") // Redirect home or somewhere else
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
          <p className="text-[#0f172a]/60 text-sm md:text-base max-w-2xl mx-auto">
            Add a new listing to the Digital Forestry Information Hub. Please fill out all required fields to ensure your resource is properly categorized.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#0f172a]/10 -z-10 -translate-y-1/2"></div>
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-[#84cc16] -z-10 -translate-y-1/2 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${
                  currentStep === step.id 
                    ? "bg-[#84cc16] border-[#84cc16] text-[#ffffff]" 
                    : currentStep > step.id 
                      ? "bg-[#84cc16] border-[#84cc16] text-[#ffffff]"
                      : "bg-[#ffffff] border-[#0f172a]/20 text-[#0f172a]/50"
                }`}>
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <div className={`text-[10px] uppercase tracking-widest font-semibold hidden md:block ${
                  currentStep >= step.id ? "text-[#0f172a]" : "text-[#0f172a]/40"
                }`}>
                  {step.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#ffffff] border border-slate-200 rounded-[2rem] p-6 md:p-12 shadow-xl relative overflow-hidden">
          
          {/* STEP 1: Basic Info */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">1. Basic Information</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0f172a]/80">Title <span className="text-[#84cc16]">*</span></label>
                  <Input 
                    placeholder="Enter the official title" 
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    className="bg-[#ffffff] border-slate-200 text-[#0f172a] h-12 focus:border-[#84cc16]"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0f172a]/80">Body (Description) <span className="text-[#84cc16]">*</span></label>
                  <Textarea 
                    placeholder="Provide a brief summary of this resource..." 
                    value={formData.body}
                    onChange={(e) => updateFormData("body", e.target.value)}
                    className="bg-[#ffffff] border-slate-200 text-[#0f172a] min-h-[160px] resize-none focus:border-[#84cc16]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0f172a]/80">Resource Category <span className="text-[#84cc16]">*</span></label>
                    <select 
                      className="flex w-full rounded-md border border-slate-200 bg-[#ffffff] px-3 py-2 text-sm text-[#0f172a] h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84cc16] appearance-none"
                      value={formData.category}
                      onChange={(e) => updateFormData("category", e.target.value)}
                    >
                      <option value="" disabled>- Please select -</option>
                      <option value="Policy and Governance">Policy and Governance</option>
                      <option value="Sustainable Forest Management">Sustainable Forest Management</option>
                      <option value="Forest Economics">Forest Economics</option>
                      <option value="Climate Change">Climate Change Mitigation</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0f172a]/80">Resource Region <span className="text-[#84cc16]">*</span></label>
                    <select 
                      className="flex w-full rounded-md border border-slate-200 bg-[#ffffff] px-3 py-2 text-sm text-[#0f172a] h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84cc16] appearance-none"
                      value={formData.region}
                      onChange={(e) => updateFormData("region", e.target.value)}
                    >
                      <option value="" disabled>- Please select -</option>
                      {regions.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-sm font-medium text-[#0f172a]/80">Resource Types</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {resourceTypes.map((type) => (
                      <label key={type} className="flex items-center space-x-2 text-sm text-[#0f172a]/70 cursor-pointer hover:text-[#0f172a]">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300 text-[#84cc16] focus:ring-[#84cc16]"
                          checked={formData.types.includes(type)}
                          onChange={() => toggleResourceType(type)}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Media & Files */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">2. Media & Files</h2>
              <div className="space-y-8">
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-[#0f172a]/80">Listing Featured Image <span className="text-[#84cc16]">*</span></label>
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-center gap-4">
                    <Button variant="outline" className="shrink-0 bg-white border-slate-300">Choose File</Button>
                    <span className="text-sm text-slate-500 truncate">No file chosen</span>
                  </div>
                  <p className="text-xs text-slate-400">One file only. 2 MB limit. Allowed types: png gif jpg jpeg webp.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-[#0f172a]/80">Resource File</label>
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-center gap-4">
                    <Button variant="outline" className="shrink-0 bg-white border-slate-300">Choose File</Button>
                    <span className="text-sm text-slate-500 truncate">No file chosen</span>
                  </div>
                  <p className="text-xs text-slate-400">One file only. 2 MB limit. Allowed types: txt pdf doc docx xls xlsx ppt pptx.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-[#0f172a]/80">Resource Gallery</label>
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-center gap-4">
                    <Button variant="outline" className="shrink-0 bg-white border-slate-300">Choose Files</Button>
                    <span className="text-sm text-slate-500 truncate">No files chosen</span>
                  </div>
                  <p className="text-xs text-slate-400">Unlimited number of files. 2 MB limit. Allowed types: png gif jpg jpeg.</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <label className="text-sm font-medium text-[#0f172a]/80">Resource URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      placeholder="https://" 
                      value={formData.resourceURL}
                      onChange={(e) => updateFormData("resourceURL", e.target.value)}
                      className="bg-[#ffffff] border-slate-200 text-[#0f172a] h-12 pl-10 focus:border-[#84cc16]"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: Contact & Social */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">3. Contact & Social Information</h2>
              <div className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0f172a]/80">Listing Address</label>
                  <Input 
                    value={formData.listingAddress}
                    onChange={(e) => updateFormData("listingAddress", e.target.value)}
                    className="bg-[#ffffff] border-slate-200 text-[#0f172a] h-12 focus:border-[#84cc16]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0f172a]/80">Contact Email</label>
                    <Input 
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => updateFormData("contactEmail", e.target.value)}
                      className="bg-[#ffffff] border-slate-200 text-[#0f172a] h-12 focus:border-[#84cc16]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0f172a]/80">Contact Phone</label>
                    <Input 
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => updateFormData("contactPhone", e.target.value)}
                      className="bg-[#ffffff] border-slate-200 text-[#0f172a] h-12 focus:border-[#84cc16]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0f172a]/80">Contact Website</label>
                  <Input 
                    value={formData.contactWebsite}
                    onChange={(e) => updateFormData("contactWebsite", e.target.value)}
                    className="bg-[#ffffff] border-slate-200 text-[#0f172a] h-12 focus:border-[#84cc16]"
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-medium text-[#0f172a]">Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Facebook URL" value={formData.socialFacebook} onChange={(e) => updateFormData("socialFacebook", e.target.value)} className="h-10" />
                    <Input placeholder="Twitter URL" value={formData.socialTwitter} onChange={(e) => updateFormData("socialTwitter", e.target.value)} className="h-10" />
                    <Input placeholder="Google URL" value={formData.socialGoogle} onChange={(e) => updateFormData("socialGoogle", e.target.value)} className="h-10" />
                    <Input placeholder="LinkedIn URL" value={formData.socialLinkedin} onChange={(e) => updateFormData("socialLinkedin", e.target.value)} className="h-10" />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">4. Review & Submit</h2>
              
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4 mb-8">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 border-b border-[#0f172a]/5 pb-4">
                  <div className="text-sm text-[#0f172a]/50">Title</div>
                  <div className="md:col-span-2 text-sm text-[#0f172a] font-medium">{formData.title || "Not provided"}</div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 border-b border-[#0f172a]/5 pb-4">
                  <div className="text-sm text-[#0f172a]/50">Category</div>
                  <div className="md:col-span-2 text-sm text-[#0f172a]">{formData.category || "Not provided"}</div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 border-b border-[#0f172a]/5 pb-4">
                  <div className="text-sm text-[#0f172a]/50">Region</div>
                  <div className="md:col-span-2 text-sm text-[#0f172a]">{formData.region || "Not provided"}</div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 border-b border-[#0f172a]/5 pb-4">
                  <div className="text-sm text-[#0f172a]/50">Resource Types</div>
                  <div className="md:col-span-2 text-sm text-[#0f172a]">
                    {formData.types.length > 0 ? formData.types.join(", ") : "None selected"}
                  </div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 border-b border-[#0f172a]/5 pb-4">
                  <div className="text-sm text-[#0f172a]/50">Contact Email</div>
                  <div className="md:col-span-2 text-sm text-[#0f172a]">{formData.contactEmail || "Not provided"}</div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4">
                  <div className="text-sm text-[#0f172a]/50">Media</div>
                  <div className="md:col-span-2 text-sm flex flex-col gap-2 text-[#84cc16]">
                    <div className="flex items-center"><ImageIcon className="w-4 h-4 mr-2 shrink-0" /> Featured Image (Pending Upload)</div>
                    <div className="flex items-center"><FileText className="w-4 h-4 mr-2 shrink-0" /> Document (Pending Upload)</div>
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
          <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center">
            {currentStep > 1 ? (
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="border-[#0f172a]/20 text-[#0f172a] hover:bg-slate-100"
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
                {isSubmitting ? "Submitting..." : "Submit Listing"}
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
