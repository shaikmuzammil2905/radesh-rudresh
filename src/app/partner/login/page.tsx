'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Truck,
  ArrowLeft,
  Lock,
  Phone,
  ArrowRight,
  Loader2,
  AlertCircle,
  HardHat,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function PartnerLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e?: React.FormEvent, customPhone?: string, customPass?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const loginPhone = customPhone || phone;
    const loginPass = customPass || password;

    try {
      const res = await fetch('/api/partner/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: loginPhone, password: loginPass }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('rr_partner_session', JSON.stringify(data.partner));
      }

      router.push('/partner/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Login error');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (role: 'Worker' | 'Rider') => {
    if (role === 'Worker') {
      setPhone('+91 98491 11222');
      setPassword('password123');
      handleLogin(undefined, '+91 98491 11222', 'password123');
    } else {
      setPhone('+91 99882 33445');
      setPassword('password123');
      handleLogin(undefined, '+91 99882 33445', 'password123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between max-w-md mx-auto p-5 relative shadow-2xl selection:bg-brand-500 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-10 -right-10 w-72 h-72 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between relative z-10">
        <button
          onClick={() => router.push('/partner')}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider">
          Partner Access
        </span>
      </div>

      {/* Middle Form Area */}
      <div className="space-y-6 relative z-10 py-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-brand-500 to-pink-500 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <HardHat className="w-7 h-7 text-brand-400" />
            </div>
          </div>
          <h1 className="text-xl font-black text-white">Partner Sign In</h1>
          <p className="text-xs text-slate-400">
            Access your active jobs, site dispatches, and daily earnings.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Registered Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98490 00000"
                className="w-full pl-10 pr-3 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-hidden focus:border-brand-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password / Security PIN</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-hidden focus:border-brand-500 transition"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-brand-500 hover:bg-brand-600 active:scale-98 text-white rounded-xl font-bold text-xs transition shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>

        {/* Quick Demo Logins for Testing */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
            Instant Demo Sign-In
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount('Worker')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-left active:scale-95 transition"
            >
              <div className="text-[11px] font-bold text-brand-300 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>Ramesh (Artisan)</span>
              </div>
              <div className="text-[9.5px] text-slate-400">Master Marble Fitter</div>
            </button>

            <button
              type="button"
              onClick={() => fillDemoAccount('Rider')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-left active:scale-95 transition"
            >
              <div className="text-[11px] font-bold text-blue-300 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>Syed Imran (Rider)</span>
              </div>
              <div className="text-[9.5px] text-slate-400">Crane Truck Fleet</div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Switch to Register */}
      <div className="text-center py-2 relative z-10">
        <p className="text-xs text-slate-400">
          Not a registered partner yet?{' '}
          <button
            onClick={() => router.push('/partner/register')}
            className="font-bold text-brand-400 hover:underline"
          >
            Apply to Join
          </button>
        </p>
      </div>
    </div>
  );
}
