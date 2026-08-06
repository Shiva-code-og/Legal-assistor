import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, ShieldCheck, Mail, Lock, User, ArrowRight } from "lucide-react";
import { UserProfile } from "../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("alex.morgan@consumer.org");
  const [name, setName] = useState("Alex Morgan");
  const [password, setPassword] = useState("••••••••");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen || mode === "forgot") return;

    const checkGoogleLoaded = setInterval(() => {
      if ((window as any).google?.accounts?.id) {
        clearInterval(checkGoogleLoaded);
        
        const googleClientId = "403082932753-ur3f2gmuqj3vner3tg8bst3vgo0cp2ee.apps.googleusercontent.com";
        
        (window as any).google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleResponse
        });

        const btnContainer = document.getElementById("google-signin-btn-container");
        if (btnContainer) {
          (window as any).google.accounts.id.renderButton(
            btnContainer,
            { theme: "outline", size: "large", width: btnContainer.clientWidth || 380, shape: "pill" }
          );
        }
      }
    }, 100);

    return () => clearInterval(checkGoogleLoaded);
  }, [isOpen, mode]);

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleGoogleResponse = (response: any) => {
    const payload = parseJwt(response.credential);
    if (payload) {
      onLogin({
        name: payload.name || "Google User",
        email: payload.email || "",
        webhookUrl: localStorage.getItem("la_webhook") || "https://workflow.ccbp.in/webhook/activate-campaign",
        picture: payload.picture
      });
    } else {
      alert("Failed to parse Google credentials.");
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") {
      setSubmitted(true);
      return;
    }
    onLogin({
      name: name || "Alex Morgan",
      email: email || "alex.morgan@consumer.org",
      webhookUrl: localStorage.getItem("la_webhook") || "https://workflow.ccbp.in/webhook/activate-campaign"
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/50 backdrop-blur-sm p-4">
      <style>{`
        .glossy-baby-violet-text {
          background: linear-gradient(
            160deg,
            #E9D5FF 0%,
            #C084FC 25%,
            #A855F7 50%,
            #7C3AED 75%,
            #C084FC 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transform: translateZ(0);
          filter: drop-shadow(0px 2px 10px rgba(168,85,247,0.35));
        }

        .glossy-baby-violet-header {
          background: linear-gradient(
            135deg,
            #8B5CF6 0%,
            #7C3AED 50%,
            #6D28D9 100%
          );
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35);
        }

        .glossy-baby-violet-btn {
          background: linear-gradient(
            135deg,
            #C084FC 0%,
            #A855F7 50%,
            #7C3AED 100%
          );
          box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5);
          transition: all 0.2s ease-in-out;
        }

        .glossy-baby-violet-btn:hover {
          background: linear-gradient(
            135deg,
            #D8B4FE 0%,
            #C084FC 50%,
            #8B5CF6 100%
          );
          box-shadow: 0 6px 25px rgba(168, 85, 247, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.7);
          transform: translateY(-1px);
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden"
      >
        {/* Header */}
        <div className="glossy-baby-violet-header text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <svg className="w-6 h-6 text-white" viewBox="0 0 256 256" fill="currentColor">
                <path d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white tracking-wide">Legal Assister</h3>
              <p className="text-xs text-purple-200">Autonomous Consumer Defense</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-purple-200 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="flex bg-purple-50 p-1 rounded-xl mb-6">
            <button
              onClick={() => { setMode("login"); setSubmitted(false); }}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                mode === "login" ? "glossy-baby-violet-btn text-white shadow-sm" : "text-purple-700 hover:text-purple-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setSubmitted(false); }}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                mode === "signup" ? "glossy-baby-violet-btn text-white shadow-sm" : "text-purple-700 hover:text-purple-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {submitted && mode === "forgot" ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-slate-900 text-lg">Reset Link Sent</h4>
              <p className="text-sm text-slate-600">
                We've sent password reset instructions to <span className="font-medium text-purple-700">{email}</span>.
              </p>
              <button
                onClick={() => setMode("login")}
                className="mt-4 px-4 py-2 glossy-baby-violet-btn text-white rounded-xl text-sm font-bold transition-colors"
              >
                Return to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-purple-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full pl-10 pr-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-purple-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              {mode !== "forgot" && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Password
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-xs text-purple-600 hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-purple-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                  </div>
                </div>
              )}

              {mode === "forgot" && (
                <p className="text-xs text-slate-600">
                  Enter your registered account email and we will send you secure recovery instructions.
                </p>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3 glossy-baby-violet-btn text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 transition-all"
              >
                <span>{mode === "login" ? "Sign In to Dashboard" : mode === "signup" ? "Create Account" : "Send Reset Instructions"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {mode !== "forgot" && (
            <>
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400">Or continue with</span>
                </div>
              </div>

              <div id="google-signin-btn-container" className="w-full min-h-[44px] flex justify-center"></div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
