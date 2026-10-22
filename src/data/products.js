// Product Catalog for Sree Ethnic Finds
// Direct boutique ethnic collection based in Chalakuzhy, Medical College, Thiruvananthapuram, Kerala

export const SAMPLE_PRODUCTS = [
  {
    id: "sef-001",
    name: "Gulabi Bahaar Floral Straight Kurti",
    subtitle: "Chic pastel pink floral print on breathable pure cotton",
    category: "Floral Straight",
    tag: "Best Seller",
    price: 399,
    originalPrice: 899,
    discount: "56% OFF",
    rating: 4.8,
    reviewsCount: 42,
    images: [
      "/images/floral_straight.jpg",
      "/images/hero.jpg",
      "/images/promo_wardrobe.jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Pastel Pink", hex: "#FAD2E1", inStock: true },
      { name: "Peach Bloom", hex: "#FDE2E4", inStock: true },
      { name: "Cream White", hex: "#FAF6F0", inStock: false }
    ],
    fabric: "100% Pure Cambric Cotton",
    weave: "Handblock-inspired digital print",
    length: "Calf Length (42 inches)",
    sleeves: "3/4th Sleeves with notched fold",
    neckline: "V-Notch Round Neck",
    fit: "Regular Straight Fit",
    pocket: "Single functional right-side pocket",
    washCare: "Gentle machine wash with mild detergent. Line dry in shade.",
    inStock: true,
    stockCount: 18,
    isNewArrival: false,
    isBestSeller: true,
    dispatchLocation: "Chalakuzhy, Thiruvananthapuram"
  },
  {
    id: "sef-002",
    name: "Noor Mint Lace Pure Cotton Kurti",
    subtitle: "Refreshing mint green with delicate white crochet lace border",
    category: "Pastel Cotton",
    tag: "Trending on Campus",
    price: 449,
    originalPrice: 999,
    discount: "55% OFF",
    rating: 4.9,
    reviewsCount: 38,
    images: [
      "/images/pastel_mint.jpg",
      "/images/promo_wardrobe.jpg",
      "/images/hero.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Mint Green", hex: "#D8F3DC", inStock: true },
      { name: "Powder Blue", hex: "#D7E3FC", inStock: true },
      { name: "Ivory White", hex: "#FBF7EE", inStock: true }
    ],
    fabric: "Super Combed Premium Slub Cotton",
    weave: "Loom woven with pure cotton crochet lace borders",
    length: "Calf Length (43 inches)",
    sleeves: "Quarter Sleeves with Lace Accents",
    neckline: "Lace Embellished Split V-Neck",
    fit: "Straight Relaxed Fit",
    pocket: "No pocket",
    washCare: "Hand wash cold or gentle cycle. Do not wring lace trim.",
    inStock: true,
    stockCount: 12,
    isNewArrival: true,
    isBestSeller: true,
    dispatchLocation: "Chalakuzhy, Thiruvananthapuram"
  },
  {
    id: "sef-003",
    name: "Aura Indigo Short Kurti for Jeans",
    subtitle: "Chic geometric block motif designed specifically for denim pairing",
    category: "Short Kurti for Jeans",
    tag: "College Favourite",
    price: 349,
    originalPrice: 799,
    discount: "56% OFF",
    rating: 4.7,
    reviewsCount: 51,
    images: [
      "/images/short_indigo.jpg",
      "/images/promo_wardrobe.jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Indigo Blue", hex: "#2B4C7E", inStock: true },
      { name: "Earthy Rust", hex: "#B85D43", inStock: true },
      { name: "Olive Sage", hex: "#7D9D8B", inStock: true }
    ],
    fabric: "100% Breathable Cotton Mulmul",
    weave: "Dabu-inspired discharge print",
    length: "Hip Length (29 inches) - Perfect for Jeans",
    sleeves: "3/4 Sleeves with side slits",
    neckline: "Keyhole Neck with wooden button accent",
    fit: "Easy Comfort Fit with high side slits",
    pocket: "Side slit access",
    washCare: "Wash separately in cold water for first 2 washes.",
    inStock: true,
    stockCount: 24,
    isNewArrival: false,
    isBestSeller: true,
    dispatchLocation: "Chalakuzhy, Thiruvananthapuram"
  },
  {
    id: "sef-004",
    name: "Kashvi Minimal Peach Everyday Kurti",
    subtitle: "Subtle woven plaid cotton with handcrafted wooden buttons",
    category: "Minimal Everyday",
    tag: "Daily Campus Pick",
    price: 369,
    originalPrice: 849,
    discount: "57% OFF",
    rating: 4.6,
    reviewsCount: 29,
    images: [
      "/images/minimal_peach.jpg",
      "/images/promo_wardrobe.jpg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Peach Beige", hex: "#EAD7C5", inStock: true },
      { name: "Warm Khaki", hex: "#D5BDAF", inStock: true }
    ],
    fabric: "Woven Khadi-Touch Cotton",
    weave: "Minimalist pastel grid weave",
    length: "Knee Length (39 inches)",
    sleeves: "Roll-up 3/4th Sleeves with button tab",
    neckline: "Mandarin Collar with button placket",
    fit: "Comfort Straight Fit",
    pocket: "Dual front slash pockets",
    washCare: "Machine wash normal. Warm iron if needed.",
    inStock: true,
    stockCount: 15,
    isNewArrival: true,
    isBestSeller: false,
    dispatchLocation: "Chalakuzhy, Thiruvananthapuram"
  },
  {
    id: "sef-005",
    name: "Aafreen Lavender Flared Tiered Kurti",
    subtitle: "Tiered anarkali-style kurti with subtle golden butti & neckline embroidery",
    category: "Ethnic College Wear",
    tag: "Festive College Look",
    price: 489,
    originalPrice: 1099,
    discount: "55% OFF",
    rating: 4.9,
    reviewsCount: 64,
    images: [
      "/images/ethnic_lavender.jpg",
      "/images/promo_wardrobe.jpg",
      "/images/hero.jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Lilac Lavender", hex: "#C8B6FF", inStock: true },
      { name: "Dusty Rose", hex: "#E8B4B8", inStock: true }
    ],
    fabric: "Soft Cotton Rayon Blend (Super Drapey)",
    weave: "Foil butti print with mirror work yoke",
    length: "Midi Length (44 inches) with 3 tiers",
    sleeves: "Elbow Length Sleeves with zari trim",
    neckline: "Embroidered Yoke Notch Neck",
    fit: "Flared Tiered A-Line",
    pocket: "No pocket",
    washCare: "Gentle hand wash inside out to preserve foil work.",
    inStock: true,
    stockCount: 9,
    isNewArrival: true,
    isBestSeller: true,
    dispatchLocation: "Chalakuzhy, Thiruvananthapuram"
  },
  {
    id: "sef-006",
    name: "Saanvi Daisy Printed Everyday Kurti",
    subtitle: "Vibrant yellow daisy print for summer college lectures",
    category: "Floral Straight",
    tag: "Budget Steal",
    price: 329,
    originalPrice: 749,
    discount: "56% OFF",
    rating: 4.6,
    reviewsCount: 22,
    images: [
      "/images/promo_wardrobe.jpg",
      "/images/floral_straight.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Pale Daisy Yellow", hex: "#FDEAA6", inStock: true },
      { name: "Soft Coral", hex: "#FFC6B3", inStock: true }
    ],
    fabric: "100% Mulmul Cotton",
    weave: "Floral screen print",
    length: "Calf Length (41 inches)",
    sleeves: "Short cap sleeves",
    neckline: "Sweetheart Neckline",
    fit: "Straight Regular Fit",
    pocket: "Single patch pocket",
    washCare: "Normal wash, iron inside out.",
    inStock: true,
    stockCount: 30,
    isNewArrival: false,
    isBestSeller: false,
    dispatchLocation: "Chalakuzhy, Thiruvananthapuram"
  }
];

export const CATEGORIES = [
  "All Styles",
  "Floral Straight",
  "Pastel Cotton",
  "Short Kurti for Jeans",
  "Minimal Everyday",
  "Ethnic College Wear"
];

export const SIZE_CHART = [
  { size: "XS", bust: "32 in", waist: "28 in", hip: "36 in", length: "41 in" },
  { size: "S", bust: "34 in", waist: "30 in", hip: "38 in", length: "42 in" },
  { size: "M", bust: "36 in", waist: "32 in", hip: "40 in", length: "42 in" },
  { size: "L", bust: "38 in", waist: "34 in", hip: "42 in", length: "43 in" },
  { size: "XL", bust: "40 in", waist: "36 in", hip: "44 in", length: "43 in" },
  { size: "XXL", bust: "42 in", waist: "38 in", hip: "46 in", length: "44 in" },
];
