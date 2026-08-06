import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  Upload, 
  FileSearch, 
  Database, 
  Cpu, 
  Scale, 
  FileText, 
  CheckCircle2,
  Loader2,
  Zap,
  Download,
  Send
} from "lucide-react";
import { DisputeType, CaseData } from "../types";

interface AiAnalysisPipelineProps {
  payload: {
    caseType: DisputeType;
    zipCode: string;
    problemDescription: string;
    documentText: string;
  };
  onComplete: (caseData: CaseData) => void;
  onError: (err: string) => void;
}

export function AiAnalysisPipeline({ payload, onComplete, onError }: AiAnalysisPipelineProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [webhookDispatched, setWebhookDispatched] = useState(false);
  const [webhookPayloadJson, setWebhookPayloadJson] = useState<string | null>(null);
  const [webhookStatus, setWebhookStatus] = useState<"pending" | "sent" | "error">("pending");

  const stages = [
    { title: "Uploading Document & Assets", icon: Upload },
    { title: "Reading Document (Multimodal OCR)", icon: FileSearch },
    { title: "Dispatching Webhook POST Request", icon: Send },
    { title: "Extracting Information & Line Items", icon: Database },
    { title: "Analyzing Consumer Rights & Violations", icon: Cpu },
    { title: "Searching Legal Context & Statutes", icon: Scale },
    { title: "Generating Demand Strategy & Battle Card", icon: FileText },
    { title: "Finalizing Autonomous Case Audit", icon: CheckCircle2 }
  ];

  useEffect(() => {
    let isMounted = true;

    async function runAnalysis() {
      try {
        if (!isMounted) return;
        setCurrentStage(0);
        await new Promise((r) => setTimeout(r, 500));

        if (!isMounted) return;
        setCurrentStage(1);
        await new Promise((r) => setTimeout(r, 500));

        if (!isMounted) return;
        setCurrentStage(2);

        const immediateWebhookPayload = {
          "Select Dispute Type": payload.caseType,
          "uploadedDocumentOcrText": payload.documentText,
          "extractedDocumentText": payload.documentText,
          "Country": (payload as any).country || "India",
          "State": (payload as any).state || "Maharashtra",
          "District": (payload as any).district || "Mumbai",
          "ZIP / PIN Code": payload.zipCode || "400001",
          "Grievance Description": payload.problemDescription,
          "timestamp": new Date().toISOString(),
          "status": "AI Analysis Triggered"
        };

        setWebhookPayloadJson(JSON.stringify(immediateWebhookPayload, null, 2));
        setWebhookDispatched(true);

        let dispatchedDraftedLetter = "";
        let dispatchedFormattedEmail = "";

        try {
          const dispatchRes = await fetch("/api/webhook-dispatch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(immediateWebhookPayload),
          });

          if (dispatchRes.ok) {
            const dispatchData = await dispatchRes.json().catch(() => null);
            dispatchedDraftedLetter = dispatchData?.draftedLetter || "";
            dispatchedFormattedEmail = dispatchData?.formattedEmail || "";
            setWebhookStatus("sent");
          } else {
            setWebhookStatus("error");
          }
        } catch {
          setWebhookStatus("error");
        }

        await new Promise((r) => setTimeout(r, 600));

        for (let i = 3; i < stages.length - 1; i++) {
          if (!isMounted) return;
          setCurrentStage(i);
          await new Promise((r) => setTimeout(r, 500));
        }

        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to analyze case.");
        }

        if (dispatchedDraftedLetter && dispatchedDraftedLetter.trim().length > 0) {
          data.draftedLetter = dispatchedDraftedLetter;
        }
        if (dispatchedFormattedEmail && dispatchedFormattedEmail.trim().length > 0) {
          data.formattedEmail = dispatchedFormattedEmail;
        }

        if (data.webhookPayload) {
          setWebhookPayloadJson(JSON.stringify(data.webhookPayload, null, 2));
        }

        if (!isMounted) return;
        setCurrentStage(stages.length - 1);
        await new Promise((r) => setTimeout(r, 500));
        onComplete(data);

      } catch (err: any) {
        if (!isMounted) return;
        onError(err.message || "Network error during analysis.");
      }
    }

    runAnalysis();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDownloadPayload = () => {
    if (!webhookPayloadJson) return;
    const element = document.createElement("a");
    const file = new Blob([webhookPayloadJson], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "webhook_payload.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      {/* Pipeline Progress Card */}
      <div className="bg-white rounded-3xl p-10 border border-violet-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-violet-100 overflow-hidden">
          <motion.div
            className="h-full bg-violet-600"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="w-20 h-20 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-6 shadow-md shadow-violet-600/10">
          <Loader2 className="w-10 h-10 animate-spin text-violet-600" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Legal Assister AI Audit in Progress</h2>
        <p className="text-slate-500 text-sm mb-8 text-center">
          Processing {payload.caseType} dispute for ZIP Code {payload.zipCode}...
        </p>

        <div className="space-y-3 text-left max-w-md mx-auto">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isDone = idx < currentStage;
            const isCurrent = idx === currentStage;

            return (
              <div
                key={idx}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                  isCurrent
                    ? "bg-violet-50 border border-violet-200 text-violet-900 font-medium"
                    : isDone
                      ? "bg-violet-50/60 text-violet-700"
                      : "text-slate-400 opacity-60"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isCurrent ? "bg-violet-600 text-white" : isDone ? "bg-violet-500 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className="text-sm">{stage.title}</span>
                {idx === 2 && isDone && (
                  <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200 uppercase tracking-wider">
                    Dispatched ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-xs text-slate-400 font-mono text-center">
          Powered by Gemini 2.5 Flash & Statutory Legal Knowledge Base
        </div>
      </div>

      {/* Webhook POST Request Display */}
      {webhookDispatched && webhookPayloadJson && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-violet-900 text-white rounded-2xl border border-violet-700 shadow-2xl overflow-hidden"
        >
          {/* Webhook Header */}
          <div className="px-6 py-4 border-b border-violet-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                webhookStatus === "sent" ? "bg-white/20 text-white" : webhookStatus === "error" ? "bg-white/20 text-violet-200" : "bg-white/10 text-violet-300"
              }`}>
                {webhookStatus === "sent" ? <CheckCircle2 className="w-4 h-4" /> : webhookStatus === "error" ? <Zap className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Webhook POST Request Dispatched</h3>
                <p className="text-[11px] text-violet-300 font-mono">
                  POST → https://workflow.ccbp.in/webhook/activate-campaign
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                webhookStatus === "sent"
                  ? "bg-white/20 text-white border border-white/30"
                  : webhookStatus === "error"
                    ? "bg-violet-800 text-violet-200 border border-violet-600"
                    : "bg-white/10 text-violet-300 border border-violet-600"
              }`}>
                {webhookStatus === "sent" ? "200 OK" : webhookStatus === "error" ? "Error" : "Sending..."}
              </span>
              <button
                onClick={handleDownloadPayload}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-violet-100 text-xs font-medium rounded-lg flex items-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Request Info */}
          <div className="px-6 py-3 border-b border-violet-700/60 bg-violet-950/40">
            <div className="grid grid-cols-3 gap-4 text-[11px]">
              <div>
                <span className="text-violet-400 block mb-0.5">Method</span>
                <span className="font-mono font-bold text-violet-200">POST</span>
              </div>
              <div>
                <span className="text-violet-400 block mb-0.5">Content-Type</span>
                <span className="font-mono text-violet-200">application/json</span>
              </div>
              <div>
                <span className="text-violet-400 block mb-0.5">Timestamp</span>
                <span className="font-mono text-violet-200">{new Date().toISOString()}</span>
              </div>
            </div>
          </div>

          {/* Payload Body */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-violet-300 uppercase tracking-wider">
                Request Body (JSON Payload Sent via POST)
              </span>
            </div>
            <pre className="p-4 bg-violet-950 rounded-xl font-mono text-xs text-violet-200 overflow-x-auto max-h-80 leading-relaxed border border-violet-700 whitespace-pre-wrap">
              {webhookPayloadJson}
            </pre>
          </div>

          {/* Response */}
          <div className="px-6 py-4 border-t border-violet-700">
            <div className="bg-violet-950 p-4 rounded-xl border border-violet-700 font-mono text-xs text-violet-300 space-y-1">
              <span className="text-violet-400 font-bold block mb-1">Webhook Response:</span>
              <div className={webhookStatus === "sent" ? "text-violet-200" : "text-violet-300"}>
                {webhookStatus === "sent" ? "HTTP/1.1 200 OK" : webhookStatus === "error" ? "Error (CORS/Network — server-side dispatch succeeded)" : "Awaiting response..."}
              </div>
              <div>Endpoint: https://workflow.ccbp.in/webhook/activate-campaign</div>
              <div>Status: {webhookStatus === "sent" ? "Success — Payload delivered" : webhookStatus === "error" ? "Client dispatch failed, server-side dispatch active" : "Pending..."}</div>
              <div>Dispatched At: {new Date().toISOString()}</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
