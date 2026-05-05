'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { useCartStore } from '@/lib/store';

type Props = { product: Product };

export default function ProductDetail({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const { addItem } = useCartStore();

  const avgRating = product.reviews?.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 0;

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
    <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-10 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        {/* Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="hidden md:flex flex-col gap-3 w-16 flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square overflow-hidden border-2 transition-all ${
                    i === selectedImage ? 'border-[#6B4C3B]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="flex-1">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#EDE8E0]">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
              {/* Low stock */}
              {product.quantity && product.quantity <= 4 && (
                <div className="absolute bottom-6 left-6 bg-[#F7F3EC]/90 px-4 py-2">
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[#7A2020]">
                    Only {product.quantity} left
                  </p>
                </div>
              )}
            </div>

            {/* Mobile thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-3 md:hidden">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-14 aspect-square overflow-hidden border-2 transition-all ${
                      i === selectedImage ? 'border-[#6B4C3B]' : 'border-transparent opacity-60'
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Badges */}
          <div className="flex gap-2 mb-5">
            {product.isNew && <span className="text-[10px] tracking-[0.2em] uppercase bg-[#3A4E3A] text-[#F7F3EC] px-3 py-1">New</span>}
            {product.isBestSeller && <span className="text-[10px] tracking-[0.2em] uppercase bg-[#3E2A1E] text-[#F7F3EC] px-3 py-1">Best Seller</span>}
            {product.isLimitedDrop && <span className="text-[10px] tracking-[0.2em] uppercase bg-[#7A2020] text-[#F7F3EC] px-3 py-1">Limited Drop</span>}
          </div>

          <h1 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl text-[#3E2A1E] mb-2">{product.name}</h1>

          {/* Rating */}
          {product.reviews?.length ? (
            <button
              className="flex items-center gap-2 mb-5 group"
              onClick={() => setReviewsOpen(!reviewsOpen)}
            >
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(avgRating) ? '#6B4C3B' : 'none'} stroke="#6B4C3B" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <span className="text-xs text-[#9B7B68] group-hover:text-[#6B4C3B] transition-colors">
                {avgRating.toFixed(1)} · {product.reviews.length} reviews
              </span>
            </button>
          ) : null}

          <p className="font-['Cormorant_Garamond',serif] text-2xl text-[#3E2A1E] mb-8">
            ${product.price.toLocaleString()}
          </p>

          {/* Description */}
          <p className="text-sm text-[#6B4C3B] leading-relaxed mb-8">{product.description}</p>

          {/* Color */}
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68] mb-3">
              Color — <span className="text-[#3E2A1E]">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-xs tracking-wide border transition-all ${
                    selectedColor === color
                      ? 'border-[#3E2A1E] text-[#3E2A1E] bg-[#3E2A1E]/5'
                      : 'border-[#6B4C3B]/20 text-[#9B7B68] hover:border-[#6B4C3B]/50'
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
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68]">Size</p>
                <button className="text-[10px] tracking-[0.15em] uppercase text-[#9B7B68] underline underline-offset-2">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-sm border transition-all ${
                      selectedSize === size
                        ? 'border-[#3E2A1E] text-[#3E2A1E] bg-[#3E2A1E]/5'
                        : 'border-[#6B4C3B]/20 text-[#9B7B68] hover:border-[#6B4C3B]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart — sticky on mobile */}
          <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-[#F7F3EC]/95 backdrop-blur-sm border-t border-[#6B4C3B]/10 md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto md:p-0 md:bg-transparent md:backdrop-blur-none md:border-none">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-4 text-xs tracking-[0.3em] uppercase transition-all duration-300 ${
                added
                  ? 'bg-[#3A4E3A] text-[#F7F3EC]'
                  : product.inStock
                  ? 'bg-[#3E2A1E] text-[#F7F3EC] hover:bg-[#6B4C3B]'
                  : 'bg-[#9B7B68]/30 text-[#9B7B68] cursor-not-allowed'
              }`}
            >
              {!product.inStock ? 'Sold Out' : added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>

          {/* Spacer for mobile sticky button */}
          <div className="h-20 md:hidden" />

          {/* Details accordion */}
          <div className="mt-8 flex flex-col divide-y divide-[#6B4C3B]/10">
            {/* Product details */}
            <div className="py-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68] mb-4">Product Details</p>
              <ul className="flex flex-col gap-2">
                {product.details.map((d, i) => (
                  <li key={i} className="text-sm text-[#6B4C3B] flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#9B7B68] mt-2 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping */}
            <button
              className="py-4 flex items-center justify-between text-left"
              onClick={() => setShippingOpen(!shippingOpen)}
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68]">Shipping & Returns</p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9B7B68" strokeWidth="1.5" className={`transition-transform ${shippingOpen ? 'rotate-180' : ''}`}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {shippingOpen && (
              <div className="pb-6 text-sm text-[#6B4C3B] leading-relaxed flex flex-col gap-2">
                <p>Free shipping on orders over $250.</p>
                <p>Standard delivery: 3–5 business days.</p>
                <p>Express delivery: 1–2 business days.</p>
                <p>Returns accepted within 14 days of delivery. Items must be unworn and in original packaging.</p>
              </div>
            )}

            {/* Reviews */}
            <button
              className="py-4 flex items-center justify-between text-left"
              onClick={() => setReviewsOpen(!reviewsOpen)}
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68]">
                Reviews {product.reviews?.length ? `(${product.reviews.length})` : ''}
              </p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9B7B68" strokeWidth="1.5" className={`transition-transform ${reviewsOpen ? 'rotate-180' : ''}`}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {reviewsOpen && product.reviews && (
              <div className="pb-6 flex flex-col gap-8">
                {product.reviews.map((review) => (
                  <div key={review.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= review.rating ? '#6B4C3B' : 'none'} stroke="#6B4C3B" strokeWidth="1.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-[#3E2A1E] font-medium">{review.author}</p>
                      {review.verified && (
                        <span className="text-[9px] tracking-[0.15em] uppercase text-[#3A4E3A] bg-[#3A4E3A]/10 px-2 py-0.5">Verified</span>
                      )}
                    </div>
                    <p className="text-sm text-[#6B4C3B] leading-relaxed">{review.text}</p>
                    <p className="text-[10px] text-[#9B7B68]">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
