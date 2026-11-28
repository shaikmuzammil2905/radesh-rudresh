'use client';

import React, { useState, useEffect } from 'react';
import {
  Store,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Building,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Edit,
  DollarSign,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Vendor } from '@/types';

export default function VendorsAdminPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cms/vendors');
      if (res.ok) {
        const data = await res.json();
        setVendors(Array.isArray(data) ? data : (data.vendors || []));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'Active' | 'Suspended' | 'Pending' | 'Rejected', kycStatus?: 'Approved' | 'Pending' | 'Rejected') => {
    try {
      const res = await fetch('/api/cms/vendors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, kycStatus }),
      });
      if (res.ok) {
        loadVendors();
        if (selectedVendor && selectedVendor.id === id) {
          setSelectedVendor((prev) => (prev ? { ...prev, status, kycStatus: kycStatus || prev.kycStatus } : null));
        }
      }
    } catch {
      alert('Failed to update vendor');
    }
  };

  const filteredVendors = (vendors || []).filter((v) => {
    if (!v) return false;
    const name = v.name || '';
    const biz = v.businessName || '';
    const ph = v.phone || '';
    const city = v.city || '';
    const loc = v.location || '';
    const q = search.toLowerCase();

    const matchesSearch =
      biz.toLowerCase().includes(q) ||
      name.toLowerCase().includes(q) ||
      ph.includes(search) ||
      city.toLowerCase().includes(q) ||
      loc.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter || v.kycStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader
        title="Marble Vendors & Quarry Partners"
        breadcrumbs={[{ label: 'Vendors' }]}
        onSearch={setSearch}
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        {/* Header Stats & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs">
          <div>
            <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <Store className="w-4 h-4 text-brand-500" />
              <span>Vendor Registry ({vendors.length})</span>
            </h2>
            <p className="text-xs text-gray-500">
              Manage quarry partners, KYC approvals, product commissions and payouts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending KYC</option>
              <option value="Suspended">Suspended</option>
            </select>
            <button
              onClick={loadVendors}
              className="p-2 text-gray-500 hover:text-gray-900 bg-gray-50 border border-gray-200 rounded-xl"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Vendors Grid / Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Business & Owner</th>
                  <th className="py-3 px-4 font-bold">Location</th>
                  <th className="py-3 px-4 font-bold">GST & KYC</th>
                  <th className="py-3 px-4 font-bold">Commission</th>
                  <th className="py-3 px-4 font-bold">Sales Volume</th>
                  <th className="py-3 px-4 font-bold">Account Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredVendors.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No marble vendors match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredVendors.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900">{v.businessName}</div>
                        <div className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                          <span>{v.name}</span>
                          <span>•</span>
                          <span>{v.phone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        <div className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{v.city ? `${v.city}, ${v.state || 'Rajasthan'}` : v.location || 'Rajasthan'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-[10.5px] font-bold text-gray-700">
                          {v.gstNumber || 'GST Pending'}
                        </div>
                        <span
                          className={`inline-block mt-0.5 px-2 py-0.5 text-[9.5px] font-bold rounded-full ${
                            v.kycStatus === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700'
                              : v.kycStatus === 'Pending'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          KYC {v.kycStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-brand-600 bg-pink-50 px-2 py-0.5 rounded-md text-[11px]">
                          {v.commissionRate}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-black text-gray-900">
                        ₹{(v.totalSales || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            v.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : v.status === 'Suspended'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedVendor(v)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-[11px] transition"
                        >
                          Profile & KYC
                        </button>
                        {v.kycStatus === 'Pending' && (
                          <button
                            onClick={() => handleUpdateStatus(v.id, 'Active', 'Approved')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition"
                          >
                            Approve
                          </button>
                        )}
                        {v.status === 'Active' ? (
                          <button
                            onClick={() => handleUpdateStatus(v.id, 'Suspended')}
                            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg text-[11px] transition"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateStatus(v.id, 'Active', 'Approved')}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[11px] transition"
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

      {/* VENDOR DETAIL & KYC DRAWER / MODAL */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">{selectedVendor.businessName}</h3>
                <p className="text-xs text-gray-500">Vendor ID: {selectedVendor.id}</p>
              </div>
              <button
                onClick={() => setSelectedVendor(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-gray-400 block">Owner Name:</span>
                  <span className="font-bold text-gray-900">{selectedVendor.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Contact Phone:</span>
                  <span className="font-bold text-gray-900">{selectedVendor.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Email Address:</span>
                  <span className="font-bold text-gray-900">{selectedVendor.email || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Location:</span>
                  <span className="font-bold text-gray-900">{selectedVendor.city ? `${selectedVendor.city}, ${selectedVendor.state || 'Rajasthan'}` : selectedVendor.location || 'Rajasthan'}</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-1.5">
                <span className="text-gray-400 block uppercase font-bold text-[10px]">KYC & Compliance</span>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST Registration:</span>
                  <span className="font-mono font-bold text-gray-900">{selectedVendor.gstNumber || 'Not submitted'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verification Status:</span>
                  <span className="font-bold text-emerald-600">{selectedVendor.kycStatus}</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-1.5">
                <span className="text-gray-400 block uppercase font-bold text-[10px]">Financials & Wallet</span>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Lifetime Sales:</span>
                  <span className="font-black text-gray-900">₹{(selectedVendor.totalSales || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Commission Rate:</span>
                  <span className="font-bold text-brand-600">{selectedVendor.commissionRate}%</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedVendor(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs"
              >
                Close
              </button>
              {selectedVendor.kycStatus === 'Pending' && (
                <button
                  onClick={() => handleUpdateStatus(selectedVendor.id, 'Active', 'Approved')}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Approve KYC & Activate
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
