'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Enquiry } from '@/types';
import {
  Search,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  Trash2,
  ChevronDown,
} from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/cms/enquiries');
      const data = await res.json();
      if (data.success) setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Enquiry['status']) => {
    try {
      const res = await fetch('/api/cms/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchEnquiries();
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (err) {
      alert('Status update failed');
    }
  };

  const handleSaveNotes = async (id: string, notes: string) => {
    try {
      await fetch('/api/cms/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: selectedEnquiry?.status || 'In Progress', notes }),
      });
      fetchEnquiries();
    } catch (err) {
      alert('Failed to save notes');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this enquiry?')) return;
    try {
      await fetch(`/api/cms/enquiries?id=${id}`, { method: 'DELETE' });
      setSelectedEnquiry(null);
      fetchEnquiries();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const filtered = enquiries.filter(
    (e) => filterStatus === 'All' || e.status === filterStatus
  );

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Customer Enquiries & Contractor Leads"
        subtitle="Manage inbound marble supply requests, bulk construction quotes and artisan bookings."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-gray-200/80 shadow-2xs">
        {['All', 'New', 'Contacted', 'In Progress', 'Converted', 'Closed'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterStatus === s
                ? 'bg-slate-900 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enquiry List (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filtered.map((enq) => {
              const isSelected = selectedEnquiry?.id === enq.id;
              return (
                <div
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`p-4 cursor-pointer transition flex items-start justify-between gap-4 ${
                    isSelected ? 'bg-pink-50/50 border-l-4 border-brand-500' : 'hover:bg-gray-50/70'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">{enq.name}</span>
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                          enq.status === 'New'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-gray-800 truncate">{enq.subject}</div>
                    <p className="text-xs text-gray-500 line-clamp-1">{enq.message}</p>

                    <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium pt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{enq.phone}</span>
                      </span>
                      <span>&middot;</span>
                      <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transform transition shrink-0 ${
                      isSelected ? '-rotate-90 text-brand-500' : ''
                    }`}
                  />
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-xs">
                No enquiries found under status "{filterStatus}".
              </div>
            )}
          </div>
        </div>

        {/* Enquiry Details Card (1 col) */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs h-fit space-y-4">
          {selectedEnquiry ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-sm text-gray-900">Enquiry Details</h3>
                <button
                  onClick={() => handleDelete(selectedEnquiry.id)}
                  className="text-rose-500 hover:text-rose-700 text-xs font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-[10.5px] font-bold text-gray-400 uppercase">Customer</div>
                  <div className="font-bold text-gray-900 text-sm mt-0.5">{selectedEnquiry.name}</div>
                  <div className="font-mono text-brand-600 mt-0.5">{selectedEnquiry.phone}</div>
                  {selectedEnquiry.email && (
                    <div className="text-gray-500 mt-0.5">{selectedEnquiry.email}</div>
                  )}
                </div>

                <div>
                  <div className="text-[10.5px] font-bold text-gray-400 uppercase">Subject</div>
                  <div className="font-bold text-gray-800 mt-0.5">{selectedEnquiry.subject}</div>
                </div>

                <div>
                  <div className="text-[10.5px] font-bold text-gray-400 uppercase">Message</div>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-xl mt-1 leading-relaxed whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </p>
                </div>

                <div>
                  <div className="text-[10.5px] font-bold text-gray-400 uppercase mb-1">Update Status</div>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) =>
                      handleStatusChange(selectedEnquiry.id, e.target.value as Enquiry['status'])
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800"
                  >
                    <option value="New">New Lead</option>
                    <option value="Contacted">Contacted via Phone/WhatsApp</option>
                    <option value="In Progress">In Progress (Site Visit Scheduled)</option>
                    <option value="Converted">Converted (Order Placed)</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <div className="text-[10.5px] font-bold text-gray-400 uppercase mb-1">Internal Notes</div>
                  <textarea
                    rows={3}
                    defaultValue={selectedEnquiry.notes || ''}
                    onBlur={(e) => handleSaveNotes(selectedEnquiry.id, e.target.value)}
                    placeholder="Add follow-up notes, quoted rates, site measurement dates..."
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  />
                  <div className="text-[10px] text-gray-400">Notes auto-save when clicking outside.</div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-gray-400 text-xs">
              Select an enquiry from the list to view full customer request and update lead status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
