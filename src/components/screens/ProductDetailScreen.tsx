'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  CheckCircle,
  Truck,
  Shield,
  Layers,
  MapPin,
  Building,
  Minus,
  Plus
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';

export const ProductDetailScreen: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo,
    goBack
  } = useApp();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [areaSqFt, setAreaSqFt] = useState(100);

  if (!selectedProduct) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Product not found.</p>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold"
        >
          Return to Products
        </button>
      </div>
    );
  }

  const wishlisted = isWishlisted(selectedProduct.id);
  const gallery = selectedProduct.galleryImages && selectedProduct.galleryImages.length > 0
    ? selectedProduct.galleryImages
    : [selectedProduct.image];

  const subtotal = areaSqFt * selectedProduct.pricePerSqFt;
  const gst = Math.round(subtotal * 0.18);
  const delivery = subtotal > 25000 ? 0 : 500;
  const total = subtotal + gst + delivery;

  const handleAddToCart = () => {
    addToCart(selectedProduct, areaSqFt);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, areaSqFt);
    navigateTo('cart');
  };

  return (
    <div className="pb-28 bg-white min-h-screen">
      {/* Header matching Screen 5: Back, Product Details, Heart, Cart */}
      <Header
        title="Product Details"
        showBack={true}
        showWishlist={true}
        showCart={true}
      />

      {/* Main Image Display */}
      <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
        <img
          src={gallery[selectedImageIndex] || selectedProduct.image}
          alt={selectedProduct.name}
          className="w-full h-full object-cover transition-all duration-300"
        />
        <button
          onClick={() => toggleWishlist(selectedProduct.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-gray-700 hover:text-brand-500 shadow-md active:scale-90 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${
              wishlisted ? 'fill-brand-500 text-brand-500' : ''
            }`}
          />
        </button>
      </div>

      {/* Thumbnail Carousel */}
      <div className="px-4 py-3 flex gap-2.5 overflow-x-auto no-scrollbar border-b border-gray-100">
        {gallery.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImageIndex(idx)}
            className={`w-16 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
              selectedImageIndex === idx
                ? 'border-brand-500 scale-102 shadow-xs'
                : 'border-gray-200 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {/* Title & Price Header matching Screen 5 */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
              {selectedProduct.category}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                selectedProduct.stockStatus === 'In Stock'
                  ? 'bg-emerald-50 text-emerald-600'
                  : selectedProduct.stockStatus === 'Limited Stock'
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              ● {selectedProduct.stockStatus} ({selectedProduct.availableStockSqFt} Sq.ft left)
            </span>
          </div>

          <h2 className="text-xl font-black text-gray-900 mt-1.5 leading-snug">
            {selectedProduct.name}
          </h2>

          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-brand-500">
              ₹{selectedProduct.pricePerSqFt}
            </span>
            <span className="text-xs text-gray-500 font-semibold">/ Sq.ft</span>
          </div>

          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-600">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <span className="font-bold text-gray-800">{selectedProduct.rating}</span>
            <span>({selectedProduct.reviewCount} Reviews)</span>
          </div>
        </div>

        {/* Product Details Specs Table from Screen 5 */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-gray-100">
          <h3 className="font-bold text-xs text-gray-900 mb-2.5 uppercase tracking-wider">
            Product Details
          </h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-200/60">
              <span className="text-gray-500">• Type</span>
              <span className="font-bold text-gray-800">{selectedProduct.type}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-200/60">
              <span className="text-gray-500">• Finish</span>
              <span className="font-bold text-gray-800">{selectedProduct.finish}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-200/60">
              <span className="text-gray-500">• Thickness</span>
              <span className="font-bold text-gray-800">{selectedProduct.thickness}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-200/60">
              <span className="text-gray-500">• Usage</span>
              <span className="font-bold text-gray-800 text-right max-w-[200px]">
                {selectedProduct.usage}
              </span>
            </div>
          </div>
        </div>

        {/* Vendor Information Card */}
        <div className="p-3 bg-white rounded-2xl border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase">Verified Quarry Vendor</div>
              <div className="text-xs font-bold text-gray-900">{selectedProduct.vendorName}</div>
              <div className="text-[10px] text-gray-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-500" />
                <span>{selectedProduct.vendorLocation}</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full">
            Verified
          </span>
        </div>

        {/* Required Area Calculation */}
        <div className="bg-white p-3.5 rounded-2xl border border-brand-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xs text-gray-900">Required Area</h3>
              <p className="text-[10px] text-gray-500">Calculate pricing according to your site plan</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAreaSqFt((prev) => Math.max(10, prev - 25))}
                className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <div className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-black min-w-[70px] text-center">
                {areaSqFt} Sq.ft
              </div>
              <button
                onClick={() => setAreaSqFt((prev) => prev + 25)}
                className="w-7 h-7 rounded-lg border border-brand-500 bg-brand-50 text-brand-600 flex items-center justify-center hover:bg-brand-100 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex gap-2">
            {[50, 100, 250, 500, 1000].map((preset) => (
              <button
                key={preset}
                onClick={() => setAreaSqFt(preset)}
                className={`flex-1 py-1 text-[10px] rounded-lg font-bold border transition ${
                  areaSqFt === preset
                    ? 'bg-brand-500 text-white border-brand-500'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {preset} Sq.ft
              </button>
            ))}
          </div>

          {/* Estimated Subtotal Breakdown */}
          <div className="pt-2 border-t border-gray-100 space-y-1 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Product Subtotal ({areaSqFt} Sq.ft @ ₹{selectedProduct.pricePerSqFt})</span>
              <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-[11px]">
              <span>Estimated GST (18%)</span>
              <span>₹{gst.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-[11px]">
              <span>Delivery Charges</span>
              <span className={delivery === 0 ? 'text-emerald-600 font-bold' : ''}>
                {delivery === 0 ? 'FREE' : `₹${delivery}`}
              </span>
            </div>
            <div className="flex justify-between font-black text-sm text-gray-900 pt-1 border-t border-dashed border-gray-200">
              <span>Estimated Total</span>
              <span className="text-brand-500">₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-bold text-xs text-gray-900 mb-1">Description</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            {selectedProduct.description}
          </p>
        </div>
      </div>

      {/* Sticky Bottom Actions matching Screen 5: Add to Cart and Buy Now */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 z-40 flex gap-2.5 shadow-lg">
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 rounded-xl border-2 border-brand-500 text-brand-500 hover:bg-pink-50 font-black text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
        >
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};
