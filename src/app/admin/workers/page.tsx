'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Check,
  X,
  MapPin,
  Briefcase,
  Star,
  RefreshCw,
  Phone,
  Shield,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Partner } from '@/types';

export default function WorkersAdminPage() {
  const [workers, setWorkers] = useState<Partner[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const loadWorkers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cms/partners');
      if (res.ok) {
        const data = await res.json();
        const list: Partner[] = Array.isArray(data) ? data : (data.partners || []);
        // Filter only worker/artisan type
        setWorkers(list.filter((p: Partner) => p.type === 'Worker' || (p as any).type === 'artisan' || p.role === 'artisan'));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkers();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'Approved' | 'Rejected' | 'Pending') => {
    try {
      const res = await fetch('/api/cms/partners', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        loadWorkers();
      }
    } catch {
      alert('Failed to update worker status');
    }
  };

  const filtered = workers.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.phone.includes(search) ||
      w.city.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || w.serviceCategory === categoryFilter;
    const matchesStatus = statusFilter === 'All' || w.status === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader
        title="Master Artisans & Stone Contractors"
        breadcrumbs={[{ label: 'Workers' }]}
        onSearch={setSearch}
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs">
          <div>
            <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Worker & Artisan Roster ({workers.length})</span>
            </h2>
            <p className="text-xs text-gray-500">
              Contractor onboarding, verification, daily rate control and live customer bookings.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none"
            >
              <option value="All">All Trades</option>
              <option value="Italian Marble Specialist">Italian Marble</option>
              <option value="Diamond Polishing Master">Polishing Master</option>
              <option value="Stone CNC Carving Artisan">CNC Carving</option>
              <option value="Granite Countertop Installer">Countertop Installer</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              onClick={loadWorkers}
              className="p-2 text-gray-500 hover:text-gray-900 bg-gray-50 border border-gray-200 rounded-xl"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Worker Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Artisan Name</th>
                  <th className="py-3 px-4 font-bold">Specialty Trade</th>
                  <th className="py-3 px-4 font-bold">Location</th>
                  <th className="py-3 px-4 font-bold">Daily Wage / Rate</th>
                  <th className="py-3 px-4 font-bold">Experience</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No artisan workers match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((w) => (
                    <tr key={w.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={w.photo || '/assets/artisan_1.png'}
                            alt={w.name}
                            className="w-9 h-9 rounded-full object-cover border"
                          />
                          <div>
                            <div className="font-bold text-gray-900">{w.name}</div>
                            <div className="text-[10px] text-gray-400">{w.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold text-[10.5px]">
                          {w.serviceCategory || w.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">{w.city}</td>
                      <td className="py-3.5 px-4 font-black text-gray-900">₹{w.dailyRate}/day</td>
                      <td className="py-3.5 px-4 text-gray-700 font-semibold">{w.experienceYears} Years</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            w.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700'
                              : w.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {w.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        {w.status === 'Pending' && (
                          <button
                            onClick={() => handleUpdateStatus(w.id, 'Approved')}
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-bold"
                            title="Approve Worker"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {w.status === 'Approved' ? (
                          <button
                            onClick={() => handleUpdateStatus(w.id, 'Rejected')}
                            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[10.5px] font-bold"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateStatus(w.id, 'Approved')}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[10.5px] font-bold"
                          >
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
