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
    }, (err) => console.error("Error fetching settings:", err))
    return () => unsubscribe()
  }, [])

  const handleSave = async () => {
    await setDoc(doc(db, "settings", "global"), formData)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleClearCache = () => {
    alert("Cloudflare Edge Cache purge request has been queued.")
  }

  return (
    <main className="p-6 md:p-10 bg-[#163022] min-h-screen text-[#f5f0e6] relative">
      
      {/* Success Toast */}
      <div className={`fixed top-24 right-10 z-50 flex items-center gap-3 bg-[#1c3d2b] border border-[#84cc16] shadow-2xl px-5 py-3 rounded-2xl transition-all duration-300 ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'}`}>
        <CheckCircle2 className="text-[#84cc16]" size={20} />
        <span className="font-semibold text-[#f5f0e6] text-sm">Settings saved successfully!</span>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#f5f0e6]">Platform Settings</h1>
            <p className="text-[#cbd5e1]/70 mt-1">Configure global appearance, system behavior, and platform defaults.</p>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#84cc16]/20 cursor-pointer"
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium text-sm cursor-pointer ${
                    isActive 
                      ? 'bg-[#84cc16]/20 text-[#84cc16] border border-[#84cc16]/30 shadow-inner' 
                      : 'text-[#cbd5e1]/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              )
            })}
          </div>

          {/* Settings Content Area */}
          <div className="flex-1 bg-[#1c3d2b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
            
            {activeTab === "General" ? (
              <>
                <div>
                  <h3 className="text-xl font-bold text-[#f5f0e6] mb-4">Site Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#cbd5e1] mb-2">Site Name</label>
                      <input 
                        type="text" 
                        value={formData.siteName}
                        onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                        className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-[#f5f0e6] focus:outline-none focus:border-[#84cc16] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#cbd5e1] mb-2">Support Email</label>
                      <input 
                        type="email" 
                        value={formData.supportEmail}
                        onChange={(e) => setFormData({...formData, supportEmail: e.target.value})}
                        className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-[#f5f0e6] focus:outline-none focus:border-[#84cc16] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#cbd5e1] mb-2">Site Description</label>
                      <textarea 
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-[#f5f0e6] focus:outline-none focus:border-[#84cc16] transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <h3 className="text-xl font-bold text-[#f5f0e6] mb-4">Maintenance Mode</h3>
                  <div className="flex items-center justify-between p-4 bg-[#12281b]/70 rounded-2xl border border-white/5">
                    <div>
                      <p className="font-semibold text-[#f5f0e6] text-sm">Enable Maintenance Mode</p>
                      <p className="text-xs text-[#cbd5e1]/60 mt-1">Only Administrators will be able to log in when active.</p>
                    </div>
                    <div 
                      onClick={() => setFormData({...formData, maintenanceMode: !formData.maintenanceMode})}
                      className={`w-12 h-6 rounded-full relative cursor-pointer border transition-colors ${formData.maintenanceMode ? 'bg-[#84cc16] border-[#84cc16]' : 'bg-white/10 border-white/20'}`}
                    >
                      <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${formData.maintenanceMode ? 'bg-[#0f2317] translate-x-6' : 'bg-white/40'}`}></div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <h3 className="text-xl font-bold text-[#f5f0e6] mb-4">Cache Controls</h3>
                  <div className="flex flex-col gap-4">
                    <p className="text-xs text-[#cbd5e1]/70">Purge the CDN and Edge Cache to ensure all newly updated research, news, and pages are distributed immediately.</p>
                    <button 
                      onClick={handleClearCache} 
                      className="self-start px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-bold uppercase tracking-wider text-[#84cc16] transition-colors cursor-pointer"
                    >
                      Purge Cloudflare Cache
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-12 text-center text-[#cbd5e1]/60">
                <p className="text-sm font-medium">This settings tab is configured with automated platform defaults.</p>
              </div>
            )}

          </div>
        </div>

      </div>
    </main>
  )
}
