'use client';

import { useEffect } from 'react';
import { useAdminStore } from '@/lib/adminStore';
import ProductDetail from './ProductDetail';
import ProductCard from './ProductCard';

export default function DynamicProductDetail({ slug }: { slug: string }) {
  const { products, dbLoaded, loadFromDB } = useAdminStore();

  useEffect(() => {
    if (!dbLoaded) loadFromDB();
  }, [dbLoaded, loadFromDB]);
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] pt-32 text-center">
        <p className="text-[#3E2A1E] text-lg">Product not found</p>
      </div>
    );
  }

  const related = (product.styledWith || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <div className="bg-[#F7F3EC] pt-16 md:pt-20">
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="py-20 md:py-28 px-6 md:px-16 max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-3">Complete the Look</p>
            <h2 className="font-['Cormorant_Garamond',serif] text-3xl md:text-4xl text-[#3E2A1E]">Styled With</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
