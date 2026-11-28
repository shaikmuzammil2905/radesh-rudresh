import fs from 'fs';
import path from 'path';
import {
  Product,
  Worker,
  HeroSlide,
  HomeCategoryCard,
  CustomerReview,
  Project,
  GalleryItem,
  Enquiry,
  PaymentRecord,
  SiteSettings,
  AuditLog,
  ProductOrder,
  WorkerBooking,
  Partner,
  Vendor,
  Customer,
  CouponOffer,
  SupportTicket,
  WithdrawalRequest,
} from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_WORKERS,
  HERO_SLIDES,
  HOME_CATEGORIES,
  CUSTOMER_REVIEWS,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS,
} from '@/data/mockData';

interface CMSDatabase {
  products: Product[];
  workers: Worker[];
  heroSlides: HeroSlide[];
  categories: HomeCategoryCard[];
  projects: Project[];
  gallery: GalleryItem[];
  reviews: CustomerReview[];
  enquiries: Enquiry[];
  orders: ProductOrder[];
  bookings: WorkerBooking[];
  payments: PaymentRecord[];
  partners: Partner[];
  vendors: Vendor[];
  customers: Customer[];
  coupons: CouponOffer[];
  supportTickets: SupportTicket[];
  withdrawals: WithdrawalRequest[];
  settings: SiteSettings;
  auditLogs: AuditLog[];
}

// Helper function to resolve persistent writable path across local and serverless (Vercel)
function getDbFilePath(): string {
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    const tmpPath = path.join('/tmp', 'cms_store.json');
    if (!fs.existsSync(tmpPath)) {
      const srcPath = path.join(process.cwd(), 'src', 'data', 'cms_store.json');
      if (fs.existsSync(srcPath)) {
        try {
          fs.copyFileSync(srcPath, tmpPath);
        } catch {}
      }
    }
    return tmpPath;
  }
  return path.join(process.cwd(), 'src', 'data', 'cms_store.json');
}

