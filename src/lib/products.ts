export type VariantPrice = {
  variant: string; // e.g. "Black", "S", "Black / S"
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: 'clothing' | 'bags';
  price: number;
  originalPrice?: number;
  variantPrices?: VariantPrice[];
  images: string[];
  description: string;
  details: string[];
  sizes?: string[];
  colors: string[];
  inStock: boolean;
  quantity?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isLimitedDrop?: boolean;
  dropDate?: string;
  reviews?: Review[];
  styledWith?: string[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  photo?: string;
};

export type Look = {
  id: string;
  image: string;
  title: string;
  products: string[];
};

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Amara J.',
    rating: 5,
    date: '2025-03-12',
    text: 'The quality is unreal. I get compliments every single time I carry this bag. It feels sculptural in the best way.',
    verified: true,
  },
  {
    id: 'r2',
    author: 'Talia M.',
    rating: 5,
    date: '2025-02-28',
    text: 'GTOSH bags are unlike anything else. Structured, elegant, and the leather is so buttery soft. Worth every penny.',
    verified: true,
  },
  {
    id: 'r3',
    author: 'Renee D.',
    rating: 4,
    date: '2025-01-15',
    text: 'Absolutely obsessed. The craftsmanship is impeccable. Shipping was fast and packaging was beautiful.',
    verified: true,
    photo: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80',
  },
  {
    id: 'r4',
    author: 'Sofia K.',
    rating: 5,
    date: '2025-04-02',
    text: 'This is the bag I have been looking for. Clean lines, serious structure. GTOSH gets it.',
    verified: true,
  },
  {
    id: 'r5',
    author: 'Zara T.',
    rating: 5,
    date: '2025-04-18',
    text: 'I ordered the forest green colorway and it arrived even more beautiful in person. The leather has such depth.',
    verified: true,
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'arc-structured-tote',
    name: 'Arc Structured Tote',
    category: 'bags',
    price: 485,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85',
    ],
    description: 'The Arc is a study in geometry. A rigid base softens into curved handles — structured enough to stand, elegant enough to carry anywhere.',
    details: [
      'Full-grain vegetable-tanned leather',
      'Solid brass hardware',
      'Interior zip pocket + card slots',
      '38cm W × 28cm H × 14cm D',
      'Dust bag included',
    ],
    colors: ['Cream', 'Brown', 'Forest'],
    inStock: true,
    quantity: 8,
    isBestSeller: true,
    reviews: [reviews[0], reviews[1], reviews[3]],
    styledWith: ['p4', 'p5'],
  },
  {
    id: 'p2',
    slug: 'fold-crossbody',
    name: 'Fold Crossbody',
    category: 'bags',
    price: 320,
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=85',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=85',
    ],
    description: 'Inspired by origami and fabric folds. The Fold carries everything you need without the noise.',
    details: [
      'Pebbled leather exterior',
      'Adjustable chain strap (gold-tone)',
      'Zip closure with leather pull',
      '22cm W × 15cm H × 7cm D',
      'Dust bag included',
    ],
    colors: ['Black', 'Brown', 'Deep Red'],
    inStock: true,
    quantity: 3,
    isNew: true,
    reviews: [reviews[2], reviews[4]],
    styledWith: ['p4', 'p6'],
  },
  {
    id: 'p3',
    slug: 'column-clutch',
    name: 'Column Clutch',
    category: 'bags',
    price: 265,
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=85',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=85',
    ],
    description: 'Tall. Minimal. Commanding. The Column stands apart from every clutch you own.',
    details: [
      'Smooth nappa leather',
      'Hidden magnetic closure',
      'Detachable wrist strap',
      '10cm W × 24cm H × 4cm D',
    ],
    colors: ['Cream', 'Deep Red', 'Forest'],
    inStock: true,
    quantity: 12,
    reviews: [reviews[1], reviews[3]],
    styledWith: ['p5', 'p6'],
  },
  {
    id: 'p4',
    slug: 'pleat-midi-dress',
    name: 'Pleat Midi Dress',
    category: 'clothing',
    price: 395,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85',
    ],
    description: 'Movement captured in fabric. The Pleat Midi dress falls with intention — structured at the bodice, fluid below.',
    details: [
      '100% Italian crepe',
      'Hidden side zip',
      'Midi length (mid-calf)',
      'Dry clean only',
      'Model is 5\'10" wearing size S',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Forest', 'Charcoal'],
    inStock: true,
    quantity: 6,
    isBestSeller: true,
    styledWith: ['p1', 'p2'],
  },
  {
    id: 'p5',
    slug: 'arc-wide-leg-trouser',
    name: 'Arc Wide-Leg Trouser',
    category: 'clothing',
    price: 285,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85',
    ],
    description: 'The trouser that does everything. Wide leg, high rise, tailored — without trying too hard.',
    details: [
      'Danish wool-blend fabric',
      'High-waist with invisible zip',
      'Wide leg silhouette',
      'Dry clean recommended',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Brown', 'Cream', 'Deep Red'],
    inStock: true,
    quantity: 9,
    isNew: true,
    styledWith: ['p1', 'p3'],
  },
  {
    id: 'p6',
    slug: 'column-blazer',
    name: 'Column Blazer',
    category: 'clothing',
    price: 445,
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=85',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=85',
    ],
    description: 'Architecture for the body. The Column blazer is minimal, structural, and completely essential.',
    details: [
      'Wool-cashmere blend',
      'Single button closure',
      'Padded shoulders',
      'Unlined interior',
      'Dry clean only',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Cream', 'Forest'],
    inStock: true,
    quantity: 4,
    isLimitedDrop: true,
    styledWith: ['p2', 'p3'],
  },
];

export const looks: Look[] = [
  {
    id: 'l1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85',
    title: 'Structure & Movement',
    products: ['p4', 'p1'],
  },
  {
    id: 'l2',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85',
    title: 'Editorial Column',
    products: ['p6', 'p5', 'p3'],
  },
  {
    id: 'l3',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85',
    title: 'The Fold',
    products: ['p5', 'p2'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: 'clothing' | 'bags'): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product): Product[] {
  return (product.styledWith || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];
}
