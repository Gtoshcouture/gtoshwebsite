'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { looks, products } from '@/lib/products';

export default function ShopThisLook() {
  const [activeLook, setActiveLook] = useState(0);
  const look = looks[activeLook];
  const lookProducts = look.products.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <section className="py-24 md:py-36 bg-[#FDFAF5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-3">Editorial</p>
            <h2 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl text-[#3E2A1E]">Shop This Look</h2>
          </div>
          <div className="hidden md:flex gap-2">
            {looks.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveLook(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeLook ? 'bg-[#6B4C3B] w-6' : 'bg-[#9B7B68]/40'}`}
              />
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-8 md:gap-16 items-start">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[#EDE8E0]">
            <Image
              src={look.image}
              alt={look.title}
              fill
              className="object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-['Cormorant_Garamond',serif] text-2xl text-[#F7F3EC] italic">{look.title}</p>
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col justify-center gap-8">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9B7B68]">Pieces in this look</p>

            {lookProducts.map((product) => product && (
              <Link key={product.id} href={`/product/${product.slug}`} className="group flex gap-5 items-start">
                <div className="relative w-20 h-24 bg-[#EDE8E0] flex-shrink-0 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-['Cormorant_Garamond',serif] text-[#3E2A1E] text-xl group-hover:text-[#6B4C3B] transition-colors">
                    {product.name}
                  </p>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[#9B7B68] mt-1">{product.category}</p>
                  <p className="text-sm text-[#3E2A1E] mt-2">${product.price.toLocaleString()}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9B7B68" strokeWidth="1.5" className="mt-2 group-hover:translate-x-1 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            ))}

            {/* Look selector mobile */}
            <div className="flex gap-2 md:hidden">
              {looks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveLook(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeLook ? 'bg-[#6B4C3B] w-6' : 'bg-[#9B7B68]/40'}`}
                />
              ))}
            </div>

            <div className="mt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#3E2A1E] border-b border-[#3E2A1E] pb-1 hover:text-[#6B4C3B] hover:border-[#6B4C3B] transition-colors"
              >
                Shop All Looks
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
