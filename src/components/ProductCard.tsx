'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';

function ProductImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  if (src.startsWith('data:')) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img src={src} alt={alt} className={`absolute inset-0 w-full h-full object-cover ${className || ''}`} />;
  }
  return <Image src={src} alt={alt} fill sizes="(max-width: 768px) 50vw, 25vw" className={`object-cover ${className || ''}`} />;
}

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
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            className={`transition-all duration-700 ${hovered && product.images[1] ? 'opacity-0' : 'opacity-100'}`}
          />
          {product.images[1] && (
            <ProductImage
              src={product.images[1]}
              alt={`${product.name} alternate`}
              className={`transition-all duration-700 ${hovered ? 'opacity-100' : 'opacity-0'}`}
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
