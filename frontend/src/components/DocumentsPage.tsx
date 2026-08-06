import React from "react";
import { FileText, Download, Trash2, Upload } from "lucide-react";
import { CaseData } from "../types";

interface DocumentsPageProps {
  cases: CaseData[];
}

export function DocumentsPage({ cases }: DocumentsPageProps) {
  const documents = [
    { id: 1, name: "Security_Deposit_Statement_2026.pdf", type: "PDF", size: "1.2 MB", date: "Today", status: "OCR Parsed" },
    { id: 2, name: "Medical_Bill_Audit.pdf", type: "PDF", size: "2.4 MB", date: "3 days ago", status: "OCR Parsed" },
    { id: 3, name: "Insurance_Denial_Notice.pdf", type: "PDF", size: "850 KB", date: "5 days ago", status: "OCR Parsed" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Case Documents & OCR Vault</h2>
        <p className="text-slate-600 text-sm mt-1">Securely view parsed bills, statements, and uploaded files across your cases.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">{doc.name}</h4>
                <div className="flex items-center space-x-3 text-xs text-slate-500 mt-0.5">
                  <span>{doc.type} • {doc.size}</span>
                  <span>•</span>
                  <span>{doc.date}</span>
                  <span>•</span>
                  <span className="text-violet-600 font-medium">{doc.status}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => alert(`Downloading ${doc.name}`)}
                className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