const DB_FILE_PATH = getDbFilePath();

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Jubilee Hills Luxury Villa Residence',
    client: 'G.V. Construction & Architects',
    location: 'Jubilee Hills, Road No. 36, Hyderabad',
    category: 'Villa',
    image: '/assets/hero_slide_1.png',
    galleryImages: ['/assets/hero_slide_1.png', '/assets/cat_marbles_grand.png'],
    description: 'Complete Italian Statuario marble bookmatched flooring with custom onyx accent walls and precision waterjet cutting.',
    completionYear: '2025',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'HITEC City Corporate Headquarters',
    client: 'Infra Horizon Tech Park',
    location: 'Madhapur, HITEC City, Hyderabad',
    category: 'Commercial',
    image: '/assets/hero_slide_2.png',
    galleryImages: ['/assets/hero_slide_2.png', '/assets/prod_black_galaxy_grand.png'],
    description: 'Black Galaxy granite lobby cladding and heavy-traffic vitrified floor tiles engineered for 5,000+ daily footfall.',
    completionYear: '2024',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Banjara Hills Royal Penthouse',
    client: 'Private Luxury Residence',
    location: 'Banjara Hills, Hyderabad',
    category: 'Residential',
    image: '/assets/hero_slide_3.png',
    galleryImages: ['/assets/hero_slide_3.png', '/assets/prod_crema_marfil_grand.png'],
    description: 'Crema Marfil marble bathrooms and custom quartz kitchen islands installed by master craftsmen.',
    completionYear: '2025',
    featured: true,
  },
];

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Italian White Statuario Bookmatched Wall',
    category: 'Marble',
    image: '/assets/cat_marbles_grand.png',
    description: 'Continuous vein bookmatched Statuario marble slab.',
    tags: ['Italian Marble', 'Bookmatched', 'Luxury'],
  },
  {
    id: 'gal-2',
    title: 'Black Galaxy Granite Island Countertop',
    category: 'Granite',
    image: '/assets/cat_granite_grand.png',
    description: 'Mirror-polished Black Galaxy granite with gold specks.',
    tags: ['Granite', 'Kitchen', 'Heat Resistant'],
  },
  {
    id: 'gal-3',
    title: 'Designer Non-Slip Bathroom Floor & Wall Slabs',
    category: 'Bathroom',
    image: '/assets/cat_bathroom_grand.png',
    description: 'Waterproof anti-skid floor tiles and seamless vanity panels.',
    tags: ['Waterproof', 'Bathroom', 'Anti-Skid'],
  },
  {
    id: 'gal-4',
    title: 'Stain-Proof Quartz Heavy Duty Kitchen Slab',
    category: 'Kitchen',
    image: '/assets/cat_kitchen_grand.png',
    description: 'Engineered high-durability quartz countertop.',
    tags: ['Kitchen', 'Heavy Duty', 'Stain Proof'],
  },
  {
    id: 'gal-5',
    title: 'Natural Onyx & Beige Travertine Backlit Wall',
    category: 'Natural Stone',
    image: '/assets/cat_natural_stones_grand.png',
    description: 'Translucent backlit natural honey onyx.',
    tags: ['Onyx', 'Backlit', 'Natural Stone'],
  },
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    name: 'Vikramaditya Reddy',
    phone: '+91 98490 12345',
    email: 'vikram.reddy@hyderabadproperties.com',
    subject: 'Supply of 5,000 Sq.Ft. Statuario Marble for G+2 Bungalow',
    message: 'We require 5,000 sq.ft. prime quality Italian Statuario marble slabs for our upcoming bungalow project in Jubilee Hills. Please share best factory rates.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: 'High priority commercial lead.',
  },
  {
    id: 'enq-2',
    name: 'Srinivas Rao',
    phone: '+91 99890 87654',
    email: 'srinivas.rao@architects.in',
    subject: 'Booking 4 Master Marble Polishers for 10 Days',
    message: 'Need 4 verified master Italian marble fitters and polishers for site near Gachibowli starting next Monday.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    notes: 'Quotation sent via WhatsApp. Follow up on Tuesday.',
  },
  {
    id: 'enq-3',
    name: 'Ananya Sharma',
    phone: '+91 94401 54321',
    subject: 'Kitchen Countertop Quartz Slab Samples',
    message: 'Looking for heat and stain resistant quartz slabs in pure white finish. Please send catalog and sample piece.',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const INITIAL_SETTINGS: SiteSettings = {
  companyName: 'RADHESH & RUDRESH',
  subtitle: 'INFRA DEVELOPERS PVT. LTD.',
  tagline: 'BUILDING TRUST. CREATING FUTURES.',
  phone: '+91 98490 29050',
  whatsapp: '+91 98490 29050',
  email: 'contact@radheshrudresh.com',
  address: 'Plot No. 42, Marble Industrial Zone, Near Outer Ring Road, Hyderabad, Telangana – 500072',
  gstNumber: '36AAACR1234F1Z8',
  googleMapsUrl: 'https://maps.google.com/?q=Hyderabad,Telangana',
  heroHeadline: 'Premium Marbles & Tiles',
  heroSubheadline: 'Hand-picked luxury stones and verified master craftsmen direct to your construction site.',
  socialLinks: {
    instagram: 'https://instagram.com/radheshrudresh',
    facebook: 'https://facebook.com/radheshrudresh',
    youtube: 'https://youtube.com/@radheshrudresh',
    linkedin: 'https://linkedin.com/company/radhesh-rudresh',
  },
};

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    action: 'SYSTEM_INIT',
    details: 'Dynamic CMS initialized with default quarry catalog and master artisans.',
    user: 'System',
    timestamp: new Date().toISOString(),
  },
];

const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'partner-w1',
    type: 'Worker',
    name: 'Ramesh Kumar',
    phone: '+91 98491 11222',
    email: 'ramesh.kumar@radheshrudresh.com',
    password: 'password123',
    city: 'Hyderabad',
    serviceArea: 'Jubilee Hills, Banjara Hills',
    photo: '/assets/artisan_1.png',
    idProofUrl: 'https://rudra-infra.s3.ap-south-2.amazonaws.com/kyc/ramesh_aadhar.pdf',
    verified: true,
    isOnline: true,
    status: 'Approved',
    rating: 4.9,
    completedJobs: 142,
    totalEarnings: 120700,
    createdAt: '2026-01-10T10:00:00.000Z',
    category: 'Marble Fitter',
    skill: 'Italian Marble Laying & Inlay Work',
    ratePerDay: 850,
    ratePerHour: 150,
    experienceYears: 12,
    about: 'Specialist in bookmatched Statuario and diamond edge polishing with 12+ years experience across luxury villas.',
  },
  {
    id: 'partner-r1',
    type: 'Rider',
    name: 'Syed Imran',
    phone: '+91 99882 33445',
    email: 'imran.delivery@radheshrudresh.com',
    password: 'password123',
    city: 'Hyderabad',
    serviceArea: 'All Hyderabad & Secunderabad',
    photo: '/assets/artisan_2.png',
    idProofUrl: 'https://rudra-infra.s3.ap-south-2.amazonaws.com/kyc/imran_dl.pdf',
    verified: true,
    isOnline: true,
    status: 'Approved',
    rating: 4.8,
    completedJobs: 98,
    totalEarnings: 84500,
    createdAt: '2026-02-15T14:30:00.000Z',
    vehicleType: 'Tata 407 Tempo',
    vehicleNumber: 'TS 09 UA 4521',
    drivingLicenseNumber: 'TS0920190048123',
    maxCapacityTons: 3.5,
  },
];

