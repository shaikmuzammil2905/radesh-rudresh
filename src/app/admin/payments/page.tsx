'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { PaymentRecord } from '@/types';
import { CreditCard, CheckCircle2, ShieldCheck, RefreshCw, ExternalLink } from 'lucide-react';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/cms/payments');
      const data = await res.json();
      if (data.success) setPayments(data.payments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const totalVolume = payments.reduce((acc, p) => acc + (p.amount || 0), 0);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Razorpay Payment Transactions"
        subtitle="Live payment ledger capturing marble purchases and skilled worker advance bookings."
      />

      {/* Gateway Overview Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-blue-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="font-black text-sm flex items-center gap-2">
              <span>Razorpay Payment Gateway</span>
              <span className="bg-blue-400/20 text-blue-200 text-[10px] px-2 py-0.5 rounded-full border border-blue-400/30">
                Test Mode Active
              </span>
            </div>
            <div className="text-xs text-blue-200 font-mono mt-0.5">
              Key: rzp_test_U3ts4T40qINRZU &middot; Currency: INR (₹)
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-blue-200">Total Captured Volume</div>
          <div className="text-xl sm:text-2xl font-black">₹{totalVolume.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">Payment Transaction Records</h2>
          <button
            onClick={fetchPayments}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-500 font-bold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/60 transition">
                  <td className="py-3 px-4 font-mono font-bold text-gray-900">
                    {p.razorpayPaymentId || p.id}
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-600">{p.razorpayOrderId}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{p.customerName}</div>
                    <div className="text-[11px] text-gray-400">{p.customerPhone}</div>
                  </td>
                  <td className="py-3 px-4 font-black text-gray-900 text-sm">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Captured</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-[11px]">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}

              {payments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No transactions captured yet. Test transactions completed via checkout will appear here in real time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
