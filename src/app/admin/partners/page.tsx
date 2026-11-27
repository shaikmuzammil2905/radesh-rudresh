'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Truck,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  ExternalLink,
  Phone,
  MapPin,
  Check,
  Power,
  RefreshCw,
  HardHat,
  Cloud,
  FileText
} from 'lucide-react';
import { Partner, PartnerType } from '@/types';

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Worker' | 'Rider'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Suspended'>('All');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cms/partners');
      const data = await res.json();
      if (data.success && data.partners) {
        setPartners(data.partners);
      }
    } catch (err) {
      console.error('Error fetching partners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    newStatus: 'Pending' | 'Approved' | 'Suspended',
    verified?: boolean
  ) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/cms/partners', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, verified }),
      });
      const data = await res.json();
      if (data.success) {
        setPartners((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  status: newStatus,
                  verified: verified !== undefined ? verified : p.verified,
                }
              : p
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredPartners = partners.filter((p) => {
    const matchType = filterType === 'All' || p.type === filterType;
    const matchStatus = filterStatus === 'All' || p.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.vehicleNumber && p.vehicleNumber.toLowerCase().includes(q)) ||
      (p.serviceArea && p.serviceArea.toLowerCase().includes(q));

    return matchType && matchStatus && matchSearch;
  });

  const workerCount = partners.filter((p) => p.type === 'Worker').length;
  const riderCount = partners.filter((p) => p.type === 'Rider').length;
  const pendingCount = partners.filter((p) => p.status === 'Pending').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-gray-900 tracking-tight">
              Partners & Logistics Fleet
            </h1>
            <span className="text-xs bg-slate-900 text-white font-bold px-2.5 py-0.5 rounded-full">
              {partners.length} Total
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Manage registered skilled artisans (masons, fitters, polishers) and delivery fleet drivers. Approve AWS S3 KYC verification documents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchPartners}
            className="p-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-600 transition shadow-2xs"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <a
            href="/partner"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Partner Portal</span>
          </a>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Skilled Artisans</span>
            <div className="text-2xl font-black text-gray-900 mt-1">{workerCount}</div>
            <span className="text-[10.5px] text-brand-600 font-semibold">Masons, Fitters & Polishers</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-pink-50 text-brand-500 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Logistics Riders</span>
            <div className="text-2xl font-black text-gray-900 mt-1">{riderCount}</div>
            <span className="text-[10.5px] text-blue-600 font-semibold">Crane Trucks & Tempos</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Pending Approvals</span>
            <div className="text-2xl font-black text-amber-600 mt-1">{pendingCount}</div>
            <span className="text-[10.5px] text-amber-600 font-semibold">Requires KYC Check</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, trade, plate number..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
            />
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(['All', 'Worker', 'Rider'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filterType === t
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {t === 'All' ? 'All Partners' : t === 'Worker' ? 'Workers only' : 'Riders only'}
              </button>
            ))}

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending Review</option>
              <option value="Approved">Approved</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Partners Table */}
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-4">Partner</th>
                <th className="py-3 px-3">Role & Trade / Vehicle</th>
                <th className="py-3 px-3">Location & Service Hub</th>
                <th className="py-3 px-3">Rates / Capacity</th>
                <th className="py-3 px-3">Duty & KYC</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    No partners found matching the current search criteria.
                  </td>
                </tr>
              ) : (
                filteredPartners.map((p) => {
                  const isUpdating = updatingId === p.id;
                  const isWorker = p.type === 'Worker';

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition">
                      {/* Partner Identity */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.photo}
                            alt={p.name}
                            className="w-10 h-10 rounded-xl object-cover border border-gray-200 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-gray-900 flex items-center gap-1.5">
                              <span>{p.name}</span>
                              {p.verified && (
                                <span title="Verified KYC">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              <span>{p.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role & Trade / Vehicle */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-md mb-1 ${
                            isWorker
                              ? 'bg-pink-50 text-brand-600 border border-brand-200/50'
                              : 'bg-blue-50 text-blue-600 border border-blue-200/50'
                          }`}
                        >
                          {p.type}
                        </span>
                        <div className="font-semibold text-gray-800">
                          {isWorker ? p.category : p.vehicleType}
                        </div>
                        <div className="text-[10.5px] text-gray-500">
                          {isWorker ? p.skill : p.vehicleNumber}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-3">
                        <div className="text-gray-800 font-medium">{p.city}</div>
                        <div className="text-[10.5px] text-gray-400 line-clamp-1 max-w-[150px]">
                          {p.serviceArea}
                        </div>
                      </td>

                      {/* Rates / Capacity */}
                      <td className="py-3 px-3">
                        {isWorker ? (
                          <>
                            <div className="font-bold text-brand-600">₹{p.ratePerDay}/Day</div>
                            <div className="text-[10px] text-gray-400">₹{p.ratePerHour}/Hr • {p.experienceYears}y exp</div>
                          </>
                        ) : (
                          <>
                            <div className="font-bold text-blue-600">{p.maxCapacityTons} Tons Payload</div>
                            <div className="text-[10px] text-gray-400">DL: {p.drivingLicenseNumber || 'Verified'}</div>
                          </>
                        )}
                      </td>

                      {/* Duty & KYC */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              p.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'
                            }`}
                          />
                          <span className={`text-[10.5px] font-bold ${p.isOnline ? 'text-emerald-700' : 'text-gray-400'}`}>
                            {p.isOnline ? 'On Duty' : 'Offline'}
                          </span>
                        </div>

                        {p.idProofUrl ? (
                          <a
                            href={p.idProofUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-brand-600 hover:underline font-semibold"
                          >
                            <Cloud className="w-3 h-3 text-brand-500" />
                            <span>View S3 KYC Document</span>
                          </a>
                        ) : (
                          <span className="text-[10px] text-gray-400">No doc uploaded</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                            p.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : p.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {p.status !== 'Approved' ? (
                            <button
                              onClick={() => handleUpdateStatus(p.id, 'Approved', true)}
                              disabled={isUpdating}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10.5px] font-bold transition shadow-xs flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateStatus(p.id, 'Suspended', false)}
                              disabled={isUpdating}
                              className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[10.5px] font-bold transition"
                            >
                              Suspend
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
