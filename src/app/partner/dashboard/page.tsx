'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Truck,
  Power,
  MapPin,
  Calendar,
  Clock,
  Phone,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Star,
  ExternalLink,
  ChevronRight,
  LogOut,
  Navigation,
  HardHat,
  FileText,
  AlertCircle,
  PackageCheck,
  Layers,
  ArrowRight,
  Sparkles,
  CreditCard
} from 'lucide-react';
import { Partner } from '@/types';

export default function PartnerDashboardPage() {
  const router = useRouter();

  const [partner, setPartner] = useState<Partner | null>(null);
  const [activeTab, setActiveTab] = useState<'jobs' | 'earnings' | 'profile'>('jobs');
  const [isOnline, setIsOnline] = useState(true);
  const [togglingDuty, setTogglingDuty] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  // Load partner from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('rr_partner_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setPartner(parsed);
          setIsOnline(parsed.isOnline ?? true);
        } catch (e) {
          console.error(e);
        }
      } else {
        // Fallback default demo partner if none stored
        const demo: Partner = {
          id: 'partner-w1',
          type: 'Worker',
          name: 'Ramesh Kumar',
          phone: '+91 98491 11222',
          email: 'ramesh.kumar@radheshrudresh.com',
          city: 'Hyderabad',
          serviceArea: 'Jubilee Hills, Banjara Hills',
          photo: '/assets/artisan_1.png',
          verified: true,
          isOnline: true,
          status: 'Approved',
          rating: 4.9,
          completedJobs: 142,
          totalEarnings: 120700,
          createdAt: '2026-01-10T10:00:00.000Z',
          category: 'Marble Fitter',
          skill: 'Italian Marble Laying & Inlay Work',
          ratePerDay: 850,
          ratePerHour: 150,
          experienceYears: 12,
        };
        setPartner(demo);
        localStorage.setItem('rr_partner_session', JSON.stringify(demo));
      }
    }
  }, []);

  // Fetch jobs for this partner
  const fetchJobs = async (partnerData: Partner) => {
    setLoadingJobs(true);
    try {
      const res = await fetch(`/api/partner/jobs?partnerId=${partnerData.id}&type=${partnerData.type}`);
      const data = await res.json();
      if (data.success && data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error('Error fetching partner jobs:', err);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    if (partner) {
      fetchJobs(partner);
    }
  }, [partner?.id, partner?.type]);

  const handleToggleDuty = async () => {
    if (!partner) return;
    setTogglingDuty(true);
    const newStatus = !isOnline;

    try {
      const res = await fetch('/api/partner/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: partner.id, isOnline: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setIsOnline(newStatus);
        const updated = { ...partner, isOnline: newStatus };
        setPartner(updated);
        localStorage.setItem('rr_partner_session', JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingDuty(false);
    }
  };

  const handleUpdateJobStatus = async (jobId: string, newStatus: string) => {
    if (!partner) return;
    try {
      const res = await fetch('/api/partner/jobs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, newStatus, partnerType: partner.type }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh local job list
        setJobs((prev) =>
          prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rr_partner_session');
    }
    router.push('/partner');
  };

  if (!partner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="text-xs">Loading partner workplace...</p>
      </div>
    );
  }

  const isWorker = partner.type === 'Worker';

  return (
    <div className="min-h-screen bg-slate-100 text-gray-900 pb-24 max-w-md mx-auto shadow-2xl relative select-none">
      {/* Top Header App Bar */}
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between">
          {/* Partner Info */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-800 border-2 border-slate-700 shrink-0">
              <img src={partner.photo} alt={partner.name} className="w-full h-full object-cover" />
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-xs text-white line-clamp-1">{partner.name}</h2>
                {partner.verified && (
                  <span title="Verified KYC">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                {isWorker ? partner.category : partner.vehicleType} • {partner.serviceArea.split(',')[0]}
              </p>
            </div>
          </div>

          {/* Live Duty Toggle Button */}
          <button
            onClick={handleToggleDuty}
            disabled={togglingDuty}
            className={`px-3 py-1.5 rounded-full text-[11px] font-black transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              isOnline
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white ring-2 ring-emerald-400/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isOnline ? 'ON DUTY' : 'OFFLINE'}</span>
          </button>
        </div>
      </div>

      {/* Online Status Alert Banner */}
      {!isOnline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-[11px] font-bold flex items-center justify-between">
          <span>You are currently OFFLINE. Switch ON DUTY to receive live jobs.</span>
          <button
            onClick={handleToggleDuty}
            className="px-2 py-0.5 bg-slate-950 text-white rounded text-[10px]"
          >
            Go Online
          </button>
        </div>
      )}

      {/* Quick KPI Dashboard Cards */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">Today's Earnings</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-lg font-black text-gray-900">
              ₹{(isWorker ? 1700 : 3800).toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>Direct Bank Settlement</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {isWorker ? 'Active Shift' : 'Trips Done'}
              </span>
              <HardHat className="w-4 h-4 text-brand-500" />
            </div>
            <div className="text-lg font-black text-gray-900">
              {jobs.length} <span className="text-xs font-normal text-gray-500">Tasks</span>
            </div>
            <div className="text-[10px] text-amber-500 font-semibold flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{partner.rating} Rating ({partner.completedJobs} jobs)</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Segmented Bar */}
        <div className="bg-slate-200/80 p-1 rounded-xl flex text-xs font-bold">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'jobs'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {isWorker ? 'Site Bookings' : 'Dispatches'} ({jobs.length})
          </button>

          <button
            onClick={() => setActiveTab('earnings')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'earnings'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Earnings
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Profile & KYC
          </button>
        </div>

        {/* TAB 1: JOBS / DISPATCHES */}
        {activeTab === 'jobs' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500 px-1">
              <span className="font-bold">Live Job Queue</span>
              <span>GPS Locality: Hyderabad</span>
            </div>

            {loadingJobs ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 text-xs text-gray-500">
                Loading available tasks...
              </div>
            ) : jobs.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-xs text-gray-900">All caught up!</h4>
                <p className="text-[11px] text-gray-500">
                  Stay ON DUTY. You will be alerted as soon as a new site requires your services.
                </p>
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3"
                >
                  {/* Job Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                        {job.id}
                      </span>
                      <h4 className="font-bold text-xs text-gray-900 mt-1">{job.type}</h4>
                    </div>

                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        job.status === 'Completed' || job.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : job.status === 'In Progress' || job.status === 'Dispatched'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  {/* Route & Address Info */}
                  <div className="space-y-1.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200/80">
                    {job.pickupLocation && (
                      <div className="flex items-start gap-2">
                        <PackageCheck className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 block uppercase">Pickup Quarry Depot</span>
                          <span className="font-semibold text-gray-800">{job.pickupLocation}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2 pt-1 border-t border-gray-200/60">
                      <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block uppercase">Destination Site</span>
                        <span className="font-semibold text-gray-800">
                          {job.siteAddress || job.deliveryAddress}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-200/60 text-[11px]">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{job.date || job.timeSlot}</span>
                      </span>
                      <span className="font-bold text-gray-900">
                        Customer: {job.customerName}
                      </span>
                    </div>
                  </div>

                  {/* Rate & Settlement */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">Estimated Payout</span>
                      <span className="text-base font-black text-brand-600">
                        ₹{job.totalAmount?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          job.siteAddress || job.deliveryAddress
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 flex items-center gap-1 text-[11px] font-bold"
                        title="Open in Google Maps"
                      >
                        <Navigation className="w-3.5 h-3.5 text-brand-500" />
                        <span>Navigate</span>
                      </a>

                      <a
                        href={`tel:${job.customerPhone}`}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Status Action Buttons */}
                  <div className="pt-2 border-t border-gray-100">
                    {job.status === 'Requested' || job.status === 'Placed' ? (
                      <button
                        onClick={() => handleUpdateJobStatus(job.id, isWorker ? 'Accepted' : 'Confirmed')}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accept Job Request</span>
                      </button>
                    ) : job.status === 'Accepted' || job.status === 'Confirmed' ? (
                      <button
                        onClick={() =>
                          handleUpdateJobStatus(job.id, isWorker ? 'In Progress' : 'Dispatched')
                        }
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>{isWorker ? 'Start Job on Site' : 'Loaded & Dispatched'}</span>
                      </button>
                    ) : job.status === 'In Progress' || job.status === 'Dispatched' ? (
                      <button
                        onClick={() =>
                          handleUpdateJobStatus(job.id, isWorker ? 'Completed' : 'Delivered')
                        }
                        className="w-full py-2 bg-brand-500 hover:bg-brand-600 active:scale-98 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                      >
                        <PackageCheck className="w-3.5 h-3.5" />
                        <span>{isWorker ? 'Complete Job & Collect Cash' : 'Mark as Delivered'}</span>
                      </button>
                    ) : (
                      <div className="text-center py-1 text-[11px] font-bold text-emerald-600 flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Job Completed & Settled</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: EARNINGS & PAYOUTS */}
        {activeTab === 'earnings' && (
          <div className="space-y-3">
            <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Total Lifetime Earnings
              </span>
              <div className="text-3xl font-black text-brand-400">
                ₹{partner.totalEarnings.toLocaleString()}
              </div>

              <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">Weekly Balance</span>
                  <span className="font-bold text-white">₹14,200</span>
                </div>
                <button
                  onClick={() => alert('Payout request sent to Radhesh & Rudresh accounts department. Settlement scheduled within 24 hours.')}
                  className="px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95"
                >
                  Withdraw to Bank
                </button>
              </div>
            </div>

            {/* Payment Highlights */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
              <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">
                Recent Settlements
              </h4>

              <div className="space-y-2">
                {[
                  { id: 'TXN-98421', date: '26 Nov 2026', amount: 850, desc: 'Tile Fitting Day Shift (Jubilee Hills)' },
                  { id: 'TXN-98420', date: '25 Nov 2026', amount: 850, desc: 'Statuario Marble Edge Polishing' },
                  { id: 'TXN-98418', date: '24 Nov 2026', amount: 1700, desc: 'Bungalow Flooring (2 Days Advance)' },
                ].map((txn) => (
                  <div key={txn.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-gray-900 block">{txn.desc}</span>
                      <span className="text-[10px] text-gray-400">{txn.id} • {txn.date}</span>
                    </div>
                    <span className="font-black text-emerald-600">+₹{txn.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE & KYC */}
        {activeTab === 'profile' && (
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <img src={partner.photo} alt={partner.name} className="w-14 h-14 rounded-xl object-cover border" />
              <div>
                <h3 className="font-bold text-sm text-gray-900">{partner.name}</h3>
                <p className="text-xs text-brand-600 font-semibold">{partner.type} Partner</p>
                <div className="text-[10px] text-gray-400 mt-0.5">Joined {new Date(partner.createdAt).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Phone</span>
                <span className="font-bold text-gray-800">{partner.phone}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Operating City</span>
                <span className="font-bold text-gray-800">{partner.city}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Service Coverage</span>
                <span className="font-bold text-gray-800">{partner.serviceArea}</span>
              </div>
              {isWorker ? (
                <>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Trade Skill</span>
                    <span className="font-bold text-gray-800">{partner.skill}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Base Daily Rate</span>
                    <span className="font-bold text-brand-500">₹{partner.ratePerDay}/Day</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Vehicle Type</span>
                    <span className="font-bold text-gray-800">{partner.vehicleType}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Vehicle Number</span>
                    <span className="font-bold text-gray-800">{partner.vehicleNumber}</span>
                  </div>
                </>
              )}
            </div>

            {/* AWS S3 Document Badge */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>KYC Verification Status: {partner.status}</span>
              </div>
              <p className="text-[10.5px] text-emerald-700">
                Your Aadhar / Driving License is stored in AWS S3 (Hyderabad bucket: <code>rudra-infra</code>) and approved by Radhesh & Rudresh compliance.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Partner Portal</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Switch */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-200 p-2 z-40 shadow-lg flex justify-around text-[10.5px] font-bold">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`py-1.5 px-4 rounded-xl flex flex-col items-center gap-1 ${
            activeTab === 'jobs' ? 'text-brand-500' : 'text-gray-500'
          }`}
        >
          <HardHat className="w-4 h-4" />
          <span>Tasks</span>
        </button>

        <button
          onClick={() => setActiveTab('earnings')}
          className={`py-1.5 px-4 rounded-xl flex flex-col items-center gap-1 ${
            activeTab === 'earnings' ? 'text-brand-500' : 'text-gray-500'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Earnings</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`py-1.5 px-4 rounded-xl flex flex-col items-center gap-1 ${
            activeTab === 'profile' ? 'text-brand-500' : 'text-gray-500'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Profile</span>
        </button>

        <button
          onClick={() => router.push('/')}
          className="py-1.5 px-4 rounded-xl flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Store</span>
        </button>
      </div>
    </div>
  );
}
