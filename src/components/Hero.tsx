'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=90"
          alt="GTOSH Collection"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/70 via-[#1C1C1C]/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-16 pb-20 md:pb-28">
        <div className="max-w-lg">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#F7F3EC]/60 mb-4">New Season</p>
          <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] font-light text-[#F7F3EC] mb-6">
            GTOSH
          </h1>
          <p className="font-['Cormorant_Garamond',serif] text-2xl md:text-3xl italic text-[#F7F3EC]/80 mb-10 font-light">
            Sculpted Energy
          </p>
          <Link
            href="/shop"
            className="inline-block border border-[#F7F3EC]/50 text-[#F7F3EC] text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-[#F7F3EC] hover:text-[#3E2A1E] transition-all duration-400"
          >
            Shop Collection
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-3 z-10">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#F7F3EC]/50 -rotate-90 mb-4">Scroll</p>
        <div className="w-[1px] h-16 bg-[#F7F3EC]/20 overflow-hidden">
          <div className="w-full h-1/2 bg-[#F7F3EC]/60 animate-[scrollBar_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
