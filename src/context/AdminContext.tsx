'use client';

import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
}

const AdminContext = createContext<AdminContextType>({
  mobileSidebarOpen: false,
  setMobileSidebarOpen: () => {},
  toggleMobileSidebar: () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  return (
    <AdminContext.Provider value={{ mobileSidebarOpen, setMobileSidebarOpen, toggleMobileSidebar }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
