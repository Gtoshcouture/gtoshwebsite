'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { useWishlistStore } from '@/lib/store';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const { toggle, has } = useWishlistStore();
  const wished = has(product.id);

  return (
    <div className="group relative">
      <Link href={`/product/${product.slug}`}>
        <div
          className="relative overflow-hidden bg-[#EDE8E0] aspect-[3/4]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Primary image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${hovered && product.images[1] ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'}`}
          />
          {/* Secondary image */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate`}
              fill
              className={`object-cover transition-all duration-700 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}`}
            />
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="text-[10px] tracking-[0.2em] uppercase bg-[#3A4E3A] text-[#F7F3EC] px-3 py-1">New</span>
            )}
            {product.isBestSeller && (
              <span className="text-[10px] tracking-[0.2em] uppercase bg-[#3E2A1E] text-[#F7F3EC] px-3 py-1">Best Seller</span>
            )}
            {product.isLimitedDrop && (
              <span className="text-[10px] tracking-[0.2em] uppercase bg-[#7A2020] text-[#F7F3EC] px-3 py-1">Limited Drop</span>
            )}
          </div>

          {/* Low stock */}
          {product.quantity && product.quantity <= 4 && product.inStock && (
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#7A2020] bg-[#F7F3EC]/90 px-3 py-1">
                Only {product.quantity} left
              </span>
            </div>
          )}

          {/* Quick view overlay */}
          <div className={`absolute inset-0 bg-black/10 flex items-end justify-center pb-6 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#F7F3EC] bg-[#3E2A1E] px-6 py-3">View Piece</span>
          </div>
        </div>
      </Link>

      {/* Wishlist */}
      <button
        onClick={() => toggle(product.id)}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
        aria-label="Wishlist"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? '#7A2020' : 'none'} stroke={wished ? '#7A2020' : '#F7F3EC'} strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </button>

      {/* Info */}
      <div className="mt-4 flex items-start justify-between">
        <div>
          <Link href={`/product/${product.slug}`}>
            <p className="font-['Cormorant_Garamond',serif] text-[#3E2A1E] text-lg leading-tight hover:text-[#6B4C3B] transition-colors">
              {product.name}
            </p>
          </Link>
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#9B7B68] mt-1">
            {product.category}
          </p>
        </div>
        <p className="font-['Cormorant_Garamond',serif] text-[#3E2A1E] text-lg mt-0.5">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
