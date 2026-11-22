'use client';

import React, { useState } from 'react';
import {
  Smartphone,
  Maximize2,
  RotateCcw,
  Wifi,
  Battery,
  Signal,
  CheckCircle,
  Layers
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ActiveScreen } from '@/types';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { currentScreen, navigateTo } = useApp();
  const [deviceWidth, setDeviceWidth] = useState<'360px' | '390px' | '414px' | 'full'>('390px');
  const [showToolbar, setShowToolbar] = useState(true);

  const screenList: { id: ActiveScreen; label: string }[] = [
    { id: 'splash', label: '1. Splash' },
    { id: 'home', label: '2. Home' },
    { id: 'products', label: '3. Marble Listing' },
    { id: 'worker-categories', label: '4. Worker Categories' },
    { id: 'product-detail', label: '5. Product Details' },
    { id: 'book-worker', label: '6. Book Worker' },
    { id: 'booking-confirmation', label: '7. Confirmed' },
    { id: 'orders', label: '8. My Orders & Bookings' },
    { id: 'cart', label: 'Cart' },
    { id: 'checkout', label: 'Checkout' },
    { id: 'nearby-workers', label: 'Nearby Workers' },
    { id: 'menu', label: 'Menu & Profile' },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-start sm:p-4 md:p-6 select-none font-sans">
      {/* Top Testing Toolbar for Evaluators */}
      {showToolbar && (
        <aside aria-label="Device simulation toolbar" className="w-full max-w-4xl bg-slate-800/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl mb-4 border border-slate-700/80 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-black text-gray-200">RADHESH & RUDRESH</span>
            <span className="text-[10.5px] bg-brand-500/20 text-brand-300 font-bold px-2 py-0.5 rounded-md border border-brand-500/30">
              Customer Mobile App
            </span>
          </div>

          {/* Quick Screen Switcher Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-full">
            <span className="text-[10px] text-gray-400 font-bold shrink-0">Screen Jump:</span>
            {screenList.map((s) => (
              <button
                key={s.id}
                onClick={() => navigateTo(s.id)}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold whitespace-nowrap transition-all ${
                  currentScreen === s.id
                    ? 'bg-brand-500 text-white shadow-xs scale-105'
                    : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Device Width Presets */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-gray-400 font-bold">Viewport:</span>
            {(['360px', '390px', '414px', 'full'] as const).map((w) => (
              <button
                key={w}
                onClick={() => setDeviceWidth(w)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition ${
                  deviceWidth === w
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </aside>
      )}

      {/* Realistic Mobile Device Mockup Frame */}
      <div
        style={{
          width: deviceWidth === 'full' ? '100%' : deviceWidth,
          maxWidth: deviceWidth === 'full' ? '640px' : deviceWidth
        }}
        className={`bg-white text-gray-900 transition-all duration-300 shadow-2xl relative flex flex-col ${
          deviceWidth === 'full'
            ? 'min-h-screen rounded-none sm:rounded-3xl'
            : 'h-[860px] rounded-[44px] border-[10px] border-slate-800 ring-1 ring-slate-700/50 overflow-hidden'
        }`}
      >
        {/* Mobile Status Bar (9:41, Wifi, Battery matching reference image) */}
        {deviceWidth !== 'full' && (
          <div className="w-full bg-white px-7 pt-3 pb-1 flex items-center justify-between text-gray-900 select-none z-50 shrink-0">
            <span className="text-xs font-black tracking-tight">9:41</span>
            {/* Dynamic Island / Speaker Pill */}
            <div className="w-24 h-4 bg-black rounded-full" />
            <div className="flex items-center gap-1.5 text-gray-900">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <Battery className="w-4 h-4 stroke-[2.5] fill-gray-900" />
            </div>
          </div>
        )}

        {/* Screen Viewport with smooth internal scrolling */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-slate-50">
          {children}
        </div>

        {/* Bottom Home Indicator Bar (iOS style) */}
        {deviceWidth !== 'full' && (
          <div className="w-full bg-white/95 backdrop-blur-xs py-1.5 flex justify-center z-50 shrink-0">
            <div className="w-32 h-1 bg-gray-400 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
