'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import CartDrawer from './CartDrawer';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { totalItems, toggleCart } = useCartStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const transparent = isHome && !scrolled && !menuOpen;
  const textColor = transparent ? 'text-white' : 'text-[#3E2A1E]';
  const count = totalItems();

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-[#F7F3EC]'
      }`}>
        {/* Top bar */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 flex items-center justify-between h-[70px]">

          {/* Left — hamburger on mobile, links on desktop */}
          <div className="flex items-center w-1/3">
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <div className="flex flex-col gap-[5px]">
                <span className={`block w-5 h-[1.2px] transition-all duration-300 ${transparent ? 'bg-white' : 'bg-[#3E2A1E]'} ${menuOpen ? 'rotate-45 translate-y-[6.2px]' : ''}`} />
                <span className={`block w-5 h-[1.2px] transition-all duration-300 ${transparent ? 'bg-white' : 'bg-[#3E2A1E]'} ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-[1.2px] transition-all duration-300 ${transparent ? 'bg-white' : 'bg-[#3E2A1E]'} ${menuOpen ? '-rotate-45 -translate-y-[6.2px]' : ''}`} />
              </div>
            </button>
            <div className="hidden md:flex items-center gap-10">
              <Link href="/shop" className={`text-[13px] tracking-[0.04em] ${textColor} hover:opacity-60 transition-opacity`}>Shop All</Link>
              <Link href="/about" className={`text-[13px] tracking-[0.04em] ${textColor} hover:opacity-60 transition-opacity`}>Our Story</Link>
              <Link href="/contact" className={`text-[13px] tracking-[0.04em] ${textColor} hover:opacity-60 transition-opacity`}>Contact</Link>
            </div>
          </div>

          {/* Center — wordmark */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className={`font-['Playfair_Display',serif] italic text-[26px] tracking-[0.02em] ${textColor} transition-colors`}>
              gtosh.
            </span>
          </Link>

          {/* Right — cart */}
          <div className="flex items-center justify-end w-1/3 gap-6">
            <button onClick={toggleCart} className={`relative ${textColor}`} aria-label="Cart">
              <span className="text-[13px] tracking-[0.04em]">Cart ({count})</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-[#F7F3EC] flex flex-col justify-center px-10 transition-all duration-400 md:hidden ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col gap-8">
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="font-['Playfair_Display',serif] text-4xl text-[#3E2A1E]">Shop All</Link>
          <Link href="/shop/clothing" onClick={() => setMenuOpen(false)} className="text-2xl text-[#6B4C3B] pl-2">Clothing</Link>
          <Link href="/shop/bags" onClick={() => setMenuOpen(false)} className="text-2xl text-[#6B4C3B] pl-2">Bags</Link>
          <div className="w-8 h-[1px] bg-[#6B4C3B]/15 my-2" />
          <Link href="/about" onClick={() => setMenuOpen(false)} className="font-['Playfair_Display',serif] text-4xl text-[#3E2A1E]">Our Story</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="font-['Playfair_Display',serif] text-4xl text-[#3E2A1E]">Contact</Link>
        </div>
      </div>

      <CartDrawer />
    </>
  );
}
