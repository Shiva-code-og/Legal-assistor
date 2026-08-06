import React, { useState } from "react";
import { motion } from "motion/react";
import { X, ShieldCheck, Mail, Lock, User, ArrowRight } from "lucide-react";
import { UserProfile } from "../types";
import { supabase } from "../lib/supabase";

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

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      alert("Google Sign-In failed: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-violet-900/40 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-violet-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-violet-700 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Legal Assister</h3>
              <p className="text-xs text-violet-200">Autonomous Consumer Defense</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-violet-200 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="flex bg-violet-50 p-1 rounded-xl mb-6">
            <button
              onClick={() => { setMode("login"); setSubmitted(false); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === "login" ? "bg-violet-700 text-white shadow-sm" : "text-violet-600 hover:text-violet-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setSubmitted(false); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                mode === "signup" ? "bg-violet-700 text-white shadow-sm" : "text-violet-600 hover:text-violet-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {submitted && mode === "forgot" ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-slate-900 text-lg">Reset Link Sent</h4>
              <p className="text-sm text-slate-600">
                We've sent password reset instructions to <span className="font-medium text-violet-700">{email}</span>.
              </p>
              <button
                onClick={() => setMode("login")}
                className="mt-4 px-4 py-2 bg-violet-700 text-white rounded-xl text-sm font-medium hover:bg-violet-600 transition-colors"
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
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-violet-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full pl-10 pr-4 py-2.5 bg-violet-50 border border-violet-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-violet-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-violet-50 border border-violet-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
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
                        className="text-xs text-violet-600 hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-violet-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-violet-50 border border-violet-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
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
                className="w-full mt-2 py-3 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg shadow-violet-700/20 transition-all"
              >
                <span>{mode === "login" ? "Sign In to Dashboard" : mode === "signup" ? "Create Account" : "Send Reset Instructions"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

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

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-2.5 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-slate-700">Sign In with Google</span>
                </button>
              </>
            )}
          )}

          <div className="mt-6 text-center text-xs text-slate-500">
            Protected by government-grade encryption and secure AI legal auditing.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
