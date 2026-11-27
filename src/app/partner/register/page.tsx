'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Users,
  Truck,
  ArrowLeft,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  MapPin,
  Phone,
  User,
  CreditCard,
  Building,
  Check,
  X,
  Cloud
} from 'lucide-react';
import { WorkerCategory, PartnerType } from '@/types';

const WORKER_CATEGORIES: WorkerCategory[] = [
  'Mason',
  'Tile Fitter',
  'Marble Fitter',
  'Marble Polisher',
  'Granite Fitter',
  'Painter',
  'Plumber',
  'Electrician',
  'Carpenter',
  'Labor / Helper',
  'Other Services',
];

const VEHICLE_TYPES = [
  'Crane Truck',
  'Heavy Trailer',
  'Tata 407 Tempo',
  'Pickup Truck',
  'Electric Cargo',
] as const;

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [partnerType, setPartnerType] = useState<PartnerType>('Worker');

  useEffect(() => {
    const qType = searchParams.get('type');
    if (qType === 'Rider' || qType === 'Worker') {
      setPartnerType(qType);
    }
  }, [searchParams]);

  // Common Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [serviceArea, setServiceArea] = useState('Jubilee Hills, Banjara Hills, Gachibowli');

  // Worker specific
  const [category, setCategory] = useState<WorkerCategory>('Marble Fitter');
  const [skill, setSkill] = useState('Italian Marble Laying & Mirror Polishing');
  const [ratePerDay, setRatePerDay] = useState('850');
  const [ratePerHour, setRatePerHour] = useState('150');
  const [experienceYears, setExperienceYears] = useState('8');
  const [about, setAbout] = useState('');

  // Rider specific
  const [vehicleType, setVehicleType] = useState<typeof VEHICLE_TYPES[number]>('Tata 407 Tempo');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState('');
  const [maxCapacityTons, setMaxCapacityTons] = useState('3.5');

  // AWS S3 Uploads
  const [photoUrl, setPhotoUrl] = useState('');
  const [idProofUrl, setIdProofUrl] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingIdProof, setUploadingIdProof] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleS3Upload = async (file: File, type: 'photo' | 'idProof') => {
    if (type === 'photo') setUploadingPhoto(true);
    else setUploadingIdProof(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', type === 'photo' ? 'partners/photos' : 'partners/kyc');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (type === 'photo') setPhotoUrl(data.url);
        else setIdProofUrl(data.url);
      } else {
        setErrorMsg(data.message || 'AWS S3 upload failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error uploading to AWS S3');
    } finally {
      if (type === 'photo') setUploadingPhoto(false);
      else setUploadingIdProof(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setErrorMsg('Please enter your full name and phone number');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = {
        type: partnerType,
        name,
        phone,
        email,
        password: password || '123456',
        city,
        serviceArea,
        photo: photoUrl || (partnerType === 'Rider' ? '/assets/artisan_2.png' : '/assets/artisan_1.png'),
        idProofUrl,
        category,
        skill,
        ratePerDay: Number(ratePerDay) || 800,
        ratePerHour: Number(ratePerHour) || 120,
        experienceYears: Number(experienceYears) || 3,
        about,
        vehicleType,
        vehicleNumber,
        drivingLicenseNumber,
        maxCapacityTons: Number(maxCapacityTons) || 3.0,
      };

      const res = await fetch('/api/partner/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      // Save partner session locally
      if (typeof window !== 'undefined') {
        localStorage.setItem('rr_partner_session', JSON.stringify(data.partner));
      }

      router.push('/partner/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pb-20 max-w-md mx-auto shadow-xl">
      {/* Top Header */}
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-30 flex items-center justify-between border-b border-slate-800">
        <button
          onClick={() => router.push('/partner')}
          className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <h1 className="text-xs font-bold uppercase tracking-wider text-brand-400">
          Partner Registration
        </h1>
        <span className="w-10" />
      </div>

      <form onSubmit={handleRegister} className="p-4 space-y-4">
        {/* Step 1: Select Partner Type Switcher */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
          <label className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider block">
            Select Your Role
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPartnerType('Worker')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                partnerType === 'Worker'
                  ? 'border-brand-500 bg-brand-50/50 text-brand-600 ring-2 ring-brand-500/20'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-xs font-bold">Skilled Artisan</span>
              <span className="text-[9.5px] text-gray-400">Mason / Fitter / Polisher</span>
            </button>

            <button
              type="button"
              onClick={() => setPartnerType('Rider')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                partnerType === 'Rider'
                  ? 'border-blue-500 bg-blue-50/50 text-blue-600 ring-2 ring-blue-500/20'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Truck className="w-5 h-5" />
              <span className="text-xs font-bold">Logistics Rider</span>
              <span className="text-[9.5px] text-gray-400">Crane Truck / Tempo Driver</span>
            </button>
          </div>
        </div>

        {/* Step 2: Personal & Contact Information */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-brand-500" />
            <span>Personal & Contact Info</span>
          </h3>

          <div>
            <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Mobile Phone *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98490 00000"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Email (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="partner@mail.com"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Operating City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Service Area / Hub</label>
              <input
                type="text"
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
                placeholder="e.g. Jubilee Hills, Madhapur"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Role-Specific Details */}
        {partnerType === 'Worker' ? (
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-500" />
              <span>Skill & Daily Rate Details</span>
            </h3>

            <div>
              <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Trade Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WorkerCategory)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
              >
                {WORKER_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-semibold text-gray-600 block mb-1">Daily Rate (₹)</label>
                <input
                  type="number"
                  value={ratePerDay}
                  onChange={(e) => setRatePerDay(e.target.value)}
                  placeholder="850"
                  className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-600 block mb-1">Hourly (₹)</label>
                <input
                  type="number"
                  value={ratePerHour}
                  onChange={(e) => setRatePerHour(e.target.value)}
                  placeholder="150"
                  className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-600 block mb-1">Experience (Yrs)</label>
                <input
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  placeholder="5"
                  className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Primary Specialization</label>
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="e.g. Statuario Bookmatched Wall Inlay"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Short Bio / Past Work</label>
              <textarea
                rows={2}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Details about experience with commercial or luxury villa sites..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden resize-none"
              />
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-500" />
              <span>Vehicle & Transport Logistics</span>
            </h3>

            <div>
              <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Vehicle Type</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as any)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
              >
                {VEHICLE_TYPES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Vehicle Plate No. *</label>
                <input
                  type="text"
                  required
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="TS 09 UA 1234"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold uppercase text-gray-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Max Payload (Tons)</label>
                <input
                  type="number"
                  step="0.5"
                  value={maxCapacityTons}
                  onChange={(e) => setMaxCapacityTons(e.target.value)}
                  placeholder="3.5"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-[10.5px] font-semibold text-gray-600 block mb-1">Driving License Number</label>
              <input
                type="text"
                value={drivingLicenseNumber}
                onChange={(e) => setDrivingLicenseNumber(e.target.value)}
                placeholder="TS0920200000000"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        )}

        {/* Step 4: AWS S3 Document Uploads */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>KYC & Document Verification</span>
            </h3>
            <span className="text-[9.5px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Cloud className="w-2.5 h-2.5" /> AWS S3 Storage
            </span>
          </div>

          {/* Profile Photo Upload */}
          <div className="space-y-1.5">
            <label className="text-[10.5px] font-semibold text-gray-600 block">Profile Photo</label>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center shrink-0">
                {photoUrl ? (
                  <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <label className="flex-1 py-2 px-3 border border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer text-center text-xs font-semibold text-gray-600 flex items-center justify-center gap-2">
                {uploadingPhoto ? (
                  <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
                ) : (
                  <Upload className="w-4 h-4 text-brand-500" />
                )}
                <span>{uploadingPhoto ? 'Uploading to AWS S3...' : photoUrl ? 'Change Photo' : 'Upload Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingPhoto}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleS3Upload(f, 'photo');
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* ID Proof / License Upload */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            <label className="text-[10.5px] font-semibold text-gray-600 block">
              Aadhar Card / Driving License (PDF or Photo)
            </label>
            {idProofUrl ? (
              <div className="p-2 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 overflow-hidden">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-bold text-emerald-900 truncate">Document Stored in AWS S3</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIdProofUrl('')}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="w-full py-2.5 px-3 border border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer text-center text-xs font-semibold text-gray-600 flex items-center justify-center gap-2">
                {uploadingIdProof ? (
                  <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
                ) : (
                  <Upload className="w-4 h-4 text-brand-500" />
                )}
                <span>{uploadingIdProof ? 'Uploading to AWS S3...' : 'Upload KYC Proof (Aadhar/DL)'}</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  disabled={uploadingIdProof}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleS3Upload(f, 'idProof');
                  }}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Step 5: Password */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
          <label className="text-[10.5px] font-semibold text-gray-600 block">Create Login PIN / Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 digits / characters"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:border-brand-500 focus:outline-hidden"
          />
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || uploadingPhoto || uploadingIdProof}
          className="w-full py-3.5 px-5 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-98 text-white font-black text-xs transition shadow-md flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          <span>{isSubmitting ? 'Registering with AWS Cloud...' : `Submit ${partnerType} Registration`}</span>
        </button>

        <p className="text-[10px] text-center text-gray-500">
          By registering, you agree to Radhesh & Rudresh partner code of conduct and safety guidelines.
        </p>
      </form>
    </div>
  );
}

export default function PartnerRegisterPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-8 text-xs">
          <Loader2 className="w-5 h-5 animate-spin text-brand-500 mr-2" />
          <span>Loading partner registration form...</span>
        </div>
      }
    >
      <RegisterFormContent />
    </React.Suspense>
  );
}
