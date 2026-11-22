'use client';

import React from 'react';
import { Menu, ShoppingBag, ArrowLeft, Heart, PhoneCall, HelpCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ActiveScreen } from '@/types';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showWishlist?: boolean;
  showCart?: boolean;
  showMenu?: boolean;
  showHelp?: boolean;
  variant?: 'home' | 'standard' | 'minimal';
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  showWishlist = false,
  showCart = true,
  showMenu = false,
  showHelp = false,
  variant = 'standard'
}) => {
  const { cartCount, navigateTo, goBack, wishlist } = useApp();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  if (variant === 'home') {
    return (
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <button
          onClick={() => navigateTo('menu')}
          aria-label="Open menu"
          className="p-2 -ml-2 text-gray-800 hover:text-brand-500 rounded-full active:scale-95 transition-all"
        >
          <Menu className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Centered Brand Logo */}
        <div 
          onClick={() => navigateTo('home')} 
          className="flex flex-col items-center cursor-pointer select-none group"
        >
          <div className="flex items-center gap-1.5">
            <img 
              src="/assets/rr_monogram.png" 
              alt="Radhesh & Rudresh Logo" 
              className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <div className="text-[10px] font-black tracking-wider text-brand-500 uppercase mt-0.5">
            RADHESH & RUDRESH
          </div>
          <div className="text-[6.5px] font-medium tracking-tight text-gray-500 uppercase -mt-0.5">
            INFRA DEVELOPERS PVT. LTD.
          </div>
        </div>

        {/* Cart Button */}
        <button
          onClick={() => navigateTo('cart')}
          aria-label="View shopping cart"
          className="relative p-2 -mr-2 text-gray-800 hover:text-brand-500 rounded-full active:scale-95 transition-all"
        >
          <ShoppingBag className="w-6 h-6 stroke-[2]" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-scale-in">
              {cartCount}
            </span>
          )}
        </button>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="p-1.5 -ml-1.5 text-gray-800 hover:text-brand-500 rounded-full active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
        <h1 className="font-bold text-base text-gray-900 tracking-tight line-clamp-1">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-1">
        {showWishlist && (
          <button
            onClick={() => navigateTo('products')}
            aria-label="Wishlist"
            className="relative p-2 text-gray-700 hover:text-brand-500 rounded-full active:scale-95 transition-all"
          >
            <Heart className="w-5 h-5 stroke-[2]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
            )}
          </button>
        )}

        {showHelp && (
          <button
            onClick={() => navigateTo('support')}
            aria-label="Help & Support"
            className="p-2 text-gray-700 hover:text-brand-500 rounded-full active:scale-95 transition-all"
          >
            <HelpCircle className="w-5 h-5 stroke-[2]" />
          </button>
        )}

        {showCart && (
          <button
            onClick={() => navigateTo('cart')}
            aria-label="Shopping Cart"
            className="relative p-2 text-gray-700 hover:text-brand-500 rounded-full active:scale-95 transition-all"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
