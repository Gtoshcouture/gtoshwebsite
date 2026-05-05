'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts, Product } from './products';

export type Order = {
  id: string;
  date: string;
  customer: string;
  email: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  address: string;
};

type AdminStore = {
  products: Product[];
  orders: Order[];
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  updateOrderStatus: (id: string, status: Order['status'], trackingNumber?: string) => void;
};

const ADMIN_PASSWORD = 'gtosh2025';

const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2026-05-04',
    customer: 'Amara Johnson',
    email: 'amara@example.com',
    items: [{ name: 'Arc Structured Tote', qty: 1, price: 485 }],
    total: 485,
    status: 'pending',
    address: '123 Main St, New York, NY 10001',
  },
  {
    id: 'ORD-002',
    date: '2026-05-03',
    customer: 'Talia Morris',
    email: 'talia@example.com',
    items: [
      { name: 'Pleat Midi Dress', qty: 1, price: 395 },
      { name: 'Fold Crossbody', qty: 1, price: 320 },
    ],
    total: 715,
    status: 'processing',
    address: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    id: 'ORD-003',
    date: '2026-05-01',
    customer: 'Sofia Reyes',
    email: 'sofia@example.com',
    items: [{ name: 'Column Blazer', qty: 1, price: 445 }],
    total: 445,
    status: 'shipped',
    trackingNumber: 'UPS1234567890',
    address: '789 Pine Rd, Miami, FL 33101',
  },
];

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      orders: sampleOrders,
      isLoggedIn: false,

      login: (password) => {
        if (password === ADMIN_PASSWORD) {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },

      logout: () => set({ isLoggedIn: false }),

      updateProduct: (id, updates) => {
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        });
      },

      updateOrderStatus: (id, status, trackingNumber) => {
        set({
          orders: get().orders.map((o) =>
            o.id === id ? { ...o, status, ...(trackingNumber ? { trackingNumber } : {}) } : o
          ),
        });
      },
    }),
    { name: 'gtosh-admin' }
  )
);
