import React from "react";
import { 
  LayoutDashboard, 
  PlusCircle, 
  FolderKanban, 
  Zap, 
  FileText, 
  Settings, 
  User, 
  ShieldCheck, 
  LogOut
} from "lucide-react";
import { UserProfile } from "../types";

export type ActiveTab = "dashboard" | "new-case" | "cases" | "campaigns" | "documents" | "settings" | "profile" | "result";

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile;
  onLogout: () => void;
}

export function Sidebar({ activeTab, setActiveTab, user, onLogout }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "new-case", label: "New Case", icon: PlusCircle, highlight: true },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <aside className="w-64 bg-violet-700 text-white flex flex-col border-r border-violet-600 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-violet-600 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
          <svg className="w-6 h-6 text-white" viewBox="0 0 256 256" fill="currentColor">
            <path d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" />
          </svg>
        </div>
        <div>
          <h1 className="font-bold text-white tracking-tight text-lg">Legal Assister</h1>
          <span className="text-[10px] uppercase tracking-widest text-violet-200 font-semibold">Autonomous Defense</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-violet-700 shadow-lg"
                  : item.highlight
                    ? "bg-white/20 text-white hover:bg-white/30 border border-white/20"
                    : "text-violet-100 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-violet-700" : "text-violet-100"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-violet-600 bg-violet-800/40">
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold text-xs shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-violet-200 truncate">{user.email}</p>
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-violet-100 hover:text-white text-xs font-medium transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
