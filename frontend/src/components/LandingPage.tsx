import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ZoomIn } from 'lucide-react';
import { BoomerangVideoBg } from './BoomerangVideoBg';
import { SplitFlapText } from './ui/SplitFlapText';

interface LandingPageProps {
  onStartFree: () => void;
  onWatchDemo: () => void;
}

export function LandingPage({ onStartFree }: LandingPageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-purple-950">
      <BoomerangVideoBg />

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

        .glossy-baby-violet-subtext {
          background: linear-gradient(
            160deg,
            #A855F7 0%,
            #8B5CF6 50%,
            #7C3AED 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transform: translateZ(0);
          filter: drop-shadow(0px 1px 4px rgba(139,92,246,0.25));
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

      {/* Fixed navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 md:px-14 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo Left */}
        <div className="flex items-center gap-2.5">
          <svg className="w-6 h-6 text-purple-600" viewBox="0 0 256 256" fill="currentColor">
            <path d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" />
          </svg>
          <span className="font-bold text-base tracking-tight glossy-baby-violet-text">Legal Assister</span>
        </div>

        {/* CTA Right */}
        <div>
          <button onClick={onStartFree} className="px-5 py-2.5 glossy-baby-violet-btn text-white text-sm font-medium rounded-lg">
            Start Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden h-screen z-10">
        
        {/* Hero copy block */}
        <div className="flex flex-col items-center text-center" style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tighter font-bold glossy-baby-violet-text w-full">
            The AI legal weapon corporations prayed you'd never get
          </h1>
          <p className="max-w-xl mt-6 sm:mt-8 text-base md:text-lg font-medium glossy-baby-violet-subtext leading-relaxed">
            They stole your money with paperwork. We take it back with code.
          </p>
          <button onClick={onStartFree} className="mt-8 sm:mt-10 px-7 sm:px-9 py-3.5 glossy-baby-violet-btn text-white text-sm font-bold rounded-lg">
            Start Now
          </button>
        </div>

        {/* Bouncing Gold Arrow */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer flex flex-col items-center justify-center opacity-90 hover:opacity-100 transition-opacity z-50 group"
          onClick={() => {
            document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="bg-slate-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 mb-2 shadow-lg">
            <span className="text-[#FFB800] font-bold text-sm tracking-widest uppercase" style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.4))" }}>Scroll Down</span>
          </div>
          <ChevronDown size={56} color="#FFB800" strokeWidth={3} style={{ filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.5))" }} />
        </div>
      </section>

      {/* N8N Orchestration Section - 70vh */}
      <section id="next-section" className="relative w-screen h-[70vh] bg-white z-20 flex flex-col items-center justify-between pt-10 pb-6 px-6 overflow-hidden">
        {/* Animated Title using SplitFlapText */}
        <div className="w-full flex flex-col items-center justify-center">
          <SplitFlapText
            words={['N8N ORCHESTRATION', 'WORKFLOW ENGINE', 'AUTONOMOUS DEFENSE']}
            flipDuration={0.12}
            stagger={0.05}
            cycleDelay={3000}
            charset="alphanumeric"
            flipsPerChar={8}
            tileColor="#6D28D9"
            textColor="#F3E8FF"
            tileRadius={8}
            gap={6}
            fontSize={32}
            loop={true}
            padTo={18}
          />
        </div>

        {/* Fullsize Image Container */}
        <div 
          className="w-full flex-1 my-4 flex items-center justify-center overflow-hidden rounded-2xl border border-purple-100 shadow-2xl bg-slate-950/90 relative p-4 cursor-zoom-in group transition-all"
          onClick={() => setIsZoomed(true)}
        >
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 duration-300">
            <span className="text-white font-bold bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
              <ZoomIn size={20} /> Click to Zoom
            </span>
          </div>
          <img src="/n8n_workflow.png" alt="n8n Orchestration Workflow" className="w-full h-full max-h-[50vh] object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
        </div>
      </section>

      {/* Explanation Video Section - Flows immediately after */}
      <section className="relative w-screen min-h-[30vh] bg-slate-50 z-20 flex flex-col items-center pt-12 pb-24 px-6 border-t border-slate-200 shadow-inner">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center tracking-tight">Explanation video</h2>
        
        <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-white">
          <div style={{ left: 0, width: '100%', height: 0, position: 'relative', paddingBottom: '56.25%' }}>
            <iframe 
              src="https://drive.google.com/file/d/11ILVQLMvxxeutybbo5ZUEv2H2zVMmn4d/preview" 
              style={{ top: 0, left: 0, width: '100%', height: '100%', position: 'absolute', border: 0 }} 
              allowFullScreen 
              scrolling="no" 
              allow="encrypted-media *;"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out backdrop-blur-md transition-opacity"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-[95vw] max-h-[95vh]">
            <img 
              src="/n8n_workflow.png" 
              alt="n8n Orchestration Workflow Zoomed" 
              className="max-w-full max-h-[95vh] object-contain shadow-2xl rounded-xl border border-white/10" 
            />
            <button 
              className="absolute -top-4 -right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg hover:bg-slate-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
