'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SiteSettings } from '@/types';
import { Save, Building2, Phone, Mail, MapPin, Globe, Check, AlertCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/cms/settings');
        const data = await res.json();
        if (data.success) setSettings(data.settings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch('/api/cms/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback('✓ Company profile and settings updated successfully');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return <div className="p-8 text-center text-gray-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Company Profile & Site Settings"
        subtitle="Manage legal business entity information, customer helpline numbers, GST and official addresses."
      />

      {feedback && (
        <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md">
          {feedback}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Brand Identity */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-500" />
            <span>Corporate Entity Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Company Brand Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={settings.subtitle}
                onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Corporate Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">GST Registration Number</label>
              <input
                type="text"
                value={settings.gstNumber}
                onChange={(e) => setSettings({ ...settings, gstNumber: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-500" />
            <span>Customer Contact & Helpline</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Helpline Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">WhatsApp Business Number</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Support Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Official Quarry / Showroom Address</label>
            <textarea
              rows={2}
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-500" />
            <span>Social Media & Web Links</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Instagram URL</label>
              <input
                type="text"
                value={settings.socialLinks.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Facebook URL</label>
              <input
                type="text"
                value={settings.socialLinks.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">YouTube URL</label>
              <input
                type="text"
                value={settings.socialLinks.youtube}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={settings.socialLinks.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-500 to-pink-600 hover:from-brand-600 hover:to-pink-700 text-white rounded-xl text-xs font-bold shadow-md transition active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
