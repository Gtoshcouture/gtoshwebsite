import Link from 'next/link';
import Image from 'next/image';

export default function Categories() {
  return (
    <section className="py-20 md:py-32 bg-[#F7F3EC]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl text-[#3E2A1E] mb-10">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { href: '/shop/clothing', label: 'Clothing', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=85' },
            { href: '/shop/bags', label: 'Bags', img: 'https://images.unsplash.com/photo-1584917865442-de89be371e76?w=900&q=85' },
          ].map(({ href, label, img }) => (
            <Link key={label} href={href} className="group relative overflow-hidden aspect-[4/3] md:aspect-[16/9] bg-[#EDE8E0]">
              <Image src={img} alt={label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-end p-8 md:p-10">
                <div>
                  <h3 className="font-['Playfair_Display',serif] text-4xl text-[#F7F3EC]">{label}</h3>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#F7F3EC]/60 mt-2 inline-block border-b border-[#F7F3EC]/30 pb-0.5 group-hover:text-[#F7F3EC] transition-colors">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
