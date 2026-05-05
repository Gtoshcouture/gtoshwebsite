'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <Link href={`/product/${product.slug}`}>
        <div
          className="relative overflow-hidden bg-[#EFEBE4] aspect-[3/4]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${hovered && product.images[1] ? 'opacity-0' : 'opacity-100'}`}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate`}
              fill
              className={`object-cover transition-all duration-700 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
        </div>
      </Link>
      <div className="mt-4">
        <Link href={`/product/${product.slug}`}>
          <p className="text-sm text-[#3E2A1E] hover:text-[#6B4C3B] transition-colors">{product.name}</p>
        </Link>
        <p className="text-sm text-[#9B7B68] mt-1">${product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
