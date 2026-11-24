import './globals.css';
import type { Metadata, Viewport } from 'next';
import { AppProvider } from '../context/AppContext';

export const metadata: Metadata = {
  title: 'Radhesh & Rudresh – Infra Developers Pvt. Ltd.',
  description: 'Premium Marble & Tile Shopping and Instant Nearby Worker Booking Platform. Building Trust. Creating Futures.',
  icons: {
    icon: '/assets/rr_monogram.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className="min-h-screen bg-slate-100 flex justify-center selection:bg-brand-500 selection:text-white">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
