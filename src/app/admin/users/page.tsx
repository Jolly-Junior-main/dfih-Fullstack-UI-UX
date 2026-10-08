import { Search, Plus, MoreVertical, Edit2, Trash2, Shield, Mail, CheckCircle2, XCircle } from "lucide-react"

export default function AdminUsersPage() {
  const dummyUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Administrator", status: "Active", lastActive: "Just now" },
    { id: 2, name: "Bob Smith", email: "bob@forestry.org", role: "Reviewer", status: "Active", lastActive: "2 hours ago" },
    { id: 3, name: "Charlie Davis", email: "charlie@university.edu", role: "Contributor", status: "Pending", lastActive: "Never" },
    { id: 4, name: "Diana Prince", email: "diana@ngo.org", role: "Contributor", status: "Active", lastActive: "1 day ago" },
    { id: 5, name: "Evan Wright", email: "evan@example.com", role: "Reviewer", status: "Suspended", lastActive: "3 weeks ago" },
  ]

  return (
    <main className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-[#f5f0e6]">Users & Roles</h1>
            <p className="text-[#f5f0e6]/60 mt-1">Manage platform access, user accounts, and permission levels.</p>
          </div>
          <button className="flex items-center gap-2 bg-[#84cc16] hover:bg-[#a3e635] text-[#2d3a2a] px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg">
            <Plus size={18} />
            Invite User
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-8 shadow-lg flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f5f0e6]/40" size={18} />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[#f5f0e6] placeholder:text-[#f5f0e6]/40 focus:outline-none focus:border-[#84cc16]/50 transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#f5f0e6] focus:outline-none appearance-none cursor-pointer">
              <option>All Roles</option>
              <option>Administrators</option>
              <option>Reviewers</option>
              <option>Contributors</option>
            </select>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#f5f0e6] focus:outline-none appearance-none cursor-pointer hidden md:block">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 text-[#f5f0e6]/60 text-sm border-b border-white/10">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Last Active</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[#f5f0e6] text-sm">
                {dummyUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-[#f5f0e6]/50 flex items-center gap-1 mt-1 text-xs">
                          <Mail size={12} /> {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {user.role === 'Administrator' && <Shield size={14} className="text-[#84cc16]" />}
                        <span className={user.role === 'Administrator' ? 'text-[#84cc16] font-medium' : 'text-[#f5f0e6]/70'}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        {user.status === 'Active' && <CheckCircle2 size={14} className="text-[#84cc16]" />}
                        {user.status === 'Pending' && <div className="w-2 h-2 rounded-full bg-yellow-400" />}
                        {user.status === 'Suspended' && <XCircle size={14} className="text-red-400" />}
                        <span className="text-[#f5f0e6]/70">{user.status}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[#f5f0e6]/70">{user.lastActive}</td>
                    <td className="p-4 text-right flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-[#f5f0e6]/70 hover:text-white transition-colors" title="Edit Permissions">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-500/20 rounded-lg text-[#f5f0e6]/70 hover:text-red-400 transition-colors" title="Revoke Access">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-white/10 bg-black/10 flex items-center justify-between text-sm text-[#f5f0e6]/60">
            <span>Showing 1 to 5 of 1,248 users</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 rounded-lg hover:bg-white/10 transition-colors">Next</button>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
