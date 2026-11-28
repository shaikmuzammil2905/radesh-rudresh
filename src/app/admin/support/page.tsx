'use client';

import React, { useState } from 'react';
import { Headphones, CheckCircle, Clock, AlertTriangle, MessageSquare } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function SupportAdminPage() {
  const [tickets, setTickets] = useState([
    { id: 'TCK-201', user: 'Arvind Builders', type: 'Customer', subject: 'Crane delivery timeline update needed for Rajsamand site', status: 'Open', priority: 'High', date: '2 hours ago' },
    { id: 'TCK-202', user: 'Kailash Stone World', type: 'Vendor', subject: 'Tax invoice reconciliation for November settlement', status: 'In Progress', priority: 'Medium', date: '1 day ago' },
    { id: 'TCK-203', user: 'Ramesh Sharma', type: 'Worker', subject: 'Address change for weekly artisan badge verification', status: 'Resolved', priority: 'Low', date: '3 days ago' },
  ]);

  const handleResolve = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Resolved' } : t))
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader title="Customer & Vendor Support Desk" breadcrumbs={[{ label: 'Support' }]} />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
          <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
            <Headphones className="w-4 h-4 text-brand-500" />
            <span>Disputes & Inbound Support Inquiries</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Resolve delivery queries, quarry transit disputes and contractor rate tickets.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
          <div className="divide-y divide-gray-100">
            {tickets.map((t) => (
              <div key={t.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-gray-400">{t.id}</span>
                    <span className="font-bold text-gray-900 text-sm">{t.subject}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      t.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Raised by <strong className="text-gray-800">{t.user}</strong> ({t.type}) • {t.date}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                    t.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {t.status}
                  </span>
                  {t.status !== 'Resolved' && (
                    <button
                      onClick={() => handleResolve(t.id)}
                      className="px-3.5 py-1.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-xs transition"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
