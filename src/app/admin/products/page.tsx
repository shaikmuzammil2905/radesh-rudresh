'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  AlertTriangle,
  X,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { Product, ProductCategory, StockStatus } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<ProductCategory>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Marble',
    pricePerSqFt: 350,
    rating: 4.8,
    reviewCount: 20,
    stockStatus: 'In Stock',
    availableStockSqFt: 2500,
    vendorName: 'Radhesh & Rudresh Quarry Slabs',
    vendorLocation: 'Hyderabad Quarry Division',
    type: 'Natural Slabs',
    finish: 'Mirror Polished',
    thickness: '18mm - 20mm',
    usage: 'Luxury Flooring, Wall Cladding, Vanity Slabs',
    description: 'High-end marble slab selected directly from luxury quarries.',
    image: '/assets/prod_italian_white_grand.png',
    featured: false,
    bestSeller: false,
  });

  // Delete Confirmation State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/cms/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditProduct({
      id: `prod-${Date.now()}`,
      name: '',
      category: 'Marble',
      pricePerSqFt: 350,
      rating: 4.8,
      reviewCount: 15,
      stockStatus: 'In Stock',
      availableStockSqFt: 2000,
      vendorName: 'Radhesh & Rudresh Quarry Division',
      vendorLocation: 'Hyderabad',
      type: 'Natural Stone',
      finish: 'Mirror Polished',
      thickness: '18mm',
      usage: 'Flooring & Countertops',
      description: 'Exclusive luxury stone slab direct from quarry.',
      image: '/assets/prod_italian_white_grand.png',
      featured: false,
      bestSeller: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setIsEditing(true);
    setEditProduct({ ...p });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/cms/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editProduct),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        showToast(isEditing ? '✓ Product updated successfully' : '✓ Product created and published to live website');
        fetchProducts();
      } else {
        alert(data.message || 'Save failed');
      }
    } catch (err: any) {
      alert(err?.message || 'Error saving product');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/cms/products?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setDeleteId(null);
        showToast('✓ Product removed from live catalog');
        fetchProducts();
      }
    } catch (err: any) {
      alert(err?.message || 'Delete failed');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.finish.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Products & Marble Catalog"
        subtitle="Manage marble slabs, granites, tiles and kitchen collections visible to public shoppers."
      />

      {feedback && (
        <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md flex items-center justify-between">
          <span>{feedback}</span>
          <button onClick={() => setFeedback(null)} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Control Bar: Search, Category Filters, Add Button */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search box */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or finish..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-brand-500 focus:bg-white transition"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value as ProductCategory)}
              className="px-3 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-brand-500 appearance-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Marble">Marbles</option>
              <option value="Granite">Granite</option>
              <option value="Tiles">Tiles</option>
              <option value="Natural Stone">Natural Stone</option>
              <option value="Bathroom Collection">Bathroom Collection</option>
              <option value="Kitchen Collection">Kitchen Collection</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-500 to-pink-600 hover:from-brand-600 hover:to-pink-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Marble / Product</span>
        </button>
      </div>

      {/* Products Display (Mobile Single-Line Cards + Desktop Table) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        {/* Mobile Single-Line Clean View (< sm) */}
        <div className="block sm:hidden divide-y divide-gray-100">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">
              No products found matching your search.
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div key={p.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/70 transition">
                {/* Left: Thumbnail + Single-Line Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-xl border border-gray-200 bg-gray-100 overflow-hidden shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-gray-900 text-xs truncate leading-snug">{p.name}</div>
                    <div className="text-[10px] text-gray-500 truncate flex items-center gap-1.5 mt-0.5">
                      <span className="font-semibold text-brand-600">{p.category}</span>
                      <span>&bull;</span>
                      <span>{p.finish || 'Polished'}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-black text-gray-900 text-xs">₹{p.pricePerSqFt}<span className="text-[9.5px] font-normal text-gray-400">/sq.ft</span></span>
                      <span className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded ${
                        p.stockStatus === 'In Stock' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {p.stockStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Quick Action Buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-2 text-gray-600 hover:text-brand-600 bg-gray-100 hover:bg-pink-50 rounded-xl transition"
                    title="Edit product"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(p.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    title="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View (>= sm) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-500 font-bold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Slab Image</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price / Sq.Ft.</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Badges</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/60 transition">
                  {/* Image */}
                  <td className="py-3 px-4">
                    <div className="w-14 h-14 rounded-xl border border-gray-200 bg-gray-100 overflow-hidden shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                  </td>

                  {/* Name & Finish */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900 text-sm">{p.name}</div>
                    <div className="text-[11px] text-gray-500">{p.finish} &middot; {p.thickness}</div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-pink-50 text-brand-700 border border-pink-200/60">
                      {p.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4">
                    <span className="font-black text-gray-900 text-sm">₹{p.pricePerSqFt}</span>
                    <span className="text-gray-400 text-[10px]"> / Sq.ft</span>
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.stockStatus === 'In Stock'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : p.stockStatus === 'Limited Stock'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {p.stockStatus}
                    </span>
                    <div className="text-[10px] text-gray-400 mt-0.5">{p.availableStockSqFt} Sq.ft left</div>
                  </td>

                  {/* Badges */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.bestSeller && (
                        <span className="bg-brand-500 text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded">
                          Best Seller
                        </span>
                      )}
                      {p.featured && (
                        <span className="bg-purple-600 text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions: Edit, Delete */}
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-gray-600 hover:text-brand-600 hover:bg-pink-50 rounded-lg transition"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No products found matching "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-base font-black text-gray-900">
                {isEditing ? `Edit Product: ${editProduct.name}` : 'Add New Marble / Tile Slab'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-4 text-xs">
              {/* Product Name */}
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={editProduct.name || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  placeholder="e.g., Italian Statuario Marble Slab"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-500 font-medium text-gray-900"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={editProduct.category || 'Marble'}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, category: e.target.value as ProductCategory })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-500 font-medium text-gray-900"
                  >
                    <option value="Marble">Marble</option>
                    <option value="Granite">Granite</option>
                    <option value="Tiles">Tiles</option>
                    <option value="Natural Stone">Natural Stone</option>
                    <option value="Bathroom Collection">Bathroom Collection</option>
                    <option value="Kitchen Collection">Kitchen Collection</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Price per Sq.Ft. (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editProduct.pricePerSqFt || ''}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, pricePerSqFt: Number(e.target.value) })
                    }
                    placeholder="e.g., 650"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-500 font-medium text-gray-900"
                  />
                </div>
              </div>

              {/* Stock Status & Available SqFt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Stock Availability
                  </label>
                  <select
                    value={editProduct.stockStatus || 'In Stock'}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, stockStatus: e.target.value as StockStatus })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-500 font-medium text-gray-900"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Limited Stock">Limited Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Available on Request">Available on Request</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Available Stock (Sq.Ft)
                  </label>
                  <input
                    type="number"
                    value={editProduct.availableStockSqFt || ''}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, availableStockSqFt: Number(e.target.value) })
                    }
                    placeholder="e.g., 5000"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-500 font-medium text-gray-900"
                  />
                </div>
              </div>

              {/* Finish & Thickness */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Surface Finish
                  </label>
                  <input
                    type="text"
                    value={editProduct.finish || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, finish: e.target.value })}
                    placeholder="e.g., Mirror Polished, Honed, Leather Finish"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-500 font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Slab Thickness
                  </label>
                  <input
                    type="text"
                    value={editProduct.thickness || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, thickness: e.target.value })}
                    placeholder="e.g., 18mm - 20mm"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-500 font-medium text-gray-900"
                  />
                </div>
              </div>

              {/* AWS S3 Image Upload Field */}
              <ImageUploadField
                label="Product Main Slab Image (AWS S3 Upload)"
                value={editProduct.image || ''}
                onChange={(url) => setEditProduct({ ...editProduct, image: url })}
                folder="products"
              />

              {/* Description */}
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editProduct.description || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  placeholder="Detailed quarry origin, grain patterns, bookmatching specs..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-500 font-medium text-gray-900"
                />
              </div>

              {/* Flags */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={editProduct.bestSeller || false}
                    onChange={(e) => setEditProduct({ ...editProduct, bestSeller: e.target.checked })}
                    className="w-4 h-4 accent-brand-500 rounded"
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={editProduct.featured || false}
                    onChange={(e) => setEditProduct({ ...editProduct, featured: e.target.checked })}
                    className="w-4 h-4 accent-brand-500 rounded"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              {/* Buttons */}
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
                  className="px-5 py-2 bg-gradient-to-r from-brand-500 to-pink-600 hover:from-brand-600 hover:to-pink-700 text-white rounded-xl font-bold shadow-md transition"
                >
                  {isEditing ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900">Confirm Deletion</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to remove this product from the live catalog? This action will immediately update the public website.
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
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
