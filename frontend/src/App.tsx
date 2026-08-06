import React, { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { AuthModal } from "./components/AuthModal";
import { Sidebar, ActiveTab } from "./components/Sidebar";
import { HomeDashboard } from "./components/HomeDashboard";
import { NewCaseWizard } from "./components/NewCaseWizard";
import { AiAnalysisPipeline } from "./components/AiAnalysisPipeline";
import { ResultPage } from "./components/ResultPage";
import { CasesPage } from "./components/CasesPage";
import { CampaignsPage } from "./components/CampaignsPage";
import { DocumentsPage } from "./components/DocumentsPage";
import { SettingsPage } from "./components/SettingsPage";
import { ProfilePage } from "./components/ProfilePage";
import { CaseData, UserProfile, DisputeType } from "./types";
import { upsertUserProfile, saveCaseToSupabase, fetchUserCasesFromSupabase } from "./lib/supabase";
import { CinematicIntro } from "./components/ui/cinematic-intro";

export default function App() {
  // Show intro once per browser session
  const [showIntro, setShowIntro] = useState<boolean>(
    () => !sessionStorage.getItem("la_intro_seen")
  );
  const handleIntroComplete = () => {
    sessionStorage.setItem("la_intro_seen", "1");
    setShowIntro(false);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [user, setUser] = useState<UserProfile>({
    name: "Alex Morgan",
    email: "alex.morgan@consumer.org",
    webhookUrl: "https://workflow.ccbp.in/webhook/activate-campaign"
  });



  const sampleCases: CaseData[] = [
    {
      caseId: "LA-842910",
      createdAt: new Date().toISOString(),
      caseType: "Security Deposit",
      zipCode: "90210",
      problemDescription: "Landlord withheld $1,450.00 without itemized statement within 21 days.",
      summary: "Landlord failed to provide itemized statement of deductions within statutory 21-day timeline, violating Civil Code Sec. 1950.5.",
      disputedAmount: "$1,450.00",
      estimatedRecovery: "$1,450.00 + Statutory Damages",
      confidence: 94,
      caseStrength: "Strong",
      lineItems: [
        { description: "Carpet cleaning fee", amount: "$450.00", reason: "Normal wear and tear", flag: "Violation" },
        { description: "Wall painting deduction", amount: "$1,000.00", reason: "Exceeds useful life limits", flag: "Actionable" }
      ],
      legalFindings: [
        { statute: "Civil Code Sec. 1950.5", explanation: "Mandatory return of deposit within 21 days with itemized receipts.", confidence: "95%", potentialRemedy: "Full refund plus statutory bad-faith penalty." }
      ],
      demandLetter: "FORMAL DEMAND FOR RETURN OF SECURITY DEPOSIT\n\nTo Landlord,\n\nDemand is hereby made for the immediate return of $1,450.00 unlawfully withheld...",
      complaintPayload: {
        agency: "State Department of Consumer Affairs",
        violationCode: "Civil Code 1950.5",
        statementOfFacts: "Failure to return deposit within 21 days.",
        reliefSought: "Full financial restitution."
      },
      battleCard: [
        {
          representativeSays: "“We mailed the statement on time.”",
          suggestedResponse: "“Please provide certified postal tracking or proof of delivery within the 21-day window.”",
          supportingLegalReference: "Civil Code Sec. 1950.5(g)",
          negotiationTip: "Request formal written compliance within 5 business days."
        }
      ],
      status: "Campaign Active",
      activatedAt: new Date().toISOString()
    },
    {
      caseId: "LA-391028",
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      caseType: "Medical Bill",
      zipCode: "10001",
      problemDescription: "Emergency room bill contained duplicate lab test charges.",
      summary: "Hospital billed duplicate laboratory diagnostic codes on the same date of service.",
      disputedAmount: "$820.00",
      estimatedRecovery: "$820.00",
      confidence: 89,
      caseStrength: "Strong",
      lineItems: [
        { description: "Duplicate Comprehensive Metabolic Panel", amount: "$820.00", reason: "Duplicate billing entry on same timestamp", flag: "Error" }
      ],
      legalFindings: [
        { statute: "No Surprises Act / Medical Billing Transparency", explanation: "Billing for duplicate unrendered services violates healthcare billing guidelines.", confidence: "90%", potentialRemedy: "Full ledger credit and statement clearance." }
      ],
      demandLetter: "NOTICE OF BILLING ERROR AND DISPUTE...",
      complaintPayload: {
        agency: "HHS No Surprises Help Desk",
        violationCode: "Billing Transparency Act",
        statementOfFacts: "Duplicate lab entry.",
        reliefSought: "Immediate credit of $820.00."
      },
      battleCard: [
        {
          representativeSays: "“The charges were validated by our internal coding team.”",
          suggestedResponse: "“Please cross-reference timestamp logs for both lab entries. They are identical duplicate records.”",
          supportingLegalReference: "Healthcare Billing Compliance",
          negotiationTip: "Ask for medical billing supervisor review."
        }
      ],
      status: "Pending Review"
    }
  ];

  const [cases, setCases] = useState<CaseData[]>(sampleCases);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [analysisPayload, setAnalysisPayload] = useState<{
    caseType: DisputeType;
    zipCode: string;
    country: string;
    state: string;
    district: string;
    problemDescription: string;
    documentText: string;
  } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleStartAnalysis = (payload: {
    caseType: DisputeType;
    zipCode: string;
    country: string;
    state: string;
    district: string;
    problemDescription: string;
    documentText: string;
  }) => {
    setAnalysisPayload(payload);
    setAnalyzing(true);
  };

  const handleAnalysisComplete = (newCase: CaseData) => {
    setCases([newCase, ...cases]);
    setSelectedCase(newCase);
    setAnalyzing(false);
    setActiveTab("result");
    // Persist new case to Supabase
    saveCaseToSupabase(newCase, user.email);
  };

  const handleCampaignActivated = (updatedCase: CaseData) => {
    setCases(cases.map(c => c.caseId === updatedCase.caseId ? updatedCase : c));
    setSelectedCase(updatedCase);
    // Update case status in Supabase
    saveCaseToSupabase(updatedCase, user.email);
  };

  const handleUserLogin = async (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    // 1. Sync user profile details to Supabase database
    upsertUserProfile(loggedInUser);

    // 2. Fetch existing cases from Supabase if available
    const remoteCases = await fetchUserCasesFromSupabase(loggedInUser.email);
    if (remoteCases && remoteCases.length > 0) {
      setCases(remoteCases);
    }
  };

  const handleUserUpdate = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    upsertUserProfile(updatedUser);
  };

  // If not authenticated, show landing page & auth modal
  if (!isAuthenticated) {
    return (
      <>
        {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}
        <LandingPage
          onStartFree={() => setShowAuthModal(true)}
          onWatchDemo={() => {
            setIsAuthenticated(true);
            setSelectedCase(sampleCases[0]);
            setActiveTab("result");
          }}
        />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleUserLogin}
        />
      </>
    );
  }

  return (
    <div
      className="flex h-screen overflow-hidden font-sans text-slate-900"
      style={{
        background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 40%, #F3E8FF 70%, #FAF5FF 100%)",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== "result") setSelectedCase(null);
        }}
        user={user}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header
          className="h-16 px-8 flex items-center justify-between shrink-0"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(167,139,250,0.2)",
            boxShadow: "0 2px 16px rgba(109,40,217,0.07)",
          }}
        >
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(139,92,246,0.7)" }}>Workspace /</span>
            <span className="text-sm font-bold text-slate-800 capitalize">
              {activeTab === "result" ? "Case Defense Result" : activeTab.replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab("new-case")}
              className="px-4 py-2 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-all"
              style={{
                background: "linear-gradient(135deg, #C084FC 0%, #A855F7 50%, #7C3AED 100%)",
                boxShadow: "0 4px 16px rgba(168,85,247,0.35), inset 0 1px 1px rgba(255,255,255,0.4)",
              }}
            >
              <span>+ New Defense Case</span>
            </button>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto p-8" style={{ background: "transparent" }}>
          {analyzing && analysisPayload ? (
            <AiAnalysisPipeline
              payload={analysisPayload}
              onComplete={handleAnalysisComplete}
              onError={(err) => {
                alert(`Analysis failed: ${err}`);
                setAnalyzing(false);
                setActiveTab("new-case");
              }}
            />
          ) : activeTab === "dashboard" ? (
            <HomeDashboard
              cases={cases}
              setActiveTab={setActiveTab}
              onSelectCase={(c) => {
                setSelectedCase(c);
                setActiveTab("result");
              }}
            />
          ) : activeTab === "new-case" ? (
            <NewCaseWizard onStartAnalysis={handleStartAnalysis} />
          ) : activeTab === "cases" ? (
            <CasesPage
              cases={cases}
              onSelectCase={(c) => {
                setSelectedCase(c);
                setActiveTab("result");
              }}
              setActiveTab={setActiveTab}
            />
          ) : activeTab === "campaigns" ? (
            <CampaignsPage cases={cases} />
          ) : activeTab === "documents" ? (
            <DocumentsPage cases={cases} />
          ) : activeTab === "settings" ? (
            <SettingsPage user={user} onUpdateUser={handleUserUpdate} />
          ) : activeTab === "profile" ? (
            <ProfilePage user={user} onUpdateUser={handleUserUpdate} />
          ) : activeTab === "result" && selectedCase ? (
            <ResultPage
              caseData={selectedCase}
              user={user}
              onBack={() => setActiveTab("dashboard")}
              onCampaignActivated={handleCampaignActivated}
            />
          ) : (
            <HomeDashboard
              cases={cases}
              setActiveTab={setActiveTab}
              onSelectCase={(c) => {
                setSelectedCase(c);
                setActiveTab("result");
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