const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'vend-1',
    name: 'Shree Marble Traders',
    businessName: 'Shree Marble Traders Pvt. Ltd.',
    businessType: 'Marble & Granite',
    phone: '+91 98290 11223',
    email: 'sales@shreemarble.com',
    location: 'Jaipur, RJ',
    kycStatus: 'Verified',
    status: 'Active',
    productsCount: 24,
    totalSales: 4850000,
    walletBalance: 395000,
    commissionRate: 8,
    joinedDate: 'Jan 15, 2025',
    kycDocUrl: 'https://rudra-infra.s3.ap-south-2.amazonaws.com/kyc/shree_gst.pdf',
  },
  {
    id: 'vend-2',
    name: 'Kailash Stone World',
    businessName: 'Kailash Natural Stones Corp.',
    businessType: 'Marble & Stone',
    phone: '+91 94140 44556',
    email: 'kailash@stoneworld.in',
    location: 'Udaipur, RJ',
    kycStatus: 'Verified',
    status: 'Active',
    productsCount: 18,
    totalSales: 3120000,
    walletBalance: 240000,
    commissionRate: 7,
    joinedDate: 'Jan 18, 2025',
    kycDocUrl: 'https://rudra-infra.s3.ap-south-2.amazonaws.com/kyc/kailash_gst.pdf',
  },
  {
    id: 'vend-3',
    name: 'Mewar Marble Co.',
    businessName: 'Mewar Quarry & Exports',
    businessType: 'Italian Marble',
    phone: '+91 98281 77889',
    email: 'exports@mewarmarble.com',
    location: 'Kishangarh, RJ',
    kycStatus: 'Pending',
    status: 'Pending',
    productsCount: 12,
    totalSales: 1890000,
    walletBalance: 152000,
    commissionRate: 8,
    joinedDate: 'Jan 28, 2025',
    kycDocUrl: 'https://rudra-infra.s3.ap-south-2.amazonaws.com/kyc/mewar_trade.pdf',
  },
  {
    id: 'vend-4',
    name: 'Royal Marble Emporium',
    businessName: 'Royal Stones Hyderabad',
    businessType: 'Imported Marble',
    phone: '+91 98490 29050',
    email: 'royal@hyderabadmarble.com',
    location: 'Hyderabad, TS',
    kycStatus: 'Verified',
    status: 'Active',
    productsCount: 32,
    totalSales: 6420000,
    walletBalance: 520000,
    commissionRate: 8,
    joinedDate: 'Jan 05, 2025',
  },
  {
    id: 'vend-5',
    name: 'Deccan Natural Stones',
    businessName: 'Deccan Granite Mines Ltd.',
    businessType: 'Granite & Tiles',
    phone: '+91 99881 22334',
    email: 'info@deccanstone.com',
    location: 'Warangal, TS',
    kycStatus: 'Verified',
    status: 'Active',
    productsCount: 15,
    totalSales: 2750000,
    walletBalance: 210000,
    commissionRate: 7.5,
    joinedDate: 'Jan 10, 2025',
  },
];

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Rajesh Verma',
    phone: '+91 98490 12345',
    email: 'rajesh.verma@infrahyderabad.in',
    location: 'Jubilee Hills, Hyderabad',
    status: 'Active',
    totalOrders: 6,
    totalSpent: 691200,
    totalBookings: 3,
    joinedDate: 'Jan 10, 2025',
  },
  {
    id: 'cust-2',
    name: 'Neha Sharma',
    phone: '+91 99880 54321',
    email: 'neha.sharma@designstudio.com',
    location: 'Banjara Hills, Hyderabad',
    status: 'Active',
    totalOrders: 4,
    totalSpent: 124750,
    totalBookings: 2,
    joinedDate: 'Jan 14, 2025',
  },
  {
    id: 'cust-3',
    name: 'Arvind Builders',
    phone: '+91 94401 98765',
    email: 'arvind@arvindbuilders.com',
    location: 'Gachibowli, Hyderabad',
    status: 'Active',
    totalOrders: 9,
    totalSpent: 427900,
    totalBookings: 5,
    joinedDate: 'Jan 05, 2025',
  },
  {
    id: 'cust-4',
    name: 'Om Infra Co.',
    phone: '+91 98221 66554',
    email: 'procurement@ominfra.com',
    location: 'HITEC City, Hyderabad',
    status: 'Active',
    totalOrders: 12,
    totalSpent: 986400,
    totalBookings: 8,
    joinedDate: 'Jan 02, 2025',
  },
  {
    id: 'cust-5',
    name: 'Muzammil Shaik',
    phone: '+91 99887 76655',
    email: 'muzam@admedtech.com',
    location: 'Jubilee Hills, Hyderabad',
    status: 'Active',
    totalOrders: 2,
    totalSpent: 70800,
    totalBookings: 1,
    joinedDate: 'Nov 20, 2026',
  },
];

