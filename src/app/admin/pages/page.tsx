"use client"

import { useState, useEffect } from "react"
import { Save, Check, FileEdit } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore"

export default function AdminPagesContent() {
  const [pages, setPages] = useState<any>({})
  const [activeTab, setActiveTab] = useState("home")
  const [formData, setFormData] = useState<any>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Default structure so admin can edit any main page
  const defaultStructure: any = {
    home: {
      heroTitle: "Digital Forestry Information Hub",
      heroSubtitle: "Empowering global forestry research through open data sharing and collaborative analytics.",
      heroButtonText: "Explore Repository",
      introTitle: "Global Repository",
      introDescription: "Helping researchers, analysts, and policymakers access critical ecological datasets, silviculture models, and verified policy frameworks."
    },
    about: {
      title: "About Us",
      content: "Building the definitive global repository for forestry research.",
      missionTitle: "Our Mission & Impact",
      missionContent: "The Digital Forestry Information Hub (DFIH) was established to bridge the gap between academic research and actionable policymaking. By centralizing millions of datasets, peer-reviewed articles, and on-the-ground management manuals, we empower researchers and governments to make data-driven decisions that protect our world's lungs."
    },
    resources: {
      headerTitle: "Forestry Research Repository",
      headerSubtitle: "Search and access verified datasets, silviculture reports, biodiversity assessments, and field manuals from global research institutions."
    },
    contact: {
      headerTitle: "Get in Touch",
      headerSubtitle: "Have questions about submitting research, joining as a partner institution, or accessing restricted datasets? Connect with the DFIH secretariat."
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "page_content"), (snapshot) => {
      const data: any = {}
      snapshot.forEach(docSnap => {
        data[docSnap.id] = docSnap.data()
      })
      setPages(data)
      
      // Initialize form data with DB data or fall back to default
      if (data[activeTab]) {
        setFormData(data[activeTab])
      } else {
        setFormData(defaultStructure[activeTab] || {})
      }
    }, (err) => console.error("Error fetching pages:", err))

    return () => unsubscribe()
  }, [activeTab])

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab)
    setSaveSuccess(false)
    if (pages[tab]) {
      setFormData(pages[tab])
    } else {
      setFormData(defaultStructure[tab] || {})
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    try {
      await setDoc(doc(db, "page_content", activeTab), formData)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (e) {
      console.error(e)
      alert("Failed to save page content.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }))
  }

  return (
    <main className="p-6 md:p-10 bg-[#163022] min-h-screen text-[#f5f0e6]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#f5f0e6]">Static Pages Editor</h1>
            <p className="text-[#cbd5e1]/70 mt-1">
              Edit the headings, copy, and key text across any public page in real time.
            </p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#84cc16]/20 cursor-pointer disabled:opacity-50 shrink-0"
          >
            {saveSuccess ? <Check size={18} /> : <Save size={18} />}
            {isSaving ? "Saving..." : saveSuccess ? "Saved Successfully!" : "Save Changes"}
          </button>
        </div>

        {/* Page Switcher Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
          {Object.keys(defaultStructure).map(tab => (
            <button
              key={tab}
              onClick={() => handleTabSwitch(tab)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab 
                  ? "bg-[#84cc16] text-[#0f2317] shadow-md shadow-[#84cc16]/20" 
                  : "bg-[#1c3d2b] border border-white/10 text-[#cbd5e1] hover:text-white hover:bg-white/5"
              }`}
            >
              {tab} Page
            </button>
          ))}
        </div>

        {/* Content Form Editor */}
        <div className="bg-[#1c3d2b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
            <FileEdit className="text-[#84cc16]" size={20} />
            <h2 className="text-xl font-bold text-[#f5f0e6] capitalize">{activeTab} Page Content</h2>
          </div>

          <div className="space-y-6">
            {Object.keys(formData).map((key) => {
              const isLongText = key.toLowerCase().includes('content') || 
                                key.toLowerCase().includes('subtitle') || 
                                key.toLowerCase().includes('description')

              return (
                <div key={key}>
                  <label className="text-xs font-bold text-[#cbd5e1] mb-2 block uppercase tracking-wider">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {isLongText ? (
                    <textarea 
                      value={formData[key] || ""} 
                      onChange={e => handleChange(key, e.target.value)}
                      className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-3 min-h-[110px] text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] transition-colors"
                    />
                  ) : (
                    <input 
                      type="text" 
                      value={formData[key] || ""} 
                      onChange={e => handleChange(key, e.target.value)}
                      className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder:text-white/30 focus:outline-none focus:border-[#84cc16] transition-colors"
                    />
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#84cc16]/20 cursor-pointer disabled:opacity-50"
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Save Page Content"}
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}
