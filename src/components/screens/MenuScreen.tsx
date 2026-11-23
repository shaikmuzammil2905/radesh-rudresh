'use client';

import React from 'react';
import {
  User,
  ShoppingBag,
  Users,
  Heart,
  MapPin,
  Bell,
  HelpCircle,
  Info,
  FileText,
  Shield,
  LogOut,
  ChevronRight,
  Phone,
  Building,
  Sparkles
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';

export const MenuScreen: React.FC = () => {
  const {
    userName,
    userPhone,
    isLoggedIn,
    logoutUser,
    setIsAuthModalOpen,
    navigateTo,
    orders,
    bookings,
    wishlist,
    unreadNotifCount
  } = useApp();

  const menuSections = [
    {
      title: 'Orders & Bookings',
      items: [
        {
          label: 'My Marble & Tile Orders',
          icon: ShoppingBag,
          action: () => navigateTo('orders'),
          badge: orders.length > 0 ? `${orders.length}` : undefined
        },
        {
          label: 'My Worker Bookings',
          icon: Users,
          action: () => navigateTo('orders'),
          badge: bookings.length > 0 ? `${bookings.length}` : undefined
        },
        {
          label: 'Wishlist & Saved Stones',
          icon: Heart,
          action: () => navigateTo('products'),
          badge: wishlist.length > 0 ? `${wishlist.length}` : undefined
        }
      ]
    },
    {
      title: 'Preferences & Site Info',
      items: [
        {
          label: 'Saved Construction Site Addresses',
          icon: MapPin,
          action: () => navigateTo('addresses')
        },
        {
          label: 'Notifications',
          icon: Bell,
          action: () => navigateTo('notifications'),
          badge: unreadNotifCount > 0 ? `${unreadNotifCount} new` : undefined
        }
      ]
    },
    {
      title: 'Support & Company',
      items: [
        {
          label: 'Help & 24x7 Support',
          icon: HelpCircle,
          action: () => navigateTo('support')
        },
        {
          label: 'About Radhesh & Rudresh',
          icon: Building,
          action: () => navigateTo('support')
        },
        {
          label: 'View Brand Splash Screen',
          icon: Sparkles,
          action: () => navigateTo('splash')
        },
        {
          label: 'Terms & Conditions',
          icon: FileText,
          action: () => alert('Terms & Conditions: Standard construction supply terms apply.')
        },
        {
          label: 'Privacy Policy',
          icon: Shield,
          action: () => alert('Privacy Policy: We do not share customer site information.')
        }
      ]
    }
  ];

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <Header title="Account & Menu" showBack={false} showCart={true} />

      <div className="p-4 space-y-4">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-pink-50 border-2 border-brand-200 flex items-center justify-center text-brand-500 font-black text-lg">
              {userName ? userName.charAt(0) : 'U'}
            </div>
            <div>
              <h2 className="font-black text-sm text-gray-900">{userName}</h2>
              <p className="text-xs text-gray-500 font-medium">{userPhone}</p>
              <span className="inline-block mt-1 bg-emerald-50 text-emerald-700 text-[9.5px] font-bold px-2 py-0.5 rounded-full">
                ● Verified Customer
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="text-[11px] font-bold text-brand-500 hover:underline"
          >
            Edit
          </button>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-2 border border-gray-100 shadow-2xs">
            <h3 className="px-3 pt-2 pb-1 text-[10.5px] font-bold uppercase tracking-wider text-gray-400">
              {section.title}
            </h3>
            <div className="divide-y divide-gray-50">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIdx}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition text-left group active:scale-98"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-brand-50 group-hover:text-brand-500 flex items-center justify-center transition">
                        <Icon className="w-4 h-4 stroke-[2]" />
                      </div>
                      <span className="text-xs font-semibold text-gray-800 group-hover:text-brand-500">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="text-[10px] font-bold bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-500" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Brand Statement Banner */}
        <div className="bg-slate-100/60 p-4 rounded-2xl border border-gray-200/60 text-center select-none">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <img src="/assets/rr_monogram.png" alt="Logo" className="h-4 w-auto" />
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-800">
              RADHESH & RUDRESH
            </span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">
            BUILDING TRUST. CREATING FUTURES.
          </p>
          <p className="text-[10px] text-gray-500 mt-1">
            Version 2.4.0 (Mobile App Build 2026.11)
          </p>
        </div>

        {/* Logout Button */}
        {isLoggedIn ? (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to log out?')) {
                logoutUser();
                navigateTo('splash');
              }
            }}
            className="w-full py-3 rounded-2xl border border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold transition flex items-center justify-center gap-2 active:scale-98"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full py-3 rounded-2xl bg-brand-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Log In with OTP</span>
          </button>
        )}
      </div>
    </div>
  );
};