const INITIAL_COUPONS: CouponOffer[] = [
  {
    id: 'cpn-1',
    code: 'RUDRA5000',
    discountType: 'Fixed',
    discountValue: 5000,
    minOrder: 50000,
    maxDiscount: 5000,
    status: 'Active',
    usageCount: 42,
    validUntil: '31 Dec 2026',
  },
  {
    id: 'cpn-2',
    code: 'MARBLE10',
    discountType: 'Percentage',
    discountValue: 10,
    minOrder: 25000,
    maxDiscount: 15000,
    status: 'Active',
    usageCount: 88,
    validUntil: '31 Dec 2026',
  },
  {
    id: 'cpn-3',
    code: 'FITTINGFREE',
    discountType: 'Fixed',
    discountValue: 1000,
    minOrder: 15000,
    maxDiscount: 1000,
    status: 'Active',
    usageCount: 29,
    validUntil: '30 Nov 2026',
  },
];

const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'TICK-101',
    customerName: 'Rajesh Verma',
    customerPhone: '+91 98490 12345',
    category: 'Order Issue',
    subject: 'Request crane transit schedule update for Jubilee Hills site',
    status: 'Open',
    priority: 'High',
    createdAt: '28 Jan 2025',
  },
  {
    id: 'TICK-102',
    customerName: 'Neha Sharma',
    customerPhone: '+91 99880 54321',
    category: 'Worker Booking',
    subject: 'Request 2 additional tile fitters for tomorrow morning shift',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: '27 Jan 2025',
  },
  {
    id: 'TICK-103',
    customerName: 'Kailash Stone World',
    customerPhone: '+91 94140 44556',
    category: 'Payment Issue',
    subject: 'Vendor wallet payout settlement inquiry',
    status: 'Resolved',
    priority: 'Low',
    createdAt: '25 Jan 2025',
  },
];

const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'WDR-901',
    beneficiaryName: 'Shree Marble Traders',
    beneficiaryType: 'Vendor',
    amount: 150000,
    bankName: 'HDFC Bank',
    accountNumber: '••••••••4812',
    ifsc: 'HDFC0001234',
    status: 'Pending',
    requestedAt: 'Jan 29, 2025',
  },
  {
    id: 'WDR-902',
    beneficiaryName: 'Ramesh Kumar (Artisan)',
    beneficiaryType: 'Worker',
    amount: 14200,
    bankName: 'State Bank of India',
    accountNumber: '••••••••9031',
    ifsc: 'SBIN0005678',
    status: 'Approved',
    requestedAt: 'Jan 28, 2025',
  },
  {
    id: 'WDR-903',
    beneficiaryName: 'Kailash Stone World',
    beneficiaryType: 'Vendor',
    amount: 85000,
    bankName: 'ICICI Bank',
    accountNumber: '••••••••7721',
    ifsc: 'ICIC0003456',
    status: 'Completed',
    requestedAt: 'Jan 25, 2025',
  },
];

// In-memory cache
let inMemoryDB: CMSDatabase | null = null;

