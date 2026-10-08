import { Save, Globe, Palette, Bell, Shield, Server } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <main className="p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-[#f5f0e6]">Platform Settings</h1>
            <p className="text-[#f5f0e6]/60 mt-1">Configure global appearance, system behavior, and integrations.</p>
          </div>
          <button className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#2d3a2a] px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg">
            <Save size={18} />
            Save Changes
          </button>
        </div>

        {/* Settings Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Settings Navigation */}
          <div className="w-full md:w-64 space-y-2">
            {[
              { name: "General", icon: Globe, active: true },
              { name: "Appearance", icon: Palette, active: false },
              { name: "Notifications", icon: Bell, active: false },
              { name: "Security", icon: Shield, active: false },
              { name: "API & Webhooks", icon: Server, active: false },
            ].map((tab, idx) => {
              const Icon = tab.icon
              return (
                <button 
                  key={idx} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                    tab.active 
                      ? 'bg-white/15 text-[#f5f0e6] border border-white/20 shadow-md font-medium' 
                      : 'text-[#f5f0e6]/60 hover:bg-white/5 hover:text-[#f5f0e6]'
                  }`}
                >
                  <Icon size={18} className={tab.active ? 'text-[#84cc16]' : ''} />
                  {tab.name}
                </button>
              )
            })}
          </div>

          {/* Settings Content Area */}
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl space-y-8">
            
            <div>
              <h3 className="text-xl font-semibold text-[#f5f0e6] mb-4">Site Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#f5f0e6]/70 mb-1">Site Name</label>
                  <input 
                    type="text" 
                    defaultValue="Digital Forestry Information Hub"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-[#f5f0e6] focus:outline-none focus:border-[#84cc16]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#f5f0e6]/70 mb-1">Support Email</label>
                  <input 
                    type="email" 
                    defaultValue="support@forestryinfohub.org"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-[#f5f0e6] focus:outline-none focus:border-[#84cc16]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#f5f0e6]/70 mb-1">Site Description</label>
                  <textarea 
                    rows={3}
                    defaultValue="A centralized platform for forestry data, research, and collaborative networking."
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-[#f5f0e6] focus:outline-none focus:border-[#84cc16]/50 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-xl font-semibold text-[#f5f0e6] mb-4">Maintenance Mode</h3>
              <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                <div>
                  <p className="font-medium text-[#f5f0e6]">Enable Maintenance Mode</p>
                  <p className="text-sm text-[#f5f0e6]/60 mt-1">Only Administrators will be able to log in when active.</p>
                </div>
                <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer border border-white/20">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full transition-transform"></div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-xl font-semibold text-[#f5f0e6] mb-4">Cache Settings</h3>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-[#f5f0e6]/60">Clear the application cache to ensure new content and styles are distributed to Edge nodes.</p>
                <button className="self-start px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-[#f5f0e6] font-medium transition-colors">
                  Purge Cloudflare Cache
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  )
}
