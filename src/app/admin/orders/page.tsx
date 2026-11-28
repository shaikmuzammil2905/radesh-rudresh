'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductOrder, WorkerBooking } from '@/types';
import { ShoppingBag, Users, MapPin, Phone, CheckCircle, Clock } from 'lucide-react';

export default function AdminOrdersPage() {
  const [tab, setTab] = useState<'orders' | 'bookings'>('orders');
  const [orders, setOrders] = useState<ProductOrder[]>([]);
  const [bookings, setBookings] = useState<WorkerBooking[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/cms/orders');
        if (res.ok) {
          const data = await res.json();
          if (data.orders) setOrders(data.orders);
          if (data.bookings) setBookings(data.bookings);
        }
      } catch (err) {
        console.error('Failed to load orders/bookings:', err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Orders & Worker Bookings"
        subtitle="Track marble delivery dispatches, construction site addresses and scheduled worker artisan slots."
      />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            tab === 'orders'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white hover:bg-gray-100 text-gray-700'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Marble & Tile Orders</span>
        </button>

        <button
          onClick={() => setTab('bookings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            tab === 'bookings'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white hover:bg-gray-100 text-gray-700'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Worker Artisan Bookings</span>
        </button>
      </div>

      {tab === 'orders' ? (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Live Customer Supply Orders ({orders.length})</h2>
            <span className="text-xs text-brand-600 font-bold bg-pink-50 px-2.5 py-0.5 rounded-full">Real-time Sync</span>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {orders.length === 0 ? (
              <div className="py-8 text-center text-gray-400">No customer supply orders recorded yet.</div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="py-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-brand-600">#{ord.id}</span>
                      <span className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] ${
                        ord.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                        ord.status === 'Dispatched' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {ord.status}
                      </span>
                      {ord.paymentStatus && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full text-[9.5px]">
                          {ord.paymentStatus}
                        </span>
                      )}
                    </div>
                    <div className="font-black text-sm text-gray-900">₹{(ord.totalAmount || 0).toLocaleString('en-IN')}</div>
                  </div>

                  <div className="text-gray-800 font-semibold">
                    {Array.isArray(ord.items) ? ord.items.map((i: any) => `${i.product?.name || 'Marble'} (${i.areaSqFt} Sq.ft)`).join(', ') : 'Custom Stone Slabs'}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500 text-[11px] pt-1">
                    <span>Customer: <strong className="text-gray-800">{ord.contactName || ord.customerName || 'Customer'}</strong> ({ord.contactPhone || ord.customerPhone || 'N/A'})</span>
                    {ord.siteAddress && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-500" />
                        <span>{ord.siteAddress}</span>
                      </span>
                    )}
                    <span>&bull;</span>
                    <span>{ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : 'Recent'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Scheduled Worker Artisan Appointments ({bookings.length})</h2>
            <span className="text-xs text-brand-600 font-bold bg-pink-50 px-2.5 py-0.5 rounded-full">Real-time Sync</span>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {bookings.length === 0 ? (
              <div className="py-8 text-center text-gray-400">No artisan bookings yet.</div>
            ) : (
              bookings.map((b) => (
                <div key={b.id} className="py-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-purple-600">#{b.id}</span>
                      <span className="bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {b.status}
                      </span>
                    </div>
                    <div className="font-black text-sm text-gray-900">₹{(b.totalAmount || 0).toLocaleString('en-IN')}</div>
                  </div>

                  <div className="text-gray-800 font-semibold">
                    Worker: <strong className="text-gray-900">{b.workerName || 'Artisan Specialist'}</strong> ({b.workerSkill || b.category || 'Stone Installer'})
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500 text-[11px] pt-1">
                    <span>Client: <strong className="text-gray-800">{b.customerName || 'Customer'}</strong> ({b.customerPhone || 'Contact on file'})</span>
                    <span>&bull;</span>
                    <span>Slot: {b.scheduledDate || b.date} ({b.scheduledTimeSlot || b.timeSlot})</span>
                    {b.siteAddress && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-500" />
                        <span>{b.siteAddress}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
