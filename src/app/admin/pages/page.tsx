"use client"

import { useState, useEffect } from "react"
import { Save } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore"

export default function AdminPagesContent() {
  const [pages, setPages] = useState<any>({})
  const [activeTab, setActiveTab] = useState("home")
  const [formData, setFormData] = useState<any>({})
  const [isSaving, setIsSaving] = useState(false)

  // Default structure so admin has something to edit if db is empty
  const defaultStructure: any = {
    home: {
      heroTitle: "Digital Forestry Information Hub",
      heroSubtitle: "Empowering global forestry research through open data sharing and collaborative analytics.",
      heroButtonText: "Explore Data",
    },
    about: {
      title: "About DFIH",
      content: "The Digital Forestry Information Hub is an initiative dedicated to organizing and sharing critical forestry data worldwide.",
      missionTitle: "Our Mission",
      missionContent: "To accelerate ecological restoration by breaking down data silos.",
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "page_content"), (snapshot) => {
      const data: any = {}
      snapshot.forEach(doc => {
        data[doc.id] = doc.data()
      })
      setPages(data)
      
      // Initialize form data with DB data or fall back to default
      if (data[activeTab]) {
        setFormData(data[activeTab])
      } else {
        setFormData(defaultStructure[activeTab] || {})
      }
    })

    return () => unsubscribe()
  }, [activeTab])

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab)
    if (pages[tab]) {
      setFormData(pages[tab])
    } else {
      setFormData(defaultStructure[tab] || {})
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await setDoc(doc(db, "page_content", activeTab), formData)
      alert("Page content saved successfully!")
    } catch (e) {
      console.error(e)
      alert("Failed to save.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }))
  }

  return (
    <main className="p-6 md:p-10 relative">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-[#0f172a]">Static Pages</h1>
            <p className="text-[#0f172a]/60 mt-1">Edit the text and content of the main website pages.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#ffffff] px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg disabled:opacity-50"
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/20 pb-4">
          {Object.keys(defaultStructure).map(tab => (
            <button
              key={tab}
              onClick={() => handleTabSwitch(tab)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all capitalize ${
                activeTab === tab 
                  ? "bg-[#84cc16]/20 text-[#84cc16] border border-[#84cc16]/30 shadow-inner" 
                  : "text-[#0f172a]/70 hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }`}
            >
              {tab} Page
            </button>
          ))}
        </div>

        {/* Editor Area */}
        <div className="bg-[#84cc16]/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
          <div className="space-y-6">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="text-sm font-medium text-[#0f172a]/80 mb-2 block capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()} {/* Format camelCase to Title Case */}
                </label>
                {key.toLowerCase().includes('content') || key.toLowerCase().includes('subtitle') ? (
                  <textarea 
                    value={formData[key]} 
                    onChange={e => handleChange(key, e.target.value)}
                    className="w-full bg-white/60 border border-white/30 rounded-xl px-4 py-3 min-h-[120px] focus:outline-none focus:border-[#84cc16] focus:bg-white transition-colors"
                  />
                ) : (
                  <input 
                    type="text" 
                    value={formData[key]} 
                    onChange={e => handleChange(key, e.target.value)}
                    className="w-full bg-white/60 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#84cc16] focus:bg-white transition-colors"
                  />
                )}
              </div>
            ))}
            
            {Object.keys(formData).length === 0 && (
              <p className="text-[#0f172a]/50 text-center py-8">No editable fields configured for this page yet.</p>
            )}
          </div>
        </div>

      </div>
    </main>
  )
}
