'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  CreditCard,
  Building2,
  Phone,
  ShieldCheck,
  Check,
  ChevronRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';
import confetti from 'canvas-confetti';

export const CheckoutScreen: React.FC = () => {
  const {
    cart,
    cartTotalAmount,
    addresses,
    selectedAddress,
    setSelectedAddress,
    addOrder,
    navigateTo,
    userName,
    userPhone
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery'>('UPI');
  const [upiOption, setUpiOption] = useState<'GPay' | 'PhonePe' | 'Paytm'>('GPay');
  const [contactName, setContactName] = useState(userName || 'Muzammil Shaik');
  const [contactPhone, setContactPhone] = useState(userPhone || '+91 99887 76655');
  const [siteNote, setSiteNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const gst = Math.round(cartTotalAmount * 0.18);
  const delivery = cartTotalAmount > 25000 || cartTotalAmount === 0 ? 0 : 500;
  const grandTotal = cartTotalAmount + gst + delivery;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Confetti blast
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      const orderItems = cart.map((item) => ({
        product: item.product,
        areaSqFt: item.areaSqFt,
        subtotal: item.areaSqFt * item.product.pricePerSqFt
      }));

      addOrder({
        items: orderItems,
        siteAddress: `${selectedAddress.fullAddress}, ${selectedAddress.city} - ${selectedAddress.pincode}`,
        contactName,
        contactPhone,
        paymentMethod,
        subtotal: cartTotalAmount,
        deliveryCharges: delivery,
        totalAmount: grandTotal,
        estimatedDelivery: '25 Nov 2026'
      });

      setIsSubmitting(false);
      navigateTo('orders');
    }, 1200);
  };

  return (
    <div className="pb-32 bg-slate-50 min-h-screen">
      <Header title="Checkout" showBack={true} showCart={false} />

      <form onSubmit={handlePlaceOrder} className="p-4 space-y-4">
        {/* Delivery / Site Address Selection */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-xs text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>1. Delivery / Site Address</span>
            </h3>
            <button
              type="button"
              onClick={() => navigateTo('addresses')}
              className="text-[11px] font-bold text-brand-500 hover:underline"
            >
              Change
            </button>
          </div>

          <div className="p-3 bg-pink-50/40 border border-brand-100 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="bg-brand-500 text-white text-[9.5px] font-black px-2 py-0.5 rounded-sm uppercase">
                {selectedAddress.label}
              </span>
              <span className="font-bold text-xs text-gray-900">{selectedAddress.name}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              {selectedAddress.fullAddress}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
            </p>
          </div>
        </div>

        {/* Customer Contact Information */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-3">
          <h3 className="font-black text-xs text-gray-900 uppercase tracking-wider">
            2. Site Contact Information
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Receiver Name</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:bg-white focus:border-brand-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Site Phone</label>
              <input
                type="tel"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:bg-white focus:border-brand-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Site Delivery Instructions (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Crane required for 4th floor lifting"
              value={siteNote}
              onChange={(e) => setSiteNote(e.target.value)}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Order Items Preview */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2.5">
          <h3 className="font-black text-xs text-gray-900 uppercase tracking-wider">
            3. Order Items ({cart.length})
          </h3>

          <div className="divide-y divide-gray-100">
            {cart.map((item) => (
              <div key={item.product.id} className="py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-8 h-8 rounded-lg object-cover border"
                  />
                  <div>
                    <span className="font-bold text-gray-900 block line-clamp-1">{item.product.name}</span>
                    <span className="text-[10px] text-gray-500">{item.areaSqFt} Sq.ft @ ₹{item.product.pricePerSqFt}</span>
                  </div>
                </div>
                <span className="font-black text-gray-900">
                  ₹{(item.areaSqFt * item.product.pricePerSqFt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-3">
          <h3 className="font-black text-xs text-gray-900 uppercase tracking-wider">
            4. Payment Method
          </h3>

          <div className="space-y-2">
            {[
              { id: 'UPI', label: 'UPI (Google Pay, PhonePe, Paytm)', desc: 'Instant 0% transaction charges' },
              { id: 'Credit/Debit Card', label: 'Credit / Debit Card', desc: 'Visa, MasterCard, RuPay, Amex' },
              { id: 'Net Banking', label: 'Net Banking', desc: 'All Indian major banks supported' },
              { id: 'Cash on Delivery', label: 'Cash on Delivery / Site Token', desc: 'Advance deposit + balance on delivery' }
            ].map((option) => {
              const isSelected = paymentMethod === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => setPaymentMethod(option.id as any)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/30'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs text-gray-900 block">{option.label}</span>
                    <span className="text-[10px] text-gray-500">{option.desc}</span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-brand-500 bg-brand-500 text-white' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2 text-xs">
          <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-1">
            Price Breakdown
          </h4>
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-bold">₹{cartTotalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>GST (18%)</span>
            <span>₹{gst.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Delivery & Handling</span>
            <span className={delivery === 0 ? 'text-emerald-600 font-bold' : ''}>
              {delivery === 0 ? 'FREE' : `₹${delivery}`}
            </span>
          </div>
          <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between font-black text-sm text-gray-900">
            <span>Total Payable</span>
            <span className="text-brand-500">₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Sticky Place Order Button */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 z-40 shadow-lg">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-98 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Processing Order...</span>
            ) : (
              <>
                <span>PLACE ORDER • ₹{grandTotal.toLocaleString()}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
