import { NextResponse } from 'next/server';
import { getPartners, updatePartnerStatus, savePartner } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const partners = getPartners();
    return NextResponse.json(
      { success: true, partners: partners || [] },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, verified } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Partner ID and status are required' },
        { status: 400 }
      );
    }

    const updated = updatePartnerStatus(id, status, verified);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Partner not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Partner status updated to ${status}`,
      partner: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
