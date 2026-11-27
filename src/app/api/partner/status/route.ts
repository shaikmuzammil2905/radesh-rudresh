import { NextResponse } from 'next/server';
import { updatePartnerDuty } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { id, isOnline } = await req.json();

    if (!id || typeof isOnline !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'Partner ID and duty status required.' },
        { status: 400 }
      );
    }

    const updated = updatePartnerDuty(id, isOnline);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Partner not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      partner: updated,
      message: isOnline ? 'You are now ONLINE for instant dispatch.' : 'You are now OFFLINE.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Status update error' },
      { status: 500 }
    );
  }
}
