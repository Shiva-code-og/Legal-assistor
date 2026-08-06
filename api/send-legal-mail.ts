import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const mailAddress = req.body?.mail || req.body?.mailid || req.body?.email;
    const legalDraftContent =
      req.body?.["legal draft"] ||
      req.body?.legalDraft ||
      req.body?.mailContent ||
      req.body?.draftedLetter ||
      req.body?.formattedEmail ||
      req.body?.mail;

    if (!mailAddress || !legalDraftContent) {
      return res.status(400).json({ error: "mail (email address) and legal draft content are required." });
    }

    const legalMailWebhookUrl = process.env.LEGAL_MAIL_WEBHOOK_URL || "https://workflow.ccbp.in/webhook/legal-warn";

    const payload = {
      mail: mailAddress,
      email: mailAddress,
      mailid: mailAddress,
      "legal draft": legalDraftContent,
      legalDraft: legalDraftContent,
      draftedLetter: legalDraftContent,
      formattedEmail: legalDraftContent
    };

    const webhookRes = await fetch(legalMailWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!webhookRes.ok) {
      return res.status(webhookRes.status).json({
        success: false,
        status: webhookRes.status,
        error: `Failed to send legal mail. Webhook returned status ${webhookRes.status}`
      });
    }

    return res.status(200).json({ success: true, status: webhookRes.status, message: "Sent successfully!" });
  } catch (err: any) {
    console.error("[Legal Mail POST Error]:", err.message || err);
    return res.status(500).json({ error: err.message || "Failed to send legal mail POST request" });
  }
}
