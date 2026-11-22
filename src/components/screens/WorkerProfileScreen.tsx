'use client';

import React from 'react';
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  Clock,
  MapPin,
  Briefcase,
  ShieldCheck,
  Phone,
  MessageSquare,
  ChevronRight,
  Calendar,
  Zap
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';

export const WorkerProfileScreen: React.FC = () => {
  const { selectedWorker, navigateTo, goBack } = useApp();

  if (!selectedWorker) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Worker profile not found.</p>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold"
        >
          Return to Workers
        </button>
      </div>
    );
  }

  const handleBookNow = () => {
    navigateTo('book-worker');
  };

  return (
    <div className="pb-28 bg-slate-50 min-h-screen">
      <Header title="Worker Profile" showBack={true} showHelp={true} showCart={false} />

      <div className="p-4 space-y-4">
        {/* Worker Hero Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
          <div className="flex gap-3.5 items-start">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 shadow-xs">
              <img
                src={selectedWorker.photo}
                alt={selectedWorker.name}
                className="w-full h-full object-cover"
              />
              {selectedWorker.isOnline && (
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="font-black text-base text-gray-900 line-clamp-1">{selectedWorker.name}</h2>
                {selectedWorker.verified && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
              </div>

              <p className="text-xs font-bold text-brand-500 mt-0.5">{selectedWorker.skill}</p>

              <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-600">
                <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {selectedWorker.rating}
                </span>
                <span>({selectedWorker.reviewCount} Reviews)</span>
              </div>

              <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                <span className="text-emerald-600 font-bold">{selectedWorker.distanceKm} km away</span>
                <span>•</span>
                <span>{selectedWorker.completedJobs} jobs completed</span>
              </div>
            </div>
          </div>

          {/* Quick contact buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={() => alert(`Calling ${selectedWorker.name}: ${selectedWorker.phone}`)}
              className="py-2 px-3 rounded-xl border border-gray-200 text-gray-700 hover:border-brand-500 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-brand-500" />
              <span>Call Worker</span>
            </button>
            <button
              onClick={() => alert(`Chatting with ${selectedWorker.name} is available upon booking.`)}
              className="py-2 px-3 rounded-xl border border-gray-200 text-gray-700 hover:border-brand-500 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-brand-500" />
              <span>In-App Chat</span>
            </button>
          </div>
        </div>

        {/* Transparent Service Charges Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
          <h3 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-2.5">
            Transparent Service Charges
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100 text-center">
              <span className="text-[10px] text-gray-500 font-semibold block">Full Day (8 Hours)</span>
              <span className="text-base font-black text-brand-500">₹{selectedWorker.ratePerDay}</span>
              <span className="text-[9.5px] text-gray-500 block mt-0.5">₹{Math.round(selectedWorker.ratePerDay / 8)} / hour</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
              <span className="text-[10px] text-gray-500 font-semibold block">Hourly Minimum</span>
              <span className="text-base font-black text-gray-900">₹{selectedWorker.ratePerHour}</span>
              <span className="text-[9.5px] text-gray-500 block mt-0.5">Min 2 hours required</span>
            </div>
          </div>
        </div>

        {/* Experience & Background Verification */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2.5">
          <h3 className="font-black text-xs text-gray-900 uppercase tracking-wider">
            Experience & Verification
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-brand-500 shrink-0" />
              <span className="text-gray-700"><strong>{selectedWorker.experienceYears}+ Years</strong> of professional site experience</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-gray-700">Aadhaar verified & criminal record background checked</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
              <span className="text-gray-700">Service Coverage: {selectedWorker.serviceArea}</span>
            </div>
          </div>
        </div>

        {/* About & Expertise */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
          <h3 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-1.5">
            About & Skills
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {selectedWorker.about}
          </p>
        </div>

        {/* Portfolio Photos */}
        {selectedWorker.portfolioImages && selectedWorker.portfolioImages.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
            <h3 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-2">
              Recent Site Work Portfolio
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {selectedWorker.portfolioImages.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-gray-200">
                  <img src={img} alt="Work sample" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions: Book Instantly & Schedule */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 z-40 flex gap-2.5 shadow-lg">
        <button
          onClick={handleBookNow}
          className="flex-1 py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-black text-xs transition shadow-md flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4 fill-white stroke-white" />
          <span>Book Instantly</span>
        </button>
      </div>
    </div>
  );
};
