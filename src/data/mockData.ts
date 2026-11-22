import {
  Product,
  Worker,
  WorkerBooking,
  ProductOrder,
  Address,
  AppNotification,
  HomeCategoryCard,
  HeroSlide
} from '../types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'Transform Your Space with Elegance',
    subtitle: 'Discover premium-quality marbles and tiles for your dream space.',
    highlightText: 'PREMIUM MARBLE & TILES',
    ctaText: 'Explore Collection',
    image: '/assets/hero_slide_1.png',
    badge: 'DIRECT FACTORY PRICES',
    targetCategory: 'Marble',
    targetScreen: 'products'
  },
  {
    id: 'hero-2',
    title: 'Luxury Italian & Imported Slabs',
    subtitle: 'Hand-selected bookmatched Statuario, Calacatta & Onyx for signature interiors.',
    highlightText: 'EXCLUSIVE QUARRY IMPORTS',
    ctaText: 'Explore Collection',
    image: '/assets/hero_slide_2.png',
    badge: 'DIRECT FACTORY PRICES',
    targetCategory: 'Marble',
    targetScreen: 'products'
  },
  {
    id: 'hero-3',
    title: 'Skilled Artisans & Instant Fitting',
    subtitle: 'Book certified master tile fitters, polishers & masons right to your site.',
    highlightText: 'ON-DEMAND SITE EXPERTS',
    ctaText: 'Book Skilled Workers',
    image: '/assets/hero_slide_3.png',
    badge: 'BACKGROUND VERIFIED',
    targetScreen: 'worker-categories'
  }
];

