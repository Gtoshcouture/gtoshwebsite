import { CategoryProductsGrid } from '@/components/ShopProductGrid';
import Link from 'next/link';

export const metadata = { title: 'Bags — GTOSH' };

export default function BagsPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EC] pt-[70px]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-14 md:py-20">
        <h1 className="font-['Playfair_Display',serif] text-4xl md:text-5xl text-[#3E2A1E] mb-10">Bags</h1>
        <div className="flex gap-8 border-b border-[#3E2A1E]/10 pb-4 mb-12">
          <Link href="/shop" className="text-[13px] text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">All</Link>
          <Link href="/shop/clothing" className="text-[13px] text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">Clothing</Link>
          <Link href="/shop/bags" className="text-[13px] text-[#3E2A1E]">Bags</Link>
        </div>
        <CategoryProductsGrid category="bags" />
      </div>
    </div>
  );
}
