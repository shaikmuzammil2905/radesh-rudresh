'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles } from 'lucide-react';

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
    <div 
      onClick={() => navigateTo('home')}
      className="relative min-h-screen h-full flex flex-col justify-between bg-white overflow-hidden select-none cursor-pointer"
      title="Tap anywhere to enter"
    >
      {/* Top subtle ambient luxury glow */}
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-pink-50/80 via-rose-50/30 to-transparent pointer-events-none" />

      {/* Main Branding Section with Official Corporate Logo */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-6 z-10">
        <div className="w-80 max-w-[88vw] relative flex items-center justify-center transition-all duration-700 transform hover:scale-[1.02]">
          <img
            src="/assets/brand_logo_transparent.png"
            alt="Radhesh & Rudresh - Infra Developers Pvt. Ltd."
            className="w-full h-auto object-contain filter drop-shadow-md"
          />
        </div>

        {/* Grand Progress Loader */}
        <div className="w-56 h-1.5 bg-gray-100 rounded-full mt-8 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-brand-500 via-pink-500 to-rose-600 transition-all duration-200 rounded-full shadow-xs"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Status Copy */}
        <div className="text-[11.5px] font-semibold text-gray-500 mt-3.5 tracking-wider text-center flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
          <span>
            {progress < 35
              ? 'Curating luxury quarry collections...'
              : progress < 75
              ? 'Connecting certified stone artisans...'
              : 'Welcome to Radhesh & Rudresh'}
          </span>
        </div>
      </div>

      {/* Grand Bottom Architectural Waves */}
      <div className="relative w-full z-10 pointer-events-none">
        {/* Soft Pink Background Wave */}
        <div className="w-full relative">
          <svg
            viewBox="0 0 500 120"
            preserveAspectRatio="none"
            className="w-full h-16 text-pink-200/50 fill-current -mb-10"
          >
            <path d="M0.00,30.00 C150.00,80.00 350.00,-10.00 500.00,35.00 L500.00,120.00 L0.00,120.00 Z" />
          </svg>
        </div>

        {/* Main Brand Magenta Wave */}
        <div className="w-full relative">
          <svg
            viewBox="0 0 500 140"
            preserveAspectRatio="none"
            className="w-full h-24 text-brand-500 fill-current opacity-95 -mb-1"
          >
            <path d="M0.00,45.00 C140.00,110.00 330.00,-20.00 500.00,45.00 L500.00,140.00 L0.00,140.00 Z" />
          </svg>
        </div>

        {/* Grand Bottom Brand Banner */}
        <div className="bg-gradient-to-r from-brand-500 via-pink-600 to-brand-600 px-6 pt-1 pb-7 flex flex-col items-center justify-center text-white">
          <div className="flex items-center gap-2 opacity-95">
            <span className="w-6 h-[1px] bg-white/40" />
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-pink-50">
              Luxury Marbles &middot; Tiles &middot; Master Artisans
            </span>
            <span className="w-6 h-[1px] bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
};
