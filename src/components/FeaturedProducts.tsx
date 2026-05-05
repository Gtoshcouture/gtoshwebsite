'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeTab === 0
    ? products.filter((p) => p.isBestSeller)
    : products.filter((p) => p.isNew);

  return (
    <section className="py-20 md:py-32 bg-[#FDFAF5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-[#3E2A1E]">Featured</h2>
          <div className="flex gap-6">
            {['Best Sellers', 'New In'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`text-[11px] tracking-[0.2em] uppercase pb-1 border-b transition-all duration-200 ${
                  i === activeTab ? 'border-[#3E2A1E] text-[#3E2A1E]' : 'border-transparent text-[#9B7B68]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto hide-scrollbar pb-2">
          {filtered.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[260px] md:w-[300px]">
              <ProductCard product={product} />
            </div>
          ))}
          <div className="flex-shrink-0 w-[260px] md:w-[300px] aspect-[3/4] bg-[#3E2A1E] flex flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="font-['Playfair_Display',serif] text-2xl text-[#F7F3EC]">See the full collection</p>
            <Link href="/shop" className="text-[10px] tracking-[0.25em] uppercase text-[#F7F3EC]/60 border-b border-[#F7F3EC]/30 pb-0.5 hover:text-[#F7F3EC] transition-colors">
              Shop All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
