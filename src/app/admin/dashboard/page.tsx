'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import {
  Sparkles,
  Users,
  ShoppingBag,
  CreditCard,
  MessageSquare,
  Briefcase,
  ArrowUpRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Product, Worker, Enquiry, PaymentRecord, ProductOrder } from '@/types';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, workRes, enqRes, payRes] = await Promise.all([
          fetch('/api/cms/products').then((r) => r.json()),
          fetch('/api/cms/workers').then((r) => r.json()),
          fetch('/api/cms/enquiries').then((r) => r.json()),
          fetch('/api/cms/payments').then((r) => r.json()),
        ]);

        if (prodRes.success) setProducts(prodRes.products || []);
        if (workRes.success) setWorkers(workRes.workers || []);
        if (enqRes.success) setEnquiries(enqRes.enquiries || []);
        if (payRes.success) setPayments(payRes.payments || []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalRevenue = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const pendingEnquiries = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Admin Control Center"
        subtitle="Manage public website content, marble catalog, master artisans, customer leads and payments."
      />

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Marble Catalog</span>
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">{products.length}</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> Direct Quarry
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Italian, Indian, Granite & Tile Slabs</p>
          <Link
            href="/admin/products"
            className="mt-3 text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group-hover:translate-x-0.5 transition"
          >
            <span>Manage Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Master Artisans */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Master Artisans</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">{workers.length}</span>
            <span className="text-xs font-bold text-blue-600">Verified Fitters</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Marble cutters, polishers & fitters</p>
          <Link
            href="/admin/services"
            className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition"
          >
            <span>Manage Artisans</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Customer Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Leads</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">{enquiries.length}</span>
            {pendingEnquiries > 0 ? (
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                {pendingEnquiries} New
              </span>
            ) : (
              <span className="text-xs font-bold text-emerald-600">All Addressed</span>
            )}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">High-intent stone & contractor inquiries</p>
          <Link
            href="/admin/enquiries"
            className="mt-3 text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group-hover:translate-x-0.5 transition"
          >
            <span>Review Leads</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Total Captured Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Razorpay Volume</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Captured payments via Razorpay Gateway</p>
          <Link
            href="/admin/payments"
            className="mt-3 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition"
          >
            <span>Payment Ledger</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick Action Shortcuts Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 sm:p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Dynamic CMS Control</span>
            <span className="bg-pink-500/20 text-pink-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-500/30">
              Live Sync
            </span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Any update made in these panels directly syncs to the public mobile and desktop website without re-deploying code.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-brand-500 to-pink-600 hover:from-brand-600 hover:to-pink-700 rounded-xl text-xs font-bold shadow-md transition active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Marble / Tile</span>
          </Link>

          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-bold transition border border-slate-700"
          >
            <span>Edit Hero Slides</span>
          </Link>

          <Link
            href="/admin/media"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-bold transition border border-slate-700"
          >
            <HardDrive className="w-3.5 h-3.5 text-amber-400" />
            <span>AWS S3 Media</span>
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Recent Enquiries & System Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Recent Customer Enquiries</h2>
              <p className="text-xs text-gray-500">Inbound stone procurement and artisan hiring requests</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 text-gray-500 font-bold border-y border-gray-100">
                <tr>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3 px-3">
                      <div className="font-bold text-gray-900">{enq.name}</div>
                      <div className="text-[11px] text-gray-500 font-mono">{enq.phone}</div>
                    </td>
                    <td className="py-3 px-3 max-w-xs truncate text-gray-700">{enq.subject}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          enq.status === 'New'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-400 text-[11px]">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href="/admin/enquiries"
                        className="text-brand-600 font-bold hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cloud Infrastructure & Credentials Status (1 col) */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 space-y-4">
          <h2 className="text-sm font-bold text-gray-900">Cloud & Gateway Health</h2>

          <div className="space-y-3 text-xs">
            {/* AWS S3 */}
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/70 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-gray-800">
                <span className="flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-amber-500" />
                  <span>Amazon S3 Bucket</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  ACTIVE
                </span>
              </div>
              <div className="text-[11px] text-gray-600 font-mono">
                Bucket: <span className="font-bold text-gray-900">rudra-infra</span>
              </div>
              <div className="text-[11px] text-gray-600 font-mono">
                Region: <span className="font-bold text-gray-900">ap-south-2 (Hyderabad)</span>
              </div>
              <div className="text-[11px] text-gray-500">
                Media uploaded in the Admin Panel is stored directly in your AWS S3 bucket.
              </div>
            </div>

            {/* Razorpay Gateway */}
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/70 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-gray-800">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  <span>Razorpay Payment Gateway</span>
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                  TEST MODE
                </span>
              </div>
              <div className="text-[11px] text-gray-600 font-mono">
                Key ID: <span className="font-bold text-gray-900">rzp_test_U3ts4T40qINRZU</span>
              </div>
              <div className="text-[11px] text-gray-500">
                Customer checkout orders and signatures are securely validated on the server.
              </div>
            </div>

            {/* Public Website Status */}
            <div className="p-3 rounded-xl bg-pink-50/50 border border-pink-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900">Public Customer App</div>
                <div className="text-[10px] text-gray-500">Mobile-first marble & worker booking</div>
              </div>
              <Link
                href="/"
                target="_blank"
                className="px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 transition"
              >
                <span>Open</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
