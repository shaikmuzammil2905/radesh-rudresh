# Radhesh & Rudresh – Infra Developers Pvt. Ltd.
### Premium Marble & Tile Shopping & Instant Nearby Worker Booking Mobile Application

> **Tagline:** BUILDING TRUST. CREATING FUTURES.  
> **Primary Brand Colors:** Pink (#E91E63), Dark Pink (#C2185B), Light Background (#F8F8FA), Dark Charcoal (#171717)

---

## 📱 Project Overview

This mobile-first web application is designed for **Radhesh & Rudresh – Infra Developers Pvt. Ltd.** to provide an end-to-end customer experience across two primary business transactions:

1. **Marble & Tile E-Commerce Shopping:**
   - Multi-vendor catalog of Italian White Marble, Black Galaxy Granite, Statuario, Crema Marfil, Makrana, Vitrified Tiles, and Engineered Quartz.
   - Transparent stock availability status (`In Stock`, `Limited Stock`, `Out of Stock`, `Available on Request`).
   - Dynamic area and square-footage calculators with instant price breakdowns.
   - Comprehensive shopping cart with area steppers, multi-vendor support, and checkout.
   - Simulated payment via UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery.
   - Real-time order tracking with 4-stage dispatch tracking.

2. **Instant Nearby Worker Booking:**
   - GPS-enabled discovery of nearby skilled artisans (Tile Fitters, Marble Fitters, Polishers, Masons, Painters, Plumbers, Electricians, Carpenters, and Helpers).
   - Prominent **"Available Now"** instant booking filter for online technicians ready for immediate dispatch.
   - Dual **List View** and interactive visual **Map View** with live worker pins and site markers.
   - Worker profile pages with verification badges, ratings, completed job history, and transparent charges (`Per Day`, `Per Hour`, `Project Based`).
   - Customizable team sizing (stepper), date selector, shift slots, and site notes.
   - Booking confirmation with celebratory animations and live status tracking.

---

## 🎨 Visual Design & UI Alignment

The application follows the provided mobile UI design reference across all 8 core screens:

1. **Splash Screen:** Centered Radhesh & Rudresh monogram logo, company credentials, tagline, curved decorative bottom wave, and 3D marble slab imagery.
2. **Home Screen:** Centered brand header, live cart count, location selector, voice search affordance, 3-slide auto-rotating promotional banner, dual service cards, feature highlights, and popular stone categories.
3. **Marble & Tile Listing:** Sticky category chips (`All`, `Marble`, `Granite`, `Tiles`, `Quartz`, `Natural Stone`), search, sorting (price, popularity, rating), stock badges, and 2-column product grid.
4. **Worker Categories:** Category cards for 11 specialized trades, promotional verified banner, and instant booking CTA.
5. **Product Details:** High-resolution stone slabs, 4-photo interactive gallery, specifications table, vendor verification card, dynamic area calculator, and sticky action buttons (`Add to Cart` + `Buy Now`).
6. **Book Worker:** Selected artisan summary, requirement selector (`Per Day` / `Per Hour` / `Project Based`), team size stepper, date & slot dropdowns, site address, and sticky `Book Now` button.
7. **Booking Confirmed:** Animated circular green checkmark badge, booking confirmation details, Booking ID, and CTAs (`View Booking` + `Add to Calendar`).
8. **My Orders & Bookings:** Unified 2-tab interface (`Products` and `Worker Bookings`) with status badges (`Delivered`, `In Transit`, `Completed`, `Upcoming`) and interactive tracking modals.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router Architecture)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom design tokens & responsive utilities)
- **Icons:** Lucide React
- **Animations & Effects:** Framer Motion & Canvas Confetti
- **State Management:** React Context API (`AppContext`) with persistent mock data layer

---

## 🚀 Running the Application Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Production Build & Verification:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📱 Mobile Simulation & Viewport Presets

The application includes an embedded device simulator toolbar at the top:
- **360px** – Standard Android device
- **390px** – Modern iPhone viewport (with notch & iOS status bar)
- **414px** – Plus / Max mobile screens
- **Fluid / Full** – Responsive full-screen view
- **Screen Jump** – Quick switch between any of the 12 screens for instant evaluation.
