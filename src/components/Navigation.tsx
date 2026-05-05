'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import CartDrawer from './CartDrawer';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { totalItems, toggleCart, isOpen } = useCartStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const count = totalItems();

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#F7F3EC]/95 backdrop-blur-sm shadow-[0_1px_0_rgba(107,76,59,0.1)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Left — desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <div
              className="relative group"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className="text-xs tracking-[0.2em] uppercase text-[#3E2A1E] font-medium animated-underline">
                Shop
              </button>
              <div
                className={`absolute top-full left-0 pt-4 transition-all duration-200 ${
                  shopOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'
                }`}
              >
                <div className="bg-[#F7F3EC] border border-[#6B4C3B]/10 shadow-sm p-6 flex flex-col gap-4 w-40">
                  <Link href="/shop/clothing" className="text-xs tracking-[0.2em] uppercase text-[#3E2A1E] animated-underline">Clothing</Link>
                  <Link href="/shop/bags" className="text-xs tracking-[0.2em] uppercase text-[#3E2A1E] animated-underline">Bags</Link>
                  <Link href="/shop" className="text-xs tracking-[0.2em] uppercase text-[#3E2A1E] animated-underline">All</Link>
                </div>
              </div>
            </div>
            <Link href="/about" className="text-xs tracking-[0.2em] uppercase text-[#3E2A1E] animated-underline">About</Link>
            <Link href="/contact" className="text-xs tracking-[0.2em] uppercase text-[#3E2A1E] animated-underline">Contact</Link>
          </div>

          {/* Center — logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="font-['Cormorant_Garamond',serif] text-2xl md:text-3xl tracking-[0.3em] text-[#3E2A1E] font-light">
              GTOSH
            </span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => toggleCart()}
              className="relative p-1 text-[#3E2A1E]"
              aria-label="Cart"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7A2020] text-[#F7F3EC] text-[10px] rounded-full flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1 flex flex-col gap-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`block w-5 h-[1px] bg-[#3E2A1E] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block w-5 h-[1px] bg-[#3E2A1E] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[1px] bg-[#3E2A1E] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#F7F3EC] flex flex-col justify-center px-10 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68]">Shop</p>
            <Link href="/shop/clothing" onClick={() => setMenuOpen(false)} className="text-4xl font-['Cormorant_Garamond',serif] text-[#3E2A1E]">Clothing</Link>
            <Link href="/shop/bags" onClick={() => setMenuOpen(false)} className="text-4xl font-['Cormorant_Garamond',serif] text-[#3E2A1E]">Bags</Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)} className="text-4xl font-['Cormorant_Garamond',serif] text-[#3E2A1E]">All Products</Link>
          </div>
          <div className="w-12 h-[1px] bg-[#6B4C3B]/20" />
          <div className="flex flex-col gap-5">
            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-4xl font-['Cormorant_Garamond',serif] text-[#3E2A1E]">About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-4xl font-['Cormorant_Garamond',serif] text-[#3E2A1E]">Contact</Link>
          </div>
        </div>
      </div>

      <CartDrawer />
    </>
  );
}
