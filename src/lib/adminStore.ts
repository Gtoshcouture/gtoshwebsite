'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as defaultProducts, Product, reviews as defaultReviews } from './products';

// --- Types ---

export type Order = {
  id: string;
  date: string;
  customer: string;
  email: string;
  phone?: string;
  items: { productId: string; name: string; size?: string; color: string; qty: number; price: number }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'fulfilled' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  address: string;
  notes?: string;
  history: { date: string; action: string }[];
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'refunded' | 'partial_refund';
};

export type PaymentLink = {
  id: string;
  title: string;
  amount: number;
  currency: string;
  url: string;
  status: 'active' | 'expired' | 'paid';
  createdAt: string;
  paidBy?: string;
};

export type Payout = {
  id: string;
  date: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  destination: string;
};

export type Subscriber = {
  id: string;
  email: string;
  name?: string;
  source: string;
  joinedAt: string;
  tags: string[];
};

export type ReviewItem = {
  id: string;
  productId: string;
  productName: string;
  author: string;
  email: string;
  rating: number;
  text: string;
  photo?: string;
  date: string;
  verified: boolean;
  published: boolean;
};

export type ShippingProfile = {
  id: string;
  name: string;
  type: 'flat' | 'free' | 'weight';
  rate: number;
  freeAbove?: number;
  estimatedDays: string;
  appliesTo: string[];
};

export type MediaItem = {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
  uploadedAt: string;
  size?: string;
};

export type PaymentSettings = {
  stripeEnabled: boolean;
  stripeKey: string;
  applePayEnabled: boolean;
  paypalEnabled: boolean;
  paypalEmail: string;
  afterpayEnabled: boolean;
};

export type TaxSettings = {
  enabled: boolean;
  rate: number;
  includedInPrice: boolean;
  taxableCategories: string[];
};

export type StoreSettings = {
  storeName: string;
  email: string;
  currency: string;
  payments: PaymentSettings;
  tax: TaxSettings;
  socialLinks: { instagram: string; tiktok: string };
};

// --- Store ---

