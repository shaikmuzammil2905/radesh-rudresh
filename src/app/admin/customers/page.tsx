'use client';

import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Search,
  Filter,
  Shield,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  Clock,
  Ban,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Customer } from '@/types';

export default function CustomersAdminPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cms/customers');
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
    try {
      const res = await fetch('/api/cms/customers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setCustomers((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus as any } : c))
        );
      }
    } catch {
      alert('Failed to update customer');
    }
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
      (c.city && c.city.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader
        title="Customer Management"
        breadcrumbs={[{ label: 'Customers' }]}
        onSearch={setSearch}
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs">
          <div>
            <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>Customer Registry ({customers.length})</span>
            </h2>
            <p className="text-xs text-gray-500">
              Profiles, stone order volume, contractor bookings and account access controls.
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
              <option value="Blocked">Blocked</option>
            </select>
            <button
              onClick={loadCustomers}
              className="p-2 text-gray-500 hover:text-gray-900 bg-gray-50 border border-gray-200 rounded-xl"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Customer Name</th>
                  <th className="py-3 px-4 font-bold">Contact</th>
                  <th className="py-3 px-4 font-bold">Location</th>
                  <th className="py-3 px-4 font-bold">Total Orders</th>
                  <th className="py-3 px-4 font-bold">Total Spent</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No customer records found.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900">{c.name}</div>
                        <div className="text-[10px] text-gray-400">ID: {c.id}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-800">{c.phone}</div>
                        <div className="text-[10.5px] text-gray-500">{c.email || 'No email registered'}</div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {c.city ? `${c.city}, ${c.state || 'India'}` : 'National'}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-800">
                        {c.totalOrders} Orders
                      </td>
                      <td className="py-3.5 px-4 font-black text-brand-600">
                        ₹{(c.totalSpent || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            c.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleToggleStatus(c.id, c.status)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                            c.status === 'Active'
                              ? 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {c.status === 'Active' ? 'Block Access' : 'Unblock'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
