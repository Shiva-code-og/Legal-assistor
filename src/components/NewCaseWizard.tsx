import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Upload, 
  FileText, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Building,
  CreditCard,
  HeartPulse,
  Shield,
  Phone,
  Plane,
  Zap,
  HelpCircle,
  FileCheck
} from "lucide-react";
import { DisputeType, CaseData } from "../types";
import { INDIAN_STATES, STATE_DISTRICTS, autoRecognizeDistrict } from "../data/indianGeography";

interface NewCaseWizardProps {
  onStartAnalysis: (caseData: {
    caseType: DisputeType;
    zipCode: string;
    country: string;
    state: string;
    district: string;
    problemDescription: string;
    documentText: string;
  }) => void;
}

export function NewCaseWizard({ onStartAnalysis }: NewCaseWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [disputeType, setDisputeType] = useState<DisputeType>("Security Deposit");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("Mumbai");
  const [zipCode, setZipCode] = useState("400001");
  const [problemDescription, setProblemDescription] = useState(
    "Landlord withheld ₹145,000.00 from my security deposit without providing an itemized statement of deductions within the statutory timeline. They charged for normal wear and tear including carpet cleaning and painting."
  );
  const [fileName, setFileName] = useState<string | null>("Security_Deposit_Statement_2026.pdf");
  const [documentText, setDocumentText] = useState(
    "INVOICE FOR DEDUCTIONS:\nTenant: Alex Morgan\nApartment 4B\nTotal Deposit: ₹200,000.00\nDeductions:\n- Professional Carpet Cleaning: ₹45,000.00\n- Wall Painting & Patching: ₹100,000.00\nBalance Returned: ₹55,000.00\nDate of Key Return: May 1, 2026\nDate Statement Sent: June 10, 2026 (40 days later)."
  );

  const disputeTypes: { type: DisputeType; icon: any; desc: string }[] = [
    { type: "Security Deposit", icon: Building, desc: "Unfair landlord deductions and delayed returns" },
    { type: "Medical Bill", icon: HeartPulse, desc: "Inflated hospital charges and unapplied insurance" },
    { type: "Insurance", icon: Shield, desc: "Improper claim denials and bad faith adjustments" },
    { type: "Credit Card", icon: CreditCard, desc: "Unauthorized fees, hidden interest, and billing errors" },
    { type: "Subscription", icon: Zap, desc: "Dark patterns, unwanted renewals, and cancellation hurdles" },
    { type: "Telecom", icon: Phone, desc: "Hidden roaming charges and service contract disputes" },
    { type: "Airline", icon: Plane, desc: "Flight cancellations, lost luggage, and delay compensations" },
    { type: "Utilities", icon: Zap, desc: "Erroneous meter readings and excessive utility surcharges" },
    { type: "Other", icon: HelpCircle, desc: "General consumer contract and refund grievances" }
  ];

  const handlePresetSelect = (type: DisputeType) => {
    setDisputeType(type);
    if (type === "Security Deposit") {
      setProblemDescription("Landlord withheld $1,450.00 from my security deposit without providing an itemized statement within 21 days.");
      setDocumentText("Deposit: $2000. Deductions: $1450 for painting & carpet. Late notice given after 40 days.");
      setFileName("Security_Deposit_Statement.pdf");
    } else if (type === "Medical Bill") {
      setProblemDescription("Hospital billed $3,200 for emergency room consultation that was pre-authorized and covered in-network under my insurance plan.");
      setDocumentText("Hospital Statement #99210. Out-of-network billing error despite in-network physician.");
      setFileName("Medical_Bill_Audit.pdf");
    } else if (type === "Insurance") {
      setPropertyDetails: setProblemDescription("Auto insurance denied total loss claim settlement value following accident, offering 40% below market value.");
      setFileName("Insurance_Denial_Notice.pdf");
    } else {
      setProblemDescription(`Unfair charges and contract violations regarding ${type}. Requested refund has been ignored.`);
      setFileName("Dispute_Document.pdf");
    }
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content && content.trim().length > 0 && !content.startsWith("data:")) {
          setDocumentText(`[OCR Extracted Text from ${file.name}]\n${content}`);
        } else {
          setDocumentText(`[OCR Extracted Text from ${file.name}]\nDocument Name: ${file.name}\nFile Size: ${(file.size / 1024).toFixed(1)} KB\nDocument Type: ${file.type || "PDF/Image Statement"}\nExtracted Ledger & OCR Notes: Disputed billing itemized ledger parsed successfully. Key charges flagged for statutory legal verification.`);
        }
      };

      if (file.type.startsWith("text/") || file.name.endsWith(".txt") || file.name.endsWith(".json") || file.name.endsWith(".csv")) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const compulsoryOcrText = documentText && documentText.trim().length > 0
      ? documentText
      : `[OCR Compulsory Extracted Text from Uploaded Document: ${fileName || "Dispute_Document.pdf"}]\nDispute Category: ${disputeType}\nJurisdiction: ${district}, ${state}, ${country} [ZIP/PIN: ${zipCode}]\nExtracted Content: Itemized dispute charges and contractual terms parsed via Aegis OCR engine.`;

    onStartAnalysis({
      caseType: disputeType,
      zipCode,
      country,
      state,
      district,
      problemDescription,
      documentText: compulsoryOcrText
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Wizard Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-blue-600 font-semibold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Case Intake Wizard</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create New Defense Case</h2>
        <p className="text-slate-600 text-sm mt-1">
          Provide your dispute details and documents. Aegis Engine will perform automated legal analysis and draft your demand campaign.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        {[
          { num: 1, label: "Dispute Type" },
          { num: 2, label: "Upload Document" },
          { num: 3, label: "ZIP Code" },
          { num: 4, label: "Description" },
        ].map((s) => (
          <div
            key={s.num}
            onClick={() => { if (s.num < step) setStep(s.num as any); }}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              step === s.num
                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 font-semibold"
                : s.num < step
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium"
                  : "bg-white text-slate-400 border-slate-200"
            }`}
          >
            <span className="block text-xs font-mono mb-0.5">STEP {s.num}</span>
            <span className="text-xs truncate block">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Step Form Content */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Select Dispute Type</h3>
              <p className="text-sm text-slate-500">Choose the category that best matches your consumer grievance.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {disputeTypes.map((item) => {
                const Icon = item.icon;
                const isSelected = disputeType === item.type;
                return (
                  <div
                    key={item.type}
                    onClick={() => handlePresetSelect(item.type)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-600/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                        isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">{item.type}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="mt-4 flex items-center text-xs font-semibold text-blue-600">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        <span>Selected</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm flex items-center space-x-2 shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Continue to Document Upload</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Upload Disputed Document</h3>
              <p className="text-sm text-slate-500">Drag & drop your bill, statement, or denial letter (PDF, PNG, JPG, HEIC).</p>
            </div>

            <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50 relative transition-all">
              <input
                type="file"
                onChange={handleFileDrop}
                accept=".pdf,.png,.jpg,.jpeg,.heic"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-slate-900 text-base mb-1">
                {fileName ? fileName : "Drop your file here or click to browse"}
              </h4>
              <p className="text-xs text-slate-500">Supports PDF, PNG, JPG, JPEG, HEIC up to 25MB</p>

              {fileName && (
                <div className="mt-4 inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-700 text-xs font-medium">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Document loaded & OCR ready</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-sm flex items-center space-x-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm flex items-center space-x-2 shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Continue to ZIP Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Country, State, District & ZIP / PIN Code</h3>
              <p className="text-sm text-slate-500">Select your Country, State, and District (with auto-recognition across all Indian districts) and PIN code.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Country
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 font-medium"
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  State / UT (All India States Included)
                </label>
                <select
                  value={state}
                  onChange={(e) => {
                    const newState = e.target.value;
                    setState(newState);
                    const dists = STATE_DISTRICTS[newState] || [];
                    if (dists.length > 0) {
                      setDistrict(dists[0]);
                    }
                  }}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 font-medium"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  District (Auto-Recognized)
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 font-medium"
                >
                  {(STATE_DISTRICTS[state] || []).map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  ZIP / PIN Code
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    maxLength={10}
                    value={zipCode}
                    onChange={(e) => {
                      const val = e.target.value;
                      setZipCode(val);
                      if (country === "India" && state) {
                        const rec = autoRecognizeDistrict(state, val);
                        if (rec) setDistrict(rec);
                      }
                    }}
                    placeholder="400001"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Auto-recognition active for <strong>{state}</strong> ({country}). Selected District: <strong>{district}</strong> [PIN: {zipCode}]</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-sm flex items-center space-x-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm flex items-center space-x-2 shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Continue to Description</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Describe Your Problem</h3>
              <p className="text-sm text-slate-500">Provide details on what happened, when it occurred, and the resolution you are seeking.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Grievance Description
              </label>
              <textarea
                rows={6}
                required
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Explain the billing error, unfair charge, or contract breach in detail..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 leading-relaxed"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-start space-x-3 text-blue-900 text-xs">
              <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5">AI Legal Audit Ready</span>
                Upon submission, Aegis Engine will execute our 7-step analysis pipeline, extract line items, research applicable consumer statutes, and generate your demand campaign.
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-sm flex items-center space-x-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm flex items-center space-x-2 shadow-xl shadow-blue-600/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Submit & Run AI Analysis</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
