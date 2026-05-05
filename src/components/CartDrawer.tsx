'use client';

import { useCartStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#F7F3EC] flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#6B4C3B]/10">
          <h2 className="font-['Cormorant_Garamond',serif] text-2xl text-[#3E2A1E]">Your Cart</h2>
          <button onClick={closeCart} className="text-[#6B4C3B]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9B7B68" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="text-[#9B7B68] text-sm tracking-wide">Your cart is empty</p>
              <button onClick={closeCart}>
                <Link href="/shop" className="text-xs tracking-[0.2em] uppercase text-[#6B4C3B] border-b border-[#6B4C3B] pb-1">
                  Explore Collection
                </Link>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                  <div className="relative w-20 h-24 bg-[#EDE8E0] flex-shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <p className="font-['Cormorant_Garamond',serif] text-[#3E2A1E] text-lg leading-tight">{item.name}</p>
                      <p className="text-[11px] text-[#9B7B68] mt-1">
                        {item.color}{item.size ? ` · ${item.size}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="w-6 h-6 border border-[#6B4C3B]/30 text-[#6B4C3B] text-sm flex items-center justify-center"
                        >−</button>
                        <span className="text-sm text-[#3E2A1E] w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="w-6 h-6 border border-[#6B4C3B]/30 text-[#6B4C3B] text-sm flex items-center justify-center"
                        >+</button>
                      </div>
                      <p className="text-sm text-[#3E2A1E]">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.size, item.color)}
                    className="self-start text-[#9B7B68] hover:text-[#7A2020] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-8 border-t border-[#6B4C3B]/10 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <span className="text-xs tracking-[0.2em] uppercase text-[#9B7B68]">Total</span>
              <span className="font-['Cormorant_Garamond',serif] text-2xl text-[#3E2A1E]">${totalPrice().toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-[#9B7B68] text-center">Shipping calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#3E2A1E] text-[#F7F3EC] text-center py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#6B4C3B] transition-colors"
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              className="text-xs tracking-[0.2em] uppercase text-[#9B7B68] text-center animated-underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