type AdminStore = {
  isLoggedIn: boolean;
  products: Product[];
  orders: Order[];
  paymentLinks: PaymentLink[];
  payouts: Payout[];
  subscribers: Subscriber[];
  reviews: ReviewItem[];
  shippingProfiles: ShippingProfile[];
  media: MediaItem[];
  settings: StoreSettings;

  login: (password: string) => boolean;
  logout: () => void;

  // Products
  addProduct: (p: Product) => void;
  updateProduct: (id: string, u: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;

  // Orders
  updateOrder: (id: string, u: Partial<Order>) => void;
  addOrderHistory: (id: string, action: string) => void;
  fulfillOrder: (id: string) => void;
  shipOrder: (id: string, tracking: string, carrier: string) => void;
  cancelOrder: (id: string) => void;
  refundOrder: (id: string) => void;

  // Payment links
  addPaymentLink: (p: PaymentLink) => void;
  deletePaymentLink: (id: string) => void;

  // Subscribers
  addSubscriber: (s: Subscriber) => void;
  deleteSubscriber: (id: string) => void;
  tagSubscriber: (id: string, tag: string) => void;

  // Reviews
  addReview: (r: ReviewItem) => void;
  toggleReviewPublished: (id: string) => void;
  deleteReview: (id: string) => void;

  // Shipping
  addShippingProfile: (s: ShippingProfile) => void;
  updateShippingProfile: (id: string, u: Partial<ShippingProfile>) => void;
  deleteShippingProfile: (id: string) => void;

  // Media
  addMedia: (m: MediaItem) => void;
  deleteMedia: (id: string) => void;

  // Settings
  updateSettings: (u: Partial<StoreSettings>) => void;
  updatePaymentSettings: (u: Partial<PaymentSettings>) => void;
  updateTaxSettings: (u: Partial<TaxSettings>) => void;
};

const ADMIN_PASSWORD = 'gtosh2025';

const sampleOrders: Order[] = [
  {
    id: 'ORD-1001', date: '2026-05-04T14:30:00', customer: 'Amara Johnson', email: 'amara.j@email.com', phone: '+1 (212) 555-0134',
    items: [{ productId: 'p1', name: 'Arc Structured Tote', color: 'Brown', qty: 1, price: 485 }],
    subtotal: 485, shipping: 0, tax: 38.80, total: 523.80, status: 'pending',
    address: '123 Main St, Apt 4B, New York, NY 10001', history: [{ date: '2026-05-04T14:30:00', action: 'Order placed' }],
    paymentMethod: 'Stripe (Visa ****4242)', paymentStatus: 'paid',
  },
  {
    id: 'ORD-1002', date: '2026-05-03T09:15:00', customer: 'Talia Morris', email: 'talia.m@email.com',
    items: [
      { productId: 'p4', name: 'Pleat Midi Dress', size: 'S', color: 'Cream', qty: 1, price: 395 },
      { productId: 'p2', name: 'Fold Crossbody', color: 'Brown', qty: 1, price: 320 },
    ],
    subtotal: 715, shipping: 0, tax: 57.20, total: 772.20, status: 'processing',
    address: '456 Oak Ave, Los Angeles, CA 90001', history: [{ date: '2026-05-03T09:15:00', action: 'Order placed' }, { date: '2026-05-03T10:00:00', action: 'Payment confirmed' }],
    paymentMethod: 'PayPal', paymentStatus: 'paid',
  },
  {
    id: 'ORD-1003', date: '2026-05-01T18:45:00', customer: 'Sofia Reyes', email: 'sofia.r@email.com', phone: '+1 (305) 555-0198',
    items: [{ productId: 'p6', name: 'Column Blazer', size: 'M', color: 'Charcoal', qty: 1, price: 445 }],
    subtotal: 445, shipping: 0, tax: 35.60, total: 480.60, status: 'shipped',
    trackingNumber: '1Z999AA10123456784', carrier: 'UPS', trackingUrl: 'https://www.ups.com/track?tracknum=1Z999AA10123456784',
    address: '789 Pine Rd, Miami, FL 33101', history: [{ date: '2026-05-01T18:45:00', action: 'Order placed' }, { date: '2026-05-02T09:00:00', action: 'Marked as fulfilled' }, { date: '2026-05-02T14:00:00', action: 'Shipped via UPS' }],
    paymentMethod: 'Stripe (Visa ****1234)', paymentStatus: 'paid',
  },
  {
    id: 'ORD-1004', date: '2026-04-28T11:00:00', customer: 'Renee Davis', email: 'renee.d@email.com',
    items: [{ productId: 'p3', name: 'Column Clutch', color: 'Deep Red', qty: 1, price: 265 }],
    subtotal: 265, shipping: 15, tax: 21.20, total: 301.20, status: 'delivered',
    trackingNumber: 'FEDEX789012345', carrier: 'FedEx',
    address: '321 Elm St, Chicago, IL 60601', history: [{ date: '2026-04-28T11:00:00', action: 'Order placed' }, { date: '2026-04-29T08:00:00', action: 'Shipped via FedEx' }, { date: '2026-05-01T12:00:00', action: 'Delivered' }],
    paymentMethod: 'Apple Pay', paymentStatus: 'paid',
  },
];

const sampleSubscribers: Subscriber[] = [
  { id: 's1', email: 'amara.j@email.com', name: 'Amara Johnson', source: 'Checkout', joinedAt: '2026-04-15', tags: ['customer'] },
  { id: 's2', email: 'talia.m@email.com', name: 'Talia Morris', source: 'Checkout', joinedAt: '2026-04-20', tags: ['customer'] },
  { id: 's3', email: 'sofia.r@email.com', name: 'Sofia Reyes', source: 'Footer signup', joinedAt: '2026-04-22', tags: ['subscriber'] },
  { id: 's4', email: 'zara.t@email.com', name: 'Zara Thompson', source: 'Footer signup', joinedAt: '2026-04-25', tags: ['subscriber'] },
  { id: 's5', email: 'renee.d@email.com', name: 'Renee Davis', source: 'Checkout', joinedAt: '2026-04-28', tags: ['customer'] },
  { id: 's6', email: 'nina.k@email.com', name: 'Nina Kim', source: 'Footer signup', joinedAt: '2026-05-01', tags: ['subscriber'] },
  { id: 's7', email: 'jade.w@email.com', source: 'Footer signup', joinedAt: '2026-05-02', tags: ['subscriber'] },
  { id: 's8', email: 'luna.p@email.com', name: 'Luna Park', source: 'Footer signup', joinedAt: '2026-05-03', tags: ['subscriber', 'vip'] },
];

const sampleReviews: ReviewItem[] = defaultReviews.map((r, i) => ({
  id: r.id, productId: i < 3 ? 'p1' : 'p2', productName: i < 3 ? 'Arc Structured Tote' : 'Fold Crossbody',
  author: r.author, email: `${r.author.toLowerCase().replace(/\s/g, '.')}@email.com`,
  rating: r.rating, text: r.text, photo: r.photo, date: r.date, verified: r.verified, published: true,
}));

const defaultShipping: ShippingProfile[] = [
  { id: 'sh1', name: 'Standard', type: 'flat', rate: 15, freeAbove: 250, estimatedDays: '3-5 business days', appliesTo: ['all'] },
  { id: 'sh2', name: 'Express', type: 'flat', rate: 35, estimatedDays: '1-2 business days', appliesTo: ['all'] },
  { id: 'sh3', name: 'Free (Bags)', type: 'free', rate: 0, estimatedDays: '3-5 business days', appliesTo: ['bags'] },
];

const defaultMedia: MediaItem[] = [
  { id: 'm1', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800', name: 'hero-collection.jpg', type: 'image', uploadedAt: '2026-04-10', size: '2.4 MB' },
  { id: 'm2', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800', name: 'arc-tote-1.jpg', type: 'image', uploadedAt: '2026-04-12', size: '1.8 MB' },
  { id: 'm3', url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800', name: 'clothing-category.jpg', type: 'image', uploadedAt: '2026-04-12', size: '2.1 MB' },
];

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      products: defaultProducts,
      orders: sampleOrders,
      paymentLinks: [],
      payouts: [
        { id: 'po1', date: '2026-04-30', amount: 1245.80, status: 'completed', destination: 'Bank ****6789' },
        { id: 'po2', date: '2026-05-07', amount: 1296.00, status: 'pending', destination: 'Bank ****6789' },
      ],
      subscribers: sampleSubscribers,
      reviews: sampleReviews,
      shippingProfiles: defaultShipping,
      media: defaultMedia,
      settings: {
        storeName: 'GTOSH',
        email: 'hello@gtosh.com',
        currency: 'USD',
        payments: { stripeEnabled: true, stripeKey: '', applePayEnabled: false, paypalEnabled: false, paypalEmail: '', afterpayEnabled: false },
        tax: { enabled: true, rate: 8, includedInPrice: false, taxableCategories: ['clothing', 'bags'] },
        socialLinks: { instagram: 'https://instagram.com/gtoshcouture', tiktok: 'https://tiktok.com/@gtosh' },
      },

      login: (pw) => { if (pw === ADMIN_PASSWORD) { set({ isLoggedIn: true }); return true; } return false; },
      logout: () => set({ isLoggedIn: false }),

      addProduct: (p) => set({ products: [...get().products, p] }),
      updateProduct: (id, u) => set({ products: get().products.map(p => p.id === id ? { ...p, ...u } : p) }),
      deleteProduct: (id) => set({ products: get().products.filter(p => p.id !== id) }),
      duplicateProduct: (id) => {
        const o = get().products.find(p => p.id === id);
        if (o) set({ products: [...get().products, { ...o, id: `p${Date.now()}`, slug: `${o.slug}-copy`, name: `${o.name} (Copy)` }] });
      },

      updateOrder: (id, u) => set({ orders: get().orders.map(o => o.id === id ? { ...o, ...u } : o) }),
      addOrderHistory: (id, action) => set({
        orders: get().orders.map(o => o.id === id ? { ...o, history: [...o.history, { date: new Date().toISOString(), action }] } : o),
      }),
      fulfillOrder: (id) => { get().updateOrder(id, { status: 'fulfilled' }); get().addOrderHistory(id, 'Marked as fulfilled'); },
      shipOrder: (id, tracking, carrier) => {
        const urls: Record<string, string> = { UPS: `https://ups.com/track?tracknum=${tracking}`, FedEx: `https://fedex.com/fedextrack/?trknbr=${tracking}`, USPS: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking}` };
        get().updateOrder(id, { status: 'shipped', trackingNumber: tracking, carrier, trackingUrl: urls[carrier] || '' });
        get().addOrderHistory(id, `Shipped via ${carrier} — ${tracking}`);
      },
      cancelOrder: (id) => { get().updateOrder(id, { status: 'cancelled' }); get().addOrderHistory(id, 'Order cancelled'); },
      refundOrder: (id) => { get().updateOrder(id, { status: 'refunded', paymentStatus: 'refunded' }); get().addOrderHistory(id, 'Full refund issued'); },

      addPaymentLink: (p) => set({ paymentLinks: [p, ...get().paymentLinks] }),
      deletePaymentLink: (id) => set({ paymentLinks: get().paymentLinks.filter(p => p.id !== id) }),

      addSubscriber: (s) => set({ subscribers: [...get().subscribers, s] }),
      deleteSubscriber: (id) => set({ subscribers: get().subscribers.filter(s => s.id !== id) }),
      tagSubscriber: (id, tag) => set({
        subscribers: get().subscribers.map(s => s.id === id ? { ...s, tags: s.tags.includes(tag) ? s.tags.filter(t => t !== tag) : [...s.tags, tag] } : s),
      }),

      addReview: (r) => set({ reviews: [r, ...get().reviews] }),
      toggleReviewPublished: (id) => set({ reviews: get().reviews.map(r => r.id === id ? { ...r, published: !r.published } : r) }),
      deleteReview: (id) => set({ reviews: get().reviews.filter(r => r.id !== id) }),

      addShippingProfile: (s) => set({ shippingProfiles: [...get().shippingProfiles, s] }),
      updateShippingProfile: (id, u) => set({ shippingProfiles: get().shippingProfiles.map(s => s.id === id ? { ...s, ...u } : s) }),
      deleteShippingProfile: (id) => set({ shippingProfiles: get().shippingProfiles.filter(s => s.id !== id) }),

      addMedia: (m) => set({ media: [m, ...get().media] }),
      deleteMedia: (id) => set({ media: get().media.filter(m => m.id !== id) }),

      updateSettings: (u) => set({ settings: { ...get().settings, ...u } }),
      updatePaymentSettings: (u) => set({ settings: { ...get().settings, payments: { ...get().settings.payments, ...u } } }),
      updateTaxSettings: (u) => set({ settings: { ...get().settings, tax: { ...get().settings.tax, ...u } } }),
    }),
    { name: 'gtosh-admin' }
  )
);
