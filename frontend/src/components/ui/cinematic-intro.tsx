// frontend/src/components/ui/cinematic-intro.tsx
// White bg + glossy baby violet text + reliable onComplete redirect
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const STYLES = `
  .ci-grid-light {
    background-size: 56px 56px;
    background-image:
      linear-gradient(to right, rgba(139,92,246,0.07) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(139,92,246,0.07) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 75%);
  }

  /* Glossy baby violet — shimmering gradient with inner highlight */
  .ci-violet-gloss {
    background: linear-gradient(
      160deg,
      #F3E8FF 0%,
      #E9D5FF 15%,
      #C084FC 38%,
      #A855F7 55%,
      #7C3AED 72%,
      #C084FC 88%,
      #E9D5FF 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 4px 24px rgba(168,85,247,0.35))
      drop-shadow(0px 1px 3px rgba(124,58,237,0.2));
  }

  /* Softer line 1 — lighter violet */
  .ci-violet-soft {
    background: linear-gradient(160deg, #6D28D9 0%, #7C3AED 40%, #8B5CF6 70%, #6D28D9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0px 2px 12px rgba(139,92,246,0.25));
  }

  /* White card with violet tint */
  .ci-card-light {
    background: linear-gradient(145deg, #FAFAFA 0%, #F5F3FF 60%, #FAFAFA 100%);
    box-shadow:
      0 40px 100px -20px rgba(109,40,217,0.18),
      0 20px 40px -15px rgba(139,92,246,0.12),
      0 4px 16px rgba(0,0,0,0.06),
      inset 0 1px 1px rgba(255,255,255,0.95),
      inset 0 -1px 2px rgba(139,92,246,0.08);
    border: 1px solid rgba(139,92,246,0.15);
  }

  .ci-badge-light {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
      0 0 0 1px rgba(139,92,246,0.18),
      0 12px 32px -8px rgba(109,40,217,0.18),
      inset 0 1px 1px rgba(255,255,255,0.9);
  }

  .ci-pill-light {
    background: linear-gradient(135deg, rgba(139,92,246,0.12), rgba(168,85,247,0.06));
    border: 1px solid rgba(139,92,246,0.22);
    box-shadow: 0 0 16px rgba(139,92,246,0.08);
  }

  .ci-logo-mark-light {
    background: linear-gradient(135deg, #8B5CF6, #A855F7);
    box-shadow: 0 0 20px rgba(139,92,246,0.4), 0 0 40px rgba(139,92,246,0.15);
  }

  /* Violet Gemini text for right side */
  .ci-violet-right {
    background: linear-gradient(175deg, #7C3AED 0%, #A855F7 50%, #C084FC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
  }
`;

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  // `visible` controls AnimatePresence — setting to false triggers exit animation + onExitComplete
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // After 7.8s, trigger the exit
    const t = setTimeout(() => setVisible(false), 7800);
    return () => clearTimeout(t);
  }, []);

  // ── Animation variants ──────────────────────────────────────────────

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 44, filter: "blur(14px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { delay, duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
  });

  const fadeIn = (delay: number, dur = 1.1) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration: dur, ease: "easeOut" as const },
  });

  const popIn = (delay: number) => ({
    initial: { opacity: 0, scale: 0.7, y: 24 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { delay, duration: 0.72, ease: [0.34, 1.56, 0.64, 1] as const },
  });

  const slideIn = (delay: number) => ({
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  });

  const cardAnim = {
    initial: { opacity: 0, scale: 0.88, y: 80, filter: "blur(20px)" },
    animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
    transition: { delay: 3.0, duration: 1.3, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="ci-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #FAF5FF 50%, #F5F3FF 100%)" }}
        >
          <style dangerouslySetInnerHTML={{ __html: STYLES }} />

          {/* Grid */}
          <div className="ci-grid-light absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

          {/* Ambient glow orb 1 — top center */}
          <motion.div
            {...fadeIn(0.1, 2.5)}
            className="absolute pointer-events-none"
            style={{
              width: 700, height: 500, top: -120, left: "50%", transform: "translateX(-50%)",
              background: "radial-gradient(ellipse, rgba(167,139,250,0.22) 0%, rgba(139,92,246,0.1) 45%, transparent 70%)",
              borderRadius: "50%", filter: "blur(50px)",
            }}
            aria-hidden="true"
          />

          {/* Ambient glow orb 2 — bottom right */}
          <motion.div
            {...fadeIn(0.4, 2.5)}
            className="absolute pointer-events-none"
            style={{
              width: 420, height: 420, bottom: -80, right: "5%",
              background: "radial-gradient(circle, rgba(196,181,253,0.2) 0%, transparent 65%)",
              borderRadius: "50%", filter: "blur(60px)",
            }}
            aria-hidden="true"
          />

          {/* ── HERO TEXT LAYER ── */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none">

            {/* Pill badge */}
            <motion.div {...fadeIn(0.3, 0.9)}
              className="ci-pill-light inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-violet-600 text-xs font-semibold tracking-widest uppercase">
                AI-Powered Legal Defense
              </span>
            </motion.div>

            {/* Line 1 — soft violet */}
            <motion.h1
              {...fadeUp(0.5)}
              className="ci-violet-soft text-4xl sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] font-bold tracking-tight leading-none mb-3"
            >
              Replace lawyer fees with
            </motion.h1>

            {/* Line 2 — glossy baby violet */}
            <motion.h1
              {...fadeUp(1.2)}
              className="ci-violet-gloss text-4xl sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] font-black tracking-tighter leading-none"
            >
              LEGAL ASSISTER
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...fadeUp(2.0)}
              className="text-slate-500 text-base sm:text-lg md:text-xl mt-6 max-w-lg font-light leading-relaxed"
            >
              AI-powered consumer rights defense — built for everyone.
            </motion.p>
          </div>

          {/* ── CARD LAYER ── */}
          <motion.div
            {...cardAnim}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="ci-card-light relative overflow-visible flex items-center justify-between
                            w-[90vw] max-w-3xl rounded-3xl p-8 sm:p-10 md:p-12 pointer-events-auto">

              {/* Left: logo + stats */}
              <div className="relative z-10 flex-1 flex flex-col gap-6 pr-6 sm:pr-10">
                {/* Logo mark */}
                <div className="flex items-center gap-3">
                  <div className="ci-logo-mark-light w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold text-sm tracking-wide">Legal Assister</p>
                    <p className="text-slate-400 text-xs">Consumer Defense AI</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-col gap-4">
                  <motion.div {...slideIn(3.8)} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-800 text-sm font-semibold">94% Win Rate</p>
                      <p className="text-slate-400 text-xs">Across all dispute types</p>
                    </div>
                  </motion.div>

                  <motion.div {...slideIn(4.05)} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-800 text-sm font-semibold">$2.3M Recovered</p>
                      <p className="text-slate-400 text-xs">For consumers this month</p>
                    </div>
                  </motion.div>

                  <motion.div {...slideIn(4.3)} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-800 text-sm font-semibold">Under 3 Minutes</p>
                      <p className="text-slate-400 text-xs">Average case analysis time</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right: accent text */}
              <div className="hidden sm:flex flex-col items-end text-right shrink-0">
                <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-1">Powered by</p>
                <p className="ci-violet-right text-5xl md:text-6xl font-black tracking-tighter leading-none">Gemini</p>
                <p className="ci-violet-right text-5xl md:text-6xl font-black tracking-tighter leading-none">AI</p>
              </div>

              {/* Floating badge — top-left */}
              <motion.div {...popIn(4.55)}
                className="ci-badge-light absolute -top-5 -left-5 rounded-2xl px-4 py-3 flex items-center gap-3 z-30"
              >
                <div className="w-8 h-8 rounded-full bg-violet-50 border border-violet-200 flex items-center justify-center text-base">
                  ⚡
                </div>
                <div>
                  <p className="text-slate-800 text-xs font-bold">Instant Analysis</p>
                  <p className="text-violet-400 text-[10px]">No lawyer required</p>
                </div>
              </motion.div>

              {/* Floating badge — bottom-right */}
              <motion.div {...popIn(4.85)}
                className="ci-badge-light absolute -bottom-5 -right-5 rounded-2xl px-4 py-3 flex items-center gap-3 z-30"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-base">
                  🛡️
                </div>
                <div>
                  <p className="text-slate-800 text-xs font-bold">Demand Letter Ready</p>
                  <p className="text-emerald-500 text-[10px]">Auto-generated & sent</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
