'use client';

import React from 'react';
import {
  ArrowLeft,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';

export const CartScreen: React.FC = () => {
  const {
    cart,
    updateCartArea,
    removeFromCart,
    clearCart,
    cartTotalAmount,
    navigateTo,
    setSelectedProduct
  } = useApp();

  const gst = Math.round(cartTotalAmount * 0.18);
  const delivery = cartTotalAmount > 25000 || cartTotalAmount === 0 ? 0 : 500;
  const grandTotal = cartTotalAmount + gst + delivery;

  if (cart.length === 0) {
    return (
      <div className="pb-20 bg-slate-50 min-h-screen">
        <Header title="Shopping Cart" showBack={true} showCart={false} />
        <div className="p-8 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center text-brand-500 mb-4">
            <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h2 className="text-base font-black text-gray-900">Your Cart is Empty</h2>
          <p className="text-xs text-gray-500 mt-1 max-w-xs">
            Explore our curated collection of Italian marbles, granite, and tiles to add items to your cart.
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="mt-5 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-xs font-bold transition shadow-xs"
          >
            Browse Marbles & Tiles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-36 bg-slate-50 min-h-screen">
      <Header title="Shopping Cart" showBack={true} showCart={false} />

      <div className="p-4 space-y-4">
        {/* Header alert */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-700">{cart.length} Products in Cart</span>
          <button
            onClick={clearCart}
            className="text-[11px] text-red-500 hover:underline font-semibold"
          >
            Clear All
          </button>
        </div>

        {/* Cart Item Cards */}
        <div className="space-y-3">
          {cart.map((item) => {
            const itemSubtotal = item.areaSqFt * item.product.pricePerSqFt;
            const isOutOfStock = item.product.stockStatus === 'Out of Stock';

            return (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs space-y-3"
              >
                <div className="flex gap-3">
                  <div
                    onClick={() => {
                      setSelectedProduct(item.product);
                      navigateTo('product-detail');
                    }}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 cursor-pointer border border-gray-200"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3
                        onClick={() => {
                          setSelectedProduct(item.product);
                          navigateTo('product-detail');
                        }}
                        className="font-bold text-xs text-gray-900 line-clamp-1 cursor-pointer hover:text-brand-500"
                      >
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <Building className="w-3 h-3 text-gray-400" />
                      <span className="line-clamp-1">{item.product.vendorName}</span>
                    </div>

                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xs font-black text-brand-500">
                        ₹{item.product.pricePerSqFt}
                      </span>
                      <span className="text-[9.5px] text-gray-500 font-medium">
                        / Sq.ft
                      </span>
                    </div>

                    {isOutOfStock && (
                      <span className="text-[9.5px] font-bold text-red-500">
                        Out of stock - please remove to continue
                      </span>
                    )}
                  </div>
                </div>

                {/* Stepper & Subtotal row */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-gray-500">Area:</span>
                    <button
                      onClick={() =>
                        updateCartArea(item.product.id, Math.max(10, item.areaSqFt - 25))
                      }
                      className="w-6 h-6 rounded-md border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-gray-900 min-w-[50px] text-center">
                      {item.areaSqFt} Sq.ft
                    </span>
                    <button
                      onClick={() =>
                        updateCartArea(item.product.id, item.areaSqFt + 25)
                      }
                      className="w-6 h-6 rounded-md border border-brand-500 bg-brand-50 text-brand-600 flex items-center justify-center hover:bg-brand-100 active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block">Subtotal</span>
                    <span className="text-xs font-black text-gray-900">
                      ₹{itemSubtotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bill Details Summary Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2">
          <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-2">
            Bill Summary
          </h4>

          <div className="flex justify-between text-xs text-gray-600">
            <span>Items Subtotal</span>
            <span className="font-bold text-gray-900">₹{cartTotalAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>Estimated GST (18%)</span>
            <span>₹{gst.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>Delivery & Crane Loading</span>
            <span className={delivery === 0 ? 'text-emerald-600 font-bold' : ''}>
              {delivery === 0 ? 'FREE (Above ₹25,000)' : `₹${delivery}`}
            </span>
          </div>

          <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between text-sm font-black text-gray-900">
            <span>Total Payable Amount</span>
            <span className="text-brand-500">₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Trust banner */}
        <div className="flex items-center gap-2 p-3 bg-brand-50/50 rounded-xl border border-brand-100 text-[11px] text-brand-700">
          <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
          <span>Direct invoice with GST and transit insurance provided upon dispatch.</span>
        </div>
      </div>

      {/* Sticky Proceed to Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-200 p-3.5 z-50 shadow-lg">
        <div className="flex items-center justify-between gap-3 px-1">
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">Total Amount</span>
            <div className="text-base font-black text-brand-500 leading-tight">₹{grandTotal.toLocaleString()}</div>
          </div>
          <button
            onClick={() => navigateTo('checkout')}
            className="flex-1 py-3.5 px-5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
