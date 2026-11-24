'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductOrder, WorkerBooking } from '@/types';
import { ShoppingBag, Users, Calendar, MapPin, Phone, CheckCircle, Clock } from 'lucide-react';

export default function AdminOrdersPage() {
  const [tab, setTab] = useState<'orders' | 'bookings'>('orders');
  const [orders, setOrders] = useState<ProductOrder[]>([]);
  const [bookings, setBookings] = useState<WorkerBooking[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [dashRes] = await Promise.all([
          fetch('/api/cms/pages').catch(() => null),
        ]);
        // Default seed data is loaded via mock if not modified
      } catch (err) {}
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
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 space-y-4">
          <h2 className="text-sm font-bold text-gray-900">Live Customer Supply Orders</h2>

          <div className="divide-y divide-gray-100 text-xs">
            {[
              {
                id: 'ORD-94812',
                customer: 'Vikramaditya Reddy',
                phone: '+91 98490 12345',
                items: 'Italian White Marble (100 Sq.ft), Black Galaxy Granite (100 Sq.ft)',
                amount: 60000,
                status: 'Confirmed',
                date: '24 Nov 2026',
                address: 'Plot 45, Road 36, Jubilee Hills, Hyderabad',
              },
              {
                id: 'ORD-94811',
                customer: 'G. Suresh Rao',
                phone: '+91 99890 87654',
                items: 'Statuario Marble Slab (250 Sq.ft)',
                amount: 162500,
                status: 'Dispatched',
                date: '23 Nov 2026',
                address: 'Near Outer Ring Road, Gachibowli, Hyderabad',
              },
            ].map((ord) => (
              <div key={ord.id} className="py-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-gray-900">{ord.id}</span>
                    <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      {ord.status}
                    </span>
                  </div>
                  <div className="font-black text-sm text-gray-900">₹{ord.amount.toLocaleString('en-IN')}</div>
                </div>

                <div className="text-gray-700 font-medium">{ord.items}</div>

                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-[11px] pt-1">
                  <span>Customer: <strong className="text-gray-700">{ord.customer}</strong> ({ord.phone})</span>
                  <span>&middot;</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-brand-500" />
                    <span>{ord.address}</span>
                  </span>
                  <span>&middot;</span>
                  <span>{ord.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 space-y-4">
          <h2 className="text-sm font-bold text-gray-900">Scheduled Worker Artisan Appointments</h2>

          <div className="divide-y divide-gray-100 text-xs">
            {[
              {
                id: 'BKG-7712',
                worker: 'Ramesh Kumar',
                skill: 'Master Marble Cutter & Installer',
                customer: 'Ananya Sharma',
                phone: '+91 94401 54321',
                date: '25 Nov 2026 (09:00 AM - 05:00 PM)',
                rate: '₹850 / day',
                status: 'Accepted',
                site: 'Flat 402, Royal Palms, Banjara Hills, Hyderabad',
              },
              {
                id: 'BKG-7711',
                worker: 'Mohammed Arif',
                skill: 'Italian Marble Mirror Polisher',
                customer: 'Raghavendra Varma',
                phone: '+91 98888 77766',
                date: '26 Nov 2026 (Full Day)',
                rate: '₹950 / day',
                status: 'Confirmed',
                site: 'Villa 18, Palm Meadows, Madhapur, Hyderabad',
              },
            ].map((bkg) => (
              <div key={bkg.id} className="py-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-gray-900">{bkg.id}</span>
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      {bkg.status}
                    </span>
                  </div>
                  <div className="font-black text-brand-600">{bkg.rate}</div>
                </div>

                <div className="font-bold text-gray-800">
                  Assigned Artisan: <span className="text-brand-600">{bkg.worker}</span> ({bkg.skill})
                </div>

                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-[11px] pt-1">
                  <span>Customer: <strong className="text-gray-700">{bkg.customer}</strong> ({bkg.phone})</span>
                  <span>&middot;</span>
                  <span>Date: <strong className="text-gray-700">{bkg.date}</strong></span>
                  <span>&middot;</span>
                  <span>Site: {bkg.site}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
