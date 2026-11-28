import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getOrders, saveOrder, getBookings, saveBooking } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const orders = getOrders();
    const bookings = getBookings();
    return NextResponse.json(
      { success: true, orders: orders || [], bookings: bookings || [] },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.type === 'booking') {
      const saved = saveBooking(body.booking);
      try {
        revalidatePath('/admin/orders');
        revalidatePath('/admin/dashboard');
      } catch {}
      return NextResponse.json({ success: true, booking: saved });
    } else {
      const saved = saveOrder(body.order);
      try {
        revalidatePath('/admin/orders');
        revalidatePath('/admin/dashboard');
      } catch {}
      return NextResponse.json({ success: true, order: saved });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}
