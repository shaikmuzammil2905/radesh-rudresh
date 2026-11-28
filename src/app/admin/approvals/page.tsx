'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Store,
  Users,
  PackageCheck,
  Percent,
  Search,
  Filter,
  AlertTriangle,
  RefreshCw,
  Eye,
  Check,
  X,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Vendor, Partner, Product } from '@/types';

export default function ApprovalsAdminPage() {
  const [activeTab, setActiveTab] = useState<'vendors' | 'workers' | 'products'>('vendors');
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [workers, setWorkers] = useState<Partner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cms/stats');
      if (res.ok) {
        const data = await res.json();
        if (data.vendorApprovals) setVendors(data.vendorApprovals);
        if (data.workerApprovals) setWorkers(data.workerApprovals);
        if (data.products) {
          setProducts(data.products.filter((p: Product) => p.approvalStatus === 'Pending'));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVendorAction = async (id: string, action: 'Approved' | 'Rejected') => {
    try {
      const res = await fetch('/api/cms/vendors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: action === 'Approved' ? 'Active' : 'Rejected', kycStatus: action }),
      });
      if (res.ok) {
        setVendors((prev) => prev.filter((v) => v.id !== id));
      }
    } catch {
      alert('Failed to update vendor');
    }
  };

  const handleWorkerAction = async (id: string, action: 'Approved' | 'Rejected') => {
    try {
      const res = await fetch('/api/cms/partners', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: action }),
      });
      if (res.ok) {
        setWorkers((prev) => prev.filter((w) => w.id !== id));
      }
    } catch {
      alert('Failed to update worker');
    }
  };

  const handleProductApprove = async (p: Product) => {
    try {
      const res = await fetch('/api/cms/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...p, approvalStatus: 'Approved', published: true }),
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((item) => item.id !== p.id));
      }
    } catch {
      alert('Failed to approve product');
    }
  };

  const totalPending = vendors.length + workers.length + products.length;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader
        title="Centralized Approvals Hub"
        breadcrumbs={[{ label: 'Approvals' }]}
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        {/* Hub Header & Tabs */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-500" />
              <span>Pending Platform Submissions</span>
              <span className="bg-brand-50 text-brand-600 font-bold px-2.5 py-0.5 rounded-full text-xs">
                {totalPending} Awaiting Decision
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Review marble vendors, artisan applications, and new product catalog listings before publication.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-bold text-gray-600 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('vendors')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'vendors' ? 'bg-white text-gray-900 shadow-xs' : 'hover:text-gray-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Vendors ({vendors.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('workers')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'workers' ? 'bg-white text-gray-900 shadow-xs' : 'hover:text-gray-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Workers ({workers.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'products' ? 'bg-white text-gray-900 shadow-xs' : 'hover:text-gray-900'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Products ({products.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Vendor Approvals */}
        {activeTab === 'vendors' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Vendor KYC Verification Requests</span>
              <button onClick={loadData} className="text-xs font-bold text-brand-500 flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>
            {vendors.length === 0 ? (
              <div className="py-16 text-center text-xs text-gray-400">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400 mb-2" />
                No vendor onboarding applications currently pending.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {vendors.map((v) => (
                  <div key={v.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-sm">{v.businessName}</h4>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          KYC Submitted
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        <span>Owner: <strong className="text-gray-800">{v.name}</strong></span>
                        <span>Phone: <strong className="text-gray-800">{v.phone}</strong></span>
                        <span>Location: <strong className="text-gray-800">{v.city ? `${v.city}, ${v.state || 'Rajasthan'}` : v.location || 'Rajasthan'}</strong></span>
                        <span>GST: <strong className="text-gray-800 font-mono">{v.gstNumber || 'Pending'}</strong></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVendorAction(v.id, 'Approved')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Activate Shop</span>
                      </button>
                      <button
                        onClick={() => handleVendorAction(v.id, 'Rejected')}
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Worker Approvals */}
        {activeTab === 'workers' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Artisan & Contractor Registrations</span>
              <button onClick={loadData} className="text-xs font-bold text-brand-500 flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>
            {workers.length === 0 ? (
              <div className="py-16 text-center text-xs text-gray-400">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400 mb-2" />
                No artisan applications currently pending.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {workers.map((w) => (
                  <div key={w.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-sm">{w.name}</h4>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                          {w.serviceCategory || w.role}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        <span>Phone: <strong className="text-gray-800">{w.phone}</strong></span>
                        <span>City: <strong className="text-gray-800">{w.city}</strong></span>
                        <span>Daily Rate: <strong className="text-gray-900">₹{w.dailyRate}/day</strong></span>
                        <span>Experience: <strong className="text-gray-800">{w.experienceYears} Years</strong></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleWorkerAction(w.id, 'Approved')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & List</span>
                      </button>
                      <button
                        onClick={() => handleWorkerAction(w.id, 'Rejected')}
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Product Approvals */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Vendor Submitted Marble Listings</span>
              <button onClick={loadData} className="text-xs font-bold text-brand-500 flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>
            {products.length === 0 ? (
              <div className="py-16 text-center text-xs text-gray-400">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400 mb-2" />
                All vendor product listings have been reviewed and published.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {products.map((p) => (
                  <div key={p.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border" />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{p.name}</h4>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Vendor: <strong className="text-gray-800">{p.vendorName || 'Quarry Partner'}</strong> • Base: ₹{p.vendorBasePrice || p.pricePerSqFt} + Margin {p.commissionPercent || 10}% = Final: <strong className="text-brand-600">₹{p.pricePerSqFt}/Sq.ft</strong>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleProductApprove(p)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Publish to Customer App</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
