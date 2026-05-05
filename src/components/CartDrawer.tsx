'use client';

import { useCartStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/20 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#F7F3EC] flex flex-col transition-transform duration-400 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#3E2A1E]/10">
          <span className="text-[13px] text-[#3E2A1E]">Cart</span>
          <button onClick={closeCart} className="text-[13px] text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">Close</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <p className="text-[13px] text-[#9B7B68]">Your cart is empty</p>
              <Link href="/shop" onClick={closeCart} className="text-[13px] text-[#3E2A1E] underline underline-offset-4 decoration-[#3E2A1E]/30">
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-[#EFEBE4] flex-shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-[#3E2A1E]">{item.name}</p>
                      <p className="text-[12px] text-[#9B7B68] mt-0.5">{item.color}{item.size ? ` / ${item.size}` : ''}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="text-[#9B7B68] text-sm">−</button>
                        <span className="text-sm text-[#3E2A1E] w-3 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="text-[#9B7B68] text-sm">+</button>
                      </div>
                      <p className="text-sm text-[#3E2A1E]">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id, item.size, item.color)} className="self-start text-[#9B7B68] hover:text-[#3E2A1E] text-xs mt-1">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-[#3E2A1E]/10 flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-[13px] text-[#9B7B68]">Total</span>
              <span className="text-[13px] text-[#3E2A1E]">${totalPrice().toLocaleString()}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="block w-full bg-[#3E2A1E] text-white text-center py-4 text-[13px] tracking-[0.06em] hover:bg-[#6B4C3B] transition-colors">
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
