import { getProductsByCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const metadata = { title: 'Clothing — GTOSH' };

export default function ClothingPage() {
  const clothing = getProductsByCategory('clothing');
  return (
    <div className="min-h-screen bg-[#F7F3EC] pt-28 md:pt-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="mb-14 md:mb-20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-3">Category</p>
          <h1 className="font-['Cormorant_Garamond',serif] text-5xl md:text-7xl text-[#3E2A1E]">Clothing</h1>
        </div>
        <div className="flex gap-6 border-b border-[#6B4C3B]/10 pb-6 mb-12">
          <a href="/shop" className="text-xs tracking-[0.2em] uppercase text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">All</a>
          <a href="/shop/clothing" className="text-xs tracking-[0.2em] uppercase text-[#3E2A1E] border-b border-[#3E2A1E] pb-1">Clothing</a>
          <a href="/shop/bags" className="text-xs tracking-[0.2em] uppercase text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">Bags</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-14 mb-24">
          {clothing.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
