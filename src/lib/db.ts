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
  settings: SiteSettings;
  auditLogs: AuditLog[];
}

const DB_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cms_store.json');

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

// In-memory cache
let inMemoryDB: CMSDatabase | null = null;

function loadDatabase(): CMSDatabase {
  if (inMemoryDB) return inMemoryDB;

  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const data = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      inMemoryDB = JSON.parse(data);
      if (inMemoryDB && !inMemoryDB.partners) {
        inMemoryDB.partners = INITIAL_PARTNERS;
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
  const index = db.products.findIndex((p) => p.id === product.id);
  if (index >= 0) {
    db.products[index] = product;
    addAuditLog('UPDATE_PRODUCT', `Updated product: ${product.name} (₹${product.pricePerSqFt})`);
  } else {
    db.products.unshift(product);
    addAuditLog('CREATE_PRODUCT', `Created new product: ${product.name}`);
  }
  saveDatabase(db);
  return product;
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
