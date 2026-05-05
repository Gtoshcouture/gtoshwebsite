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
    <section className="min-h-screen flex flex-col md:flex-row bg-[#F7F3EC]">
      {/* Image — full height on desktop */}
      <div className="relative w-full md:w-1/2 h-[60vw] md:h-auto min-h-[400px]">
        <Image
          src={look.image}
          alt={look.title}
          fill
          className="object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <p className="font-['Playfair_Display',serif] italic text-2xl text-[#F7F3EC]">{look.title}</p>
        </div>
        {/* Look selector dots */}
        <div className="absolute bottom-6 right-6 flex gap-2">
          {looks.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveLook(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeLook ? 'w-6 bg-[#F7F3EC]' : 'w-1.5 bg-[#F7F3EC]/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-14">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-2">Editorial</p>
        <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-[#3E2A1E] mb-10">Shop This Look</h2>

        <div className="flex flex-col gap-7">
          {lookProducts.map((product) => product && (
            <Link key={product.id} href={`/product/${product.slug}`} className="group flex gap-5 items-center">
              <div className="relative w-16 h-20 bg-[#EDE8E0] flex-shrink-0 overflow-hidden">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1">
                <p className="font-['Playfair_Display',serif] text-[#3E2A1E] text-lg group-hover:text-[#6B4C3B] transition-colors">{product.name}</p>
                <p className="text-xs text-[#9B7B68] mt-0.5">${product.price.toLocaleString()}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9B7B68" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          ))}
        </div>

        <Link href="/shop" className="mt-12 self-start text-[11px] tracking-[0.25em] uppercase text-[#3E2A1E] border-b border-[#3E2A1E] pb-1 hover:text-[#6B4C3B] hover:border-[#6B4C3B] transition-colors">
          View All Pieces
        </Link>
      </div>
    </section>
  );
}
