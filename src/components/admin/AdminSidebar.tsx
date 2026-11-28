'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  Users,
  UserCheck,
  PackageCheck,
  ShoppingBag,
  TrendingUp,
  CheckCircle2,
  FileBarChart2,
  Wallet,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
  ShieldAlert,
  Headphones,
  Tag,
  Building2,
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
  pendingApprovalsCount?: number;
}

export const AdminSidebar: React.FC<SidebarProps> = ({ onCloseMobile, pendingApprovalsCount = 12 }) => {
  const pathname = usePathname();
  const router = useRouter();

  // 11 Core Navigation Items matching Reference UI and Scope of Work
  const primaryNav = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Vendors', href: '/admin/vendors', icon: Store },
    { label: 'Workers', href: '/admin/workers', icon: Users },
    { label: 'Customers', href: '/admin/customers', icon: UserCheck },
    { label: 'Products', href: '/admin/products', icon: PackageCheck },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Sales', href: '/admin/sales', icon: TrendingUp },
    {
      label: 'Approvals',
      href: '/admin/approvals',
      icon: CheckCircle2,
      badge: pendingApprovalsCount > 0 ? String(pendingApprovalsCount) : undefined,
    },
    { label: 'Reports', href: '/admin/reports', icon: FileBarChart2 },
    { label: 'Wallet', href: '/admin/wallet', icon: Wallet },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  // Additional Operations Tools
  const secondaryNav = [
    { label: 'Offers & Coupons', href: '/admin/offers', icon: Tag },
    { label: 'Support & Tickets', href: '/admin/support', icon: Headphones },
    { label: 'Sub-Admins & Staff', href: '/admin/staff', icon: ShieldAlert },
    { label: 'Homepage CMS', href: '/admin/pages', icon: Sparkles },
  ];

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (onCloseMobile) {
      onCloseMobile();
    }
    router.push(href);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-[#0B0F19] text-slate-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-slate-800/80 z-30 select-none shadow-2xl">
      {/* Brand Header */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between bg-[#080B12]">
          <Link
            href="/admin/dashboard"
            onClick={(e) => handleNav(e, '/admin/dashboard')}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 via-pink-600 to-rose-500 flex items-center justify-center p-1.5 shadow-md shadow-brand-500/20">
              <img
                src="/assets/rr_monogram.png"
                alt="Radhesh & Rudresh"
                className="w-full h-full object-contain filter brightness-200 invert"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="font-black text-xs tracking-wider text-white uppercase flex items-center gap-1.5">
                <span>RADHESH & RUDRESH</span>
              </div>
              <div className="text-[9.5px] font-bold tracking-widest text-brand-400 uppercase">
                SUPER ADMIN PANEL
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
          <div className="px-3 pt-2 pb-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Main Navigation
          </div>
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin/dashboard' && pathname?.startsWith(item.href));

            return (
              <button
                key={item.href}
                onClick={(e) => handleNav(e, item.href)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group text-left cursor-pointer ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25 font-bold'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white text-brand-600'
                        : 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="px-3 pt-4 pb-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Operations & Media
          </div>
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={(e) => handleNav(e, item.href)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-brand-400 font-bold'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Skyline & Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-[#080B12]">
        {/* City Skyline Graphic */}
        <div className="mb-3 px-2 py-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-400" />
            <span className="text-slate-300 font-medium">Jaipur HQ & Hubs</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Live" />
        </div>

        <div className="flex items-center justify-between gap-1 pt-1">
          <Link
            href="/"
            target="_blank"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition"
            title="Open Public Customer Marketplace"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl transition cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
