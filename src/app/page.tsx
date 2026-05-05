import Hero from '@/components/Hero';
import ShopThisLook from '@/components/ShopThisLook';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';

function BrandStatement() {
  return (
    <section className="py-24 md:py-36 bg-[#3E2A1E] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-10 md:gap-20 items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-6">The Vision</p>
            <div className="w-16 h-[1px] bg-[#6B4C3B]" />
          </div>
          <div>
            <p className="font-['Cormorant_Garamond',serif] text-3xl md:text-4xl lg:text-5xl text-[#F7F3EC] font-light leading-relaxed">
              GTOSH explores form, movement, and structure through wearable design.
            </p>
            <p className="text-sm text-[#9B7B68] mt-8 leading-relaxed max-w-lg">
              Each piece is a study in tension and release — where structure meets softness, and restraint becomes its own kind of freedom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <ShopThisLook />
      <FeaturedProducts />
      <Categories />
    </>
  );
}
