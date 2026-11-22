'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  HelpCircle,
  MapPin,
  ChevronDown,
  Zap,
  ChevronRight,
  Hammer,
  Grid,
  Layers,
  Sparkles,
  Maximize,
  Paintbrush,
  Wrench,
  Bolt,
  PenTool,
  Truck,
  MoreHorizontal
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';
import { LocationModal } from '../common/LocationModal';
import { WorkerCategory } from '@/types';

interface CategoryItem {
  id: WorkerCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const WorkerCategoriesScreen: React.FC = () => {
  const {
    navigateTo,
    selectedLocation,
    setSelectedWorkerCategory
  } = useApp();

  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // 11 Worker Categories matching Screen 4 of reference image
  const workerCategories: CategoryItem[] = [
    { id: 'Mason', label: 'Mason', icon: Hammer },
    { id: 'Tile Fitter', label: 'Tile Fitter', icon: Grid },
    { id: 'Marble Fitter', label: 'Marble Fitter', icon: Layers },
    { id: 'Marble Polisher', label: 'Marble Polisher', icon: Sparkles },
    { id: 'Granite Fitter', label: 'Granite Fitter', icon: Maximize },
    { id: 'Painter', label: 'Painter', icon: Paintbrush },
    { id: 'Plumber', label: 'Plumber', icon: Wrench },
    { id: 'Electrician', label: 'Electrician', icon: Bolt },
    { id: 'Carpenter', label: 'Carpenter', icon: PenTool },
    { id: 'Labor / Helper', label: 'Labor / Helper', icon: Truck },
    { id: 'Other Services', label: 'Other Services', icon: MoreHorizontal },
  ];

  const handleCategoryClick = (cat: WorkerCategory) => {
    setSelectedWorkerCategory(cat);
    navigateTo('nearby-workers');
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Top Header matching Screen 4: Back, Book Workers, Support icon */}
      <Header
        title="Book Workers"
        showBack={true}
        showHelp={true}
        showCart={false}
      />

      {/* Location Selector Bar matching Screen 4 */}
      <div className="bg-white px-4 py-2 border-b border-gray-100 flex items-center justify-between">
        <button
          onClick={() => setIsLocationOpen(true)}
          className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-brand-600 transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 text-brand-500" />
          <span className="font-semibold text-gray-800 line-clamp-1">{selectedLocation}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Top Promotional Banner matching Screen 4 */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-100 p-4 flex items-center justify-between shadow-2xs">
          <div className="max-w-[190px]">
            <h2 className="text-sm font-black text-gray-900 leading-tight">
              Verified & Skilled Workers
            </h2>
            <p className="text-[11px] text-gray-600 mt-1 leading-snug">
              Book Instantly for Your Construction & Interiors
            </p>
          </div>
          <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
            <img
              src="/assets/worker_banner.png"
              alt="Skilled Worker"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 3-Column Worker Categories Grid matching Screen 4 */}
        <div className="grid grid-cols-3 gap-2.5">
          {workerCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="bg-white p-3 rounded-2xl border border-gray-100 hover:border-brand-300 shadow-2xs hover:shadow-xs transition-all flex flex-col items-center justify-center text-center group active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-50/70 text-brand-500 flex items-center justify-center mb-1.5 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="text-[11px] font-bold text-gray-800 group-hover:text-brand-500 leading-tight">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Instant Booking Bottom Banner matching Screen 4 */}
        <button
          onClick={() => {
            setSelectedWorkerCategory('All');
            navigateTo('nearby-workers');
          }}
          className="w-full bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:shadow-xs transition active:scale-98 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-xs">
              <Zap className="w-5 h-5 fill-white stroke-white" />
            </div>
            <div>
              <div className="text-xs font-black text-brand-600 uppercase tracking-wide">
                Instant Booking
              </div>
              <div className="text-[10.5px] text-gray-600 font-medium">
                Choose, Schedule & Get Workers at Your Site
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-brand-500" />
        </button>
      </div>

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
    </div>
  );
};
