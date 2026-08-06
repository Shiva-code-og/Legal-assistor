import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "YOUR_GEMINI_API_KEY") {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return new GoogleGenAI({ apiKey });
}

function extractDraftedMailText(rawText: string): string {
  if (!rawText || rawText.trim().length === 0) return "";
  try {
    const parsed = JSON.parse(rawText);
    const queue: any[] = [parsed];
    const candidateKeys = [
      "draftedLetter", "drafted_letter", "draftedMail", "drafted_mail",
      "mail", "email", "formattedEmail", "letter", "response", "message", "demandLetter"
    ];
    while (queue.length > 0) {
      const current = queue.shift();
      if (!current || typeof current !== "object") continue;
      for (const key of candidateKeys) {
        const value = (current as Record<string, unknown>)[key];
        if (typeof value === "string" && value.trim().length > 0) return value;
      }
      for (const nested of Object.values(current)) {
        if (nested && typeof nested === "object") queue.push(nested);
      }
    }
  } catch {
    // plain text
  }
  return rawText.trim();
}

async function formatDraftedLetterAsEmail(draftedLetter: string, contextInfo: any = {}): Promise<string> {
  const caseType = contextInfo.caseType || contextInfo["Select Dispute Type"] || "Consumer Dispute";
  const recipient = contextInfo.recipient || "Legal Compliance & Billing Department";
  try {
    const ai = getGeminiClient();
    const prompt = `You are Aegis Engine, an expert legal communications AI.
Take the following drafted legal letter and format it into a high-impact, professional, ready-to-send EMAIL.

Drafted Letter:
${draftedLetter}

Requirements:
- Start with a clear Subject line: Subject: FORMAL LEGAL NOTICE OF DISPUTE - ${caseType.toUpperCase()}
- Include To: ${recipient}
- Include a formal, professional salutation
- Format the body into clean, structured email paragraphs with proper line spacing
- Highlight key facts, disputed charges/amounts, legal violations, and settlement demands
- Specify a clear 14-day settlement deadline
- End with a complete formal sign-off signature block

Return ONLY the formatted email content ready to be copied or sent.`;

    const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
    if (response.text && response.text.trim().length > 0) return response.text;
  } catch (err: any) {
    console.warn("Gemini email formatting fallback:", err.message);
  }
  return `SUBJECT: FORMAL LEGAL NOTICE OF DISPUTE - ${caseType.toUpperCase()}\n\nTO: ${recipient}\n\nDear Respondent,\n\n${draftedLetter}\n\nPlease take notice that full restitution of the disputed amount is requested within fourteen (14) business days of this email.\n\nSincerely,\nAegis Legal Representative on behalf of Consumer`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const webhookUrl = process.env.WEBHOOK_URL || "https://workflow.ccbp.in/webhook/activate-campaign";

    let webhookDraftedLetter = "";
    let webhookStatus = 200;

    try {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      webhookStatus = webhookRes.status;
      const resText = await webhookRes.text();
      webhookDraftedLetter = extractDraftedMailText(resText);
    } catch (whErr: any) {
      console.warn("[Webhook] fetch error:", whErr.message || whErr);
    }

    const draftedLetter = (webhookDraftedLetter && webhookDraftedLetter.trim().length > 0)
      ? webhookDraftedLetter
      : `FORMAL DEMAND AND DISPUTE NOTICE\n\nRe: ${req.body["Select Dispute Type"] || req.body.caseType || "Consumer Dispute"}\nLocation: ${req.body.District || "District"}, ${req.body.State || "State"}, ${req.body.Country || "Country"} [ZIP: ${req.body["ZIP / PIN Code"] || req.body.zipCode}]\n\nSummary of Grievance:\n${req.body["Grievance Description"] || req.body.problemDescription || "Unfair charge and contract breach."}\n\nDocument OCR:\n${req.body.uploadedDocumentOcrText || req.body.extractedDocumentText || "Document parsed"}\n\nDemand:\nImmediate resolution and full refund within 14 days.`;

    const formattedEmail = await formatDraftedLetterAsEmail(draftedLetter, req.body);

    return res.status(200).json({
      success: true,
      status: webhookStatus,
      draftedLetter,
      formattedEmail,
      message: "Webhook dispatched and drafted letter formatted as email via Gemini AI"
    });
  } catch (err: any) {
    console.error("[Webhook Dispatch] Error:", err.message || err);
    return res.status(500).json({ error: err.message || "Webhook dispatch failed" });
  }
}
