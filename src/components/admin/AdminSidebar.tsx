'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  Users,
  Briefcase,
  Image as ImageIcon,
  HardDrive,
  MessageSquare,
  CreditCard,
  Settings,
  ExternalLink,
  LogOut,
  ShoppingBag,
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Homepage CMS', href: '/admin/pages', icon: Layers },
    { label: 'Products & Marble', href: '/admin/products', icon: Sparkles },
    { label: 'Master Artisans', href: '/admin/services', icon: Users },
    { label: 'Projects & Portfolio', href: '/admin/projects', icon: Briefcase },
    { label: 'Stone Gallery', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Media Library (S3)', href: '/admin/media', icon: HardDrive },
    { label: 'Customer Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { label: 'Orders & Bookings', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Razorpay Payments', href: '/admin/payments', icon: CreditCard },
    { label: 'Website Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-slate-800 z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <img
              src="/assets/rr_monogram.png"
              alt="Radhesh & Rudresh"
              className="w-8 h-8 object-contain filter drop-shadow"
            />
            <div>
              <div className="font-black text-xs tracking-wider text-pink-400 uppercase">
                RADHESH & RUDRESH
              </div>
              <div className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                ENTERPRISE CMS
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
          <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Content & Catalog
          </div>
          {navItems.slice(0, 7).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-500 to-pink-600 text-white shadow-sm font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="px-3 pt-4 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Operations & Financials
          </div>
          {navItems.slice(7).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-500 to-pink-600 text-white shadow-sm font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-1.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
            <span>View Public Website</span>
          </span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
