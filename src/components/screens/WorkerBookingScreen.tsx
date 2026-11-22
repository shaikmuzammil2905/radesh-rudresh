'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Minus,
  Plus,
  Star,
  MapPin,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';

export const WorkerBookingScreen: React.FC = () => {
  const {
    selectedWorker,
    selectedAddress,
    addBooking,
    navigateTo,
    goBack
  } = useApp();

  const [requirementType, setRequirementType] = useState<'Per Day' | 'Per Hour' | 'Project Based'>('Per Day');
  const [numberOfWorkers, setNumberOfWorkers] = useState(1);
  const [selectedDate, setSelectedDate] = useState('Sat, 22 Nov 2026');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('9:00 AM – 6:00 PM');
  const [jobDescription, setJobDescription] = useState('Tile fitting for 2BHK, approx. 1000 sq.ft.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedWorker) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Worker not selected.</p>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Calculate pricing dynamically
  const ratePerUnit = requirementType === 'Per Day'
    ? selectedWorker.ratePerDay
    : requirementType === 'Per Hour'
    ? selectedWorker.ratePerHour * 4 // Default 4 hours min for booking
    : 2500; // Project estimated base

  const totalAmount = ratePerUnit * numberOfWorkers;

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      addBooking({
        workerId: selectedWorker.id,
        workerName: `${selectedWorker.category} (${selectedWorker.name})`,
        workerSkill: selectedWorker.skill,
        workerPhoto: selectedWorker.photo,
        requirementType,
        numberOfWorkers,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        siteAddress: `${selectedAddress.fullAddress}, ${selectedAddress.city}`,
        jobDescription,
        ratePerUnit,
        totalAmount
      });

      setIsSubmitting(false);
      navigateTo('booking-confirmation');
    }, 800);
  };

  return (
    <div className="pb-32 bg-slate-50 min-h-screen">
      {/* Top Header matching Screen 6: Back, Book Worker */}
      <Header title="Book Worker" showBack={true} showCart={false} />

      <form onSubmit={handleBookNow} className="p-4 space-y-4">
        {/* Selected Worker Header Card matching Screen 6 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex gap-3.5 items-center">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
            <img
              src={selectedWorker.photo}
              alt={selectedWorker.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-sm text-gray-900 line-clamp-1">{selectedWorker.category}</h2>
              <span className="text-xs font-black text-brand-500">₹{selectedWorker.ratePerDay} / Day</span>
            </div>

            <div className="text-[11px] text-gray-500 mt-0.5">
              Experience: {selectedWorker.experienceYears}+ Years
            </div>

            <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-600">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-bold text-gray-800">{selectedWorker.rating}</span>
              <span>({selectedWorker.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Select Requirement Pills matching Screen 6 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2">
          <h3 className="font-bold text-xs text-gray-900">Select Requirement</h3>
          <div className="grid grid-cols-3 gap-2">
            {(['Per Day', 'Per Hour', 'Project Based'] as const).map((type) => {
              const isSelected = requirementType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setRequirementType(type)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-brand-500 text-white shadow-xs'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Number of Workers Stepper matching Screen 6 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xs text-gray-900">No. of Workers</h3>
            <span className="text-[10px] text-gray-500">Select team size required for site</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setNumberOfWorkers((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-black text-gray-900 w-8 text-center">
              {numberOfWorkers}
            </span>
            <button
              type="button"
              onClick={() => setNumberOfWorkers((prev) => prev + 1)}
              className="w-8 h-8 rounded-lg border border-brand-500 bg-brand-50 text-brand-600 flex items-center justify-center hover:bg-brand-100 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Select Date & Time matching Screen 6 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-3">
          <h3 className="font-bold text-xs text-gray-900">Select Date & Time</h3>

          {/* Date Selector */}
          <div>
            <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-brand-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                aria-label="Select booking date"
                className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 appearance-none focus:outline-hidden focus:border-brand-500"
              >
                <option value="Today (Instant Dispatch)">Today (Instant Dispatch - within 45 mins)</option>
                <option value="Sat, 22 Nov 2026">Sat, 22 Nov 2026</option>
                <option value="Sun, 23 Nov 2026">Sun, 23 Nov 2026</option>
                <option value="Mon, 24 Nov 2026">Mon, 24 Nov 2026</option>
                <option value="Tue, 25 Nov 2026">Tue, 25 Nov 2026</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Time Slot Selector */}
          <div>
            <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Time Slot</label>
            <div className="relative">
              <Clock className="w-4 h-4 text-brand-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                aria-label="Select time slot"
                className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 appearance-none focus:outline-hidden focus:border-brand-500"
              >
                <option value="9:00 AM – 6:00 PM">9:00 AM – 6:00 PM (Full Day Shift)</option>
                <option value="8:00 AM – 1:00 PM">8:00 AM – 1:00 PM (Morning Half Shift)</option>
                <option value="1:00 PM – 6:00 PM">1:00 PM – 6:00 PM (Afternoon Shift)</option>
                <option value="Emergency Now">Immediate Dispatch (within 45 mins)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Site Address Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>Construction Site Address</span>
            </h3>
            <button
              type="button"
              onClick={() => navigateTo('addresses')}
              className="text-[11px] font-bold text-brand-500 hover:underline"
            >
              Change
            </button>
          </div>
          <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
            {selectedAddress.fullAddress}, {selectedAddress.city} - {selectedAddress.pincode}
          </p>
        </div>

        {/* Job Description (Optional) matching Screen 6 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-1.5">
          <h3 className="font-bold text-xs text-gray-900">Job Description (Optional)</h3>
          <textarea
            rows={2}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="e.g., Tile fitting for 2BHK, approx. 1000 sq.ft."
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-brand-500 focus:outline-hidden resize-none"
          />
        </div>

        {/* Estimated Price Transparency Card */}
        <div className="bg-brand-50/50 p-3.5 rounded-2xl border border-brand-100 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-gray-800 block">Total Estimated Charges</span>
            <span className="text-[10.5px] text-gray-500">
              ₹{ratePerUnit} × {numberOfWorkers} worker{numberOfWorkers > 1 ? 's' : ''} ({requirementType})
            </span>
          </div>
          <div className="text-right">
            <span className="text-base font-black text-brand-500">₹{totalAmount.toLocaleString()}</span>
            <span className="text-[9px] text-gray-500 block">Pay on site / completion</span>
          </div>
        </div>

        {/* Sticky Pink "Book Now" Button matching Screen 6 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 z-40 shadow-lg">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-98 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Confirming Booking...</span>
            ) : (
              <span>Book Now</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
