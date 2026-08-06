import React, { useState } from "react";
import { Settings, Save, ShieldCheck } from "lucide-react";
import { UserProfile } from "../types";

interface SettingsPageProps {
  user: UserProfile;
  onUpdateUser: (u: UserProfile) => void;
}

export function SettingsPage({ user, onUpdateUser }: SettingsPageProps) {
  const [webhookUrl, setWebhookUrl] = useState(
    user.webhookUrl || process.env.NEXT_PUBLIC_WEBHOOK_URL || "https://workflow.ccbp.in/webhook/activate-campaign"
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("la_webhook", webhookUrl);
    onUpdateUser({
      ...user,
      webhookUrl
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h2>
        <p className="text-slate-600 text-sm mt-1">Configure automation webhook endpoints and workflow integration parameters.</p>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        {saved && (
          <div className="mb-6 p-4 rounded-xl bg-violet-50 border border-violet-200 text-violet-800 text-sm font-medium flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-violet-600" />
            <span>Settings successfully saved to local environment!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Webhook URL (NEXT_PUBLIC_WEBHOOK_URL)
            </label>
            <input
              type="url"
              required
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://webhook.site/your-unique-endpoint"
              className="w-full px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
            />
            <p className="text-xs text-slate-500 mt-2">
              When you activate a defense campaign, Legal Assister sends a secure JSON POST payload to this endpoint.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-violet-700 hover:bg-violet-600 text-white font-semibold rounded-xl text-sm shadow-md shadow-violet-700/20 flex items-center space-x-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
