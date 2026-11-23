'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

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
    }, 180);

    return () => clearInterval(timer);
  }, [navigateTo]);

  return (
    <div className="relative min-h-[700px] h-full flex flex-col justify-between bg-white overflow-hidden select-none">
      {/* Top subtle ambient glow */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-pink-50/70 via-rose-50/30 to-transparent pointer-events-none" />

      {/* Main Branding Section with Official Corporate Logo */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-10 pb-4 z-10">
        <div className="w-72 max-w-[85vw] relative flex items-center justify-center transition-all duration-700 transform hover:scale-105">
          <img
            src="/assets/brand_logo_transparent.png"
            alt="Radhesh & Rudresh - Infra Developers Pvt. Ltd."
            className="w-full h-auto object-contain filter drop-shadow-sm"
          />
        </div>

        {/* Progress loader */}
        <div className="w-52 h-1.5 bg-gray-100 rounded-full mt-7 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-pink-500 transition-all duration-200 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-[11px] font-medium text-gray-500 mt-2.5 tracking-wider text-center flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-brand-500 animate-pulse" />
          <span>
            {progress < 40
              ? 'Loading premium marble slabs...'
              : progress < 80
              ? 'Connecting trusted stone craftsmen...'
              : 'Welcome to Radhesh & Rudresh'}
          </span>
        </div>

        <button
          onClick={() => navigateTo('home')}
          className="mt-5 flex items-center gap-2 px-5 py-2 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-600 text-xs font-bold transition-all active:scale-95 shadow-2xs cursor-pointer"
        >
          <span>Skip to App</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Pink Wave & Marble Slabs Exhibition */}
      <div className="relative w-full z-10">
        {/* Pink wave curve */}
        <div className="w-full relative">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="w-full h-24 text-brand-500 fill-current opacity-95 -mb-1"
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
