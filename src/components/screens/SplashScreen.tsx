'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          navigateTo('home');
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [navigateTo]);

  return (
    <div className="relative min-h-[700px] h-full flex flex-col justify-between bg-white overflow-hidden select-none">
      {/* Top background subtle glow */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-brand-50/50 to-transparent pointer-events-none" />

      {/* Main Branding Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 z-10">
        <div className="w-24 h-24 mb-4 relative flex items-center justify-center animate-bounce-slow">
          <img
            src="/assets/rr_monogram.png"
            alt="Radhesh & Rudresh Monogram"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>

        <h1 className="text-2xl font-black text-brand-500 tracking-wider text-center uppercase">
          RADHESH & RUDRESH
        </h1>
        <p className="text-[11px] font-bold text-gray-700 tracking-widest text-center uppercase mt-1">
          — INFRA DEVELOPERS PVT. LTD. —
        </p>
        <p className="text-[9.5px] font-semibold text-gray-400 tracking-widest text-center uppercase mt-1">
          — BUILDING TRUST. CREATING FUTURES. —
        </p>

        {/* Progress loader */}
        <div className="w-48 h-1.5 bg-gray-100 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-brand-500 transition-all duration-200 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={() => navigateTo('home')}
          className="mt-6 flex items-center gap-2 px-5 py-2 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-600 text-xs font-bold transition-all active:scale-95 shadow-2xs"
        >
          <span>Skip to App</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Pink Wave & Marble Slabs from reference image */}
      <div className="relative w-full z-10">
        {/* Pink wave curve */}
        <div className="w-full relative">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="w-full h-24 text-brand-500 fill-current opacity-90 -mb-1"
          >
            <path d="M0.00,49.98 C149.99,150.00 349.81,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" />
          </svg>
        </div>

        {/* Bottom marble slabs container */}
        <div className="bg-brand-500 px-4 pb-8 pt-1 flex justify-center items-center">
          <div className="relative -mt-16 w-64 max-w-full drop-shadow-2xl">
            <img
              src="/assets/splash_slabs.png"
              alt="Marble Slabs Exhibition"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