function loadDatabase(): CMSDatabase {
  if (inMemoryDB) return inMemoryDB;

  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const data = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      inMemoryDB = JSON.parse(data);
      if (inMemoryDB) {
        let needsSave = false;
        if (!inMemoryDB.partners) { inMemoryDB.partners = INITIAL_PARTNERS; needsSave = true; }
        if (!inMemoryDB.vendors) { inMemoryDB.vendors = INITIAL_VENDORS; needsSave = true; }
        if (!inMemoryDB.customers) { inMemoryDB.customers = INITIAL_CUSTOMERS; needsSave = true; }
        if (!inMemoryDB.coupons) { inMemoryDB.coupons = INITIAL_COUPONS; needsSave = true; }
        if (!inMemoryDB.supportTickets) { inMemoryDB.supportTickets = INITIAL_SUPPORT_TICKETS; needsSave = true; }
        if (!inMemoryDB.withdrawals) { inMemoryDB.withdrawals = INITIAL_WITHDRAWALS; needsSave = true; }
        if (inMemoryDB.products) {
          inMemoryDB.products = inMemoryDB.products.map((p) => {
            const base = p.vendorBasePrice || p.pricePerSqFt || 1000;
            const comm = p.commissionPercent ?? 8;
            const commAmt = p.commissionAmount ?? Math.round((base * comm) / 100 * 10) / 10;
            return {
              ...p,
              vendorBasePrice: base,
              commissionPercent: comm,
              commissionAmount: commAmt,
              approvalStatus: p.approvalStatus || 'Approved',
              published: p.published !== undefined ? p.published : true,
            };
          });
        }
        if (needsSave) {
          try {
            saveDatabase(inMemoryDB);
          } catch {}
        }
      }
      return inMemoryDB!;
    }
  } catch (err) {
    console.warn('Could not read CMS store from disk, initializing defaults:', err);
  }

  // Fallback / initial setup
  inMemoryDB = {
    products: INITIAL_PRODUCTS,
    workers: INITIAL_WORKERS,
    heroSlides: HERO_SLIDES,
    categories: HOME_CATEGORIES,
    projects: INITIAL_PROJECTS,
    gallery: INITIAL_GALLERY,
    reviews: CUSTOMER_REVIEWS,
    enquiries: INITIAL_ENQUIRIES,
    orders: INITIAL_ORDERS,
    bookings: INITIAL_BOOKINGS,
    payments: [],
    partners: INITIAL_PARTNERS,
    vendors: INITIAL_VENDORS,
    customers: INITIAL_CUSTOMERS,
    coupons: INITIAL_COUPONS,
    supportTickets: INITIAL_SUPPORT_TICKETS,
    withdrawals: INITIAL_WITHDRAWALS,
    settings: INITIAL_SETTINGS,
    auditLogs: INITIAL_AUDIT_LOGS,
  };

  saveDatabase(inMemoryDB);
  return inMemoryDB;
}

function saveDatabase(data: CMSDatabase) {
  inMemoryDB = data;
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write CMS store to disk:', err);
  }
}

// ---------------- PRODUCTS ----------------
export function getProducts(): Product[] {
  return loadDatabase().products;
}

export function saveProduct(product: Product): Product {
  const db = loadDatabase();

  // Pricing & Commission Engine (Vendor Base Price + Commission = Customer Price)
  const base = Number(product.vendorBasePrice || product.pricePerSqFt || 1000);
  const commPercent = Number(product.commissionPercent ?? 8);
  const commAmount = Math.round((base * commPercent) / 100 * 10) / 10;
  const finalPrice = Math.round(base + commAmount);

  const updatedProduct: Product = {
    ...product,
    vendorBasePrice: base,
    commissionPercent: commPercent,
    commissionAmount: commAmount,
    pricePerSqFt: finalPrice,
    approvalStatus: product.approvalStatus || 'Approved',
    published: product.published !== undefined ? product.published : true,
  };

  const index = db.products.findIndex((p) => p.id === updatedProduct.id);
  if (index >= 0) {
    db.products[index] = updatedProduct;
    addAuditLog('UPDATE_PRODUCT', `Updated product: ${updatedProduct.name} - Selling: ₹${finalPrice} (Base: ₹${base} + Comm ${commPercent}%)`);
  } else {
    db.products.unshift(updatedProduct);
    addAuditLog('CREATE_PRODUCT', `Created product: ${updatedProduct.name} - Selling: ₹${finalPrice}`);
  }
  saveDatabase(db);
  return updatedProduct;
}

export function deleteProduct(productId: string): boolean {
  const db = loadDatabase();
  const target = db.products.find((p) => p.id === productId);
  if (!target) return false;
  db.products = db.products.filter((p) => p.id !== productId);
  addAuditLog('DELETE_PRODUCT', `Deleted product: ${target.name} (${productId})`);
  saveDatabase(db);
  return true;
}

// ---------------- WORKERS / ARTISANS ----------------
export function getWorkers(): Worker[] {
  return loadDatabase().workers;
}

export function saveWorker(worker: Worker): Worker {
  const db = loadDatabase();
  const index = db.workers.findIndex((w) => w.id === worker.id);
  if (index >= 0) {
    db.workers[index] = worker;
    addAuditLog('UPDATE_WORKER', `Updated worker profile: ${worker.name}`);
  } else {
    db.workers.unshift(worker);
    addAuditLog('CREATE_WORKER', `Added new verified artisan: ${worker.name}`);
  }
  saveDatabase(db);
  return worker;
}

export function deleteWorker(workerId: string): boolean {
  const db = loadDatabase();
  const target = db.workers.find((w) => w.id === workerId);
  if (!target) return false;
  db.workers = db.workers.filter((w) => w.id !== workerId);
  addAuditLog('DELETE_WORKER', `Deleted artisan: ${target.name} (${workerId})`);
  saveDatabase(db);
  return true;
}

// ---------------- HERO SLIDES ----------------
export function getHeroSlides(): HeroSlide[] {
  return loadDatabase().heroSlides;
}

