'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

  const showBg = !isHome || scrolled;
  const count = totalItems();

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        showBg
          ? 'bg-[#F7F3EC] border-b border-[#6B4C3B]/10'
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-18">

          {/* Left nav — desktop */}
          <div className="hidden md:flex items-center gap-10 w-1/3">
            {[
              { href: '/shop', label: 'Shop' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-[11px] tracking-[0.2em] uppercase transition-colors ${
                  showBg ? 'text-[#3E2A1E] hover:text-[#6B4C3B]' : 'text-[#F7F3EC]/80 hover:text-[#F7F3EC]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Center — logo mark + wordmark */}
          <Link href="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <div className={`w-7 h-7 transition-colors ${showBg ? 'text-[#3E2A1E]' : 'text-[#F7F3EC]'}`}>
              <Image src="/gtosh-logo.svg" alt="GTOSH" width={28} height={28} className="w-full h-full" style={{filter: showBg ? 'invert(13%) sepia(20%) saturate(800%) hue-rotate(345deg) brightness(40%)' : 'invert(1)'}} />
            </div>
            <span className={`font-['Playfair_Display',serif] text-xl tracking-[0.35em] font-normal transition-colors ${
              showBg ? 'text-[#3E2A1E]' : 'text-[#F7F3EC]'
            }`}>
              GTOSH
            </span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-5 w-1/3 justify-end">
            <button onClick={toggleCart} className="relative p-1" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={showBg ? '#3E2A1E' : '#F7F3EC'} strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7A2020] text-[#F7F3EC] text-[10px] rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button className="md:hidden p-1 flex flex-col gap-[5px]" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`block w-5 h-[1px] transition-all duration-300 ${showBg ? 'bg-[#3E2A1E]' : 'bg-[#F7F3EC]'} ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block w-5 h-[1px] transition-all duration-300 ${showBg ? 'bg-[#3E2A1E]' : 'bg-[#F7F3EC]'} ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[1px] transition-all duration-300 ${showBg ? 'bg-[#3E2A1E]' : 'bg-[#F7F3EC]'} ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`fixed inset-0 z-40 bg-[#F7F3EC] flex flex-col justify-center px-10 transition-all duration-500 md:hidden ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col gap-10">
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="font-['Playfair_Display',serif] text-5xl text-[#3E2A1E]">Shop</Link>
          <Link href="/shop/clothing" onClick={() => setMenuOpen(false)} className="font-['Playfair_Display',serif] text-3xl text-[#6B4C3B] pl-4">Clothing</Link>
          <Link href="/shop/bags" onClick={() => setMenuOpen(false)} className="font-['Playfair_Display',serif] text-3xl text-[#6B4C3B] pl-4">Bags</Link>
          <div className="w-10 h-[1px] bg-[#6B4C3B]/20" />
          <Link href="/about" onClick={() => setMenuOpen(false)} className="font-['Playfair_Display',serif] text-5xl text-[#3E2A1E]">About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="font-['Playfair_Display',serif] text-5xl text-[#3E2A1E]">Contact</Link>
        </div>
      </div>

      <CartDrawer />
    </>
  );
}
