import Link from 'next/link';
import Image from 'next/image';

export default function Categories() {
  return (
    <section className="bg-[#F7F3EC] py-20 md:py-28 px-6 md:px-14">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { href: '/shop/clothing', label: 'Clothing', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=85' },
          { href: '/shop/bags', label: 'Bags', img: 'https://images.unsplash.com/photo-1584917865442-de89be371e76?w=900&q=85' },
        ].map(({ href, label, img }) => (
          <Link key={label} href={href} className="group relative overflow-hidden aspect-[4/3] bg-[#EFEBE4]">
            <Image src={img} alt={label} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-white">{label}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