export function saveHeroSlides(slides: HeroSlide[]): HeroSlide[] {
  const db = loadDatabase();
  db.heroSlides = slides;
  addAuditLog('UPDATE_HERO_SLIDES', `Updated ${slides.length} hero banner slides.`);
  saveDatabase(db);
  return slides;
}

// ---------------- CATEGORIES ----------------
export function getCategories(): HomeCategoryCard[] {
  return loadDatabase().categories;
}

export function saveCategories(categories: HomeCategoryCard[]): HomeCategoryCard[] {
  const db = loadDatabase();
  db.categories = categories;
  addAuditLog('UPDATE_CATEGORIES', `Updated ${categories.length} category cards.`);
  saveDatabase(db);
  return categories;
}

// ---------------- PROJECTS ----------------
export function getProjects(): Project[] {
  return loadDatabase().projects;
}

export function saveProject(project: Project): Project {
  const db = loadDatabase();
  const index = db.projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    db.projects[index] = project;
    addAuditLog('UPDATE_PROJECT', `Updated architectural project: ${project.title}`);
  } else {
    db.projects.unshift(project);
    addAuditLog('CREATE_PROJECT', `Added architectural project: ${project.title}`);
  }
  saveDatabase(db);
  return project;
}

export function deleteProject(projectId: string): boolean {
  const db = loadDatabase();
  const target = db.projects.find((p) => p.id === projectId);
  if (!target) return false;
  db.projects = db.projects.filter((p) => p.id !== projectId);
  addAuditLog('DELETE_PROJECT', `Deleted project: ${target.title}`);
  saveDatabase(db);
  return true;
}

// ---------------- GALLERY ----------------
export function getGallery(): GalleryItem[] {
  return loadDatabase().gallery;
}

export function saveGalleryItem(item: GalleryItem): GalleryItem {
  const db = loadDatabase();
  const index = db.gallery.findIndex((g) => g.id === item.id);
  if (index >= 0) {
    db.gallery[index] = item;
    addAuditLog('UPDATE_GALLERY', `Updated gallery item: ${item.title}`);
  } else {
    db.gallery.unshift(item);
    addAuditLog('CREATE_GALLERY', `Added gallery slab: ${item.title}`);
  }
  saveDatabase(db);
  return item;
}

export function deleteGalleryItem(id: string): boolean {
  const db = loadDatabase();
  const target = db.gallery.find((g) => g.id === id);
  if (!target) return false;
  db.gallery = db.gallery.filter((g) => g.id !== id);
  addAuditLog('DELETE_GALLERY', `Deleted gallery item: ${target.title}`);
  saveDatabase(db);
  return true;
}

// ---------------- ENQUIRIES ----------------
export function getEnquiries(): Enquiry[] {
  return loadDatabase().enquiries;
}

export function addEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt'>): Enquiry {
  const db = loadDatabase();
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  db.enquiries.unshift(newEnquiry);
  saveDatabase(db);
  return newEnquiry;
}

export function updateEnquiryStatus(
  enquiryId: string,
  status: Enquiry['status'],
  notes?: string
): Enquiry | null {
  const db = loadDatabase();
  const index = db.enquiries.findIndex((e) => e.id === enquiryId);
  if (index < 0) return null;
  db.enquiries[index].status = status;
  if (notes !== undefined) {
    db.enquiries[index].notes = notes;
  }
  addAuditLog('UPDATE_ENQUIRY', `Changed enquiry ${enquiryId} status to ${status}`);
  saveDatabase(db);
  return db.enquiries[index];
}

export function deleteEnquiry(enquiryId: string): boolean {
  const db = loadDatabase();
  const target = db.enquiries.find((e) => e.id === enquiryId);
  if (!target) return false;
  db.enquiries = db.enquiries.filter((e) => e.id !== enquiryId);
  addAuditLog('DELETE_ENQUIRY', `Deleted enquiry ${enquiryId}`);
  saveDatabase(db);
  return true;
}

// ---------------- ORDERS & BOOKINGS ----------------
export function getOrders(): ProductOrder[] {
  return loadDatabase().orders;
}

export function saveOrder(order: ProductOrder): ProductOrder {
  const db = loadDatabase();
  const index = db.orders.findIndex((o) => o.id === order.id);
  if (index >= 0) {
    db.orders[index] = order;
  } else {
    db.orders.unshift(order);
  }
  saveDatabase(db);
  return order;
}

export function getBookings(): WorkerBooking[] {
  return loadDatabase().bookings;
}

export function saveBooking(booking: WorkerBooking): WorkerBooking {
  const db = loadDatabase();
  const index = db.bookings.findIndex((b) => b.id === booking.id);
  if (index >= 0) {
    db.bookings[index] = booking;
  } else {
    db.bookings.unshift(booking);
  }
  saveDatabase(db);
  return booking;
}