export const HOME_CATEGORIES: HomeCategoryCard[] = [
  {
    id: 'Marble',
    title: 'Marbles',
    subtitle: 'Italian, Indian & Statuario Slabs',
    image: '/assets/cat_marbles_grand.png',
    itemCount: 42,
    badge: 'POPULAR'
  },
  {
    id: 'Tiles',
    title: 'Tiles',
    subtitle: 'Floor, Wall & Vitrified Designer Tiles',
    image: '/assets/cat_tiles_grand.png',
    itemCount: 88,
    badge: 'TRENDING'
  },
  {
    id: 'Granite',
    title: 'Granite',
    subtitle: 'Black Galaxy, Moon White & Slabs',
    image: '/assets/cat_granite_grand.png',
    itemCount: 35
  },
  {
    id: 'Natural Stone',
    title: 'Natural Stones',
    subtitle: 'Onyx, Travertine & Sandstone',
    image: '/assets/cat_natural_stones_grand.png',
    itemCount: 24
  },
  {
    id: 'Bathroom Collection',
    title: 'Bathroom Collection',
    subtitle: 'Anti-Skid Flooring & Vanity Slabs',
    image: '/assets/cat_bathroom_grand.png',
    itemCount: 30,
    badge: 'WATERPROOF'
  },
  {
    id: 'Kitchen Collection',
    title: 'Kitchen Collection',
    subtitle: 'Heat & Stain Resistant Countertops',
    image: '/assets/cat_kitchen_grand.png',
    itemCount: 28,
    badge: 'HEAVY DUTY'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Italian White Marble',
    category: 'Marble',
    pricePerSqFt: 320,
    rating: 4.8,
    reviewCount: 210,
    stockStatus: 'In Stock',
    availableStockSqFt: 2400,
    vendorName: 'Royal Marble Emporium',
    vendorLocation: 'Madhapur, Hyderabad',
    type: 'Natural Imported Marble',
    finish: 'Mirror Polished',
    thickness: '18–20 mm',
    usage: 'Floor, Wall, Kitchen, Bathroom',
    description: 'Directly imported Italian White Marble known for its gentle grey veining and milky white crystalline base. Perfectly suited for high-end flooring, feature walls, and lavish bathroom vanities.',
    image: '/assets/prod_italian_white.png',
    galleryImages: [
      '/assets/prod_italian_white.png',
      '/assets/prod_statuario.png',
      '/assets/splash_slabs.png',
      '/assets/hero_banner.png'
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'prod-2',
    name: 'Black Galaxy Granite',
    category: 'Granite',
    pricePerSqFt: 280,
    rating: 4.7,
    reviewCount: 168,
    stockStatus: 'In Stock',
    availableStockSqFt: 1850,
    vendorName: 'Deccan Natural Stones',
    vendorLocation: 'Jubilee Hills, Hyderabad',
    type: 'Natural Granite',
    finish: 'High Gloss Polished',
    thickness: '18–20 mm',
    usage: 'Kitchen Countertop, Stairs, Flooring',
    description: 'Iconic Black Galaxy Granite featuring a dense midnight black background embellished with bright golden and bronze reflective specks. Unmatched durability and scratch resistance.',
    image: '/assets/prod_black_galaxy.png',
    galleryImages: [
      '/assets/prod_black_galaxy.png',
      '/assets/prod_italian_white.png',
      '/assets/splash_slabs.png'
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'prod-3',
    name: 'Statuario Marble',
    category: 'Marble',
    pricePerSqFt: 650,
    rating: 4.9,
    reviewCount: 96,
    stockStatus: 'Limited Stock',
    availableStockSqFt: 480,
    vendorName: 'Carrara Luxe Imports',
    vendorLocation: 'Banjara Hills, Hyderabad',
    type: 'Prestige Italian Marble',
    finish: 'Polished / Honed',
    thickness: '20 mm',
    usage: 'Luxury Flooring, Villa Living Rooms, Accents',
    description: 'The pinnacle of interior luxury. Statuario marble displays bold, expressive charcoal veins tracing across a bright luminous ivory backdrop. Hand-selected book-matched slabs.',
    image: '/assets/prod_statuario.png',
    galleryImages: [
      '/assets/prod_statuario.png',
      '/assets/prod_italian_white.png',
      '/assets/hero_banner.png'
    ],
    featured: true
  },
  {
    id: 'prod-4',
    name: 'Crema Marfil Marble',
    category: 'Marble',
    pricePerSqFt: 480,
    rating: 4.8,
    reviewCount: 132,
    stockStatus: 'In Stock',
    availableStockSqFt: 1300,
    vendorName: 'Mediterranean Stone Co.',
    vendorLocation: 'Kukatpally, Hyderabad',
    type: 'Imported Marble',
    finish: 'Polished',
    thickness: '18 mm',
    usage: 'Flooring, Staircases, Wall Cladding',
    description: 'Celebrated Spanish beige marble characterized by uniform warm tones and subtle golden-brown cinnamon veins. Brings warmth and grandeur to residential spaces.',
    image: '/assets/prod_crema_marfil.png',
    galleryImages: [
      '/assets/prod_crema_marfil.png',
      '/assets/prod_italian_white.png'
    ],
    featured: false,
    bestSeller: true
  },
  {
    id: 'prod-5',
    name: 'Makrana Pure White Marble',
    category: 'Marble',
    pricePerSqFt: 520,
    rating: 4.9,
    reviewCount: 154,
    stockStatus: 'In Stock',
    availableStockSqFt: 1600,
    vendorName: 'Rajasthan Heritage Marbles',
    vendorLocation: 'Secunderabad, Telangana',
    type: 'Pure Calcite Marble',
    finish: 'Super Gloss Polished',
    thickness: '18–20 mm',
    usage: 'Flooring, Mandir / Puja Rooms, Heritage Villas',
    description: 'The legendary Makrana white marble known for its pure calcium composition that retains its pristine luster for decades without yellowing or degradation.',
    image: '/assets/prod_makrana_white.jpg',
    galleryImages: [
      '/assets/prod_makrana_white.jpg',
      '/assets/prod_statuario.png'
    ],
    featured: true
  },
  {
    id: 'prod-6',
    name: 'Rainforest Green Marble',
    category: 'Marble',
    pricePerSqFt: 390,
    rating: 4.6,
    reviewCount: 78,
    stockStatus: 'Limited Stock',
    availableStockSqFt: 350,
    vendorName: 'Aravali Exotics Stone Hub',
    vendorLocation: 'Gachibowli, Hyderabad',
    type: 'Serpentine Marble',
    finish: 'Antique Leather Finish',
    thickness: '20 mm',
    usage: 'Feature Walls, Fireplaces, Bar Counters',
    description: 'A striking exotic stone displaying intricate tree-branch veining in deep moss green and earthen terracotta tones. Adds dramatic architectural focal points.',
    image: '/assets/prod_rainforest_green.jpg',
    galleryImages: [
      '/assets/prod_rainforest_green.jpg',
      '/assets/prod_black_galaxy.png'
    ],
    featured: false
  },
  {
    id: 'prod-7',
    name: 'Honey Onyx Translucent Slab',
    category: 'Natural Stone',
    pricePerSqFt: 890,
    rating: 5.0,
    reviewCount: 42,
    stockStatus: 'Available on Request',
    availableStockSqFt: 180,
    vendorName: 'Elite Onyx Studio',
    vendorLocation: 'Hitec City, Hyderabad',
    type: 'Translucent Onyx',
    finish: 'Honed & Polished',
    thickness: '16–18 mm',
    usage: 'Backlit Walls, Luxury Countertops, Reception Desks',
    description: 'Rare backlit honey onyx stone with flowing bands of amber, cream, and caramel. Transmits ambient LED lighting for a breathtaking glowing aesthetic.',
    image: '/assets/prod_honey_onyx.jpg',
    galleryImages: [
      '/assets/prod_honey_onyx.jpg'
    ],
    featured: true
  },
  {
    id: 'prod-8',
    name: 'Beige Travertine Stone',
    category: 'Natural Stone',
    pricePerSqFt: 420,
    rating: 4.7,
    reviewCount: 88,
    stockStatus: 'In Stock',
    availableStockSqFt: 950,
    vendorName: 'Tuscan Stone Imports',
    vendorLocation: 'Begumpet, Hyderabad',
    type: 'Sedimentary Limestone',
    finish: 'Filled & Honed',
    thickness: '20 mm',
    usage: 'Exterior Cladding, Pool Decks, Bathroom Walls',
    description: 'Naturally porous Italian limestone with warm earthen striations, filled and honed for moisture-resistant endurance and timeless European elegance.',
    image: '/assets/prod_beige_travertine.jpg',
    galleryImages: [
      '/assets/prod_beige_travertine.jpg'
    ],
    featured: false
  },
  {
    id: 'prod-9',
    name: 'Designer Glazed Vitrified Tiles (GVT)',
    category: 'Tiles',
    pricePerSqFt: 85,
    rating: 4.8,
    reviewCount: 310,
    stockStatus: 'In Stock',
    availableStockSqFt: 4200,
    vendorName: 'Kajaria Brand Galleria',
    vendorLocation: 'Somajiguda, Hyderabad',
    type: 'Digital Glazed Vitrified',
    finish: 'High Gloss Nanotech',
    thickness: '9 mm (600x1200 mm)',
    usage: 'Living Room Flooring, Commercial, Bathrooms',
    description: 'Large format 4x2 ft vitrified tiles reproducing bookmatched Italian marble patterns with high stain resistance and zero porosity.',
    image: '/assets/cat_tiles.png',
    galleryImages: [
      '/assets/cat_tiles.png',
      '/assets/prod_italian_white.png'
    ],
    featured: false,
    bestSeller: true
  },
  {
    id: 'prod-10',
    name: 'Engineered Calacatta Quartz',
    category: 'Quartz',
    pricePerSqFt: 720,
    rating: 4.9,
    reviewCount: 115,
    stockStatus: 'In Stock',
    availableStockSqFt: 850,
    vendorName: 'Silestone Quartz Gallery',
    vendorLocation: 'Kondapur, Hyderabad',
    type: '93% Natural Quartz Mineral',
    finish: 'Polished Silk',
    thickness: '18 mm',
    usage: 'Heavy-Duty Kitchen Sinks, Counters, Island Tops',
    description: 'Zero maintenance engineered quartz resistant to turmeric stains, lemon acids, and knife scratches while preserving the organic beauty of Calacatta marble.',
    image: '/assets/cat_quartz.png',
    galleryImages: [
      '/assets/cat_quartz.png'
    ],
    featured: true
  },
  // Bathroom Collection Specific Items
  {
    id: 'prod-11',
    name: 'Anti-Skid Calacatta Bathroom Slab',
    category: 'Bathroom Collection',
    pricePerSqFt: 340,
    rating: 4.9,
    reviewCount: 82,
    stockStatus: 'In Stock',
    availableStockSqFt: 1400,
    vendorName: 'Royal Marble Emporium',
    vendorLocation: 'Madhapur, Hyderabad',
    type: 'Honed Anti-Slip Marble',
    finish: 'Satin Matte / Anti-Skid',
    thickness: '18 mm',
    usage: 'Shower Enclosures, Bathroom Flooring, Vanity Tops',
    description: 'Specialized honed-finish Italian Calacatta marble treated with anti-slip micro-grooving for luxury bathroom floors and wet areas without slipping hazards.',
    image: '/assets/prod_italian_white.png',
    galleryImages: [
      '/assets/prod_italian_white.png',
      '/assets/prod_statuario.png'
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'prod-12',
    name: 'Waterproof Textured Wall Tile 2x1 ft',
    category: 'Bathroom Collection',
    pricePerSqFt: 92,
    rating: 4.7,
    reviewCount: 145,
    stockStatus: 'In Stock',
    availableStockSqFt: 3200,
    vendorName: 'Kajaria Brand Galleria',
    vendorLocation: 'Somajiguda, Hyderabad',
    type: 'Ceramic Digital Wall Tile',
    finish: 'Water Repellent Matte',
    thickness: '8.5 mm',
    usage: 'Bathroom Accent Walls, Powder Rooms',
    description: '3D geometric relief tiles designed specifically for bathroom splash zones with zero water absorption and easy wipe cleaning.',
    image: '/assets/cat_tiles.png',
    galleryImages: [
      '/assets/cat_tiles.png'
    ]
  },
  // Kitchen Collection Specific Items
  {
    id: 'prod-13',
    name: 'Stain-Proof Jet Black Kitchen Countertop',
    category: 'Kitchen Collection',
    pricePerSqFt: 310,
    rating: 4.9,
    reviewCount: 190,
    stockStatus: 'In Stock',
    availableStockSqFt: 2100,
    vendorName: 'Deccan Natural Stones',
    vendorLocation: 'Jubilee Hills, Hyderabad',
    type: 'Heavy Duty Granite Slab',
    finish: 'Mirror Polished Bullnose Edge',
    thickness: '20 mm',
    usage: 'Modular Kitchen Countertops, Island Benches, Backsplashes',
    description: 'Ultra-dense Indian granite tested against hot pans, lemon juice, turmeric pastes, and oil splatters. Pre-sealed with nano-penetrating sealer.',
    image: '/assets/prod_black_galaxy.png',
    galleryImages: [
      '/assets/prod_black_galaxy.png',
      '/assets/cat_granite.png'
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'prod-14',
    name: 'Calacatta Gold Seamless Kitchen Quartz',
    category: 'Kitchen Collection',
    pricePerSqFt: 760,
    rating: 4.8,
    reviewCount: 64,
    stockStatus: 'In Stock',
    availableStockSqFt: 720,
    vendorName: 'Silestone Quartz Gallery',
    vendorLocation: 'Kondapur, Hyderabad',
    type: 'Food-Grade Engineered Quartz',
    finish: 'Velvet Silk',
    thickness: '20 mm',
    usage: 'Breakfast Counters, Kitchen Platforms',
    description: 'Non-porous hygienic quartz certified safe for direct dough rolling and vegetable chopping. Gorgeous subtle golden veining on warm white.',
    image: '/assets/cat_quartz.png',
    galleryImages: [
      '/assets/cat_quartz.png'
    ]
  }
];

export const INITIAL_WORKERS: Worker[] = [
  {
    id: 'w-1',
    name: 'Ramesh Kumar',
    skill: 'Master Tile Fitter',
    category: 'Tile Fitter',
    ratePerDay: 800,
    ratePerHour: 120,
    rating: 4.8,
    reviewCount: 126,
    experienceYears: 4,
    completedJobs: 248,
    distanceKm: 1.2,
    isOnline: true,
    isAvailableNow: true,
    photo: '/assets/worker_tile_fitter.png',
    serviceArea: 'Madhapur, Hitec City, Gachibowli, Kondapur',
    verified: true,
    portfolioImages: [
      '/assets/worker_tile_fitter.png',
      '/assets/prod_italian_white.png',
      '/assets/hero_banner.png'
    ],
    phone: '+91 98480 12345',
    about: 'Specialized in large format vitrified tiles (4x2 and 6x4), epoxy grouting, laser leveling, and precision wall cladding. Over 4 years of residential and commercial fitting.',
    estimatedArrivalMin: 25
  },
  {
    id: 'w-2',
    name: 'Suresh Verma',
    skill: 'Senior Marble Fitter',
    category: 'Marble Fitter',
    ratePerDay: 950,
    ratePerHour: 140,
    rating: 4.9,
    reviewCount: 214,
    experienceYears: 6,
    completedJobs: 380,
    distanceKm: 2.5,
    isOnline: true,
    isAvailableNow: true,
    photo: '/assets/worker_tile_fitter.png',
    serviceArea: 'Jubilee Hills, Banjara Hills, Somajiguda',
    verified: true,
    portfolioImages: [
      '/assets/prod_statuario.png',
      '/assets/prod_italian_white.png'
    ],
    phone: '+91 98481 98765',
    about: 'Expert craftsman for Italian marble dry-lay, bookmatching veins, chemical anchoring, and leveling with zero lippage. Trusted by top interior architects in Hyderabad.',
    estimatedArrivalMin: 35
  },
  {
    id: 'w-3',
    name: 'Mohammed Arif',
    skill: 'Expert Marble Polisher',
    category: 'Marble Polisher',
    ratePerDay: 750,
    ratePerHour: 110,
    rating: 4.8,
    reviewCount: 189,
    experienceYears: 5,
    completedJobs: 310,
    distanceKm: 3.1,
    isOnline: true,
    isAvailableNow: true,
    photo: '/assets/worker_painter.png',
    serviceArea: 'Banjara Hills, Mehdipatnam, Begumpet',
    verified: true,
    portfolioImages: [
      '/assets/prod_italian_white.png',
      '/assets/prod_crema_marfil.png'
    ],
    phone: '+91 98482 45678',
    about: 'Specialist in 7-stage Italian diamond pad polishing, Klindex crystallization, Italian silux coating, and restoration of old, dull marble floors to pristine mirror reflection.',
    estimatedArrivalMin: 40
  },
  {
    id: 'w-4',
    name: 'Rajesh Naidu',
    skill: 'Experienced Mason',
    category: 'Mason',
    ratePerDay: 850,
    ratePerHour: 130,
    rating: 4.7,
    reviewCount: 160,
    experienceYears: 8,
    completedJobs: 420,
    distanceKm: 1.8,
    isOnline: true,
    isAvailableNow: true,
    photo: '/assets/worker_tile_fitter.png',
    serviceArea: 'Kukatpally, Miyapur, Nizampet',
    verified: true,
    portfolioImages: [
      '/assets/prod_makrana_white.jpg'
    ],
    phone: '+91 98483 55667',
    about: 'Brick masonry, PCC base screeding for marble/tile laying, plastering, stone threshold fixing, and structural modifications for residential renovations.',
    estimatedArrivalMin: 30
  },
  {
    id: 'w-5',
    name: 'Prakash Reddy',
    skill: 'Granite Countertop Specialist',
    category: 'Granite Fitter',
    ratePerDay: 900,
    ratePerHour: 135,
    rating: 4.8,
    reviewCount: 94,
    experienceYears: 4,
    completedJobs: 175,
    distanceKm: 4.2,
    isOnline: true,
    isAvailableNow: false,
    photo: '/assets/worker_tile_fitter.png',
    serviceArea: 'Gachibowli, Financial District, Nanakramguda',
    verified: true,
    portfolioImages: [
      '/assets/prod_black_galaxy.png'
    ],
    phone: '+91 98484 22334',
    about: 'Precision granite kitchen platform fitting, sink cutouts, half/full bullnose chamfering, and staircase riser alignment.',
    estimatedArrivalMin: 50
  },
  {
    id: 'w-6',
    name: 'Ajay Sharma',
    skill: 'Interior & Texture Painter',
    category: 'Painter',
    ratePerDay: 700,
    ratePerHour: 100,
    rating: 4.7,
    reviewCount: 112,
    experienceYears: 4,
    completedJobs: 198,
    distanceKm: 3.8,
    isOnline: true,
    isAvailableNow: true,
    photo: '/assets/worker_painter.png',
    serviceArea: 'Ameerpet, Punjagutta, Somajiguda',
    verified: true,
    portfolioImages: [
      '/assets/worker_painter.png'
    ],
    phone: '+91 98485 77889',
    about: 'Professional interior painting, wall putty smoothing, primer coating, Royal luxury sheen emulsion, and waterproof damp-proof treatment.',
    estimatedArrivalMin: 45
  },
  {
    id: 'w-7',
    name: 'Santosh Yadav',
    skill: 'Licensed Site Plumber',
    category: 'Plumber',
    ratePerDay: 650,
    ratePerHour: 95,
    rating: 4.6,
    reviewCount: 88,
    experienceYears: 5,
    completedJobs: 160,
    distanceKm: 2.0,
    isOnline: true,
    isAvailableNow: true,
    photo: '/assets/worker_tile_fitter.png',
    serviceArea: 'Secunderabad, Malkajgiri, Alwal',
    verified: true,
    portfolioImages: [],
    phone: '+91 98486 33445',
    about: 'Bathroom concealed CPVC plumbing, diverter installation, sanitary ware fixtures, drainage trap alignment before tile laying.',
    estimatedArrivalMin: 30
  },
  {
    id: 'w-8',
    name: 'Vikram Singh',
    skill: 'Master Site Electrician',
    category: 'Electrician',
    ratePerDay: 700,
    ratePerHour: 100,
    rating: 4.9,
    reviewCount: 142,
    experienceYears: 6,
    completedJobs: 290,
    distanceKm: 1.5,
    isOnline: true,
    isAvailableNow: true,
    photo: '/assets/worker_tile_fitter.png',
    serviceArea: 'Madhapur, Jubilee Hills, Kavuri Hills',
    verified: true,
    portfolioImages: [],
    phone: '+91 98487 11223',
    about: 'Concealed wiring, DB dressing, cove lighting under stone ledges, marble wall switchboard cutout installations, and inverter setups.',
    estimatedArrivalMin: 20
  },
  {
    id: 'w-9',
    name: 'Anand Rao',
    skill: 'Fine Wood Carpenter',
    category: 'Carpenter',
    ratePerDay: 850,
    ratePerHour: 125,
    rating: 4.8,
    reviewCount: 105,
    experienceYears: 7,
    completedJobs: 215,
    distanceKm: 2.9,
    isOnline: true,
    isAvailableNow: true,
    photo: '/assets/worker_painter.png',
    serviceArea: 'Dilsukhnagar, LB Nagar, Kothapet',
    verified: true,
    portfolioImages: [],
    phone: '+91 98488 66778',
    about: 'Modular kitchen carcass framing, door frame jamb fixing over stone thresholds, wooden partition panels, and wardrobe fitting.',
    estimatedArrivalMin: 40
  },
  {
    id: 'w-10',
    name: 'Mahesh Goud',
    skill: 'Site Labor & Slab Shifting',
    category: 'Labor / Helper',
    ratePerDay: 500,
    ratePerHour: 75,
    rating: 4.5,
    reviewCount: 67,
    experienceYears: 2,
    completedJobs: 130,
    distanceKm: 1.0,
    isOnline: true,
    isAvailableNow: true,
    photo: '/assets/worker_tile_fitter.png',
    serviceArea: 'All areas in Hyderabad West',
    verified: true,
    portfolioImages: [],
    phone: '+91 98489 99001',
    about: 'Heavy marble slab lifting and shifting, mortar mixing, tile loading/unloading, site debris cleanup and helper assistance.',
    estimatedArrivalMin: 15
  }
];

export const INITIAL_ORDERS: ProductOrder[] = [
  {
    id: 'ORD-88241',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        areaSqFt: 100,
        subtotal: 32000
      }
    ],
    siteAddress: 'Flat 402, Aditya Empress Towers, Shaikpet, Hyderabad - 500008',
    contactName: 'Muzammil Shaik',
    contactPhone: '+91 99887 76655',
    paymentMethod: 'UPI',
    subtotal: 32000,
    deliveryCharges: 0,
    totalAmount: 32000,
    status: 'Delivered',
    createdAt: '18 Nov 2026, 11:30 AM',
    estimatedDelivery: '20 Nov 2026',
    trackingStep: 4
  },
  {
    id: 'ORD-88319',
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        areaSqFt: 100,
        subtotal: 28000
      }
    ],
    siteAddress: 'Plot 45, Road No. 12, Jubilee Hills, Hyderabad - 500033',
    contactName: 'Muzammil Shaik',
    contactPhone: '+91 99887 76655',
    paymentMethod: 'Credit/Debit Card',
    subtotal: 28000,
    deliveryCharges: 500,
    totalAmount: 28500,
    status: 'Dispatched',
    createdAt: '21 Nov 2026, 03:45 PM',
    estimatedDelivery: '23 Nov 2026',
    trackingStep: 3
  }
];

