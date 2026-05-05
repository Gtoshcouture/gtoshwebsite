import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import EmailCapture from '@/components/EmailCapture';
import ShopThisLook from '@/components/ShopThisLook';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <ShopThisLook />
      <Categories />
      <EmailCapture />
    </>
  );
}
