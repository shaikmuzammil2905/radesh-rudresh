export type ProductCategory = 
  | 'All' 
  | 'Marble' 
  | 'Granite' 
  | 'Tiles' 
  | 'Quartz' 
  | 'Natural Stone'
  | 'Bathroom Collection'
  | 'Kitchen Collection';

export type StockStatus = 'In Stock' | 'Limited Stock' | 'Out of Stock' | 'Available on Request';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  pricePerSqFt: number;
  rating: number;
  reviewCount: number;
  stockStatus: StockStatus;
  availableStockSqFt: number;
  vendorName: string;
  vendorLocation: string;
  type: string;
  finish: string;
  thickness: string;
  usage: string;
  description: string;
  image: string;
  galleryImages: string[];
  featured?: boolean;
  bestSeller?: boolean;
}

export type WorkerCategory = 
  | 'Mason'
  | 'Tile Fitter'
  | 'Marble Fitter'
  | 'Marble Polisher'
  | 'Granite Fitter'
  | 'Painter'
  | 'Plumber'
  | 'Electrician'
  | 'Carpenter'
  | 'Labor / Helper'
  | 'Other Services';

export interface Worker {
  id: string;
  name: string;
  skill: string;
  category: WorkerCategory;
  ratePerDay: number;
  ratePerHour: number;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  completedJobs: number;
  distanceKm: number;
  isOnline: boolean;
  isAvailableNow: boolean;
  photo: string;
  serviceArea: string;
  verified: boolean;
  portfolioImages: string[];
  phone: string;
  about: string;
  estimatedArrivalMin?: number;
}

export type BookingStatus = 'Requested' | 'Accepted' | 'On the Way' | 'In Progress' | 'Completed' | 'Cancelled';

export interface WorkerBooking {
  id: string;
  workerId: string;
  workerName: string;
  workerSkill: string;
  workerPhoto: string;
  requirementType: 'Per Day' | 'Per Hour' | 'Project Based';
  numberOfWorkers: number;
  date: string;
  timeSlot: string;
  siteAddress: string;
  jobDescription?: string;
  ratePerUnit: number;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
  trackingStep?: number;
  paymentMethod?: string;
  paymentId?: string;
  paymentStatus?: 'Pending' | 'Paid' | 'Advance Paid';
}

export type OrderStatus = 'Placed' | 'Confirmed' | 'Packed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface CartItem {
  product: Product;
  areaSqFt: number;
}

export interface ProductOrder {
  id: string;
  items: {
    product: Product;
    areaSqFt: number;
    subtotal: number;
  }[];
  siteAddress: string;
  contactName: string;
  contactPhone: string;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery' | 'Razorpay Online';
  subtotal: number;
  deliveryCharges: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  trackingStep?: number;
  paymentId?: string;
  paymentStatus?: 'Pending' | 'Paid' | 'Advance Paid';
}

export interface Address {
  id: string;
  name: string;
  label: 'Home' | 'Site' | 'Office' | 'Warehouse';
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'booking' | 'offer' | 'system';
  timestamp: string;
  read: boolean;
  referenceId?: string;
}

export interface HomeCategoryCard {
  id: ProductCategory;
  title: string;
  subtitle: string;
  image: string;
  itemCount: number;
  badge?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  highlightText: string;
  ctaText: string;
  image: string;
  badge: string;
  targetCategory?: ProductCategory;
  targetScreen?: ActiveScreen;
}

export interface CustomerReview {
  id: string;
  authorName: string;
  authorRole: string;
  authorLocation: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  stoneUsed: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  category: 'Commercial' | 'Residential' | 'Villa' | 'Hospitality';
  image: string;
  galleryImages: string[];
  description: string;
  completionYear: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  tags: string[];
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';
  notes?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: 'captured' | 'failed' | 'pending';
  customerName: string;
  customerPhone: string;
  referenceType: 'order' | 'booking';
  referenceId: string;
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  subtitle: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  gstNumber: string;
  googleMapsUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
  };
}

export interface AuditLog {
  id: string;
  action: string;
  details: string;
  user: string;
  timestamp: string;
}

export type PartnerType = 'Worker' | 'Rider';

export interface Partner {
  id: string;
  type: PartnerType;
  name: string;
  phone: string;
  email: string;
  password?: string;
  city: string;
  serviceArea: string;
  photo: string;
  idProofUrl?: string; // Stored in AWS S3
  verified: boolean;
  isOnline: boolean;
  status: 'Pending' | 'Approved' | 'Suspended';
  rating: number;
  completedJobs: number;
  totalEarnings: number;
  createdAt: string;

  // Worker specific
  category?: WorkerCategory;
  skill?: string;
  ratePerDay?: number;
  ratePerHour?: number;
  experienceYears?: number;
  about?: string;

  // Rider specific
  vehicleType?: 'Crane Truck' | 'Heavy Trailer' | 'Tata 407 Tempo' | 'Pickup Truck' | 'Electric Cargo';
  vehicleNumber?: string;
  drivingLicenseNumber?: string;
  maxCapacityTons?: number;
}

export type ActiveScreen = 
  | 'splash'
  | 'home'
  | 'products'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'worker-categories'
  | 'nearby-workers'
  | 'worker-profile'
  | 'book-worker'
  | 'booking-confirmation'
  | 'orders'
  | 'menu'
  | 'profile'
  | 'addresses'
  | 'notifications'
  | 'support';
