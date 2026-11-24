'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import {
  Upload,
  HardDrive,
  Check,
  Copy,
  Trash2,
  ExternalLink,
  Loader2,
  Image as ImageIcon,
  FolderOpen,
} from 'lucide-react';

interface S3File {
  key: string;
  size: number;
  lastModified: string;
  url: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<S3File[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/upload');
      const data = await res.json();
      if (data.success) {
        setFiles(data.files || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'media');

      try {
        await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
      } catch (err) {
        console.error('Upload error for', file.name, err);
      }
    }
    setUploading(false);
    fetchFiles();
  };

  const handleCopy = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="AWS S3 Media Library"
        subtitle="Manage cloud-stored marble photographs, project assets and promotional banners stored on Amazon S3 (rudra-infra)."
      />

      {/* S3 Storage Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <div className="font-black text-sm flex items-center gap-2">
              <span>AWS S3: rudra-infra</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                Connected &amp; Live
              </span>
            </div>
            <div className="text-xs text-slate-300 font-mono mt-0.5">
              Region: ap-south-2 (Asia Pacific - Hyderabad)
            </div>
          </div>
        </div>

        <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-pink-600 hover:from-brand-600 hover:to-pink-700 text-white rounded-xl text-xs font-bold shadow-md transition active:scale-95">
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading to S3...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Upload New Media Files</span>
            </>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            disabled={uploading}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-brand-500" />
            <span>Uploaded Assets ({files.length})</span>
          </h2>
          <span className="text-xs text-gray-400">Click Copy URL to insert anywhere in the CMS</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-500" />
            <span>Loading cloud media library...</span>
          </div>
        ) : files.length === 0 ? (
          <div className="py-16 text-center text-gray-400 space-y-3">
            <ImageIcon className="w-10 h-10 mx-auto text-gray-300" />
            <div className="text-sm font-bold text-gray-600">No custom S3 media uploaded yet</div>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Click the "Upload New Media Files" button above to upload high-resolution marble slabs and worker photos directly to your AWS bucket.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map((file) => (
              <div
                key={file.key}
                className="group relative bg-gray-50 rounded-xl border border-gray-200/80 overflow-hidden hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img src={file.url} alt={file.key} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-2.5 text-xs space-y-1">
                  <div className="font-mono text-[10px] text-gray-800 truncate" title={file.key}>
                    {file.key.replace('media/', '')}
                  </div>
                  <div className="text-[9px] text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB &middot; {new Date(file.lastModified).toLocaleDateString()}
                  </div>

                  <button
                    onClick={() => handleCopy(file.url, file.key)}
                    className="w-full mt-1.5 inline-flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-pink-50 hover:bg-pink-100 text-brand-600 text-[10px] font-bold transition"
                  >
                    {copiedKey === file.key ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
