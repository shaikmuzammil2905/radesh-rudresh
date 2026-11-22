'use client';

import React, { useEffect } from 'react';
import {
  Check,
  Calendar,
  Clock,
  Users,
  Hash,
  ArrowRight,
  Home,
  FileText
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import confetti from 'canvas-confetti';

export const BookingConfirmationScreen: React.FC = () => {
  const { lastConfirmedBooking, navigateTo } = useApp();

  useEffect(() => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.5 }
    });
  }, []);

  const booking = lastConfirmedBooking || {
    id: 'RRW268734',
    workerName: 'Tile Fitter',
    workerSkill: 'Master Tile Fitter',
    workerPhoto: '/assets/worker_tile_fitter.png',
    date: 'Sat, 22 Nov 2026',
    timeSlot: '9:00 AM – 6:00 PM',
    numberOfWorkers: 1,
    status: 'Accepted'
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Radhesh & Rudresh - ${booking.workerName} Service`);
    const details = encodeURIComponent(`Booking ID: ${booking.id}\nTime: ${booking.timeSlot}`);
    alert(`Added to Calendar!\n${booking.workerName} on ${booking.date} (${booking.timeSlot})`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 pb-8">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full pt-8 text-center">
        {/* Animated Green Checkmark with Celebration Rays matching Screen 7 */}
        <div className="relative mb-6">
          {/* Subtle radiating rays */}
          <div className="w-28 h-28 rounded-full bg-emerald-100/60 animate-ping absolute inset-0 -m-2 opacity-40 pointer-events-none" />
          <div className="w-24 h-24 rounded-full bg-emerald-500 border-4 border-white shadow-xl flex items-center justify-center text-white relative z-10 mx-auto">
            <Check className="w-12 h-12 stroke-[3.5] animate-scale-in" />
          </div>
        </div>

        {/* Heading & Subtitle matching Screen 7 */}
        <h1 className="text-xl font-black text-gray-900 tracking-tight">
          Booking Confirmed!
        </h1>
        <p className="text-xs text-gray-500 mt-1 max-w-[260px] leading-relaxed">
          Your {booking.workerName} has been booked successfully.
        </p>

        {/* Summary Card matching Screen 7 */}
        <div className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs mt-6 text-left space-y-3">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
              <img
                src={booking.workerPhoto || '/assets/worker_tile_fitter.png'}
                alt={booking.workerName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">{booking.workerName}</h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                ● Assigned & Confirmed
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-gray-600">
              <span className="flex items-center gap-1.5 text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-brand-500" />
                <span>Date:</span>
              </span>
              <span className="font-bold text-gray-900">{booking.date}</span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
              <span className="flex items-center gap-1.5 text-gray-500">
                <Clock className="w-3.5 h-3.5 text-brand-500" />
                <span>Time:</span>
              </span>
              <span className="font-bold text-gray-900">{booking.timeSlot}</span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
              <span className="flex items-center gap-1.5 text-gray-500">
                <Users className="w-3.5 h-3.5 text-brand-500" />
                <span>Workers:</span>
              </span>
              <span className="font-bold text-gray-900">{booking.numberOfWorkers}</span>
            </div>

            <div className="flex items-center justify-between text-gray-600 pt-2 border-t border-dashed border-gray-200">
              <span className="flex items-center gap-1.5 text-gray-500">
                <Hash className="w-3.5 h-3.5 text-brand-500" />
                <span>Booking ID:</span>
              </span>
              <span className="font-black text-brand-600 tracking-wider">{booking.id}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons matching Screen 7 */}
        <div className="w-full mt-6 space-y-2.5">
          {/* View Booking Button (Outline pink) */}
          <button
            onClick={() => navigateTo('orders')}
            className="w-full py-3 px-4 rounded-xl border-2 border-brand-500 text-brand-500 hover:bg-pink-50 font-black text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>View Booking</span>
          </button>

          {/* Add to Calendar Button (Solid pink) */}
          <button
            onClick={handleAddToCalendar}
            className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Add to Calendar</span>
          </button>
        </div>
      </div>

      {/* Back to Home Button */}
      <button
        onClick={() => navigateTo('home')}
        className="w-full max-w-sm mx-auto text-center text-xs font-bold text-gray-500 hover:text-brand-500 py-2 flex items-center justify-center gap-1.5 transition"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>
    </div>
  );
};
