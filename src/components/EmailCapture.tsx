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
    <section className="bg-[#3E2A1E] py-24 md:py-32 px-6 md:px-14">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-['Playfair_Display',serif] italic text-3xl md:text-4xl text-white mb-4">
          Become a Gtosh Girlie
        </h2>
        <p className="text-[13px] text-[#9B7B68] mb-10">
          Be the first to know about new drops and limited editions.
        </p>

        {submitted ? (
          <p className="text-white/60 text-sm">You&apos;re on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent border border-white/20 text-white placeholder-white/30 px-5 py-3.5 text-[13px] focus:outline-none focus:border-white/50 transition-colors"
            />
            <button type="submit" className="bg-white text-[#3E2A1E] text-[13px] tracking-[0.06em] px-8 py-3.5 hover:bg-[#EFEBE4] transition-colors">
              Join
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
