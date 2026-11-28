'use client';

import React, { useState, useEffect } from 'react';
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
  RefreshCw,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { WithdrawalRequest } from '@/types';

export default function WalletAdminPage() {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cms/withdrawals', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setWithdrawals(Array.isArray(data) ? data : (data.withdrawals || []));
      }
    } catch (e) {
      console.error('Failed to load withdrawals:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWithdrawals();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch('/api/cms/withdrawals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'Approved' }),
      });
      if (res.ok) {
        setWithdrawals((prev) =>
          prev.map((w) => (w.id === id ? { ...w, status: 'Approved' } : w))
        );
      }
    } catch (e) {
      alert('Failed to approve payout request');
    }
  };

  const pendingTotal = withdrawals
    .filter((w) => w.status === 'Pending')
    .reduce((acc, w) => acc + (w.amount || 0), 0);

  const settledTotal = withdrawals
    .filter((w) => w.status === 'Approved' || w.status === 'Completed')
    .reduce((acc, w) => acc + (w.amount || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader
        title="Escrow & Wallet Settlements"
        breadcrumbs={[{ label: 'Wallet' }]}
      />

      <main className="p-3 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        {/* Wallet Balances KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500">Marketplace Escrow Hold</span>
            <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">₹84,20,500</div>
            <p className="text-[11px] text-gray-400 mt-1">Held until customer delivery confirmation</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500">Pending Withdrawal Requests</span>
            <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">
              ₹{pendingTotal.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              {withdrawals.filter((w) => w.status === 'Pending').length} payouts awaiting release
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs sm:col-span-2 md:col-span-1">
            <span className="text-xs font-semibold text-gray-500">Settled Payouts</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
              ₹{(4280000 + settledTotal).toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Instant payouts to vendor & worker bank accounts</p>
          </div>
        </div>

        {/* Withdrawals Section */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-black text-gray-900">Withdrawal & Settlement Queue</h3>
              <p className="text-xs text-gray-500">Bank payouts requested by marble vendors and artisans</p>
            </div>
            <button
              onClick={loadWithdrawals}
              className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 border border-gray-200 rounded-xl"
              title="Refresh Queue"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* MOBILE CARD VIEW (< md) — Zero Collisions / Squishing */}
          <div className="block md:hidden divide-y divide-gray-100 pt-2">
            {withdrawals.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400">No withdrawal requests found.</div>
            ) : (
              withdrawals.map((w) => (
                <div key={w.id} className="py-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-brand-600 text-xs">#{w.id}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        w.status === 'Approved' || w.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : w.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {w.status}
                    </span>
                  </div>

                  <div>
                    <div className="font-bold text-gray-900 text-sm">{w.beneficiaryName || (w as any).entity}</div>
                    <div className="text-[11px] text-gray-500">
                      {w.beneficiaryType || (w as any).type} &bull; {w.bankName || (w as any).bank}
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl">
                    <div>
                      <span className="text-[9.5px] text-gray-400 block font-semibold">PAYOUT AMOUNT</span>
                      <span className="font-black text-gray-900 text-sm">₹{w.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      {w.status === 'Pending' ? (
                        <button
                          onClick={() => handleApprove(w.id)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
                        >
                          Approve Payout
                        </button>
                      ) : (
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          ✓ Disbursed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* DESKTOP TABLE VIEW (>= md) */}
          <div className="hidden md:block overflow-x-auto pt-3">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-400 border-b border-gray-100 text-[11px] uppercase tracking-wider">
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
              <tbody className="divide-y divide-gray-100 font-medium">
                {withdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3 font-mono font-bold text-brand-600">{w.id}</td>
                    <td className="py-3 font-bold text-gray-900">{w.beneficiaryName || (w as any).entity}</td>
                    <td className="py-3 text-gray-500">{w.beneficiaryType || (w as any).type}</td>
                    <td className="py-3 font-mono text-gray-700">{w.bankName || (w as any).bank}</td>
                    <td className="py-3 font-black text-gray-900">₹{w.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          w.status === 'Approved' || w.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : w.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
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