export const INITIAL_BOOKINGS: WorkerBooking[] = [
  {
    id: 'RRW268734',
    workerId: 'w-1',
    workerName: 'Tile Fitter (Ramesh Kumar)',
    workerSkill: 'Master Tile Fitter',
    workerPhoto: '/assets/worker_tile_fitter.png',
    requirementType: 'Per Day',
    numberOfWorkers: 1,
    date: 'Sat, 22 Nov 2026',
    timeSlot: '9:00 AM – 6:00 PM',
    siteAddress: 'Villa 18, Palm Meadows, Gachibowli, Hyderabad - 500032',
    jobDescription: 'Tile fitting for 2BHK, approximately 1000 sq.ft.',
    ratePerUnit: 800,
    totalAmount: 800,
    status: 'Completed',
    createdAt: '20 Nov 2026, 10:15 AM',
    trackingStep: 4
  },
  {
    id: 'RRW269105',
    workerId: 'w-6',
    workerName: 'Painter (Ajay Sharma)',
    workerSkill: 'Interior & Texture Painter',
    workerPhoto: '/assets/worker_painter.png',
    requirementType: 'Per Day',
    numberOfWorkers: 2,
    date: 'Wed, 25 Nov 2026',
    timeSlot: '9:00 AM – 6:00 PM',
    siteAddress: 'Flat 402, Aditya Empress Towers, Shaikpet, Hyderabad - 500008',
    jobDescription: 'Interior primer and 2 coats luxury emulsion for 3 rooms.',
    ratePerUnit: 700,
    totalAmount: 1400,
    status: 'Accepted',
    createdAt: '22 Nov 2026, 02:20 PM',
    trackingStep: 1
  }
];

