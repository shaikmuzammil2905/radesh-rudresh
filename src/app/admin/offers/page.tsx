'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, CheckCircle, Percent, Clock, AlertCircle } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CouponOffer } from '@/types';

export default function OffersAdminPage() {
  const [coupons, setCoupons] = useState<CouponOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [minOrderAmount, setMinOrderAmount] = useState(20000);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cms/coupons');
      if (res.ok) {
        const data = await res.json();
        setCoupons(Array.isArray(data) ? data : (data.coupons || []));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/cms/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.toUpperCase().trim(),
          title,
          discountPercent: Number(discountPercent),
          minOrderAmount: Number(minOrderAmount),
          active: true,
          validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setCode('');
        setTitle('');
        loadCoupons();
      }
    } catch {
      alert('Failed to create coupon');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this coupon code?')) return;
    try {
      const res = await fetch(`/api/cms/coupons?id=${id}`, { method: 'DELETE' });
      if (res.ok) loadCoupons();
    } catch {
      alert('Failed to delete');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader title="Offers, Coupons & Promotions" breadcrumbs={[{ label: 'Offers' }]} />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-brand-500" />
              <span>Discount Vouchers & Marketing Campaigns</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Create promotion codes applicable at cart checkout for marble orders.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Promo Code</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coupons.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-black text-brand-600 bg-pink-50 border border-brand-200 px-2.5 py-1 rounded-lg">
                    {c.code}
                  </span>
                  <button onClick={() => handleDelete(c.id)} className="text-gray-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="font-bold text-gray-900 text-xs mt-3">{c.title || c.code}</h4>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <div>Discount: <strong className="text-gray-900">{c.discountPercent || c.discountValue}% Off</strong></div>
                  <div>Min Order: <strong className="text-gray-900">₹{(c.minOrderAmount || c.minOrder || 0).toLocaleString()}</strong></div>
                  <div>Used: <strong className="text-gray-900">{c.usedCount || c.usageCount || 0} Times</strong></div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Active</span>
                </span>
                <span>Exp: {new Date(c.validTill || c.validUntil || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateCoupon} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <h3 className="text-base font-black text-gray-900">Create New Promo Code</h3>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Coupon Code (e.g. FESTIVE15)</label>
              <input
                required
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="PROMOCODE"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold uppercase outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Campaign Title</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="15% Off on Italian Marble"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-brand-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Discount %</label>
                <input
                  required
                  type="number"
                  min="1"
                  max="50"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Min Order ₹</label>
                <input
                  required
                  type="number"
                  min="5000"
                  step="1000"
                  value={minOrderAmount}
                  onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-100 font-bold rounded-xl text-xs text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Save & Activate
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
