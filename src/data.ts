import { Product } from './types';

export const PRODUCTS: Product[] = [
  // ELECTRONICS
  {
    id: 'elec-1',
    title: 'AuraSound Pro Wireless Headphones',
    description: 'Immerse yourself in pure high-fidelity audio with active noise cancellation, ambient awareness mode, and up to 40 hours of playtime. Featuring ultra-soft memory foam earcups and a lightweight aluminum frame, these headphones offer unmatched acoustic comfort and rich sound staging.',
    category: 'electronics',
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    rating: 4.8,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800'
    ],
    isTrending: true,
    stock: 12,
    colors: ['Space Gray', 'Alpine White', 'Midnight Blue']
  },
  {
    id: 'elec-2',
    title: 'VoltCharge Trio Wireless Dock',
    description: 'The ultimate charging hub for your workspace. Power your smartphone, wireless earbuds, and smartwatch simultaneously at maximum speed. Crafted from premium anodized aluminum and soft-touch silicone to protect your devices from scratches.',
    category: 'electronics',
    price: 49.99,
    originalPrice: 69.99,
    discount: 28,
    rating: 4.5,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800'
    ],
    isNew: true,
    stock: 25,
    colors: ['Obsidian', 'Silver Sand']
  },
  {
    id: 'elec-3',
    title: 'VividView 27" 4K HDR USB-C Monitor',
    description: 'Elevate your creative production and productivity. This 27-inch IPS panel features crisp 4K Ultra HD resolution, 99% sRGB color gamut coverage, and a single-cable USB-C solution that delivers video, data, and 65W power delivery.',
    category: 'electronics',
    price: 349.99,
    originalPrice: 429.99,
    discount: 18,
    rating: 4.7,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 8
  },
  {
    id: 'elec-4',
    title: 'ClickPro RGB Mechanical Keyboard',
    description: 'Designed for tactile speed and pure typing pleasure. Built with hot-swappable tactile brown switches, a compact 75% layout, and beautiful customized double-shot PBT keycaps. Features customizable per-key dynamic RGB backlighting and dual-mode wireless connectivity.',
    category: 'electronics',
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    rating: 4.6,
    reviewsCount: 224,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 15,
    colors: ['Classic Gray', 'Midnight Cyber']
  },

  // FASHION
  {
    id: 'fash-1',
    title: 'UrbanFit Waterproof Windbreaker',
    description: 'An advanced weather-proof shell crafted with lightweight triple-layer micro-weave ripstop polyester. Complete with fully taped seams, adjustable storm hood, and high-quality waterproof zippers. Highly breathable for active outdoor days.',
    category: 'fashion',
    price: 79.99,
    originalPrice: 119.99,
    discount: 33,
    rating: 4.4,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800'
    ],
    isTrending: true,
    stock: 18,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Matte Black', 'Olive Drab', 'Burnt Orange']
  },
  {
    id: 'fash-2',
    title: 'LuxeWeave Knit Cashmere Sweater',
    description: 'Indulge in supreme luxury. Knit from 100% fine-gauge Mongolian cashmere, this classic crewneck offers exceptional warmth and cloud-like softness. Ribbed trim accents and an elegant modern drape make it a versatile staple.',
    category: 'fashion',
    price: 119.99,
    originalPrice: 159.99,
    discount: 25,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1574164904299-3a102b110380?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1574164904299-3a102b110380?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 10,
    sizes: ['S', 'M', 'L'],
    colors: ['Warm Oatmeal', 'Heather Charcoal', 'Classic Navy']
  },
  {
    id: 'fash-3',
    title: 'RetroStride Classic Leather Sneakers',
    description: 'Clean, minimalist sneakers built with full-grain calfskin leather, supportive memory-foam footbeds, and flexible custom rubber outsoles. Merging vintage court aesthetics with modern ergonomic support for all-day urban comfort.',
    category: 'fashion',
    price: 85.00,
    originalPrice: 110.00,
    discount: 22,
    rating: 4.6,
    reviewsCount: 421,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'
    ],
    isTrending: true,
    stock: 14,
    sizes: ['8', '9', '10', '11'],
    colors: ['Vintage White', 'Carbon Black']
  },
  {
    id: 'fash-4',
    title: 'Everyday Waxed Canvas Messenger',
    description: 'A ruggedly beautiful bag designed for daily commutes and rugged weekend travels. Built using 18oz water-resistant waxed canvas and reinforced with heavy top-grain bridle leather, sturdy brass buckles, and an adjustable shoulder pad.',
    category: 'fashion',
    price: 64.99,
    originalPrice: 89.99,
    discount: 27,
    rating: 4.7,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 9,
    colors: ['Forest Olive', 'Earth Tan', 'Slate Charcoal']
  },

  // HOME & KITCHEN
  {
    id: 'home-1',
    title: 'BaristaCraft Precision Gooseneck Kettle',
    description: 'Craft the perfect pour-over with surgical precision. This 1200W rapid heating electric kettle features dynamic real-time temperature control on a base LCD, custom temperature hold, and a perfect counterbalanced handle with thin pouring spout.',
    category: 'home-kitchen',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.8,
    reviewsCount: 201,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595434061149-865751f215a7?auto=format&fit=crop&q=80&w=800'
    ],
    isNew: true,
    stock: 16,
    colors: ['Matte Obsidian', 'Brushed Copper']
  },
  {
    id: 'home-2',
    title: 'TerraStone Ceramic 16-Piece Dinnerware Set',
    description: 'Stunning organic aesthetics for your modern dining table. Handcrafted with heavy stoneware ceramics, each piece features a subtle unique flecked glaze finish and raw bottom edges. Highly durable, scratch-resistant, dishwasher and microwave safe.',
    category: 'home-kitchen',
    price: 124.99,
    originalPrice: 169.99,
    discount: 26,
    rating: 4.6,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576016770956-debb63d900ef?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 5,
    colors: ['Speckled Gray', 'Satin White', 'Desert Ochre']
  },
  {
    id: 'home-3',
    title: 'AeroBrew Espresso & Drip Station',
    description: 'A versatile 2-in-1 coffee station featuring a 15-bar Italian pump espresso machine on one side, and a programmable 10-cup drip filter machine on the other. Integrated steam wand delivers barista-level thick froth for lattes and cappuccinos.',
    category: 'home-kitchen',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.7,
    reviewsCount: 153,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800'
    ],
    isTrending: true,
    stock: 7
  },

  // BEAUTY
  {
    id: 'beau-1',
    title: 'HydraGlow Advanced Vitamin C Serum',
    description: 'A revolutionary daily face serum containing 15% pure stabilized L-ascorbic acid, vitamin E, and hyaluronic acid. Designed to dramatically brighten hyperpigmentation, smooth uneven skin textures, and offer full-day antioxidant environmental protection.',
    category: 'beauty',
    price: 34.99,
    originalPrice: 49.99,
    discount: 30,
    rating: 4.7,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800'
    ],
    isTrending: true,
    stock: 45
  },
  {
    id: 'beau-2',
    title: 'SilkCare Cold-Pressed Hair Oil',
    description: 'Infused with cold-pressed Moroccan argan oil, jojoba extract, and wild rosemary oils. Restore damaged dry cuticles, instantly eliminate frizz, and provide heavy heat styling thermal protection. Leaves a weightless, radiant satin shine.',
    category: 'beauty',
    price: 24.50,
    originalPrice: 32.00,
    discount: 23,
    rating: 4.6,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 30
  },
  {
    id: 'beau-3',
    title: 'MineralBronze Sun Shield SPF 50',
    description: 'Broad-spectrum mineral SPF 50 physical sunscreen powered by non-nano zinc oxide. Dries completely transparent with a ultra-light physical tint that matches skin-tones perfectly. Loaded with antioxidant green tea extract and sea buckthorn.',
    category: 'beauty',
    price: 28.00,
    originalPrice: 38.00,
    discount: 26,
    rating: 4.5,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800'
    ],
    isNew: true,
    stock: 40
  },

  // SPORTS
  {
    id: 'spor-1',
    title: 'ApexFit Premium Alignment Yoga Mat',
    description: 'Crafted with eco-friendly natural tree rubber and an ultra-absorbent polyurethane top surface that guarantees a zero-slip grip even in heavy hot-yoga classes. Features laser-etched guide lines to help maintain correct posture and alignment.',
    category: 'sports',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 12,
    colors: ['Sage Green', 'Warm Coral', 'Storm Violet']
  },
  {
    id: 'spor-2',
    title: 'HydroCore Insulated Sage Flask',
    description: 'Sleek 32oz double-walled vacuum-insulated stainless steel flask. Keeps water ice-cold for 24 hours or beverages piping hot for 12 hours. High-durability powder coat finish provides an anti-sweat, secure tactile grip.',
    category: 'sports',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: 4.7,
    reviewsCount: 388,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800'
    ],
    isTrending: true,
    stock: 50,
    colors: ['Sage Matte', 'Graphite Black', 'Sand Dune']
  },
  {
    id: 'spor-3',
    title: 'Velocity Select-Weight Dumbbells',
    description: 'An entire home gym dumbbell set consolidated into a sleek, compact footprint. Intuitively dial weights from 5 lbs up to 52.5 lbs with a simple smooth dial. Solid heavy-duty interlocking steel plates coated with quiet thermoplastic polyurethane.',
    category: 'sports',
    price: 249.99,
    originalPrice: 329.99,
    discount: 24,
    rating: 4.9,
    reviewsCount: 63,
    image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800'
    ],
    isNew: true,
    stock: 4
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'LayoutGrid' },
  { id: 'electronics', name: 'Electronics', icon: 'Laptop' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
  { id: 'home-kitchen', name: 'Home & Kitchen', icon: 'Home' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles' },
  { id: 'sports', name: 'Sports', icon: 'Dumbbell' }
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Elevate Your Soundscape',
    subtitle: 'PREMIUM ELECTRONICS SALE',
    tagline: 'Up to 30% Off on Pro Headphones & Audio Accessories',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'Shop Audio Pro',
    category: 'electronics',
    colorClass: 'from-amber-950/80 to-stone-900/90'
  },
  {
    id: 2,
    title: 'Reframe Your Active Lifestyle',
    subtitle: 'SUMMER HEALTH & FITNESS',
    tagline: 'Eco-Friendly Yoga Mats, Weights, & Smart Hydration Flasks',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'Explore Gear',
    category: 'sports',
    colorClass: 'from-teal-950/80 to-slate-900/90'
  },
  {
    id: 3,
    title: 'The Essence of Urban Style',
    subtitle: 'NEW FASHION ARRIVALS',
    tagline: 'Weatherproof ripstop windbreakers & organic cashmere',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
    ctaText: 'Shop New Arrivals',
    category: 'fashion',
    colorClass: 'from-indigo-950/80 to-neutral-900/90'
  }
];
