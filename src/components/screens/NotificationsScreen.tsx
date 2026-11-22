'use client';

import React from 'react';
import {
  ArrowLeft,
  Bell,
  Package,
  HardHat,
  Tag,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markNotifAsRead, navigateTo } = useApp();

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4 text-brand-500" />;
      case 'booking':
        return <HardHat className="w-4 h-4 text-emerald-500" />;
      case 'offer':
        return <Tag className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <Header title="Notifications" showBack={true} showCart={true} />

      <div className="p-4 space-y-2.5">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => {
              markNotifAsRead(notif.id);
              if (notif.type === 'order' || notif.type === 'booking') {
                navigateTo('orders');
              }
            }}
            className={`p-3.5 rounded-2xl border transition cursor-pointer flex gap-3 shadow-2xs ${
              notif.read
                ? 'bg-white border-gray-100 opacity-80'
                : 'bg-white border-brand-200 ring-1 ring-brand-100'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              {getNotifIcon(notif.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-gray-900">{notif.title}</h4>
                <span className="text-[9.5px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                {notif.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
