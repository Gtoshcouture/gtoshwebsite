'use client';

import { useEffect } from 'react';
import { useAdminStore } from '@/lib/adminStore';
import ProductCard from './ProductCard';

function useLoadProducts() {
  const { dbLoaded, loadFromDB, products } = useAdminStore();
  useEffect(() => {
    if (!dbLoaded) loadFromDB();
  }, [dbLoaded, loadFromDB]);
  return products;
}

export function AllProductsGrid() {
  const products = useLoadProducts();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 mb-20">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

export function CategoryProductsGrid({ category }: { category: 'clothing' | 'bags' }) {
  const products = useLoadProducts();
  const filtered = products.filter((p) => p.category === category);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 mb-20">
      {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
