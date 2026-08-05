import React, { useState } from "react";
import { FolderKanban, Search, Plus, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { CaseData } from "../types";
import { ActiveTab } from "./Sidebar";

interface CasesPageProps {
  cases: CaseData[];
  onSelectCase: (c: CaseData) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export function CasesPage({ cases, onSelectCase, setActiveTab }: CasesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = cases.filter(c => 
    c.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Defense Cases</h2>
          <p className="text-slate-600 text-sm mt-1">Manage and track all your active and settled consumer defense campaigns.</p>
        </div>
        <button
          onClick={() => setActiveTab("new-case")}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm flex items-center space-x-2 shadow-md shadow-blue-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Case</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by case type, ID, or grievance summary..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
          />
        </div>

        <div className="space-y-4">
          {filteredCases.length === 0 ? (
            <div className="text-center py-16">
              <FolderKanban className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-semibold text-slate-800 text-base">No cases found</h4>
              <p className="text-xs text-slate-500 mt-1">Try searching with a different term or create a new case.</p>
            </div>
          ) : (
            filteredCases.map((c) => (
              <div
                key={c.caseId}
                onClick={() => onSelectCase(c)}
                className="p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base shrink-0">
                    {c.caseType.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-slate-900 text-base">{c.caseType} Dispute</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-100 text-slate-700">
                        {c.caseId}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        c.status === "Campaign Active" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {c.status || "Campaign Active"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{c.summary}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 shrink-0 w-full sm:w-auto justify-between sm:justify-end pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-right">
                    <span className="font-bold text-slate-900 text-base">{c.disputedAmount}</span>
                    <span className="block text-[10px] font-medium text-emerald-600">Win Prob: {c.confidence}%</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
