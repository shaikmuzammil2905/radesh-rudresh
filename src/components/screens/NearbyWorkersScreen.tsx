'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  List,
  Map as MapIcon,
  Star,
  CheckCircle2,
  Clock,
  Zap,
  Phone,
  Navigation,
  ChevronRight,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';
import { LocationModal } from '../common/LocationModal';
import { INITIAL_WORKERS } from '@/data/mockData';
import { Worker, WorkerCategory } from '@/types';

export const NearbyWorkersScreen: React.FC = () => {
  const {
    navigateTo,
    selectedLocation,
    selectedWorkerCategory,
    setSelectedWorkerCategory,
    setSelectedWorker,
    availableNowFilter,
    setAvailableNowFilter
  } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedMapWorker, setSelectedMapWorker] = useState<Worker>(INITIAL_WORKERS[0]);
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);

  React.useEffect(() => {
    fetch('/api/cms/workers')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.workers && data.workers.length > 0) {
          setWorkers(data.workers);
        }
      })
      .catch(() => {});
  }, []);

  const categories: (WorkerCategory | 'All')[] = [
    'All',
    'Tile Fitter',
    'Marble Fitter',
    'Marble Polisher',
    'Mason',
    'Granite Fitter',
    'Painter',
    'Plumber',
    'Electrician',
    'Carpenter',
    'Labor / Helper'
  ];

  const filteredWorkers = workers.filter((worker) => {
    const matchesCategory =
      selectedWorkerCategory === 'All' ||
      worker.category === selectedWorkerCategory;
    const matchesAvailableNow = !availableNowFilter || (worker.isOnline && worker.isAvailableNow);
    return matchesCategory && matchesAvailableNow;
  });

  const handleWorkerSelect = (worker: Worker) => {
    setSelectedWorker(worker);
    navigateTo('worker-profile');
  };

  const handleInstantBook = (e: React.MouseEvent, worker: Worker) => {
    e.stopPropagation();
    setSelectedWorker(worker);
    navigateTo('book-worker');
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Top Header */}
      <Header
        title="Available Workers Near You"
        showBack={true}
        showHelp={true}
        showCart={false}
      />

      {/* Location Selector Bar */}
      <div className="bg-white px-4 py-2 border-b border-gray-100 flex items-center justify-between">
        <button
          onClick={() => setIsLocationOpen(true)}
          className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-brand-600 transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 text-brand-500" />
          <span className="font-semibold text-gray-800 line-clamp-1">Site: {selectedLocation}</span>
        </button>

        {/* View Toggle: List vs Map */}
        <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
          <button
            onClick={() => setViewMode('list')}
            className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition ${
              viewMode === 'list'
                ? 'bg-white text-brand-600 shadow-2xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <List className="w-3 h-3" />
            <span>List</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition ${
              viewMode === 'map'
                ? 'bg-white text-brand-600 shadow-2xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <MapIcon className="w-3 h-3" />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* Prominent "Available Now" Instant Booking Filter Switch */}
      <div className="bg-white px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-pink-50 text-brand-500 flex items-center justify-center">
            <Zap className="w-4 h-4 fill-brand-500 stroke-brand-500" />
          </div>
          <div>
            <div className="text-xs font-black text-gray-900 flex items-center gap-1.5">
              <span>Available Now</span>
              <span className="bg-emerald-100 text-emerald-700 text-[8.5px] font-black px-1.5 rounded-full">
                Live
              </span>
            </div>
            <p className="text-[10px] text-gray-500">Show workers ready for immediate site visit</p>
          </div>
        </div>

        {/* Custom Toggle Switch */}
        <button
          onClick={() => setAvailableNowFilter(!availableNowFilter)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-hidden ${
            availableNowFilter ? 'bg-brand-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              availableNowFilter ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Worker Categories Horizontal Filter Pills */}
      <div className="bg-white px-4 py-2 border-b border-gray-100 overflow-x-auto no-scrollbar">
        <div className="flex gap-1.5 py-0.5">
          {categories.map((cat) => {
            const isActive = selectedWorkerCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedWorkerCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: List Mode or Map Mode */}
      {viewMode === 'list' ? (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Found <strong>{filteredWorkers.length}</strong> skilled workers</span>
            {availableNowFilter && (
              <span className="text-brand-500 font-bold">Filtered: Available Now</span>
            )}
          </div>

          {filteredWorkers.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200/80 my-4">
              <p className="text-gray-500 text-xs">No workers available matching your current filters.</p>
              <button
                onClick={() => {
                  setSelectedWorkerCategory('All');
                  setAvailableNowFilter(false);
                }}
                className="mt-3 px-4 py-1.5 bg-brand-500 text-white rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                onClick={() => handleWorkerSelect(worker)}
                className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs hover:shadow-xs hover:border-brand-200 transition-all cursor-pointer space-y-3"
              >
                <div className="flex gap-3">
                  {/* Worker Photo with Live Indicator */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    <img
                      src={worker.photo}
                      alt={worker.name}
                      className="w-full h-full object-cover"
                    />
                    {worker.isOnline && (
                      <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-2xs" />
                    )}
                  </div>

                  {/* Worker Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-xs text-gray-900 line-clamp-1">{worker.name}</h3>
                        {worker.verified && (
                          <span title="Verified KYC">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-black text-brand-500">
                        ₹{worker.ratePerDay}
                        <span className="text-[9px] text-gray-500 font-normal"> / Day</span>
                      </span>
                    </div>

                    <p className="text-[11px] font-semibold text-brand-600 mt-0.5">
                      {worker.skill}
                    </p>

                    <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {worker.rating}
                      </span>
                      <span>({worker.reviewCount})</span>
                      <span>•</span>
                      <span>{worker.experienceYears}+ Yrs Exp</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        <Navigation className="w-2.5 h-2.5" />
                        {worker.distanceKm} km away
                      </span>
                      {worker.isAvailableNow && (
                        <>
                          <span>•</span>
                          <span className="text-brand-500 font-bold flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            ETA: {worker.estimatedArrivalMin || 30} mins
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 line-clamp-1 max-w-[170px]">
                    Area: {worker.serviceArea}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Calling ${worker.name}: ${worker.phone}`);
                      }}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-brand-500 hover:border-brand-500 transition"
                      aria-label="Call worker"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleInstantBook(e, worker)}
                      className="px-3.5 py-1.5 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1"
                    >
                      <span>Book Now</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Map View Mode with Simulated GPS Radar & Worker Markers */
        <div className="relative h-[650px] w-full bg-slate-200 overflow-hidden select-none">
          {/* Simulated Map Canvas with Streets & Landmarks */}
          <div className="absolute inset-0 bg-[#E5E9EC] opacity-90">
            {/* Grid street lines */}
            <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#CBD5E1" strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Main Highway lines */}
              <line x1="0" y1="180" x2="450" y2="180" stroke="#FBBF24" strokeWidth="8" />
              <line x1="160" y1="0" x2="160" y2="650" stroke="#FBBF24" strokeWidth="8" />
              <line x1="40" y1="420" x2="420" y2="420" stroke="#FFFFFF" strokeWidth="12" />
            </svg>
          </div>

          {/* User Site Marker (Center) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-brand-500/20 animate-ping absolute inset-0" />
              <div className="w-10 h-10 rounded-full bg-brand-500 border-3 border-white shadow-xl flex items-center justify-center text-white relative z-10">
                <MapPin className="w-5 h-5 fill-white" />
              </div>
            </div>
            <div className="bg-white/95 px-2.5 py-1 rounded-full shadow-md border border-gray-200 text-[10px] font-black text-gray-900 mt-1 whitespace-nowrap">
              Your Site Location
            </div>
          </div>

          {/* Worker Map Pins */}
          {filteredWorkers.map((worker, index) => {
            // Distribute markers around the center
            const angles = [45, 120, 210, 300, 30, 160, 250, 330];
            const angle = (angles[index % angles.length] * Math.PI) / 180;
            const radius = 90 + (index % 3) * 45;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isSelected = selectedMapWorker.id === worker.id;

            return (
              <div
                key={worker.id}
                onClick={() => setSelectedMapWorker(worker)}
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  top: '50%',
                  left: '50%'
                }}
                className="absolute z-20 cursor-pointer transition-transform hover:scale-110 active:scale-95"
              >
                <div
                  className={`relative flex items-center gap-1.5 p-1 rounded-full shadow-lg border-2 transition-all ${
                    isSelected
                      ? 'bg-brand-500 border-white ring-4 ring-brand-300'
                      : 'bg-white border-brand-500'
                  }`}
                >
                  <img
                    src={worker.photo}
                    alt={worker.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span
                    className={`text-[9px] font-bold pr-1.5 ${
                      isSelected ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    ₹{worker.ratePerDay}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Selected Worker Bottom Float Card */}
          {selectedMapWorker && (
            <div className="absolute bottom-4 left-4 right-4 z-30">
              <div className="bg-white rounded-2xl p-3.5 border border-gray-200 shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedMapWorker.photo}
                    alt={selectedMapWorker.name}
                    className="w-12 h-12 rounded-xl object-cover border"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">{selectedMapWorker.name}</h4>
                    <p className="text-[10.5px] font-semibold text-brand-500">{selectedMapWorker.skill}</p>
                    <div className="flex items-center gap-1.5 text-[9.5px] text-gray-500">
                      <span className="text-amber-500 font-bold flex items-center">
                        ★ {selectedMapWorker.rating}
                      </span>
                      <span>•</span>
                      <span>{selectedMapWorker.distanceKm} km away</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-gray-900">₹{selectedMapWorker.ratePerDay}/Day</div>
                  <button
                    onClick={() => {
                      setSelectedWorker(selectedMapWorker);
                      navigateTo('book-worker');
                    }}
                    className="mt-1 px-3 py-1 bg-brand-500 text-white rounded-lg text-[10.5px] font-bold shadow-xs active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
    </div>
  );
};
