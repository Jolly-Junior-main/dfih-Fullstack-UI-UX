"use client"

import { useState, useEffect } from "react"
import { Save, Globe, Palette, Bell, Shield, Server, CheckCircle2 } from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, onSnapshot, setDoc } from "firebase/firestore"

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("General")
  const [showToast, setShowToast] = useState(false)
  
  const [formData, setFormData] = useState({
    siteName: "Digital Forestry Information Hub",
    supportEmail: "support@forestryinfohub.org",
    description: "A centralized platform for forestry data, research, and collaborative networking.",
    maintenanceMode: false
  })

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "settings", "global"), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setFormData(docSnapshot.data() as any)
      }
    })
    return () => unsubscribe()
  }, [])

  const handleSave = async () => {
    await setDoc(doc(db, "settings", "global"), formData)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleClearCache = () => {
    alert("Cloudflare Edge Cache has been queued for purging.")
  }

  return (
    <main className="p-6 md:p-10 relative">
      
      {/* Success Toast */}
      <div className={`fixed top-24 right-10 z-50 flex items-center gap-3 bg-white border border-[#84cc16] shadow-xl px-4 py-3 rounded-xl transition-all duration-300 ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'}`}>
        <CheckCircle2 className="text-[#84cc16]" size={20} />
        <span className="font-medium text-[#ffffff]">Settings saved successfully!</span>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-[#0f172a]">Platform Settings</h1>
            <p className="text-[#0f172a]/60 mt-1">Configure global appearance, system behavior, and integrations.</p>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#ffffff] px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>

        {/* Settings Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Settings Navigation */}
          <div className="w-full md:w-64 space-y-2">
            {[
              { name: "General", icon: Globe },
              { name: "Appearance", icon: Palette },
              { name: "Notifications", icon: Bell },
              { name: "Security", icon: Shield },
              { name: "API & Webhooks", icon: Server },
            ].map((tab, idx) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.name
              return (
                <button 
                  key={idx} 
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                    isActive 
                      ? 'bg-white/15 text-[#0f172a] border border-white/20 shadow-md font-medium' 
                      : 'text-[#0f172a]/60 hover:bg-white/5 hover:text-[#0f172a]'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-[#84cc16]' : ''} />
                  {tab.name}
                </button>
              )
            })
            }
          </div>

          {/* Settings Content Area */}
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl space-y-8">
            
            {activeTab === "General" ? (
              <>
                <div>
                  <h3 className="text-xl font-semibold text-[#0f172a] mb-4">Site Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0f172a]/70 mb-1">Site Name</label>
                      <input 
                        type="text" 
                        value={formData.siteName}
                        onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#84cc16]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f172a]/70 mb-1">Support Email</label>
                      <input 
                        type="email" 
                        value={formData.supportEmail}
                        onChange={(e) => setFormData({...formData, supportEmail: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#84cc16]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f172a]/70 mb-1">Site Description</label>
                      <textarea 
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#84cc16]/50 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-[#0f172a] mb-4">Maintenance Mode</h3>
                  <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                    <div>
                      <p className="font-medium text-[#0f172a]">Enable Maintenance Mode</p>
                      <p className="text-sm text-[#0f172a]/60 mt-1">Only Administrators will be able to log in when active.</p>
                    </div>
                    <div 
                      onClick={() => setFormData({...formData, maintenanceMode: !formData.maintenanceMode})}
                      className={`w-12 h-6 rounded-full relative cursor-pointer border transition-colors ${formData.maintenanceMode ? 'bg-[#84cc16] border-[#84cc16]' : 'bg-white/10 border-white/20'}`}
                    >
                      <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${formData.maintenanceMode ? 'bg-black translate-x-6' : 'bg-white/40'}`}></div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-[#0f172a] mb-4">Cache Settings</h3>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-[#0f172a]/60">Clear the application cache to ensure new content and styles are distributed to Edge nodes.</p>
                    <button onClick={handleClearCache} className="self-start px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-[#0f172a] font-medium transition-colors">
                      Purge Cloudflare Cache
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-10 text-center text-[#0f172a]/60">
                <p>This settings tab is currently under construction.</p>
              </div>
            )}

          </div>
        </div>

      </div>
    </main>
  )
}
