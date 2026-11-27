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
  ChevronRight,
  CreditCard,
  Zap,
  Lock
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';
import confetti from 'canvas-confetti';

export const WorkerBookingScreen: React.FC = () => {
  const {
    selectedWorker,
    selectedAddress,
    addBooking,
    navigateTo,
    goBack,
    userName,
    userPhone
  } = useApp();

  const [requirementType, setRequirementType] = useState<'Per Day' | 'Per Hour' | 'Project Based'>('Per Day');
  const [numberOfWorkers, setNumberOfWorkers] = useState(1);
  const [selectedDate, setSelectedDate] = useState('Sat, 22 Nov 2026');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('9:00 AM – 6:00 PM');
  const [jobDescription, setJobDescription] = useState('Tile fitting for 2BHK, approx. 1000 sq.ft.');
  const [paymentOption, setPaymentOption] = useState<'advance' | 'full' | 'site'>('advance');
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
  const advanceAmount = 500;
  const payableAmount = paymentOption === 'advance' ? advanceAmount : paymentOption === 'full' ? totalAmount : 0;

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (paymentOption === 'site') {
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
          totalAmount,
          paymentMethod: 'Pay on Site',
          paymentStatus: 'Pending',
        });

        setIsSubmitting(false);
        navigateTo('booking-confirmation');
      }, 700);
      return;
    }

    // Razorpay Online Payment Flow
    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: payableAmount,
          receipt: `wk_${Date.now()}`,
          notes: {
            worker: selectedWorker.name,
            service: selectedWorker.category,
            paymentType: paymentOption === 'advance' ? 'Advance Token (₹500)' : 'Full Day Rate',
          },
        }),
      });

      const orderData = await res.json();
      if (!orderData.success) {
        throw new Error(orderData.message || 'Payment order creation failed');
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Radhesh & Rudresh Infra Developers',
        description: paymentOption === 'advance'
          ? `₹${advanceAmount} Booking Token - ${selectedWorker.category}`
          : `Full Shift Booking - ${selectedWorker.category}`,
        image: '/assets/rr_monogram.png',
        order_id: orderData.orderId,
        prefill: {
          name: userName || 'Site Customer',
          contact: userPhone || '+91 99887 76655',
          email: 'sales@radheshrudresh.com',
        },
        theme: {
          color: '#E91E63',
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                amount: payableAmount,
                customerName: userName || 'Site Customer',
                customerPhone: userPhone || '+91 99887 76655',
                referenceType: 'booking',
                referenceId: orderData.orderId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              confetti({
                particleCount: 90,
                spread: 70,
                origin: { y: 0.6 }
              });

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
                totalAmount,
                paymentMethod: 'Razorpay Online',
                paymentId: response.razorpay_payment_id,
                paymentStatus: paymentOption === 'advance' ? 'Advance Paid' : 'Paid',
              });

              setIsSubmitting(false);
              navigateTo('booking-confirmation');
            } else {
              alert('Payment verification failed.');
              setIsSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            alert('Verification network error');
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (err: any) {
      console.error(err);
      alert('Could not open Razorpay payment: ' + (err.message || 'Error'));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-36 bg-slate-50 min-h-screen">
      {/* Top Header matching Screen 6: Back, Book Worker */}
      <Header title="Book Worker" showBack={true} showCart={false} />

      <form onSubmit={handleBookNow} className="p-4 space-y-4">
        {/* Selected Worker Header Card */}
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

        {/* Select Requirement Pills */}
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

        {/* Number of Workers Stepper */}
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

        {/* Select Date & Time */}
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

        {/* Job Description (Optional) */}
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

        {/* Payment Mode Selection with Razorpay */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-brand-500" />
              <span>Payment Options</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> Razorpay Secured
            </span>
          </div>

          <div className="space-y-2">
            {/* Option 1: Advance Token */}
            <div
              onClick={() => setPaymentOption('advance')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                paymentOption === 'advance'
                  ? 'border-brand-500 bg-brand-50/40 ring-1 ring-brand-500'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  paymentOption === 'advance' ? 'border-brand-500 bg-brand-500' : 'border-gray-300'
                }`}>
                  {paymentOption === 'advance' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <span>Pay Advance Token Online</span>
                    <span className="text-[9px] bg-brand-100 text-brand-700 px-1.5 py-0.2 rounded font-black">POPULAR</span>
                  </div>
                  <div className="text-[10.5px] text-gray-500">
                    Guaranteed priority dispatch. Rest ₹{(totalAmount - advanceAmount).toLocaleString()} payable after job completion.
                  </div>
                </div>
              </div>
              <span className="text-xs font-black text-brand-600 shrink-0">₹{advanceAmount}</span>
            </div>

            {/* Option 2: Full Online Payment */}
            <div
              onClick={() => setPaymentOption('full')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                paymentOption === 'full'
                  ? 'border-brand-500 bg-brand-50/40 ring-1 ring-brand-500'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  paymentOption === 'full' ? 'border-brand-500 bg-brand-500' : 'border-gray-300'
                }`}>
                  {paymentOption === 'full' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Pay Full Amount via Razorpay</div>
                  <div className="text-[10.5px] text-gray-500">100% cashless, UPI / Cards / NetBanking</div>
                </div>
              </div>
              <span className="text-xs font-black text-gray-900 shrink-0">₹{totalAmount.toLocaleString()}</span>
            </div>

            {/* Option 3: Pay on Site */}
            <div
              onClick={() => setPaymentOption('site')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                paymentOption === 'site'
                  ? 'border-brand-500 bg-brand-50/40 ring-1 ring-brand-500'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  paymentOption === 'site' ? 'border-brand-500 bg-brand-500' : 'border-gray-300'
                }`}>
                  {paymentOption === 'site' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Pay on Site / Cash</div>
                  <div className="text-[10.5px] text-gray-500">Pay total ₹{totalAmount.toLocaleString()} directly after site inspection</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-gray-500 shrink-0">₹0 now</span>
            </div>
          </div>
        </div>

        {/* Estimated Price Transparency Card */}
        <div className="bg-brand-50/50 p-3.5 rounded-2xl border border-brand-100 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-gray-800 block">
              {paymentOption === 'advance' ? 'Payable Online Now (Token)' : paymentOption === 'full' ? 'Total Payable Now' : 'Total Service Charges'}
            </span>
            <span className="text-[10.5px] text-gray-500">
              ₹{ratePerUnit} × {numberOfWorkers} worker{numberOfWorkers > 1 ? 's' : ''} ({requirementType})
            </span>
          </div>
          <div className="text-right">
            <span className="text-base font-black text-brand-500">
              ₹{(paymentOption === 'site' ? totalAmount : payableAmount).toLocaleString()}
            </span>
            <span className="text-[9px] text-gray-500 block">
              {paymentOption === 'advance'
                ? `Balance ₹${(totalAmount - advanceAmount).toLocaleString()} on site`
                : paymentOption === 'full'
                ? 'Fully paid online'
                : 'Pay on site / completion'}
            </span>
          </div>
        </div>

        {/* Sticky Pink "Book Now" Button */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 z-40 shadow-lg">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-98 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Processing Booking...</span>
            ) : paymentOption === 'site' ? (
              <span>Confirm Booking (Pay on Site)</span>
            ) : (
              <span>Pay ₹{payableAmount.toLocaleString()} via Razorpay & Confirm</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
