'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  ChevronDown,
  Search,
  Mic,
  ArrowRight,
  Layers,
  HardHat,
  ShieldCheck,
  Clock,
  CreditCard,
  Star,
  Plus,
  Heart,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';
import { LocationModal } from '../common/LocationModal';
import { INITIAL_PRODUCTS, INITIAL_WORKERS } from '@/data/mockData';
import { ProductCategory, Product, Worker } from '@/types';

export const HomeScreen: React.FC = () => {
  const {
    navigateTo,
    selectedLocation,
    setSelectedProduct,
    setSelectedWorker,
    setSelectedCategory,
    setSelectedWorkerCategory,
    addToCart,
    toggleWishlist,
    isWishlisted,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Premium Marbles & Tiles',
      subtitle: 'for Your Dream Space',
      cta: 'Shop Now',
      action: () => {
        setSelectedCategory('Marble');
        navigateTo('products');
      },
      image: '/assets/hero_banner.png',
      badge: 'Direct Factory Prices'
    },
    {
      title: 'Find Skilled Workers',
      subtitle: 'Instant Booking Near You',
      cta: 'Book Worker',
      action: () => {
        navigateTo('worker-categories');
      },
      image: '/assets/worker_banner.png',
      badge: 'Background Verified'
    },
    {
      title: 'Trusted Quality & Service',
      subtitle: 'Building Trust. Creating Futures.',
      cta: 'Explore Catalog',
      action: () => {
        setSelectedCategory('All');
        navigateTo('products');
      },
      image: '/assets/splash_slabs.png',
      badge: '100% Quality Assured'
    }
  ];

  // Auto-rotate hero banners
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const categories: { name: ProductCategory; label: string; image: string }[] = [
    { name: 'Marble', label: 'Marbles', image: '/assets/cat_marble.png' },
    { name: 'Granite', label: 'Granite', image: '/assets/cat_granite.png' },
    { name: 'Tiles', label: 'Tiles', image: '/assets/cat_tiles.png' },
    { name: 'Quartz', label: 'Quartz', image: '/assets/cat_quartz.png' }
  ];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  const handleWorkerClick = (worker: Worker) => {
    setSelectedWorker(worker);
    navigateTo('worker-profile');
  };

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      {/* Top App Header with Monogram */}
      <Header variant="home" />

      {/* Delivery / Site Location Bar */}
      <div className="bg-white px-4 py-1.5 border-b border-gray-100 flex items-center justify-between">
        <button
          onClick={() => setIsLocationOpen(true)}
          className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-brand-600 transition-colors py-1 group"
        >
          <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
          <span className="font-semibold text-gray-800 line-clamp-1">
            Deliver to {selectedLocation}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-500" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-4 pt-2.5 pb-3">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search marbles, tiles, workers..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigateTo('products');
              }
            }}
            className="w-full bg-gray-100/90 hover:bg-gray-100 focus:bg-white text-xs pl-10 pr-10 py-2.5 rounded-full border border-gray-200/80 focus:border-brand-500 focus:outline-hidden transition-all placeholder:text-gray-400"
          />
          <button
            onClick={() => {
              alert('Voice Search Activated: Speak "Italian Marble" or "Tile Fitter"');
            }}
            aria-label="Voice search"
            className="p-1.5 text-gray-400 hover:text-brand-500 absolute right-3 rounded-full"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 py-3 space-y-4">
        {/* Promotional Hero Slider */}
        <div className="relative rounded-2xl overflow-hidden shadow-xs border border-gray-100 bg-gray-900 h-44 select-none">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent p-4 flex flex-col justify-center">
                <span className="inline-block bg-brand-500/90 text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full w-max mb-1 uppercase tracking-wider">
                  {slide.badge}
                </span>
                <h2 className="text-white text-base font-black leading-tight max-w-[210px]">
                  {slide.title}
                </h2>
                <p className="text-gray-200 text-xs mt-0.5 font-medium max-w-[200px]">
                  {slide.subtitle}
                </p>
                <button
                  onClick={slide.action}
                  className="mt-2.5 inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm w-max active:scale-95"
                >
                  <span>{slide.cta}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {/* Slider Pagination Dots */}
          <div className="absolute bottom-2.5 right-3 z-20 flex gap-1.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeSlide ? 'w-4 bg-brand-500' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Two Major Service Cards from Reference */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Buy Marbles & Tiles */}
          <button
            onClick={() => {
              setSelectedCategory('All');
              navigateTo('products');
            }}
            className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-2xs hover:shadow-xs transition-all text-left flex flex-col justify-between group active:scale-98"
          >
            <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-brand-500 mb-2 group-hover:bg-brand-500 group-hover:text-white transition-colors">
              <Layers className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-black text-gray-900 text-xs group-hover:text-brand-500 transition-colors">
                Buy Marbles & Tiles
              </div>
              <div className="text-[10px] text-gray-500 font-medium mt-0.5">
                (E-commerce)
              </div>
            </div>
            <div className="mt-2 flex items-center justify-end text-brand-500">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Card 2: Book Workers */}
          <button
            onClick={() => navigateTo('worker-categories')}
            className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-2xs hover:shadow-xs transition-all text-left flex flex-col justify-between group active:scale-98"
          >
            <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-brand-500 mb-2 group-hover:bg-brand-500 group-hover:text-white transition-colors">
              <HardHat className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-black text-gray-900 text-xs group-hover:text-brand-500 transition-colors">
                Book Workers
              </div>
              <div className="text-[10px] text-gray-500 font-medium mt-0.5">
                (Instant Booking)
              </div>
            </div>
            <div className="mt-2 flex items-center justify-end text-brand-500">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>

        {/* Feature Highlights Row */}
        <div className="bg-white rounded-2xl p-3 border border-gray-100 grid grid-cols-4 gap-2 text-center shadow-2xs">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-pink-50 text-brand-500 flex items-center justify-center mb-1">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-gray-800 leading-tight">
              Wide Collection
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-pink-50 text-brand-500 flex items-center justify-center mb-1">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-gray-800 leading-tight">
              Verified Workers
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-pink-50 text-brand-500 flex items-center justify-center mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-gray-800 leading-tight">
              Instant Booking
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-pink-50 text-brand-500 flex items-center justify-center mb-1">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-gray-800 leading-tight">
              Secure Payment
            </span>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="font-black text-gray-900 text-xs tracking-tight">Popular Categories</h3>
            <button
              onClick={() => {
                setSelectedCategory('All');
                navigateTo('products');
              }}
              className="text-[11px] font-bold text-brand-500 hover:text-brand-600"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  navigateTo('products');
                }}
                className="flex flex-col items-center group active:scale-95 transition-transform"
              >
                <div className="w-full aspect-4/3 rounded-xl overflow-hidden border border-gray-200 mb-1 shadow-2xs group-hover:border-brand-500 transition-colors">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-[10.5px] font-bold text-gray-800 group-hover:text-brand-500">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Best Selling Marbles Section */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h3 className="font-black text-gray-900 text-xs tracking-tight">Best Selling Marbles & Stones</h3>
              <p className="text-[10px] text-gray-500">Hand-picked luxury slabs directly from premium quarries</p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                navigateTo('products');
              }}
              className="text-[11px] font-bold text-brand-500 hover:text-brand-600"
            >
              See More
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {INITIAL_PRODUCTS.slice(0, 4).map((product) => {
              const wishlisted = isWishlisted(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs flex flex-col justify-between group hover:shadow-xs transition-all"
                >
                  <div
                    onClick={() => handleProductClick(product)}
                    className="relative cursor-pointer aspect-4/3 overflow-hidden bg-gray-50"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-gray-600 hover:text-brand-500 shadow-xs"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          wishlisted ? 'fill-brand-500 text-brand-500' : ''
                        }`}
                      />
                    </button>
                    {product.stockStatus === 'Limited Stock' && (
                      <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-[8.5px] font-black px-1.5 py-0.5 rounded-sm">
                        Limited
                      </span>
                    )}
                  </div>

                  <div className="p-2.5 flex flex-col flex-1 justify-between">
                    <div onClick={() => handleProductClick(product)} className="cursor-pointer">
                      <h4 className="font-bold text-gray-900 text-xs line-clamp-1 group-hover:text-brand-500 transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xs font-black text-brand-500">
                          ₹{product.pricePerSqFt}
                        </span>
                        <span className="text-[9.5px] text-gray-500 font-medium">
                          / Sq.ft
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-gray-700">{product.rating}</span>
                        <span>({product.reviewCount})</span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product, 100)}
                      className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-2 border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white rounded-xl text-[10.5px] font-bold transition-all active:scale-95"
                    >
                      <Plus className="w-3 h-3 stroke-[2.5]" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Workers Banner / Card */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <span className="bg-white/20 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Instant Site Dispatch
            </span>
            <h3 className="font-black text-sm mt-1">Need a Marble or Tile Fitter Today?</h3>
            <p className="text-[11px] text-pink-100 mt-0.5 max-w-[200px]">
              Book verified workers near your construction site with live ETA.
            </p>
            <button
              onClick={() => {
                setSelectedWorkerCategory('All');
                navigateTo('nearby-workers');
              }}
              className="mt-2.5 inline-flex items-center gap-1.5 bg-white text-brand-600 hover:bg-pink-50 px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-xs active:scale-95"
            >
              <span>View Nearby Workers</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 border-white/30 shadow-md">
            <img
              src="/assets/worker_tile_fitter.png"
              alt="Skilled Worker"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Verified Workers Preview */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-black text-gray-900 text-xs">Top Rated Workers Near You</h3>
              <p className="text-[10px] text-gray-500">Available for instant or scheduled site visits</p>
            </div>
            <button
              onClick={() => navigateTo('nearby-workers')}
              className="text-[11px] font-bold text-brand-500 hover:text-brand-600"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {INITIAL_WORKERS.slice(0, 3).map((worker) => (
              <div
                key={worker.id}
                onClick={() => handleWorkerClick(worker)}
                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-brand-200 hover:bg-pink-50/20 transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    <img
                      src={worker.photo}
                      alt={worker.name}
                      className="w-full h-full object-cover"
                    />
                    {worker.isOnline && (
                      <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs text-gray-900">{worker.name}</h4>
                      {worker.verified && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      )}
                    </div>
                    <p className="text-[10.5px] font-semibold text-brand-500">{worker.skill}</p>
                    <div className="flex items-center gap-2 text-[9.5px] text-gray-500 mt-0.5">
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        {worker.rating}
                      </span>
                      <span>•</span>
                      <span>{worker.distanceKm} km away</span>
                      <span>•</span>
                      <span>{worker.completedJobs} jobs done</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-gray-900">
                    ₹{worker.ratePerDay}
                  </div>
                  <div className="text-[9px] text-gray-500">/ Day</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWorker(worker);
                      navigateTo('book-worker');
                    }}
                    className="mt-1 px-2.5 py-1 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-[9.5px] font-bold shadow-2xs"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Trust Section */}
        <div className="bg-slate-100/70 p-3.5 rounded-2xl border border-gray-200/60 text-center">
          <div className="flex items-center justify-center gap-2 text-brand-500 font-black text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Radhesh & Rudresh Quality Guarantee</span>
          </div>
          <p className="text-[10.5px] text-gray-600">
            Every marble slab is quarry-inspected and every technician is skill-tested with background verification.
          </p>
        </div>
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
    </div>
  );
};
