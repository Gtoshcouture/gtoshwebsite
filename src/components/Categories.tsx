import Link from 'next/link';
import Image from 'next/image';

export default function Categories() {
  return (
    <section className="py-24 md:py-36 bg-[#FDFAF5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="mb-14">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-3">Browse</p>
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl text-[#3E2A1E]">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Clothing */}
          <Link href="/shop/clothing" className="group relative overflow-hidden aspect-[4/5] md:aspect-[4/5] bg-[#EDE8E0]">
            <Image
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=85"
              alt="GTOSH Clothing"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#F7F3EC]/60 mb-2">Category</p>
              <h3 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl text-[#F7F3EC] mb-4">Clothing</h3>
              <span className="inline-flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-[#F7F3EC]/70 border-b border-[#F7F3EC]/30 pb-1 group-hover:text-[#F7F3EC] group-hover:border-[#F7F3EC] transition-all">
                Shop Now
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </Link>

          {/* Bags */}
          <Link href="/shop/bags" className="group relative overflow-hidden aspect-[4/5] md:aspect-[4/5] bg-[#EDE8E0]">
            <Image
              src="https://images.unsplash.com/photo-1584917865442-de89be371e76?w=900&q=85"
              alt="GTOSH Bags"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#F7F3EC]/60 mb-2">Category</p>
              <h3 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl text-[#F7F3EC] mb-4">Bags</h3>
              <span className="inline-flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-[#F7F3EC]/70 border-b border-[#F7F3EC]/30 pb-1 group-hover:text-[#F7F3EC] group-hover:border-[#F7F3EC] transition-all">
                Shop Now
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
