'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import { X } from 'lucide-react';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { mobileSidebarOpen, setMobileSidebarOpen } = useAdmin();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top whenever navigating to a different admin section
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    // Also ensure mobile sidebar closes on page navigation
    setMobileSidebarOpen(false);
  }, [pathname, setMobileSidebarOpen]);

  // If on login page, render clean full-screen view without admin sidebar
  if (pathname === '/admin/login') {
    return <div className="w-full min-h-screen bg-slate-900">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 w-full font-sans overflow-x-hidden">
      {/* Desktop Sidebar (Fixed) */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Menu Bar with all Admin Sections */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-3 text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800 z-50"
              aria-label="Close Admin Menu"
            >
              <X className="w-4 h-4" />
            </button>
            <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Workspace with Instant Scroll-to-Top on Page Nav */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden"
      >
        <main className="flex-1 p-2 sm:p-5 lg:p-6 w-full max-w-[1700px] mx-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
}
