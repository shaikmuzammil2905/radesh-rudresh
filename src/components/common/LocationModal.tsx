'use client';

import React, { useState } from 'react';
import { MapPin, Check, X, Search, Navigation } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_LOCATIONS = [
  'Hyderabad, Telangana',
  'Madhapur, Hyderabad',
  'Gachibowli, Hyderabad',
  'Jubilee Hills, Hyderabad',
  'Banjara Hills, Hyderabad',
  'Kukatpally, Hyderabad',
  'Hitec City, Hyderabad',
  'Secunderabad, Telangana',
  'Kondapur, Hyderabad'
];

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const { selectedLocation, setSelectedLocation } = useApp();
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = POPULAR_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (loc: string) => {
    setSelectedLocation(loc);
    onClose();
  };

  const handleUseCurrentLocation = () => {
    setSelectedLocation('Gachibowli, Hyderabad (Current GPS)');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl animate-slide-up">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-500">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Select Delivery & Site Location</h3>
              <p className="text-xs text-gray-500">Discover workers and vendors nearest to you</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={handleUseCurrentLocation}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-brand-200 bg-brand-50/40 text-brand-600 hover:bg-brand-50 font-semibold text-xs transition-colors mb-3"
          >
            <Navigation className="w-4 h-4 text-brand-500 animate-pulse" />
            <span>Use Current GPS Location</span>
          </button>

          <div className="relative mb-3">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search area, city or landmark..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-100 border border-gray-200 rounded-xl focus:outline-hidden focus:border-brand-500 focus:bg-white"
            />
          </div>

          <div className="max-h-60 overflow-y-auto space-y-1">
            {filtered.map((loc) => {
              const isSelected = selectedLocation === loc;
              return (
                <button
                  key={loc}
                  onClick={() => handleSelect(loc)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-brand-50 text-brand-600 font-bold'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-500' : 'text-gray-400'}`} />
                    {loc}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-brand-500" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
