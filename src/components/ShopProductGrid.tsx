'use client';

import { useAdminStore } from '@/lib/adminStore';
import ProductCard from './ProductCard';

export function AllProductsGrid() {
  const { products } = useAdminStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 mb-20">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

export function CategoryProductsGrid({ category }: { category: 'clothing' | 'bags' }) {
  const { products } = useAdminStore();
  const filtered = products.filter((p) => p.category === category);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 mb-20">
      {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
