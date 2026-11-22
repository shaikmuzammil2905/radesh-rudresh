'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Plus,
  SlidersHorizontal,
  Search,
  Check,
  X,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';
import { INITIAL_PRODUCTS } from '@/data/mockData';
import { ProductCategory, Product, StockStatus } from '@/types';

export const ProductListingScreen: React.FC = () => {
  const {
    navigateTo,
    selectedCategory,
    setSelectedCategory,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const [sortOption, setSortOption] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [stockFilter, setStockFilter] = useState<StockStatus | 'All'>('All');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const categories: ProductCategory[] = [
    'All',
    'Marble',
    'Granite',
    'Tiles',
    'Quartz',
    'Natural Stone',
    'Bathroom Collection',
    'Kitchen Collection'
  ];

  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      product.vendorName.toLowerCase().includes(globalSearchQuery.toLowerCase());
    const matchesStock =
      stockFilter === 'All' || product.stockStatus === stockFilter;
    return matchesCategory && matchesSearch && matchesStock;
  }).sort((a, b) => {
    if (sortOption === 'price-low') return a.pricePerSqFt - b.pricePerSqFt;
    if (sortOption === 'price-high') return b.pricePerSqFt - a.pricePerSqFt;
    if (sortOption === 'rating') return b.rating - a.rating;
    return (b.reviewCount || 0) - (a.reviewCount || 0);
  });

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Top Header matching Screen 3: Back, Marbles & Tiles, Heart, Cart */}
      <Header
        title={selectedCategory === 'All' ? 'Marbles & Tiles' : selectedCategory}
        showBack={true}
        showWishlist={true}
        showCart={true}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white px-4 py-2 border-b border-gray-100 flex items-center gap-1.5 text-[11px] text-gray-500">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-brand-500 font-medium"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-bold text-brand-600 line-clamp-1">
          {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </span>
        <span className="text-gray-400 text-[10px] ml-auto">
          ({filteredProducts.length} items)
        </span>
      </div>

      {/* Category Tabs: All, Marble, Granite, Tiles, Quartz, Natural Stone, Bathroom, Kitchen */}
      <div className="bg-white px-4 py-2.5 border-b border-gray-100 sticky top-[57px] z-30 shadow-2xs">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-xs scale-102'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search in this category..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="w-full bg-white text-xs pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-brand-500 shadow-2xs"
          />
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as any)}
          aria-label="Sort products"
          className="bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:border-brand-500 shadow-2xs"
        >
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>

        <button
          onClick={() => setShowFilterDrawer(!showFilterDrawer)}
          aria-label="Filter products"
          className={`p-2 rounded-xl border transition-colors shadow-2xs ${
            stockFilter !== 'All'
              ? 'bg-brand-50 border-brand-500 text-brand-600'
              : 'bg-white border-gray-200 text-gray-700'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Stock Filter Chips (if toggled) */}
      {showFilterDrawer && (
        <div className="px-4 pb-2 animate-fade-in flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-gray-500 mr-1">Stock:</span>
          {(['All', 'In Stock', 'Limited Stock', 'Out of Stock'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStockFilter(status)}
              className={`text-[10.5px] px-2.5 py-1 rounded-lg border font-medium transition ${
                stockFilter === status
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}

      {/* Product Results Grid (2 Columns as per Screen 3) */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Showing <strong>{filteredProducts.length}</strong> products</span>
          {stockFilter !== 'All' && (
            <button
              onClick={() => setStockFilter('All')}
              className="text-brand-500 font-bold hover:underline flex items-center gap-1"
            >
              Clear filter <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200/80 my-4 shadow-2xs">
            <p className="text-gray-500 text-sm">No products found matching your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setStockFilter('All');
                setGlobalSearchQuery('');
              }}
              className="mt-3 px-4 py-1.5 bg-brand-500 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => {
              const wishlisted = isWishlisted(product.id);
              const isOutOfStock = product.stockStatus === 'Out of Stock';

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs flex flex-col justify-between group hover:shadow-xs transition-all"
                >
                  {/* Product Card Image Container */}
                  <div
                    onClick={() => handleProductSelect(product)}
                    className="relative cursor-pointer aspect-4/3 overflow-hidden bg-gray-50"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-gray-600 hover:text-brand-500 shadow-xs active:scale-90 transition-all"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          wishlisted ? 'fill-brand-500 text-brand-500' : ''
                        }`}
                      />
                    </button>

                    {/* Stock status tag */}
                    {product.stockStatus === 'In Stock' && (
                      <span className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[8.5px] font-black px-1.5 py-0.5 rounded-sm shadow-2xs">
                        In Stock
                      </span>
                    )}
                    {product.stockStatus === 'Limited Stock' && (
                      <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-[8.5px] font-black px-1.5 py-0.5 rounded-sm shadow-2xs">
                        Limited
                      </span>
                    )}
                    {product.stockStatus === 'Out of Stock' && (
                      <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[8.5px] font-black px-1.5 py-0.5 rounded-sm shadow-2xs">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-2.5 flex flex-col flex-1 justify-between">
                    <div onClick={() => handleProductSelect(product)} className="cursor-pointer">
                      <h3 className="font-bold text-gray-900 text-xs line-clamp-1 group-hover:text-brand-500 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xs font-black text-brand-500">
                          ₹{product.pricePerSqFt}
                        </span>
                        <span className="text-[9px] text-gray-500 font-medium">
                          / Sq.ft
                        </span>
                      </div>

                      <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-gray-800">{product.rating}</span>
                        <span>({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Action Buttons: View Details & Add to Cart */}
                    <div className="mt-2.5 flex flex-col gap-1.5">
                      <button
                        onClick={() => handleProductSelect(product)}
                        className="w-full flex items-center justify-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 transition active:scale-95 border border-gray-200"
                      >
                        <Eye className="w-3 h-3 text-gray-500" />
                        <span>View Details</span>
                      </button>

                      <button
                        onClick={() => !isOutOfStock && addToCart(product, 100)}
                        disabled={isOutOfStock}
                        className={`w-full flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[10.5px] font-bold transition-all active:scale-95 border ${
                          isOutOfStock
                            ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                            : 'border-brand-500 bg-brand-500 hover:bg-brand-600 text-white shadow-2xs'
                        }`}
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                        <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
