'use client';

import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  Clock,
  Building,
  CreditCard,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function WalletAdminPage() {
  const [withdrawals, setWithdrawals] = useState([
    { id: 'WDR-101', entity: 'Kailash Stone World', type: 'Vendor', amount: 45000, bank: 'HDFC Bank - ••••4421', status: 'Pending' },
    { id: 'WDR-102', entity: 'Ramesh Sharma', type: 'Worker', amount: 8500, bank: 'SBI - ••••9912', status: 'Approved' },
    { id: 'WDR-103', entity: 'Mewar Marble Co.', type: 'Vendor', amount: 120000, bank: 'ICICI Bank - ••••1188', status: 'Approved' },
  ]);

  const handleApprove = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: 'Approved' } : w))
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader
        title="Escrow & Wallet Settlements"
        breadcrumbs={[{ label: 'Wallet' }]}
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        {/* Wallet Balances */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500">Marketplace Escrow Hold</span>
            <div className="text-2xl font-black text-gray-900 mt-1">₹84,20,500</div>
            <p className="text-[11px] text-gray-400 mt-1">Held until customer delivery confirmation</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500">Pending Withdrawal Requests</span>
            <div className="text-2xl font-black text-amber-600 mt-1">₹45,000</div>
            <p className="text-[11px] text-gray-400 mt-1">1 vendor payout awaiting release</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500">Settled This Month</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">₹42,80,000</div>
            <p className="text-[11px] text-gray-400 mt-1">Instant payouts to vendor bank accounts</p>
          </div>
        </div>

        {/* Withdrawals table */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-black text-gray-900">Withdrawal & Settlement Queue</h3>
              <p className="text-xs text-gray-500">Bank payouts requested by marble vendors and artisans</p>
            </div>
          </div>

          <div className="overflow-x-auto pt-3">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-400 border-b border-gray-100 text-[11px]">
                <tr>
                  <th className="py-2.5 font-bold">Request ID</th>
                  <th className="py-2.5 font-bold">Beneficiary</th>
                  <th className="py-2.5 font-bold">Category</th>
                  <th className="py-2.5 font-bold">Bank Account</th>
                  <th className="py-2.5 font-bold">Amount</th>
                  <th className="py-2.5 font-bold">Status</th>
                  <th className="py-2.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {withdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3 font-mono font-bold text-brand-600">{w.id}</td>
                    <td className="py-3 font-bold text-gray-900">{w.entity}</td>
                    <td className="py-3 text-gray-500">{w.type}</td>
                    <td className="py-3 font-mono text-gray-700">{w.bank}</td>
                    <td className="py-3 font-black text-gray-900">₹{w.amount.toLocaleString()}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          w.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {w.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {w.status === 'Pending' ? (
                        <button
                          onClick={() => handleApprove(w.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition"
                        >
                          Approve Payout
                        </button>
                      ) : (
                        <span className="text-[11px] text-gray-400 font-semibold">Disbursed</span>
                      )}
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
