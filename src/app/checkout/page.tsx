'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<'info' | 'shipping' | 'payment' | 'confirmed'>('info');
  const [guest, setGuest] = useState(true);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = totalPrice();
  const shipping = subtotal > 250 ? 0 : 15;
  const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const handleConfirm = () => {
    setStep('confirmed');
    clearCart();
  };

  if (step === 'confirmed') {
    return (
      <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-12 h-12 border border-[#3A4E3A] text-[#3A4E3A] flex items-center justify-center mx-auto mb-8 text-xl">✓</div>
          <h1 className="font-['Cormorant_Garamond',serif] text-4xl text-[#3E2A1E] mb-4">Order Confirmed</h1>
          <p className="text-sm text-[#6B4C3B] mb-2">Thank you for your order.</p>
          <p className="text-sm text-[#6B4C3B] mb-10">A confirmation has been sent to your email. You'll receive a shipping notification with tracking once your order has been dispatched.</p>
          <Link
            href="/shop"
            className="inline-block border border-[#3E2A1E] text-[#3E2A1E] text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-[#3E2A1E] hover:text-[#F7F3EC] transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] pt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="font-['Cormorant_Garamond',serif] text-3xl tracking-[0.3em] text-[#3E2A1E]">GTOSH</Link>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-14">
          {(['info', 'shipping', 'payment'] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-6 h-6 flex items-center justify-center text-[10px] border transition-all ${
                s === step ? 'border-[#3E2A1E] text-[#3E2A1E] bg-[#3E2A1E]/5' : 'border-[#6B4C3B]/20 text-[#9B7B68]'
              }`}>
                {i + 1}
              </div>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#9B7B68]">
                {s === 'info' ? 'Information' : s === 'shipping' ? 'Shipping' : 'Payment'}
              </span>
              {i < 2 && <span className="text-[#9B7B68]/30 mx-2">—</span>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,400px] gap-12">
          {/* Form */}
          <div>
            {/* Guest toggle */}
            <div className="flex gap-6 mb-8">
              <button
                onClick={() => setGuest(true)}
                className={`text-xs tracking-[0.2em] uppercase pb-2 border-b transition-all ${guest ? 'border-[#3E2A1E] text-[#3E2A1E]' : 'border-transparent text-[#9B7B68]'}`}
              >
                Guest Checkout
              </button>
              <button
                onClick={() => setGuest(false)}
                className={`text-xs tracking-[0.2em] uppercase pb-2 border-b transition-all ${!guest ? 'border-[#3E2A1E] text-[#3E2A1E]' : 'border-transparent text-[#9B7B68]'}`}
              >
                Sign In
              </button>
            </div>

            {step === 'info' && (
              <div className="flex flex-col gap-6">
                <h2 className="font-['Cormorant_Garamond',serif] text-2xl text-[#3E2A1E]">Contact Information</h2>
                <InputField label="Email" type="email" placeholder="your@email.com" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="First Name" placeholder="First" />
                  <InputField label="Last Name" placeholder="Last" />
                </div>
                <h2 className="font-['Cormorant_Garamond',serif] text-2xl text-[#3E2A1E] mt-4">Shipping Address</h2>
                <InputField label="Address" placeholder="Street address" />
                <InputField label="Apartment, suite, etc. (optional)" placeholder="Apt, floor..." />
                <div className="grid grid-cols-3 gap-4">
                  <InputField label="City" placeholder="City" />
                  <InputField label="State" placeholder="State" />
                  <InputField label="ZIP" placeholder="00000" />
                </div>
                <InputField label="Country" placeholder="United States" />
                <button
                  onClick={() => setStep('shipping')}
                  className="mt-4 w-full bg-[#3E2A1E] text-[#F7F3EC] py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#6B4C3B] transition-colors"
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {step === 'shipping' && (
              <div className="flex flex-col gap-6">
                <h2 className="font-['Cormorant_Garamond',serif] text-2xl text-[#3E2A1E]">Shipping Method</h2>
                {[
                  { label: 'Standard', sub: '3–5 business days', price: shipping === 0 ? 'Free' : '$15.00' },
                  { label: 'Express', sub: '1–2 business days', price: '$35.00' },
                ].map(({ label, sub, price }) => (
                  <label key={label} className="flex items-center gap-4 border border-[#6B4C3B]/20 p-5 cursor-pointer hover:border-[#6B4C3B]/50 transition-colors">
                    <input type="radio" name="shipping" defaultChecked={label === 'Standard'} className="accent-[#3E2A1E]" />
                    <div className="flex-1">
                      <p className="text-sm text-[#3E2A1E]">{label}</p>
                      <p className="text-xs text-[#9B7B68]">{sub}</p>
                    </div>
                    <p className="text-sm text-[#3E2A1E]">{price}</p>
                  </label>
                ))}
                <div className="flex gap-4 mt-4">
                  <button onClick={() => setStep('info')} className="flex-1 border border-[#6B4C3B]/30 text-[#6B4C3B] py-4 text-xs tracking-[0.2em] uppercase hover:border-[#6B4C3B] transition-colors">
                    Back
                  </button>
                  <button onClick={() => setStep('payment')} className="flex-1 bg-[#3E2A1E] text-[#F7F3EC] py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#6B4C3B] transition-colors">
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="flex flex-col gap-6">
                <h2 className="font-['Cormorant_Garamond',serif] text-2xl text-[#3E2A1E]">Payment</h2>
                <div className="border border-[#6B4C3B]/20 p-5 flex flex-col gap-5">
                  <InputField label="Card Number" placeholder="0000 0000 0000 0000" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Expiry" placeholder="MM / YY" />
                    <InputField label="CVV" placeholder="000" />
                  </div>
                  <InputField label="Name on Card" placeholder="Full name" />
                </div>
                <p className="text-[11px] text-[#9B7B68] flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  Payments are processed securely via Stripe.
                </p>
                <div className="flex gap-4 mt-4">
                  <button onClick={() => setStep('shipping')} className="flex-1 border border-[#6B4C3B]/30 text-[#6B4C3B] py-4 text-xs tracking-[0.2em] uppercase hover:border-[#6B4C3B] transition-colors">
                    Back
                  </button>
                  <button onClick={handleConfirm} className="flex-1 bg-[#3E2A1E] text-[#F7F3EC] py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#6B4C3B] transition-colors">
                    Place Order · ${total.toLocaleString()}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="bg-[#EDE8E0] p-8 h-fit">
            <h3 className="font-['Cormorant_Garamond',serif] text-xl text-[#3E2A1E] mb-8">Order Summary</h3>
            {items.length === 0 ? (
              <p className="text-sm text-[#9B7B68]">Your cart is empty.</p>
            ) : (
              <div className="flex flex-col gap-5 mb-8">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                    <div className="relative w-14 h-16 flex-shrink-0 overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6B4C3B] text-[#F7F3EC] text-[9px] rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-['Cormorant_Garamond',serif] text-[#3E2A1E] leading-tight">{item.name}</p>
                      <p className="text-[11px] text-[#9B7B68]">{item.color}{item.size ? ` · ${item.size}` : ''}</p>
                    </div>
                    <p className="text-sm text-[#3E2A1E]">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Discount */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Discount code"
                className="flex-1 bg-transparent border-b border-[#6B4C3B]/30 py-2 text-sm text-[#3E2A1E] placeholder-[#9B7B68]/50 focus:outline-none"
              />
              <button
                onClick={() => { if (discountCode) setDiscountApplied(true); }}
                className="text-[10px] tracking-[0.2em] uppercase text-[#6B4C3B] border-b border-[#6B4C3B]/30 pb-2 hover:border-[#6B4C3B] transition-colors"
              >
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-3 border-t border-[#6B4C3B]/20 pt-5">
              <div className="flex justify-between text-sm text-[#6B4C3B]">
                <span>Subtotal</span><span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-[#6B4C3B]">
                <span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-sm text-[#3A4E3A]">
                  <span>Discount (10%)</span><span>−${discount}</span>
                </div>
              )}
              <div className="flex justify-between font-['Cormorant_Garamond',serif] text-xl text-[#3E2A1E] border-t border-[#6B4C3B]/20 pt-3 mt-1">
                <span>Total</span><span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent border-b border-[#6B4C3B]/30 py-3 text-sm text-[#3E2A1E] placeholder-[#9B7B68]/40 focus:outline-none focus:border-[#6B4C3B] transition-colors"
      />
    </div>
  );
}
