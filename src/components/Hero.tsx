'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=90"
        alt="GTOSH Collection"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-['Playfair_Display',serif] text-[clamp(1.5rem,4vw,2.5rem)] tracking-[0.35em] uppercase text-white font-normal mb-8">
          Sculpted Energy
        </h1>
        <Link
          href="/shop"
          className="border border-white/60 text-white text-[13px] tracking-[0.1em] px-10 py-3.5 hover:bg-white hover:text-[#3E2A1E] transition-all duration-300"
        >
          Shop the collection
        </Link>
      </div>
    </section>
  );
}
