import { NextResponse } from 'next/server';
import { getOrders, saveOrder, getBookings, saveBooking } from '@/lib/db';

export async function GET() {
  try {
    const orders = getOrders();
    const bookings = getBookings();
    return NextResponse.json({ success: true, orders, bookings });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.type === 'booking') {
      const saved = saveBooking(body.booking);
      return NextResponse.json({ success: true, booking: saved });
    } else {
      const saved = saveOrder(body.order);
      return NextResponse.json({ success: true, order: saved });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message }, { status: 500 });
  }
}
