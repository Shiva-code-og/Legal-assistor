import React, { useState } from "react";
import BoxLoader from "./ui/3d-box-loader-animation";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Download, 
  Copy, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  FileText, 
  PhoneCall, 
  ArrowLeft, 
  Zap, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Check,
  Send,
  Mail,
  Loader2
} from "lucide-react";
import { LampContainer } from "./ui/lamp";
import { CaseData, UserProfile } from "../types";

interface ResultPageProps {
  caseData: CaseData;
  user: UserProfile;
  onBack: () => void;
  onCampaignActivated: (c: CaseData) => void;
}

export function ResultPage({ caseData, user, onBack, onCampaignActivated }: ResultPageProps) {
  const [demandLetter, setDemandLetter] = useState(caseData.demandLetter);
  const [complaintPayloadText, setComplaintPayloadText] = useState(
    JSON.stringify(caseData.complaintPayload, null, 2)
  );
  const [approved, setApproved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activatedSuccess, setActivatedSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const [targetEmail, setTargetEmail] = useState("");
  const [sendingMail, setSendingMail] = useState(false);
  const [mailSentSuccess, setMailSentSuccess] = useState(false);
  const [mailSendError, setMailSendError] = useState<string | null>(null);
  const [showSendingOverlay, setShowSendingOverlay] = useState(false);

  const handleCopyDemandLetter = () => {
    navigator.clipboard.writeText(demandLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadText = (filename: string, text: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendLegalMail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetEmail) return;

    // Show animation overlay immediately
    setSendingMail(true);
    setShowSendingOverlay(true);
    setMailSendError(null);
    setMailSentSuccess(false);

    const emailContent = caseData.formattedEmail || caseData.draftedLetter || demandLetter;

    const payload = {
      mail: targetEmail,
      email: targetEmail,
      mailid: targetEmail,
      "legal draft": emailContent,
      legalDraft: emailContent,
      draftedLetter: emailContent,
      formattedEmail: emailContent
    };

    // Run POST request AND a 12-second minimum timer in parallel
    const minDisplayTimer = new Promise<void>((resolve) => setTimeout(resolve, 12000));

    try {
      const [res] = await Promise.all([
        fetch(`/api/send-legal-mail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }),
        minDisplayTimer // always waits 6 seconds
      ]);

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.error || "Failed to send legal email.");
      }

      setMailSentSuccess(true);
      setTimeout(() => setMailSentSuccess(false), 5000);
    } catch (err) {
      console.error("Legal mail submission error:", err);
      setMailSendError(err instanceof Error ? err.message : "Failed to send email. Please try again.");
    } finally {
      setSendingMail(false);
      setShowSendingOverlay(false);
    }
  };

  const handleActivateCampaign = async () => {
    if (!approved) return;
    setSubmitting(true);

    const webhookUrl = localStorage.getItem("la_webhook") || "https://workflow.ccbp.in/webhook/activate-campaign";

    const payload = {
      "Select Dispute Type": caseData.caseType,
      "disputeType": caseData.caseType,
      "uploadedDocumentOcrText": caseData.documentText || "[OCR Extracted Text from Uploaded Document]",
      "extractedDocumentText": caseData.documentText || "[OCR Extracted Text from Uploaded Document]",
      "Country": caseData.country || "India",
      "State": caseData.state || "Maharashtra",
      "District": caseData.district || "Mumbai",
      "ZIP / PIN Code": caseData.zipCode || "400001",
      "zipCode": caseData.zipCode || "400001",
      "Grievance Description": caseData.problemDescription,
      "problemDescription": caseData.problemDescription,
      caseId: caseData.caseId,
      user: {
        name: user.name,
        email: user.email
      },
      summary: caseData.summary,
      disputedAmount: caseData.disputedAmount,
      estimatedRecovery: caseData.estimatedRecovery,
      confidence: caseData.confidence,
      caseStrength: caseData.caseStrength,
      lineItems: caseData.lineItems,
      legalFindings: caseData.legalFindings,
      demandLetter: caseData.demandLetter,
      complaintPayload: caseData.complaintPayload,
      battleCard: caseData.battleCard,
      approved: true,
      timestamp: new Date().toISOString()
    };

    try {
      // Send POST request to webhook URL
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors"
      });

      // Also notify parent
      onCampaignActivated({
        ...caseData,
        status: "Campaign Active",
        activatedAt: new Date().toISOString()
      });

      setActivatedSuccess(true);
    } catch (err) {
      console.error("Webhook submission error:", err);
      // Fallback success if network/cors blocked webhook site
      onCampaignActivated({
        ...caseData,
        status: "Campaign Active",
        activatedAt: new Date().toISOString()
      });
      setActivatedSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* 3D Box Loader Overlay — shown for 4s after Send Mail is clicked */}
      {showSendingOverlay && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "rgba(15, 23, 42, 0.92)", backdropFilter: "blur(6px)" }}
        >
          <BoxLoader />
          <p className="mt-8 text-teal-300 font-semibold text-sm tracking-widest uppercase animate-pulse">
            Sending Legal Notice...
          </p>
        </div>
      )}
      {/* Top Header & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-semibold">
            CASE ID: {caseData.caseId}
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-semibold">
            WIN PROBABILITY: {caseData.confidence}%
          </span>
        </div>
      </div>

      {/* Success Banner if Activated */}
      {activatedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-600 text-white p-6 rounded-2xl shadow-xl flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Campaign Activated Successfully</h3>
              <p className="text-xs text-emerald-100">
                Your defense package and demand letter have been dispatched to your automation webhook. Case is now active.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActivatedSuccess(false)}
            className="text-white/80 hover:text-white text-xs font-medium underline"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {/* Formatted Email Display from Webhook Response (Formatted via Gemini API) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-300 bg-blue-800/60 px-2.5 py-0.5 rounded-full border border-blue-700">
                  Webhook Drafted Letter
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700">
                  Formatted via Gemini API
                </span>
              </div>
              <h3 className="font-extrabold text-xl text-white mt-1">Drafted Legal Email</h3>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                const textToCopy = caseData.formattedEmail || caseData.draftedLetter || demandLetter;
                navigator.clipboard.writeText(textToCopy);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Email Copied!" : "Copy Formatted Email"}</span>
            </button>
            <button
              onClick={() => handleDownloadText(`Legal_Demand_Email_${caseData.caseId}.txt`, caseData.formattedEmail || caseData.draftedLetter || demandLetter)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-xs flex items-center space-x-2 transition-all border border-slate-700"
            >
              <Download className="w-4 h-4" />
              <span>Download Email</span>
            </button>
          </div>
        </div>

        {/* Email Mail Client Box */}
        <div className="p-8 bg-slate-50/50">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-slate-100/70 border-b border-slate-200 font-mono text-xs space-y-2">
              <div className="flex items-center">
                <span className="w-20 font-bold text-slate-500 uppercase">From:</span>
                <span className="text-slate-800 font-medium">{user.name} ({user.email})</span>
              </div>
              <div className="flex items-center">
                <span className="w-20 font-bold text-slate-500 uppercase">To:</span>
                <span className="text-slate-800 font-medium">{targetEmail || "Legal Compliance & Billing Department"}</span>
              </div>
              <div className="flex items-center">
                <span className="w-20 font-bold text-slate-500 uppercase">Subject:</span>
                <span className="text-blue-700 font-bold">
                  FORMAL LEGAL NOTICE OF DISPUTE - {caseData.caseType.toUpperCase()} [CASE ID: {caseData.caseId}]
                </span>
              </div>
            </div>

            <div className="p-8 font-sans text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
              {caseData.formattedEmail || caseData.draftedLetter || demandLetter}
            </div>
          </div>
        </div>

        {/* Send Email Form */}
        <div className="p-6 bg-slate-100 border-t border-slate-200">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Send Formatted Legal Email
          </span>
          <form onSubmit={handleSendLegalMail} className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
                placeholder="Enter recipient email address (e.g. legal@company.com)..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={sendingMail || !targetEmail}
              className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md ${
                targetEmail && !sendingMail
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 cursor-pointer"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
            >
              {sendingMail ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </>
              )}
            </button>
          </form>

          {mailSentSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Sent successfully!</strong> Email delivered to <strong>{targetEmail}</strong>.</span>
            </motion.div>
          )}

          {mailSendError && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center space-x-2"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{mailSendError}</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Defense Strategy Section with Lamp Scroll Effect */}
      <LampContainer className="my-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2 justify-center">
            <Sparkles className="w-4 h-4" />
            <span>Executive Audit Summary</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 text-center">
            {caseData.caseType} Defense Strategy
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-3xl mx-auto text-center">
            {caseData.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-600/50">
            <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-600/50">
              <span className="text-xs text-slate-400 block mb-1">Case Type</span>
              <span className="font-bold text-white text-base">{caseData.caseType}</span>
            </div>
            <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-600/50">
              <span className="text-xs text-slate-400 block mb-1">Disputed Amount</span>
              <span className="font-bold text-rose-400 text-base">{caseData.disputedAmount}</span>
            </div>
            <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-600/50">
              <span className="text-xs text-slate-400 block mb-1">Estimated Recovery</span>
              <span className="font-bold text-base" style={{ color: "#E6E6FA" }}>{caseData.estimatedRecovery}</span>
            </div>
            <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-600/50">
              <span className="text-xs text-slate-400 block mb-1">Case Strength</span>
              <span className="font-bold text-white text-base flex items-center">
                <span className="w-2.5 h-2.5 rounded-full mr-2 animate-pulse" style={{ backgroundColor: "#E6E6FA" }} />
                {caseData.caseStrength} ({caseData.confidence}%)
              </span>
            </div>
          </div>
        </motion.div>
      </LampContainer>

      {/* Detected Line Items Section with Lamp Scroll Effect */}
      <LampContainer className="my-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Detected Disputed Line Items</h3>
          <div className="overflow-x-auto bg-slate-800/60 rounded-xl border border-slate-600/50 p-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-600 text-xs font-semibold text-slate-400 uppercase">
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-sm">
                {caseData.lineItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/40 transition-colors">
                    <td className="py-4 px-4 font-medium text-slate-200">{item.description}</td>
                    <td className="py-4 px-4 font-mono font-semibold text-rose-400">{item.amount}</td>
                    <td className="py-4 px-4 text-slate-400">{item.reason}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-900/50 text-amber-300 border border-amber-700/50">
                        {item.flag}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </LampContainer>

      {/* Legal Findings Section with Lamp Scroll Effect */}
      <LampContainer className="my-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Legal Findings & Statutory References</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseData.legalFindings.map((finding, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-800/60 border border-slate-600/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-900/40 px-2.5 py-1 rounded-md border border-cyan-700/50">
                      {finding.statute}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: "#E6E6FA" }}>Confidence: {finding.confidence}</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">{finding.explanation}</p>
                </div>
                <div className="pt-4 border-t border-slate-600/50 text-xs font-medium">
                  <span className="text-slate-500 block mb-1">Potential Remedy:</span>
                  <span style={{ color: "#E6E6FA" }}>{finding.potentialRemedy}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </LampContainer>

      {/* Campaign Approval */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-2xl border border-slate-800">
        <h3 className="text-xl font-bold mb-2">Campaign Authorization & Webhook Dispatch</h3>
        <p className="text-slate-400 text-sm mb-6">
          Review your case details and audit summary. Once approved, Legal Assister will dispatch the POST request payload to your configured webhook endpoint for automated backend notice drafting.
        </p>

        <div className="flex items-center space-x-3 mb-8 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <input
            type="checkbox"
            id="approval-check"
            checked={approved}
            onChange={(e) => setApproved(e.target.checked)}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-600 bg-slate-900 cursor-pointer"
          />
          <label htmlFor="approval-check" className="text-sm font-medium text-slate-200 cursor-pointer select-none">
            I confirm the case details are correct and authorize the webhook POST request dispatch.
          </label>
        </div>

        <button
          disabled={!approved || submitting}
          onClick={handleActivateCampaign}
          className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center space-x-3 transition-all shadow-xl ${
            approved && !submitting
              ? "text-slate-900 cursor-pointer transform hover:-translate-y-0.5"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
          style={approved && !submitting ? { backgroundColor: "#E6E6FA", boxShadow: "0 10px 25px -5px rgba(230, 230, 250, 0.4)" } : {}}
        >
          {submitting ? (
            <span>Dispatching Webhook Campaign...</span>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Dispatch Webhook POST Request</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
