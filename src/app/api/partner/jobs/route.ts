import { NextResponse } from 'next/server';
import { getBookings, getOrders, saveBooking, saveOrder, getPartnerById } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const partnerId = searchParams.get('partnerId');
    const partnerType = searchParams.get('type'); // 'Worker' | 'Rider'

    if (partnerType === 'Rider') {
      // Return delivery orders requiring logistics dispatch
      const orders = getOrders();
      return NextResponse.json({
        success: true,
        type: 'Rider',
        jobs: orders.map((o) => ({
          id: o.id,
          orderId: o.id,
          type: 'Material Transit & Crane Loading',
          customerName: o.contactName,
          customerPhone: o.contactPhone,
          deliveryAddress: o.siteAddress,
          pickupLocation: 'Royal Marble Quarry Depot, Outer Ring Road, Hyderabad',
          totalAmount: o.totalAmount,
          status: o.status,
          date: o.createdAt,
          itemsCount: o.items.length,
          sqFtTotal: o.items.reduce((acc, it) => acc + it.areaSqFt, 0),
          estimatedDelivery: o.estimatedDelivery,
        })),
      });
    }

    // Default: Worker bookings
    const bookings = getBookings();
    return NextResponse.json({
      success: true,
      type: 'Worker',
      jobs: bookings.map((b) => ({
        id: b.id,
        bookingId: b.id,
        type: `${b.requirementType} - ${b.workerSkill}`,
        customerName: 'Site Project Engineer',
        customerPhone: '+91 98490 29050',
        siteAddress: b.siteAddress,
        date: b.date,
        timeSlot: b.timeSlot,
        ratePerUnit: b.ratePerUnit,
        totalAmount: b.totalAmount,
        status: b.status,
        jobDescription: b.jobDescription || 'Granite & Marble precision fitting',
        numberOfWorkers: b.numberOfWorkers,
        paymentStatus: b.paymentStatus || 'Pending',
        paymentMethod: b.paymentMethod || 'Pay on Site',
      })),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Error fetching jobs' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { jobId, newStatus, partnerType } = await req.json();

    if (!jobId || !newStatus) {
      return NextResponse.json(
        { success: false, message: 'Job ID and new status required.' },
        { status: 400 }
      );
    }

    if (partnerType === 'Rider') {
      const orders = getOrders();
      const order = orders.find((o) => o.id === jobId);
      if (!order) {
        return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
      }
      order.status = newStatus;
      saveOrder(order);
      return NextResponse.json({ success: true, message: `Dispatch marked as ${newStatus}` });
    }

    // Worker Booking
    const bookings = getBookings();
    const booking = bookings.find((b) => b.id === jobId);
    if (!booking) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }
    booking.status = newStatus;
    saveBooking(booking);
    return NextResponse.json({ success: true, message: `Booking marked as ${newStatus}` });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Error updating job' },
      { status: 500 }
    );
  }
}
