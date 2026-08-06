import React from "react";
import { motion } from "motion/react";
import { 
  FolderKanban, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ShieldCheck, 
  ArrowRight,
  Zap
} from "lucide-react";
import { CaseData, UserProfile } from "../types";
import { ActiveTab } from "./Sidebar";

interface HomeDashboardProps {
  cases: CaseData[];
  setActiveTab: (tab: ActiveTab) => void;
  onSelectCase: (c: CaseData) => void;
  user: UserProfile;
}

export function HomeDashboard({ cases, setActiveTab, onSelectCase, user }: HomeDashboardProps) {
  const totalCases = cases.length || 3;
  const recoveredAmount = "$3,950.00";
  const pendingCases = cases.filter(c => c.status !== "Resolved").length || 2;
  const completedCases = cases.filter(c => c.status === "Resolved").length || 1;

  const defaultRecentActivities = [
    { id: 1, title: "Security Deposit Campaign Activated", time: "2 hours ago", type: "campaign", amount: "$1,450.00" },
    { id: 2, title: "Medical Bill OCR Audit Completed", time: "Yesterday", type: "audit", amount: "$820.00" },
    { id: 3, title: "Insurance Denial Appeal Generated", time: "3 days ago", type: "legal", amount: "$2,100.00" }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-700 to-violet-500 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
          <ShieldCheck className="w-96 h-96 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 border border-white/30 px-3 py-1 rounded-full text-white text-xs font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Autonomous Defender Online</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {user.name}</h2>
          <p className="text-violet-100 text-sm leading-relaxed">
            Your consumer rights guardian is active. Legal Assister is currently monitoring your active cases and ready to audit new disputed bills or statements.
          </p>
        </div>

        <div className="mt-6 md:mt-0 relative z-10 shrink-0">
          <button
            onClick={() => setActiveTab("new-case")}
            className="px-6 py-3.5 bg-white text-violet-700 font-semibold rounded-xl shadow-lg flex items-center space-x-2 transition-all transform hover:-translate-y-0.5 hover:bg-violet-50"
          >
            <Plus className="w-5 h-5" />
            <span>Start New Defense</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Cases", value: totalCases, icon: FolderKanban, change: "+2 this month", color: "text-violet-700", bg: "bg-violet-50" },
          { title: "Recovered Amount", value: recoveredAmount, icon: DollarSign, change: "Est. Total Value", color: "text-violet-600", bg: "bg-violet-50" },
          { title: "Pending Cases", value: pendingCases, icon: Clock, change: "In active workflow", color: "text-violet-500", bg: "bg-violet-50" },
          { title: "Completed Cases", value: completedCases, icon: CheckCircle2, change: "Successfully settled", color: "text-violet-700", bg: "bg-violet-50" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="bg-white p-6 rounded-2xl border border-violet-100 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.title}</span>
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
                <div className="text-xs font-medium text-violet-500 mt-1">{stat.change}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Cases */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-violet-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-900">Active Defense Cases</h3>
            <button
              onClick={() => setActiveTab("cases")}
              className="text-xs font-semibold text-violet-700 hover:text-violet-600 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {cases.length === 0 ? (
              <div className="text-center py-12 bg-violet-50 rounded-xl border border-dashed border-violet-200">
                <FolderKanban className="w-10 h-10 text-violet-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-700">No active cases found.</p>
                <p className="text-xs text-slate-500 mt-1">Start your first consumer rights dispute today.</p>
                <button
                  onClick={() => setActiveTab("new-case")}
                  className="mt-4 px-4 py-2 bg-violet-700 text-white rounded-xl text-xs font-medium hover:bg-violet-600 transition-colors"
                >
                  Create Case
                </button>
              </div>
            ) : (
              cases.slice(0, 3).map((c) => (
                <div
                  key={c.caseId}
                  onClick={() => onSelectCase(c)}
                  className="p-4 rounded-xl border border-violet-100 hover:border-violet-300 hover:bg-violet-50/40 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {c.caseType.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{c.caseType} Dispute</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{c.summary}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-slate-900 text-sm">{c.disputedAmount}</span>
                    <span className="block text-[10px] font-medium text-violet-600 mt-0.5">Win Prob: {c.confidence}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white p-6 rounded-2xl border border-violet-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-900">Activity Timeline</h3>
              <Zap className="w-4 h-4 text-violet-500" />
            </div>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-violet-100">
              {defaultRecentActivities.map((act) => (
                <div key={act.id} className="relative flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-violet-600 ring-4 ring-white relative z-10 mt-1" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">{act.title}</h4>
                    <span className="text-[11px] text-slate-500">{act.time}</span>
                    <span className="block text-[11px] font-mono text-violet-600 mt-0.5">Value: {act.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-violet-50">
            <button
              onClick={() => setActiveTab("campaigns")}
              className="w-full py-2.5 bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <span>View All Automation Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
