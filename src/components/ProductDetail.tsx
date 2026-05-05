'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { useCartStore } from '@/lib/store';

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) return;
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-10 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Images */}
        <div>
          <div className="relative aspect-[3/4] overflow-hidden bg-[#EFEBE4] mb-3">
            <Image src={product.images[selectedImage]} alt={product.name} fill priority className="object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-20 overflow-hidden bg-[#EFEBE4] transition-opacity ${i === selectedImage ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col md:pt-4">
          <h1 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-[#3E2A1E] mb-2">{product.name}</h1>
          <p className="text-lg text-[#9B7B68] mb-8">${product.price.toLocaleString()}</p>
          <p className="text-[13px] text-[#6B4C3B] leading-relaxed mb-8">{product.description}</p>

          {/* Color */}
          <div className="mb-6">
            <p className="text-[13px] text-[#9B7B68] mb-3">Color — {selectedColor}</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-[13px] border transition-all ${
                    selectedColor === color ? 'border-[#3E2A1E] text-[#3E2A1E]' : 'border-[#3E2A1E]/15 text-[#9B7B68] hover:border-[#3E2A1E]/40'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          {product.sizes && (
            <div className="mb-8">
              <p className="text-[13px] text-[#9B7B68] mb-3">Size</p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-[13px] border transition-all ${
                      selectedSize === size ? 'border-[#3E2A1E] text-[#3E2A1E]' : 'border-[#3E2A1E]/15 text-[#9B7B68] hover:border-[#3E2A1E]/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart — sticky on mobile */}
          <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-[#F7F3EC]/95 backdrop-blur-sm border-t border-[#3E2A1E]/10 md:relative md:bottom-auto md:p-0 md:bg-transparent md:border-none md:backdrop-blur-none">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-4 text-[13px] tracking-[0.06em] transition-all duration-300 ${
                added ? 'bg-[#3A4E3A] text-white' : product.inStock ? 'bg-[#3E2A1E] text-white hover:bg-[#6B4C3B]' : 'bg-[#9B7B68]/30 text-[#9B7B68] cursor-not-allowed'
              }`}
            >
              {!product.inStock ? 'Sold Out' : added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
          </div>
          <div className="h-20 md:hidden" />

          {/* Details */}
          <div className="mt-8 border-t border-[#3E2A1E]/10 pt-6">
            <ul className="flex flex-col gap-2">
              {product.details.map((d, i) => (
                <li key={i} className="text-[13px] text-[#6B4C3B]">· {d}</li>
              ))}
            </ul>
          </div>

          {/* Shipping */}
          <button className="mt-6 border-t border-[#3E2A1E]/10 pt-5 flex items-center justify-between w-full text-left" onClick={() => setShippingOpen(!shippingOpen)}>
            <span className="text-[13px] text-[#9B7B68]">Shipping & Returns</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9B7B68" strokeWidth="1.5" className={`transition-transform ${shippingOpen ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          {shippingOpen && (
            <div className="pt-3 pb-2 flex flex-col gap-1.5 text-[13px] text-[#6B4C3B]">
              <p>Free shipping on orders over $250.</p>
              <p>Standard: 3–5 business days. Express: 1–2 days.</p>
              <p>Returns accepted within 14 days.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
