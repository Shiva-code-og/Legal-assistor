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
    <aside
      className="w-64 flex flex-col shrink-0 select-none relative"
      style={{
        background: "linear-gradient(180deg, rgba(139,92,246,0.22) 0%, rgba(109,40,217,0.18) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRight: "1px solid rgba(167,139,250,0.25)",
        boxShadow: "4px 0 32px rgba(109,40,217,0.12)",
      }}
    >
      {/* Subtle inner glow at top */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(196,181,253,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Brand Header */}
      <div
        className="p-6 flex items-center space-x-3 relative z-10"
        style={{ borderBottom: "1px solid rgba(167,139,250,0.2)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(196,181,253,0.3), rgba(139,92,246,0.2))",
            border: "1px solid rgba(196,181,253,0.35)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2)",
          }}
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 256 256" fill="currentColor">
            <path d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" />
          </svg>
        </div>
        <div>
          <h1 className="font-bold tracking-tight text-lg text-white drop-shadow-sm">Legal Assister</h1>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-white">
            Autonomous Defense
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto relative z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={
                isActive
                  ? {
                      background: "rgba(167, 139, 250, 0.7)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      boxShadow: "0 4px 20px rgba(109,40,217,0.25), inset 0 1px 1px rgba(255,255,255,0.2)",
                      color: "#fff",
                    }
                  : item.highlight
                  ? {
                      background: "rgba(167, 139, 250, 0.7)",
                      border: "1px solid rgba(167,139,250,0.35)",
                      color: "#fff",
                    }
                  : {
                      background: "rgba(167, 139, 250, 0.7)",
                      border: "1px solid rgba(167,139,250,0.2)",
                      color: "rgba(255, 255, 255, 0.9)",
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(167, 139, 250, 0.85)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(167, 139, 250, 0.7)";
                  (e.currentTarget as HTMLButtonElement).style.color = item.highlight ? "#fff" : "rgba(255, 255, 255, 0.9)";
                }
              }}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div
        className="p-4 relative z-10"
        style={{ borderTop: "1px solid rgba(167,139,250,0.2)", background: "rgba(109,40,217,0.12)" }}
      >
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 text-white"
              style={{
                background: "linear-gradient(135deg, rgba(196,181,253,0.3), rgba(139,92,246,0.25))",
                border: "1px solid rgba(196,181,253,0.3)",
              }}
            >
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[11px] truncate" style={{ color: "rgba(216,180,254,0.7)" }}>{user.email}</p>
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition-all bg-white text-purple-950 shadow-sm"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#f3e8ff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
          }}
        >
          <LogOut className="w-3.5 h-3.5 text-emerald-600" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
