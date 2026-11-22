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
  CheckCircle2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '../common/Header';

export const SupportScreen: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
