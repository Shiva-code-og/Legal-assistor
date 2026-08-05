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
  ShieldCheck,
  Loader2
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

  const stages = [
    { title: "Uploading Document & Assets", icon: Upload },
    { title: "Reading Document (Multimodal OCR)", icon: FileSearch },
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
        // Step-by-step progress simulation visually while calling API
        for (let i = 0; i < stages.length - 1; i++) {
          if (!isMounted) return;
          setCurrentStage(i);
          await new Promise((r) => setTimeout(r, 600));
        }

        // Call backend API /api/analyze
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to analyze case.");
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

  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 shadow-md shadow-blue-600/10">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Aegis AI Audit in Progress</h2>
        <p className="text-slate-600 text-sm mb-8">
          Processing {payload.caseType} dispute for ZIP Code {payload.zipCode}...
        </p>

        <div className="space-y-3 text-left max-w-md mx-auto">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isDone = idx < currentStage;
            const isCurrent = idx === currentStage;
            const isPending = idx > currentStage;

            return (
              <div
                key={idx}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                  isCurrent
                    ? "bg-blue-50 border border-blue-200 text-blue-900 font-medium"
                    : isDone
                      ? "bg-emerald-50/60 text-emerald-800"
                      : "text-slate-400 opacity-60"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isCurrent ? "bg-blue-600 text-white" : isDone ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className="text-sm">{stage.title}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-xs text-slate-400 font-mono">
          Powered by Gemini 2.5 Flash & Statutory Legal Knowledge Base
        </div>
      </div>
    </div>
  );
}
