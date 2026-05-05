'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EC] pt-28 md:pt-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {/* Left */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-4">Reach Out</p>
            <h1 className="font-['Cormorant_Garamond',serif] text-5xl md:text-6xl text-[#3E2A1E] mb-10">Contact</h1>
            <div className="flex flex-col gap-8 text-sm text-[#6B4C3B]">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68] mb-2">Email</p>
                <a href="mailto:hello@gtosh.com" className="animated-underline">hello@gtosh.com</a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68] mb-2">Instagram</p>
                <a href="https://instagram.com/gtoshcouture" target="_blank" rel="noopener noreferrer" className="animated-underline">@gtoshcouture</a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68] mb-2">Response Time</p>
                <p>We respond within 1–2 business days.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col gap-4 pt-16">
                <h2 className="font-['Cormorant_Garamond',serif] text-3xl text-[#3E2A1E]">Thank you.</h2>
                <p className="text-sm text-[#6B4C3B]">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68]">Name</label>
                  <input
                    type="text"
                    required
                    className="bg-transparent border-b border-[#6B4C3B]/30 py-3 text-sm text-[#3E2A1E] placeholder-[#9B7B68]/50 focus:outline-none focus:border-[#6B4C3B] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68]">Email</label>
                  <input
                    type="email"
                    required
                    className="bg-transparent border-b border-[#6B4C3B]/30 py-3 text-sm text-[#3E2A1E] placeholder-[#9B7B68]/50 focus:outline-none focus:border-[#6B4C3B] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68]">Subject</label>
                  <select className="bg-transparent border-b border-[#6B4C3B]/30 py-3 text-sm text-[#3E2A1E] focus:outline-none focus:border-[#6B4C3B] transition-colors appearance-none">
                    <option>Order Inquiry</option>
                    <option>Product Question</option>
                    <option>Returns & Exchanges</option>
                    <option>Press & Collaboration</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68]">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="bg-transparent border-b border-[#6B4C3B]/30 py-3 text-sm text-[#3E2A1E] placeholder-[#9B7B68]/50 focus:outline-none focus:border-[#6B4C3B] transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start border border-[#3E2A1E] text-[#3E2A1E] text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-[#3E2A1E] hover:text-[#F7F3EC] transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
