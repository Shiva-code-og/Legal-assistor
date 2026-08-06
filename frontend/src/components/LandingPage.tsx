import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BoomerangVideoBg } from './BoomerangVideoBg';
import { SplitFlapText } from './ui/SplitFlapText';

interface LandingPageProps {
  onStartFree: () => void;
  onWatchDemo: () => void;
}

export function LandingPage({ onStartFree }: LandingPageProps) {
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

      </section>

      {/* New 100vh 100vw White Section below Hero */}
      <section className="relative w-screen h-screen bg-white z-20 flex flex-col items-center justify-between py-12 px-6 overflow-hidden">
        {/* Animated Title using SplitFlapText */}
        <div className="w-full flex flex-col items-center justify-center pt-4">
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
            fontSize={36}
            loop={true}
            padTo={18}
          />
        </div>

        {/* Fullsize Image Container */}
        <div className="w-full flex-1 my-6 flex items-center justify-center overflow-hidden rounded-2xl border border-purple-100 shadow-2xl bg-slate-950/90 relative p-4">
          <img src="/n8n_workflow.png" alt="n8n Orchestration Workflow" className="w-full h-full max-h-[70vh] object-contain" />
        </div>
      </section>
    </div>
  );
}
