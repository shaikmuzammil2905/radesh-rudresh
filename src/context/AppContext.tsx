'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ActiveScreen,
  Product,
  Worker,
  WorkerBooking,
  ProductOrder,
  CartItem,
  Address,
  AppNotification,
  WorkerCategory,
  ProductCategory
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_WORKERS,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS,
  SAVED_ADDRESSES,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface AppContextType {
  // Navigation
  currentScreen: ActiveScreen;
  screenHistory: ActiveScreen[];
  navigateTo: (screen: ActiveScreen) => void;
  goBack: () => void;
  
  // Selection
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  selectedWorker: Worker | null;
  setSelectedWorker: (w: Worker | null) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  selectedWorkerCategory: WorkerCategory | 'All';
  setSelectedWorkerCategory: (cat: WorkerCategory | 'All') => void;
  
  // Confirmation state
  lastConfirmedBooking: WorkerBooking | null;
  setLastConfirmedBooking: (b: WorkerBooking | null) => void;
  lastConfirmedOrder: ProductOrder | null;
  setLastConfirmedOrder: (o: ProductOrder | null) => void;
  
  // Search & Location
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  availableNowFilter: boolean;
  setAvailableNowFilter: (val: boolean) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, areaSqFt?: number) => void;
  updateCartArea: (productId: string, areaSqFt: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotalSqFt: number;
  cartTotalAmount: number;
  cartCount: number;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  
  // Orders & Bookings
  orders: ProductOrder[];
  bookings: WorkerBooking[];
  addOrder: (order: Omit<ProductOrder, 'id' | 'createdAt' | 'status' | 'trackingStep'>) => ProductOrder;
  addBooking: (booking: Omit<WorkerBooking, 'id' | 'createdAt' | 'status' | 'trackingStep'>) => WorkerBooking;
  cancelBooking: (bookingId: string) => void;
  cancelOrder: (orderId: string) => void;
  
  // Addresses
  addresses: Address[];
  selectedAddress: Address;
  setSelectedAddress: (addr: Address) => void;
  addAddress: (addr: Omit<Address, 'id'>) => void;
  
  // Notifications
  notifications: AppNotification[];
  unreadNotifCount: number;
  markNotifAsRead: (id: string) => void;
  
  // Auth
  isLoggedIn: boolean;
  loginUser: (phone: string, name?: string) => void;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  userName: string;
  userPhone: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('splash');
  const [screenHistory, setScreenHistory] = useState<ActiveScreen[]>(['splash']);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[0]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(INITIAL_WORKERS[0]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [selectedWorkerCategory, setSelectedWorkerCategory] = useState<WorkerCategory | 'All'>('All');
  
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState<WorkerBooking | null>(INITIAL_BOOKINGS[0]);
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<ProductOrder | null>(INITIAL_ORDERS[0]);
  
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Hyderabad, Telangana');
  const [availableNowFilter, setAvailableNowFilter] = useState(false);
  
  // Cart
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], areaSqFt: 100 },
    { product: INITIAL_PRODUCTS[1], areaSqFt: 100 }
  ]);
  
  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3']);
  
  // Orders & Bookings
  const [orders, setOrders] = useState<ProductOrder[]>(INITIAL_ORDERS);
  const [bookings, setBookings] = useState<WorkerBooking[]>(INITIAL_BOOKINGS);
  
  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(SAVED_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(SAVED_ADDRESSES[0]);
  
  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  
  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Muzammil Shaik');
  const [userPhone, setUserPhone] = useState('+91 99887 76655');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigateTo = (screen: ActiveScreen) => {
    if (screen === currentScreen) {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      return;
    }
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop();
      const previousScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  const addToCart = (product: Product, areaSqFt = 100) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, areaSqFt: item.areaSqFt + areaSqFt }
            : item
        );
      }
      return [...prev, { product, areaSqFt }];
    });
  };

  const updateCartArea = (productId: string, areaSqFt: number) => {
    if (areaSqFt <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, areaSqFt } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.length;
  const cartTotalSqFt = cart.reduce((acc, item) => acc + item.areaSqFt, 0);
  const cartTotalAmount = cart.reduce(
    (acc, item) => acc + item.areaSqFt * item.product.pricePerSqFt,
    0
  );

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const addOrder = (orderData: Omit<ProductOrder, 'id' | 'createdAt' | 'status' | 'trackingStep'>) => {
    const newId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: ProductOrder = {
      ...orderData,
      id: newId,
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'Placed',
      trackingStep: 1
    };
    setOrders((prev) => [newOrder, ...prev]);
    setLastConfirmedOrder(newOrder);
    clearCart();

    // Directly sync new customer order to backend CMS & Admin Panel
    fetch('/api/cms/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'order', order: newOrder }),
    }).catch(() => {});

    return newOrder;
  };

  const addBooking = (bookingData: Omit<WorkerBooking, 'id' | 'createdAt' | 'status' | 'trackingStep'>) => {
    const newId = `RRW${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: WorkerBooking = {
      ...bookingData,
      id: newId,
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'Accepted',
      trackingStep: 1
    };
    setBookings((prev) => [newBooking, ...prev]);
    setLastConfirmedBooking(newBooking);

    // Directly sync new artisan booking to backend CMS & Admin Panel
    fetch('/api/cms/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'booking', booking: newBooking }),
    }).catch(() => {});

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
    );
  };

  const addAddress = (addrData: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addrData,
      id: `addr-${Date.now()}`
    };
    setAddresses((prev) => [newAddr, ...prev]);
  };

  const markNotifAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const loginUser = (phone: string, name = 'User') => {
    setIsLoggedIn(true);
    setUserPhone(phone);
    setUserName(name);
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        screenHistory,
        navigateTo,
        goBack,
        selectedProduct,
        setSelectedProduct,
        selectedWorker,
        setSelectedWorker,
        selectedCategory,
        setSelectedCategory,
        selectedWorkerCategory,
        setSelectedWorkerCategory,
        lastConfirmedBooking,
        setLastConfirmedBooking,
        lastConfirmedOrder,
        setLastConfirmedOrder,
        globalSearchQuery,
        setGlobalSearchQuery,
        selectedLocation,
        setSelectedLocation,
        availableNowFilter,
        setAvailableNowFilter,
        cart,
        addToCart,
        updateCartArea,
        removeFromCart,
        clearCart,
        cartTotalSqFt,
        cartTotalAmount,
        cartCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        bookings,
        addOrder,
        addBooking,
        cancelBooking,
        cancelOrder,
        addresses,
        selectedAddress,
        setSelectedAddress,
        addAddress,
        notifications,
        unreadNotifCount,
        markNotifAsRead,
        isLoggedIn,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isDrawerOpen,
        setIsDrawerOpen,
        userName,
        userPhone
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
