import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getWorkers, saveWorker, deleteWorker } from '@/lib/db';
import { Worker } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const workers = getWorkers();
  return NextResponse.json(
    { success: true, workers: workers || [] },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.skill) {
      return NextResponse.json({ success: false, message: 'Name and skill are required' }, { status: 400 });
    }

    const worker: Worker = {
      id: body.id || `worker-${Date.now()}`,
      name: body.name,
      skill: body.skill,
      category: body.category || 'Marble Fitter',
      ratePerDay: Number(body.ratePerDay) || 850,
      ratePerHour: Number(body.ratePerHour) || 120,
      rating: Number(body.rating) || 4.9,
      reviewCount: Number(body.reviewCount) || 50,
      experienceYears: Number(body.experienceYears) || 5,
      completedJobs: Number(body.completedJobs) || 80,
      distanceKm: Number(body.distanceKm) || 2.5,
      isOnline: body.isOnline !== undefined ? Boolean(body.isOnline) : true,
      isAvailableNow: body.isAvailableNow !== undefined ? Boolean(body.isAvailableNow) : true,
      photo: body.photo || '/assets/artisan_1.png',
      serviceArea: body.serviceArea || 'Hyderabad & Secunderabad',
      verified: Boolean(body.verified ?? true),
      portfolioImages: body.portfolioImages || ['/assets/worker_laying_tile.png'],
      phone: body.phone || '+91 98490 11223',
      about: body.about || 'Certified stone craftsman and precision installer with extensive residential and commercial experience.',
      estimatedArrivalMin: Number(body.estimatedArrivalMin) || 30,
    };

    const saved = saveWorker(worker);
    try {
      revalidatePath('/');
      revalidatePath('/admin/workers');
    } catch {}

    return NextResponse.json({ success: true, worker: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Worker ID required' }, { status: 400 });
    }
    const ok = deleteWorker(id);
    try {
      revalidatePath('/');
      revalidatePath('/admin/workers');
    } catch {}
    return NextResponse.json({ success: ok });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}
