'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/common/BottomNav';
import { DrawerMenu } from '@/components/common/DrawerMenu';
import { AuthModal } from '@/components/common/AuthModal';

// Screens
import { SplashScreen } from '@/components/screens/SplashScreen';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { ProductListingScreen } from '@/components/screens/ProductListingScreen';
import { ProductDetailScreen } from '@/components/screens/ProductDetailScreen';
import { CartScreen } from '@/components/screens/CartScreen';
import { CheckoutScreen } from '@/components/screens/CheckoutScreen';
import { WorkerCategoriesScreen } from '@/components/screens/WorkerCategoriesScreen';
import { NearbyWorkersScreen } from '@/components/screens/NearbyWorkersScreen';
import { WorkerProfileScreen } from '@/components/screens/WorkerProfileScreen';
import { WorkerBookingScreen } from '@/components/screens/WorkerBookingScreen';
import { BookingConfirmationScreen } from '@/components/screens/BookingConfirmationScreen';
import { OrdersAndBookingsScreen } from '@/components/screens/OrdersAndBookingsScreen';
import { MenuScreen } from '@/components/screens/MenuScreen';
import { SavedAddressesScreen } from '@/components/screens/SavedAddressesScreen';
import { NotificationsScreen } from '@/components/screens/NotificationsScreen';
import { SupportScreen } from '@/components/screens/SupportScreen';

export default function AppMain() {
  const { currentScreen } = useApp();

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'home':
        return <HomeScreen />;
      case 'products':
        return <ProductListingScreen />;
      case 'product-detail':
        return <ProductDetailScreen />;
      case 'cart':
        return <CartScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'worker-categories':
        return <WorkerCategoriesScreen />;
      case 'nearby-workers':
        return <NearbyWorkersScreen />;
      case 'worker-profile':
        return <WorkerProfileScreen />;
      case 'book-worker':
        return <WorkerBookingScreen />;
      case 'booking-confirmation':
        return <BookingConfirmationScreen />;
      case 'orders':
        return <OrdersAndBookingsScreen />;
      case 'menu':
      case 'profile':
        return <MenuScreen />;
      case 'addresses':
        return <SavedAddressesScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'support':
        return <SupportScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white relative flex flex-col shadow-none sm:shadow-xl sm:border-x sm:border-gray-100 overflow-x-hidden">
      <main className="flex-1">
        {renderCurrentScreen()}
      </main>
      <BottomNav />
      <DrawerMenu />
      <AuthModal />
    </div>
  );
}
