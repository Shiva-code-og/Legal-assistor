export type DisputeType = 
  | "Security Deposit"
  | "Medical Bill"
  | "Insurance"
  | "Credit Card"
  | "Subscription"
  | "Telecom"
  | "Airline"
  | "Utilities"
  | "Other";

export interface LineItem {
  description: string;
  amount: string;
  reason: string;
  flag: string;
}

export interface LegalFinding {
  statute: string;
  explanation: string;
  confidence: string;
  potentialRemedy: string;
}

export interface BattleCardItem {
  representativeSays: string;
  suggestedResponse: string;
  supportingLegalReference: string;
  negotiationTip: string;
}

export interface CaseData {
  caseId: string;
  createdAt: string;
  caseType: DisputeType;
  zipCode: string;
  country?: string;
  state?: string;
  district?: string;
  problemDescription: string;
  documentText?: string;
  summary: string;
  disputedAmount: string;
  estimatedRecovery: string;
  confidence: number;
  caseStrength: "Strong" | "Moderate" | "Weak";
  lineItems: LineItem[];
  legalFindings: LegalFinding[];
  demandLetter: string;
  complaintPayload: {
    agency: string;
    violationCode: string;
    statementOfFacts: string;
    reliefSought: string;
  };
  battleCard: BattleCardItem[];
  draftedLetter?: string;
  formattedEmail?: string;
  webhookPayload?: Record<string, any>;
  status?: "Draft" | "Pending Review" | "Campaign Active" | "Resolved";
  activatedAt?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  webhookUrl: string;
  picture?: string;
  avatarUrl?: string;
}
