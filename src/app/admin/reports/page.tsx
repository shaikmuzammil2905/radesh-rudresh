'use client';

import React, { useState } from 'react';
import {
  FileBarChart2,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  FileSpreadsheet,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function ReportsAdminPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (reportName: string) => {
    setDownloading(reportName);
    setTimeout(() => {
      setDownloading(null);
      alert(`Report generated: ${reportName}. Exporting to CSV.`);
    }, 1200);
  };

  const reports = [
    { title: 'Tax & GST Monthly Reconciliation', desc: '18% GST collected on marble orders with HSN 6802 classification.', format: 'CSV / Excel' },
    { title: 'Vendor Sales & Commission Breakdown', desc: 'Detailed quarry-by-quarry sales volume, commission withheld and payouts.', format: 'CSV' },
    { title: 'Artisan & Worker Utilization Report', desc: 'Completed contractor bookings, customer feedback ratings and average wages.', format: 'PDF / Excel' },
    { title: 'Inventory & Stock Turnover Audit', desc: 'Available slab square-footage across Makrana, Kishangarh and Rajsamand yards.', format: 'CSV' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminHeader
        title="Marketplace Reports & Audits"
        breadcrumbs={[{ label: 'Reports' }]}
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
          <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
            <FileBarChart2 className="w-4 h-4 text-brand-500" />
            <span>Financial & Operational Reports Export</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Export comprehensive enterprise reports for auditing, chartered accountant review and vendor settlements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((r, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-sm">{r.title}</h4>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {r.format}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{r.desc}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Up to date (Real-time)</span>
                </span>
                <button
                  onClick={() => handleDownload(r.title)}
                  disabled={downloading === r.title}
                  className="px-3.5 py-1.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloading === r.title ? 'Generating...' : 'Download Export'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
