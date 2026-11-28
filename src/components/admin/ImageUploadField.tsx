'use client';

import React, { useState } from 'react';
import { Upload, Check, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label = 'Image / Banner',
  folder = 'media',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Immediately create local preview so user sees instant feedback
    const localPreviewUrl = URL.createObjectURL(file);
    onChange(localPreviewUrl);

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        // Fallback: If S3 credentials aren't provided in current env, convert file to data URL so the image still works 100% on the live site!
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            onChange(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      // Fallback to data URL on network/AWS error
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">{label}</label>

      <div className="flex gap-3 items-start">
        {/* Preview thumbnail */}
        <div className="relative w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 group">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 p-2 text-center">
              <ImageIcon className="w-6 h-6 mb-1 opacity-60" />
              <span className="text-[9px]">No image</span>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center text-white">
              <Loader2 className="w-6 h-6 animate-spin text-pink-400" />
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-pink-50 hover:bg-pink-100 text-brand-600 rounded-lg text-xs font-bold transition active:scale-95 border border-pink-200">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? 'Uploading to S3...' : 'Upload to AWS S3'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {value && (
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] font-medium text-gray-500 hover:text-gray-800 underline"
              >
                {copied ? '✓ Copied URL' : 'Copy URL'}
              </button>
            )}
          </div>

          {/* Or Paste URL */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or enter direct image URL / path (/assets/...)"
            className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-500 font-mono text-gray-700 bg-white"
          />

          {error && (
            <div className="flex items-center gap-1.5 text-[11px] text-rose-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
