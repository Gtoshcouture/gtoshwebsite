import Image from 'next/image';
import Link from 'next/link';

export const metadata = { title: 'About — GTOSH' };

export default function AboutPage() {
  return (
    <div className="bg-[#F7F3EC] pt-16 md:pt-20">
      {/* Hero */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=90"
          alt="GTOSH Studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/50 to-transparent" />
        <div className="absolute bottom-12 left-6 md:left-16">
          <h1 className="font-['Cormorant_Garamond',serif] text-5xl md:text-8xl text-[#F7F3EC] font-light">About</h1>
        </div>
      </div>

      {/* Statement */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-16 md:gap-32 items-start">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-6">The Vision</p>
            <div className="w-12 h-[1px] bg-[#6B4C3B]" />
          </div>
          <div>
            <p className="font-['Cormorant_Garamond',serif] text-3xl md:text-4xl text-[#3E2A1E] font-light leading-relaxed mb-10">
              GTOSH is a study of form.
            </p>
            <div className="flex flex-col gap-6 text-sm text-[#6B4C3B] leading-relaxed max-w-xl">
              <p>
                Each piece is designed to move, sculpt, and exist beyond trends. We don't design for seasons — we design for permanence.
              </p>
              <p>
                Inspired by architecture, gallery spaces, and the quiet tension in a well-tailored silhouette, GTOSH creates wearable work that rewards attention.
              </p>
              <p>
                We believe in fewer pieces, made better. In structure that becomes softness over time. In clothing that has a point of view.
              </p>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="mt-24 md:mt-36 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#6B4C3B]/10 pt-16">
          {[
            { label: 'Form', desc: 'Every silhouette is considered before it is constructed. Shape is not accidental at GTOSH.' },
            { label: 'Movement', desc: 'The best garments respond to the body. We design for how something feels in motion, not only in stillness.' },
            { label: 'Structure', desc: 'Restraint is its own kind of boldness. We build pieces with intention, not excess.' },
          ].map(({ label, desc }) => (
            <div key={label}>
              <h3 className="font-['Cormorant_Garamond',serif] text-4xl text-[#3E2A1E] mb-4">{label}</h3>
              <p className="text-sm text-[#6B4C3B] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 md:mt-36 flex flex-col items-center text-center gap-6">
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl text-[#3E2A1E]">
            Discover the Collection
          </h2>
          <Link
            href="/shop"
            className="inline-block border border-[#3E2A1E] text-[#3E2A1E] text-xs tracking-[0.3em] uppercase px-12 py-4 hover:bg-[#3E2A1E] hover:text-[#F7F3EC] transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
