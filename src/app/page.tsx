import Hero from '@/components/Hero';
import ShopThisLook from '@/components/ShopThisLook';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import EmailCapture from '@/components/EmailCapture';

function BrandStatement() {
  return (
    <section className="bg-[#F7F3EC] px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-['Playfair_Display',serif] text-2xl md:text-4xl text-[#3E2A1E] font-light leading-relaxed italic">
          &ldquo;GTOSH explores form, movement, and structure through wearable design.&rdquo;
        </p>
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
      <EmailCapture />
    </>
  );
}
