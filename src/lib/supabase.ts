import { createClient } from "@supabase/supabase-js";
import { UserProfile, CaseData } from "../types";

export const SUPABASE_URL =
  ((import.meta as any).env?.VITE_SUPABASE_URL as string) ||
  "https://maajqghmtappmlhqvbek.supabase.co";

export const SUPABASE_ANON_KEY =
  ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hYWpxZ2htdGFwcG1saHF2YmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NTE1NDAsImV4cCI6MjEwMTUyNzU0MH0.PaDBdffvi55ftbVkNv4uSQiwd7UuBorSATLtjCq4kUM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Saves or updates user profile in Supabase profiles table when signed in
 */
export async function upsertUserProfile(user: UserProfile) {
  try {
    const payload = {
      email: user.email,
      full_name: user.name,
      avatar_url: user.picture || null,
      phone: user.phone || null,
      address: user.address || null,
      webhook_url: user.webhookUrl,
      updated_at: new Date().toISOString(),
    };

    console.log("Syncing profile to Supabase...", payload);

    const { data, error } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: "email" })
      .select();

    if (error) {
      console.error("Supabase upsert profile error:", error);
    } else {
      console.log("User profile synchronized with Supabase:", data);
    }
    return data;
  } catch (err) {
    console.error("Failed to sync profile to Supabase:", err);
    return null;
  }
}

/**
 * Saves a new case to Supabase cases table
 */
export async function saveCaseToSupabase(caseData: CaseData, userEmail?: string) {
  try {
    const payload = {
      case_id: caseData.caseId,
      user_email: userEmail || null,
      case_type: caseData.caseType,
      zip_code: caseData.zipCode,
      country: caseData.country || "US",
      state: caseData.state || null,
      district: caseData.district || null,
      problem_description: caseData.problemDescription,
      document_text: caseData.documentText || null,
      summary: caseData.summary,
      disputed_amount: caseData.disputedAmount,
      estimated_recovery: caseData.estimatedRecovery,
      confidence: caseData.confidence,
      case_strength: caseData.caseStrength,
      status: caseData.status || "Draft",
      activated_at: caseData.activatedAt || null,
      line_items: caseData.lineItems,
      legal_findings: caseData.legalFindings,
      complaint_payload: caseData.complaintPayload,
      battle_card: caseData.battleCard,
      demand_letter: caseData.demandLetter,
      drafted_letter: caseData.draftedLetter || null,
      formatted_email: caseData.formattedEmail || null,
      updated_at: new Date().toISOString(),
    };

    console.log("Saving case to Supabase...", payload);

    const { data, error } = await supabase
      .from("cases")
      .upsert(payload, { onConflict: "case_id" })
      .select();

    if (error) {
      console.error("Supabase save case error:", error);
    } else {
      console.log("Case saved to Supabase successfully:", data);
    }
    return data;
  } catch (err) {
    console.error("Failed to save case to Supabase:", err);
    return null;
  }
}

/**
 * Fetches cases for a user from Supabase
 */
export async function fetchUserCasesFromSupabase(userEmail?: string): Promise<CaseData[] | null> {
  try {
    let query = supabase.from("cases").select("*").order("created_at", { ascending: false });
    if (userEmail) {
      query = query.eq("user_email", userEmail);
    }
    const { data, error } = await query;
    if (error) {
      console.error("Supabase fetch cases error:", error);
      return null;
    }
    if (data && data.length > 0) {
      return data.map((row: any) => ({
        caseId: row.case_id,
        createdAt: row.created_at,
        caseType: row.case_type,
        zipCode: row.zip_code,
        country: row.country,
        state: row.state,
        district: row.district,
        problemDescription: row.problem_description,
        documentText: row.document_text,
        summary: row.summary,
        disputedAmount: row.disputed_amount,
        estimatedRecovery: row.estimated_recovery,
        confidence: row.confidence,
        caseStrength: row.case_strength,
        status: row.status,
        activatedAt: row.activated_at,
        lineItems: row.line_items || [],
        legalFindings: row.legal_findings || [],
        complaintPayload: row.complaint_payload || {},
        battleCard: row.battle_card || [],
        demandLetter: row.demand_letter || "",
        draftedLetter: row.drafted_letter,
        formattedEmail: row.formatted_email,
      }));
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch cases from Supabase:", err);
    return null;
  }
}
