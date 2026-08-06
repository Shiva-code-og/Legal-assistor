import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BoomerangVideoBg } from './BoomerangVideoBg';

interface LandingPageProps {
  onStartFree: () => void;
  onWatchDemo: () => void;
}

export function LandingPage({ onStartFree }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-blue-950">
      <BoomerangVideoBg />

      {/* Fixed navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 md:px-14 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo Left */}
        <div className="flex items-center gap-2.5">
          <svg className="w-6 h-6 text-blue-950" viewBox="0 0 256 256" fill="currentColor">
            <path d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" />
          </svg>
          <span className="font-semibold text-base tracking-tight text-blue-950">Legal Assister</span>
        </div>

        {/* Center Links (hidden below md) */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#product" className="text-sm text-blue-950/70 hover:text-blue-950 transition-colors duration-200">Product</a>
          <a href="#solutions" className="text-sm text-blue-950/70 hover:text-blue-950 transition-colors duration-200">Solutions</a>
          <a href="#pricing" className="text-sm text-blue-950/70 hover:text-blue-950 transition-colors duration-200">Pricing</a>
          <a href="#company" className="text-sm text-blue-950/70 hover:text-blue-950 transition-colors duration-200">Company</a>
        </div>

        {/* CTA Right */}
        <div>
          <button onClick={onStartFree} className="px-5 py-2.5 bg-blue-950 text-white text-sm font-medium rounded-lg hover:bg-blue-950/90 transition-colors duration-200">
            Book A Demo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden h-screen z-10">
        
        {/* Hero copy block */}
        <div className="flex flex-col items-center text-center" style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tighter text-blue-950 font-normal w-full">
            The AI legal weapon corporations prayed you'd never get
          </h1>
          <p className="max-w-xl mt-6 sm:mt-8 text-base md:text-lg text-blue-950/70 leading-relaxed">
            They stole your money with paperwork. We take it back with code.
          </p>
          <button onClick={onStartFree} className="mt-8 sm:mt-10 px-7 sm:px-9 py-3.5 bg-blue-950 text-white text-sm font-medium rounded-lg hover:bg-blue-950/90 transition-colors duration-200">
            Book A Demo
          </button>
        </div>




      </section>
    </div>
  );
}