// ---------------- PAYMENTS ----------------
export function getPayments(): PaymentRecord[] {
  return loadDatabase().payments;
}

export function recordPayment(payment: PaymentRecord): PaymentRecord {
  const db = loadDatabase();
  db.payments.unshift(payment);
  addAuditLog('RECORD_PAYMENT', `Payment ₹${payment.amount} recorded for ${payment.customerName} (${payment.razorpayPaymentId})`);
  saveDatabase(db);
  return payment;
}

// ---------------- SETTINGS ----------------
export function getSettings(): SiteSettings {
  return loadDatabase().settings;
}

export function updateSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = loadDatabase();
  db.settings = { ...db.settings, ...settings };
  addAuditLog('UPDATE_SETTINGS', 'Updated company profile and contact settings.');
  saveDatabase(db);
  return db.settings;
}

// ---------------- AUDIT LOGS ----------------
export function getAuditLogs(): AuditLog[] {
  return loadDatabase().auditLogs;
}

export function addAuditLog(action: string, details: string, user: string = 'Admin'): AuditLog {
  const db = loadDatabase();
  const log: AuditLog = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    action,
    details,
    user,
    timestamp: new Date().toISOString(),
  };
  db.auditLogs.unshift(log);
  if (db.auditLogs.length > 200) {
    db.auditLogs = db.auditLogs.slice(0, 200);
  }
  return log;
}

// ---------------- PARTNERS (WORKERS & RIDERS) ----------------
export function getPartners(): Partner[] {
  return loadDatabase().partners;
}

export function getPartnerById(id: string): Partner | undefined {
  return loadDatabase().partners.find((p) => p.id === id);
}

export function getPartnerByPhone(phone: string): Partner | undefined {
  const clean = phone.replace(/\D/g, '');
  return loadDatabase().partners.find((p) => p.phone.replace(/\D/g, '').includes(clean));
}

export function savePartner(partner: Partner): Partner {
  const db = loadDatabase();
  const index = db.partners.findIndex((p) => p.id === partner.id);
  if (index >= 0) {
    db.partners[index] = partner;
    addAuditLog('UPDATE_PARTNER', `Updated partner details: ${partner.name} (${partner.type})`);
  } else {
    db.partners.unshift(partner);
    addAuditLog('REGISTER_PARTNER', `New partner registered: ${partner.name} (${partner.type})`);

    // If it's an approved worker, also sync into workers list
    if (partner.type === 'Worker') {
      const workerExists = db.workers.some((w) => w.id === partner.id || w.phone === partner.phone);
      if (!workerExists) {
        db.workers.unshift({
          id: partner.id,
          name: partner.name,
          skill: partner.skill || 'Skilled Artisan',
          category: partner.category || 'Mason',
          ratePerDay: partner.ratePerDay || 750,
          ratePerHour: partner.ratePerHour || 120,
          rating: partner.rating || 5.0,
          reviewCount: 1,
          experienceYears: partner.experienceYears || 5,
          completedJobs: partner.completedJobs || 0,
          distanceKm: 2.5,
          isOnline: partner.isOnline,
          isAvailableNow: partner.isOnline,
          photo: partner.photo || '/assets/artisan_1.png',
          serviceArea: partner.serviceArea || partner.city,
          verified: partner.verified,
          portfolioImages: [partner.photo || '/assets/artisan_1.png'],
          phone: partner.phone,
          about: partner.about || `${partner.category} partner registered on Radhesh & Rudresh network.`,
        });
      }
    }
  }
  saveDatabase(db);
  return partner;
}

export function updatePartnerStatus(
  id: string,
  status: 'Pending' | 'Approved' | 'Suspended',
  verified?: boolean
): Partner | null {
  const db = loadDatabase();
  const index = db.partners.findIndex((p) => p.id === id);
  if (index < 0) return null;
  db.partners[index].status = status;
  if (verified !== undefined) {
    db.partners[index].verified = verified;
  }
  const wIndex = db.workers.findIndex((w) => w.id === id || w.phone === db.partners[index].phone);
  if (wIndex >= 0) {
    db.workers[wIndex].verified = db.partners[index].verified;
  }
  addAuditLog('UPDATE_PARTNER_STATUS', `Partner ${id} status set to ${status}`);
  saveDatabase(db);
  return db.partners[index];
}

// ---------------- VENDORS ----------------
export function getVendors(): Vendor[] {
  return loadDatabase().vendors;
}

