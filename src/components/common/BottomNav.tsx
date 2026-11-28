'use client';

import React from 'react';
import { Home, ShoppingBag, Users, ClipboardList, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ActiveScreen } from '@/types';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo } = useApp();

  // Hidden on screens where a primary fixed bottom CTA exists
  const hideOnScreens: ActiveScreen[] = [
    'splash',
    'booking-confirmation',
    'book-worker',
    'checkout',
    'product-detail',
    'worker-profile'
  ];
  if (hideOnScreens.includes(currentScreen)) {
    return null;
  }

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      screen: 'home' as ActiveScreen,
      isActive: currentScreen === 'home',
    },
    {
      id: 'shop',
      label: 'Shop',
      icon: ShoppingBag,
      screen: 'products' as ActiveScreen,
      isActive: currentScreen === 'products' || currentScreen === 'product-detail' || currentScreen === 'cart',
    },
    {
      id: 'workers',
      label: 'Book Worker',
      icon: Users,
      screen: 'worker-categories' as ActiveScreen,
      isActive: currentScreen === 'worker-categories' || currentScreen === 'nearby-workers' || currentScreen === 'worker-profile',
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ClipboardList,
      screen: 'orders' as ActiveScreen,
      isActive: currentScreen === 'orders',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      screen: 'menu' as ActiveScreen,
      isActive: currentScreen === 'menu' || currentScreen === 'profile' || currentScreen === 'addresses',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.screen)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 ${
                active ? 'text-brand-500 font-semibold' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-500 rounded-full" />
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${active ? 'font-bold text-brand-500' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
