'use client';

import React from 'react';
import { Menu, Bell, Shield, Cloud, CreditCard, Sparkles } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onToggleMobileMenu?: () => void;
}

export const AdminHeader: React.FC<HeaderProps> = ({ title, subtitle, onToggleMobileMenu }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-2xs">
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-brand-500 rounded-lg hover:bg-gray-100"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <h1 className="text-base sm:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>{title}</span>
          </h1>
          {subtitle && <p className="text-xs text-gray-500 font-medium hidden sm:block">{subtitle}</p>}
        </div>
      </div>

      {/* Cloud & Payment Status Badges */}
      <div className="flex items-center gap-2.5">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/70 rounded-full text-[11px] font-bold text-amber-800">
          <Cloud className="w-3.5 h-3.5 text-amber-600" />
          <span>S3: rudra-infra</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200/70 rounded-full text-[11px] font-bold text-blue-800">
          <CreditCard className="w-3.5 h-3.5 text-blue-600" />
          <span>Razorpay Test Active</span>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-pink-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
            MD
          </div>
          <div className="hidden xl:block text-left text-xs">
            <div className="font-bold text-gray-800 leading-tight">Managing Director</div>
            <div className="text-[10px] text-gray-400">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};
