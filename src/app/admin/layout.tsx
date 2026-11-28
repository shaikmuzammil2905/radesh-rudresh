'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If on login page, render clean full-screen view without admin sidebar
  if (pathname === '/admin/login') {
    return <div className="w-full min-h-screen bg-slate-900">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 w-full font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10">
            <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <main className="flex-1 p-3 sm:p-5 lg:p-6 w-full max-w-[1700px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
