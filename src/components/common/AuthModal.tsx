'use client';

import React, { useState } from 'react';
import { Phone, ShieldCheck, X, ArrowRight, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser } = useApp();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('9988776655');
  const [name, setName] = useState('Muzammil Shaik');
  const [otp, setOtp] = useState(['4', '8', '2', '1']);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(`+91 ${phone}`, name || 'Verified Customer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl animate-slide-up p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <img src="/assets/rr_monogram.png" alt="Logo" className="h-6 w-auto" />
            <span className="font-bold text-xs uppercase tracking-wider text-brand-500">Radhesh & Rudresh</span>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <h2 className="text-lg font-black text-gray-900">Welcome to Radhesh & Rudresh</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Enter your mobile number to sign in or create an account
              </p>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-gray-700 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-hidden focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-gray-700 block mb-1">Mobile Number</label>
              <div className="flex items-center">
                <span className="bg-gray-100 border border-r-0 border-gray-200 text-gray-600 text-xs px-3 py-2 rounded-l-xl font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-r-xl focus:outline-hidden focus:border-brand-500"
                />
              </div>
            </div>

            <div className="bg-brand-50/50 p-2.5 rounded-xl border border-brand-100 flex items-center gap-2 text-[11px] text-brand-700">
              <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
              <span>Demo OTP simulation: Any 4-digit code will authenticate.</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-brand-500 hover:bg-brand-600 active:scale-98 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2"
            >
              <span>Get OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <h2 className="text-lg font-black text-gray-900">Verify OTP</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Code sent to <span className="font-semibold text-gray-800">+91 {phone}</span>
              </p>
            </div>

            <div className="flex justify-between gap-2 max-w-xs mx-auto py-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const next = [...otp];
                    next[i] = e.target.value;
                    setOtp(next);
                  }}
                  className="w-12 h-12 text-center text-lg font-black border border-gray-300 rounded-xl focus:outline-hidden focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-brand-500 hover:bg-brand-600 active:scale-98 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              Verify & Proceed
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-xs text-brand-600 font-medium hover:underline"
            >
              Change Mobile Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
