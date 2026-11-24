import { NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';

export async function POST(req: Request) {
  try {
    const { amount, receipt, notes } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, message: 'Valid amount is required' }, { status: 400 });
    }

    const order = await createRazorpayOrder(Number(amount), receipt || `rcpt_${Date.now()}`, notes || {});

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_U3ts4T40qINRZU',
    });
  } catch (err: any) {
    console.error('Razorpay Order Error:', err);
    return NextResponse.json(
      { success: false, message: err?.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
