'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  X,
  Phone,
  Star,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { Worker, WorkerCategory } from '@/types';

export default function AdminServicesPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editWorker, setEditWorker] = useState<Partial<Worker>>({
    name: '',
    skill: 'Master Marble Cutter & Installer',
    category: 'Marble Fitter',
    ratePerDay: 850,
    ratePerHour: 120,
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 45,
    completedJobs: 110,
    phone: '+91 98490 12345',
    serviceArea: 'Hyderabad, Secunderabad, Cyberabad',
    isAvailableNow: true,
    verified: true,
    photo: '/assets/worker_ramesh_kumar.png',
    about: 'Specialized in precision waterjet marble cutting, mirror polishing, and Italian bookmatching.',
  });

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchWorkers = async () => {
    try {
      const res = await fetch('/api/cms/workers');
      const data = await res.json();
      if (data.success) {
        setWorkers(data.workers || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditWorker({
      id: `worker-${Date.now()}`,
      name: '',
      skill: 'Master Marble Cutter & Fitter',
      category: 'Marble Fitter',
      ratePerDay: 850,
      ratePerHour: 120,
      experienceYears: 6,
      rating: 4.9,
      reviewCount: 25,
      completedJobs: 75,
      phone: '+91 98490 ',
      serviceArea: 'Hyderabad & Surrounds',
      isAvailableNow: true,
      verified: true,
      photo: '/assets/worker_ramesh_kumar.png',
      about: 'Verified stone artisan with top-tier cutting and mirror-finishing experience.',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (w: Worker) => {
    setIsEditing(true);
    setEditWorker({ ...w });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/cms/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editWorker),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        showToast(isEditing ? '✓ Artisan profile updated' : '✓ New master artisan added and live on booking network');
        fetchWorkers();
      } else {
        alert(data.message || 'Save failed');
      }
    } catch (err: any) {
      alert(err?.message || 'Error saving artisan');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/cms/workers?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setDeleteId(null);
        showToast('✓ Artisan profile removed');
        fetchWorkers();
      }
    } catch (err: any) {
      alert(err?.message || 'Delete failed');
    }
  };

  const filteredWorkers = workers.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.skill.toLowerCase().includes(search.toLowerCase()) ||
    w.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Master Artisans & Skilled Labor CMS"
        subtitle="Manage verified stone craftsmen, marble fitters, cutters, and polishers available for instant customer booking."
      />

      {feedback && (
        <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md flex items-center justify-between">
          <span>{feedback}</span>
          <button onClick={() => setFeedback(null)} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search artisans by name or skill..."
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
          />
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Master Artisan</span>
        </button>
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkers.map((w) => (
          <div
            key={w.id}
            className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-2xl border border-gray-200 bg-gray-100 overflow-hidden shrink-0">
                  <img src={w.photo} alt={w.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{w.name}</h3>
                    {w.verified && (
                      <span title="Verified Artisan">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11.5px] font-semibold text-brand-600 truncate">{w.skill}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {w.experienceYears} Years Exp &middot; {w.completedJobs} Jobs Done
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 p-2 rounded-xl">
                  <div className="text-[10px] text-gray-400">Daily Rate</div>
                  <div className="font-black text-gray-900">₹{w.ratePerDay} / day</div>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl">
                  <div className="text-[10px] text-gray-400">Rating</div>
                  <div className="font-black text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{w.rating} ({w.reviewCount})</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-600 line-clamp-2 mt-3">{w.about}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  w.isAvailableNow
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                ● {w.isAvailableNow ? 'Available Today' : 'Booked'}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(w)}
                  className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteId(w.id)}
                  className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Worker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-base font-black text-gray-900">
                {isEditing ? `Edit Artisan: ${editWorker.name}` : 'Add Master Stone Artisan'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Artisan Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editWorker.name || ''}
                  onChange={(e) => setEditWorker({ ...editWorker, name: e.target.value })}
                  placeholder="e.g., Ramesh Kumar"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-medium text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Specialist Trade Skill *
                  </label>
                  <input
                    type="text"
                    required
                    value={editWorker.skill || ''}
                    onChange={(e) => setEditWorker({ ...editWorker, skill: e.target.value })}
                    placeholder="e.g., Master Marble Cutter & Installer"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={editWorker.category || 'Marble Fitter'}
                    onChange={(e) =>
                      setEditWorker({ ...editWorker, category: e.target.value as WorkerCategory })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-medium text-gray-900"
                  >
                    <option value="Marble Fitter">Marble Fitter</option>
                    <option value="Marble Polisher">Marble Polisher</option>
                    <option value="Tile Fitter">Tile Fitter</option>
                    <option value="Granite Fitter">Granite Fitter</option>
                    <option value="Mason">Mason</option>
                    <option value="Painter">Painter</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Rate Per Day (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editWorker.ratePerDay || ''}
                    onChange={(e) =>
                      setEditWorker({ ...editWorker, ratePerDay: Number(e.target.value) })
                    }
                    placeholder="850"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    value={editWorker.experienceYears || ''}
                    onChange={(e) =>
                      setEditWorker({ ...editWorker, experienceYears: Number(e.target.value) })
                    }
                    placeholder="8"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-medium text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={editWorker.phone || ''}
                    onChange={(e) => setEditWorker({ ...editWorker, phone: e.target.value })}
                    placeholder="+91 98490 12345"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Service Area
                  </label>
                  <input
                    type="text"
                    value={editWorker.serviceArea || ''}
                    onChange={(e) => setEditWorker({ ...editWorker, serviceArea: e.target.value })}
                    placeholder="Hyderabad & Secunderabad"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-medium text-gray-900"
                  />
                </div>
              </div>

              {/* Artisan Photo (AWS S3 Upload) */}
              <ImageUploadField
                label="Artisan Profile Photo (AWS S3 Upload)"
                value={editWorker.photo || ''}
                onChange={(url) => setEditWorker({ ...editWorker, photo: url })}
                folder="artisans"
              />

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  About & Background
                </label>
                <textarea
                  rows={2}
                  value={editWorker.about || ''}
                  onChange={(e) => setEditWorker({ ...editWorker, about: e.target.value })}
                  placeholder="Specialization, tools used, certifications..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-medium text-gray-900"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={editWorker.isAvailableNow ?? true}
                    onChange={(e) => setEditWorker({ ...editWorker, isAvailableNow: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span>Available for Instant Booking</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={editWorker.verified ?? true}
                    onChange={(e) => setEditWorker({ ...editWorker, verified: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span>Verified Identity & Background</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition"
                >
                  {isEditing ? 'Save Artisan' : 'Publish Artisan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900">Remove Artisan Profile?</h3>
              <p className="text-xs text-gray-500 mt-1">
                This worker will no longer appear in customer nearby searches or booking screens.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
