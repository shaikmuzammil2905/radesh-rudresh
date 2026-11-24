import { NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { recordPayment } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      customerName,
      customerPhone,
      referenceType,
      referenceId,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, message: 'Missing payment signature parameters' }, { status: 400 });
    }

    const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid payment signature' }, { status: 400 });
    }

    // Record verified transaction in database
    const payment = recordPayment({
      id: `pay-${Date.now()}`,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      amount: Number(amount) || 0,
      currency: 'INR',
      status: 'captured',
      customerName: customerName || 'Valued Customer',
      customerPhone: customerPhone || '+91 98490 00000',
      referenceType: referenceType || 'order',
      referenceId: referenceId || `ref-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified and captured successfully',
      payment,
    });
  } catch (err: any) {
    console.error('Razorpay Verify Error:', err);
    return NextResponse.json(
      { success: false, message: err?.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
