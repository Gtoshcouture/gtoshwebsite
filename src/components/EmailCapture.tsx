'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-[#3E2A1E] py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#9B7B68] mb-5">Stay Close</p>
        <h2 className="font-['Playfair_Display',serif] text-4xl md:text-6xl text-[#F7F3EC] mb-4">
          Become a<br />
          <span className="italic">Gtosh Girlie</span>
        </h2>
        <p className="text-sm text-[#9B7B68] mb-10 max-w-sm mx-auto leading-relaxed">
          New drops, limited editions, and pieces made for the ones who notice everything.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border border-[#9B7B68] flex items-center justify-center text-[#9B7B68]">✓</div>
            <p className="text-[#F7F3EC]/60 text-sm tracking-wide">You&apos;re on the list.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-[#F7F3EC]/10 border border-[#F7F3EC]/20 text-[#F7F3EC] placeholder-[#F7F3EC]/30 px-5 py-4 text-sm focus:outline-none focus:border-[#F7F3EC]/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-[#F7F3EC] text-[#3E2A1E] text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#9B7B68] hover:text-[#F7F3EC] transition-colors whitespace-nowrap"
            >
              Join
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
