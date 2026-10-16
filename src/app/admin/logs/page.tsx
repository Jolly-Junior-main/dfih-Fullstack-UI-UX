"use client"

import { useState, useEffect } from "react"
import { 
  Activity, 
  Search, 
  Filter, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  FileText, 
  Layers, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  Terminal,
  Database
} from "lucide-react"

interface SystemLogEntry {
  id: string
  timestamp: string
  category: "AUTH" | "RESEARCH" | "REVIEWER" | "TAXONOMY" | "SECURITY" | "SYSTEM"
  level: "SUCCESS" | "INFO" | "WARNING" | "ERROR"
  action: string
  user: string
  details: string
  ip: string
  resource?: string
}

const INITIAL_LOGS: SystemLogEntry[] = [
  {
    id: "LOG-9481",
    timestamp: "2026-10-16 15:28:14",
    category: "REVIEWER",
    level: "SUCCESS",
    action: "Score Sheet Submitted",
    user: "Dr. Eleanor Vance, Ph.D.",
    details: "Evaluated 'Silviculture Practices in Boreal Forests' • Score: 95/100 (Grade A) • All 5 Ethical checks verified.",
    ip: "194.143.137.22",
    resource: "PR-EVAL-2026-8812"
  },
  {
    id: "LOG-9480",
    timestamp: "2026-10-16 15:10:02",
    category: "REVIEWER",
    level: "INFO",
    action: "Reviewer Assigned to Manuscript",
    user: "System Administrator",
    details: "Assigned 'Global Timber Trade Statistics 2025' to Dr. Amina Diallo (Priority: High Priority).",
    ip: "10.0.4.12",
    resource: "SUB-2025-02"
  },
  {
    id: "LOG-9479",
    timestamp: "2026-10-16 14:45:30",
    category: "AUTH",
    level: "SUCCESS",
    action: "Admin Session Established",
    user: "admin@forestry.org",
    details: "Admin credentials verified. High-entropy session token dfih_sec_issued.",
    ip: "192.168.1.105",
    resource: "/admin"
  },
  {
    id: "LOG-9478",
    timestamp: "2026-10-16 14:12:18",
    category: "TAXONOMY",
    level: "SUCCESS",
    action: "Thematic Category & Sub-categories Updated",
    user: "System Administrator",
    details: "Created 'Silviculture & Sustainable Forest Management' with 5 nested sub-categories.",
    ip: "192.168.1.105",
    resource: "TAX-SILVI-01"
  },
  {
    id: "LOG-9477",
    timestamp: "2026-10-16 13:50:41",
    category: "RESEARCH",
    level: "INFO",
    action: "Research Manuscript Submitted",
    user: "Liam Jenkins, M.Sc.",
    details: "Uploaded 'Old-Growth Douglas Fir Canopy Census' with 4 field maps and dataset.",
    ip: "142.250.190.46",
    resource: "DOC-2026-981"
  },
  {
    id: "LOG-9476",
    timestamp: "2026-10-16 12:35:10",
    category: "SECURITY",
    level: "WARNING",
    action: "Unauthenticated Route Probe Mitigated",
    user: "Anonymous Visitor",
    details: "Direct URL navigation to /admin without session token. Blocked and redirected to /admin/login.",
    ip: "45.33.32.156",
    resource: "/admin/research"
  },
  {
    id: "LOG-9475",
    timestamp: "2026-10-16 11:20:00",
    category: "SYSTEM",
    level: "SUCCESS",
    action: "Cloudflare Edge Cache Synced",
    user: "DFIH Edge Worker",
    details: "Global CDN invalidated 30 static SSG routes across 285 edge locations.",
    ip: "172.64.120.1",
    resource: "dfih-frontend.pages.dev"
  },
  {
    id: "LOG-9474",
    timestamp: "2026-10-16 09:14:22",
    category: "RESEARCH",
    level: "SUCCESS",
    action: "Manuscript Published to Public Repository",
    user: "System Administrator",
    details: "Approved 'LiDAR Telemetry for Canopy Biomass In Congo Basin' for public indexing.",
    ip: "192.168.1.105",
    resource: "DOC-2025-412"
  },
  {
    id: "LOG-9473",
    timestamp: "2026-10-16 08:02:11",
    category: "SYSTEM",
    level: "SUCCESS",
    action: "Automated Daily Integrity Verification",
    user: "System Daemon",
    details: "Firestore DB verified. 0 broken foreign keys. Total active records: 1,482.",
    ip: "127.0.0.1",
    resource: "System Check"
  },
  {
    id: "LOG-9472",
    timestamp: "2026-10-15 22:45:00",
    category: "SECURITY",
    level: "ERROR",
    action: "Rate Limit Triggered on Login",
    user: "Unknown IP",
    details: "5 consecutive invalid passcode attempts within 60 seconds. IP temporarily throttled.",
    ip: "185.220.101.5",
    resource: "/admin/login"
  }
]

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<SystemLogEntry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("ALL")
  const [levelFilter, setLevelFilter] = useState("ALL")
  const [selectedLog, setSelectedLog] = useState<SystemLogEntry | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dfih_system_logs")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLogs(parsed)
          return
        }
      }
    } catch (e) {
      console.error(e)
    }
    setLogs(INITIAL_LOGS)
    localStorage.setItem("dfih_system_logs", JSON.stringify(INITIAL_LOGS))
  }, [])

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.includes(searchQuery) ||
      (log.resource && log.resource.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "ALL" || log.category === categoryFilter
    const matchesLevel = levelFilter === "ALL" || log.level === levelFilter

    return matchesSearch && matchesCategory && matchesLevel
  })

  const handleSimulateEvent = () => {
    const now = new Date().toISOString().replace("T", " ").split(".")[0]
    const randomId = `LOG-${Math.floor(9500 + Math.random() * 500)}`
    const sampleActions = [
      { cat: "REVIEWER" as const, lvl: "SUCCESS" as const, act: "Reviewer Feedback Dispatched", det: "Author notified of minor revision requirements for Section 3 citations.", res: "PR-EVAL-2026" },
      { cat: "RESEARCH" as const, lvl: "INFO" as const, act: "Dataset Downloaded by Researcher", det: "Raw CSV tree ring metrics exported by verified university researcher.", res: "DATA-2026-08" },
      { cat: "SECURITY" as const, lvl: "SUCCESS" as const, act: "Session Heartbeat Verified", det: "Admin token validity renewed for active user session.", res: "/admin" },
      { cat: "TAXONOMY" as const, lvl: "INFO" as const, act: "Sub-category Index Rebuilt", det: "Taxonomy cache regenerated for public search filters.", res: "/resources" }
    ]
    const picked = sampleActions[Math.floor(Math.random() * sampleActions.length)]
    
    const newEntry: SystemLogEntry = {
      id: randomId,
      timestamp: now,
      category: picked.cat,
      level: picked.lvl,
      action: picked.act,
      user: "Current Admin",
      details: picked.det,
      ip: "192.168.1.105",
      resource: picked.res
    }

    const updated = [newEntry, ...logs]
    setLogs(updated)
    localStorage.setItem("dfih_system_logs", JSON.stringify(updated))
  }

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2))
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `dfih-system-logs-${new Date().toISOString().split("T")[0]}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const handleExportCSV = () => {
    const headers = ["ID", "Timestamp", "Category", "Level", "Action", "User", "Details", "IP", "Resource"]
    const rows = logs.map(l => [
      l.id,
      `"${l.timestamp}"`,
      l.category,
      l.level,
      `"${l.action}"`,
      `"${l.user}"`,
      `"${l.details.replace(/"/g, '""')}"`,
      l.ip,
      `"${l.resource || ''}"`
    ])
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `dfih-system-logs-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const getLevelBadge = (level: SystemLogEntry["level"]) => {
    switch (level) {
      case "SUCCESS":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#84cc16]/15 text-[#84cc16] border border-[#84cc16]/30">SUCCESS</span>
      case "INFO":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">INFO</span>
      case "WARNING":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">WARN</span>
      case "ERROR":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30">ERROR</span>
    }
  }

  const getCategoryBadge = (category: SystemLogEntry["category"]) => {
    return (
      <span className="font-mono text-[11px] font-semibold text-[#cbd5e1]/80 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
        {category}
      </span>
    )
  }

  return (
    <main className="p-6 md:p-10 bg-[#163022] min-h-screen text-[#f5f0e6]">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#84cc16] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
              Administrative Telemetry &amp; Security Audit
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#f5f0e6]">
              System Logs
            </h1>
            <p className="text-[#cbd5e1]/70 mt-1">
              Real-time audit log of security events, manuscript submissions, reviewer assignments, and platform actions.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleSimulateEvent}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-[#f5f0e6] transition-all flex items-center gap-1.5 cursor-pointer"
              title="Add live test event"
            >
              <Sparkles size={14} className="text-[#84cc16]" />
              Trigger Live Event
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-[#f5f0e6] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={14} />
              Export CSV
            </button>
            <button
              onClick={handleExportJSON}
              className="px-4 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold text-xs transition-all shadow-lg shadow-[#84cc16]/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Terminal size={14} />
              Export JSON
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1c3d2b]/80 border border-white/10 rounded-2xl p-5 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#cbd5e1]/60">Total Events</span>
            <div className="text-2xl sm:text-3xl font-black text-[#f5f0e6] mt-1">{logs.length}</div>
            <p className="text-[11px] text-[#84cc16] mt-1">Audit trail active</p>
          </div>
          <div className="bg-[#1c3d2b]/80 border border-white/10 rounded-2xl p-5 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#cbd5e1]/60">Reviewer Actions</span>
            <div className="text-2xl sm:text-3xl font-black text-[#84cc16] mt-1">
              {logs.filter(l => l.category === "REVIEWER").length}
            </div>
            <p className="text-[11px] text-[#cbd5e1]/70 mt-1">Peer review operations</p>
          </div>
          <div className="bg-[#1c3d2b]/80 border border-white/10 rounded-2xl p-5 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#cbd5e1]/60">Security Verifications</span>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 mt-1">
              {logs.filter(l => l.category === "SECURITY" || l.category === "AUTH").length}
            </div>
            <p className="text-[11px] text-[#cbd5e1]/70 mt-1">Auth &amp; perimeter checks</p>
          </div>
          <div className="bg-[#1c3d2b]/80 border border-white/10 rounded-2xl p-5 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#cbd5e1]/60">System Health</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">100%</div>
            <p className="text-[11px] text-emerald-400 mt-1">All systems normal</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#1c3d2b]/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-6 shadow-xl flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cbd5e1]/60" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs by action, user, IP, or details..." 
              className="w-full bg-[#12281b] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[#f5f0e6] placeholder:text-white/40 focus:outline-none focus:border-[#84cc16] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#f5f0e6] focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="AUTH">AUTH</option>
              <option value="REVIEWER">REVIEWER</option>
              <option value="RESEARCH">RESEARCH</option>
              <option value="TAXONOMY">TAXONOMY</option>
              <option value="SECURITY">SECURITY</option>
              <option value="SYSTEM">SYSTEM</option>
            </select>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-[#12281b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#f5f0e6] focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Severity Levels</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="INFO">INFO</option>
              <option value="WARNING">WARNING</option>
              <option value="ERROR">ERROR</option>
            </select>
          </div>
        </div>

        {/* Log Entries Table */}
        <div className="bg-[#1c3d2b]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-[#12281b]/80 text-[#cbd5e1]/80 text-xs uppercase tracking-wider border-b border-white/10">
                  <th className="p-4 font-bold">Log ID &amp; Time</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Level</th>
                  <th className="p-4 font-bold">Action &amp; Summary</th>
                  <th className="p-4 font-bold">User / Actor</th>
                  <th className="p-4 font-bold text-right">Details</th>
                </tr>
              </thead>
              <tbody className="text-[#f5f0e6] text-sm divide-y divide-white/5 font-sans">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr 
                      key={log.id} 
                      className="hover:bg-white/5 transition-colors cursor-pointer group"
                      onClick={() => setSelectedLog(log)}
                    >
                      <td className="p-4">
                        <div className="font-mono text-xs font-bold text-[#84cc16]">{log.id}</div>
                        <div className="text-[11px] text-[#cbd5e1]/60 flex items-center gap-1 mt-0.5">
                          <Clock size={11} /> {log.timestamp}
                        </div>
                      </td>

                      <td className="p-4">
                        {getCategoryBadge(log.category)}
                      </td>

                      <td className="p-4">
                        {getLevelBadge(log.level)}
                      </td>

                      <td className="p-4 max-w-md">
                        <div className="font-semibold text-[#f5f0e6] group-hover:text-[#84cc16] transition-colors leading-snug">
                          {log.action}
                        </div>
                        <div className="text-xs text-[#cbd5e1]/70 truncate mt-0.5" title={log.details}>
                          {log.details}
                        </div>
                      </td>

                      <td className="p-4 text-xs">
                        <div className="font-medium text-[#f5f0e6]">{log.user}</div>
                        <div className="text-[11px] font-mono text-[#cbd5e1]/50">{log.ip}</div>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedLog(log)
                          }}
                          className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-[#cbd5e1] group-hover:text-white transition-all cursor-pointer"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-[#cbd5e1]/50">
                      No system log events matching your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-white/10 bg-[#12281b]/50 flex items-center justify-between text-xs text-[#cbd5e1]/70">
            <span>Showing {filteredLogs.length} of {logs.length} logged entries</span>
            <span>All logs stored with tamper-evident audit timestamps</span>
          </div>
        </div>

      </div>

      {/* DETAIL INSPECT DRAWER / MODAL */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#1c3d2b] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="font-mono text-xs font-bold text-[#84cc16]">{selectedLog.id}</span>
                <h3 className="text-xl font-bold text-[#f5f0e6] mt-0.5">Audit Event Inspector</h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#cbd5e1] hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#12281b]">
                <span className="text-[#cbd5e1]/70">Severity &amp; Category:</span>
                <div className="flex items-center gap-2">
                  {getLevelBadge(selectedLog.level)}
                  {getCategoryBadge(selectedLog.category)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#12281b] space-y-1">
                <span className="text-[#cbd5e1]/70">Action Executed:</span>
                <p className="text-sm font-bold text-[#f5f0e6]">{selectedLog.action}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#12281b] space-y-1">
                <span className="text-[#cbd5e1]/70">Full Audit Details:</span>
                <p className="text-xs text-[#cbd5e1] leading-relaxed">{selectedLog.details}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#12281b]">
                  <span className="text-[#cbd5e1]/70 block mb-1">Actor / User:</span>
                  <p className="font-semibold text-[#f5f0e6]">{selectedLog.user}</p>
                  <p className="font-mono text-[#cbd5e1]/50 text-[11px] mt-0.5">{selectedLog.ip}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#12281b]">
                  <span className="text-[#cbd5e1]/70 block mb-1">Timestamp:</span>
                  <p className="font-semibold text-[#f5f0e6]">{selectedLog.timestamp}</p>
                  {selectedLog.resource && (
                    <p className="font-mono text-[#84cc16] text-[11px] mt-0.5">Ref: {selectedLog.resource}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2 rounded-xl bg-[#84cc16] text-[#0f2317] font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#a3e635]"
              >
                Dismiss
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  )
}
