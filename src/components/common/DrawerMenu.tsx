'use client';

import React from 'react';
import {
  X,
  Home,
  ShoppingBag,
  Users,
  MapPin,
  ClipboardList,
  Heart,
  Phone,
  HelpCircle,
  Building2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Layers,
  LogOut
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ProductCategory } from '@/types';

export const DrawerMenu: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    navigateTo,
    setSelectedCategory,
    orders,
    bookings,
    userName,
    userPhone,
    isLoggedIn,
    logoutUser,
    setIsAuthModalOpen
  } = useApp();

  if (!isDrawerOpen) return null;

  const handleNav = (screen: any) => {
    setIsDrawerOpen(false);
    navigateTo(screen);
  };

  const handleCategoryNav = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setIsDrawerOpen(false);
    navigateTo('products');
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Slide-out Menu Panel */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-right overflow-y-auto">
        <div>
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-xs text-white">
                  {userName ? userName.charAt(0) : 'R'}
                </div>
                <div>
                  <div className="font-black text-xs leading-tight">{userName}</div>
                  <div className="text-[10px] text-pink-100">{userPhone}</div>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-[10px] font-bold uppercase tracking-wider text-pink-100 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Customer Account</span>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 border-b border-gray-100 divide-x divide-gray-100 bg-gray-50/50 py-2 text-center text-xs">
            <div
              onClick={() => handleNav('orders')}
              className="cursor-pointer hover:bg-gray-100 py-1"
            >
              <span className="font-black text-gray-900 block">{orders.length}</span>
              <span className="text-[10px] text-gray-500">Orders</span>
            </div>
            <div
              onClick={() => handleNav('orders')}
              className="cursor-pointer hover:bg-gray-100 py-1"
            >
              <span className="font-black text-gray-900 block">{bookings.length}</span>
              <span className="text-[10px] text-gray-500">Bookings</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1 text-xs">
            <button
              onClick={() => handleNav('home')}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-pink-50 hover:text-brand-600 font-bold text-gray-800 transition"
            >
              <Home className="w-4 h-4 text-brand-500" />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNav('products')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-pink-50 hover:text-brand-600 font-bold text-gray-800 transition"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-brand-500" />
                <span>Shop All Stones & Tiles</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </button>

            <button
              onClick={() => handleNav('worker-categories')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-pink-50 hover:text-brand-600 font-bold text-gray-800 transition"
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-brand-500" />
                <span>Book Skilled Workers</span>
              </div>
              <span className="text-[9px] bg-brand-50 text-brand-600 px-1.5 py-0.5 rounded-full font-bold">
                Instant
              </span>
            </button>

            <button
              onClick={() => handleNav('orders')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-pink-50 hover:text-brand-600 font-bold text-gray-800 transition"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="w-4 h-4 text-brand-500" />
                <span>My Orders & Bookings</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </button>

            <button
              onClick={() => handleNav('addresses')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-pink-50 hover:text-brand-600 font-bold text-gray-800 transition"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>Construction Sites</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {/* Partner Portal Link (Workers & Riders) */}
            <a
              href="/partner"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 font-bold text-slate-800 transition bg-slate-50 border border-slate-200/80 mt-1"
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-brand-500" />
                <span>Partner Portal (Workers & Riders)</span>
              </div>
              <span className="text-[9px] bg-slate-900 text-white px-2 py-0.5 rounded-full font-bold">
                Join Network
              </span>
            </a>

            {/* Admin CMS Portal Link */}
            <a
              href="/admin/dashboard"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 font-bold text-slate-800 transition bg-slate-50 border border-slate-200/80 mt-1"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>Admin CMS Panel</span>
              </div>
              <span className="text-[9px] bg-brand-500 text-white px-2 py-0.5 rounded-full font-bold">
                Enterprise
              </span>
            </a>
          </div>

          {/* Quick Categories Bar */}
          <div className="p-3 border-t border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 block mb-2">
              Browse Categories
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { name: 'Marble', label: 'Marbles' },
                { name: 'Tiles', label: 'Tiles' },
                { name: 'Granite', label: 'Granite' },
                { name: 'Natural Stone', label: 'Natural Stones' },
                { name: 'Bathroom Collection', label: 'Bathroom' },
                { name: 'Kitchen Collection', label: 'Kitchen' }
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleCategoryNav(c.name as ProductCategory)}
                  className="p-2 text-left bg-gray-50 hover:bg-pink-50 hover:text-brand-600 rounded-lg font-medium text-gray-700 transition line-clamp-1"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 bg-gray-50/50 space-y-2 text-xs">
          <button
            onClick={() => handleNav('support')}
            className="w-full flex items-center gap-2.5 p-2 rounded-xl text-gray-700 hover:text-brand-600 font-semibold"
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <span>24x7 Help & Support</span>
          </button>

          <div 
            onClick={() => handleNav('splash')}
            className="pt-2 text-center text-[10px] text-gray-400 cursor-pointer hover:opacity-80 transition group"
            title="Click to view brand splash screen"
          >
            <span className="font-bold text-brand-500 block group-hover:underline">RADHESH & RUDRESH</span>
            <span>BUILDING TRUST. CREATING FUTURES.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
