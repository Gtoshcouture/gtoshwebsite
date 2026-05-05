'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#3E2A1E] text-[#F7F3EC]">
      {/* Email capture */}
      <div className="border-b border-[#F7F3EC]/10 px-6 md:px-16 py-16 md:py-24 flex flex-col md:flex-row items-start md:items-end gap-10 md:gap-0 justify-between">
        <div>
          <h3 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl font-light leading-tight mb-3">
            Become a<br />Gtosh Girlie
          </h3>
          <p className="text-[#9B7B68] text-sm tracking-wide max-w-sm">
            New drops, limited editions, and pieces made for the ones who notice everything.
          </p>
        </div>
        <form
          className="flex w-full md:w-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 md:w-72 bg-transparent border-b border-[#F7F3EC]/30 px-0 py-3 text-sm text-[#F7F3EC] placeholder-[#9B7B68] focus:outline-none focus:border-[#F7F3EC]/70 transition-colors"
          />
          <button
            type="submit"
            className="ml-6 text-xs tracking-[0.2em] uppercase text-[#F7F3EC] border-b border-[#F7F3EC]/30 pb-3 hover:border-[#F7F3EC] transition-colors whitespace-nowrap"
          >
            Join
          </button>
        </form>
      </div>

      {/* Links */}
      <div className="px-6 md:px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-5">Collection</p>
          <div className="flex flex-col gap-3">
            <Link href="/shop/clothing" className="text-sm text-[#F7F3EC]/70 hover:text-[#F7F3EC] transition-colors">Clothing</Link>
            <Link href="/shop/bags" className="text-sm text-[#F7F3EC]/70 hover:text-[#F7F3EC] transition-colors">Bags</Link>
            <Link href="/shop" className="text-sm text-[#F7F3EC]/70 hover:text-[#F7F3EC] transition-colors">All Products</Link>
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-5">Studio</p>
          <div className="flex flex-col gap-3">
            <Link href="/about" className="text-sm text-[#F7F3EC]/70 hover:text-[#F7F3EC] transition-colors">About</Link>
            <Link href="/contact" className="text-sm text-[#F7F3EC]/70 hover:text-[#F7F3EC] transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-5">Help</p>
          <div className="flex flex-col gap-3">
            <Link href="/shipping" className="text-sm text-[#F7F3EC]/70 hover:text-[#F7F3EC] transition-colors">Shipping & Returns</Link>
            <Link href="/sizing" className="text-sm text-[#F7F3EC]/70 hover:text-[#F7F3EC] transition-colors">Size Guide</Link>
            <Link href="/contact" className="text-sm text-[#F7F3EC]/70 hover:text-[#F7F3EC] transition-colors">FAQ</Link>
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-5">Follow</p>
          <div className="flex flex-col gap-3">
            <a href="https://instagram.com/gtoshcouture" target="_blank" rel="noopener noreferrer" className="text-sm text-[#F7F3EC]/70 hover:text-[#F7F3EC] transition-colors">Instagram</a>
            <a href="https://tiktok.com/@gtosh" target="_blank" rel="noopener noreferrer" className="text-sm text-[#F7F3EC]/70 hover:text-[#F7F3EC] transition-colors">TikTok</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-6 md:px-16 py-6 border-t border-[#F7F3EC]/10 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-['Cormorant_Garamond',serif] text-xl tracking-[0.3em] text-[#F7F3EC]/50">GTOSH</span>
        <p className="text-[11px] text-[#F7F3EC]/30 tracking-wide">© {new Date().getFullYear()} GTOSH. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="text-[11px] text-[#F7F3EC]/30 hover:text-[#F7F3EC]/60 transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[11px] text-[#F7F3EC]/30 hover:text-[#F7F3EC]/60 transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
