'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Package,
  HardHat,
  Calendar,
  Clock,
  Phone,
  CheckCircle,
  Truck,
  Building,
  Star,
  X,
  AlertCircle
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';
import { ProductOrder, WorkerBooking, OrderStatus, BookingStatus } from '@/types';

export const OrdersAndBookingsScreen: React.FC = () => {
  const {
    orders,
    bookings,
    cancelBooking,
    cancelOrder,
    navigateTo,
    setSelectedProduct
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'workers'>('products');
  const [selectedOrder, setSelectedOrder] = useState<ProductOrder | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<WorkerBooking | null>(null);
  const [ratingModal, setRatingModal] = useState<string | null>(null);

  const getOrderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Dispatched':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Packed':
      case 'Confirmed':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  const getBookingStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'On the Way':
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Accepted':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Top Header matching Screen 8: Back, My Orders & Bookings */}
      <Header
        title="My Orders & Bookings"
        showBack={true}
        showCart={true}
      />

      {/* Segmented Tab Bar matching Screen 8: Products | Worker Bookings */}
      <div className="bg-white px-4 py-2.5 border-b border-gray-100 sticky top-[57px] z-30 shadow-2xs">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2 rounded-lg text-xs font-black transition-all duration-200 ${
              activeTab === 'products'
                ? 'bg-brand-500 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Products ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('workers')}
            className={`flex-1 py-2 rounded-lg text-xs font-black transition-all duration-200 ${
              activeTab === 'workers'
                ? 'bg-brand-500 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Worker Bookings ({bookings.length})
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Products Tab Content matching Screen 8 */}
        {activeTab === 'products' && (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-200/80 my-4">
                <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-xs">No product orders placed yet.</p>
                <button
                  onClick={() => navigateTo('products')}
                  className="mt-3 px-4 py-1.5 bg-brand-500 text-white rounded-xl text-xs font-bold"
                >
                  Shop Marbles & Tiles
                </button>
              </div>
            ) : (
              orders.map((order) => {
                const firstItem = order.items[0];
                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs hover:shadow-xs transition-all cursor-pointer group active:scale-98"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                          <img
                            src={firstItem?.product.image || '/assets/prod_italian_white.png'}
                            alt={firstItem?.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <h4 className="font-bold text-xs text-gray-900 group-hover:text-brand-500 transition-colors">
                            {firstItem?.product.name || 'Marble Order'}
                            {order.items.length > 1 && ` + ${order.items.length - 1} more`}
                          </h4>

                          <div className="text-xs font-black text-gray-800 mt-0.5">
                            ₹{order.totalAmount.toLocaleString()}{' '}
                            <span className="text-[10px] text-gray-500 font-normal">
                              ({firstItem?.areaSqFt} Sq.ft)
                            </span>
                          </div>

                          <div className="mt-1">
                            <span
                              className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${getOrderStatusBadge(
                                order.status
                              )}`}
                            >
                              {order.status === 'Dispatched' ? 'In Transit' : order.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Worker Bookings Tab Content matching Screen 8 */}
        {activeTab === 'workers' && (
          <div className="space-y-3">
            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-200/80 my-4">
                <HardHat className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-xs">No worker bookings made yet.</p>
                <button
                  onClick={() => navigateTo('worker-categories')}
                  className="mt-3 px-4 py-1.5 bg-brand-500 text-white rounded-xl text-xs font-bold"
                >
                  Book a Worker
                </button>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs hover:shadow-xs transition-all cursor-pointer group active:scale-98"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        <img
                          src={booking.workerPhoto || '/assets/worker_tile_fitter.png'}
                          alt={booking.workerName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h4 className="font-bold text-xs text-gray-900 group-hover:text-brand-500 transition-colors">
                          {booking.workerSkill || booking.workerName}
                        </h4>

                        <div className="text-[11px] text-gray-600 mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span>{booking.date}, 9:00 AM</span>
                        </div>

                        <div className="mt-1">
                          <span
                            className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${getBookingStatusBadge(
                              booking.status
                            )}`}
                          >
                            {booking.status === 'Accepted' ? 'Upcoming' : booking.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Product Order Tracking Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl p-5 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-black text-sm text-gray-900">Order #{selectedOrder.id}</h3>
                <p className="text-[10px] text-gray-500">Placed on {selectedOrder.createdAt}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tracking Progress Bar */}
            <div className="py-4">
              <h4 className="font-bold text-xs text-gray-900 mb-3">Live Order Tracking</h4>
              <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-200">
                {[
                  { step: 'Order Placed', desc: 'Order received by vendor', done: true },
                  { step: 'Confirmed & Packed', desc: 'Slabs measured and packaged', done: true },
                  { step: 'Dispatched in Transit', desc: 'Vehicle TS-09-UB-4421 loaded', done: selectedOrder.status === 'Dispatched' || selectedOrder.status === 'Delivered' },
                  { step: 'Delivered at Site', desc: 'Unloaded and verified at site', done: selectedOrder.status === 'Delivered' }
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <span
                      className={`absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                        item.done
                          ? 'bg-brand-500 border-white ring-2 ring-brand-300'
                          : 'bg-white border-gray-300'
                      }`}
                    />
                    <div className="font-bold text-xs text-gray-900">{item.step}</div>
                    <div className="text-[10.5px] text-gray-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-2 mb-3 text-xs">
              <div className="font-bold text-gray-700 text-[11px] uppercase">Items in this shipment</div>
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{it.product.name} ({it.areaSqFt} Sq.ft)</span>
                  <span className="font-black">₹{it.subtotal.toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-200 flex justify-between font-black text-gray-900">
                <span>Total Paid ({selectedOrder.paymentMethod})</span>
                <span className="text-brand-500">₹{selectedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 mb-4">
              Site Address: {selectedOrder.siteAddress}
            </p>

            {selectedOrder.status !== 'Delivered' && selectedOrder.status !== 'Cancelled' && (
              <button
                onClick={() => {
                  cancelOrder(selectedOrder.id);
                  setSelectedOrder(null);
                }}
                className="w-full py-2 border border-red-300 text-red-500 hover:bg-red-50 rounded-xl text-xs font-bold transition"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      )}

      {/* Worker Booking Tracking Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl p-5 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-black text-sm text-gray-900">Booking #{selectedBooking.id}</h3>
                <p className="text-[10px] text-gray-500">{selectedBooking.workerName}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Worker Status */}
            <div className="py-4">
              <h4 className="font-bold text-xs text-gray-900 mb-3">Live Service Status</h4>
              <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-200">
                {[
                  { step: 'Booking Requested', desc: 'Request broadcast to worker', done: true },
                  { step: 'Worker Accepted', desc: 'Worker confirmed date & slot', done: true },
                  { step: 'On the Way to Site', desc: 'Traveling to site with tools', done: selectedBooking.status === 'On the Way' || selectedBooking.status === 'Completed' },
                  { step: 'Work In Progress / Completed', desc: 'Job execution and sign-off', done: selectedBooking.status === 'Completed' }
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <span
                      className={`absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                        item.done
                          ? 'bg-brand-500 border-white ring-2 ring-brand-300'
                          : 'bg-white border-gray-300'
                      }`}
                    />
                    <div className="font-bold text-xs text-gray-900">{item.step}</div>
                    <div className="text-[10.5px] text-gray-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Details Card */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1.5 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Scheduled Date:</span>
                <span className="font-bold text-gray-900">{selectedBooking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time Window:</span>
                <span className="font-bold text-gray-900">{selectedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Team Size:</span>
                <span className="font-bold text-gray-900">{selectedBooking.numberOfWorkers} Worker(s)</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-gray-200">
                <span className="font-bold text-gray-900">Total Charges:</span>
                <span className="font-black text-brand-500">₹{selectedBooking.totalAmount}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => alert(`Calling assigned worker...`)}
                className="flex-1 py-2.5 bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Worker</span>
              </button>

              {selectedBooking.status === 'Completed' ? (
                <button
                  onClick={() => setRatingModal(selectedBooking.id)}
                  className="flex-1 py-2.5 border border-brand-500 text-brand-600 rounded-xl text-xs font-bold"
                >
                  Rate Worker ★
                </button>
              ) : (
                <button
                  onClick={() => {
                    cancelBooking(selectedBooking.id);
                    setSelectedBooking(null);
                  }}
                  className="py-2.5 px-3 border border-red-300 text-red-500 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {ratingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full text-center space-y-3">
            <h3 className="font-black text-sm text-gray-900">Rate Your Service Experience</h3>
            <p className="text-xs text-gray-500">How was the skill and precision of your worker?</p>
            <div className="flex justify-center gap-2 py-2 text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-8 h-8 fill-amber-400 cursor-pointer hover:scale-110 transition" />
              ))}
            </div>
            <button
              onClick={() => {
                alert('Thank you! Your feedback helps us maintain premium quality workers.');
                setRatingModal(null);
              }}
              className="w-full py-2.5 bg-brand-500 text-white rounded-xl text-xs font-bold"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
