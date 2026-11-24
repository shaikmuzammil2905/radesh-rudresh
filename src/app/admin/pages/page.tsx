'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { HeroSlide, HomeCategoryCard } from '@/types';
import { Save, Plus, Trash2, CheckCircle2, X, Sparkles, Layers } from 'lucide-react';

export default function AdminPagesCMS() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [categories, setCategories] = useState<HomeCategoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/cms/pages');
        const data = await res.json();
        if (data.success) {
          setSlides(data.slides || []);
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides, categories }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('✓ Homepage CMS published live to customer website!');
      } else {
        alert(data.message || 'Save failed');
      }
    } catch (err: any) {
      alert(err?.message || 'Error updating homepage CMS');
    } finally {
      setSaving(false);
    }
  };

  const updateSlide = (index: number, field: keyof HeroSlide, val: any) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: val };
    setSlides(updated);
  };

  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: `hero-${Date.now()}`,
      title: 'New Luxury Stone Collection',
      subtitle: 'for Premium Architectures & Interiors',
      highlightText: 'DIRECT FACTORY PRICES',
      ctaText: 'Explore Slabs',
      image: '/assets/hero_slide_1.png',
      badge: 'NEW ARRIVAL',
      targetCategory: 'Marble',
      targetScreen: 'products',
    };
    setSlides([...slides, newSlide]);
  };

  const removeSlide = (index: number) => {
    if (slides.length <= 1) {
      alert('You must keep at least one hero slide.');
      return;
    }
    setSlides(slides.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, field: keyof HomeCategoryCard, val: any) => {
    const updated = [...categories];
    updated[index] = { ...updated[index], [field]: val };
    setCategories(updated);
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Homepage Dynamic CMS"
        subtitle="Manage hero banner slides, category cards, promotional badges and live content."
      />

      {feedback && (
        <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md flex items-center justify-between">
          <span>{feedback}</span>
          <button onClick={() => setFeedback(null)} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Save Action Sticky Header */}
      <div className="sticky top-16 z-10 bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 text-white flex items-center justify-between shadow-xl border border-slate-700">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-pink-400">
            Live Website Synchronization
          </div>
          <div className="text-[11px] text-slate-300">
            Changes to slides and category badges take effect immediately for all visitors.
          </div>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-pink-600 hover:from-brand-600 hover:to-pink-700 text-white rounded-xl text-xs font-bold shadow-md transition active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Publishing...' : 'Save & Publish Homepage'}</span>
        </button>
      </div>

      {/* SECTION 1: HERO SLIDER MANAGEMENT */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>Hero Slider Slides ({slides.length})</span>
            </h2>
            <p className="text-xs text-gray-500">Edit hero background photos, headlines, badges and CTAs.</p>
          </div>

          <button
            onClick={addSlide}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-brand-600 rounded-lg text-xs font-bold transition border border-pink-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide</span>
          </button>
        </div>

        <div className="space-y-6">
          {slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200/70 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Slide #{idx + 1} &middot; {slide.title}
                </span>
                <button
                  onClick={() => removeSlide(idx)}
                  className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Slide</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Headline Title</label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => updateSlide(idx, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={slide.subtitle}
                    onChange={(e) => updateSlide(idx, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Highlight Badge Tag</label>
                  <input
                    type="text"
                    value={slide.highlightText}
                    onChange={(e) => updateSlide(idx, 'highlightText', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={slide.ctaText}
                    onChange={(e) => updateSlide(idx, 'ctaText', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-medium text-gray-900"
                  />
                </div>
              </div>

              {/* S3 Image Field for this Slide */}
              <ImageUploadField
                label={`Slide #${idx + 1} Background Image (AWS S3 Upload)`}
                value={slide.image}
                onChange={(url) => updateSlide(idx, 'image', url)}
                folder="hero"
              />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: CATEGORY CARDS & PROMOTIONAL BADGES */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-5">
        <div>
          <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-500" />
            <span>Category Sections & Promotional Badges</span>
          </h2>
          <p className="text-xs text-gray-500">
            Configure badges (POPULAR, TRENDING, WATERPROOF, HEAVY DUTY) and cover photos for categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {categories.map((cat, idx) => (
            <div key={cat.id} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200/70 space-y-3">
              <div className="flex items-center justify-between font-bold text-gray-900">
                <span>{cat.title}</span>
                {cat.badge && (
                  <span className="bg-brand-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                    {cat.badge}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-[10.5px] font-bold text-gray-600 mb-1">Badge Text</label>
                <input
                  type="text"
                  value={cat.badge || ''}
                  onChange={(e) => updateCategory(idx, 'badge', e.target.value)}
                  placeholder="e.g. POPULAR, TRENDING, WATERPROOF"
                  className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-bold text-gray-600 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={cat.subtitle}
                  onChange={(e) => updateCategory(idx, 'subtitle', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                />
              </div>

              <ImageUploadField
                label="Cover Image"
                value={cat.image}
                onChange={(url) => updateCategory(idx, 'image', url)}
                folder="categories"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
