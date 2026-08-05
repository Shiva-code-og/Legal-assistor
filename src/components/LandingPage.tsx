import React from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Upload, 
  BrainCircuit, 
  Scale, 
  FileText, 
  PhoneCall, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Lock,
  Zap
} from "lucide-react";

interface LandingPageProps {
  onStartFree: () => void;
  onWatchDemo: () => void;
}

export function LandingPage({ onStartFree, onWatchDemo }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Aegis Engine</span>
              <span className="block text-[10px] uppercase tracking-widest text-emerald-600 font-semibold">Autonomous Defense</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#statistics" className="hover:text-slate-900 transition-colors">Impact</a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onStartFree}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onStartFree}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm shadow-md shadow-blue-600/20 transition-all flex items-center space-x-2"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F8FAFC]">
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-blue-700 text-xs font-semibold uppercase tracking-wider mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Next-Generation Legal-Tech AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Fight Unfair Bills. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Let AI Build Your Defense.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Upload a bill, security deposit statement, insurance denial, or refund dispute. Our AI analyzes your documents, identifies possible legal issues, drafts professional demand letters, and prepares your case before sending approval requests to your automation workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button
              onClick={onStartFree}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xl shadow-blue-600/25 flex items-center justify-center space-x-3 transition-all transform hover:-translate-y-0.5"
            >
              <span>Start Free Defense</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onWatchDemo}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl border border-slate-300 shadow-sm flex items-center justify-center space-x-2 transition-all"
            >
              <Zap className="w-5 h-5 text-emerald-600" />
              <span>Watch Demo Case</span>
            </button>
          </motion.div>

          {/* Hero Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-800 text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <ShieldCheck className="w-48 h-48 text-white" />
            </div>
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono text-slate-400">aegis-engine://active-dispute-audit</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                SUCCESS: STATUTORY VIOLATION FOUND
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">Disputed Claim</span>
                <span className="font-semibold text-lg">$1,450.00 Security Deposit</span>
                <span className="block text-xs text-emerald-400 mt-1">✓ 95% Win Probability</span>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">Statute Invoked</span>
                <span className="font-semibold text-sm">Civil Code Sec. 1950.5</span>
                <span className="block text-xs text-slate-400 mt-1">Failure to itemize in 21 days</span>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">Demand Status</span>
                <span className="font-semibold text-sm text-blue-400">Ready for Webhook Dispatch</span>
                <span className="block text-xs text-slate-400 mt-1">Autonomous Campaign Armed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Consumer Rights Protected at Scale
            </h2>
            <p className="text-slate-600 mt-2">
              Millions of dollars in erroneous fees and unfair penalties go unchallenged every year. Aegis changes the power dynamic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Medical Billing Errors", desc: "Unmask inflated hospital charges, unapplied insurance credits, and coding discrepancies.", stat: "$4.2M+", label: "Recovered for Patients" },
              { title: "Security Deposit Disputes", desc: "Automatic audit of landlord damage deductions against state statutory timelines.", stat: "$1.8M+", label: "Returned Deposits" },
              { title: "Subscription Refunds", desc: "Identify deceptive dark patterns, auto-renewals, and unauthorized recurring card debits.", stat: "$850K+", label: "Saved in Fees" },
              { title: "Insurance Claim Denials", desc: "AI-powered policy cross-referencing and bad-faith claim appeal drafting.", stat: "94%", label: "Appeal Success Rate" }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-[#F8FAFC] p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-blue-600">{card.stat}</span>
                  <span className="text-xs font-medium text-slate-500">{card.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Autonomous Defense Pipeline
            </h2>
            <p className="text-slate-600 mt-2">
              From document upload to automated legal escalation in six intelligent steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {[
              { step: "01", title: "Upload Document", icon: Upload, desc: "Drop PDF, image, or scan." },
              { step: "02", title: "AI Analysis", icon: BrainCircuit, desc: "Extract line items & entities." },
              { step: "03", title: "Legal Research", icon: Scale, desc: "Scan state & federal statutes." },
              { step: "04", title: "Case Strategy", icon: TrendingUp, desc: "Calculate win probability." },
              { step: "05", title: "Review", icon: FileText, desc: "Edit demand letter & battle card." },
              { step: "06", title: "Activate Campaign", icon: ShieldCheck, desc: "Deploy via secure webhook." }
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600 mb-3 block">{s.step}</span>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{s.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Engineered for Absolute Legal Precision
            </h2>
            <p className="text-slate-600 mt-2">
              Every tool you need to stand up against corporate billing departments and unfair contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Multimodal OCR & Extraction",
                desc: "High-accuracy parsing of complex invoices, insurance denial letters, and lease agreements across PDF, PNG, JPG, and HEIC formats.",
                icon: Upload
              },
              {
                title: "Jurisdiction-Aware Legal Research",
                desc: "Automatically cross-references your ZIP code with state and federal consumer protection statutes, usury limits, and regulatory codes.",
                icon: Scale
              },
              {
                title: "Demand Letter Generator",
                desc: "Drafts rigorous, legally persuasive demand letters ready for immediate distribution, complete with statutory violation citations.",
                icon: FileText
              },
              {
                title: "Phone Negotiation Battle Card",
                desc: "Equips you with real-time talking points, exact rebuttal scripts, and negotiation tips to outmaneuver customer service reps.",
                icon: PhoneCall
              },
              {
                title: "Campaign Tracker & Webhooks",
                desc: "Sends secure JSON payloads to your configured automation webhook to launch asynchronous resolution campaigns.",
                icon: Zap
              },
              {
                title: "Government-Grade Security",
                desc: "Client-side state management with zero data retention on unencrypted servers. Your personal information remains strictly confidential.",
                icon: Lock
              }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-[#F8FAFC] p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-600/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-3">{f.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center text-xs font-semibold text-blue-600">
                    <span>Explore module</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-white text-lg">Aegis Engine</span>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Aegis Engine. Autonomous Consumer Rights Defender. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
