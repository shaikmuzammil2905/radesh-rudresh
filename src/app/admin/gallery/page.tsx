'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { GalleryItem } from '@/types';
import { Plus, Trash2, X, Image as ImageIcon, Tag } from 'lucide-react';

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Marble',
    image: '',
    description: '',
    tags: ['Luxury Slabs'],
  });
  const [tagsInput, setTagsInput] = useState('Italian, Mirror Finish');

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/cms/gallery');
      const data = await res.json();
      if (data.success) setGallery(data.gallery || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.image) {
      alert('Please upload or enter an image URL');
      return;
    }

    try {
      const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
      const res = await fetch('/api/cms/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newItem, tags }),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchGallery();
      }
    } catch (err) {
      alert('Failed to save gallery item');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this slab photograph from the gallery?')) return;
    try {
      await fetch(`/api/cms/gallery?id=${id}`, { method: 'DELETE' });
      fetchGallery();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Stone Slabs & Texture Gallery"
        subtitle="Manage high-resolution slabs, exotic onyx backlighting, and finish texture exhibits."
      />

      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <span className="text-xs font-bold text-gray-700">Total Gallery Slabs: {gallery.length}</span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-500 to-pink-600 hover:from-brand-600 hover:to-pink-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Slab to Gallery</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-2xs group hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                {item.description && <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>}

                <div className="flex flex-wrap gap-1 pt-1">
                  {(item.tags || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-md"
                    >
                      <Tag className="w-2.5 h-2.5 text-gray-400" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex justify-end pt-3">
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Delete gallery item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-black text-gray-900">Add Gallery Slab</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newItem.title || ''}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="e.g. Statuario Bookmatched Wall"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={newItem.category || 'Marble'}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <option value="Marble">Marble</option>
                  <option value="Granite">Granite</option>
                  <option value="Natural Stone">Natural Stone</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Kitchen">Kitchen</option>
                </select>
              </div>

              <ImageUploadField
                label="High-Res Slab Photo (AWS S3 Upload)"
                value={newItem.image || ''}
                onChange={(url) => setNewItem({ ...newItem, image: url })}
                folder="gallery"
              />

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Italian Marble, Luxury, Bookmatched"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-brand-500 to-pink-600 text-white rounded-xl font-bold shadow-md"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