export function saveVendor(vendor: Vendor): Vendor {
  const db = loadDatabase();
  const index = db.vendors.findIndex((v) => v.id === vendor.id);
  if (index >= 0) {
    db.vendors[index] = vendor;
    addAuditLog('UPDATE_VENDOR', `Updated vendor: ${vendor.name} (${vendor.businessName})`);
  } else {
    db.vendors.unshift(vendor);
    addAuditLog('CREATE_VENDOR', `Added vendor: ${vendor.name}`);
  }
  saveDatabase(db);
  return vendor;
}

export function updateVendorStatus(
  id: string,
  status: 'Active' | 'Pending' | 'Suspended',
  kycStatus?: 'Verified' | 'Pending' | 'Rejected'
): Vendor | null {
  const db = loadDatabase();
  const index = db.vendors.findIndex((v) => v.id === id);
  if (index < 0) return null;
  db.vendors[index].status = status;
  if (kycStatus) {
    db.vendors[index].kycStatus = kycStatus;
  }
  addAuditLog('UPDATE_VENDOR_STATUS', `Vendor ${id} status set to ${status} (KYC: ${kycStatus || db.vendors[index].kycStatus})`);
  saveDatabase(db);
  return db.vendors[index];
}

export function deleteVendor(id: string): boolean {
  const db = loadDatabase();
  const target = db.vendors.find((v) => v.id === id);
  if (!target) return false;
  db.vendors = db.vendors.filter((v) => v.id !== id);
  addAuditLog('DELETE_VENDOR', `Deleted vendor: ${target.name}`);
  saveDatabase(db);
  return true;
}

// ---------------- CUSTOMERS ----------------
export function getCustomers(): Customer[] {
  return loadDatabase().customers;
}

export function updateCustomerStatus(id: string, status: 'Active' | 'Blocked'): Customer | null {
  const db = loadDatabase();
  const index = db.customers.findIndex((c) => c.id === id);
  if (index < 0) return null;
  db.customers[index].status = status;
  addAuditLog('UPDATE_CUSTOMER_STATUS', `Customer ${id} status set to ${status}`);
  saveDatabase(db);
  return db.customers[index];
}

// ---------------- OFFERS & COUPONS ----------------
export function getCoupons(): CouponOffer[] {
  return loadDatabase().coupons;
}

export function saveCoupon(coupon: CouponOffer): CouponOffer {
  const db = loadDatabase();
  const index = db.coupons.findIndex((c) => c.id === coupon.id);
  if (index >= 0) {
    db.coupons[index] = coupon;
    addAuditLog('UPDATE_COUPON', `Updated coupon code: ${coupon.code}`);
  } else {
    db.coupons.unshift(coupon);
    addAuditLog('CREATE_COUPON', `Created coupon code: ${coupon.code}`);
  }
  saveDatabase(db);
  return coupon;
}

export function deleteCoupon(id: string): boolean {
  const db = loadDatabase();
  db.coupons = db.coupons.filter((c) => c.id !== id);
  addAuditLog('DELETE_COUPON', `Deleted coupon ${id}`);
  saveDatabase(db);
  return true;
}

// ---------------- SUPPORT TICKETS ----------------
export function getSupportTickets(): SupportTicket[] {
  return loadDatabase().supportTickets;
}

export function updateSupportTicketStatus(id: string, status: SupportTicket['status']): SupportTicket | null {
  const db = loadDatabase();
  const index = db.supportTickets.findIndex((t) => t.id === id);
  if (index < 0) return null;
  db.supportTickets[index].status = status;
  addAuditLog('UPDATE_TICKET', `Ticket ${id} status set to ${status}`);
  saveDatabase(db);
  return db.supportTickets[index];
}

// ---------------- WITHDRAWALS & WALLETS ----------------
export function getWithdrawals(): WithdrawalRequest[] {
  return loadDatabase().withdrawals;
}

export function updateWithdrawalStatus(id: string, status: WithdrawalRequest['status']): WithdrawalRequest | null {
  const db = loadDatabase();
  const index = db.withdrawals.findIndex((w) => w.id === id);
  if (index < 0) return null;
  db.withdrawals[index].status = status;
  addAuditLog('UPDATE_WITHDRAWAL', `Withdrawal ${id} status set to ${status}`);
  saveDatabase(db);
  return db.withdrawals[index];
}

export function updatePartnerDuty(id: string, isOnline: boolean): Partner | null {
  const db = loadDatabase();
  const index = db.partners.findIndex((p) => p.id === id);
  if (index < 0) return null;
  db.partners[index].isOnline = isOnline;

  const wIndex = db.workers.findIndex((w) => w.id === id || w.phone === db.partners[index].phone);
  if (wIndex >= 0) {
    db.workers[wIndex].isOnline = isOnline;
    db.workers[wIndex].isAvailableNow = isOnline;
  }
  saveDatabase(db);
  return db.partners[index];
}
