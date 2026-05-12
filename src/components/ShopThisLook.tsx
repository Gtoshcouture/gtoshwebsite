'use client';

import Image from 'next/image';
import Link from 'next/link';
import { looks } from '@/lib/products';
import { useAdminStore } from '@/lib/adminStore';

export default function ShopThisLook() {
  const { products } = useAdminStore();
  const look = looks[0];
  const lookProducts = look.products.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <section className="bg-[#F7F3EC]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-[#EFEBE4]">
            <Image src={look.image} alt={look.title} fill className="object-cover" />
          </div>

          {/* Products in this look */}
          <div>
            <p className="text-[13px] text-[#9B7B68] mb-6">Shop This Look</p>
            <div className="flex flex-col gap-6">
              {lookProducts.map((product) => product && (
                <Link key={product.id} href={`/product/${product.slug}`} className="group flex gap-5 items-center py-3 border-b border-[#6B4C3B]/8">
                  <div className="relative w-16 h-20 bg-[#EFEBE4] flex-shrink-0 overflow-hidden">
                    {product.images[0].startsWith('data:') ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#3E2A1E] group-hover:text-[#6B4C3B] transition-colors">{product.name}</p>
                    <p className="text-sm text-[#9B7B68] mt-1">${product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
