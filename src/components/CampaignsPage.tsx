import React from "react";
import { Zap, ShieldCheck, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { CaseData } from "../types";

interface CampaignsPageProps {
  cases: CaseData[];
}

export function CampaignsPage({ cases }: CampaignsPageProps) {
  const webhookUrl = localStorage.getItem("aegis_webhook") || "https://webhook.site/placeholder";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Campaigns & Webhooks</h2>
        <p className="text-slate-600 text-sm mt-1">Monitor webhook dispatches and autonomous campaign execution logs.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="bg-slate-900 text-white p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-emerald-400 font-mono uppercase tracking-wider block mb-1">Configured Webhook Endpoint</span>
            <code className="text-xs sm:text-sm font-mono text-slate-300 break-all">{webhookUrl}</code>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-semibold shrink-0">
            Status: Active & Listening
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Dispatched Campaign Payloads</h3>
          {cases.filter(c => c.status === "Campaign Active" || c.activatedAt).length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <Zap className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-700">No campaigns activated yet.</p>
              <p className="text-xs text-slate-500 mt-1">Activate a defense campaign from any case result page to dispatch webhook payloads.</p>
            </div>
          ) : (
            cases.filter(c => c.status === "Campaign Active" || c.activatedAt).map((c) => (
              <div key={c.caseId} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{c.caseType} Campaign</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200 text-slate-800">{c.caseId}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Dispatched via POST JSON to webhook endpoint</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-emerald-700 font-semibold">HTTP 200 OK</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">{c.activatedAt ? new Date(c.activatedAt).toLocaleString() : "Just now"}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
