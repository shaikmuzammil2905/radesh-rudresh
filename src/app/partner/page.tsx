'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Truck,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  HardHat,
  ChevronRight,
  Phone,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function PartnerLandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between max-w-md mx-auto relative shadow-2xl overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 -left-10 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-10 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="p-5 flex items-center justify-between relative z-10">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </button>

        <span className="px-3 py-1 bg-white/10 rounded-full text-[10.5px] font-bold text-brand-300 border border-white/10 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
          <span>Official Partner Network</span>
        </span>
      </div>

      {/* Hero Branding */}
      <div className="px-6 py-4 text-center relative z-10 space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-brand-500 to-pink-500 p-0.5 shadow-lg shadow-brand-500/30 flex items-center justify-center">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
            <HardHat className="w-8 h-8 text-brand-400" />
          </div>
        </div>

        <div>
          <h1 className="text-xl font-black tracking-tight text-white uppercase">
            Radhesh & Rudresh
          </h1>
          <p className="text-[11px] font-bold tracking-widest text-brand-400 uppercase mt-0.5">
            Partner & Logistics Portal
          </p>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
          Join Hyderabad’s fastest growing network of verified stone fitters, master artisans, and heavy crane transporters.
        </p>
      </div>

      {/* Two Main Partner Categories */}
      <div className="px-5 space-y-3 relative z-10">
        {/* Worker / Artisan Card */}
        <div
          onClick={() => router.push('/partner/register?type=Worker')}
          className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-brand-500/80 transition-all cursor-pointer group active:scale-98 shadow-md"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-pink-500/15 text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6 stroke-[2]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white group-hover:text-brand-300 transition-colors">
                  Skilled Artisan / Worker
                </h3>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                For Masons, Italian Marble Fitters, Granite Polishers & Tile Specialists. Receive daily bookings direct to site.
              </p>
              <div className="flex items-center gap-2 mt-2 text-[10px] font-semibold text-brand-400">
                <span>Earn ₹800 - ₹2,500/Day</span>
                <span>•</span>
                <span>Instant Payouts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rider / Transporter Card */}
        <div
          onClick={() => router.push('/partner/register?type=Rider')}
          className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/80 transition-all cursor-pointer group active:scale-98 shadow-md"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6 stroke-[2]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                  Delivery Rider & Fleet Driver
                </h3>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                For Crane Trucks, 14-Wheelers, Tata 407 & Tempo owners. Deliver marble slab crates from quarries to sites.
              </p>
              <div className="flex items-center gap-2 mt-2 text-[10px] font-semibold text-blue-400">
                <span>Per Trip Freight ₹1,500 - ₹6,000</span>
                <span>•</span>
                <span>Daily Trips</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Highlights */}
      <div className="px-6 py-4 grid grid-cols-3 gap-2 text-center relative z-10 border-t border-slate-800/60 mt-2">
        <div className="p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="text-sm font-black text-white">500+</div>
          <div className="text-[9.5px] text-slate-400">Active Partners</div>
        </div>
        <div className="p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="text-sm font-black text-emerald-400">100%</div>
          <div className="text-[9.5px] text-slate-400">Direct Payment</div>
        </div>
        <div className="p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="text-sm font-black text-brand-400">AWS Cloud</div>
          <div className="text-[9.5px] text-slate-400">Verified KYC</div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-5 bg-slate-950/80 backdrop-blur-md border-t border-slate-800 relative z-20 space-y-2.5">
        <button
          onClick={() => router.push('/partner/register')}
          className="w-full py-3.5 px-4 bg-brand-500 hover:bg-brand-600 active:scale-98 text-white rounded-xl font-black text-xs transition shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
        >
          <span>Register as New Partner</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => router.push('/partner/login')}
          className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-200 rounded-xl font-bold text-xs transition border border-slate-700 flex items-center justify-center gap-2"
        >
          <span>Already Registered? Partner Login</span>
        </button>
      </div>
    </div>
  );
}
