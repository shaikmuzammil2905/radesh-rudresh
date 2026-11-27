import { NextResponse } from 'next/server';
import { savePartner, getPartnerByPhone } from '@/lib/db';
import { Partner } from '@/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      type,
      name,
      phone,
      email,
      password,
      city,
      serviceArea,
      photo,
      idProofUrl,
      category,
      skill,
      ratePerDay,
      ratePerHour,
      experienceYears,
      about,
      vehicleType,
      vehicleNumber,
      drivingLicenseNumber,
      maxCapacityTons,
    } = body;

    if (!type || !name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Partner type, name, and phone number are required.' },
        { status: 400 }
      );
    }

    // Check if phone already registered
    const existing = getPartnerByPhone(phone);
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'A partner account with this phone number already exists. Please login.' },
        { status: 400 }
      );
    }

    const newPartner: Partner = {
      id: `partner-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: type === 'Rider' ? 'Rider' : 'Worker',
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : `${phone.replace(/\D/g, '')}@partner.radheshrudresh.com`,
      password: password || '123456',
      city: city || 'Hyderabad',
      serviceArea: serviceArea || 'All Hyderabad Municipal Limits',
      photo: photo || (type === 'Rider' ? '/assets/artisan_2.png' : '/assets/artisan_1.png'),
      idProofUrl: idProofUrl || '',
      verified: false, // Pending KYC verification
      isOnline: true,
      status: 'Pending',
      rating: 5.0,
      completedJobs: 0,
      totalEarnings: 0,
      createdAt: new Date().toISOString(),

      // Worker specific
      category: category || 'Mason',
      skill: skill || (category ? `${category} Specialist` : 'Skilled Stone Fitter'),
      ratePerDay: Number(ratePerDay) || 800,
      ratePerHour: Number(ratePerHour) || 120,
      experienceYears: Number(experienceYears) || 3,
      about: about || '',

      // Rider specific
      vehicleType: vehicleType || 'Tata 407 Tempo',
      vehicleNumber: vehicleNumber ? vehicleNumber.toUpperCase().trim() : 'TS 09 AB 0000',
      drivingLicenseNumber: drivingLicenseNumber || '',
      maxCapacityTons: Number(maxCapacityTons) || 3.0,
    };

    const saved = savePartner(newPartner);

    return NextResponse.json({
      success: true,
      message: 'Partner registration submitted successfully! Awaiting verification.',
      partner: saved,
    });
  } catch (err: any) {
    console.error('Partner registration error:', err);
    return NextResponse.json(
      { success: false, message: err?.message || 'Server error during partner registration' },
      { status: 500 }
    );
  }
}
