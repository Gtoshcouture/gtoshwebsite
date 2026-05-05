'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from './ProductCard';

const tabs = ['Best Sellers', 'New Drop'];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeTab === 0
    ? products.filter((p) => p.isBestSeller)
    : products.filter((p) => p.isNew);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-36 bg-[#F7F3EC]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-3">Collection</p>
            <h2 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl text-[#3E2A1E]">Featured Pieces</h2>
          </div>
          {/* Tabs */}
          <div className="hidden md:flex gap-8">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`text-xs tracking-[0.2em] uppercase pb-2 border-b transition-all duration-300 ${
                  i === activeTab ? 'border-[#3E2A1E] text-[#3E2A1E]' : 'border-transparent text-[#9B7B68] hover:text-[#6B4C3B]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="flex gap-6 mb-10 md:hidden">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`text-xs tracking-[0.2em] uppercase pb-2 border-b transition-all duration-300 ${
                i === activeTab ? 'border-[#3E2A1E] text-[#3E2A1E]' : 'border-transparent text-[#9B7B68]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scroll row */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-2"
          >
            {filtered.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] md:w-[320px]">
                <ProductCard product={product} />
              </div>
            ))}
            {/* View all card */}
            <div className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[3/4] bg-[#3E2A1E] flex flex-col items-center justify-center gap-6">
              <p className="font-['Cormorant_Garamond',serif] text-3xl text-[#F7F3EC] text-center px-8">
                Explore the full collection
              </p>
              <Link href="/shop" className="text-[10px] tracking-[0.3em] uppercase text-[#F7F3EC]/70 border-b border-[#F7F3EC]/30 pb-1 hover:text-[#F7F3EC] transition-colors">
                Shop All
              </Link>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 bg-[#F7F3EC] border border-[#6B4C3B]/20 items-center justify-center shadow-sm hover:bg-[#EDE8E0] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3E2A1E" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 bg-[#F7F3EC] border border-[#6B4C3B]/20 items-center justify-center shadow-sm hover:bg-[#EDE8E0] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3E2A1E" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
