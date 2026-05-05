'use client';

import { products } from '@/lib/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.isBestSeller || p.isNew).slice(0, 4);

  return (
    <section className="bg-[#F7F3EC] py-20 md:py-28 px-6 md:px-14">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-[#3E2A1E] mb-12">New Arrivals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