export const SAVED_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'Main Construction Site (Villa 18)',
    label: 'Site',
    fullAddress: 'Villa 18, Palm Meadows, Near Financial District, Gachibowli',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500032',
    phone: '+91 99887 76655',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Home Apartment',
    label: 'Home',
    fullAddress: 'Flat 402, Aditya Empress Towers, Tolichowki Road, Shaikpet',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500008',
    phone: '+91 99887 76655',
    isDefault: false
  },
  {
    id: 'addr-3',
    name: 'Commercial Site Office',
    label: 'Office',
    fullAddress: 'Building 4, Mindspace Tech Park, Hitec City',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    phone: '+91 99887 76655',
    isDefault: false
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Worker Request Accepted',
    message: 'Ajay Sharma accepted your booking for 25 Nov 2026. Click to track details.',
    type: 'booking',
    timestamp: '2 hours ago',
    read: false,
    referenceId: 'RRW269105'
  },
  {
    id: 'notif-2',
    title: 'Marble Order Dispatched',
    message: 'Order #ORD-88319 (Black Galaxy Granite) is on the way in vehicle TS-09-UB-4421.',
    type: 'order',
    timestamp: '5 hours ago',
    read: false,
    referenceId: 'ORD-88319'
  },
  {
    id: 'notif-3',
    title: 'Worker Service Completed',
    message: 'Ramesh Kumar completed tile fitting work. Please rate your experience.',
    type: 'booking',
    timestamp: 'Yesterday',
    read: true,
    referenceId: 'RRW268734'
  },
  {
    id: 'notif-4',
    title: 'Exclusive Offer',
    message: 'Get 10% off on all Statuario Italian Marble orders above 500 Sq.ft this week!',
    type: 'offer',
    timestamp: '2 days ago',
    read: true
  }
];
