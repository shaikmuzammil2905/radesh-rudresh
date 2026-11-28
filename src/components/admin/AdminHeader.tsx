'use client';

import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  Cloud,
  CreditCard,
  Building,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  onToggleMobileMenu?: () => void;
  onSearch?: (query: string) => void;
}

export const AdminHeader: React.FC<HeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  onToggleMobileMenu,
  onSearch,
}) => {
  const [searchVal, setSearchVal] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'New Vendor Registered', time: '5m ago', desc: 'Mewar Marble Co. submitted GST & Aadhaar for approval' },
    { id: 2, title: 'Worker Onboarding Request', time: '18m ago', desc: 'Ramesh Sharma applied for Master Artisan / Cutter' },
    { id: 3, title: 'New Order Received', time: '1h ago', desc: 'Order #ORD-7729 for ₹70,800 received from Arvind Builders' },
    { id: 4, title: 'Withdrawal Request', time: '2h ago', desc: 'Kailash Stone World requested ₹45,000 settlement payout' },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
      {/* Left: Mobile Toggle & Breadcrumbs / Title */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-brand-500 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          {/* Breadcrumb matching Reference UI */}
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 mb-0.5">
              <span>Admin</span>
              {breadcrumbs.map((b, idx) => (
                <React.Fragment key={idx}>
                  <span>/</span>
                  {b.href ? (
                    <Link href={b.href} className="hover:text-brand-500 transition">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-gray-700 font-semibold">{b.label}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 mb-0.5">
              <span>Admin</span>
              <span>/</span>
              <span className="text-gray-700 font-semibold">{title}</span>
            </div>
          )}

          <h1 className="text-base sm:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>{title}</span>
          </h1>
        </div>
      </div>

      {/* Center: Global Search Bar matching Reference UI with Ctrl + K */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search vendors, products, orders, customers..."
            className="w-full pl-9 pr-14 py-2 bg-gray-50/80 border border-gray-200 focus:border-brand-500 focus:bg-white rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none transition shadow-2xs"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-bold text-gray-400 bg-gray-100 border border-gray-200 rounded">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Right Actions: S3 Badge, Razorpay, Notification Bell, Super Admin Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AWS S3 status badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/70 rounded-full text-[11px] font-bold text-amber-800">
          <Cloud className="w-3.5 h-3.5 text-amber-600" />
          <span>S3: rudra-infra</span>
        </div>

        {/* Razorpay status */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200/70 rounded-full text-[11px] font-bold text-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Razorpay Live</span>
        </div>

        {/* Notifications Icon with Badge 5 */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
              4
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-bold text-gray-900">Notifications</span>
                <span className="text-[10px] text-brand-600 font-bold bg-pink-50 px-2 py-0.5 rounded-full">4 New</span>
              </div>
              <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 hover:bg-gray-50 px-1 rounded-lg transition cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800">{n.title}</span>
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown matching Reference UI */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 border-l border-gray-200 hover:opacity-90 transition text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-pink-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
              RR
            </div>
            <div className="hidden sm:block text-left text-xs">
              <div className="font-bold text-gray-900 leading-tight">Super Admin</div>
              <div className="text-[10px] text-gray-400">Head of Operations</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="font-bold text-gray-900">Radhesh Rudresh</p>
                <p className="text-[10px] text-gray-500">admin@radheshrudresh.com</p>
              </div>
              <Link
                href="/admin/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl"
              >
                <Settings className="w-4 h-4 text-gray-400" />
                <span>Platform Settings</span>
              </Link>
              <Link
                href="/admin/staff"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl"
              >
                <User className="w-4 h-4 text-gray-400" />
                <span>Admin Roles & Staff</span>
              </Link>
              <div className="pt-1 border-t border-gray-100">
                <button
                  onClick={async () => {
                    try {
                      await fetch('/api/auth/logout', { method: 'POST' });
                    } catch {}
                    window.location.href = '/admin/login';
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-semibold text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
