import Razorpay from 'razorpay';
import crypto from 'crypto';

const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_U3ts4T40qINRZU';
const keySecret = process.env.RAZORPAY_KEY_SECRET || 'bv7PjRlYWFFgvRIrpS8ui6WR';

export const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export async function createRazorpayOrder(amountInRupees: number, receipt: string, notes: Record<string, string> = {}) {
  const options = {
    amount: Math.round(amountInRupees * 100), // amount in paise
    currency: 'INR',
    receipt: receipt.slice(0, 40),
    notes: {
      platform: 'Radhesh & Rudresh Infra Developers',
      ...notes,
    },
  };

  const order = await razorpayInstance.orders.create(options);
  return order;
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  razorpaySignature: string
): boolean {
  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === razorpaySignature;
}
