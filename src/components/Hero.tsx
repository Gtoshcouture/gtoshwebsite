'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=90"
        alt="GTOSH Collection"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      {/* Content pinned to bottom-left */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-14 md:pb-20">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#F7F3EC]/60 mb-3">New Season</p>
        <h1 className="font-['Playfair_Display',serif] text-[clamp(3rem,9vw,8rem)] leading-[0.9] text-[#F7F3EC] mb-3">
          GTOSH
        </h1>
        <p className="font-['Playfair_Display',serif] italic text-xl md:text-2xl text-[#F7F3EC]/75 mb-10">
          Sculpted Energy
        </p>
        <Link
          href="/shop"
          className="inline-block border border-[#F7F3EC]/50 text-[#F7F3EC] text-[11px] tracking-[0.3em] uppercase px-9 py-3.5 hover:bg-[#F7F3EC] hover:text-[#3E2A1E] transition-all duration-300"
        >
          Shop Collection
        </Link>
      </div>
    </section>
  );
}
