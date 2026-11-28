'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  DollarSign,
  Download,
  Calendar,
  CreditCard,
  Building,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function SalesAdminPage() {
  const [stats, setStats] = useState({
    grossSales: 48672000,
    platformCommission: 6245000,
    vendorPayouts: 39427000,
    workerPayouts: 3000000,
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader
        title="Marketplace Sales & Revenue Ledger"
        breadcrumbs={[{ label: 'Sales' }]}
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500">Gross Platform GMV</span>
            <div className="text-2xl font-black text-gray-900 mt-1">₹{(stats.grossSales / 100000).toFixed(2)} Lakhs</div>
            <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">↑ 22.4% this quarter</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500">Platform Retained Commission</span>
            <div className="text-2xl font-black text-brand-600 mt-1">₹{(stats.platformCommission / 100000).toFixed(2)} Lakhs</div>
            <span className="text-[11px] font-bold text-gray-400 mt-1 inline-block">Avg 12.8% on orders</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500">Disbursed to Marble Vendors</span>
            <div className="text-2xl font-black text-gray-900 mt-1">₹{(stats.vendorPayouts / 100000).toFixed(2)} Lakhs</div>
            <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">100% Settled via IMPS/NEFT</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500">Worker & Artisan Wages Paid</span>
            <div className="text-2xl font-black text-gray-900 mt-1">₹{(stats.workerPayouts / 100000).toFixed(2)} Lakhs</div>
            <span className="text-[11px] font-bold text-purple-600 mt-1 inline-block">Daily wage transfers</span>
          </div>
        </div>

        {/* Ledger Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-black text-gray-900">Recent Financial Settlements</h3>
              <p className="text-xs text-gray-500">Direct quarry vendor and contractor bank disbursements</p>
            </div>
            <button
              onClick={() => alert('Exporting CSV Ledger for FY 2025-26...')}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto pt-3">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-400 border-b border-gray-100 text-[11px]">
                <tr>
                  <th className="py-2.5 font-bold">Transaction Ref</th>
                  <th className="py-2.5 font-bold">Beneficiary Entity</th>
                  <th className="py-2.5 font-bold">Type</th>
                  <th className="py-2.5 font-bold">Gross Amount</th>
                  <th className="py-2.5 font-bold">Platform Margin</th>
                  <th className="py-2.5 font-bold">Net Payout</th>
                  <th className="py-2.5 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { ref: 'TXN-9921', name: 'Shree Marble Traders', type: 'Vendor Payout', gross: 280000, fee: 28000, net: 252000, status: 'Completed' },
                  { ref: 'TXN-9920', name: 'Kailash Stone World', type: 'Vendor Payout', gross: 450000, fee: 45000, net: 405000, status: 'Completed' },
                  { ref: 'TXN-9919', name: 'Ramesh Sharma (Artisan)', type: 'Worker Wage', gross: 12500, fee: 1250, net: 11250, status: 'Completed' },
                  { ref: 'TXN-9918', name: 'Mewar Marble Co.', type: 'Vendor Payout', gross: 320000, fee: 32000, net: 288000, status: 'Completed' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/70 transition">
                    <td className="py-3 font-mono font-bold text-gray-900">{row.ref}</td>
                    <td className="py-3 font-semibold text-gray-800">{row.name}</td>
                    <td className="py-3 text-gray-500">{row.type}</td>
                    <td className="py-3 font-bold text-gray-900">₹{row.gross.toLocaleString()}</td>
                    <td className="py-3 font-bold text-brand-600">-₹{row.fee.toLocaleString()}</td>
                    <td className="py-3 font-black text-emerald-600">₹{row.net.toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
