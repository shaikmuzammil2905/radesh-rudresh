'use client';

import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Key, Lock, CheckCircle2 } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function StaffAdminPage() {
  const staff = [
    { name: 'Radhesh Rudresh', email: 'admin@radheshrudresh.com', role: 'Super Admin', access: 'Full Operational & Financial Authority', status: 'Active' },
    { name: 'Praveen Jain', email: 'praveen@radheshrudresh.com', role: 'Operations Manager', access: 'Vendor KYC, Products & Order Dispatch', status: 'Active' },
    { name: 'Sanjay Rawat', email: 'sanjay@radheshrudresh.com', role: 'Finance Officer', access: 'Bank Settlements, Invoicing & GST Reports', status: 'Active' },
    { name: 'Meena Sharma', email: 'meena@radheshrudresh.com', role: 'Support Agent', access: 'Customer Inquiries & Worker Bookings', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader title="Sub-Admins, Roles & Permissions" breadcrumbs={[{ label: 'Staff' }]} />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
          <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-500" />
            <span>Staff Role-Based Access Control (RBAC)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage granular permissions for catalog managers, dispatch officers and financial controllers.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-gray-100 text-gray-400 text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4 font-bold">Staff Member</th>
                <th className="py-3 px-4 font-bold">Assigned Role</th>
                <th className="py-3 px-4 font-bold">Scope of Authority</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {staff.map((s, idx) => (
                <tr key={idx} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{s.name}</div>
                    <div className="text-[10.5px] text-gray-400">{s.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-brand-600">
                    <span className="px-2 py-0.5 rounded-md bg-pink-50 text-brand-700 font-bold text-[10.5px]">
                      {s.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">{s.access}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
