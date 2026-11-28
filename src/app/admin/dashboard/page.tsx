'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Store,
  Users,
  UserCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Check,
  X,
  Edit2,
  AlertCircle,
  Eye,
  RefreshCw,
  Percent,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Product, Partner, Vendor, Customer, ProductOrder } from '@/types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalSales: 2846,
    totalRevenue: 48672000,
    totalVendors: 148,
    totalCustomers: 12560,
    totalWorkers: 3428,
    pendingApprovals: 24,
    revenueChange: '+18.4%',
    salesChange: '+12.6%',
    vendorsChange: '+8.2%',
    customersChange: '+23.1%',
  });

  const [vendorApprovals, setVendorApprovals] = useState<Vendor[]>([]);
  const [workerApprovals, setWorkerApprovals] = useState<Partner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [recentOrders, setRecentOrders] = useState<ProductOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyticsTab, setAnalyticsTab] = useState<'Sales' | 'Orders' | 'Revenue'>('Sales');

  // Edit commission modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newCommissionPercent, setNewCommissionPercent] = useState<number>(10);
  const [savingProduct, setSavingProduct] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cms/stats');
      if (res.ok) {
        const data = await res.json();
        if (data.stats) setStats((prev) => ({ ...prev, ...data.stats }));
        if (data.vendorApprovals) setVendorApprovals(data.vendorApprovals);
        if (data.workerApprovals) setWorkerApprovals(data.workerApprovals);
        if (data.products) setProducts(data.products);
        if (data.recentOrders) setRecentOrders(data.recentOrders);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Quick Vendor Approve / Reject
  const handleVendorAction = async (id: string, action: 'Approved' | 'Rejected') => {
    try {
      const res = await fetch('/api/cms/vendors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: action === 'Approved' ? 'Active' : 'Rejected', kycStatus: action }),
      });
      if (res.ok) {
        setVendorApprovals((prev) => prev.filter((v) => v.id !== id));
        fetchDashboardData();
      }
    } catch (err) {
      alert('Failed to update vendor');
    }
  };

  // Quick Worker Approve / Reject
  const handleWorkerAction = async (id: string, action: 'Approved' | 'Rejected') => {
    try {
      const res = await fetch('/api/cms/partners', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: action }),
      });
      if (res.ok) {
        setWorkerApprovals((prev) => prev.filter((w) => w.id !== id));
        fetchDashboardData();
      }
    } catch (err) {
      alert('Failed to update worker');
    }
  };

  // Update Product Commission & Final Selling Price live
  const handleSaveCommission = async () => {
    if (!editingProduct) return;
    setSavingProduct(true);
    try {
      const updatedProduct = {
        ...editingProduct,
        commissionPercent: Number(newCommissionPercent),
      };
      const res = await fetch('/api/cms/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      if (res.ok) {
        setEditingProduct(null);
        fetchDashboardData();
      }
    } catch (err) {
      alert('Failed to save product pricing');
    } finally {
      setSavingProduct(false);
    }
  };

  // Quick Approve Product
  const handleApproveProduct = async (product: Product) => {
    try {
      const updatedProduct = {
        ...product,
        approvalStatus: 'Approved',
        published: true,
      };
      const res = await fetch('/api/cms/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      alert('Failed to approve product');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader title="Operations Dashboard" subtitle="Centralized marketplace analytics, approvals and pricing engine" />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        {/* TOP 6 KPI CARDS matching Reference UI (image copy 17.png) */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
          {/* Card 1: Total Sales */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">Total Sales</span>
              <div className="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center text-brand-500">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {stats.totalSales.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{stats.salesChange} vs last mo</span>
            </div>
          </div>

          {/* Card 2: Total Revenue */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">Total Revenue</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              ₹{(stats.totalRevenue / 100000).toFixed(2)}L
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{stats.revenueChange} vs last mo</span>
            </div>
          </div>

          {/* Card 3: Total Marble Vendors */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">Total Vendors</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Store className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {stats.totalVendors}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{stats.vendorsChange} active</span>
            </div>
          </div>

          {/* Card 4: Total Customers */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">Total Customers</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {stats.totalCustomers.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{stats.customersChange} growth</span>
            </div>
          </div>

          {/* Card 5: Total Workers */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">Total Workers</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {stats.totalWorkers.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-purple-600 mt-1">
              <span>Rajasthan & All India</span>
            </div>
          </div>

          {/* Card 6: Pending Approvals */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">Approvals</span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 font-bold text-xs">
                {stats.pendingApprovals}
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-rose-600 tracking-tight">
              {stats.pendingApprovals} Action Req.
            </div>
            <Link
              href="/admin/approvals"
              className="text-[11px] font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1 mt-1"
            >
              <span>Review submissions</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* ANALYTICS CHARTS ROW matching Reference UI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart: Sales & Revenue Analytics (2 Columns) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
              <div>
                <h3 className="text-sm font-black text-gray-900">Sales & Revenue Analytics</h3>
                <p className="text-xs text-gray-500">Monthly volume trends across marble orders & contractor bookings</p>
              </div>
              <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-bold text-gray-600">
                {(['Sales', 'Orders', 'Revenue'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setAnalyticsTab(tab)}
                    className={`px-3 py-1 rounded-lg transition ${
                      analyticsTab === tab ? 'bg-white text-gray-900 shadow-xs' : 'hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive SVG Bar & Line Chart matching Reference UI */}
            <div className="pt-6">
              <div className="h-60 w-full flex items-end justify-between gap-2 sm:gap-4 px-2">
                {[
                  { month: 'Jan', val: 42, rev: '₹28L' },
                  { month: 'Feb', val: 58, rev: '₹34L' },
                  { month: 'Mar', val: 75, rev: '₹48L' },
                  { month: 'Apr', val: 62, rev: '₹39L' },
                  { month: 'May', val: 88, rev: '₹55L' },
                  { month: 'Jun', val: 94, rev: '₹62L' },
                  { month: 'Jul', val: 82, rev: '₹51L' },
                  { month: 'Aug', val: 91, rev: '₹59L' },
                  { month: 'Sep', val: 105, rev: '₹71L' },
                  { month: 'Oct', val: 118, rev: '₹84L' },
                  { month: 'Nov', val: 130, rev: '₹95L' },
                  { month: 'Dec', val: 145, rev: '₹1.1Cr' },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded pointer-events-none whitespace-nowrap shadow-md z-10">
                      {item.rev} ({item.val} orders)
                    </div>
                    {/* Bar */}
                    <div className="w-full max-w-[28px] bg-slate-100 rounded-t-lg h-48 flex items-end overflow-hidden">
                      <div
                        style={{ height: `${(item.val / 145) * 100}%` }}
                        className="w-full bg-gradient-to-t from-brand-600 to-pink-500 rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-400">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                  <span className="font-semibold text-gray-700">Gross Marketplace Sales</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span>Previous Year Benchmark</span>
                </span>
              </div>
              <span className="font-bold text-emerald-600">Avg. Margin 12.8%</span>
            </div>
          </div>

          {/* Side Widget: Revenue Breakdown & Platform Commissions */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-sm font-black text-gray-900">Revenue Breakdown</h3>
                <span className="text-[11px] font-bold text-brand-600 bg-pink-50 px-2 py-0.5 rounded-full">
                  FY 2025-26
                </span>
              </div>

              <div className="space-y-4 pt-4">
                {/* Metric 1 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-600">Italian & Makrana Marble</span>
                    <span className="font-black text-gray-900">₹2,85,40,000 (58%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-brand-500 h-full rounded-full" style={{ width: '58%' }} />
                  </div>
                </div>

                {/* Metric 2 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-600">Granite & Tiles</span>
                    <span className="font-black text-gray-900">₹1,18,60,000 (24%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '24%' }} />
                  </div>
                </div>

                {/* Metric 3 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-600">Worker & Artisan Bookings</span>
                    <span className="font-black text-gray-900">₹52,72,000 (11%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: '11%' }} />
                  </div>
                </div>

                {/* Metric 4 */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-600">Crane & Transport Commissions</span>
                    <span className="font-black text-gray-900">₹30,00,000 (7%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '7%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 bg-slate-50 p-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Platform Retained Profit</span>
                <div className="text-base font-black text-gray-900">₹62,45,000</div>
              </div>
              <Link
                href="/admin/sales"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>Full Ledger</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2 APPROVAL TABLES ROW: Vendor Onboarding + Worker Onboarding */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Table 1: Vendor Onboarding Approvals */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-brand-500" />
                <h3 className="text-sm font-black text-gray-900">Vendor Approvals</h3>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                  {vendorApprovals.length} Pending
                </span>
              </div>
              <Link href="/admin/vendors" className="text-xs font-bold text-brand-500 hover:underline">
                View All Vendors
              </Link>
            </div>

            <div className="overflow-x-auto pt-3">
              {vendorApprovals.length === 0 ? (
                <div className="py-8 text-center text-xs text-gray-400">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
                  All vendor onboarding applications are reviewed.
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-100 text-[11px]">
                      <th className="pb-2 font-semibold">Vendor / Shop</th>
                      <th className="pb-2 font-semibold">Location</th>
                      <th className="pb-2 font-semibold">KYC Status</th>
                      <th className="pb-2 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {vendorApprovals.map((v) => (
                      <tr key={v.id} className="hover:bg-gray-50/70 transition">
                        <td className="py-2.5">
                          <div className="font-bold text-gray-900">{v.businessName}</div>
                          <div className="text-[10.5px] text-gray-500">{v.name} • {v.phone}</div>
                        </td>
                        <td className="py-2.5 text-gray-600">{v.city ? `${v.city}, ${v.state || 'Rajasthan'}` : v.location || 'Rajasthan'}</td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            {v.kycStatus}
                          </span>
                        </td>
                        <td className="py-2.5 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleVendorAction(v.id, 'Approved')}
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold transition"
                            title="Approve KYC & Activate Shop"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleVendorAction(v.id, 'Rejected')}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition"
                            title="Reject Application"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Table 2: Worker / Contractor Onboarding Approvals */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-black text-gray-900">Worker Approvals</h3>
                <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">
                  {workerApprovals.length} Pending
                </span>
              </div>
              <Link href="/admin/workers" className="text-xs font-bold text-brand-500 hover:underline">
                View All Workers
              </Link>
            </div>

            <div className="overflow-x-auto pt-3">
              {workerApprovals.length === 0 ? (
                <div className="py-8 text-center text-xs text-gray-400">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                  All artisan and contractor applications reviewed.
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-100 text-[11px]">
                      <th className="pb-2 font-semibold">Artisan / Contractor</th>
                      <th className="pb-2 font-semibold">Trade</th>
                      <th className="pb-2 font-semibold">Daily Rate</th>
                      <th className="pb-2 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {workerApprovals.map((w) => (
                      <tr key={w.id} className="hover:bg-gray-50/70 transition">
                        <td className="py-2.5">
                          <div className="font-bold text-gray-900">{w.name}</div>
                          <div className="text-[10.5px] text-gray-500">{w.city} • {w.phone}</div>
                        </td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-700">
                            {w.serviceCategory || w.role}
                          </span>
                        </td>
                        <td className="py-2.5 font-bold text-gray-900">₹{w.dailyRate}/day</td>
                        <td className="py-2.5 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleWorkerAction(w.id, 'Approved')}
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold transition"
                            title="Approve & List in Marketplace"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleWorkerAction(w.id, 'Rejected')}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition"
                            title="Reject Worker"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* PRICING & COMMISSION ENGINE TABLE matching Scope of Work */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-brand-500" />
                <h3 className="text-sm font-black text-gray-900">
                  Product Pricing & Commission Engine (Vendor Base + Margin = Customer Price)
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                Directly sets the final selling price customers see on the public app.
              </p>
            </div>
            <Link
              href="/admin/products"
              className="px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition self-start sm:self-auto"
            >
              + Add / Manage Products
            </Link>
          </div>

          {/* Mobile Product Pricing Cards (< md) */}
          <div className="block md:hidden divide-y divide-gray-100 pt-2">
            {products.slice(0, 6).map((p) => {
              const base = p.vendorBasePrice || p.pricePerSqFt;
              const commPct = p.commissionPercent || 10;
              const commAmt = p.commissionAmount || Math.round((base * commPct) / 100);
              const finalSelling = p.pricePerSqFt;

              return (
                <div key={p.id} className="py-3.5 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-sm truncate">{p.name}</div>
                      <div className="text-[11px] text-gray-500">
                        {p.category} &bull; {p.vendorName || 'Direct Quarry'}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[9.5px] font-bold rounded-full shrink-0 ${
                        p.published !== false && p.approvalStatus !== 'Pending'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {p.approvalStatus || 'Approved'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center">
                    <div>
                      <span className="text-[9.5px] text-gray-400 block font-semibold">BASE</span>
                      <span className="font-bold text-gray-800 text-xs">₹{base}</span>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-gray-400 block font-semibold">MARGIN</span>
                      <span className="font-bold text-emerald-600 text-xs">+{commPct}%</span>
                    </div>
                    <div>
                      <span className="text-[9.5px] text-gray-400 block font-semibold">SELLING</span>
                      <span className="font-black text-brand-600 text-xs">₹{finalSelling}/sq.ft</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setNewCommissionPercent(p.commissionPercent || 10);
                      }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition inline-flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Set Price</span>
                    </button>
                    {p.approvalStatus === 'Pending' && (
                      <button
                        onClick={() => handleApproveProduct(p)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition inline-flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Product Pricing Table (>= md) */}
          <div className="hidden md:block overflow-x-auto pt-3">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100 text-[11px]">
                  <th className="pb-2 font-semibold">Product & Category</th>
                  <th className="pb-2 font-semibold">Vendor</th>
                  <th className="pb-2 font-semibold">Vendor Base Price</th>
                  <th className="pb-2 font-semibold">Commission (%)</th>
                  <th className="pb-2 font-semibold">Commission (₹)</th>
                  <th className="pb-2 font-semibold">Customer Selling Price</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.slice(0, 6).map((p) => {
                  const base = p.vendorBasePrice || p.pricePerSqFt;
                  const commPct = p.commissionPercent || 10;
                  const commAmt = p.commissionAmount || Math.round((base * commPct) / 100);
                  const finalSelling = p.pricePerSqFt;

                  return (
                    <tr key={p.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                          />
                          <div>
                            <div className="font-bold text-gray-900">{p.name}</div>
                            <div className="text-[10px] text-gray-400">{p.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-gray-700 font-medium">
                        {p.vendorName || 'Direct Quarry'}
                      </td>
                      <td className="py-3 font-semibold text-gray-800">₹{base}/Sq.ft</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[11px]">
                          {commPct}%
                        </span>
                      </td>
                      <td className="py-3 font-bold text-emerald-600">+₹{commAmt}</td>
                      <td className="py-3">
                        <span className="text-xs font-black text-brand-600">
                          ₹{finalSelling}/Sq.ft
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            p.published !== false && p.approvalStatus !== 'Pending'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {p.approvalStatus || 'Approved'}
                        </span>
                      </td>
                      <td className="py-3 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setNewCommissionPercent(p.commissionPercent || 10);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[11px] transition inline-flex items-center gap-1"
                          title="Edit Pricing & Commission"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Set Price</span>
                        </button>
                        {p.approvalStatus === 'Pending' && (
                          <button
                            onClick={() => handleApproveProduct(p)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition inline-flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            <span>Approve</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT ORDERS / TRANSACTIONS TABLE */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-black text-gray-900">Recent Customer Orders</h3>
              <p className="text-xs text-gray-500">Live order flow with payment and dispatch tracking</p>
            </div>
            <Link href="/admin/orders" className="text-xs font-bold text-brand-500 hover:underline">
              View All Orders
            </Link>
          </div>

          {/* Mobile Orders Card List (< md) */}
          <div className="block md:hidden divide-y divide-gray-100 pt-2">
            {recentOrders.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-400">No customer orders yet.</div>
            ) : (
              recentOrders.map((ord) => (
                <div key={ord.id} className="py-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-brand-600">#{ord.id}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 text-[9.5px] font-bold rounded-full bg-emerald-50 text-emerald-700">
                        {ord.paymentStatus}
                      </span>
                      <span className="px-2 py-0.5 text-[9.5px] font-bold rounded-full bg-blue-50 text-blue-700">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-sm">{ord.customerName || ord.contactName}</span>
                    <span className="text-[10.5px] text-gray-400 block">{ord.customerPhone || ord.contactPhone}</span>
                  </div>
                  <div className="text-gray-700 font-medium">
                    {ord.items.map((i) => i.product.name).join(', ')}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-black text-sm text-gray-900">₹{ord.totalAmount.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-400">{new Date(ord.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Orders Table (>= md) */}
          <div className="hidden md:block overflow-x-auto pt-3">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100 text-[11px]">
                  <th className="pb-2 font-semibold">Order ID</th>
                  <th className="pb-2 font-semibold">Customer</th>
                  <th className="pb-2 font-semibold">Items</th>
                  <th className="pb-2 font-semibold">Total Amount</th>
                  <th className="pb-2 font-semibold">Payment Status</th>
                  <th className="pb-2 font-semibold">Order Status</th>
                  <th className="pb-2 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-400">
                      No customer orders yet.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-2.5 font-bold text-brand-600">#{ord.id}</td>
                      <td className="py-2.5">
                        <div className="font-bold text-gray-900">{ord.customerName || ord.contactName}</div>
                        <div className="text-[10px] text-gray-400">{ord.customerPhone || ord.contactPhone}</div>
                      </td>
                      <td className="py-2.5 text-gray-700">
                        {ord.items.map((i) => i.product.name).join(', ')}
                      </td>
                      <td className="py-2.5 font-black text-gray-900">
                        ₹{ord.totalAmount.toLocaleString()}
                      </td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700">
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-gray-400 text-[11px]">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* QUICK COMMISSION EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h4 className="text-sm font-black text-gray-900">
                Adjust Commission & Final Selling Price
              </h4>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div>
                <span className="font-bold text-gray-800">{editingProduct.name}</span>
                <p className="text-gray-400 text-[11px]">Vendor: {editingProduct.vendorName || 'Direct Quarry'}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Vendor Base Price:</span>
                  <span className="font-bold text-gray-800">
                    ₹{editingProduct.vendorBasePrice || editingProduct.pricePerSqFt}/Sq.ft
                  </span>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Platform Commission (%):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newCommissionPercent}
                    onChange={(e) => setNewCommissionPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-900 focus:border-brand-500 outline-none"
                  />
                </div>

                <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between font-black text-sm text-gray-900">
                  <span>Customer Final Price:</span>
                  <span className="text-brand-600">
                    ₹{Math.round(
                      (editingProduct.vendorBasePrice || editingProduct.pricePerSqFt) *
                        (1 + newCommissionPercent / 100)
                    )}/Sq.ft
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCommission}
                disabled={savingProduct}
                className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-xs transition shadow-md disabled:opacity-50"
              >
                {savingProduct ? 'Saving...' : 'Apply Live Price'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
