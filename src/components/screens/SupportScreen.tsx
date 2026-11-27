'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Mail,
  HelpCircle,
  ChevronDown,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Upload,
  Cloud,
  FileText,
  Loader2,
  X,
  Send,
  Sparkles
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';

export const SupportScreen: React.FC = () => {
  const { userName, userPhone } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Enquiry Form State
  const [name, setName] = useState(userName || '');
  const [phone, setPhone] = useState(userPhone || '');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Italian Marble Flooring');
  const [message, setMessage] = useState('');
  const [uploadedS3Url, setUploadedS3Url] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'enquiries/blueprints');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setUploadedS3Url(data.url);
      } else {
        setUploadError(data.message || 'Upload failed');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Error uploading file to AWS S3');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please enter your name and phone number');
      return;
    }

    setIsSubmitting(true);
    try {
      const fullMessage = `[Project: ${projectType}] ${message}${
        uploadedS3Url ? ` | AWS S3 Blueprint Attachment: ${uploadedS3Url}` : ''
      }`;

      const res = await fetch('/api/cms/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: email || 'not-provided@client.com',
          message: fullMessage,
          status: 'New',
        }),
      });

      if (res.ok) {
        setSubmittedSuccess(true);
        setMessage('');
        setUploadedS3Url('');
      } else {
        alert('Could not submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Submission error. Please check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How does instant worker booking work?',
      a: 'When you select "Available Now", our GPS system identifies verified technicians currently within 5 km of your site who are ready for immediate dispatch. Once confirmed, their live arrival ETA and vehicle contact are provided.'
    },
    {
      q: 'Can I inspect marble slabs before delivery?',
      a: 'Yes. You can visit the partner vendor showroom listed on the product card or request high-definition WhatsApp video footage of the exact slab lot before shipment.'
    },
    {
      q: 'What if a booked worker arrives late or does not show up?',
      a: 'We offer an automated replacement guarantee within 45 minutes or a 100% refund of any booking token with no questions asked.'
    },
    {
      q: 'Are workers insured for accidental damage on site?',
      a: 'All technicians verified under Radhesh & Rudresh Infra Developers Pvt. Ltd. carry comprehensive site injury and transit liability insurance.'
    },
    {
      q: 'What are the delivery charges for heavy marble slabs?',
      a: 'Orders above ₹25,000 qualify for free standard crane loading and transit within Hyderabad municipal limits.'
    }
  ];

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <Header title="Help & Support" showBack={true} showCart={false} />

      <div className="p-4 space-y-4">
        {/* Contact Support Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => alert('Customer helpline: +91 040 2345 6789 (24x7)')}
            className="p-3.5 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:border-brand-300 transition text-left active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-pink-50 text-brand-500 flex items-center justify-center mb-2">
              <Phone className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="font-bold text-xs text-gray-900">24x7 Helpline</div>
            <div className="text-[10px] text-gray-500">+91 040 2345 6789</div>
          </button>

          <button
            onClick={() => alert('Opening WhatsApp chat with Radhesh & Rudresh concierge...')}
            className="p-3.5 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:border-emerald-300 transition text-left active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <MessageCircle className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="font-bold text-xs text-gray-900">WhatsApp Concierge</div>
            <div className="text-[10px] text-gray-500">Live chat in 2 mins</div>
          </button>
        </div>

        {/* Request Site Consultation & Estimate Form (AWS S3 Powered) */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider">
                Request Free Site Consultation
              </h3>
            </div>
            <span className="text-[10px] font-bold bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Cloud className="w-2.5 h-2.5" /> AWS S3 Storage
            </span>
          </div>
          <p className="text-[11px] text-gray-500">
            Upload your floor plan or site photos to get a direct estimation from our architectural consultants.
          </p>

          {submittedSuccess ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className="text-xs font-bold text-emerald-900">Consultation Request Received!</h4>
              <p className="text-[11px] text-emerald-700">
                Our site engineer will review your blueprint and contact you within 2 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedSuccess(false)}
                className="mt-2 text-xs font-bold text-emerald-600 underline"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Service Required</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
                >
                  <option value="Italian Marble Flooring">Italian Marble Flooring & Laying</option>
                  <option value="Granite Kitchen Countertops">Granite Kitchen Countertops</option>
                  <option value="Vitrified Tile Fitting">Vitrified Tile Fitting (2BHK / 3BHK / Villa)</option>
                  <option value="Master Artisan Day Booking">Master Artisan Day Booking</option>
                  <option value="Commercial Infrastructure Supply">Commercial Infrastructure Supply</option>
                  <option value="Mirror Finish Diamond Polishing">Mirror Finish Diamond Polishing</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Site Details / Dimensions</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. 1500 sq.ft living room flooring in Jubilee Hills..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden resize-none"
                />
              </div>

              {/* AWS S3 File Uploader */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-600 uppercase flex items-center justify-between">
                  <span>Site Photo / Blueprint (AWS S3 Cloud)</span>
                  <span className="text-[9px] text-gray-400 font-normal">JPG, PNG, PDF up to 10MB</span>
                </label>

                {uploadedS3Url ? (
                  <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img src={uploadedS3Url} alt="Uploaded" className="w-10 h-10 object-cover rounded-lg border border-emerald-300 shrink-0" />
                      <div className="truncate">
                        <span className="text-[11px] font-bold text-emerald-800 block truncate">Attachment Stored on S3</span>
                        <span className="text-[9px] text-emerald-600 block truncate">rudra-infra.s3.ap-south-2.amazonaws.com</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedS3Url('')}
                      className="p-1 hover:bg-emerald-100 rounded text-emerald-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition text-gray-600 text-xs font-semibold">
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
                    ) : (
                      <Upload className="w-4 h-4 text-brand-500" />
                    )}
                    <span>{isUploading ? 'Uploading to AWS S3...' : 'Choose Blueprint / Photo'}</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                )}

                {uploadError && (
                  <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-black shadow-xs transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{isSubmitting ? 'Submitting...' : 'Send Consultation Request'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Company Overview Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-500" />
            <h3 className="font-black text-xs text-gray-900 uppercase tracking-wider">
              About Radhesh & Rudresh
            </h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>Radhesh & Rudresh – Infra Developers Pvt. Ltd.</strong> is a premier infrastructure and interior-materials marketplace dedicated to bringing quarry-direct Italian marble, granite, and vitrified tiles to builders, architects, and homeowners, backed by an instant network of certified master fitters.
          </p>
          <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-[10.5px] text-brand-600 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Tagline: BUILDING TRUST. CREATING FUTURES.</span>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
          <h3 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-3">
            Frequently Asked Questions
          </h3>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-gray-100 rounded-xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3 text-left font-bold text-xs text-gray-800 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180 text-brand-500' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-3 bg-gray-50 text-xs text-gray-600 border-t border-gray-100 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
