'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Plus,
  Check,
  Building,
  Home,
  Briefcase,
  X
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';
import { Address } from '@/types';

export const SavedAddressesScreen: React.FC = () => {
  const {
    addresses,
    selectedAddress,
    setSelectedAddress,
    addAddress,
    goBack
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [label, setLabel] = useState<'Site' | 'Home' | 'Office' | 'Warehouse'>('Site');
  const [fullAddress, setFullAddress] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [state, setState] = useState('Telangana');
  const [pincode, setPincode] = useState('500032');
  const [phone, setPhone] = useState('+91 99887 76655');

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !fullAddress) return;

    addAddress({
      name,
      label,
      fullAddress,
      city,
      state,
      pincode,
      phone
    });

    setShowAddModal(false);
    setName('');
    setFullAddress('');
  };

  const getLabelIcon = (lbl: string) => {
    switch (lbl) {
      case 'Home':
        return <Home className="w-3.5 h-3.5" />;
      case 'Office':
        return <Briefcase className="w-3.5 h-3.5" />;
      default:
        return <Building className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <Header title="Saved Addresses" showBack={true} showCart={false} />

      <div className="p-4 space-y-3">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full p-3 rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50/40 text-brand-600 hover:bg-brand-50 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Construction Site / Delivery Address</span>
        </button>

        <div className="space-y-2.5">
          {addresses.map((addr) => {
            const isSelected = selectedAddress.id === addr.id;
            return (
              <div
                key={addr.id}
                onClick={() => setSelectedAddress(addr)}
                className={`bg-white rounded-2xl p-4 border transition cursor-pointer flex items-start justify-between shadow-2xs ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/20 ring-1 ring-brand-300'
                    : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-brand-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {getLabelIcon(addr.label)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-gray-900">{addr.name}</span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-gray-100 text-gray-600">
                        {addr.label}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {addr.fullAddress}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>

                    <p className="text-[10px] text-gray-500 mt-1">Phone: {addr.phone}</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'border-brand-500 bg-brand-500 text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-sm text-gray-900">Add Site Address</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewAddress} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Site / Building Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Villa 24, Rainbow Meadows"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-500"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Address Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Site', 'Home', 'Office', 'Warehouse'] as const).map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setLabel(lbl)}
                      className={`py-1.5 rounded-lg font-bold border transition ${
                        label === lbl
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Full Street Address</label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Plot No, Road No, Landmark"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-brand-500 text-white rounded-xl font-bold transition shadow-xs"
              >
                Save Site Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
