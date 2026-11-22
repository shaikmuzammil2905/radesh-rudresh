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
  Phone,
  Sparkles,
  Zap,
  X
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';
import { LocationModal } from '../common/LocationModal';
import { HERO_SLIDES, HOME_CATEGORIES, INITIAL_PRODUCTS, INITIAL_WORKERS, CUSTOMER_REVIEWS } from '@/data/mockData';
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
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Auto-rotate hero slider
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Touch swipe support for Hero Carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    } else if (diff < -50) {
      setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }
    setTouchStart(null);
  };

  const handleCategoryClick = (catId: ProductCategory) => {
    setSelectedCategory(catId);
    navigateTo('products');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  const handleWorkerClick = (worker: Worker) => {
    setSelectedWorker(worker);
    navigateTo('worker-profile');
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Top Header with Hamburger, Monogram, Cart */}
      <Header variant="home" />

      {/* Delivery / Site Location Bar */}
      <div className="bg-white px-4 py-2 border-b border-gray-100 flex items-center justify-between">
        <button
          onClick={() => setIsLocationOpen(true)}
          className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-brand-600 transition-colors py-0.5 group w-full"
        >
          <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
          <span className="font-semibold text-gray-800 line-clamp-1 text-left">
            Deliver to <span className="font-bold text-gray-900">{selectedLocation}</span>
          </span>
          <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-brand-500 shrink-0 ml-auto" />
        </button>
      </div>

      {/* Compact Search Bar with Search & Mic */}
      <div className="bg-white px-4 pt-2.5 pb-3 border-b border-gray-100">
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
          {globalSearchQuery ? (
            <button
              onClick={() => setGlobalSearchQuery('')}
              className="p-1.5 text-gray-400 hover:text-gray-700 absolute right-3 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => alert('Voice search ready: speak your preferred marble or worker requirement')}
              aria-label="Voice search"
              className="p-1.5 text-gray-400 hover:text-brand-500 absolute right-3 rounded-full"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 py-3.5 space-y-5">
        {/* SECTION 4: PREMIUM FULL-WIDTH HERO SLIDER */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-950 h-56 sm:h-60 select-none group"
        >
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000 ease-out"
                />
                {/* Deep gradient overlay for crystal clear text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25 p-4 sm:p-5 flex flex-col justify-center">
                  <span className="inline-block bg-brand-500 text-white text-[9.5px] font-black px-2.5 py-0.5 rounded-sm w-max mb-1 uppercase tracking-wider shadow-2xs">
                    {slide.badge}
                  </span>
                  <div className="text-[10px] font-extrabold text-pink-300 uppercase tracking-wider mt-0.5">
                    {slide.highlightText}
                  </div>
                  <h2 className="text-white text-lg font-black leading-tight max-w-[240px] mt-0.5 drop-shadow-sm">
                    {slide.title}
                  </h2>
                  <p className="text-gray-200 text-xs mt-1 font-medium max-w-[230px] line-clamp-2 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <button
                    onClick={() => {
                      if (slide.targetCategory) {
                        setSelectedCategory(slide.targetCategory);
                        navigateTo('products');
                      } else if (slide.targetScreen) {
                        navigateTo(slide.targetScreen);
                      } else {
                        navigateTo('products');
                      }
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md w-max active:scale-95"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Carousel Pagination Dots */}
          <div className="absolute bottom-3 right-3.5 z-20 flex items-center gap-1.5">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeSlide ? 'w-5 bg-brand-500' : 'w-1.5 bg-white/70 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* TWO PRIMARY BUSINESS SERVICE CARDS */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Buy Marbles & Tiles */}
          <button
            onClick={() => {
              setSelectedCategory('All');
              navigateTo('products');
            }}
            className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-2xs hover:shadow-xs hover:border-brand-200 transition-all text-left flex flex-col justify-between group active:scale-98"
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
            className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-2xs hover:shadow-xs hover:border-brand-200 transition-all text-left flex flex-col justify-between group active:scale-98"
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

        {/* SECTION 5: CATEGORY SECTION WITH RELATED IMAGES ("Our Categories") */}
        <section aria-labelledby="categories-heading" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="categories-heading" className="font-black text-sm sm:text-base text-gray-900 tracking-tight">
                Our Categories
              </h2>
              <p className="text-[11px] text-gray-500">
                Explore our wide range of marbles & tiles
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                navigateTo('products');
              }}
              className="text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* 6 Responsive Image-Based Category Cards in 2 Columns */}
          <div className="grid grid-cols-2 gap-3">
            {HOME_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="relative rounded-2xl overflow-hidden aspect-[4/3.2] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300 group active:scale-95 border border-gray-100"
              >
                {/* Background Category Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    {cat.badge ? (
                      <span className="bg-brand-500 text-white text-[8px] font-black px-2 py-0.5 rounded-xs uppercase tracking-wider shadow-2xs">
                        {cat.badge}
                      </span>
                    ) : (
                      <span />
                    )}
                    <div className="w-6 h-6 rounded-full bg-white/25 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-brand-500 transition-colors ml-auto">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-xs sm:text-sm font-black tracking-tight drop-shadow-xs">
                      {cat.title}
                    </h3>
                    <p className="text-gray-300 text-[9.5px] font-medium line-clamp-1 mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURE HIGHLIGHTS BADGES */}
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

        {/* SECTION 6: BEST SELLING MARBLES & TILES */}
        <section aria-labelledby="bestsellers-heading" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="bestsellers-heading" className="font-black text-sm text-gray-900 tracking-tight">
                Best Selling Marbles & Stones
              </h2>
              <p className="text-[11px] text-gray-500">Hand-picked luxury slabs directly from premium quarries</p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                navigateTo('products');
              }}
              className="text-xs font-bold text-brand-500 hover:text-brand-600"
            >
              See More
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {INITIAL_PRODUCTS.slice(0, 4).map((product) => {
              const wishlisted = isWishlisted(product.id);
              const isLimited = product.stockStatus === 'Limited Stock';

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
                    {isLimited && (
                      <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-2xs">
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
                      className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-2 border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white rounded-xl text-[10.5px] font-bold transition-all active:scale-95 shadow-2xs"
                    >
                      <Plus className="w-3 h-3 stroke-[2.5]" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 7: WORKER BOOKING PROMOTIONAL SECTION */}
        <section aria-labelledby="worker-booking-heading" className="space-y-3">
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-4 text-white shadow-sm flex items-center justify-between">
            <div className="max-w-[210px]">
              <span className="bg-white/20 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                INSTANT SITE DISPATCH
              </span>
              <h3 id="worker-booking-heading" className="font-black text-sm mt-1.5 leading-snug">
                Need a Marble or Tile Fitter Today?
              </h3>
              <p className="text-[11px] text-pink-100 mt-1 max-w-[190px] leading-relaxed">
                Book verified master technicians near your construction site with live ETA.
              </p>
              <button
                onClick={() => {
                  setSelectedWorkerCategory('All');
                  navigateTo('nearby-workers');
                }}
                className="mt-3 inline-flex items-center gap-1.5 bg-white text-brand-600 hover:bg-pink-50 px-4 py-2 rounded-full text-xs font-bold transition shadow-xs active:scale-95"
              >
                <span>View Nearby Workers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg bg-pink-100">
              <img
                src="/assets/worker_banner_artisan.png"
                alt="Skilled Worker"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Verified Workers Preview List */}
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
                        className="w-full h-full object-cover object-top"
                      />
                      {worker.isOnline && (
                        <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs text-gray-900">{worker.name}</h4>
                        {worker.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
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
                      className="mt-1 px-3 py-1 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-[10px] font-bold shadow-2xs"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Trust & Guarantee Banner matching Reference */}
        <div className="bg-slate-100/70 p-3.5 rounded-2xl border border-gray-200/60 text-center">
          <div className="flex items-center justify-center gap-2 text-brand-500 font-black text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>RADHESH & RUDRESH QUALITY GUARANTEE</span>
          </div>
          <p className="text-[10.5px] text-gray-600">
            Every marble slab is quarry-inspected and every technician is skill-tested with background verification.
          </p>
        </div>

        {/* SECTION 8: VERIFIED CUSTOMER REVIEWS */}
        <section aria-labelledby="reviews-heading" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="reviews-heading" className="font-black text-sm text-gray-900 tracking-tight">
                Verified Customer Reviews
              </h2>
              <p className="text-[11px] text-gray-500">
                What site engineers and homeowners say about our quality
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-brand-50 border border-brand-200 shrink-0">
                      <img
                        src={rev.avatar}
                        alt={rev.authorName}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{rev.authorName}</h4>
                      <p className="text-[10px] text-gray-500">
                        {rev.authorRole} • {rev.authorLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="pt-1.5 border-t border-gray-50 flex items-center justify-between text-[10px]">
                  <span className="text-brand-600 font-bold bg-brand-50 px-2 py-0.5 rounded-md">
                    {rev.stoneUsed}
                  </span>
                  <span className="text-gray-400">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
    </div>
  );
};
